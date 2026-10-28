# Typing Master

A calm, distraction-free touch-typing tutor that runs entirely in the browser.
No build step, no framework, no backend, no accounts — just HTML, CSS and
vanilla JavaScript.

Open `index.html` and start typing. There is no on-screen keyboard anywhere in
the application: you use your physical keyboard, and the app quietly scores
every keystroke.

---

## Contents

- [Quick start](#quick-start)
- [Features](#features)
- [The curriculum](#the-curriculum)
- [How the numbers are calculated](#how-the-numbers-are-calculated)
- [What gets saved, and where](#what-gets-saved-and-where)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [Accessibility](#accessibility)
- [Project layout](#project-layout)
- [Testing](#testing)
- [Deploying to GitHub Pages](#deploying-to-github-pages)
- [Browser support](#browser-support)

---

## Quick start

**Just open it.** Double-click `index.html`, or drag it into a browser window.
Everything works from `file://` because the scripts are plain browser scripts
with relative paths.

**Or serve it locally** (handy for testing, optional for use):

```bash
node tools/serve.js        # → http://localhost:8080/
node tools/serve.js 3000   # pick a different port
```

**Or check the headless tests:**

```bash
node tools/verify.js
```

No dependencies are required for any of the above. Node is only used for the
optional test and server scripts; the application itself never needs it.

---

## Features

- **106 lessons** across 8 stages, from the F and J anchors to long-form prose,
  including a dedicated Key Drills stage that pairs every key with its
  home-row partner.
- **Guided lessons only** — one clear path through the curriculum, no time
  limit and no mode to choose.
- **Live statistics** — net WPM, accuracy and a timer that counts up as you
  type.
- **Character-by-character feedback** with a caret, wrong-character marking and
  automatic scrolling that keeps your current line in view.
- **Results card** with net WPM, gross WPM, accuracy, character counts,
  duration, and a passage review that lists every key you missed with its
  surrounding text.
- **Light and dark themes**, plus "match system".
- **Nothing is saved.** The app is completely stateless — no accounts, no
  cookies, no localStorage. Every visit starts fresh.
- **Works on a phone**, with an explanation that a physical keyboard is
  recommended for learning touch typing.

---

## The curriculum

The course is ordered so that no lesson ever asks you to type a character it
has not taught you. `js/lessons.js` contains the whole course, and it enforces
that rule itself.

| Stage | Name | What it covers |
| --- | --- | --- |
| 1 | Home Row | F and J as anchors, then D/K, S/L, A and `;`, G/H, full sweeps — keys only, using just `a s d f g h j k l ;` |
| 2 | Key Drills | All 20 key column drills in one place: every top-row key (aq, sw, ed, fr, gt, hy, ju, ki, lo, p;) and every bottom-row key (az, sx, dc, fv, gb, hn, jm, k,, l., ;/) drilled against its home-row partner |
| 3 | First Words | Your first real words, phrases and a passage — typed with nothing but the ten home keys |
| 4 | Blending | Top-row and bottom-row pair practice (Q/P, W/O…, Z/M, X/comma…), alternating hands, punctuation, row words, phrases, sentences and full-alphabet passages — 24 lessons |
| 5 | Complete Alphabet | The whole alphabet, common letter pairs, the commonest words, long words, prefixes and suffixes, capitals and Shift, quotes, numbers |
| 6 | Words & Sentences | Everyday sentences and vocabulary, longer sentences, paragraphs, capitalisation, numbers and symbols, dialogue, letters and email, natural prose |
| 7 | Speed & Accuracy | Accuracy before speed, rhythm, row bursts for all three rows plus the full keyboard, weak-finger drills, common words at speed, sprint practice, consistency, mistake recovery |
| 8 | Advanced | Long paragraphs, complex punctuation, numbers and symbols, proper nouns, advanced vocabulary, endurance runs, technical and literary prose, proverbs and wordplay |

Each lesson records a `mastery` target — a speed and an accuracy that must both
be met to mark the lesson as mastered. Completing a lesson records your result;
it does not lock the next one, so you can revisit anything at any time.

The curriculum is validated by `validateCurriculum()` (also callable from the
browser console as `TypingMasterLessons.validateCurriculum()`). It checks for
duplicate ids, missing objectives, repeated passages, characters used before
they are taught, and — most importantly — that every passage is between 300
and 400 characters inclusive (`passage.length >= 300 &&
passage.length <= 400`), so every typing exercise from Lesson 1 onward meets
the minimum length requirement.

---

## How the numbers are calculated

A "word" is **5 characters**, the standard convention in typing tests.

```
gross WPM = (every keystroke / 5) / minutes elapsed
net   WPM = ((correct characters − remaining errors) / 5) / minutes elapsed, floored at 0
accuracy  = (correct characters) / (every character attempted) × 100
```

- **Correct characters** are counted from the passage itself: every character
  before the caret is either correct or wrong, so it is simply
  `caret position − wrong characters`.
- **Net WPM** is the headline number, because it cannot flatter a messy run.
  Gross WPM is shown on the results card.
- **Accuracy** uses every keystroke in the denominator, so correcting a
  mistake with Backspace does not restore full accuracy — the failed keystroke
  is still counted. Resetting a lesson clears the counters but cannot erase a
  stored record.
- **Very short sessions** (under 300 ms) report `0` rather than a division by
  almost zero, and a session under one second reports "—" for speed on the
  results card, because those numbers would be meaningless. Nothing can ever
  display `NaN` or `Infinity`.
- **Personal bests** only count sessions of at least 60 characters, so a lucky
  three-key run cannot become a record.
- **The clock starts with your first keystroke**, not when the text appears, so
  nobody loses time to reading.

`tools/verify.js` tests all of this against hand-worked examples, including the
"11 characters in 10 seconds = 13.2 wpm" case.

---

## What gets saved, and where

Nothing. The app keeps no progress, no history and no settings anywhere: no
localStorage, no cookies, no server. Choosing a theme or a caret style lasts
for the current visit only, and every reload starts from the first lesson.

---

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| any key | Start typing immediately — no clicking required |
| `Backspace` | Step back and fix a mistake |
| `Tab` | Inserts two spaces |
| `Enter` | Matches a line break in the passage |
| `Ctrl` / `Cmd` + `Enter` | Restart the passage |
| `Escape` | Open or close the lesson list |

Browser shortcuts (`Ctrl`+`R`, `Ctrl`+`Tab`, …) are deliberately left alone.

---

## Accessibility

- Semantic landmarks, headings and lists; real `<button>`, `<select>` and
  `<label>` elements throughout.
- Input arrives through a visually hidden `<textarea>`, so physical keyboards,
  on-screen keyboards, IME input, browser focus handling and assistive
  technology all behave normally. The passage itself is real, selectable text.
- The lesson panel and the results card are native modal `<dialog>` elements,
  which gives correct focus trapping, focus restoration and `Escape` handling.
- Keystrokes are only captured while that field has focus, so buttons, selects
  and dialogs never lose a keypress.
- Visible focus rings on every interactive element, a skip link to the typing
  text, and contrast that meets WCAG AA in both themes.
- `prefers-reduced-motion` disables the caret blink and all transitions.
- Returns to the tab re-focus the typing field automatically when no dialog is
  open, and the cursor is never trapped: `Tab` inserts spaces inside the text,
  but every control remains reachable by keyboard outside it.
- The logo is a real `<button>` with an `aria-label` that names both it and what
  it does, and it sits early in the tab order, so jumping back to your place in
  the course does not need a mouse.

---

## Project layout

```
index.html            markup and dialogs
assets/logo.svg       the logo: a caret at the start of three lines of text
css/style.css         tokens, layout, both themes, responsive rules
js/lessons.js         the curriculum: 106 lessons, 443 passages
js/typing-engine.js   scoring, timing and the WPM/accuracy maths (DOM-free)
js/app.js             screens, input handling, rendering, results
tools/verify.js       headless checks for the curriculum and the maths
tools/serve.js        optional static file server for local testing
README.md             this file
```

`js/lessons.js` and `js/typing-engine.js` are plain scripts
that attach to `window`, loaded in dependency order with ordinary `<script>`
tags — deliberately *not* ES modules, because modules are blocked by the CORS
rules on `file://` and this app must run by opening a file.

The logo exists twice on purpose. `assets/logo.svg` is the reusable file, and
the header inlines the same geometry with `fill="currentColor"` so the mark
follows `--accent-ink` and stays legible in both themes. The favicon inlines it
a third time as a data URI, so it still resolves when the app is opened straight
from disk rather than over HTTP. Keep the three in step if you redraw it, and
keep `assets/logo.svg` free of non-ASCII characters and of runs of hyphens: XML
forbids `--` inside a comment, and a `-----` divider silently turns the whole
file into an undecodable image.

---

## Testing

```bash
node tools/verify.js
```

It checks the curriculum (unique ids, real objectives, no repeated prose, and
that no lesson uses a character before it is taught) and the engine's maths:
gross and net WPM against a worked example, accuracy before and after a
correction, the guards that stop `NaN`, backspace behaviour at the start of a
passage, input after completion being ignored, countdown expiry, and mistake
bookkeeping.

Manually, the useful things to try are: typing a lesson start to finish;
making a mistake and correcting it with Backspace; pressing `Escape` and
`Ctrl`+`Enter`; switching themes; and resizing the window mid-passage.

---

## Deploying to GitHub Pages

1. Create a repository (a project site is fine).
2. Put these files at the repository root:

   ```
   index.html
   css/style.css
   js/lessons.js
   js/typing-engine.js
   js/app.js
   README.md
   ```

   `tools/` is optional and is not used by the page.
3. Commit and push.
4. In the repository, go to **Settings → Pages** and set **Source** to
   **Deploy from a branch**, branch `main`, folder `/ (root)`.
5. The site appears at `https://<user>.github.io/<repository>/`.

Everything already works under that URL: all asset paths are relative, there is
no server-side routing, no environment variables, no build step and no external
requests. There is no service worker, so there is nothing to register and
nothing to cache-bust.

---

## Downloads (offline desktop app)

The site's single **Download app** button serves `downloads/TypingMaster.exe`:
a standalone desktop application (native window, no browser) that runs fully
offline — double-click it and typing starts, no installation step.

A second build, `downloads/TypingMasterInstaller.exe`, also exists in the
repository for users who prefer an "installed" copy: it copies the app into
`%LOCALAPPDATA%\TypingMaster`, creates Start Menu and Desktop shortcuts and
opens the installed version in the default browser. It is simply not surfaced
as a header button.

Both files are refreshed automatically by `.github/workflows/build.yml` after
every push.

Because the `.exe` files are not code-signed, Windows SmartScreen may warn
"Windows protected your PC". Click **More info → Run anyway** to launch them,
or sign the build with a code-signing certificate.

For a free trusted signature on an open-source project, apply at
https://about.signpath.io and use the workflow in `.github/workflows/build.yml`.

## Browser support

Modern desktop browsers: Chrome, Edge, Firefox and Safari (current versions).
The app uses `<dialog>`, CSS custom properties, `color-mix()` and
`backdrop-filter`; where a browser lacks native `<dialog>` support the panel and
results fall back to a plain attribute-driven open/close.

On a phone the layout adapts and an on-screen keyboard works, but a physical
keyboard is strongly recommended — that is the entire point of the course.
