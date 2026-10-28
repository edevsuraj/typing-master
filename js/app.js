/* =========================================================================
   Typing Master — Application (app.js)
   -------------------------------------------------------------------------
   Wires the DOM to the typing engine and the curriculum.

   Responsibilities
   ----------------
   * Build a guided-lesson session for the current lesson.
   * Render the passage character by character, move the caret, keep the
     current line in view.
   * Turn physical keystrokes into engine input, without stealing keys from
     buttons, selects or dialogs.
   * Show live statistics, a compact results card and a passage review.

   The app is deliberately stateless: nothing is stored anywhere, so every
   visit starts fresh. Settings live in memory for the current visit only.

   There is no on-screen keyboard anywhere in this application: input comes
   from a real keyboard through a visually hidden <textarea>.
   ========================================================================= */
(function (global) {
  'use strict';

  var L = global.TypingMasterLessons;
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
  var capsOn = false;

  // Preferences for this visit only. They are never written anywhere.
  var settings = {
    theme: 'system',        // 'system' | 'light' | 'dark'
    caret: 'block',         // 'block' | 'line' | 'underline' | 'none'
    liveStats: true         // show the live WPM / accuracy row while typing
  };

  var session = {
    lessonId: null,
    passageIndex: 0,
    text: ''
  };

  /* ================================================================ boot */

  function init() {
    cacheDom();
    bindEvents();
    applyTheme(settings.theme);
    applyCaretStyle();

    // The app used to keep progress in localStorage; sweep any leftover blob
    // away so the stateless promise is literally true.
    try {
      if (global.localStorage) {
        global.localStorage.removeItem('typingmaster.progress.v1');
        global.localStorage.removeItem('typingmaster.progress.v1.corrupt');
      }
    } catch (e) { /* storage blocked — nothing to clean anyway */ }

    buildLessonList();
    syncControlsFromSettings();

    engine = new Engine({
      onUpdate: onEngineUpdate,
      onComplete: onEngineComplete,
      onFirstInput: onFirstInput
    });

    startTicker();

    // Every visit starts from the first lesson.
    startSession({ lessonId: L.LESSONS[0].id });
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
      themeSelect: id('theme-select'),
      caretSelect: id('caret-select'),
      liveStats: id('live-stats'),

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
      settings.theme = current === 'dark' ? 'light' : 'dark';
      applyTheme(settings.theme);
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
      settings.theme = dom.themeSelect.value;
      applyTheme(settings.theme);
    });
    dom.caretSelect.addEventListener('change', function () {
      settings.caret = dom.caretSelect.value;
      applyCaretStyle();
      placeFloatingCaret(true);
    });
    dom.liveStats.addEventListener('change', function () {
      settings.liveStats = dom.liveStats.checked;
      dom.statbar.classList.toggle('is-hidden', !dom.liveStats.checked);
    });

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
    dom.themeSelect.value = settings.theme;
    dom.caretSelect.value = settings.caret;
    dom.liveStats.checked = !!settings.liveStats;
    dom.statbar.classList.toggle('is-hidden', !settings.liveStats);
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
  function caretStyle() { return settings.caret; }

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
    var lesson = L.getLesson(session.lessonId) || L.LESSONS[0];
    showResults(result, reason, lesson);
    markCurrentLessonRow();
  }

  function showResults(result, reason, lesson) {
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

    dom.rMessage.textContent = buildMessage(result, lesson);

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
  function buildMessage(result, lesson) {
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

      var block = doc.createElement('section');
      block.className = 'stage-block';

      var head = doc.createElement('div');
      head.className = 'stage-head';
      var h3 = doc.createElement('h3');
      h3.textContent = stage.name;
      var count = doc.createElement('span');
      count.className = 'stage-count';
      count.textContent = lessons.length + ' lessons';
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
        if (lesson.id === session.lessonId) row.classList.add('is-current');

        var name = doc.createElement('span');
        name.className = 'lesson-name';
        name.textContent = (lesson.index < 10 ? '0' + lesson.index : lesson.index) + ' · ' + lesson.title;

        var meta = doc.createElement('span');
        meta.className = 'lesson-meta';
        meta.textContent = lesson.mastery.wpm + ' wpm target';

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

  function switchPanelTab(which) {
    var lessons = which === 'lessons';
    dom.viewLessons.hidden = !lessons;
    dom.viewProgress.hidden = lessons;
    dom.tabLessons.classList.toggle('is-active', lessons);
    dom.tabProgress.classList.toggle('is-active', !lessons);
    dom.tabLessons.setAttribute('aria-selected', String(lessons));
    dom.tabProgress.setAttribute('aria-selected', String(!lessons));
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
    dom.text.setAttribute('data-caret', settings.caret);
  }

  /* ============================================================ helpers */

  /** The logo: back to the first lesson, since nothing is remembered. */
  function goHome() {
    startSession({ lessonId: L.LESSONS[0].id });
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
