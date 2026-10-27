/* =========================================================================
   Typing Master — Typing engine (typing-engine.js)
   -------------------------------------------------------------------------
   Deliberately DOM-free so the maths can be unit tested in Node
   (see tools/verify.js). The app feeds it characters, it keeps score.

   Measurement definitions (also documented in README.md)
   ------------------------------------------------------
   A "word" is 5 characters, the standard convention used by typing tests.

     gross WPM = (all keystrokes / 5) / minutes
     net   WPM = ((correct chars − remaining errors) / 5) / minutes, floored at 0
     accuracy  = (correct characters right now) / (every character attempted) × 100

   `correct characters` is derived from the passage itself: every character
   before the caret is either correct or wrong, so correctChars = caret − errors.

   Consequences, which are the point of these definitions:
     * Mistakes left uncorrected stay counted, so they drag net WPM down.
     * Correcting a mistake with Backspace does NOT restore full accuracy,
       because the failed keystroke still counts in the denominator.
     * Resetting a lesson clears the counters but cannot erase a stored best,
       so accuracy cannot be farmed.

   Every division is guarded: a zero-length or sub-300 ms session reports 0
   rather than NaN or Infinity.
   ========================================================================= */
(function (global) {
  'use strict';

  var CHARS_PER_WORD = 5;
  var MIN_MEASURED_MS = 300;   // below this, speed reads as 0 instead of infinity

  // Per-character states
  var PENDING = 0;
  var CORRECT = 1;
  var WRONG = 2;

  function now() {
    if (global.performance && typeof global.performance.now === 'function') {
      return global.performance.now();
    }
    return Date.now();
  }

  function TypingEngine(options) {
    options = options || {};
    this.onUpdate = options.onUpdate || null;      // (stats, engine)
    this.onComplete = options.onComplete || null;  // (result, engine)
    this.onMistake = options.onMistake || null;    // (expected, typed, index)
    this.onFirstInput = options.onFirstInput || null;

    this.reset(null);
  }

  TypingEngine.PENDING = PENDING;
  TypingEngine.CORRECT = CORRECT;
  TypingEngine.WRONG = WRONG;
  TypingEngine.CHARS_PER_WORD = CHARS_PER_WORD;

  TypingEngine.prototype = {

    /* ------------------------------------------------------------ lifecycle */

    /**
     * Start a session.
     * @param {string} text     the passage to type
     * @param {object} opts     { timeLimitMs, lessonId, lessonTitle, mastery }
     */
    load: function (text, opts) {
      opts = opts || {};
      this.text = String(text == null ? '' : text);
      this.states = new Array(this.text.length);
      for (var i = 0; i < this.states.length; i++) this.states[i] = PENDING;

      this.timeLimitMs = opts.timeLimitMs || 0;
      this.lessonId = opts.lessonId || '';
      this.lessonTitle = opts.lessonTitle || '';
      this.mastery = opts.mastery || null;

      this.index = 0;
      this.typed = 0;
      this.errors = 0;
      this.mistakesMade = 0;      // never decremented: mistakes made this session
      this.mistakes = [];         // mistakes still wrong on screen
      this.mistakesAll = [];      // every mistake, corrected or not
      this.started = false;
      this.startTime = 0;
      this.endTime = 0;
      this.finished = false;
      this.finishReason = '';
      this.lastEmit = 0;

      this._emit(true);
    },

    /** Clear the passage and put the engine back to its initial state. */
    reset: function (text) {
      this.text = typeof text === 'string' ? text : (text || '');
      this.states = new Array(this.text.length);
      for (var i = 0; i < this.states.length; i++) this.states[i] = PENDING;

      this.timeLimitMs = 0;
      this.lessonId = '';
      this.lessonTitle = '';
      this.mastery = null;

      this.index = 0;
      this.typed = 0;
      this.errors = 0;
      this.mistakesMade = 0;
      this.mistakes = [];
      this.mistakesAll = [];
      this.started = false;
      this.startTime = 0;
      this.endTime = 0;
      this.finished = false;
      this.finishReason = '';
      this.lastEmit = 0;
    },

    /* ------------------------------------------------------------- input */

    /** True once the clock is running. */
    isRunning: function () {
      return this.started && !this.finished;
    },

    isStarted: function () {
      return this.started;
    },

    /**
     * Record one typed character. Returns 'ok' | 'wrong' | 'ignored'.
     * A character that arrives after the passage has ended is ignored, never
     * counted as correct, and never advances the caret.
     */
    press: function (ch) {
      if (this.finished || this.index >= this.text.length) return 'ignored';
      if (typeof ch !== 'string' || ch.length === 0) return 'ignored';

      this._startClock();

      var expected = this.text.charAt(this.index);
      var isCorrect = ch === expected;

      this.typed += 1;
      if (isCorrect) {
        this.states[this.index] = CORRECT;
      } else {
        this.states[this.index] = WRONG;
        this.errors += 1;
        this.mistakesMade += 1;
        var slip = { index: this.index, expected: expected, typed: ch, at: Date.now() };
        this.mistakes.push(slip);
        this.mistakesAll.push(slip);
        if (this.onMistake) this.onMistake(expected, ch, this.index);
      }

      this.index += 1;
      this._emit(true);                 // keystrokes always render immediately

      if (this.index >= this.text.length) this._finish('finished');
      return isCorrect ? 'ok' : 'wrong';
    },

    /**
     * Delete the character before the caret. Only ever steps back over text the
     * user has already attempted — the caret can never skip ahead.
     */
    backspace: function () {
      if (this.index === 0) return false;
      this._startClock();
      this.index -= 1;
      if (this.states[this.index] === WRONG) {
        this.errors -= 1;
        // Drop the most recent mistake for this position so a review of the
        // passage shows only mistakes still on screen.
        for (var m = this.mistakes.length - 1; m >= 0; m--) {
          if (this.mistakes[m].index === this.index) { this.mistakes.splice(m, 1); break; }
        }
      }
      this.states[this.index] = PENDING;
      this._emit(true);
      return true;
    },

    /** Stop the session early (used when the user leaves mid-passage). */
    abort: function () {
      if (this.finished) return;
      this._finish('aborted');
    },

    _startClock: function () {
      if (!this.started) {
        this.started = true;
        this.startTime = now();
        if (this.onFirstInput) this.onFirstInput();
      }
    },

    _finish: function (reason) {
      if (this.finished) return;
      this.finished = true;
      this.finishReason = reason;
      this.endTime = now();
      if (!this.started) { this.started = true; this.startTime = this.endTime; }
      if (this.onComplete) this.onComplete(this.result(), reason);
    },

    /**
     * Tick the clock. The app calls this from a timer loop; it emits an update
     * and finishes the session if a timed test has run out.
     */
    tick: function () {
      if (this.finished || !this.started) return false;
      var s = this.stats();
      if (this.timeLimitMs > 0 && s.remainingMs <= 0) {
        this._finish('time');
        return true;
      }
      this._emit();
      return false;
    },

    /* ----------------------------------------------------------- readings */

    /** Milliseconds of active typing time so far. */
    elapsedMs: function () {
      if (!this.started) return 0;
      var end = this.finished ? this.endTime : now();
      return Math.max(0, end - this.startTime);
    },

    remainingMs: function () {
      if (this.timeLimitMs <= 0) return 0;
      return Math.max(0, this.timeLimitMs - this.elapsedMs());
    },

    correctChars: function () {
      return this.index - this.errors;
    },

    /** Letters the user should practise: the worst keys still on screen. */
    liveMistakes: function () {
      return this.mistakes.slice();
    },

    /**
     * The full set of numbers used by the stats row, the results screen and
     * the progress record.
     */
    stats: function () {
      var elapsed = this.elapsedMs();
      var correct = this.correctChars();
      var errors = this.errors;
      var measured = elapsed >= MIN_MEASURED_MS && this.typed > 0;
      var minutes = elapsed / 60000;

      var net = 0, gross = 0, accuracy = 100;

      if (measured && minutes > 0) {
        gross = (this.typed / CHARS_PER_WORD) / minutes;
        net = Math.max(0, ((correct - errors) / CHARS_PER_WORD) / minutes);
      }
      if (this.typed > 0) {
        accuracy = (correct / this.typed) * 100;
      }
      if (!isFinite(net)) net = 0;
      if (!isFinite(gross)) gross = 0;
      if (!isFinite(accuracy)) accuracy = 0;
      accuracy = Math.max(0, Math.min(100, accuracy));

      return {
        netWpm: net,
        grossWpm: gross,
        accuracy: accuracy,
        correct: correct,
        incorrect: errors,
        typed: this.typed,
        index: this.index,
        total: this.text.length,
        elapsedMs: elapsed,
        remainingMs: this.remainingMs(),
        progress: this.text.length ? Math.min(1, this.index / this.text.length) : 0,
        finished: this.finished,
        started: this.started
      };
    },

    /**
     * The record written to storage after a session.
     * `completed` means the whole passage was typed; `mastery` is the lesson's
     * own pass mark, which only counts when the passage was finished.
     */
    result: function () {
      var s = this.stats();
      return {
        lessonId: this.lessonId,
        lessonTitle: this.lessonTitle,
        netWpm: s.netWpm,
        grossWpm: s.grossWpm,
        accuracy: s.accuracy,
        correct: s.correct,
        incorrect: s.incorrect,
        typed: this.typed,
        mistakesMade: this.mistakesMade,
        durationMs: s.elapsedMs,
        completed: this.index >= this.text.length && this.text.length > 0,
        timed: this.timeLimitMs > 0,
        mastery: this.mastery,
        mistakes: this.mistakes.slice(),
        mistakesAll: this.mistakesAll.slice()
      };
    },

    /** Every mistake made, with the surrounding text, for the review screen. */
    reviewItems: function () {
      var self = this;
      return this.mistakesAll.map(function (m) {
        var start = Math.max(0, m.index - 18);
        var end = Math.min(self.text.length, m.index + 19);
        return {
          index: m.index,
          expected: m.expected,
          typed: m.typed,
          fixed: self.states[m.index] !== WRONG,
          context: self.text.slice(start, end)
        };
      });
    },

    /* -------------------------------------------------------------- output */

    _emit: function (force) {
      var t = now();
      // Stats are throttled to ~12 Hz so a fast typist cannot flood the DOM.
      if (!force && (t - this.lastEmit) < 80) return;
      this.lastEmit = t;
      if (this.onUpdate) this.onUpdate(this.stats(), this);
    }
  };

  TypingEngine.now = now;
  global.TypingMasterEngine = TypingEngine;
  global.TypingMasterEngine.PENDING = PENDING;
  global.TypingMasterEngine.CORRECT = CORRECT;
  global.TypingMasterEngine.WRONG = WRONG;
})(typeof window !== 'undefined' ? window : globalThis);
