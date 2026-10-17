/* =========================================================================
   Typing Master — Progress storage (storage.js)
   -------------------------------------------------------------------------
   Everything the app remembers lives here, in one versioned JSON blob under
   a single localStorage key. No account, no server, no cookies.

   Design notes
   ------------
   * Versioned. `SCHEMA_VERSION` is bumped whenever the shape changes and
     `migrate()` upgrades older blobs, so existing users keep their progress.
   * Defensive. Any field that is the wrong type is replaced with its default,
     which also repairs partially corrupted data instead of throwing.
   * Graceful. If localStorage is unavailable (private mode, file:// in some
     browsers, storage disabled) the app keeps working from memory and simply
     stops saving. `Store.available` reports which case we are in.
   ========================================================================= */
(function (global) {
  'use strict';

  var KEY = 'typingmaster.progress.v1';
  var SCHEMA_VERSION = 2;
  var MAX_RECENT = 25;
  var MAX_WEAK_KEYS = 12;

  /* ------------------------------------------------------------- defaults */
  function defaults() {
    return {
      version: SCHEMA_VERSION,
      settings: {
        theme: 'system',        // 'system' | 'light' | 'dark'
        mode: 'guided',         // default practice mode
        duration: 30,           // seconds, for timed modes
        difficulty: 3,          // 1..5, used by Random Test
        caret: 'block',         // 'block' | 'line' | 'underline' | 'none'
        liveStats: true         // show the live WPM / accuracy row while typing
      },
      progress: {
        completed: {},          // lessonId -> { bestWpm, bestAccuracy, attempts, mastered, lastAt }
        lastLessonId: null
      },
      stats: {
        bestWpm: 0,
        bestAccuracy: 0,
        sessions: 0,
        totalChars: 0,
        totalTimeMs: 0,
        daily: {}               // 'YYYY-MM-DD' -> milliseconds practised that day
      },
      recent: [],               // most recent session summaries, newest first
      weakKeys: {},             // character -> { missed, typed, lastAt }
      updatedAt: 0
    };
  }

  /* ------------------------------------------------------------ utilities */
  function isObject(v) { return v && typeof v === 'object' && !Array.isArray(v); }
  function num(v, fallback) { return typeof v === 'number' && isFinite(v) ? v : fallback; }
  function str(v, fallback) { return typeof v === 'string' ? v : fallback; }
  function clamp(v, lo, hi, fallback) {
    v = num(v, fallback);
    return v < lo ? lo : (v > hi ? hi : v);
  }

  function todayKey(ts) {
    var d = new Date(ts || Date.now());
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' + m : m) + '-' + (day < 10 ? '0' + day : day);
  }

  /* -------------------------------------------------------------- migrate */
  /**
   * Upgrade an older blob to the current schema. Written as an explicit chain
   * so the history of the data format stays readable.
   */
  function migrate(raw) {
    var data = isObject(raw) ? raw : {};

    // v1 -> v2: v1 had `settings.difficulty` missing, `recent` entries without
    // `grossWpm`, and no `caret` preference.
    if (num(data.version, 1) < 2) {
      data.settings = isObject(data.settings) ? data.settings : {};
      if (typeof data.settings.caret !== 'string') data.settings.caret = 'block';
      (Array.isArray(data.recent) ? data.recent : []).forEach(function (r) {
        if (isObject(r) && typeof r.grossWpm !== 'number') r.grossWpm = num(r.wpm, 0);
      });
      data.version = 2;
    }

    return data;
  }

  /** Coerce every field to the expected type, repairing partial corruption. */
  function sanitize(raw) {
    var d = defaults();
    var src = migrate(raw);

    var s = isObject(src.settings) ? src.settings : {};
    d.settings.theme = ['system', 'light', 'dark'].indexOf(s.theme) >= 0 ? s.theme : 'system';
    d.settings.mode = str(s.mode, 'guided');
    d.settings.duration = [15, 30, 60, 120].indexOf(num(s.duration, 0)) >= 0 ? num(s.duration, 30) : 30;
    d.settings.difficulty = clamp(s.difficulty, 1, 5, 3);
    d.settings.caret = ['block', 'line', 'underline', 'none'].indexOf(s.caret) >= 0 ? s.caret : 'block';
    d.settings.liveStats = s.liveStats !== false;

    var p = isObject(src.progress) ? src.progress : {};
    d.progress.lastLessonId = str(p.lastLessonId, null);
    var completed = isObject(p.completed) ? p.completed : {};
    Object.keys(completed).forEach(function (id) {
      var c = completed[id];
      if (!isObject(c)) return;                       // drop junk entries
      d.progress.completed[id] = {
        bestWpm: num(c.bestWpm, 0),
        bestAccuracy: num(c.bestAccuracy, 0),
        attempts: clamp(c.attempts, 0, 1e6, 0),
        mastered: !!c.mastered,
        lastAt: num(c.lastAt, 0)
      };
    });

    var st = isObject(src.stats) ? src.stats : {};
    d.stats.bestWpm = num(st.bestWpm, 0);
    d.stats.bestAccuracy = num(st.bestAccuracy, 0);
    d.stats.sessions = clamp(st.sessions, 0, 1e9, 0);
    d.stats.totalChars = clamp(st.totalChars, 0, 1e12, 0);
    d.stats.totalTimeMs = clamp(st.totalTimeMs, 0, 1e12, 0);
    if (isObject(st.daily)) {
      Object.keys(st.daily).forEach(function (k) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(k)) d.stats.daily[k] = clamp(st.daily[k], 0, 1e12, 0);
      });
    }

    d.recent = (Array.isArray(src.recent) ? src.recent : [])
      .filter(isObject)
      .slice(0, MAX_RECENT)
      .map(function (r) {
        return {
          at: num(r.at, 0),
          lessonId: str(r.lessonId, ''),
          lessonTitle: str(r.lessonTitle, ''),
          mode: str(r.mode, 'practice'),
          wpm: num(r.wpm, 0),
          grossWpm: num(r.grossWpm, num(r.wpm, 0)),
          accuracy: num(r.accuracy, 0),
          correct: num(r.correct, 0),
          incorrect: num(r.incorrect, 0),
          typed: num(r.typed, 0),
          durationMs: num(r.durationMs, 0),
          mastered: !!r.mastered,
          time: str(r.time, '')
        };
      });

    var wk = isObject(src.weakKeys) ? src.weakKeys : {};
    Object.keys(wk).forEach(function (ch) {
      var v = wk[ch];
      if (ch.length !== 1 || !isObject(v)) return;
      d.weakKeys[ch] = {
        missed: clamp(v.missed, 0, 1e6, 0),
        typed: clamp(v.typed, 0, 1e6, 0),
        lastAt: num(v.lastAt, 0)
      };
    });

    d.updatedAt = num(src.updatedAt, 0);
    return d;
  }

  /* -------------------------------------------------------- availability */
  var memory = null;      // fallback store when localStorage is unusable
  var available = false;
  var hadCorruptData = false;

  (function probe() {
    try {
      var probeKey = '__tm_probe__';
      global.localStorage.setItem(probeKey, '1');
      global.localStorage.removeItem(probeKey);
      available = true;
    } catch (e) {
      available = false;
    }
  })();

  /* ----------------------------------------------------------------- I/O */
  function read() {
    if (!available) return memory;
    var raw = null;
    try {
      raw = global.localStorage.getItem(KEY);
    } catch (e) {
      available = false;
      return memory;
    }
    if (raw === null) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      // Corrupted blob: report it, keep a copy for reference, start fresh.
      hadCorruptData = true;
      try { global.localStorage.setItem(KEY + '.corrupt', raw.slice(0, 2000)); } catch (e2) { /* ignore */ }
      try { global.localStorage.removeItem(KEY); } catch (e3) { /* ignore */ }
      return null;
    }
  }

  function write(data) {
    data.updatedAt = Date.now();
    if (!available) { memory = data; return; }
    try {
      global.localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      // Quota exceeded or storage revoked mid-session: fall back to memory.
      available = false;
      memory = data;
    }
  }

  var state = null;

  function get() {
    if (state) return state;
    state = sanitize(read());
    return state;
  }

  function update(mutator) {
    var data = get();
    var result = mutator(data);
    write(data);
    return result;
  }

  /* --------------------------------------------------------------- public */
  var Store = {
    KEY: KEY,
    SCHEMA_VERSION: SCHEMA_VERSION,

    /** True when changes are actually being written to localStorage. */
    available: function () { return available; },

    /** True when unreadable data was found and discarded on load. */
    hadCorruption: function () {
      get();                 // make sure the load (and any recovery) has run
      return hadCorruptData;
    },

    get: get,

    save: function () { write(get()); },

    /** Run a mutation against the state object; it is saved straight after. */
    update: update,

    /* ------------------------------------------------------------ settings */
    setting: function (key, value) {
      if (arguments.length === 1) return get().settings[key];
      return update(function (d) { d.settings[key] = value; });
    },

    /* ------------------------------------------------------------ progress */
    progressFor: function (lessonId) {
      return get().progress.completed[lessonId] || null;
    },

    completedIds: function () {
      return Object.keys(get().progress.completed).filter(function (id) {
        return !!get().progress.completed[id].mastered;
      });
    },

    isCompleted: function (lessonId) {
      var c = get().progress.completed[lessonId];
      return !!(c && c.completed);
    },

    isMastered: function (lessonId) {
      var c = get().progress.completed[lessonId];
      return !!(c && c.mastered);
    },

    setLastLesson: function (lessonId) {
      update(function (d) { d.progress.lastLessonId = lessonId; });
    },

    /** Summary counts used by the lessons panel and the results screen. */
    overview: function () {
      var d = get();
      var total = d.progress.completed;
      var ids = Object.keys(total);
      var mastered = ids.filter(function (id) { return total[id].mastered; });
      var attempts = ids.reduce(function (n, id) { return n + total[id].attempts; }, 0);
      return {
        lessonsStarted: ids.length,
        lessonsMastered: mastered.length,
        attempts: attempts,
        bestWpm: d.stats.bestWpm,
        bestAccuracy: d.stats.bestAccuracy,
        sessions: d.stats.sessions,
        totalTimeMs: d.stats.totalTimeMs,
        todayMs: d.stats.daily[todayKey()] || 0
      };
    },

    /* -------------------------------------------------------------- stats */
    /**
     * Record a finished session.
     * `result` = { lessonId, lessonTitle, mode, netWpm, grossWpm, accuracy,
     *              correct, incorrect, typed, durationMs, completed, mastery }
     * Returns { newBestWpm, newBestAccuracy, lessonImproved, masteredNow }.
     */
    recordSession: function (result) {
      var out = { newBestWpm: false, newBestAccuracy: false, lessonImproved: false, masteredNow: false, masteryEligible: false };
      var bestBefore = get().stats.bestWpm;

      update(function (d) {
        var day = todayKey();
        d.stats.sessions += 1;
        d.stats.totalChars += num(result.correct, 0) + num(result.incorrect, 0);
        d.stats.totalTimeMs += num(result.durationMs, 0);
        d.stats.daily[day] = (d.stats.daily[day] || 0) + num(result.durationMs, 0);

        // Keep the daily log from growing without bound.
        var days = Object.keys(d.stats.daily);
        if (days.length > 120) {
          days.sort();
          days.slice(0, days.length - 120).forEach(function (k) { delete d.stats.daily[k]; });
        }

        // A best speed only counts for a meaningful sample, so a single lucky
        // three-character run cannot become a record.
        if (num(result.typed, 0) >= 60) {
          if (num(result.netWpm, 0) > d.stats.bestWpm) {
            d.stats.bestWpm = num(result.netWpm, 0);
            out.newBestWpm = true;
          }
          if (num(result.accuracy, 0) > d.stats.bestAccuracy) {
            d.stats.bestAccuracy = num(result.accuracy, 0);
            out.newBestAccuracy = true;
          }
        }

        if (result.lessonId) {
          var c = d.progress.completed[result.lessonId] ||
                  { bestWpm: 0, bestAccuracy: 0, attempts: 0, mastered: false, lastAt: 0 };
          var improved = false;
          if (num(result.netWpm, 0) > c.bestWpm) { c.bestWpm = num(result.netWpm, 0); improved = true; }
          if (num(result.accuracy, 0) > c.bestAccuracy) { c.bestAccuracy = num(result.accuracy, 0); improved = true; }
          c.attempts += 1;
          c.lastAt = Date.now();
          if (result.completed) c.completed = true;

          // A lesson is mastered only when the whole passage was finished, the
          // run was long enough to mean something, and BOTH targets were met.
          // Without the duration floor, a single burst of four keystrokes could
          // claim mastery of a lesson.
          out.masteryEligible = !!result.completed &&
            (num(result.durationMs, 0) >= 1000 || num(result.typed, 0) >= 20);
          if (result.mastery && out.masteryEligible &&
              num(result.netWpm, 0) >= num(result.mastery.wpm, 0) &&
              num(result.accuracy, 0) >= num(result.mastery.accuracy, 0)) {
            c.mastered = true;
          }
          if (c.mastered) out.masteredNow = true;
          d.progress.completed[result.lessonId] = c;
          out.lessonImproved = improved;
        }

        d.recent.unshift({
          at: Date.now(),
          lessonId: str(result.lessonId, ''),
          lessonTitle: str(result.lessonTitle, ''),
          mode: str(result.mode, 'practice'),
          wpm: num(result.netWpm, 0),
          grossWpm: num(result.grossWpm, 0),
          accuracy: num(result.accuracy, 0),
          correct: num(result.correct, 0),
          incorrect: num(result.incorrect, 0),
          typed: num(result.typed, 0),
          durationMs: num(result.durationMs, 0),
          mastered: out.masteredNow
        });
        d.recent = d.recent.slice(0, MAX_RECENT);
      });

      out.bestBefore = bestBefore;
      return out;
    },

    /* ----------------------------------------------------------- weak keys */
    /** Note that `expected` was the character the user was asked for. */
    recordMistake: function (expected, typed) {
      if (typeof expected !== 'string' || expected.length !== 1) return;
      Store.recordMistakes([expected]);
    },

    /**
     * Batch form of recordMistake: one write for many mistakes, which keeps
     * localStorage off the critical path while typing.
     */
    recordMistakes: function (list) {
      if (!Array.isArray(list) || !list.length) return;
      var valid = list.filter(function (ch) { return typeof ch === 'string' && ch.length === 1; });
      if (!valid.length) return;
      update(function (d) {
        var now = Date.now();
        valid.forEach(function (ch) {
          var w = d.weakKeys[ch] || { missed: 0, typed: 0, lastAt: 0 };
          w.missed += 1;
          w.typed += 1;
          w.lastAt = now;
          d.weakKeys[ch] = w;
        });
      });
      trimWeakKeys();
    },

    /** Weak characters ordered by how often they were missed. */
    weakKeys: function (limit) {
      var d = get();
      return Object.keys(d.weakKeys)
        .map(function (ch) { return { char: ch, missed: d.weakKeys[ch].missed, typed: d.weakKeys[ch].typed }; })
        .filter(function (k) { return k.missed > 0; })
        .sort(function (a, b) { return (b.missed - a.missed) || (a.char < b.char ? -1 : 1); })
        .slice(0, limit || MAX_WEAK_KEYS);
    },

    clearWeakKeys: function () {
      update(function (d) { d.weakKeys = {}; });
    },

    /* ---------------------------------------------------------- history */
    recent: function (limit) {
      return get().recent.slice(0, limit || 10);
    },

    /* --------------------------------------------------------------- admin */
    resetAll: function () {
      state = defaults();
      write(state);
      if (available) {
        try { global.localStorage.removeItem(KEY + '.corrupt'); } catch (e) { /* ignore */ }
      }
      return state;
    },

    /** Approximate size of the saved blob, in bytes (for the settings panel). */
    sizeBytes: function () {
      try { return JSON.stringify(get()).length; } catch (e) { return 0; }
    }
  };

  /** Keep only the worst MAX_WEAK_KEYS offenders so the file cannot grow. */
  function trimWeakKeys() {
    update(function (d) {
      var keys = Object.keys(d.weakKeys);
      if (keys.length <= MAX_WEAK_KEYS) return;
      keys
        .sort(function (a, b) { return d.weakKeys[b].missed - d.weakKeys[a].missed; })
        .slice(MAX_WEAK_KEYS)
        .forEach(function (k) { delete d.weakKeys[k]; });
    });
  }

  global.TypingMasterStore = Store;
})(typeof window !== 'undefined' ? window : globalThis);
