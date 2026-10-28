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
check('106 lessons present', L.COUNT === 106, 'got ' + L.COUNT);
check('every stage has lessons',
  L.STAGES.every(s => L.lessonsForStage(s.id).length >= 3), // First Words is deliberately small
  L.STAGES.map(s => s.id + ':' + L.lessonsForStage(s.id).length).join(' '));
check('no duplicate ids', new Set(L.LESSONS.map(l => l.id)).size === L.COUNT);
check('every lesson has an objective', L.LESSONS.every(l => l.objective && l.objective.length > 20));
check('every lesson has passages', L.LESSONS.every(l => l.passages.length >= 2));
check('pair titles match their data (title keys actually typed)',
  L.LESSONS.every(l => titleClaims(l.title).every(c => l.passages.join('').includes(c))),
  L.LESSONS.filter(l => {
    const claims = titleClaims(l.title), all = l.passages.join('');
    return !claims.every(c => all.includes(c));
  }).map(l => l.id + ' "' + l.title + '" -> ' + titleClaims(l.title).filter(c => !l.passages.join('').includes(c)).join('')).join(', '));

function titleClaims(title) {
  const t = title.toLowerCase();
  const claims = [];
  if (t.includes(' and ')) {
    t.split(' and ')[0].trim().split(/\s*·/)[0].split(' ')
      .forEach(w => { if (/^[a-z]$/.test(w)) claims.push(w); });
  }
  if (t.includes('semicolon')) claims.push(';');
  if (t.includes('comma')) claims.push(',');
  if (t.includes('full stop')) claims.push('.');
  if (/\bslash\b/.test(t)) claims.push('/');
  return [...new Set(claims)];
}
check('declared keys all occur in passages (descriptive keys like Shift exempt)',
  L.LESSONS.every(l => {
    const all = l.passages.join('');
    return l.keys.concat(l.newKeys.filter(k => k !== '0-9'))
      .every(k => k.length !== 1 || all.includes(k));
  }) &&
  (L.getLesson('s4-09').passages.join('').includes('0') &&
   L.getLesson('s4-09').passages.join('').includes('9')));
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
console.log('');
if (failures.length) {
  console.error('FAILED ' + failures.length + ' check(s), passed ' + passed + ':');
  failures.forEach(f => console.error('  ✗ ' + f));
  process.exit(1);
} else {
  console.log('All ' + passed + ' checks passed.');
}
