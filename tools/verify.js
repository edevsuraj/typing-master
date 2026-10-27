/* =========================================================================
   Typing Master — Headless checks (tools/verify.js)
   -------------------------------------------------------------------------
   Runs the curriculum validator and the statistics maths outside the browser.
   There is no build step and no dependency: plain Node, plain CommonJS.

       node tools/verify.js

   The page's own scripts are plain browser scripts (no ES modules), so they
   are loaded here with `global.window = global` and then exercised directly.
   ========================================================================= */
'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');

global.window = global;
require(path.join(ROOT, 'js', 'lessons.js'));
require(path.join(ROOT, 'js', 'typing-engine.js'));

const L = global.TypingMasterLessons;
const TypingEngine = global.TypingMasterEngine;

/* ------------------------------------------------------------ tiny harness */
let passed = 0;
const failures = [];

function check(name, condition, detail) {
  if (condition) {
    passed += 1;
  } else {
    failures.push(name + (detail ? '  →  ' + detail : ''));
  }
}

function near(a, b, eps) {
  return Math.abs(a - b) <= (eps === undefined ? 1e-6 : eps);
}

/* ------------------------------------------------- fake clock for the engine */
let clock = 0;
global.performance = { now: () => clock };

/** Type `str`, advancing the fake clock `msPerChar` before each keystroke. */
function typeString(engine, str, msPerChar) {
  for (const ch of str) {
    clock += msPerChar;
    engine.press(ch);
  }
}

/* ======================================================================== */
/* 1. Curriculum                                                             */
/* ======================================================================== */
console.log('--- curriculum ---');
const curriculumErrors = L.validateCurriculum();
check('curriculum validates', curriculumErrors.length === 0, curriculumErrors.slice(0, 8).join(' | '));
check('103 lessons present', L.COUNT === 103, 'got ' + L.COUNT);
check('every stage has lessons',
  L.STAGES.every(s => L.lessonsForStage(s.id).length >= 8),
  L.STAGES.map(s => s.id + ':' + L.lessonsForStage(s.id).length).join(' '));
check('no duplicate ids', new Set(L.LESSONS.map(l => l.id)).size === L.COUNT);
check('every lesson has an objective', L.LESSONS.every(l => l.objective && l.objective.length > 20));
check('every lesson has passages', L.LESSONS.every(l => l.passages.length >= 2));
check('mastery targets are sane', L.LESSONS.every(l => l.mastery.wpm >= 5 && l.mastery.accuracy >= 80 && l.mastery.accuracy <= 100));
check('nextLesson skips completed work',
  L.nextLesson({}) === L.LESSONS[0] &&
  L.nextLesson({ 's1-01': { mastered: true }, 's1-02': { mastered: true } }) === L.LESSONS[2]);
check('nextAfter / previousBefore chain correctly',
  L.nextAfter(L.LESSONS[0].id) === L.LESSONS[1] &&
  L.previousBefore(L.LESSONS[1].id) === L.LESSONS[0] &&
  L.nextAfter(L.LESSONS[L.COUNT - 1].id) === null);
check('difficulty filter returns a usable pool',
  L.lessonsForLevel(1).length > 0 && L.lessonsForLevel(5).length === L.COUNT);
console.log(`  ${L.COUNT} lessons, ${L.LESSONS.reduce((n, l) => n + l.passages.length, 0)} passages, ` +
            `${L.LESSONS.reduce((n, l) => n + l.charCount, 0)} characters`);

/* ======================================================================== */
/* 2. Speed maths                                                            */
/* ======================================================================== */
console.log('--- speed ---');
{
  // "hello world" = 11 characters typed evenly over exactly 10 seconds.
  // 11 / 5 = 2.2 "words" in 1/6 minute -> 13.2 wpm
  clock = 1000;
  const e = new TypingEngine();
  e.load('hello world', {});
  e.press('h');                                   // clock starts here
  typeString(e, 'ello world', 1000);              // 10 more keys, 1s apart
  const s = e.stats();
  check('gross WPM = chars/5 per minute', near(s.grossWpm, 13.2, 0.01), 'got ' + s.grossWpm.toFixed(3));
  check('net WPM equals gross when clean', near(s.netWpm, 13.2, 0.01), 'got ' + s.netWpm.toFixed(3));
  check('accuracy is 100% with no mistakes', s.accuracy === 100);
  check('passage completion detected', e.result().completed === true);
  check('elapsed time stops at completion', Math.round(s.elapsedMs) === 10000, 'got ' + s.elapsedMs);
}
{
  // 60 keystrokes over one minute, one left uncorrected.
  clock = 1000;
  const e = new TypingEngine();
  e.load('a'.repeat(60), {});
  e.press('a');
  for (let i = 1; i < 60; i++) {
    e.press(i === 30 ? 'x' : 'a');
    clock += (60000 / 60);                        // one minute of typing in total
  }
  const s = e.stats();
  check('one uncorrected error costs accuracy', near(s.accuracy, (59 / 60) * 100, 1e-9), 'got ' + s.accuracy);
  check('net WPM subtracts remaining errors', near(s.netWpm, ((59 - 1) / 5) / (s.elapsedMs / 60000), 1e-9), 'got ' + s.netWpm);
  check('gross WPM counts every keystroke', near(s.grossWpm, (60 / 5) / (s.elapsedMs / 60000), 1e-9), 'got ' + s.grossWpm);
  check('net never goes negative', (function () {
    const f = new TypingEngine();
    f.load('abc', {});
    f.press('x'); f.press('y'); f.press('z');
    return f.stats().netWpm === 0;
  })());
}
{
  // Correcting a mistake must not restore full accuracy: the failed keystroke
  // stays in the denominator.
  clock = 1000;
  const e = new TypingEngine();
  e.load('a'.repeat(8), {});
  typeString(e, 'aaa', 100);            // 3 correct
  e.press('x'); clock += 100;           // wrong at index 3
  typeString(e, 'aaa', 100);            // 3 more correct
  check('a mistake is recorded while it is on screen', e.errors === 1 && e.stats().incorrect === 1);
  for (let i = 0; i < 4; i++) { e.backspace(); clock += 10; }   // back over the error
  check('backspacing over the error clears it', e.errors === 0 && e.index === 3);
  typeString(e, 'aaaa', 100);           // retype it correctly
  const s = e.stats();
  check('accuracy cannot be farmed by fixing mistakes', near(s.accuracy, (7 / 11) * 100, 1e-9), 'got ' + s.accuracy);
  check('fixing a mistake restores the char to correct', s.correct === 7 && s.incorrect === 0, s.correct + '/' + s.incorrect);
  check('net WPM recovers after a correction', near(s.netWpm, (7 / 5) / (s.elapsedMs / 60000), 1e-9), 'got ' + s.netWpm);
  check('all seven typed characters are correct', e.states.slice(0, 7).every(st => st === TypingEngine.CORRECT));
}

/* ======================================================================== */
/* 3. Accuracy guard rails                                                   */
/* ======================================================================== */
console.log('--- accuracy ---');
{
  clock = 1000;
  const e = new TypingEngine();
  e.load('abc', {});
  check('empty session reports 0 wpm, not NaN', e.stats().netWpm === 0 && e.stats().grossWpm === 0);
  check('empty session reports 100% accuracy', e.stats().accuracy === 100);
  e.press('a');
  check('single key within 300ms reports 0 wpm', e.stats().netWpm === 0);
  clock = 1000000;
  const s = e.stats();
  check('long session produces finite numbers',
    isFinite(s.netWpm) && isFinite(s.grossWpm) && isFinite(s.accuracy), JSON.stringify(s));
}
{
  // Caret must never jump ahead of what the user typed.
  clock = 1000;
  const e = new TypingEngine();
  e.load('abcdef', {});
  e.press('a'); e.press('b');
  e.backspace(); e.backspace(); e.backspace();
  check('backspace stops at the start of the passage', e.index === 0 && e.backspace() === false);
  e.press('a');
  check('typing resumes from the corrected position', e.states[0] === TypingEngine.CORRECT && e.index === 1);
}
{
  // Input after the passage ends is ignored, never rewarded.
  clock = 1000;
  let completed = false;
  const e = new TypingEngine({ onComplete: () => { completed = true; } });
  e.load('ab', {});
  e.press('a'); e.press('b');
  const before = e.stats();
  const ignored = e.press('z');
  check('session completes on the final character', completed === true);
  check('input after completion is ignored', ignored === 'ignored' && e.index === 2 && e.typed === 2);
  check('completion does not inflate stats', e.stats().accuracy === before.accuracy);
}

/* ======================================================================== */
/* 4. Timed tests                                                            */
/* ======================================================================== */
console.log('--- timing ---');
{
  clock = 1000;
  let reason = null;
  const e = new TypingEngine({ onComplete: (r, why) => { reason = why; } });
  e.load('abcdefghij', { timeLimitMs: 15000 });
  e.press('a');
  clock = 11000;                                   // 10s in
  e.tick();
  check('timed test is still running at 10s', e.finished === false);
  check('remaining time counts down', e.stats().remainingMs === 5000, 'got ' + e.stats().remainingMs);
  clock = 16000;                                   // 15s in
  e.tick();
  check('timed test ends when the clock runs out', e.finished === true && reason === 'time');
  check('a timed test that never starts never ends', (function () {
    const f = new TypingEngine();
    f.load('abcdefghij', { timeLimitMs: 1000 });
    clock += 5000;
    f.tick();
    return f.finished === false && f.remainingMs() === 1000;
  })());
  check('untimed sessions never report a countdown', new TypingEngine().remainingMs() === 0);
}

/* ======================================================================== */
/* 5. Mistake bookkeeping                                                    */
/* ======================================================================== */
console.log('--- mistakes ---');
{
  clock = 1000;
  const text = 'the quick brown fox jumps over the lazy dog';
  const seen = [];
  const e = new TypingEngine({ onMistake: (expected, typed, index) => seen.push(expected + '->' + typed + '@' + index) });
  e.load(text, {});
  typeString(e, text.slice(0, 20), 50);        // 20 clean characters
  e.press('x');                                // index 20, which is 'j'
  check('mistake callback fires once per error', seen.length === 1 && seen[0] === 'j->x@20', seen.join(','));
  check('mistake list records the expected character', e.mistakes[0].expected === 'j' && e.mistakes[0].typed === 'x');
  check('review shows only mistakes still on screen', e.reviewItems().length === 1);
  const item = e.reviewItems()[0];
  check('review carries surrounding context', item.context.length === 37 && item.context.charAt(18) === 'j',
    JSON.stringify(item.context));
  check('an uncorrected mistake is not marked as fixed', item.fixed === false);
  e.backspace();
  check('backspacing over an error clears it from the live error count', e.errors === 0 && e.mistakes.length === 0);
  check('the full mistake log is kept for the review', e.mistakesAll.length === 1 && e.reviewItems()[0].fixed === true);
  check('mistakesMade is a running total, not a live count', e.mistakesMade === 1);
  check('correct characters are untouched by the correction', e.states.slice(0, 20).every(st => st === TypingEngine.CORRECT));
}

/* ======================================================================== */
/* 6. Storage                                                               */
/* ======================================================================== */
console.log('--- storage ---');
{
  // A minimal in-memory localStorage so storage.js can be exercised headlessly.
  function makeStorage(seed) {
    const map = new Map(Object.entries(seed || {}));
    return {
      getItem: k => (map.has(k) ? map.get(k) : null),
      setItem: (k, v) => { map.set(k, String(v)); },
      removeItem: k => { map.delete(k); },
      _dump: () => Object.fromEntries(map)
    };
  }
  global.localStorage = makeStorage();
  delete require.cache[require.resolve(path.join(ROOT, 'js', 'storage.js'))];
  require(path.join(ROOT, 'js', 'storage.js'));
  const Store = global.TypingMasterStore;

  check('defaults are sane on a first visit',
    Store.available() === true &&
    Store.get().version === Store.SCHEMA_VERSION &&
    Store.setting('theme') === 'system' &&
    Store.overview().lessonsMastered === 0);

  // A session too short to measure must not set a record.
  Store.recordSession({ netWpm: 200, grossWpm: 220, accuracy: 100, correct: 4, incorrect: 0, typed: 4, durationMs: 400 });
  check('a four-character run cannot become a best speed', Store.get().stats.bestWpm === 0);

  Store.recordSession({
    lessonId: 's1-01', netWpm: 30, grossWpm: 33, accuracy: 96, correct: 300, incorrect: 12,
    typed: 312, durationMs: 20000, completed: true, mastery: { wpm: 25, accuracy: 95 }
  });
  check('a real run does set a best speed', Math.round(Store.get().stats.bestWpm) === 30);
  check('a lesson meeting both targets is mastered', Store.isMastered('s1-01') === true);

  // Accuracy met, speed missed -> not mastered.
  Store.recordSession({
    lessonId: 's1-02', netWpm: 5, grossWpm: 6, accuracy: 100, correct: 200, incorrect: 0,
    typed: 200, durationMs: 20000, completed: true, mastery: { wpm: 12, accuracy: 95 }
  });
  check('speed target is enforced, not just accuracy', Store.isMastered('s1-02') === false);

  // Both targets met, but the passage was not finished -> not mastered.
  Store.recordSession({
    lessonId: 's1-03', netWpm: 60, grossWpm: 60, accuracy: 100, correct: 40, incorrect: 0,
    typed: 40, durationMs: 4000, completed: false, mastery: { wpm: 12, accuracy: 95 }
  });
  check('an unfinished lesson is never mastered', Store.isMastered('s1-03') === false);

  // Burst of keystrokes on a four-character drill -> too short to count.
  Store.recordSession({
    lessonId: 's1-04', netWpm: 300, grossWpm: 300, accuracy: 100, correct: 4, incorrect: 0,
    typed: 4, durationMs: 250, completed: true, mastery: { wpm: 12, accuracy: 95 }
  });
  check('an instantaneous burst cannot master a lesson', Store.isMastered('s1-04') === false);

  // Weak keys
  Store.recordMistakes(['e', 'e', 'r', ' ', 'e']);
  const weak = Store.weakKeys(10);
  check('weak keys are ranked by how often they were missed',
    weak[0].char === 'e' && weak[0].missed === 3 && weak[1].missed === 1 && weak[2].missed === 1,
    JSON.stringify(weak));
  check('weak keys survive a reload', (() => {
    const dump = global.localStorage._dump()['typingmaster.progress.v1'];
    return JSON.parse(dump).weakKeys.e.missed === 3;
  })());

  // Cap on recent history
  for (let i = 0; i < 40; i++) {
    Store.recordSession({ netWpm: 20 + i, grossWpm: 21, accuracy: 99, correct: 100, incorrect: 1, typed: 101, durationMs: 15000 });
  }
  check('recent sessions are capped at 25', Store.recent(100).length === 25);
  check('overview totals stay consistent', Store.overview().lessonsStarted === 4);

  // Reset
  Store.resetAll();
  check('reset clears everything', Store.overview().sessions === 0 && Store.weakKeys(10).length === 0 &&
    Store.recent(10).length === 0 && Store.get().progress.lastLessonId === null);

  // Corrupt blob
  global.localStorage.setItem('typingmaster.progress.v1', '{"version":2,"stats":');
  delete require.cache[require.resolve(path.join(ROOT, 'js', 'storage.js'))];
  require(path.join(ROOT, 'js', 'storage.js'));
  const Store2 = global.TypingMasterStore;
  check('a corrupt blob is detected and replaced', Store2.hadCorruption() === true);
  check('the app still gets usable defaults after corruption',
    Store2.get().version === Store2.SCHEMA_VERSION && Store2.overview().sessions === 0);
  check('the unreadable data is kept aside for inspection',
    typeof global.localStorage.getItem('typingmaster.progress.v1.corrupt') === 'string');

  // Old schema, wrong field types
  global.localStorage.setItem('typingmaster.progress.v1', JSON.stringify({
    version: 1,
    settings: { theme: 'neon', caret: 'blob' },
    progress: { completed: { 's1-01': { bestWpm: '12', bestAccuracy: null, attempts: -3, mastered: 'yes' } } },
    stats: { bestWpm: 'fast', sessions: 'lots', daily: { 'not-a-date': 5, '2024-01-02': 'x' } },
    recent: 'nope',
    weakKeys: { 'too long a key': { missed: 2 }, e: { missed: 4, typed: 20 } }
  }));
  delete require.cache[require.resolve(path.join(ROOT, 'js', 'storage.js'))];
  require(path.join(ROOT, 'js', 'storage.js'));
  const Store3 = global.TypingMasterStore;
  const s3 = Store3.get();
  check('an old schema is migrated forward', s3.version === 2);
  check('invalid settings fall back to defaults',
    s3.settings.theme === 'system' && s3.settings.caret === 'block');
  check('invalid numbers are repaired', s3.stats.bestWpm === 0 && s3.stats.sessions === 0 &&
    s3.progress.completed['s1-01'].bestWpm === 0 && s3.progress.completed['s1-01'].attempts === 0);
  check('a malformed daily log is dropped',
    Object.keys(s3.stats.daily).every(k => /^\d{4}-\d{2}-\d{2}$/.test(k)));
  check('a malformed recent list becomes an empty one', Array.isArray(s3.recent) && s3.recent.length === 0);
  check('malformed weak keys are dropped, valid ones kept',
    Object.keys(s3.weakKeys).join(',') === 'e' && s3.weakKeys.e.missed === 4);
}

/* ======================================================================== */
console.log('');
if (failures.length) {
  console.error('FAILED ' + failures.length + ' check(s), passed ' + passed + ':');
  failures.forEach(f => console.error('  ✗ ' + f));
  process.exit(1);
} else {
  console.log('All ' + passed + ' checks passed.');
}
