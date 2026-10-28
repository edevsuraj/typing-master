/* =========================================================================
   Typing Master — Application (app.js)
   -------------------------------------------------------------------------
   Wires the DOM to the typing engine, the curriculum and local storage.

   Responsibilities
   ----------------
   * Build a guided-lesson session for the current lesson.
   * Render the passage character by character, move the caret, keep the
     current line in view.
   * Turn physical keystrokes into engine input, without stealing keys from
     buttons, selects or dialogs.
   * Show live statistics, a compact results card and a passage review.
   * Remember everything worth remembering in localStorage.

   There is no on-screen keyboard anywhere in this application: input comes
   from a real keyboard through a visually hidden <textarea>.
   ========================================================================= */
(function (global) {
  'use strict';

  var L = global.TypingMasterLessons;
  var Store = global.TypingMasterStore;
  var Engine = global.TypingMasterEngine;

  var doc = global.document;

  /* ------------------------------------------------------------- config */

  // Keys that scroll the page if they are not swallowed while typing.
  var SCROLL_KEYS = {
    ArrowUp: 1, ArrowDown: 1, ArrowLeft: 1, ArrowRight: 1,
    PageUp: 1, PageDown: 1, Home: 1, End: 1, ' ': 1
  };

  /* -------------------------------------------------------------- state */

  var dom = {};
  var engine = null;
  var spans = [];
  var currentIndex = -1;
  var caretLineHeight = 0;
  var caretCharWidth = 0;
  var floatingCaret = null;
  var contentHeight = 0;
  var viewportHeight = 0;
  var tickTimer = null;
  var toastTimer = null;
  var resetArmed = false;
  var resetTimer = null;
  var capsOn = false;
  var pendingMistakes = [];
  var mistakeFlushTimer = null;

  var session = {
    lessonId: null,
    passageIndex: 0,
    text: ''
  };

  /* ================================================================ boot */

  function init() {
    cacheDom();
    bindEvents();
    applyTheme(Store.setting('theme'));
    applyCaretStyle();

    buildLessonList();
    syncControlsFromSettings();

    engine = new Engine({
      onUpdate: onEngineUpdate,
      onComplete: onEngineComplete,
      onMistake: noteMistake,
      onFirstInput: onFirstInput
    });

    startTicker();

    // Restore the last lesson the user was on, or recommend the next one.
    var resumeId = Store.get().progress.lastLessonId;
    var lesson = (resumeId && L.getLesson(resumeId)) || L.nextLesson(Store.completedIds());
    startSession({ lessonId: lesson ? lesson.id : L.LESSONS[0].id });

    renderProgressView();

    if (Store.hadCorruption()) {
      toast('Saved progress was unreadable and has been reset.');
    } else if (!Store.available()) {
      toast('Saving is unavailable in this browser — progress lasts for this visit only.');
    }
  }

  function cacheDom() {
    var id = function (x) { return doc.getElementById(x); };
    Object.assign(dom, {
      restartBtn: id('restart-btn'),
      homeBtn: id('home-btn'),
      lessonsBtn: id('lessons-btn'),
      themeBtn: id('theme-btn'),

      lessonLabel: id('lesson-label'),
      lessonTitle: id('lesson-title'),
      objective: id('objective'),
      keyChips: id('key-chips'),

      statbar: id('statbar'),
      statWpm: id('stat-wpm'),
      statAcc: id('stat-acc'),
      statTime: id('stat-time'),
      timeLabel: id('time-label'),

      viewport: id('tm-text'),
      text: id('text-inner'),
      capture: id('capture'),
      textHint: id('text-hint'),
      capsHint: id('caps-hint'),
      progressBar: id('progress-bar'),
      statusLine: id('status-line'),

      panel: id('panel'),
      panelClose: id('panel-close'),
      tabLessons: id('tab-lessons'),
      tabProgress: id('tab-progress'),
      viewLessons: id('view-lessons'),
      viewProgress: id('view-progress'),
      lessonList: id('lesson-list'),
      summary: id('summary'),
      recentList: id('recent-list'),
      recentEmpty: id('recent-empty'),
      weakList: id('weak-list'),
      weakEmpty: id('weak-empty'),
      themeSelect: id('theme-select'),
      caretSelect: id('caret-select'),
      liveStats: id('live-stats'),
      resetBtn: id('reset-btn'),
      resetHint: id('reset-hint'),

      results: id('results'),
      resultsKicker: id('results-kicker'),
      resultsTitle: id('results-title'),
      resultsClose: id('results-close'),
      rWpm: id('r-wpm'),
      rAcc: id('r-acc'),
      rMessage: id('r-message'),
      rGross: id('r-gross'),
      rChars: id('r-chars'),
      rDuration: id('r-duration'),
      rBest: id('r-best'),
      rMistakes: id('r-mistakes'),
      rRetry: id('r-retry'),
      rNext: id('r-next'),
      rReview: id('r-review'),
      review: id('review'),
      reviewTitle: id('review-title'),
      reviewText: id('review-text'),
      reviewList: id('review-list'),
      reviewBack: id('review-back'),

      toast: id('toast')
    });
  }

  function bindEvents() {
    if (dom.restartBtn) dom.restartBtn.addEventListener('click', restart);
    dom.homeBtn.addEventListener('click', goHome);
    var reloadBtn = doc.querySelector('.btn-reload');
    if (reloadBtn) reloadBtn.addEventListener('click', function () { location.reload(); });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'F5' || (e.ctrlKey && (e.key === 'r' || e.key === 'R'))) {
        e.preventDefault();
        location.reload();
      }
    });
    dom.lessonsBtn.addEventListener('click', togglePanel);
    dom.themeBtn.addEventListener('click', function () {
      var current = doc.documentElement.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
      Store.setting('theme', current === 'dark' ? 'light' : 'dark');
      syncControlsFromSettings();
    });

    // Keystrokes. The listener lives on the hidden textarea, so buttons,
    // selects and dialogs keep their own keys.
    dom.capture.addEventListener('keydown', onCaptureKeyDown);
    dom.capture.addEventListener('input', onCaptureInput);
    dom.capture.addEventListener('paste', function (e) { e.preventDefault(); });
    dom.capture.addEventListener('focus', onCaptureFocus);
    dom.capture.addEventListener('blur', onCaptureBlur);

    // Clicking the passage area should never require a second click.
    dom.viewport.addEventListener('mousedown', function (e) {
      if (e.target !== dom.capture && e.target.closest('button, a, select')) return;
      e.preventDefault();
      focusCapture();
    });

    // Escape is handled once, here, so it cannot fire twice for one keypress.
    doc.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (dom.results.hasAttribute('open')) { e.preventDefault(); closeResults(); return; }
      if (dom.panel.hasAttribute('open')) { e.preventDefault(); closePanel(); return; }
      if (doc.activeElement === dom.capture) { e.preventDefault(); openPanel(); }
    });

    // If focus has wandered off the typing field during a live session, the
    // next real key press is taken as "carry on" rather than being lost to the
    // browser. Keys aimed at buttons, links and selects are left alone.
    doc.addEventListener('keydown', function (e) {
      if (anyDialogOpen()) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target === dom.capture) return;         // already handled locally
      var target = e.target;
      if (target && target.closest && target.closest('button, a, select, input, textarea, [contenteditable]')) return;
      if (!engine || engine.finished) return;
      if (e.key && e.key.length === 1) {
        e.preventDefault();
        focusCapture();
        engine.press(e.key);
      }
    });

    doc.addEventListener('visibilitychange', function () {
      if (doc.visibilityState === 'visible' && !anyDialogOpen()) focusCapture();
    });
    global.addEventListener('resize', onResize);
    global.addEventListener('orientationchange', onResize);

    // Dialogs
    dom.panelClose.addEventListener('click', closePanel);
    dom.panel.addEventListener('close', function () {
      dom.lessonsBtn.setAttribute('aria-expanded', 'false');
      focusCapture();
    });
    dom.resultsClose.addEventListener('click', closeResults);
    dom.results.addEventListener('close', function () {
      showReview(false);
      focusCapture();
    });

    dom.tabLessons.addEventListener('click', function () { switchPanelTab('lessons'); });
    dom.tabProgress.addEventListener('click', function () { switchPanelTab('progress'); });

    dom.themeSelect.addEventListener('change', function () {
      applyTheme(dom.themeSelect.value);
      Store.setting('theme', dom.themeSelect.value);
    });
    dom.caretSelect.addEventListener('change', function () {
      Store.setting('caret', dom.caretSelect.value);
      applyCaretStyle();
      placeFloatingCaret(true);
    });
    dom.liveStats.addEventListener('change', function () {
      Store.setting('liveStats', dom.liveStats.checked);
      dom.statbar.classList.toggle('is-hidden', !dom.liveStats.checked);
    });

    dom.resetBtn.addEventListener('click', onResetClick);

    dom.rRetry.addEventListener('click', function () { closeResults(); restart(); });
    dom.rNext.addEventListener('click', function () {
      var next = L.nextAfter(session.lessonId);
      closeResults();
      startSession({ lessonId: next ? next.id : session.lessonId });
    });
    dom.rReview.addEventListener('click', function () { showReview(true); });
    dom.reviewBack.addEventListener('click', function () { showReview(false); });

    dom.capture.addEventListener('keyup', function (e) { updateCapsHint(e); });
    doc.addEventListener('keyup', function (e) {
      if (e.key === 'CapsLock') { capsOn = e.getModifierState ? e.getModifierState('CapsLock') : capsOn; updateCapsHint(null); }
    });
  }

  function syncControlsFromSettings() {
    var s = Store.get().settings;
    dom.themeSelect.value = s.theme;
    dom.caretSelect.value = s.caret;
    dom.liveStats.checked = !!s.liveStats;
    dom.statbar.classList.toggle('is-hidden', !s.liveStats);
  }

  /* ============================================================ sessions */

  /**
   * Build and start a guided session.
   * @param {object} opts { lessonId, passageIndex }
   */
  function startSession(opts) {
    opts = opts || {};
    var lesson = L.getLesson(opts.lessonId) || L.getLesson(session.lessonId) || L.LESSONS[0];

    var built = buildText(lesson, opts);
    var text = built.text;

    session.lessonId = lesson.id;
    session.passageIndex = built.passageIndex || opts.passageIndex || 0;
    session.text = text;

    engine.load(text, {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      mastery: lesson.mastery
    });

    Store.setLastLesson(lesson.id);

    paintHeader(lesson);
    renderPassage(text);
    paintStatus(lesson);
    updateStats(engine.stats());
    startTicker();
    focusCapture();
    markCurrentLessonRow();
  }

  /** The passage to type for a lesson. Returns { text, passageIndex }. */
  function buildText(lesson, opts) {
    opts = opts || {};
    var idx = (opts.passageIndex || 0) % lesson.passages.length;
    return { text: lesson.passages[idx], passageIndex: idx };
  }

  /* =============================================================== paint */

  function paintHeader(lesson) {
    dom.lessonLabel.textContent = lesson.label;
    dom.lessonTitle.textContent = lesson.title;
    dom.objective.textContent = lesson.objective;

    dom.keyChips.innerHTML = '';
    (lesson.keys || []).slice(0, 22).forEach(function (k) {
      var li = doc.createElement('li');
      li.className = 'key-chip' + ((lesson.newKeys || []).indexOf(k) >= 0 ? ' is-new' : '');
      li.textContent = k === 'Shift' ? 'shift' : k;
      dom.keyChips.appendChild(li);
    });
  }

  function paintStatus(lesson) {
    dom.statusLine.textContent = 'Passage ' + (session.passageIndex + 1) + ' of ' + lesson.passages.length +
      ' · mastery ' + lesson.mastery.wpm + ' wpm at ' + lesson.mastery.accuracy + '% accuracy';
  }

  /** Render the passage as one span per character. */
  function renderPassage(text) {
    var frag = doc.createDocumentFragment();
    spans = new Array(text.length);
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      var span = doc.createElement('span');
      var isNewline = ch === '\n';
      span.className = 'tm-ch' + (isNewline ? ' is-nl' : '');
      // A faint ↵ keeps line breaks visible without disturbing the layout.
      span.textContent = isNewline ? '\u21B5' : ch;
      frag.appendChild(span);
      spans[i] = span;
    }
    dom.text.textContent = '';
    dom.text.appendChild(frag);
    measureCaret();
    measureText();
    setCaret(0);
    placeFloatingCaret(true); // rest the gliding caret at the start without a sweep
  }

  function setCaret(index) {
    if (currentIndex >= 0 && spans[currentIndex]) {
      spans[currentIndex].classList.remove('is-current');
    }
    currentIndex = index;
    var span = spans[index];
    if (!span) {
      hideFloatingCaret();
      syncScroll();
      return;
    }
    span.classList.add('is-current');
    placeFloatingCaret(false);
    if (engine && !engine.isStarted()) floatingCaret && floatingCaret.classList.add('caret-blink');
    syncScroll();
  }

  /* ---------------------------------------------------------------------
     The floating caret: a small accent bar that GLIDES from character to
     character (and wraps between lines) instead of teleporting. The current
     character keeps its colour change for instant feedback; the glide itself
     is the smoothness the typist feels. */
  function ensureFloatingCaret() {
    if (!doc.createElement) return;
    if (floatingCaret && floatingCaret.parentNode === dom.text) return;
    // A fresh passage wipes the container, so rebuild the caret whenever the
    // old element is no longer attached.
    if (floatingCaret && floatingCaret.parentNode) {
      floatingCaret.parentNode.removeChild(floatingCaret);
    }
    floatingCaret = doc.createElement('div');
    floatingCaret.className = 'float-caret';
    dom.text.appendChild(floatingCaret);
    floatingCaret.style.display = '';
  }
  function caretStyle() { return Store.setting('caret'); }

  function placeFloatingCaret(instant) {
    var style = caretStyle();
    if (style === 'none') { hideFloatingCaret(); return; }
    ensureFloatingCaret();
    var span = spans[currentIndex];
    if (!span) { hideFloatingCaret(); return; }    var lineTop = Math.round(span.offsetTop / caretLineHeight) * caretLineHeight;
    var left = span.offsetLeft;
    var w = caretCharWidth, h = caretLineHeight - 4, top = lineTop + 2;
    floatingCaret.className = 'float-caret is-' + style;
    if (style === 'line') { w = 2; left = span.offsetLeft - 2; }
    else if (style === 'underline') { h = 2; top = lineTop + caretLineHeight - 3; }
    floatingCaret.style.width = w + 'px';
    floatingCaret.style.height = h + 'px';
    if (instant) {
      // Reposition without a glide (fresh passage, resize, theme rebuild):
      floatingCaret.style.transition = 'none';
      floatingCaret.style.transform = 'translate(' + Math.round(left) + 'px, ' + Math.round(top) + 'px)';
      void floatingCaret.offsetWidth; // flush, then re-enable the glide
      floatingCaret.style.transition = '';
    } else {
      floatingCaret.style.transform = 'translate(' + Math.round(left) + 'px, ' + Math.round(top) + 'px)';
    }
  }

  function hideFloatingCaret() {
    if (floatingCaret) floatingCaret.style.display = 'none';
  }


  /** Keep the line being typed inside the viewport, centred when possible. */
  function syncScroll() {
    var span = spans[currentIndex];
    if (!span) return;
    if (!viewportHeight || !caretLineHeight || contentHeight <= viewportHeight) {
      dom.text.style.transform = 'translateY(0px)';
      return;
    }

    // A character span is an inline box sitting inside its line box, offset by
    // the extra leading, so offsetTop is not a line boundary. Snap it back onto
    // the grid: line boxes start at k * caretLineHeight down the passage.
    var lineTop = Math.round(span.offsetTop / caretLineHeight) * caretLineHeight;

    // Centre the caret line, then clamp that offset to the window in which the
    // caret's line is fully visible and the passage still begins and ends
    // where it should. Without this clamp the opening line of a long passage
    // scrolls straight out of sight, so the opening words cannot be read.
    var desired = lineTop - (viewportHeight / 2) + (caretLineHeight / 2);
    var lowest = Math.max(-(contentHeight - viewportHeight), -lineTop);   // end of passage / caret at the top
    var highest = Math.min(0, viewportHeight - lineTop - caretLineHeight); // start of passage / caret at the bottom
    var y = Math.max(lowest, Math.min(highest, desired));
    dom.text.style.transform = 'translateY(' + Math.round(y) + 'px)';
  }

  function measureCaret() {
    var lineHeight = parseFloat(global.getComputedStyle(dom.text).lineHeight);
    if (lineHeight && isFinite(lineHeight)) caretLineHeight = lineHeight;
    // Monospace type: the horizontal rhythm of any two adjacent characters
    // gives the width one caret block should cover.
    if (spans.length > 1) {
      var w = spans[1].offsetLeft - spans[0].offsetLeft;
      if (w > 0 && isFinite(w)) caretCharWidth = w;
    }
  }

  /** Cache the two layout numbers the caret maths needs, so that moving the
      caret during typing does not have to re-measure the whole passage. */
  function measureText() {
    viewportHeight = dom.viewport.clientHeight;
    contentHeight = dom.text.scrollHeight;
    // A passage shorter than the window is centred rather than top-aligned.
    dom.viewport.classList.toggle('is-short', contentHeight < viewportHeight);
    if (dom.viewport.classList.contains('is-short')) dom.text.style.transform = 'translateY(0px)';
  }

  function onResize() {
    measureCaret();
    measureText();
    syncScroll();
    placeFloatingCaret(true);
  }

  /* =============================================================== input */

  function onCaptureKeyDown(e) {
    if (e.metaKey || e.ctrlKey) {
      if (e.key === 'Enter') { e.preventDefault(); restart(); }
      return;                                  // leave browser shortcuts alone
    }
    if (e.altKey) return;

    updateCapsHint(e);

    switch (e.key) {
      case 'Tab':
        e.preventDefault();
        typeText('  ');                       // Tab inserts two spaces
        return;
      case 'Backspace':
        e.preventDefault();
        engine.backspace();
        return;
      case 'Enter':
        e.preventDefault();
        engine.press('\n');
        return;
      default:
        break;
    }

    if (e.key && e.key.length === 1) {
      e.preventDefault();                     // also stops the page scrolling
      engine.press(e.key);
      return;
    }

    if (SCROLL_KEYS[e.key] || e.key === 'Spacebar') e.preventDefault();
  }

  /**
   * Fallback path for IME composition and on-screen keyboards, where keydown
   * either does not fire or reports a placeholder key such as "Process".
   */
  function onCaptureInput() {
    var value = dom.capture.value;
    if (!value) return;
    dom.capture.value = '';
    for (var i = 0; i < value.length; i++) engine.press(value.charAt(i));
  }

  function typeText(str) {
    for (var i = 0; i < str.length; i++) engine.press(str.charAt(i));
  }

  function onFirstInput() {
    placeFloatingCaret(false); // run the active style, without the idle blink
    if (floatingCaret) floatingCaret.classList.remove('caret-blink');
    dom.textHint.textContent = 'Backspace fixes a mistake. Ctrl + Enter restarts.';
  }

  function onCaptureFocus() {
    dom.viewport.classList.remove('is-idle');
    dom.textHint.textContent = 'Backspace fixes a mistake. Ctrl + Enter restarts.';
    updateCapsHint(null);
  }

  function onCaptureBlur() {
    if (anyDialogOpen()) return;
    dom.viewport.classList.add('is-idle');
    if (engine && !engine.finished) {
      dom.textHint.textContent = 'Keep typing, or click the text to carry on.';
    }
  }

  function updateCapsHint(e) {
    if (e && e.getModifierState) capsOn = e.getModifierState('CapsLock');
    if (!dom.capsHint) return;
    var upcoming = spans[currentIndex] ? spans[currentIndex].textContent : '';
    var expectsUpper = /[A-Z0-9~!@#$%^&*()_+{}|:"<>?]/.test(upcoming);
    dom.capsHint.hidden = !(capsOn && !expectsUpper);
  }

  /* -------------------------------------------------- weak-key bookkeeping */

  /**
   * Mistakes are batched before they touch localStorage: writing on every
   * keystroke would make storage the slowest part of typing.
   */
  function noteMistake(expected) {
    pendingMistakes.push(expected);
    if (mistakeFlushTimer) return;
    mistakeFlushTimer = global.setTimeout(flushMistakes, 1200);
  }

  function flushMistakes() {
    global.clearTimeout(mistakeFlushTimer);
    mistakeFlushTimer = null;
    if (!pendingMistakes.length) return;
    Store.recordMistakes(pendingMistakes);
    pendingMistakes = [];
  }

  function focusCapture() {
    if (anyDialogOpen()) return;
    try { dom.capture.focus({ preventScroll: true }); } catch (e) { dom.capture.focus(); }
  }

  /* ============================================================== output */

  function onEngineUpdate(stats) {
    if (currentIndex !== stats.index) {
      // Re-state the character we just moved past, then move the caret.
      syncCharState(stats.index - 1);
      setCaret(stats.index);
    } else if (!stats.finished) {
      syncCharState(stats.index);
    }
    updateStats(stats);
    updateCapsHint(null);
  }

  function syncCharState(index) {
    var span = spans[index];
    if (!span) return;
    var state = engine.states[index];
    span.classList.toggle('is-correct', state === Engine.CORRECT);
    span.classList.toggle('is-wrong', state === Engine.WRONG);
  }

  function updateStats(stats) {
    if (!stats) return;
    dom.statWpm.textContent = String(Math.round(stats.netWpm));
    dom.statAcc.textContent = String(Math.round(stats.accuracy));
    dom.timeLabel.textContent = 'elapsed';
    dom.statTime.textContent = formatClock(stats.elapsedMs, false);
    dom.progressBar.style.width = (stats.progress * 100).toFixed(1) + '%';
  }

  /**
   * One shared 80 ms ticker drives the clock. It is stopped once a session
   * finishes and re-armed by the next startSession(), so an idle page costs
   * nothing while a running test always counts down.
   */
  function startTicker() {
    if (tickTimer) return;
    tickTimer = global.setInterval(function () {
      if (!engine) return;
      engine.tick();
      if (engine.finished && tickTimer) {
        global.clearInterval(tickTimer);
        tickTimer = null;
      }
    }, 80);
  }

  /* ============================================================= results */

  function onEngineComplete(result, reason) {
    flushMistakes();
    var previousBest = Store.get().stats.bestWpm;
    var lesson = L.getLesson(session.lessonId) || L.LESSONS[0];

    var record = {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      netWpm: result.netWpm,
      grossWpm: result.grossWpm,
      accuracy: result.accuracy,
      correct: result.correct,
      incorrect: result.incorrect,
      typed: result.typed,
      durationMs: result.durationMs,
      completed: result.completed,
      mastery: lesson.mastery
    };

    var saved = null;
    if (result.typed > 0) saved = Store.recordSession(record);

    showResults(result, reason, saved, previousBest, lesson);
    buildLessonList();
    renderProgressView();
    markCurrentLessonRow();
  }

  function showResults(result, reason, saved, previousBest, lesson) {
    var titles = {
      finished: result.completed ? 'Passage complete' : 'Session ended',
      time: 'Time is up',
      aborted: 'Session ended'
    };

    dom.resultsKicker.textContent = lesson.label;
    dom.resultsTitle.textContent = titles[reason] || 'Session ended';

    // A handful of characters in well under a second cannot produce a
    // meaningful speed, so the app says so rather than printing a silly number.
    var tooShortToMeasure = result.durationMs < 1000;
    dom.rWpm.textContent = tooShortToMeasure ? '—' : String(Math.round(result.netWpm));
    dom.rAcc.textContent = String(Math.round(result.accuracy));
    dom.rGross.textContent = tooShortToMeasure ? 'too short to measure' : Math.round(result.grossWpm) + ' wpm';
    dom.rChars.textContent = result.correct + ' correct · ' + result.incorrect + ' wrong';
    dom.rDuration.textContent = formatDuration(result.durationMs);

    // Personal best, stated honestly.
    var bestNow = Store.get().stats.bestWpm;
    if (result.typed < 60) {
      dom.rBest.textContent = 'too short to count';
    } else if (saved && saved.newBestWpm) {
      dom.rBest.textContent = 'new best · ' + Math.round(bestNow) + ' wpm';
    } else if (previousBest > 0) {
      var delta = Math.round(result.netWpm) - Math.round(previousBest);
      dom.rBest.textContent = Math.round(bestNow) + ' wpm (' + (delta >= 0 ? '+' : '') + delta + ' today)';
    } else {
      dom.rBest.textContent = Math.round(bestNow) + ' wpm';
    }

    dom.rMessage.textContent = buildMessage(result, saved, lesson);

    // Which keys were missed, most frequent first.
    dom.rMistakes.textContent = '';
    var counts = {};
    (result.mistakesAll || result.mistakes || []).forEach(function (m) {
      counts[m.expected] = (counts[m.expected] || 0) + 1;
    });
    var keys = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; }).slice(0, 10);
    if (keys.length) {
      var note = doc.createElement('li');
      note.className = 'mistake-note';
      note.textContent = 'Most missed:';
      dom.rMistakes.appendChild(note);
      keys.forEach(function (k) {
        var li = doc.createElement('li');
        li.className = 'mistake-chip';
        li.textContent = (k === ' ' ? 'space' : (k === '\n' ? 'return' : k)) + ' ×' + counts[k];
        dom.rMistakes.appendChild(li);
      });
    }

    var next = L.nextAfter(lesson.id);
    dom.rNext.hidden = !next;
    if (next) dom.rNext.textContent = 'Next · ' + next.label;

    renderReview(result);
    openDialog(dom.results);
    dom.rRetry.focus();
  }

  /** A short, honest, constructive comment. Never claims progress it cannot prove. */
  function buildMessage(result, saved, lesson) {
    var parts = [];
    var mastery = lesson.mastery;
    var slips = result.mistakesMade || 0;

    if (result.typed === 0) {
      return 'No characters were typed, so nothing was recorded.';
    }
    if (result.durationMs < 1000) {
      return 'Only ' + result.typed + ' characters, typed in under a second — too short to measure speed or accuracy. ' +
             'Work through the whole passage and the numbers will mean something.';
    }

    if (saved && saved.newBestWpm) parts.push('New personal best.');

    if (result.accuracy < 85) {
      parts.push('Accuracy comes first: you slipped on ' + slips + ' character' + (slips === 1 ? '' : 's') +
                 '. Slow down a little and fix each mistake the moment it happens.');
    } else if (slips > 0) {
      parts.push('All ' + result.correct + ' characters are correct on screen; the accuracy figure is below 100% because you typed ' +
                 slips + ' key' + (slips === 1 ? '' : 's') + ' wrongly before correcting ' + (slips === 1 ? 'it' : 'them') + '.');
    }

    if (mastery && result.completed && result.netWpm >= mastery.wpm && result.accuracy >= mastery.accuracy) {
      parts.push('Lesson mastered — ' + Math.round(result.netWpm) + ' wpm at ' +
                 Math.round(result.accuracy) + '% accuracy, against a target of ' +
                 mastery.wpm + ' wpm at ' + mastery.accuracy + '%.');
    } else if (mastery && result.completed) {
      var missing = [];
      if (result.netWpm < mastery.wpm) missing.push(Math.round(mastery.wpm - result.netWpm) + ' more wpm');
      if (result.accuracy < mastery.accuracy) {
        missing.push(Math.round(mastery.accuracy - result.accuracy) + ' points more accuracy');
      }
      if (missing.length) {
        parts.push('To master this lesson you need ' + missing.join(' and ') + '.');
      } else {
        parts.push('That meets the lesson target.');
      }
    } else if (result.accuracy >= 97 && slips === 0) {
      parts.push('Very accurate. If you can hold this, the next step is simply a little more speed.');
    }

    if (saved && saved.masteryEligible === false && result.completed) {
      parts.push('Typed too quickly to count towards mastery — type it once more at an even pace and the lesson will be marked.');
    }

    if (saved && saved.masteredNow) {
      parts.push('Marked as mastered in your progress.');
    }
    return parts.join(' ');
  }

  /* --------------------------------------------------------- the review */

  function renderReview(result) {
    var text = engine.text;
    var frag = doc.createDocumentFragment();
    var list = dom.reviewList;
    list.textContent = '';

    for (var i = 0; i < text.length; i++) {
      var span = doc.createElement('span');
      var ch = text.charAt(i);
      var isNewline = ch === '\n';
      span.className = 'tm-ch' + (isNewline ? ' is-nl' : '');
      span.textContent = isNewline ? '\u21B5' : ch;
      if (engine.states[i] === Engine.WRONG) span.classList.add('is-wrong');
      else if (engine.states[i] === Engine.CORRECT) span.classList.add('is-correct');
      frag.appendChild(span);
    }
    dom.reviewText.textContent = '';
    dom.reviewText.appendChild(frag);
    dom.reviewText.setAttribute('data-caret', 'none');

    var mistakes = engine.reviewItems();
    if (!mistakes.length) {
      var li = doc.createElement('li');
      li.textContent = 'No mistakes on this passage.';
      list.appendChild(li);
      return;
    }
    mistakes.slice(0, 40).forEach(function (m) {
      var li = doc.createElement('li');
      var context = m.context;
      var offset = m.index - Math.max(0, m.index - 18);
      li.appendChild(doc.createTextNode(context.slice(0, offset)));
      var mark = doc.createElement('mark');
      mark.textContent = m.expected === '\n' ? 'return' : (m.expected === ' ' ? 'space' : m.expected);
      li.appendChild(mark);
      li.appendChild(doc.createTextNode(context.slice(offset + 1)));
      if (m.fixed) {
        var fixed = doc.createElement('span');
        fixed.textContent = '  (typed “' + (m.typed === ' ' ? 'space' : m.typed) + '”, corrected)';
        fixed.style.opacity = '0.65';
        li.appendChild(fixed);
      }
      list.appendChild(li);
    });
  }

  function showReview(on) {
    dom.review.hidden = !on;
    ['rRetry', 'rNext', 'rReview'].forEach(function (k) {
      dom[k].hidden = !!on;
    });
    if (on) {
      dom.reviewBack.focus();
      dom.reviewText.scrollTop = 0;
    }
  }

  function closeResults() {
    if (dom.results.hasAttribute('open')) closeDialog(dom.results);
  }

  /* ============================================================== panel */

  function buildLessonList() {
    dom.lessonList.textContent = '';

    L.STAGES.forEach(function (stage) {
      var lessons = L.lessonsForStage(stage.id);
      var mastered = lessons.filter(function (l) { return Store.isMastered(l.id); }).length;

      var block = doc.createElement('section');
      block.className = 'stage-block';

      var head = doc.createElement('div');
      head.className = 'stage-head';
      var h3 = doc.createElement('h3');
      h3.textContent = stage.name;
      var count = doc.createElement('span');
      count.className = 'stage-count';
      count.textContent = mastered + '/' + lessons.length;
      head.appendChild(h3);
      head.appendChild(count);

      var summary = doc.createElement('p');
      summary.className = 'stage-summary';
      summary.textContent = stage.summary;

      var list = doc.createElement('div');
      list.className = 'lesson-list';

      lessons.forEach(function (lesson) {
        var row = doc.createElement('button');
        row.type = 'button';
        row.className = 'lesson-row';
        row.dataset.lessonId = lesson.id;
        if (Store.isMastered(lesson.id)) row.classList.add('is-mastered');
        if (lesson.id === session.lessonId) row.classList.add('is-current');

        var name = doc.createElement('span');
        name.className = 'lesson-name';
        name.textContent = (lesson.index < 10 ? '0' + lesson.index : lesson.index) + ' · ' + lesson.title;

        var meta = doc.createElement('span');
        meta.className = 'lesson-meta';
        var record = Store.progressFor(lesson.id);
        meta.textContent = record && record.bestWpm
          ? Math.round(record.bestWpm) + ' wpm · ' + Math.round(record.bestAccuracy) + '%'
          : lesson.mastery.wpm + ' wpm target';

        row.appendChild(name);
        row.appendChild(meta);
        row.addEventListener('click', function () {
          closePanel();
          startSession({ lessonId: lesson.id, passageIndex: 0 });
        });
        list.appendChild(row);
      });

      block.appendChild(head);
      block.appendChild(summary);
      block.appendChild(list);
      dom.lessonList.appendChild(block);
    });
  }

  function markCurrentLessonRow() {
    var rows = dom.lessonList.querySelectorAll('.lesson-row');
    for (var i = 0; i < rows.length; i++) {
      rows[i].classList.toggle('is-current', rows[i].dataset.lessonId === session.lessonId);
    }
  }

  function renderProgressView() {
    var o = Store.overview();
    dom.summary.textContent = '';

    [
      { value: o.lessonsMastered + ' / ' + L.COUNT, label: 'lessons mastered' },
      { value: o.bestWpm ? Math.round(o.bestWpm) + ' wpm' : '—', label: 'best speed' },
      { value: o.bestAccuracy ? Math.round(o.bestAccuracy) + '%' : '—', label: 'best accuracy' },
      { value: formatPracticeTime(o.totalTimeMs), label: 'time practised' }
    ].forEach(function (item) {
      var box = doc.createElement('div');
      box.className = 'summary-item';
      var v = doc.createElement('span');
      v.className = 'summary-value';
      v.textContent = item.value;
      var l = doc.createElement('span');
      l.className = 'summary-label';
      l.textContent = item.label;
      box.appendChild(v);
      box.appendChild(l);
      dom.summary.appendChild(box);
    });

    var recent = Store.recent(8);
    dom.recentList.textContent = '';
    recent.forEach(function (r) {
      var li = doc.createElement('li');
      var what = doc.createElement('span');
      what.textContent = r.lessonTitle || 'Practice';
      var numbers = doc.createElement('span');
      numbers.textContent = Math.round(r.wpm) + ' wpm · ' + Math.round(r.accuracy) + '%';
      li.appendChild(what);
      li.appendChild(numbers);
      dom.recentList.appendChild(li);
    });
    dom.recentEmpty.hidden = recent.length > 0;

    var weak = Store.weakKeys(12);
    dom.weakList.textContent = '';
    weak.forEach(function (w) {
      var li = doc.createElement('li');
      var ch = doc.createElement('span');
      ch.textContent = (w.char === ' ' ? 'space' : (w.char === '\n' ? 'return' : w.char));
      var n = doc.createElement('b');
      n.textContent = '×' + w.missed;
      li.appendChild(ch);
      li.appendChild(n);
      dom.weakList.appendChild(li);
    });
    dom.weakEmpty.hidden = weak.length > 0;

    if (!Store.available()) {
      dom.resetHint.textContent = 'Saving is unavailable in this browser, so there is nothing stored to reset.';
    }
  }

  function onResetClick() {
    if (!resetArmed) {
      resetArmed = true;
      dom.resetHint.setAttribute('data-armed', 'true');
      dom.resetHint.textContent = 'Click "Reset saved progress" again to confirm. This cannot be undone.';
      dom.resetBtn.textContent = 'Confirm reset';
      resetTimer = global.setTimeout(disarmReset, 5000);
      return;
    }
    global.clearTimeout(resetTimer);
    disarmReset();
    Store.resetAll();
    syncControlsFromSettings();
    applyTheme(Store.setting('theme'));
    buildLessonList();
    renderProgressView();
    var lesson = L.nextLesson(Store.completedIds()) || L.LESSONS[0];
    startSession({ lessonId: lesson.id });
    toast('Saved progress cleared. Back to the first lesson.');
  }

  function disarmReset() {
    resetArmed = false;
    dom.resetHint.removeAttribute('data-armed');
    dom.resetHint.textContent = 'This clears lessons, records and weak keys in this browser. It cannot be undone.';
    dom.resetBtn.textContent = 'Reset saved progress';
  }

  function switchPanelTab(which) {
    var lessons = which === 'lessons';
    dom.viewLessons.hidden = !lessons;
    dom.viewProgress.hidden = lessons;
    dom.tabLessons.classList.toggle('is-active', lessons);
    dom.tabProgress.classList.toggle('is-active', !lessons);
    dom.tabLessons.setAttribute('aria-selected', String(lessons));
    dom.tabProgress.setAttribute('aria-selected', String(!lessons));
    if (!lessons) renderProgressView();
  }

  function openPanel() {
    buildLessonList();
    markCurrentLessonRow();
    openDialog(dom.panel);
    dom.lessonsBtn.setAttribute('aria-expanded', 'true');
    var current = dom.lessonList.querySelector('.lesson-row.is-current') ||
                  dom.lessonList.querySelector('.lesson-row');
    if (current) current.focus();
  }

  function closePanel() {
    if (dom.panel.hasAttribute('open')) closeDialog(dom.panel);
  }

  function togglePanel() {
    if (dom.panel.hasAttribute('open')) closePanel(); else openPanel();
  }

  /* ============================================================= dialogs */

  function openDialog(dlg) {
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
  }

  function closeDialog(dlg) {
    if (typeof dlg.close === 'function') dlg.close();
    else dlg.removeAttribute('open');
  }

  function anyDialogOpen() {
    return dom.panel.hasAttribute('open') || dom.results.hasAttribute('open');
  }

  /* =============================================================== theme */

  function applyTheme(pref) {
    var effective = pref;
    if (pref === 'system') {
      effective = global.matchMedia && global.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    doc.documentElement.setAttribute('data-theme', effective);
  }

  function applyCaretStyle() {
    dom.text.setAttribute('data-caret', Store.setting('caret'));
  }

  /* ============================================================ helpers */

  /**
   * The logo: jump back to your place in the course, the next lesson you have
   * not finished. Deliberately not progress.lastLessonId, which startSession()
   * rewrites on every lesson change and would make this a button that appears
   * to do nothing.
   */
  function goHome() {
    var lesson = L.nextLesson(Store.completedIds()) || L.LESSONS[0];
    startSession({ lessonId: lesson.id });
  }

  function restart() {
    startSession({ lessonId: session.lessonId, passageIndex: session.passageIndex });
  }

  function formatClock(ms, roundUp) {
    var total = roundUp ? Math.ceil(ms / 1000) : Math.floor(ms / 1000);
    if (total < 0) total = 0;
    var m = Math.floor(total / 60);
    var s = total % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function formatDuration(ms) {
    var total = Math.round(ms / 1000);
    if (total < 60) return total + 's';
    var m = Math.floor(total / 60);
    var s = total % 60;
    return m + 'm ' + (s < 10 ? '0' : '') + s + 's';
  }

  function formatPracticeTime(ms) {
    var minutes = Math.round(ms / 60000);
    if (minutes < 1) return '<1 min';
    if (minutes < 60) return minutes + ' min';
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    return h + ' h' + (m ? ' ' + m + ' min' : '');
  }

  function toast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.add('is-visible');
    global.clearTimeout(toastTimer);
    toastTimer = global.setTimeout(function () {
      dom.toast.classList.remove('is-visible');
    }, 3200);
  }

  /* ================================================================ go */

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
