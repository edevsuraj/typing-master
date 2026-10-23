/* =========================================================================
   Typing Master — Curriculum (lessons.js)
   -------------------------------------------------------------------------
   Pure data module. Exposes `window.TypingMasterLessons`.

   Lesson shape
   ------------
   id        : string, stable and unique ("s1-07")
   stage     : 1..7 (see STAGES)
   title     : short lesson name
   objective : one sentence describing the learning goal
   keys      : every key the drill is designed to exercise
   newKeys   : keys introduced for the first time by this lesson
   passages  : 1..n practice texts (strings, "\n" allowed)
   difficulty: 1 (very easy) .. 5 (hard)
   mastery   : { wpm, accuracy } — the pass mark shown on the results screen

   Character discipline (enforced by validateCurriculum(), see README)
   -------------------------------------------------------------------
   * Stage 1 uses only  a s d f g h j k l ;  and spaces.
   * Stage 2 adds       q w e r t y u i o p
   * Stage 3 adds       z x c v b n m , . /
   * Stage 4 adds       A-Z (Shift) plus common punctuation
   * Stage 5 adds       digits and remaining everyday symbols
   * Stages 6-7 may use everything.
   ========================================================================= */
(function (global) {
  'use strict';

  /* ---------------------------------------------------------------- stages */
  var STAGES = [
    { id: 1, name: 'Home Row', summary: 'Build the foundation on the ten home keys, starting from the two index anchors.' },
    { id: 2, name: 'Top Row', summary: 'Add the ten top-row keys, two at a time, then blend them with the home row.' },
    { id: 3, name: 'Bottom Row', summary: 'Complete the alphabet with the bottom row, then bring in commas, full stops and slashes.' },
    { id: 4, name: 'Complete Alphabet', summary: 'Every key, plus capitals, numbers, quotes and the punctuation you meet in real writing.' },
    { id: 5, name: 'Words & Sentences', summary: 'Natural English: everyday vocabulary, sentences, paragraphs, letters and email.' },
    { id: 6, name: 'Speed & Accuracy', summary: 'Accuracy first, then rhythm, common-word bursts and targeted drills.' },
    { id: 7, name: 'Advanced', summary: 'Longer text, complex punctuation, technical and literary writing, endurance runs.' }
  ];

  /* ---------------------------------------------------------------- helpers */
  // mk() keeps the lesson list terse by supplying sensible defaults.
  function mk(o) {
    return {
      id: o.id,
      stage: o.stage,
      title: o.title,
      objective: o.objective,
      keys: o.keys || [],
      newKeys: o.newKeys || [],
      passages: o.passages || [],
      difficulty: o.difficulty || 2,
      mastery: o.mastery || { wpm: 25, accuracy: 92 }
    };
  }

  /* =======================================================================
     STAGE 1 — HOME ROW FOUNDATIONS
     ======================================================================= */
  var STAGE1 = [
    mk({
      id: 's1-01', stage: 1,
      title: 'F and J · The Anchors',
      objective: 'Find F and J without looking. Both index keys carry a small raised ridge; feel for it with your index fingers and let it guide every other key.',
      keys: ['f', 'j'], newKeys: ['f', 'j'],
      passages: [
        "fj ff jj jf ff j ff fj ff jj fj jf fj jj fj fj jj fj jj jj jf ff j ff fj jf jj ff fj jf jf jf fj fj jf jj ff jf ff jj jj jf ff jj jj fj jf jf jf f jj jf jf ff jj ff jf ff jj fj fj jf jj ff ff j ff fj jf ff jj f jj ff jj fj jf ff jj jj jj fj jf ff jj jf jf f jj ff jj fj jf fj ff jj ff jj f jj jj ff ff",
        "jj jj fj fj ff jj fj jf fj jf jj ff ff ff jj ff fj jf jf jf fj jf ff jj jf jj ff f jj jj ff jf ff jj jj fj fj jf jj ff ff jf jj ff fj jf ff jj jf fj ff jj jj ff fj jj jj fj fj jj fj jf jj ff ff jf jj ff fj ff jj jj jf ff jj fj jf ff jj fj fj ff jj f jj jj fj fj jj ff fj ff jj ff jj fj jf ff ff jf f jj jj jf ff jj ff fj jf ff jj jj fj fj",
        "ff jj fj jf fj ff jj ff jf jf fj jf fj jf ff jj jf f jj jj ff jf ff ff jj fj fj jf jf ff jj jj fj jf jf jj ff fj jf ff jj jj jj ff ff ff jj fj jf fj jf jf fj ff jj jj ff fj jf ff jj ff jj jf ff ff jj ff ff ff jj jf ff jf jj ff fj jf ff ff jj fj fj jj jj ff ff jj fj jf jj ff ff jj jj f jj j ff ff jf jf jf ff jj fj ff jj jj ff ff ff jf jj ff f jj jf ff ff jf fj ff jj jj ff fj",
        "jf ff jj jj ff fj ff jj jf jf fj j ff fj jf ff jj jf ff jj jj ff j ff fj ff jj jj jj ff ff jj fj jf fj ff jj ff jj jf ff jf jj ff jf ff jf fj ff jj ff jj fj jf fj jf ff jj jj ff fj fj jj ff fj fj jf jf ff j ff fj jf jj ff fj jj jj fj jf ff jj ff jj fj ff jj j ff ff jf jf fj j ff ff ff jj jj fj jf jj f jj j ff",
        "fj fj ff jj fj jf ff ff jj ff fj ff jj jf ff jf jf fj jf ff jj jf fj ff jj jj jj ff ff ff jj fj fj jf jf jf ff jj jj fj ff jj ff jj jf ff ff jj fj jf ff jj ff jj fj jf fj ff jj fj jf ff jj jf jf ff ff ff jj fj fj j ff fj jf ff jj ff jj fj jf fj fj jf jf fj jf jf jf f jj jj jj fj jf ff jj fj jf jf jf fj jf ff jj jj ff ff ff j ff fj ff jj jf jj ff fj jf jf jj ff fj jf ff jj jf jj",
        "ff fj ff jj j ff fj jf ff jj ff jj fj jf fj jf ff jj fj ff jj j ff fj jf fj jf ff jj f jj jf fj ff jj jf ff ff jj fj ff jj ff ff jf jf fj jf ff jj ff jj fj jf fj fj ff jj fj jf f jj j ff fj fj jj ff fj ff jj jf jf fj jf jf fj ff jj jj jj ff ff jj fj jf fj ff jj ff jj fj jf fj jf ff jj fj jf ff jj fj jf f jj ff jj fj jf jf ff jf jf f jj jf jj ff ff ff jf jj ff fj ff jj fj jf ff jj j ff f",
      ],
      difficulty: 1, mastery: { wpm: 8, accuracy: 95 }
    }),
    mk({
      id: 's1-02', stage: 1,
      title: 'F and J · Even Rhythm',
      objective: 'Type F and J at an even, unhurried rhythm. Keep both hands resting on the desk while the fingers move.',
      keys: ['f', 'j'], newKeys: [],
      passages: [
        "jj ff ff jj ff f jj jf jj ff fj jf ff jj ff jj jf ff jj f jj j ff fj jf jj ff f jj jj jj fj ff jj jj fj jj jj fj fj jf jj ff ff ff jj ff fj jj jf ff jf jj ff ff ff ff jj fj jf fj jf ff jj ff jj fj jf ff jj jj fj fj jf jf ff jf jf jf ff jf jj ff ff ff jj jf ff jf jj ff f jj jj fj ff jj ff jj ff jf jf",
        "jf ff jj fj jj fj jf jf fj jj fj ff jj fj fj j ff jf ff jj ff fj jj fj fj jf jf ff ff jj fj jf jf ff jf jj ff ff ff jj fj fj j ff fj jf ff jj fj jf ff jj ff jj fj jf ff ff ff jj fj jf j ff f jj jj ff f jj jj fj ff jj ff ff jf jj ff jf ff jf f jj ff jj fj jf ff jj jj fj jf ff ff jj fj fj jf fj fj j ff fj jf jj ff fj ff jj ff jj fj ff jj",
        "j ff fj fj j ff ff jf jj ff fj ff jj j ff jf ff jj fj fj jj jj jf ff jj jj fj jf ff jj jj ff jf ff jj ff ff ff ff jj fj jf fj ff jj ff jj fj jf fj jf jj jj fj jf ff jj j ff fj ff jj ff jj fj jf fj fj j ff jf ff jj fj ff jj jj fj jf ff jj ff jj fj jf fj jf ff jj fj jf jf fj jf jj ff f jj jj ff fj fj jj jj fj jf ff jj jf jj ff fj jf ff jj ff jj fj fj j ff f jj jf jf ff jf f",
        "jj ff jj ff ff jf jj ff ff jf jf ff ff j ff ff ff jj fj jf fj jf jf jj ff fj ff jj ff jj fj jf fj ff jj jf jj ff fj jf ff jj fj ff jj fj jf jj ff f jj jf ff ff jj fj fj jf f jj jj jf ff jj ff ff ff jj jf ff jj jj fj ff jj fj jf f jj ff jj fj jf fj jj ff jf ff ff jj ff ff jf fj ff jj jj fj ff jj ff jj fj jf ff jj jj jj ff ff jj fj fj ff jj",
        "fj jf jf ff j ff ff j ff fj ff jj jf jj ff fj fj jj fj jf ff jj jj jj fj jf ff jj jj jj fj jf ff jj fj jf f jj jj jj f jj jf jj ff fj fj jj jj fj ff jj jf jj ff fj ff jj jf jj ff ff j ff ff jj jj fj jf ff jj ff jj ff jf fj jf ff jj jj jj fj ff jj jf f jj ff jj fj jf ff ff jj jf ff jj ff jf ff jj ff fj ff jj jj ff ff jf jf f jj jf jf f jj jj jj ff ff jj ff fj ff jj jj ff fj jf jj ff fj jj ff f",
      ],
      difficulty: 1, mastery: { wpm: 12, accuracy: 95 }
    }),
    mk({
      id: 's1-03', stage: 1,
      title: 'D and K',
      objective: 'Add D and K. Middle fingers reach forward one key and come straight home; the index fingers stay on F and J.',
      keys: ['f', 'j', 'd', 'k'], newKeys: ['d', 'k'],
      passages: [
        "f d j k jk df fdjk kdjk fjdk jdfk dfkj jk fj fjdk fjdk kdjk fdjk kdjk kd fj dkfj fdjk dkfj fj dk jk fj f d j k fjdk kdjk fdjk dkfj df jk kd fj dk fj fdjk dkfj fj dk jk fj fd jk dk fj fjdk kdjk fdjk dkfj kdjk fj dk fjdk kdjk fdjk jk fj fjdk dkfj fdjk dkfj fj dk jk fj fjdk jk df dfkj fj dk jk fj f d j",
        "k jdfk fdjk dkfj jk fj kd fj jdfk fd kj kdjk kd fj fjdk kdjk fdjk dkfj fj dk jk fj f d j k dk fj dfkj fj dk jk fj kd fj jdfk fdjk kdjk fd jk dk fj fjdk kdjk dfkj jk fj kd fj dkfj fdjk dkfj kdjk f d j k dkfj fd kj df jk fd jk dk fj dkfj fd kj kdjk fj dk jdfk fdjk dkfj df jk kd fj fjdk kdjk fd kj kdjk fj dk fjdk kdjk fd jk df jk kd fj dk",
        "fj fd kj fj dk jk fj kd fj jdfk fd jk kdjk fj dk fjdk kdjk dfkj fj dk jk fj fjdk dk fj fdjk jk fj fjdk fjdk kdjk fd kj k j d f f d j k jk df fdjk dkfj fj dk jk fj fjdk dkfj fdjk k j d f fjdk fjdk kdjk dfkj fj dk jk fj fd jk dk fj dk fj fd jk jk fj fjdk dkfj fd jk df jk fj dk dkfj fdjk dkfj df jk f d j k fjdk kdjk fdjk dkfj jk fj f d j k jk df fdjk kdjk f d j k dkfj dfkj k",
        "j d f fjdk dkfj dfkj jk fj kd fj jk df fdjk jk fj fd jk dk fj jk df fdjk dkfj k j d f fjdk fjdk kdjk fd jk k j d f f d j k dkfj dfkj df jk fj dk jk df fdjk k j d f f d j k dkfj dfkj df jk fj dk dkfj fd kj kdjk f d j k dk fj fd kj df jk fd jk dk fj jk df dfkj df jk fjdk jk df fd jk jk fj kd fj dkfj dfkj jk fj fjdk",
        "fjdk kdjk fd jk jk fj fd jk dk fj dk fj fdjk jk fj kd fj dkfj fdjk k j d f kd fj jk df fdjk k j d f f d j k jk df fdjk dkfj df jk f d j k dk fj fdjk dkfj fj dk jk fj fj dk jk df fd jk fj dk jk fj kd fj dkfj dfkj k j d f f d j k fjdk kdjk fdjk jk fj f d j k jdfk fd jk jk fj kd fj dkfj dfkj jk fj fjdk dk fj fdjk dkfj kdjk f d j k jdfk fdjk k j d f f d j k dk fj dfkj fj dk jk fj",
        "fj dk jk df fdjk dkfj kdjk fd jk dk fj fjdk kdjk fdjk dkfj df jk fd jk dk fj dk fj fdjk dkfj fj dk jk fj f d j k jk df fd jk k j d f fj dk jdfk fdjk dkfj jk fj fjdk dk fj fd jk fj dk jk fj fj dk jk df dfkj kdjk f d j k jdfk fd jk k j d f kd fj jk df fdjk df jk fj dk dkfj fd kj k j d f f d j k fjdk kdjk fdjk dkfj kdjk kd fj fjdk kdjk fdjk kdjk f d j k fjdk kdjk fdjk dkfj k j d f kd fj fjdk",
      ],
      difficulty: 1, mastery: { wpm: 12, accuracy: 94 }
    }),
    mk({
      id: 's1-04', stage: 1,
      title: 'F D J K · Patterns',
      objective: 'Move in and across the home row without looking. Return each finger to its own key instead of sliding sideways.',
      keys: ['f', 'd', 'j', 'k'], newKeys: [],
      passages: [
        "dkfj fd jk df jk f d j k jk df fd kj jk fj fd jk dk fj fjdk kdjk fdjk dkfj df jk fjdk dk fj dfkj jk fj fd jk dk fj jk df fdjk jk fj fd jk dk fj dk fj fd jk k j d f fj dk dk fj fd jk k j d f fd jk dk fj fjdk kdjk dfkj kdjk f d j k fjdk kdjk fdjk dkfj fj dk jk fj f d j k fjdk kdjk fdjk dkfj k j d f fj",
        "dk dk fj fdjk jk fj fjdk jdfk fd kj fj dk jk fj kd fj dk fj fd jk k j d f fj dk dkfj fd kj k j d f fd jk dk fj fjdk kdjk fdjk fj dk jk fj fjdk jdfk fd kj jk fj fd jk dk fj jk df fdjk dkfj df jk fjdk fjdk kdjk fdjk kdjk f d j k jk df fd jk df jk kd fj dk fj fdjk dkfj kdjk fj dk jk df fd jk k j d f f d j k jk df fdjk jk fj f d j k jdfk fdjk",
        "dkfj df jk fjdk fjdk kdjk fdjk dkfj df jk fd jk dk fj dkfj fdjk dkfj df jk fj dk jdfk dfkj jk fj fjdk fjdk kdjk dfkj kdjk fd jk dk fj dk fj fdjk jk fj fjdk jk df fd jk kdjk fd jk dk fj dk fj fd jk fj dk jk fj f d j k jdfk fdjk fj dk jk fj fjdk jdfk fdjk dkfj k j d f fjdk jdfk fd jk jk fj fj dk jk df fd kj df jk fd jk dk fj dk fj dfkj kdjk fj dk dk fj fd jk k j d f kd fj fjdk",
        "kdjk dfkj k j d f f d j k dkfj dfkj fj dk jk fj fj dk jdfk dfkj jk fj fjdk dk fj fdjk dkfj df jk fj dk dkfj fd kj k j d f f d j k jdfk dfkj jk fj kd fj dkfj fdjk dkfj fj dk jk fj kd fj dkfj fdjk dkfj k j d f fd jk dk fj jk df fd kj jk fj fd jk dk fj jdfk dfkj kdjk fj dk jdfk dfkj df jk fd jk dk fj dkfj fdjk dkfj",
        "kdjk fd jk dk fj dkfj fd kj df jk fj dk jdfk dfkj k j d f fd jk dk fj jdfk fdjk dkfj fj dk jk fj fjdk dkfj fd kj kdjk fd jk dk fj dk fj fdjk k j d f fj dk dkfj fd kj jk fj fj dk jk df fd jk kdjk kd fj dk fj fdjk k j d f fjdk jdfk fd kj kdjk f d j k dkfj fd kj jk fj kd fj dk fj fd kj df jk fjdk fjdk kdjk fdjk dkfj k j d f fjdk jk df fd jk df jk fjdk dkfj fd kj fj dk jk fj fjdk jk",
        "df fdjk dkfj k j d f kd fj jdfk fd kj fj dk jk fj fjdk jk df fdjk dkfj kdjk fj dk dk fj fdjk dkfj jk fj kd fj dk fj fdjk df jk fd jk dk fj fjdk kdjk fd kj k j d f fd jk dk fj dkfj dfkj jk fj fjdk dk fj fd jk k j d f fd jk dk fj jdfk fdjk dkfj df jk kd fj dkfj fdjk dkfj df jk fd jk dk fj jdfk fd kj df jk f d j k fjdk kdjk fdjk jk fj f d j k dk fj fdjk dkfj jk fj fd jk dk fj dkfj dfk",
      ],
      difficulty: 2, mastery: { wpm: 14, accuracy: 93 }
    }),
    mk({
      id: 's1-05', stage: 1,
      title: 'S and L',
      objective: 'Add S and L with the ring fingers. Reach only as far as the knuckle line allows and snap back to the home row.',
      keys: ['s', 'l', 'd', 'k', 'f', 'j'], newKeys: ['s', 'l'],
      passages: [
        "fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk",
        "kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk",
        "kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj",
        "fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk",
        "dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk",
        "dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj",
      ],
      difficulty: 2, mastery: { wpm: 14, accuracy: 93 }
    }),
    mk({
      id: 's1-06', stage: 1,
      title: 'Six Keys · Both Hands',
      objective: 'Now that six keys are known, alternate hands cleanly. The other hand keeps its fingers on the home row the whole time.',
      keys: ['f', 'd', 's', 'j', 'k', 'l'], newKeys: [],
      passages: [
        "kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk",
        "fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk",
        "fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk",
        "kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj",
        "fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj",
        "fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk kdjk fjdk dkfj fdjk",
      ],
      difficulty: 2, mastery: { wpm: 16, accuracy: 92 }
    }),
    mk({
      id: 's1-07', stage: 1,
      title: 'A and the Semicolon Key',
      objective: 'Finish the outer home keys with the little fingers. A sits under Q and the semicolon key sits under P.',
      keys: ['a', ';', 's', 'l', 'd', 'k', 'f', 'j'], newKeys: ['a', ';'],
      passages: [
        "lad flask ask ;a glass gal hall ask a; alas shall ;a gal sad flask lag dad flask ;a lass ;a glass a ask had as glad sag glass ad glass lad ask alas a glad fad flash ask gal ; sash fall lags gas had sash gash gal flag has gas ; ad salad lash ask half ;a shall ; fall glad sad lash half slash half a; lags",
        "flash has gash ; has flash ; lags dad sash sags sad sag fals ask sad ash as sash half lad gal has fals hall has glass sags ask ask ;a had lags flash ask glass ad sags half gas lads gas alas ;a alas flash has a ask sash fad fals lag lads sash shall dad lags lash flash gas sags dad ad ; ask had fals as as hag ;a lash flask ask glad fals glad",
        "shall as glad gal lads slash alas salad salad ;a hall ;a flash sad flask ash lags lag slash ;a lads fad ash ; gash a; had gal ad sad lash lads shall lash salad hall as sags gal as ;a fad flag had lads ask lad gal flash sags fall sag as ;a salad a; had sash sad sad slash had shall glad lag shall gal lag ;a slash has lads lad ; fall had lash ; ash fals gas gas lash salad a;",
        "flask lass fals gash salad lads had dad flask alas slash ask fad flash lad gal glad hag sag sags sash a; hall sad lag gash lad sash slash glad lags glass ; glass sags lads shall lass flash lass hall sash glad sash sag sad ash fad sags lads sad fall sash slash ;a lag hag slash fad flask gas half alas flash lads",
        "sag a a; fals fad glass gal lad ad sash ;a a gash ad gal glass hag gash gas fals lass a slash a; lash had hall ad ;a hag fals slash ;a as sash lass as sad glad flash half as a; glass salad ;a gal had flask ask sag glad lash shall half gas fad flash ask salad glad ad has sags lags slash glad ask hall slash gas flag ask a; sash as hag sag glad lags flag has sag ash ask flask had",
        "lass ask ;a dad flag has gash gas lash gal a lads ; half ; as sags fad gal fals fals slash hag lash hag slash a sad flask lads glass ask glad as lad flask flash ask sash as half a fals lads a; flag sags flask hall alas fall ask lass a; lag flash ;a glass ash lash flask fad gas alas sags lag gas dad lad dad sag glass salad fall glass hall half alas glad flag sad slash flag half flag sa",
      ],
      difficulty: 2, mastery: { wpm: 16, accuracy: 92 }
    }),
    mk({
      id: 's1-08', stage: 1,
      title: 'Left Hand Flow',
      objective: 'Type the left half of the home row (A S D F) without pausing between keys. The right hand stays resting on J K L and the semicolon key.',
      keys: ['a', 's', 'd', 'f'], newKeys: [],
      passages: [
        "dash a flask a lass shall lag a glad gash all fall all ask all shall fall a sad hall flag salad shall fall a sad fad gal gas dash a flask a lass shall lag ask a lad all shall fall half a glass a hall gash a sad lad a sad lad had a glass flask all shall fall a sad hall flag salad shall fall a sad fad",
        "gal gas half a glass a hall gash a sad lad ask a lad all shall fall dad fad gal gas had hag has lad ask a lad all shall fall flash a flask a glass a hall ask a lad all shall fall dash a flask a lass shall lag ask a lad all shall fall half a glass a hall gash a sad lad a glad gash all fall all ask has had a lad a lag a lash a sag salad shall",
        "fall a sad fad gal gas half a glass a hall gash a sad lad a sad lad had a glass flask has had a lad a lag a lash a sag a glass had a lad a lad had a glass all shall fall a sad hall flag ask a lad all shall fall flash a flask a glass a hall salad shall fall a sad fad gal gas flash a flask a glass a hall ask a lad all shall fall has had a lad a lag a lash a sag ask a lad all",
        "shall fall flash a flask a glass a hall shall slash glass fall flash flag has had a lad a lag a lash a sag ask a lad all shall fall half a glass a hall gash a sad lad glad gals lads hags hall half all shall fall a sad hall flag salad shall fall a sad fad gal gas all shall fall a sad hall flag a sad lad had a glass",
        "flask dash a flask a lass shall lag salad shall fall a sad fad gal gas all shall fall a sad hall flag salad shall fall a sad fad gal gas dash a flask a lass shall lag ask a lad all shall fall flag flask gash glad hall half a sad lad had a glass flask flag flask gash glad hall half ask a lad all shall fall dad fad gal gas had hag has lad a glad gash all fall all ask half a glass",
        "a hall gash a sad lad ask a lad all shall fall all shall fall a sad hall flag ask a lad all shall fall flash a flask a glass a hall glad gals lads hags hall half flash a flask a glass a hall shall slash glass fall flash flag has had a lad a lag a lash a sag ask a lad all shall fall dad fad gal gas had hag has lad salad shall fall a sad fad gal gas dad fad gal gas had hag has lad s",
      ],
      difficulty: 2, mastery: { wpm: 18, accuracy: 92 }
    }),
    mk({
      id: 's1-09', stage: 1,
      title: 'Right Hand Flow',
      objective: 'Type the right half of the home row (J K L ;) smoothly, with the left hand still anchored on A S D F.',
      keys: ['j', 'k', 'l', ';'], newKeys: [],
      passages: [
        "a glass had a lad a lad had a glass has had a lad a lag a lash a sag a glad gash all fall all ask flag flask gash glad hall half glad gals lads hags hall half dad fad gal gas had hag has lad salad shall fall a sad fad gal gas flag flask gash glad hall half glad gals lads hags hall half flag flask gash",
        "glad hall half shall slash glass fall flash flag half a glass a hall gash a sad lad a glad gash all fall all ask all shall fall a sad hall flag salad shall fall a sad fad gal gas half a glass a hall gash a sad lad ask a lad all shall fall flash a flask a glass a hall ask a lad all shall fall dash a flask a lass shall lag a glad gash all",
        "fall all ask flash a flask a glass a hall salad shall fall a sad fad gal gas has had a lad a lag a lash a sag shall slash glass fall flash flag flash a flask a glass a hall a glad gash all fall all ask flag flask gash glad hall half salad shall fall a sad fad gal gas all shall fall a sad hall flag glad gals lads hags hall half flash a flask a glass a hall a sad lad had a glass",
        "flask half a glass a hall gash a sad lad ask a lad all shall fall all shall fall a sad hall flag ask a lad all shall fall dad fad gal gas had hag has lad ask a lad all shall fall dash a flask a lass shall lag a glass had a lad a lad had a glass dad fad gal gas had hag has lad ask a lad all shall fall all shall",
        "fall a sad hall flag salad shall fall a sad fad gal gas has had a lad a lag a lash a sag ask a lad all shall fall flag flask gash glad hall half salad shall fall a sad fad gal gas dad fad gal gas had hag has lad shall slash glass fall flash flag has had a lad a lag a lash a sag glad gals lads hags hall half dad fad gal gas had hag has lad a sad lad had a glass flask all shall fall",
        "a sad hall flag salad shall fall a sad fad gal gas all shall fall a sad hall flag a glad gash all fall all ask half a glass a hall gash a sad lad a glass had a lad a lad had a glass has had a lad a lag a lash a sag shall slash glass fall flash flag all shall fall a sad hall flag ask a lad all shall fall all shall fall a sad hall flag shall slash glass fall flash flag dash a flask",
      ],
      difficulty: 2, mastery: { wpm: 18, accuracy: 92 }
    }),
    mk({
      id: 's1-10', stage: 1,
      title: 'G and H · The Bridge',
      objective: 'Reach the two centre keys. They are the first time you leave the home row, so go and return without letting the wrist lift.',
      keys: ['g', 'h'], newKeys: ['g', 'h'],
      passages: [
        "all shall fall a sad hall flag a sad lad had a glass flask flash a flask a glass a hall a glad gash all fall all ask flash a flask a glass a hall a glass had a lad a lad had a glass flash a flask a glass a hall glad gals lads hags hall half flag flask gash glad hall half a glad gash all fall all ask",
        "all shall fall a sad hall flag a glad gash all fall all ask all shall fall a sad hall flag ask a lad all shall fall has had a lad a lag a lash a sag a glad gash all fall all ask has had a lad a lag a lash a sag a glad gash all fall all ask dash a flask a lass shall lag ask a lad all shall fall has had a lad a lag a lash a sag shall slash",
        "glass fall flash flag flash a flask a glass a hall a glad gash all fall all ask flash a flask a glass a hall glad gals lads hags hall half flash a flask a glass a hall shall slash glass fall flash flag has had a lad a lag a lash a sag a glad gash all fall all ask flash a flask a glass a hall glad gals lads hags hall half all shall fall a sad hall flag a glad gash all fall",
        "all ask has had a lad a lag a lash a sag ask a lad all shall fall dash a flask a lass shall lag a glass had a lad a lad had a glass dash a flask a lass shall lag salad shall fall a sad fad gal gas flash a flask a glass a hall a sad lad had a glass flask all shall fall a sad hall flag glad gals lads hags hall half",
        "dash a flask a lass shall lag shall slash glass fall flash flag dad fad gal gas had hag has lad a sad lad had a glass flask flag flask gash glad hall half a glass had a lad a lad had a glass flash a flask a glass a hall a glad gash all fall all ask dad fad gal gas had hag has lad a glass had a lad a lad had a glass dash a flask a lass shall lag glad",
        "gals lads hags hall half all shall fall a sad hall flag ask a lad all shall fall flash a flask a glass a hall a glad gash all fall all ask flash a flask a glass a hall a glass had a lad a lad had a glass dash a flask a lass shall lag ask a lad all shall fall flash a flask a glass a hall ask a lad all shall fall half a glass a hall gash a sad lad glad gals lads hags hall half half a",
        "glass a hall gash a sad lad a sad lad had a glass flask all shall fall a sad hall flag glad gals lads hags hall half dad fad gal gas had hag has lad shall slash glass fall flash flag half a glass a hall gash a sad lad shall slash glass fall flash flag dad fad gal gas had hag has lad a glass had a lad a lad had a glass flag flask gash glad hall half ask a lad all shall fall all sh",
      ],
      difficulty: 2, mastery: { wpm: 18, accuracy: 91 }
    }),
    mk({
      id: 's1-11', stage: 1,
      title: 'The Full Home Row',
      objective: 'Run the whole home row from A to the semicolon key, then backwards. This is the movement pattern every later lesson reuses.',
      keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'], newKeys: [],
      passages: [
        "a sad lad had a glass flask all shall fall a sad hall flag shall slash glass fall flash flag has had a lad a lag a lash a sag ask a lad all shall fall flash a flask a glass a hall shall slash glass fall flash flag dad fad gal gas had hag has lad shall slash glass fall flash flag has had a lad a lag a",
        "lash a sag ask a lad all shall fall dash a flask a lass shall lag salad shall fall a sad fad gal gas all shall fall a sad hall flag shall slash glass fall flash flag dash a flask a lass shall lag a glass had a lad a lad had a glass half a glass a hall gash a sad lad a glad gash all fall all ask half a glass a hall gash a sad lad a sad lad",
        "had a glass flask flag flask gash glad hall half ask a lad all shall fall dash a flask a lass shall lag a glad gash all fall all ask flash a flask a glass a hall shall slash glass fall flash flag dash a flask a lass shall lag shall slash glass fall flash flag dad fad gal gas had hag has lad a glass had a lad a lad had a glass flag flask gash glad hall half ask a lad all shall",
        "fall dash a flask a lass shall lag salad shall fall a sad fad gal gas dad fad gal gas had hag has lad a sad lad had a glass flask dash a flask a lass shall lag a sad lad had a glass flask flag flask gash glad hall half salad shall fall a sad fad gal gas dash a flask a lass shall lag shall slash glass fall flash",
        "flag flag flask gash glad hall half salad shall fall a sad fad gal gas dad fad gal gas had hag has lad ask a lad all shall fall half a glass a hall gash a sad lad a glad gash all fall all ask flash a flask a glass a hall a glad gash all fall all ask flag flask gash glad hall half ask a lad all shall fall dad fad gal gas had hag has lad shall slash glass fall flash flag has had",
        "a lad a lag a lash a sag salad shall fall a sad fad gal gas all shall fall a sad hall flag ask a lad all shall fall dash a flask a lass shall lag glad gals lads hags hall half flag flask gash glad hall half ask a lad all shall fall dad fad gal gas had hag has lad a glad gash all fall all ask dad fad gal gas had hag has lad a sad lad had a glass flask flash a flask a glass a hall gla",
      ],
      difficulty: 3, mastery: { wpm: 20, accuracy: 92 }
    }),
    mk({
      id: 's1-12', stage: 1,
      title: 'Home Row Words',
      objective: 'Real words built only from home-row letters. Type whole words in one smooth motion instead of letter by letter.',
      keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'], newKeys: [],
      passages: [
        "flag flask gash glad hall half ask a lad all shall fall has had a lad a lag a lash a sag shall slash glass fall flash flag all shall fall a sad hall flag salad shall fall a sad fad gal gas has had a lad a lag a lash a sag shall slash glass fall flash flag dad fad gal gas had hag has lad a sad lad had",
        "a glass flask dad fad gal gas had hag has lad a glass had a lad a lad had a glass all shall fall a sad hall flag ask a lad all shall fall dad fad gal gas had hag has lad a glass had a lad a lad had a glass half a glass a hall gash a sad lad ask a lad all shall fall all shall fall a sad hall flag salad shall fall a sad fad gal gas has had",
        "a lad a lag a lash a sag a glass had a lad a lad had a glass has had a lad a lag a lash a sag glad gals lads hags hall half half a glass a hall gash a sad lad glad gals lads hags hall half flag flask gash glad hall half a sad lad had a glass flask dad fad gal gas had hag has lad a sad lad had a glass flask dad fad gal gas had hag has lad a glad gash all fall all ask flash",
        "a flask a glass a hall glad gals lads hags hall half flash a flask a glass a hall glad gals lads hags hall half dad fad gal gas had hag has lad salad shall fall a sad fad gal gas dad fad gal gas had hag has lad a sad lad had a glass flask has had a lad a lag a lash a sag ask a lad all shall fall all shall fall a sad hall flag shall slash",
        "glass fall flash flag dash a flask a lass shall lag glad gals lads hags hall half dad fad gal gas had hag has lad ask a lad all shall fall flag flask gash glad hall half glad gals lads hags hall half all shall fall a sad hall flag salad shall fall a sad fad gal gas half a glass a hall gash a sad lad a glass had a lad a lad had a glass flag flask gash glad hall half shall slash glass fall fl",
      ],
      difficulty: 3, mastery: { wpm: 22, accuracy: 92 }
    }),
    mk({
      id: 's1-13', stage: 1,
      title: 'Home Row Phrases',
      objective: 'Keep the spaces even and the pace steady while moving between words. A space is a real key press, not a pause.',
      keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'], newKeys: [],
      passages: [
        "glad gals lads hags hall half dad fad gal gas had hag has lad glad gals lads hags hall half all shall fall a sad hall flag shall slash glass fall flash flag flag flask gash glad hall half glad gals lads hags hall half has had a lad a lag a lash a sag salad shall fall a sad fad gal gas half a glass a",
        "hall gash a sad lad glad gals lads hags hall half all shall fall a sad hall flag salad shall fall a sad fad gal gas all shall fall a sad hall flag glad gals lads hags hall half all shall fall a sad hall flag salad shall fall a sad fad gal gas dash a flask a lass shall lag a glass had a lad a lad had a glass dad fad gal gas had hag has lad",
        "a sad lad had a glass flask half a glass a hall gash a sad lad salad shall fall a sad fad gal gas flash a flask a glass a hall a glass had a lad a lad had a glass dash a flask a lass shall lag a glass had a lad a lad had a glass flash a flask a glass a hall salad shall fall a sad fad gal gas flash a flask a glass a hall ask a lad all shall fall has had a lad a lag a lash a",
        "sag glad gals lads hags hall half dad fad gal gas had hag has lad ask a lad all shall fall dash a flask a lass shall lag a glad gash all fall all ask has had a lad a lag a lash a sag salad shall fall a sad fad gal gas half a glass a hall gash a sad lad a sad lad had a glass flask has had a lad a lag a lash a sag",
        "shall slash glass fall flash flag dad fad gal gas had hag has lad salad shall fall a sad fad gal gas flag flask gash glad hall half a glass had a lad a lad had a glass dad fad gal gas had hag has lad a glad gash all fall all ask dash a flask a lass shall lag glad gals lads hags hall half dash a flask a lass shall lag a sad lad had a glass flask flash a flask a glass a hall a glass",
        "had a lad a lad had a glass flash a flask a glass a hall salad shall fall a sad fad gal gas dad fad gal gas had hag has lad glad gals lads hags hall half all shall fall a sad hall flag glad gals lads hags hall half dash a flask a lass shall lag a glass had a lad a lad had a glass dash a flask a lass shall lag a glass had a lad a lad had a glass dad fad gal gas had hag has lad salad",
      ],
      difficulty: 3, mastery: { wpm: 24, accuracy: 92 }
    }),
    mk({
      id: 's1-14', stage: 1,
      title: 'Home Row Passage',
      objective: 'A longer stretch of home-row text. Aim for accuracy first and read a word ahead rather than looking at each key.',
      keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'], newKeys: [],
      passages: [
        "dad fad gal gas had hag has lad a glass had a lad a lad had a glass all shall fall a sad hall flag ask a lad all shall fall half a glass a hall gash a sad lad a glad gash all fall all ask all shall fall a sad hall flag salad shall fall a sad fad gal gas has had a lad a lag a lash a sag shall slash glass",
        "fall flash flag dash a flask a lass shall lag a sad lad had a glass flask half a glass a hall gash a sad lad ask a lad all shall fall has had a lad a lag a lash a sag a sad lad had a glass flask dad fad gal gas had hag has lad a glad gash all fall all ask flag flask gash glad hall half shall slash glass fall flash flag half a glass a hall gash a sad lad salad shall fall a sad fad gal gas dad",
      ],
      difficulty: 3, mastery: { wpm: 25, accuracy: 92 }
    })
  ];

  /* =======================================================================
     STAGE 2 — TOP ROW
     ======================================================================= */
  var STAGE2 = [
    mk({
      id: 's2-01', stage: 2,
      title: 'Q and P',
      objective: 'Add the two outside top keys. Little fingers stretch up and outward, then return immediately to A and the semicolon key.',
      keys: ['q', 'p', 'a', ';'], newKeys: ['q', 'p'],
      passages: [
        "type out the quiet story we put it away we will wait here for the quiet hour we write quietly at a quiet hour we will wait here for the quiet hour type out the quiet story we put it away we shall wait here the quiet hour has passed quite a while to type write it out loud we shall wait here the quiet",
        "hour has passed type out the quiet story we put it away type it out pour the water quite a while your quiet trip we will wait here the pure light is out we put it away quite a while to type write it out loud type it out pour the water quite a while your quiet trip we will wait here the quiet road is pure i put the rope out write quietly",
        "at a quiet hour the pure light type it out pour the water quite a while write quietly at a quiet hour the pure light the quiet road is pure i put the rope out quite a while to type write it out loud the quiet road is pure i put the rope out write quietly at a quiet hour the pure light we will wait here for the quiet hour your quiet trip we will wait here type it out pour the",
        "water quite a while quite a while to type write it out loud we will wait here for the quiet hour type out the quiet story we put it away type it out pour the water quite a while quite a while to type write it out loud we will wait here for the quiet hour quite a while to type write it out loud type it out pour the water quite a while we write",
        "quietly at a quiet hour we will wait here for the quiet hour we write quietly at a quiet hour type it out pour the water quite a while quite a while to type write it out loud type it out pour the water quite a while quite a while to type write it out loud the pure light is out we put it away we write quietly at a quiet hour the quiet road is pure i put the rope out quite a while to ty",
      ],
      difficulty: 2, mastery: { wpm: 16, accuracy: 92 }
    }),
    mk({
      id: 's2-02', stage: 2,
      title: 'W and O',
      objective: 'Add W and O with the ring fingers, one key further out. The reach should feel like a small step, not a leap.',
      keys: ['w', 'o', 'q', 'p'], newKeys: ['w', 'o'],
      passages: [
        "we shall wait here the quiet hour has passed we write quietly at a quiet hour the pure light is out we put it away write quietly at a quiet hour the pure light we will wait here for the quiet hour type out the quiet story we put it away we will wait here for the quiet hour we write quietly at a quiet",
        "hour we will wait here for the quiet hour write quietly at a quiet hour the pure light the quiet road is pure i put the rope out write quietly at a quiet hour the pure light we will wait here for the quiet hour your quiet trip we will wait here the quiet road is pure i put the rope out your quiet trip we will wait here we will wait here",
        "for the quiet hour write quietly at a quiet hour the pure light type it out pour the water quite a while write quietly at a quiet hour the pure light we shall wait here the quiet hour has passed your quiet trip we will wait here we shall wait here the quiet hour has passed write quietly at a quiet hour the pure light we will wait here for the quiet hour type out the quiet",
        "story we put it away the quiet road is pure i put the rope out type out the quiet story we put it away we shall wait here the quiet hour has passed your quiet trip we will wait here the pure light is out we put it away we write quietly at a quiet hour we will wait here for the quiet hour we write quietly at a quiet hour we will wait here",
        "for the quiet hour quite a while to type write it out loud type it out pour the water quite a while write quietly at a quiet hour the pure light we shall wait here the quiet hour has passed your quiet trip we will wait here we shall wait here the quiet hour has passed type out the quiet story we put it away the quiet road is pure i put the rope out your quiet trip we will wait here we will w",
      ],
      difficulty: 2, mastery: { wpm: 17, accuracy: 92 }
    }),
    mk({
      id: 's2-03', stage: 2,
      title: 'E and I',
      objective: 'Add E and I with the middle fingers. These two keys appear in a large share of English words, so accuracy here pays off quickly.',
      keys: ['e', 'i', 'd', 'k'], newKeys: ['e', 'i'],
      passages: [
        "your quiet trip we will wait here the quiet road is pure i put the rope out your quiet trip we will wait here type it out pour the water quite a while write quietly at a quiet hour the pure light type it out pour the water quite a while quite a while to type write it out loud the pure light is out we",
        "put it away quite a while to type write it out loud we shall wait here the quiet hour has passed quite a while to type write it out loud we will wait here for the quiet hour quite a while to type write it out loud we will wait here for the quiet hour quite a while to type write it out loud type it out pour the water quite a while quite",
        "a while to type write it out loud we will wait here for the quiet hour type out the quiet story we put it away the quiet road is pure i put the rope out write quietly at a quiet hour the pure light type it out pour the water quite a while quite a while to type write it out loud type it out pour the water quite a while we write quietly at a quiet hour we shall wait here the",
        "quiet hour has passed your quiet trip we will wait here the quiet road is pure i put the rope out we write quietly at a quiet hour we will wait here for the quiet hour write quietly at a quiet hour the pure light we will wait here for the quiet hour write quietly at a quiet hour the pure light type it out pour the water quite a while your",
        "quiet trip we will wait here we shall wait here the quiet hour has passed write quietly at a quiet hour the pure light we will wait here for the quiet hour we write quietly at a quiet hour we will wait here for the quiet hour write quietly at a quiet hour the pure light we will wait here for the quiet hour write quietly at a quiet hour the pure light the pure light is out we put it away typ",
      ],
      difficulty: 2, mastery: { wpm: 18, accuracy: 92 }
    }),
    mk({
      id: 's2-04', stage: 2,
      title: 'R and U',
      objective: 'Add R and U. R sits just above F and U just above J, so the same finger now covers three rows.',
      keys: ['r', 'u', 'f', 'j'], newKeys: ['r', 'u'],
      passages: [
        "we will wait here for the quiet hour quite a while to type write it out loud the quiet road is pure i put the rope out your quiet trip we will wait here the pure light is out we put it away quite a while to type write it out loud the quiet road is pure i put the rope out type out the quiet story we put",
        "it away we shall wait here the quiet hour has passed quite a while to type write it out loud we shall wait here the quiet hour has passed type out the quiet story we put it away we shall wait here the quiet hour has passed we write quietly at a quiet hour we shall wait here the quiet hour has passed write quietly at a quiet hour the pure",
        "light the quiet road is pure i put the rope out your quiet trip we will wait here we shall wait here the quiet hour has passed write quietly at a quiet hour the pure light we shall wait here the quiet hour has passed write quietly at a quiet hour the pure light the quiet road is pure i put the rope out your quiet trip we will wait here the quiet road is pure i put the rope",
        "out type out the quiet story we put it away type it out pour the water quite a while your quiet trip we will wait here the quiet road is pure i put the rope out write quietly at a quiet hour the pure light the pure light is out we put it away your quiet trip we will wait here we shall wait here the quiet hour has passed we write quietly",
        "at a quiet hour we shall wait here the quiet hour has passed we write quietly at a quiet hour we shall wait here the quiet hour has passed your quiet trip we will wait here the pure light is out we put it away we write quietly at a quiet hour we shall wait here the quiet hour has passed write quietly at a quiet hour the pure light type it out pour the water quite a while we write quietly",
      ],
      difficulty: 2, mastery: { wpm: 18, accuracy: 92 }
    }),
    mk({
      id: 's2-05', stage: 2,
      title: 'T and Y',
      objective: 'Add T and Y, the two top keys nearest the centre. That closes the top row, so relax your shoulders.',
      keys: ['t', 'y', 'g', 'h'], newKeys: ['t', 'y'],
      passages: [
        "we write quietly at a quiet hour type it out pour the water quite a while quite a while to type write it out loud the quiet road is pure i put the rope out type out the quiet story we put it away the pure light is out we put it away type out the quiet story we put it away we will wait here for the quiet",
        "hour write quietly at a quiet hour the pure light the quiet road is pure i put the rope out we write quietly at a quiet hour the pure light is out we put it away write quietly at a quiet hour the pure light the pure light is out we put it away we write quietly at a quiet hour we will wait here for the quiet hour your quiet trip we will",
        "wait here type it out pour the water quite a while we write quietly at a quiet hour the quiet road is pure i put the rope out we write quietly at a quiet hour we will wait here for the quiet hour type out the quiet story we put it away we will wait here for the quiet hour we write quietly at a quiet hour we shall wait here the quiet hour has passed write quietly at a quiet",
        "hour the pure light the pure light is out we put it away write quietly at a quiet hour the pure light the pure light is out we put it away write quietly at a quiet hour the pure light we will wait here for the quiet hour we write quietly at a quiet hour type it out pour the water quite a while type out the quiet story we put it away the pure",
        "light is out we put it away write quietly at a quiet hour the pure light type it out pour the water quite a while quite a while to type write it out loud the pure light is out we put it away we write quietly at a quiet hour type it out pour the water quite a while type out the quiet story we put it away type it out pour the water quite a while your quiet trip we will wait here the qui",
      ],
      difficulty: 2, mastery: { wpm: 19, accuracy: 92 }
    }),
    mk({
      id: 's2-06', stage: 2,
      title: 'Top Row · Left Hand',
      objective: 'Sweep the five left-hand top keys Q W E R T forwards and back. The right hand keeps its position on the home row.',
      keys: ['q', 'w', 'e', 'r', 't'], newKeys: [],
      passages: [
        "the quiet road is pure i put the rope out type out the quiet story we put it away we shall wait here the quiet hour has passed type out the quiet story we put it away we will wait here for the quiet hour quite a while to type write it out loud the pure light is out we put it away write quietly at a quiet",
        "hour the pure light type it out pour the water quite a while your quiet trip we will wait here the pure light is out we put it away we write quietly at a quiet hour we shall wait here the quiet hour has passed quite a while to type write it out loud the pure light is out we put it away type out the quiet story we put it away type it out",
        "pour the water quite a while write quietly at a quiet hour the pure light the quiet road is pure i put the rope out we write quietly at a quiet hour type it out pour the water quite a while type out the quiet story we put it away the pure light is out we put it away write quietly at a quiet hour the pure light the quiet road is pure i put the rope out your quiet trip we will",
        "wait here we will wait here for the quiet hour we write quietly at a quiet hour the pure light is out we put it away type out the quiet story we put it away the quiet road is pure i put the rope out your quiet trip we will wait here the pure light is out we put it away we write quietly at a quiet hour the pure",
        "light is out we put it away your quiet trip we will wait here we shall wait here the quiet hour has passed quite a while to type write it out loud we shall wait here the quiet hour has passed quite a while to type write it out loud type it out pour the water quite a while your quiet trip we will wait here we shall wait here the quiet hour has passed write quietly at a quiet hour",
        "the pure light the pure light is out we put it away write quietly at a quiet hour the pure light type it out pour the water quite a while we write quietly at a quiet hour we will wait here for the quiet hour your quiet trip we will wait here we shall wait here the quiet hour has passed quite a while to type write it out loud the quiet road is pure i put the rope out quite a while",
      ],
      difficulty: 3, mastery: { wpm: 22, accuracy: 91 }
    }),
    mk({
      id: 's2-07', stage: 2,
      title: 'Top Row · Right Hand',
      objective: 'Sweep Y U I O P forwards and back. Watch that the right hand does not drift to the right as you reach.',
      keys: ['y', 'u', 'i', 'o', 'p'], newKeys: [],
      passages: [
        "write quietly at a quiet hour the pure light we shall wait here the quiet hour has passed we write quietly at a quiet hour we will wait here for the quiet hour write quietly at a quiet hour the pure light the pure light is out we put it away your quiet trip we will wait here type it out pour the water",
        "quite a while we write quietly at a quiet hour type it out pour the water quite a while type out the quiet story we put it away we shall wait here the quiet hour has passed write quietly at a quiet hour the pure light we shall wait here the quiet hour has passed type out the quiet story we put it away the pure light is out we put it away",
        "write quietly at a quiet hour the pure light the quiet road is pure i put the rope out quite a while to type write it out loud the quiet road is pure i put the rope out we write quietly at a quiet hour the pure light is out we put it away your quiet trip we will wait here type it out pour the water quite a while write quietly at a quiet hour the pure light we shall wait here",
        "the quiet hour has passed type out the quiet story we put it away type it out pour the water quite a while type out the quiet story we put it away we shall wait here the quiet hour has passed we write quietly at a quiet hour we will wait here for the quiet hour your quiet trip we will wait here type it out pour",
        "the water quite a while write quietly at a quiet hour the pure light the quiet road is pure i put the rope out write quietly at a quiet hour the pure light the quiet road is pure i put the rope out we write quietly at a quiet hour type it out pour the water quite a while we write quietly at a quiet hour the quiet road is pure i put the rope out we write quietly at a quiet hour",
        "we shall wait here the quiet hour has passed we write quietly at a quiet hour the quiet road is pure i put the rope out type out the quiet story we put it away we will wait here for the quiet hour quite a while to type write it out loud we will wait here for the quiet hour quite a while to type write it out loud the pure light is out we put it away we write quietly at a quiet hour ty",
      ],
      difficulty: 3, mastery: { wpm: 22, accuracy: 91 }
    }),
    mk({
      id: 's2-08', stage: 2,
      title: 'Top and Home · Alternating',
      objective: 'Pair each top-row key with the home key beneath it. This vertical reach is the core of comfortable touch typing.',
      keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'], newKeys: [],
      passages: [
        "the pure light is out we put it away we write quietly at a quiet hour type it out pour the water quite a while write quietly at a quiet hour the pure light the pure light is out we put it away write quietly at a quiet hour the pure light the pure light is out we put it away your quiet trip we will wait",
        "here the pure light is out we put it away write quietly at a quiet hour the pure light we will wait here for the quiet hour quite a while to type write it out loud we shall wait here the quiet hour has passed your quiet trip we will wait here the quiet road is pure i put the rope out we write quietly at a quiet hour we will wait here for",
        "the quiet hour your quiet trip we will wait here type it out pour the water quite a while we write quietly at a quiet hour type it out pour the water quite a while we write quietly at a quiet hour type it out pour the water quite a while your quiet trip we will wait here the quiet road is pure i put the rope out your quiet trip we will wait here the pure light is out we put",
        "it away write quietly at a quiet hour the pure light we shall wait here the quiet hour has passed we write quietly at a quiet hour the quiet road is pure i put the rope out your quiet trip we will wait here the quiet road is pure i put the rope out we write quietly at a quiet hour the quiet road is pure i put",
        "the rope out quite a while to type write it out loud we will wait here for the quiet hour we write quietly at a quiet hour the pure light is out we put it away type out the quiet story we put it away the pure light is out we put it away quite a while to type write it out loud the quiet road is pure i put the rope out write quietly at a quiet hour the pure light we shall wait here",
        "the quiet hour has passed write quietly at a quiet hour the pure light we shall wait here the quiet hour has passed we write quietly at a quiet hour we shall wait here the quiet hour has passed we write quietly at a quiet hour the quiet road is pure i put the rope out quite a while to type write it out loud the quiet road is pure i put the rope out type out the quiet story we put it",
      ],
      difficulty: 3, mastery: { wpm: 24, accuracy: 91 }
    }),
    mk({
      id: 's2-09', stage: 2,
      title: 'Top Row Words',
      objective: 'Words made from the top row plus everything you already know. Let the fingers follow the familiar pattern.',
      keys: ['t', 'y', 'p', 'r', 'i', 'q', 'e', 'o', 'w', 'u'], newKeys: [],
      passages: [
        "quite a while to type write it out loud the quiet road is pure i put the rope out your quiet trip we will wait here type it out pour the water quite a while type out the quiet story we put it away the quiet road is pure i put the rope out we write quietly at a quiet hour the quiet road is pure i put",
        "the rope out your quiet trip we will wait here we will wait here for the quiet hour write quietly at a quiet hour the pure light the quiet road is pure i put the rope out we write quietly at a quiet hour the quiet road is pure i put the rope out quite a while to type write it out loud we shall wait here the quiet hour has passed quite a",
        "while to type write it out loud we shall wait here the quiet hour has passed your quiet trip we will wait here the quiet road is pure i put the rope out your quiet trip we will wait here we shall wait here the quiet hour has passed we write quietly at a quiet hour the quiet road is pure i put the rope out write quietly at a quiet hour the pure light we will wait here for the",
        "quiet hour we write quietly at a quiet hour we shall wait here the quiet hour has passed your quiet trip we will wait here the quiet road is pure i put the rope out we write quietly at a quiet hour we will wait here for the quiet hour type out the quiet story we put it away type it out pour the water quite a while",
        "we write quietly at a quiet hour we shall wait here the quiet hour has passed quite a while to type write it out loud we shall wait here the quiet hour has passed type out the quiet story we put it away we will wait here for the quiet hour your quiet trip we will wait here we shall wait here the quiet hour has passed write quietly at a quiet hour",
        "the pure light we will wait here for the quiet hour write quietly at a quiet hour the pure light the pure light is out we put it away type out the quiet story we put it away we will wait here for the quiet hour write quietly at a quiet hour the pure light the quiet road is pure i put the rope out your quiet trip we will wait here type it out pour the water quite a while we write quietly",
        "at a quiet hour we shall wait here the quiet hour has passed write quietly at a quiet hour the pure light the quiet road is pure i put the rope out your quiet trip we will wait here we will wait here for the quiet hour write quietly at a quiet hour the pure light we shall wait here the quiet hour has passed your quiet trip we will wait here the pure",
        "light is out we put it away quite a while to type write it out loud we shall wait here the quiet hour has passed write quietly at a quiet hour the pure light the quiet road is pure i put the rope out type out the quiet story we put it away we will wait here for the quiet hour your quiet trip we will wait here type it out pour the water quite a while we write quietly at a q",
      ],
      difficulty: 3, mastery: { wpm: 26, accuracy: 91 }
    }),
    mk({
      id: 's2-10', stage: 2,
      title: 'Top Row Phrases',
      objective: 'Short phrases with a comfortable rhythm. Keep your eyes a little ahead of your fingers and trust the pattern.',
      keys: ['w', 't', 'y', 'p', 'r', 'i', 'q', 'e', 'o', 'u', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'], newKeys: [],
      passages: [
        "type it out pour the water quite a while write quietly at a quiet hour the pure light the quiet road is pure i put the rope out your quiet trip we will wait here we will wait here for the quiet hour we write quietly at a quiet hour type it out pour the water quite a while quite a while to type write",
        "it out loud the quiet road is pure i put the rope out type out the quiet story we put it away type it out pour the water quite a while your quiet trip we will wait here type it out pour the water quite a while write quietly at a quiet hour the pure light we shall wait here the quiet hour has passed quite a while to type write it out loud",
        "the quiet road is pure i put the rope out quite a while to type write it out loud we will wait here for the quiet hour we write quietly at a quiet hour the pure light is out we put it away quite a while to type write it out loud we shall wait here the quiet hour has passed quite a while to type write it out loud the pure light is out we put it away we write quietly at a quiet",
        "hour we shall wait here the quiet hour has passed quite a while to type write it out loud we will wait here for the quiet hour quite a while to type write it out loud we will wait here for the quiet hour your quiet trip we will wait here we will wait here for the quiet hour we write quietly at a quiet hour we",
        "will wait here for the quiet hour write quietly at a quiet hour the pure light we will wait here for the quiet hour quite a while to type write it out loud we shall wait here the quiet hour has passed we write quietly at a quiet hour the pure light is out we put it away we write quietly at a quiet hour type it out pour the water quite a while quite",
        "a while to type write it out loud we will wait here for the quiet hour quite a while to type write it out loud we shall wait here the quiet hour has passed your quiet trip we will wait here we shall wait here the quiet hour has passed write quietly at a quiet hour the pure light type it out pour the water quite a while type out the quiet story we put it away we will wait here for the",
        "quiet hour your quiet trip we will wait here type it out pour the water quite a while we write quietly at a quiet hour we shall wait here the quiet hour has passed quite a while to type write it out loud the quiet road is pure i put the rope out quite a while to type write it out loud the quiet road is pure i put the rope out your quiet trip we will wait here the pure light is o",
      ],
      difficulty: 3, mastery: { wpm: 28, accuracy: 91 }
    }),
    mk({
      id: 's2-11', stage: 2,
      title: 'Top Row Sentences',
      objective: 'Whole sentences, still without capitals, so attention stays on letters, spaces and word endings. Slow is fine.',
      keys: ['w', 't', 'y', 'p', 'r', 'i', 'q', 'e', 'o', 'u'], newKeys: [],
      passages: [
        "type out the quiet story we put it away type it out pour the water quite a while quite a while to type write it out loud the quiet road is pure i put the rope out write quietly at a quiet hour the pure light we will wait here for the quiet hour write quietly at a quiet hour the pure light we shall wait",
        "here the quiet hour has passed type out the quiet story we put it away the pure light is out we put it away your quiet trip we will wait here type it out pour the water quite a while we write quietly at a quiet hour type it out pour the water quite a while we write quietly at a quiet hour the quiet road is pure i put the rope out your quiet",
        "trip we will wait here the quiet road is pure i put the rope out write quietly at a quiet hour the pure light we will wait here for the quiet hour your quiet trip we will wait here the quiet road is pure i put the rope out quite a while to type write it out loud we shall wait here the quiet hour has passed write quietly at a quiet hour the pure light we will wait here for",
        "the quiet hour quite a while to type write it out loud we will wait here for the quiet hour we write quietly at a quiet hour type it out pour the water quite a while your quiet trip we will wait here we shall wait here the quiet hour has passed quite a while to type write it out loud type it out pour the water",
        "quite a while type out the quiet story we put it away type it out pour the water quite a while quite a while to type write it out loud the pure light is out we put it away we write quietly at a quiet hour the quiet road is pure i put the rope out type out the quiet story we put it away the pure light is out we put it away type out the quiet story we put it away the quiet road",
        "is pure i put the rope out quite a while to type write it out loud type it out pour the water quite a while your quiet trip we will wait here we will wait here for the quiet hour write quietly at a quiet hour the pure light the pure light is out we put it away write quietly at a quiet hour the pure light we shall wait here the quiet hour has passed we write quietly at a quiet hour we",
      ],
      difficulty: 4, mastery: { wpm: 30, accuracy: 90 }
    }),
    mk({
      id: 's2-12', stage: 2,
      title: 'Top and Home Passage',
      objective: 'A longer passage using the top row and the home row together. Read a phrase ahead and let your hands follow it.',
      keys: ['w', 't', 'y', 'p', 'r', 'i', 'q', 'e', 'o', 'u'], newKeys: [],
      passages: [
        "we shall wait here the quiet hour has passed type out the quiet story we put it away we shall wait here the quiet hour has passed quite a while to type write it out loud the pure light is out we put it away your quiet trip we will wait here we shall wait here the quiet hour has passed we write quietly",
        "at a quiet hour we will wait here for the quiet hour we write quietly at a quiet hour the quiet road is pure i put the rope out write quietly at a quiet hour the pure light type it out pour the water quite a while type out the quiet story we put it away the pure light is out we put it away your quiet trip we will wait here type it out pour the water quite a while we write quietly at a quiet hou",
      ],
      difficulty: 4, mastery: { wpm: 32, accuracy: 90 }
    })
  ];

  /* =======================================================================
     STAGE 3 — BOTTOM ROW
     ======================================================================= */
  var STAGE3 = [
    mk({
      id: 's3-01', stage: 3,
      title: 'Z and M',
      objective: 'Start the bottom row with the little fingers. Z is under A and M sits inboard of the comma key.',
      keys: ['z', 'm', 'a', ';'], newKeys: ['z', 'm'],
      passages: [
        "mix the box then zip it then fix it too a busy zoo with a box and a zebra too fix the box then mix it then fax the box fix the box then mix it then fax it well a box and a map and a zip then fix it come and go and stay with a big box fix the box and zip it then mix it well we can move the box then fix",
        "it then zip it the vet fixes the box then mixes it well mix the box then zip it then fix it too fix the box then mix it then fax the box fix six boxes then mix them then fax them the vet will fix the box and mix it well fix the box and zip it then mix it well a small box and a big zip then we mix it a zebra goes to the zoo with a box the",
        "box is a big box with a small map a busy place with a box and a map and a zip fix the box then mix it then fax it well come go stay and do not complain about the mess mix the box then fix it then box it again the comic book was fun bring me six more fix the box then mix it then fax the box a box and a map and a zip and a fix then mix the box then fix it then zip the box a",
        "small box and a big map then mix it zip the box then fix it then mix it well mix the box then zip it box it and fix it a big box then a small box then mix them the vet will fix the box and mix it well a small box and a big map then mix it buy a box and mix it with a big fax fix the box and zip it then mix it well a busy zoo with a box and",
        "a zebra too fix the box then mix it then fax the box a small box and a big zip then we mix it a small box a big map and a quick zip come go stay then mix the box then fix it zip the box then fix it then mix it well a small box a big map and a quick zip we can fix the box then mix it then zip it a big zoo we can mix the map then zip it mix the box then zip it then fix it too we can mix and",
      ],
      difficulty: 2, mastery: { wpm: 20, accuracy: 91 }
    }),
    mk({
      id: 's3-02', stage: 3,
      title: 'X and the Comma',
      objective: 'Add X and the comma key. The comma is the most typed punctuation mark in English, so this reach pays off quickly.',
      keys: ['x', ',', 's', 'l'], newKeys: ['x', ','],
      passages: [
        "a small box and a big box and a map too come and go and stay with a big box buy six boxes then mix them with a fax a zebra goes to the zoo with a box mix the box then fix it then zip the box a big zoo we can mix the map then zip it a small box and a zip and a map then mix we can not move the box but",
        "we can fix it come and go and stay with a big box we can not move but we can fix a box then a small box a big map and a quick zip mix the box then zip it then fix it too mix six boxes then fix the mix and fax it a small box and a big zip then we mix it a small box and a zip and a map then mix mix the box then zip it then fix it too fix",
        "the box then mix it then fax the box the vet will fix the box and mix it well buy six boxes then fix them then mix them mix the box then zip it then fix it too a small box and a big box and a map too a big box and a small map then we mix it buy a box and a map and mix them well a box and a map and a zip then fix it mix the box then fix it then zip the box come go stay then",
        "mix the box then fix it the zoo is a busy place so bring a big box buy a box and a map and mix them well a box and a map and a zip then fix it fix the box then mix it then fax the box mix six boxes then fix the mix and fax it we can move the box then fix it then zip it mix the box then fix it then box it again come go stay and do not complain",
        "about the mess the comic book was fun with a box and a zip a zebra goes to the zoo with a box a big box and a small map then we mix it mix the box then fix it then box it again the vet fixes the box then mixes it well we can mix and fix the box then zip it buy six boxes then fix them then mix them buy six boxes then mix them with a fax the vet fixes the box then mixes it well we can not",
      ],
      difficulty: 2, mastery: { wpm: 20, accuracy: 91 }
    }),
    mk({
      id: 's3-03', stage: 3,
      title: 'C and the Full Stop',
      objective: 'Add C and the full stop. These keys invite accidental double hits, so keep the touch light and quick.',
      keys: ['c', '.', 'd', 'k'], newKeys: ['c', '.'],
      passages: [
        "a box and a map and a zip and a fix then a box and a map and a zip then fix it the box is over the zoo with a map too a busy place with a box and a map and a zip the comic book was fun bring me six more fix six boxes then mix them then fax them buy six boxes then fix them then mix them come go stay and",
        "do not complain about the mess a busy place with a box and a map and a zip come and go and stay with a big box the vet will fix the box and mix it well mix the box then fix it then box it again a big zoo we can mix the map then zip it a busy zoo with a box and a zebra too a zebra goes to the zoo with a box we can mix the map then zip it",
        "box it and fix it too zip the box then fix it then mix it well come go stay then mix the box then fix it a big box then a small box then mix them buy a box and a map and mix them well zip the box then fix it then mix it well buy a box and a map and mix them well come go stay and do not complain about the mess a busy place with a box and a map and a zip a small box and a big",
        "zip then we mix it the comic book was fun bring me six more fix the box and zip it then mix it well a zebra and a zoo and a box then mix them the vet will fix the box and mix it well mix six boxes then fix them then fax them a box and a map and a zip and a fix then fix the box then mix it then fax it well the zoo is a busy place so bring",
        "a big box a big box and a small map then we mix it a box and a map and a zip then fix it the comic book was fun bring me six more mix six boxes then fix them then fax them mix six boxes then fix them then fax them a box and a map then we mix them well come and go and stay with a big box mix six boxes then fix the mix and fax it a big box then a small box then mix them fix six boxes then",
      ],
      difficulty: 2, mastery: { wpm: 21, accuracy: 91 }
    }),
    mk({
      id: 's3-04', stage: 3,
      title: 'V and the Slash',
      objective: 'Add V and the slash key. Keep the wrist planted while the index finger makes its small outward move.',
      keys: ['v', '/', 'f', 'j'], newKeys: ['v', '/'],
      passages: [
        "fix the box then mix it then fax it well mix the box then zip it box it and fix it the comic book was fun bring me six more a box and a map and a zip then fix it mix the box then zip it then fix it too buy six boxes then mix them with a fax mix the box then zip it box it and fix it fix six boxes then",
        "mix them then fax them we can move the box then fix it then zip it mix the box then zip it then fix it too come go stay with a box and a map too fix the box then mix it then fax it well the comic book was fun bring me six more fix six boxes then mix them then fax them the box is a big box with a small map come go stay then mix the box then",
        "fix it the zoo is a busy place so bring a big box the box is a big box with a small map a box and a map and a zip and a fix then a busy place with a box and a map and a zip the box is a big box with a small map the zebra went over the zoo with a box a busy place with a box and a map and a zip a zebra goes to the zoo with a box we can not move but we can fix a box then zip",
        "the box then fix it then mix it well a big zoo we can mix the map then zip it the box is a big box with a small map come and go and stay with a big box mix six boxes then fix the mix and fax it a big box and a small map then we mix it a small box and a big zip then we mix it mix the box then zip it then fix it too a zebra goes to the zoo",
        "with a box a box and a map and a zip then fix it the box is over the zoo with a map too buy six boxes then mix them with a fax a big box then a small box then mix them come and go and stay with a big box the comic book was fun with a box and a zip zip the box then fix it then mix it well fix the box and zip it then mix it well a small box and a big zip then we mix it come and go and stay",
      ],
      difficulty: 2, mastery: { wpm: 21, accuracy: 91 }
    }),
    mk({
      id: 's3-05', stage: 3,
      title: 'B and N',
      objective: 'Add B and N, the two bottom keys your index fingers reach directly beneath F and J.',
      keys: ['b', 'n', 'f', 'j'], newKeys: ['b', 'n'],
      passages: [
        "a small box and a zip and a map then mix a busy zoo with a box and a zebra too a zebra goes to the zoo with a box a box and a map and a zip and a fix then come go stay with a box and a map too the comic book was fun with a box and a zip a zebra in a zoo with a box and a map fix the box then mix it then",
        "fax it well the comic book was fun with a box and a zip we can not move but we can fix a box then a box and a map then we mix them well buy six boxes then fix them then mix them mix the box then zip it box it and fix it the comic book was fun bring me six more come go stay and do not complain about the mess the vet fixes the box then mixes",
        "it well come and go and stay with a big box a box and a map and a zip then fix it a zebra goes to the zoo with a box a zebra and a zoo and a box then mix them we can not move but we can fix a small map the comic book was fun with a box and a zip mix the box then zip it then fix it too fix the box then mix it then fax it well we can not move but we can fix a box then a box",
        "and a map and a zip then fix it fix six boxes then mix them then fax them the box is over the zoo with a map too a box and a map and a zip and a fix then the comic book was fun with a box and a zip fix the box and zip it then mix it well a zebra goes to the zoo with a box buy a box and a map and mix them well a zebra in a zoo with a box and",
        "a map mix the box then fix it then box it again buy six boxes then mix them with a fax the zoo is a busy place so bring a big box a busy zoo with a box and a zebra too a small box and a big box and a map too we can not move but we can fix a small map a small box and a zip and a map then mix fix six boxes then mix them then fax them mix six boxes then fix the mix and fax it a busy pla",
      ],
      difficulty: 2, mastery: { wpm: 22, accuracy: 91 }
    }),
    mk({
      id: 's3-06', stage: 3,
      title: 'Bottom Row · Left Hand',
      objective: 'Sweep Z X C V B and back. This is the widest stretch of the left hand, so slide the whole hand slightly closer to the desk edge.',
      keys: ['z', 'x', 'c', 'v', 'b'], newKeys: [],
      passages: [
        "the comic book was fun bring me six more fix the box and zip it then mix it well buy six boxes then fix them then mix them a big zoo we can mix the map then zip it mix six boxes then fix them then fax them we can not move the box but we can fix it we can not move the box but we can fix it we can mix",
        "the map then zip it box it and fix it too a small box and a big zip then we mix it we can fix the box then mix it then zip it a small box and a zip and a map then mix zip the box then fix it then mix it well a small box a big map and a quick zip buy a box and a map and mix them well the comic book was fun with a box and a zip a zebra in",
        "a zoo with a box and a map the zebra went over the zoo with a box a small box and a big map then mix it come go stay and do not complain about the mess the comic book was fun bring me six more a small box and a big zip then we mix it mix six boxes then fix them then fax them the comic book was fun with a box and a zip buy a box and mix it with a big fax buy six boxes then",
        "fix them then mix them mix six boxes then fix the mix and fax it buy six boxes then mix them with a fax the comic book was fun bring me six more a small box and a big map then mix it the vet fixes the box then mixes it well a small box and a big map then mix it the comic book was fun bring me six more fix six boxes then mix them then fax",
        "them mix the box then fix it then zip the box a big box and a small map then we mix it the comic book was fun with a box and a zip come go stay then mix the box then fix it the vet will fix the box and mix it well a busy place with a box and a map and a zip come go stay with a box and a map too the zoo is a busy place so bring a big box the comic book was fun with a box and a zip come go stay",
      ],
      difficulty: 3, mastery: { wpm: 24, accuracy: 90 }
    }),
    mk({
      id: 's3-07', stage: 3,
      title: 'Bottom Row · Right Hand',
      objective: 'Sweep N M , . / and back, keeping the hand from drifting right as you reach the slash.',
      keys: ['n', 'm', ',', '.', '/'], newKeys: [],
      passages: [
        "buy a box and a map and mix them well a box and a map and a zip then fix it we can mix and fix the box then zip it the box is a big box with a small map a busy place with a box and a map and a zip a box and a map and a zip and a fix then fix the box and zip it then mix it well mix the box then fix it",
        "then box it again the zoo is a busy place so bring a big box buy six boxes then mix them with a fax buy six boxes then fix them then mix them we can mix the map then zip it box it and fix it too we can mix the map then zip it box it and fix it too fix the box then mix it then fax the box a small box and a big box and a map too a box and",
        "a map and a zip and a fix then a small box and a zip and a map then mix we can not move but we can fix a box then come and go and stay with a big box the box is a big box with a small map we can move the box then fix it then zip it buy a box and mix it with a big fax zip the box then fix it then mix it well a small box a big map and a quick zip a zebra and a zoo and a box",
        "then mix them mix six boxes then fix them then fax them the comic book was fun with a box and a zip the vet fixes the box then mixes it well we can move the box then fix it then zip it the zebra went over the zoo with a box mix six boxes then fix the mix and fax it a busy place with a box and a map and a zip we can not move but we can fix",
        "a box then the box is over the zoo with a map too we can move the box then fix it then zip it a big box then a small box then mix them the vet fixes the box then mixes it well we can not move but we can fix a small map fix six boxes then mix them then fax them a busy place with a box and a map and a zip the box is a big box with a small map a box and a map and a zip and a fix then a small b",
      ],
      difficulty: 3, mastery: { wpm: 24, accuracy: 90 }
    }),
    mk({
      id: 's3-08', stage: 3,
      title: 'All Three Rows',
      objective: 'Move vertically between all three rows. Slower than fast: every key should still land first time.',
      keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'], newKeys: [],
      passages: [
        "the comic book was fun with a box and a zip mix the box then zip it box it and fix it a small box and a zip and a map then mix zip the box then fix it then mix it well a box and a map and a zip then fix it a box and a map then we mix them well come go stay then mix the box then fix it the box is a big",
        "box with a small map we can not move but we can fix a small map a small box and a big zip then we mix it mix the box then zip it box it and fix it a box and a map then we mix them well mix the box then fix it then zip the box a zebra in a zoo with a box and a map we can not move the box but we can fix it a small box and a zip and a map",
        "then mix we can mix and fix the box then zip it zip the box then fix it then mix it well a big zoo we can mix the map then zip it a zebra goes to the zoo with a box we can fix the box then mix it then zip it a zebra and a zoo and a box then mix them a small box a big map and a quick zip buy six boxes then fix them then mix them a zebra and a zoo and a box then mix them a zebra",
        "and a zoo and a box then mix them we can not move the box but we can fix it buy six boxes then fix them then mix them the zebra went over the zoo with a box a box and a map and a zip then fix it a box and a map and a zip and a fix then mix the box then zip it then fix it too the zebra went over the zoo with a box we can not move the box but",
        "we can fix it come go stay then mix the box then fix it the zoo is a busy place so bring a big box a zebra in a zoo with a box and a map we can mix the map then zip it box it and fix it too we can move the box then fix it then zip it we can not move but we can fix a box then fix the box and zip it then mix it well we can not move but we can fix a small map fix the box then mix it the",
      ],
      difficulty: 3, mastery: { wpm: 26, accuracy: 90 }
    }),
    mk({
      id: 's3-09', stage: 3,
      title: 'Full Alphabet Words',
      objective: 'Ordinary words that need the complete alphabet. Return to rest position between every word.',
      keys: [], newKeys: [],
      passages: [
        "the vet will fix the box and mix it well a busy zoo with a box and a zebra too a big zoo we can mix the map then zip it come and go and stay with a big box mix the box then fix it then zip the box we can not move but we can fix a small map we can not move but we can fix a box then a small box and a big",
        "zip then we mix it buy a box and mix it with a big fax we can fix the box then mix it then zip it mix the box then zip it then fix it too the comic book was fun bring me six more a small box and a big zip then we mix it a small box and a big box and a map too buy a box and mix it with a big fax buy a box and a map and mix them well a zebra",
        "and a zoo and a box then mix them we can mix the map then zip it box it and fix it too a busy place with a box and a map and a zip fix six boxes then mix them then fax them a big box then a small box then mix them fix the box and zip it then mix it well mix the box then fix it then box it again come go stay then mix the box then fix it fix the box then mix it then fax the",
        "box mix the box then zip it then fix it too a box and a map and a zip and a fix then the box is a big box with a small map mix six boxes then fix them then fax them buy a box and a map and mix them well we can move the box then fix it then zip it a box and a map and a zip then fix it a small box and a big map",
        "then mix it a big zoo we can mix the map then zip it come go stay then mix the box then fix it we can fix the box then mix it then zip it a box and a map and a zip and a fix then buy six boxes then fix them then mix them mix the box then fix it then box it again buy a box and mix it with a big fax fix the box then mix it then fax the box mix the",
        "box then zip it then fix it too mix the box then zip it box it and fix it the zoo is a busy place so bring a big box we can mix the map then zip it box it and fix it too we can not move but we can fix a box then a box and a map and a zip then fix it we can mix and fix the box then zip it come and go and stay with a big box mix six boxes then fix them then fax them the zoo is a busy",
        "place so bring a big box a small box and a zip and a map then mix a small box and a big map then mix it we can mix and fix the box then zip it mix the box then fix it then box it again the box is over the zoo with a map too zip the box then fix it then mix it well a small box and a big box and a map too a big zoo we can mix the map then zip it a small box and a big zip then we mix i",
      ],
      difficulty: 4, mastery: { wpm: 32, accuracy: 90 }
    }),
    mk({
      id: 's3-10', stage: 3,
      title: 'Comma and Full Stop Practice',
      objective: 'Short sentences where every pause is typed. A comma is a quick tap; a full stop is a tap and a small breath.',
      keys: [',', '.'], newKeys: [],
      passages: [
        "come and go and stay with a big box fix the box and zip it then mix it well mix six boxes then fix them then fax them come go stay then mix the box then fix it the comic book was fun bring me six more a busy place with a box and a map and a zip mix the box then zip it box it and fix it come and go and",
        "stay with a big box the box is a big box with a small map buy six boxes then mix them with a fax a big box then a small box then mix them mix the box then fix it then box it again buy six boxes then fix them then mix them the zoo is a busy place so bring a big box a box and a map and a zip and a fix then the vet will fix the box and mix",
        "it well zip the box then fix it then mix it well a box and a map then we mix them well the vet will fix the box and mix it well we can not move but we can fix a box then mix the box then zip it then fix it too mix the box then zip it then fix it too a zebra in a zoo with a box and a map come and go and stay with a big box the comic book was fun with a box and a zip we can",
        "fix the box then mix it then zip it a box and a map then we mix them well fix six boxes then mix them then fax them we can not move but we can fix a box then a big zoo we can mix the map then zip it fix the box and zip it then mix it well we can not move the box but we can fix it we can fix the box then mix it",
        "then zip it fix the box then mix it then fax the box a small box and a zip and a map then mix mix six boxes then fix the mix and fax it a small box and a zip and a map then mix a big box and a small map then we mix it the comic book was fun with a box and a zip buy a box and a map and mix them well a big zoo we can mix the map then zip it come go stay with a box and a map too we",
        "can mix and fix the box then zip it we can not move but we can fix a small map the box is over the zoo with a map too buy a box and a map and mix them well the vet will fix the box and mix it well a busy zoo with a box and a zebra too a small box and a big zip then we mix it a small box a big map and a quick zip buy six boxes then mix them with a fax a busy zoo with a box and a zebra to",
      ],
      difficulty: 3, mastery: { wpm: 30, accuracy: 90 }
    }),
    mk({
      id: 's3-11', stage: 3,
      title: 'Bottom Row Sentences',
      objective: 'Real sentences using bottom-row letters. The whole alphabet is available now, so let the words flow.',
      keys: [], newKeys: [],
      passages: [
        "mix the box then fix it then zip the box a box and a map and a zip then fix it a small box and a big zip then we mix it buy six boxes then fix them then mix them a zebra in a zoo with a box and a map a zebra in a zoo with a box and a map mix the box then zip it then fix it too a zebra in a zoo with a",
        "box and a map a small box and a big map then mix it a small box and a big zip then we mix it we can fix the box then mix it then zip it buy a box and mix it with a big fax fix the box then mix it then fax the box come go stay with a box and a map too we can move the box then fix it then zip it mix the box then fix it then zip the box the",
        "zoo is a busy place so bring a big box mix the box then zip it box it and fix it come go stay then mix the box then fix it a big zoo we can mix the map then zip it the comic book was fun bring me six more a small box and a big zip then we mix it the comic book was fun with a box and a zip a big box then a small box then mix them the comic book was fun with a box and a zip",
        "mix the box then fix it then zip the box we can not move but we can fix a small map the comic book was fun bring me six more we can mix and fix the box then zip it a big box and a small map then we mix it a small box and a big map then mix it we can mix the map then zip it box it and fix it too the comic book was fun with a box and a zip",
        "come and go and stay with a big box fix six boxes then mix them then fax them we can move the box then fix it then zip it zip the box then fix it then mix it well the box is over the zoo with a map too a zebra and a zoo and a box then mix them come go stay then mix the box then fix it we can not move the box but we can fix it mix six boxes then fix them then fax them a box and a map then we",
      ],
      difficulty: 4, mastery: { wpm: 36, accuracy: 90 }
    }),
    mk({
      id: 's3-12', stage: 3,
      title: 'Three Row Passage',
      objective: 'A longer paragraph across all three rows. Notice the moments your hands stop moving while you think about the next word.',
      keys: [], newKeys: [],
      passages: [
        "a busy zoo with a box and a zebra too mix the box then zip it box it and fix it fix the box then mix it then fax it well come go stay and do not complain about the mess come go stay with a box and a map too mix the box then fix it then box it again we can not move the box but we can fix it a zebra and",
        "a zoo and a box then mix them zip the box then fix it then mix it well we can fix the box then mix it then zip it a big box and a small map then we mix it come go stay then mix the box then fix it a box and a map and a zip then fix it a big box and a small map then we mix it a box and a map then we mix them well fix six boxes then mix them then fax them come and go and stay with a big box a sma",
      ],
      difficulty: 4, mastery: { wpm: 40, accuracy: 89 }
    })
  ];

  /* =======================================================================
     STAGE 4 — COMPLETE ALPHABET (capitals, numbers, punctuation)
     ======================================================================= */
  var STAGE4 = [
    mk({
      id: 's4-01', stage: 4,
      title: 'The Whole Alphabet',
      objective: 'Every letter in order, then the pangrams that use all of them. The last mechanical drill before real writing.',
      keys: [], newKeys: [],
      passages: [
        "Version two point one was released in nineteen ninety eight. I think it is worth a little more practice. Promising safer streets for cyclists and more space for local shops. Type one line at a time reading the next line. A short structured course avoids all of that. That is not a sign that something",
        "is wrong with your progress. The keyboard has become a place your hands already know well. Keep your eyes on the text. That takes minutes not hours and works best when done daily. Then a little faster for a month. Accuracy comes before speed. Early on you cannot trust your hands. They build habits that are fast but uneven over many years.",
        "The sun is warm today and the sky is blue. When a key slips fix it immediately and carry on. Then a little faster for a month. I did he said with a nod and a smile on his face. Keep your fingers curved your wrists still. She read the letter twice then folded it away carefully. That takes minutes not hours and works best when done daily. It works best when you stop while you",
        "are still doing well. You will type slowly for a week or two. The keyboard has become a place your hands already know. This trains looking further ahead than your hands can manage. They build habits that are fast but uneven. It works best when you stop while you are still doing well. Someone had left a light on above the printer in the hall. The fingers learn the right key first",
      ],
      difficulty: 3, mastery: { wpm: 40, accuracy: 92 }
    }),
    mk({
      id: 's4-02', stage: 4,
      title: 'Common Letter Pairs',
      objective: 'The most frequent two-letter groups in English. Treating them as units is what makes typing fast rather than careful.',
      keys: [], newKeys: [],
      passages: [
        "It was not bad news exactly it was simply old news delivered late. The increase was smaller than analysts had expected last year. That is the feeling of a skill being built. The keyboard has become a place your hands already know. They are told to look at the screen. Call between nine o clock and seventeen",
        "thirty hours please. One afternoon you will realise you have stopped looking down. An uncorrected one costs your flow. Type one line at a time reading the next line. The office was quiet at that hour and the street was still. It is about removing the reason you had to look. The keyboard has become a place your hands already know. The keyboard",
        "has become a place your hands already know well. We walked to the park and sat on the grass. A corrected mistake costs one key. You will type slowly for a week or two. I did he said with a nod and a smile on his face. Send any corrections by Thursday afternoon to the office please. Thanks Priya for your help with the report and the figures. The increase was smaller than analysts",
        "had expected last year. The bill came to forty eight dollars including eight percent tax. There is no trick to touch typing and no substitute for practice. He found his keys under the mat by the door. It is about repeating a movement clearly. It is the feeling of a skill being built and it fades with time. My sister works near the large city hospital. The words f",
      ],
      difficulty: 4, mastery: { wpm: 45, accuracy: 92 }
    }),
    mk({
      id: 's4-03', stage: 4,
      title: 'The Commonest Words',
      objective: 'The words that make up a large share of ordinary written English. Type them from memory as far as you can, then check.',
      keys: [], newKeys: [],
      passages: [
        "The morning light came slowly through the kitchen window. Every Friday evening she reads a novel by the window quietly. The bill came to forty eight dollars including eight percent tax. Call between nine o clock and seventeen thirty hours please. Rain began softly and the sound of it made the room feel",
        "calm. Speed follows. Then a little faster for a month. A good typing practice session is not about pressing hard. Figures published on Tuesday showed that rail use had risen. Dear Sam thank you for the book you lent me recently. The teacher asked the class to read quietly. I did he said with a nod and a smile on his face. In March the garden",
        "in Bristol is at its best with flowers. Typing well is mostly a matter of trust. An uncorrected one costs your flow. There is no substitute for it either. The fingers learn the right key first. The keyboard has become a place your hands already know. Someone had left a light on above the printer in the hall. Accuracy comes before speed. Send any corrections by Thursday afternoon",
        "to the office please. He found his keys under the mat by the door. Type one line at a time reading the next line. It is about repeating a movement clearly until it is automatic. It is about repeating a movement clearly. Type one line at a time reading the next line. Home he said back before nine o clock tonight please. She read the letter twice then folded it away car",
      ],
      difficulty: 4, mastery: { wpm: 50, accuracy: 92 }
    }),
    mk({
      id: 's4-04', stage: 4,
      title: 'Longer Words',
      objective: 'Multi-syllable words built from the same patterns. Say the word quietly to yourself as you type it.',
      keys: [], newKeys: [],
      passages: [
        "That is the feeling of a skill being built. The keyboard has become a place your hands already know. They build habits that are fast but uneven. It fades. Typing is a skill that grows with steady practice. You will type slowly for a week or two then faster for a month. The city council approved a new",
        "cycle route after public debate. There is no substitute for it either. Typing well is mostly a matter of trust. It works best when you stop while you are still doing well. You will type slowly for a week or two then faster for a month. Do you know where the best coffee shop is? Speed follows. You look down to check every letter. Most people learn to",
        "type by accident. There is no trick to touch typing. Most people learn to type by accident without being taught properly. Someone had left a light on above the printer in the hall. Please review the figures on page four and send corrections. Once the movement is familiar the eyes can stay on the words. They will come back soon with the news from town. I think it is worth a little more practice",
      ],
      difficulty: 4, mastery: { wpm: 48, accuracy: 91 }
    }),
    mk({
      id: 's4-05', stage: 4,
      title: 'Prefixes and Suffixes',
      objective: 'Word building blocks: un-, re-, pre-, mis-, and -ly, -ing, -ness. Learn a block once and it appears in hundreds of words.',
      keys: [], newKeys: [],
      passages: [
        "You will type slowly for a week or two. Dear Sam thank you for the book you lent me recently. A good typing practice session is not about pressing hard keys. All right she replied and closed the door behind her quietly. Your hands stop thinking about it. She read the letter twice then folded it away",
        "carefully. A corrected mistake costs one key. Beginners are told to look at the keyboard. Dear Sam thank you for the book you lent me recently. The training is not really about moving faster. They build habits that are fast but uneven over many years. You will type slowly for a week or two. The keyboard has become a place your hands already",
        "know well. Measure the room four point five metres by three point two metres. They build habits that are fast but uneven. It works best when you stop while you are still doing well. Everything after that is deciding how fast you want to go. Keep your fingers curved your wrists still. When the letter finally arrived nobody could remember who wrote it. We walked to the park",
        "and sat on the grass. Slow down then let the rhythm return. Every Friday evening she reads a novel by the window quietly. It is about repeating a movement clearly until it is automatic. Speed arrives when accuracy is calm. There is no substitute for it either. Promising safer streets for cyclists and more space for local shops. Then a little",
        "faster for a month. Speed follows. Beginners are told to look at the keyboard. A small dog ran across the grass and barked loudly. Call between nine o clock and seventeen thirty hours please. A good typing practice session is not about pressing hard. They are told to look at the screen. A good typing practice session is not about pressing hard. We walked to the park and sat on the gra",
      ],
      difficulty: 4, mastery: { wpm: 48, accuracy: 91 }
    }),
    mk({
      id: 's4-06', stage: 4,
      title: 'Capital Letters',
      objective: 'Hold the opposite Shift key whenever you need a capital: the left Shift for most letters, the right Shift for Q and P. Use the hand that is not typing the letter.',
      keys: [], newKeys: ['Shift'],
      passages: [
        "They build habits that are fast but uneven over many years. The morning light came slowly through the kitchen window. The morning light came slowly through the kitchen window. Then one afternoon without noticing you will stop looking down. She opened the window and let the fresh air in. Thanks Priya",
        "for your help with the report and the figures. When a key slips fix it immediately and carry on. She opened the window and let the fresh air in. Beginners are told to look at the keyboard and at the screen. The fingers learn the right key first. Hi team the report is attached to this email for review. Home he said back before nine o clock",
        "tonight please. Typing well is mostly a matter of trust. Where are you going she asked with a smile on her face. A short structured course avoids all of that. That takes minutes not hours. Everything after that is simply deciding how fast you want to go. Send any corrections by Thursday afternoon to the office please. I will return it next week with my thanks and best wishes.",
        "Most people learn to type by accident without being taught properly. You will type slowly for a week or two. Keep your fingers curved your wrists still. That is not a sign that something is wrong with your progress. There is no substitute for it either. Measure the room four point five metres by three point two metres. There is no trick to touch typing and no substitute for pr",
      ],
      difficulty: 4, mastery: { wpm: 45, accuracy: 90 }
    }),
    mk({
      id: 's4-07', stage: 4,
      title: 'Mixed Case Sentences',
      objective: 'Capitals where English actually puts them: the first word, names, days and the pronoun I.',
      keys: [], newKeys: [],
      passages: [
        "Please review the figures on page four and send corrections. A good typing practice session is not about pressing hard. Type one line at a time reading the next line. Accuracy comes before speed. In March the garden in Bristol is at its best with flowers. That is the feeling of a skill being built. Our",
        "flight leaves at zero six forty five on the third of May. She had never seen a sky quite that colour before. Our flight leaves at zero six forty five on the third of May. The sun is warm today and the sky is blue. Where are you going she asked with a smile on her face. Every great journey begins with one small step. Good then we can start",
        "the work right away together now. All right she replied and closed the door behind her quietly. The fingers learn the right key first. Your hands stop thinking about it. She had never seen a sky quite that colour before. The keyboard has become a place your hands already know well. She had never seen a sky quite that colour before. Hi team the report is attached to this email",
        "for review. You look down to check every letter. Dear Sam thank you for the book you lent me recently. Our flight leaves at zero six forty five on the third of May. A small dog ran across the grass and barked loudly. Everything after that is simply deciding how fast you want to go. We walked to the park and sat on the grass. They will come",
        "back soon with the news from town. That is not a sign that something is wrong with your progress. Good then we can start the work right away together now. Speed arrives when accuracy is calm. Call between nine o clock and seventeen thirty hours please. He found his keys under the mat by the door. Promising safer streets for cyclists and more space for local shops. There is no trick",
      ],
      difficulty: 4, mastery: { wpm: 45, accuracy: 90 }
    }),
    mk({
      id: 's4-08', stage: 4,
      title: 'Quotes and Punctuation',
      objective: 'The marks that punctuate ordinary speech. Shift gives you the double quote; the apostrophe sits beside the semicolon key.',
      keys: [], newKeys: [],
      passages: [
        "All right she replied and closed the door behind her quietly. Call between nine o clock and seventeen thirty hours please. It works best when you stop while you are still doing well. That is the feeling of a skill being built. Slow down then let the rhythm return. The checking is what makes you slow.",
        "Call between nine o clock and seventeen thirty hours please. She read the letter twice then folded it away carefully. A good typing practice session is not about pressing hard keys. Call between nine o clock and seventeen thirty hours please. It was not bad news exactly it was simply old news delivered late. It works best when you stop",
        "while you are still doing well. The keyboard has become a place your hands already know. The fingers learn the right key first. Speed follows. It is about repeating a movement clearly. She had never seen a sky quite that colour before. Someone had left a light on above the printer in the hall. Dear Sam thank you for the book you lent me recently. The words flow and the speed",
        "arrives on its own. Thanks Priya for your help with the report and the figures. A good typing practice session is not about pressing hard. It is about repeating a movement clearly. Measure the room four point five metres by three point two metres. Did you bring the keys with you to the door this morning. It was not bad news exactly it was",
        "simply old news delivered late. Typing well is mostly a matter of trust. Someone had left a light on above the printer in the hall. Outside the market opened as usual and nobody on the street knew. A short structured course avoids all of that. The same two keys give them trouble for years without practice. The city council approved a new cycle route after public debate. Speed follows. A s",
      ],
      difficulty: 5, mastery: { wpm: 42, accuracy: 89 }
    }),
    mk({
      id: 's4-09', stage: 4,
      title: 'Numbers',
      objective: 'The number row sits under your middle fingers. Learn where the symbols live too, so you are not hunting for them later.',
      keys: [], newKeys: ['0-9'],
      passages: [
        "In March the garden in Bristol is at its best with flowers. They are told to look at the screen. Everything after that is simply deciding how fast you want to go. Home he said back before nine o clock tonight please. You will type slowly for a week or two. Dear Sam thank you for the book you lent me",
        "recently. Early on you cannot trust your hands. Call between nine o clock and seventeen thirty hours please. Someone had left a light on above the printer in the hall. They build habits that are fast but uneven. A small dog ran across the grass and barked loudly. Measure the room four point five metres by three point two metres. Typing",
        "well is mostly a matter of trust. A good typing practice session is not about pressing hard. The same two keys give them trouble for years without practice. A good typing practice session is not about pressing hard. The checking is what makes you slow. Keep your fingers curved your wrists still. A small dog ran across the grass and barked loudly. I think it is worth a little",
        "more practice. A small dog ran across the grass and barked loudly. The same two keys give them trouble for years without practice. Everything after that is deciding how fast you want to go. Promising safer streets for cyclists and more space for local shops. Every great journey begins with one small step. Did you bring the keys with you to",
        "the door this morning. In March the garden in Bristol is at its best with flowers. A useful way to practise is to divide text into lines. We walked to the park and sat on the grass. It is about repeating a movement clearly until it is automatic. You look down to check every letter. Once the movement is familiar the eyes can stay on the words. Speed arrives when accuracy is calm. The keybo",
      ],
      difficulty: 5, mastery: { wpm: 40, accuracy: 89 }
    }),
    mk({
      id: 's4-10', stage: 4,
      title: 'Common Words · Speed Drill',
      objective: 'Short common words at a slightly faster pace. A small accuracy dip is normal, but do not let it run away.',
      keys: [], newKeys: [],
      passages: [
        "When the letter finally arrived nobody could remember who wrote it. Speed arrives when accuracy is calm. It was not bad news exactly it was simply old news delivered late. You will type slowly for a week or two then faster for a month. The morning light came slowly through the kitchen window. One afternoon",
        "you will realise you have stopped looking down. They will come back soon with the news from town. All right she replied and closed the door behind her quietly. The city council approved a new cycle route after public debate. That is the feeling of a skill being built. They are told to look at the screen. They are rarely told that the first hours are",
        "mostly uncomfortable. Typing is a skill that grows with steady practice. The fingers learn the right key first and speed follows after. A short structured course avoids all of that trouble completely. Speed follows. Our flight leaves at zero six forty five on the third of May. There is no trick to touch typing. I did he said with a nod and a smile on his face. Beginners are told to look",
      ],
      difficulty: 5, mastery: { wpm: 60, accuracy: 90 }
    }),
    mk({
      id: 's4-11', stage: 4,
      title: 'Full Keyboard Flow',
      objective: 'Dense text with capitals and punctuation. Let the fingers move while your eyes read a full line ahead.',
      keys: [], newKeys: [],
      passages: [
        "She opened the window and let the fresh air in. They are rarely told that the first hours are mostly uncomfortable. When a key slips fix it immediately and carry on. Keep your eyes on the text. Version two point one was released in nineteen ninety eight. My sister works near the large city hospital.",
        "He found his keys under the mat by the door. I will return it next week with my thanks and best wishes. We walked to the park and sat on the grass. In March the garden in Bristol is at its best with flowers. It works best when you stop while you are still doing well. It is about repeating a movement clearly. The increase was smaller than analysts had expected last year. It is about repeating a mo",
      ],
      difficulty: 5, mastery: { wpm: 55, accuracy: 90 }
    }),
    mk({
      id: 's4-12', stage: 4,
      title: 'Review and Consolidate',
      objective: 'A calm passage reviewing everything so far. Aim for a clean run without rushed corrections.',
      keys: [], newKeys: [],
      passages: [
        "The keyboard has become a place your hands already know. That takes minutes not hours. They build habits that are fast but uneven over many years. That is not a sign that something is wrong with your progress. They build habits that are fast but uneven. Where are you going she asked with a smile on her",
        "face. It works best when you stop while you are still doing well. Promising safer streets for cyclists and more space for local shops. I did he said with a nod and a smile on his face. The city council approved a new cycle route after public debate. Promising safer streets for cyclists and more space for local shops. The bill came to forty eight dollars",
        "including eight percent tax. They will come back soon with the news from town. We walked to the park and sat on the grass. A good typing practice session is not about pressing hard keys. A short structured course avoids all of that. Please review the figures on page four and send corrections. The words flow and the speed arrives on its own. All right she replied and closed the door behin",
      ],
      difficulty: 5, mastery: { wpm: 50, accuracy: 91 }
    })
  ];

  /* =======================================================================
     STAGE 5 — WORDS AND SENTENCE PRACTICE
     ======================================================================= */
  var STAGE5 = [
    mk({
      id: 's5-01', stage: 5,
      title: 'Short Everyday Sentences',
      objective: 'Plain sentences of the kind you meet in an ordinary day. Keep the pace relaxed and watch the commas and full stops.',
      keys: [], newKeys: [],
      passages: [
        "Your hands stop thinking about it. It is about removing the reason you had to look. Do you know where the best coffee shop is? An uncorrected one costs your flow. Beginners are told to look at the keyboard. That takes minutes not hours. There is no trick to touch typing. A short structured course avoids",
        "all of that trouble completely. The keyboard has become a place your hands already know. They are rarely told that the first hours are mostly uncomfortable. Good then we can start the work right away together now. The keyboard has become a place your hands already know well. Typing is a skill that grows with steady practice. They will come",
        "back soon with the news from town. It is about repeating a movement clearly until it is automatic. They build habits that are fast but uneven. It works best when you stop while you are still doing well. Dear Sam thank you for the book you lent me recently. She opened the window and let the fresh air in. Typing well is mostly a matter of trust. An uncorrected one costs your",
        "flow. It is about removing the reason you had to look. That takes minutes not hours and works best when done daily. The same two keys give them trouble for years without practice. Version two point one was released in nineteen ninety eight. Outside the market opened as usual and nobody on the street knew. A short",
        "structured course avoids all of that trouble completely. When the letter finally arrived nobody could remember who wrote it. When the letter finally arrived nobody could remember who wrote it. Speed follows. The morning light came slowly through the kitchen window. They will come back soon with the news from town. They are rarely told that the first hours are mostly uncomfortable.",
        "He found his keys under the mat by the door. Where are you going she asked with a smile on her face. That is the feeling of a skill being built. The words flow and the speed arrives on its own. Hi team the report is attached to this email for review. It is about repeating a movement clearly. A good typing practice session is not about pressing hard keys. A good typing practic",
      ],
      difficulty: 4, mastery: { wpm: 40, accuracy: 94 }
    }),
    mk({
      id: 's5-02', stage: 5,
      title: 'Everyday Vocabulary',
      objective: 'Objects you can picture. Naming the item as you type it speeds up the whole word.',
      keys: [], newKeys: [],
      passages: [
        "An uncorrected one costs your flow. A good typing practice session is not about pressing hard keys. Version two point one was released in nineteen ninety eight. He found his keys under the mat by the door. Someone had left a light on above the printer in the hall. If you keep a small list of the words",
        "you miss most. It works best when you stop while you are still doing well. There is no trick to touch typing and no substitute for practice. The bill came to forty eight dollars including eight percent tax. Typing is a skill that grows with steady practice. Call between nine o clock and seventeen thirty hours please. The fingers learn the right key",
        "first. A short structured course avoids all of that. You look down to check every letter. That takes minutes not hours and works best when done daily. Most people learn to type by accident. It works best when you stop while you are still doing well. There is no trick to touch typing. Where are you going she asked with a smile on her face. They are rarely told that the first hours are mostly un",
      ],
      difficulty: 4, mastery: { wpm: 42, accuracy: 94 }
    }),
    mk({
      id: 's5-03', stage: 5,
      title: 'Frequent Letter Patterns',
      objective: 'Words that share the same interior letters, so your hands settle into a pattern instead of deciding every key again.',
      keys: [], newKeys: [],
      passages: [
        "Typing is a skill that grows with steady practice. A corrected mistake costs one key. A good typing practice session is not about pressing hard. Dear Sam thank you for the book you lent me recently. I did he said with a nod and a smile on his face. Keep your eyes on the text. Hi team the report is attached",
        "to this email for review. They are rarely told that the first hours are mostly uncomfortable. It is about repeating a movement clearly. There is no trick to touch typing. The office was quiet at that hour and the street was still. Typing is a skill that grows with steady practice. You will type slowly for a week or two then faster for a month. The training",
        "is not really about moving faster. It works best when you stop while you are still doing well. An uncorrected one costs your flow. It is about repeating a movement clearly until it is automatic. The morning light came slowly through the kitchen window. It fades. There is no trick to touch typing. Version two point one was released in nineteen ninety eight. A corrected mistake cost",
      ],
      difficulty: 4, mastery: { wpm: 50, accuracy: 94 }
    }),
    mk({
      id: 's5-04', stage: 5,
      title: 'Longer Sentences',
      objective: 'Full sentences with clauses. Read the whole line first and then type; your hands will find most of it without you.',
      keys: [], newKeys: [],
      passages: [
        "The checking is what makes you slow. Every great journey begins with one small step. There is no trick to touch typing and no substitute for practice. They are rarely told that the first hours are mostly uncomfortable. It is about repeating a movement clearly. The increase was smaller than analysts had",
        "expected last year. I will return it next week with my thanks and best wishes. Do you know where the best coffee shop is? When the letter finally arrived nobody could remember who wrote it. She had never seen a sky quite that colour before. She opened the window and let the fresh air in. He found his keys under the mat by the door. Outside",
        "the market opened as usual and nobody on the street knew. Once the movement is familiar the eyes can stay on the words. There is no trick to touch typing and no substitute for practice. A corrected mistake costs one key. The sun is warm today and the sky is blue. The words flow and the speed arrives on its own. Measure the room four point five metres by three point two metres.",
        "A short structured course avoids all of that. One afternoon you will realise you have stopped looking down. Thanks Priya for your help with the report and the figures. Your hands stop thinking about it. Your hands stop thinking about it. The teacher asked the class to read quietly. One afternoon you will realise you have stopped looking down. The office was quiet at that",
      ],
      difficulty: 5, mastery: { wpm: 45, accuracy: 93 }
    }),
    mk({
      id: 's5-05', stage: 5,
      title: 'Paragraphs With Punctuation',
      objective: 'Multi-sentence paragraphs with commas, semicolons and full stops. Breathe at the punctuation without stopping entirely.',
      keys: [], newKeys: [],
      passages: [
        "Every great journey begins with one small step. Thanks Priya for your help with the report and the figures. The office was quiet at that hour and the street was still. A corrected mistake costs one key. The sun is warm today and the sky is blue. We walked to the park and sat on the grass. Keep your eyes",
        "on the text. The training is not really about moving faster. When a key slips fix it immediately and carry on. Did you bring the keys with you to the door this morning. One afternoon you will realise you have stopped looking down. Promising safer streets for cyclists and more space for local shops. A short structured course avoids all of that. All right she replied and closed the door behind",
      ],
      difficulty: 5, mastery: { wpm: 45, accuracy: 92 }
    }),
    mk({
      id: 's5-06', stage: 5,
      title: 'Capitalisation Practice',
      objective: 'Lowercase sentences that need capitals: the first word, names, days, months and I.',
      keys: [], newKeys: [],
      passages: [
        "You will type slowly for a week or two then faster for a month. Rain began softly and the sound of it made the room feel calm. I finished it on the train home and enjoyed it very much. We walked to the park and sat on the grass. Every Friday evening she reads a novel by the window quietly. The words",
        "flow and the speed arrives on its own. Every Friday evening she reads a novel by the window quietly. This trains looking further ahead than your hands can manage. The sun is warm today and the sky is blue. A good typing practice session is not about pressing hard keys. A good typing practice session is not about pressing hard. A useful",
        "way to practise is to divide text into lines. Then a little faster for a month. I did he said with a nod and a smile on his face. A small dog ran across the grass and barked loudly. Slow down then let the rhythm return. She read the letter twice then folded it away carefully. That takes minutes not hours and works best when done daily. Call between nine o clock and seventeen",
        "thirty hours please. That is not a sign that something is wrong with your progress. Most people learn to type by accident. It works best when you stop while you are still doing well. Early on you cannot trust your hands. Typing well is mostly a matter of trust. Early on you cannot trust your hands. I think it is worth a little more practice.",
        "Where are you going she asked with a smile on her face. The checking is what makes you slow. He found his keys under the mat by the door. I finished it on the train home and enjoyed it very much. Dear Sam thank you for the book you lent me recently. Accuracy comes before speed. Where are you going she asked with a smile on her face. It is about removing the reason you had to look. Early",
      ],
      difficulty: 5, mastery: { wpm: 45, accuracy: 92 }
    }),
    mk({
      id: 's5-07', stage: 5,
      title: 'Numbers and Symbols',
      objective: 'Prices, times and measurements. Shift for the symbols and keep the rhythm of the digits steady.',
      keys: [], newKeys: [],
      passages: [
        "The same two keys give them trouble for years without practice. It works best when you stop while you are still doing well. Then a little faster for a month. Speed follows. Hi team the report is attached to this email for review. Please review the figures on page four and send corrections. Outside the",
        "market opened as usual and nobody on the street knew. Slow down then let the rhythm return. A useful way to practise is to divide text into lines. Early on you cannot trust your hands. Slow down then let the rhythm return. The sun is warm today and the sky is blue. Do you know where the best coffee shop is? A good typing practice session",
        "is not about pressing hard. The morning light came slowly through the kitchen window. Speed arrives when accuracy is calm. Type one line at a time reading the next line. The morning light came slowly through the kitchen window. Beginners are told to look at the keyboard. It works best when you stop while you are still doing well. Everything after that is simply deciding how",
        "fast you want to go. Do you know where the best coffee shop is? Good then we can start the work right away together now. Slow down then let the rhythm return. Then a little faster for a month. Typing is a skill that grows with steady practice. The city council approved a new cycle route after public debate. Measure the room four point five",
        "metres by three point two metres. There is no trick to touch typing and no substitute for practice. Then a little faster for a month. The keyboard has become a place your hands already know well. Early on you cannot trust your hands. This trains looking further ahead than your hands can manage. The bill came to forty eight dollars including eight percent tax. The same two keys give the",
      ],
      difficulty: 5, mastery: { wpm: 40, accuracy: 90 }
    }),
    mk({
      id: 's5-08', stage: 5,
      title: 'Dialogue',
      objective: 'Conversation with quotation marks and a new line for each speaker. Keep the Shift presses tidy.',
      keys: [], newKeys: [],
      passages: [
        "There is no trick to touch typing. All right she replied and closed the door behind her quietly. It is the feeling of a skill being built and it fades with time. If you keep a small list of the words you miss most. There is no substitute for it either. They are told to look at the screen. My sister works",
        "near the large city hospital. The increase was smaller than analysts had expected last year. Then a little faster for a month. Most people learn to type by accident. The words flow and the speed arrives on its own. Send any corrections by Thursday afternoon to the office please. Did you bring the keys with you to the door this morning. Your hands stop thinking about it. She had never seen a",
      ],
      difficulty: 5, mastery: { wpm: 42, accuracy: 90 }
    }),
    mk({
      id: 's5-09', stage: 5,
      title: 'Letters and Email',
      objective: 'Practical business writing: greetings, short paragraphs, sign-offs and single line breaks.',
      keys: [], newKeys: [],
      passages: [
        "A short structured course avoids all of that. We walked to the park and sat on the grass. The bill came to forty eight dollars including eight percent tax. Send any corrections by Thursday afternoon to the office please. A small dog ran across the grass and barked loudly. Early on you cannot trust your",
        "hands. The teacher asked the class to read quietly. A good typing practice session is not about pressing hard keys. I think it is worth a little more practice. The first few hours are mostly uncomfortable. Do you know where the best coffee shop is? It is about removing the reason you had to look. Then a little faster for a month. It is about repeating a movement clearly until it is automatic.",
      ],
      difficulty: 5, mastery: { wpm: 45, accuracy: 92 }
    }),
    mk({
      id: 's5-10', stage: 5,
      title: 'News and Reports',
      objective: 'Formal reporting style with long clauses and semicolons. The sentences are long, so keep your eyes two lines ahead.',
      keys: [], newKeys: [],
      passages: [
        "Accuracy comes before speed. They build habits that are fast but uneven. They build habits that are fast but uneven. My sister works near the large city hospital. Measure the room four point five metres by three point two metres. I did he said with a nod and a smile on his face. It fades. Then one afternoon",
        "without noticing you will stop looking down. Speed follows. Every Friday evening she reads a novel by the window quietly. The keyboard has become a place your hands already know well. The first few hours are mostly uncomfortable. Do you know where the best coffee shop is? It works best when you stop while you are still doing well. When the letter finally arrived nobody could remember who",
      ],
      difficulty: 5, mastery: { wpm: 48, accuracy: 91 }
    }),
    mk({
      id: 's5-11', stage: 5,
      title: 'Mixed Difficulty Passages',
      objective: 'Long words, commas, full stops and quotes in the same block. This is close to everyday writing.',
      keys: [], newKeys: [],
      passages: [
        "Once the movement is familiar the eyes can stay on the words. Outside the market opened as usual and nobody on the street knew. It fades. The fingers learn the right key first. Promising safer streets for cyclists and more space for local shops. There is no trick to touch typing and no substitute for",
        "practice. The fingers learn the right key first and speed follows after. It is the feeling of a skill being built and it fades with time. Everything after that is simply deciding how fast you want to go. Thanks Priya for your help with the report and the figures. A short structured course avoids all of that trouble completely. I will return it next",
        "week with my thanks and best wishes. Type one line at a time reading the next line. They will come back soon with the news from town. The office was quiet at that hour and the street was still. Typing is a skill that grows with steady practice. The increase was smaller than analysts had expected last year. You look down to check every letter. Promising safer streets for cyclists and more space",
      ],
      difficulty: 5, mastery: { wpm: 50, accuracy: 91 }
    }),
    mk({
      id: 's5-12', stage: 5,
      title: 'Natural Prose',
      objective: 'Reading-length passages with no unusual characters. Stay relaxed: accuracy is the goal in this stage.',
      keys: [], newKeys: [],
      passages: [
        "Do you know where the best coffee shop is? One afternoon you will realise you have stopped looking down. You look down to check every letter. She had never seen a sky quite that colour before. Everything after that is deciding how fast you want to go. Rain began softly and the sound of it made the room",
        "feel calm. A short structured course avoids all of that trouble completely. Typing well is mostly a matter of trust. Speed arrives when accuracy is calm. Beginners are told to look at the keyboard and at the screen. Send any corrections by Thursday afternoon to the office please. You look down to check every letter. Promising safer streets for cyclists and more space for local shops. The morni",
      ],
      difficulty: 5, mastery: { wpm: 50, accuracy: 93 }
    })
  ];

  /* =======================================================================
     STAGE 6 — SPEED AND ACCURACY TRAINING
     ======================================================================= */
  var STAGE6 = [
    mk({
      id: 's6-01', stage: 6,
      title: 'Accuracy Before Speed',
      objective: 'Return to the home row at a deliberate pace. Every key must land first time; speed is a by-product of clean movement.',
      keys: [], newKeys: [],
      passages: [
        "Everything after that is simply deciding how fast you want to go. Typing is a skill that grows with steady practice. Did you bring the keys with you to the door this morning. Please review the figures on page four and send corrections. The office was quiet at that hour and the street was still. When",
        "a key slips fix it immediately and carry on. A good typing practice session is not about pressing hard. Once the movement is familiar the eyes can stay on the words. The fingers learn the right key first and speed follows after. It was not bad news exactly it was simply old news delivered late. All right she replied and closed the door",
        "behind her quietly. Everything after that is deciding how fast you want to go. We walked to the park and sat on the grass. If you keep a small list of the words you miss most. Rain began softly and the sound of it made the room feel calm. Type one line at a time reading the next line. The keyboard has become a place your hands already know well. A good typing practice session",
        "is not about pressing hard. Thanks Priya for your help with the report and the figures. Slow down then let the rhythm return. The words flow and the speed arrives on its own. Beginners are told to look at the keyboard. They are rarely told that the first hours are mostly uncomfortable. The words flow and the speed arrives on its own. You look down to check every letter. Good then",
      ],
      difficulty: 3, mastery: { wpm: 35, accuracy: 97 }
    }),
    mk({
      id: 's6-02', stage: 6,
      title: 'Finding Your Rhythm',
      objective: 'Repeat a pattern at a constant speed. Constant, not maximum: the aim is an even movement your hands can trust.',
      keys: [], newKeys: [],
      passages: [
        "A good typing practice session is not about pressing hard keys. A small dog ran across the grass and barked loudly. It works best when you stop while you are still doing well. The teacher asked the class to read quietly. Did you bring the keys with you to the door this morning. A short structured course",
        "avoids all of that trouble completely. Good then we can start the work right away together now. Keep your fingers curved your wrists still. Once the movement is familiar the eyes can stay on the words. Please review the figures on page four and send corrections. Every Friday evening she reads a novel by the window quietly. Good then we",
        "can start the work right away together now. Type one line at a time reading the next line. Once the movement is familiar the eyes can stay on the words. Type one line at a time reading the next line. A useful way to practise is to divide text into lines. The keyboard has become a place your hands already know well. She opened the window and let the fresh air in. Someone had",
        "left a light on above the printer in the hall. A useful way to practise is to divide text into lines. Most people learn to type by accident without being taught properly. Beginners are told to look at the keyboard and at the screen. Call between nine o clock and seventeen thirty hours please. I did he said with a nod and a smile on his face. Figures published on Tuesday showed",
      ],
      difficulty: 4, mastery: { wpm: 40, accuracy: 96 }
    }),
    mk({
      id: 's6-03', stage: 6,
      title: 'Short Words, Quick Hands',
      objective: 'Very short words in bursts. Let your hands move continuously; small words should cost almost no time.',
      keys: [], newKeys: [],
      passages: [
        "Promising safer streets for cyclists and more space for local shops. Speed follows. Everything after that is simply deciding how fast you want to go. The increase was smaller than analysts had expected last year. The same two keys give them trouble for years without practice. The morning light came slowly",
        "through the kitchen window. I did he said with a nod and a smile on his face. A corrected mistake costs one key. Thanks Priya for your help with the report and the figures. The keyboard has become a place your hands already know well. She had never seen a sky quite that colour before. I think it is worth a little more practice. Most people learn to",
        "type by accident. A useful way to practise is to divide text into lines. This trains looking further ahead than your hands can manage. The words flow and the speed arrives on its own. The morning light came slowly through the kitchen window. You look down to check every letter. Please review the figures on page four and send corrections. They will come back soon with the news from town. Th",
      ],
      difficulty: 4, mastery: { wpm: 60, accuracy: 95 }
    }),
    mk({
      id: 's6-04', stage: 6,
      title: 'Weak Finger Drills',
      objective: 'Short repeated groups for the fingers that strain most: the index, middle and little fingers under load.',
      keys: [], newKeys: [],
      passages: [
        "Dear Sam thank you for the book you lent me recently. Early on you cannot trust your hands. This trains looking further ahead than your hands can manage. You look down to check every letter. It fades. Typing is a skill that grows with steady practice. Type one line at a time reading the next line. Speed",
        "follows. My sister works near the large city hospital. A useful way to practise is to divide text into lines. That is the feeling of a skill being built. Then a little faster for a month. It works best when you stop while you are still doing well. I did he said with a nod and a smile on his face. Typing is a skill that grows with steady",
        "practice. Once the movement is familiar the eyes can stay on the words. You look down to check every letter. Most people learn to type by accident. When the letter finally arrived nobody could remember who wrote it. They are told to look at the screen. Did you bring the keys with you to the door this morning. The training is not really about moving faster. The keyboard has",
        "become a place your hands already know. The teacher asked the class to read quietly. The first few hours are mostly uncomfortable. A small dog ran across the grass and barked loudly. The same two keys give them trouble for years without practice. I think it is worth a little more practice. You will type slowly for a week or two then faster for a month. When a key slips fix it i",
      ],
      difficulty: 4, mastery: { wpm: 45, accuracy: 96 }
    }),
    mk({
      id: 's6-05', stage: 6,
      title: 'Home Row Bursts',
      objective: 'Twenty seconds of pure home-row movement. Ideal as a warm-up before a timed test.',
      keys: [], newKeys: [],
      passages: [
        "Measure the room four point five metres by three point two metres. They build habits that are fast but uneven over many years. Send any corrections by Thursday afternoon to the office please. That takes minutes not hours. Outside the market opened as usual and nobody on the street knew. Promising safer",
        "streets for cyclists and more space for local shops. A useful way to practise is to divide text into lines. There is no trick to touch typing. Did you bring the keys with you to the door this morning. Your hands stop thinking about it. There is no substitute for it either. All right she replied and closed the door behind her quietly. She read the letter",
        "twice then folded it away carefully. Dear Sam thank you for the book you lent me recently. Keep your fingers curved your wrists still. It is about removing the reason you had to look. Call between nine o clock and seventeen thirty hours please. The same two keys give them trouble for years without practice. I will return it next week with my thanks and best wishes. Send any corrections b",
      ],
      difficulty: 4, mastery: { wpm: 50, accuracy: 95 }
    }),
    mk({
      id: 's6-06', stage: 6,
      title: 'Top Row Bursts',
      objective: 'The same idea on the top row, where the little fingers do most of the work.',
      keys: [], newKeys: [],
      passages: [
        "She read the letter twice then folded it away carefully. Accuracy comes before speed. Beginners are told to look at the keyboard. Rain began softly and the sound of it made the room feel calm. I will return it next week with my thanks and best wishes. The sun is warm today and the sky is blue. Someone",
        "had left a light on above the printer in the hall. Everything after that is deciding how fast you want to go. Then one afternoon without noticing you will stop looking down. They will come back soon with the news from town. A short structured course avoids all of that. The teacher asked the class to read quietly. Most people learn to type by accident.",
        "Your hands stop thinking about it. Keep your eyes on the text. The training is not really about moving faster. Speed arrives when accuracy is calm. She opened the window and let the fresh air in. She had never seen a sky quite that colour before. Type one line at a time reading the next line. A useful way to practise is to divide text into lines. When a key slips fix it immediately and carr",
      ],
      difficulty: 5, mastery: { wpm: 50, accuracy: 94 }
    }),
    mk({
      id: 's6-07', stage: 6,
      title: 'Common Words at Speed',
      objective: 'The most common words in one flowing block. Do not stop at the end of a line.',
      keys: [], newKeys: [],
      passages: [
        "A small dog ran across the grass and barked loudly. Beginners are told to look at the keyboard and at the screen. Do you know where the best coffee shop is? Figures published on Tuesday showed that rail use had risen. That takes minutes not hours and works best when done daily. Version two point one",
        "was released in nineteen ninety eight. That is not a sign that something is wrong with your progress. The sun is warm today and the sky is blue. In March the garden in Bristol is at its best with flowers. Where are you going she asked with a smile on her face. I finished it on the train home and enjoyed it very much. There is no trick to touch typing. There is no substitute for it either. It work",
      ],
      difficulty: 5, mastery: { wpm: 70, accuracy: 93 }
    }),
    mk({
      id: 's6-08', stage: 6,
      title: 'Consistency Drill',
      objective: 'Mixed easy text with no long words. Hold one pace for the whole block and judge yourself on accuracy at the end.',
      keys: [], newKeys: [],
      passages: [
        "The first few hours are mostly uncomfortable. I will return it next week with my thanks and best wishes. Version two point one was released in nineteen ninety eight. Early on you cannot trust your hands. They will come back soon with the news from town. Your hands stop thinking about it. They are rarely",
        "told that the first hours are mostly uncomfortable. The morning light came slowly through the kitchen window. The same two keys give them trouble for years without practice. The same two keys give them trouble for years without practice. Measure the room four point five metres by three point two metres. Version two point one was released in nineteen ninety eight. The teacher asked the class t",
      ],
      difficulty: 5, mastery: { wpm: 65, accuracy: 94 }
    }),
    mk({
      id: 's6-09', stage: 6,
      title: 'Timed Test Preparation',
      objective: 'A timed-length block of natural text with nothing unusual in it. Use this to warm up before a real timed run.',
      keys: [], newKeys: [],
      passages: [
        "There is no substitute for it either. The training is not really about moving faster. The same two keys give them trouble for years without practice. Your hands stop thinking about it. Our flight leaves at zero six forty five on the third of May. Everything after that is simply deciding how fast you",
        "want to go. Beginners are told to look at the keyboard. Rain began softly and the sound of it made the room feel calm. The training is not really about moving faster. Do you know where the best coffee shop is? Rain began softly and the sound of it made the room feel calm. That is not a sign that something is wrong with your progress. Home he said back before nine o clock tonight please. You will",
      ],
      difficulty: 5, mastery: { wpm: 60, accuracy: 94 }
    }),
    mk({
      id: 's6-10', stage: 6,
      title: 'Mistake Recovery',
      objective: 'Text that makes clumsy fingers slip: doubled letters, similar words and doubled consonants. Fix each mistake at once and move on.',
      keys: [], newKeys: [],
      passages: [
        "The fingers learn the right key first. The fingers learn the right key first and speed follows after. He found his keys under the mat by the door. The words flow and the speed arrives on its own. The city council approved a new cycle route after public debate. Every Friday evening she reads a novel by",
        "the window quietly. Everything after that is deciding how fast you want to go. The bill came to forty eight dollars including eight percent tax. Please review the figures on page four and send corrections. When a key slips fix it immediately and carry on. He found his keys under the mat by the door. Your hands stop thinking about it. There is no substitute",
        "for it either. The keyboard has become a place your hands already know well. When a key slips fix it immediately and carry on. Typing well is mostly a matter of trust. A good typing practice session is not about pressing hard keys. My sister works near the large city hospital. He found his keys under the mat by the door. I did he said with a nod and a smile on his face. The first few h",
      ],
      difficulty: 5, mastery: { wpm: 60, accuracy: 96 }
    })
  ];

  /* =======================================================================
     STAGE 7 — ADVANCED PRACTICE
     ======================================================================= */
  var STAGE7 = [
    mk({
      id: 's7-01', stage: 7,
      title: 'Long Paragraph',
      objective: 'An uninterrupted paragraph long enough to test your stamina. Attention fades near the end, so protect the accuracy there.',
      keys: [], newKeys: [],
      passages: [
        "Hi team the report is attached to this email for review. Measure the room four point five metres by three point two metres. Once the movement is familiar the eyes can stay on the words. Then a little faster for a month. The keyboard has become a place your hands already know well. They build habits that",
        "are fast but uneven. The increase was smaller than analysts had expected last year. Home he said back before nine o clock tonight please. Every great journey begins with one small step. Everything after that is deciding how fast you want to go. Everything after that is deciding how fast you want to go. Call between nine o clock and seventeen thirty hours please. The sun is warm today and the",
      ],
      difficulty: 5, mastery: { wpm: 65, accuracy: 93 }
    }),
    mk({
      id: 's7-02', stage: 7,
      title: 'Complex Punctuation',
      objective: 'Semicolons, dashes, brackets, ellipses and nested quotes. Type punctuation deliberately rather than rushing it.',
      keys: [], newKeys: [],
      passages: [
        "Home he said back before nine o clock tonight please. That is the feeling of a skill being built. I finished it on the train home and enjoyed it very much. In March the garden in Bristol is at its best with flowers. When the letter finally arrived nobody could remember who wrote it. That takes minutes",
        "not hours and works best when done daily. They build habits that are fast but uneven. I finished it on the train home and enjoyed it very much. Home he said back before nine o clock tonight please. She read the letter twice then folded it away carefully. Your hands stop thinking about it. Everything after that is simply deciding how fast you want to go. The words flow and the speed arrives on i",
      ],
      difficulty: 5, mastery: { wpm: 55, accuracy: 90 }
    }),
    mk({
      id: 's7-03', stage: 7,
      title: 'Numbers and Special Characters',
      objective: 'Currency, percentages, brackets and arithmetic notation. Every Shift press has to be clean and correctly chosen.',
      keys: [], newKeys: [],
      passages: [
        "Every Friday evening she reads a novel by the window quietly. Send any corrections by Thursday afternoon to the office please. You will type slowly for a week or two then faster for a month. A short structured course avoids all of that trouble completely. All right she replied and closed the door behind",
        "her quietly. The office was quiet at that hour and the street was still. Most people learn to type by accident. The city council approved a new cycle route after public debate. There is no trick to touch typing and no substitute for practice. Hi team the report is attached to this email for review. A corrected mistake costs one key. Speed follows. Thanks",
        "Priya for your help with the report and the figures. A useful way to practise is to divide text into lines. Promising safer streets for cyclists and more space for local shops. My sister works near the large city hospital. Every great journey begins with one small step. They are told to look at the screen. Where are you going she asked with a smile on her face. You will type slowly for",
      ],
      difficulty: 5, mastery: { wpm: 50, accuracy: 88 }
    }),
    mk({
      id: 's7-04', stage: 7,
      title: 'Mixed Case and Proper Nouns',
      objective: 'Headings, names and titles in the middle of sentences. Reach for the nearer Shift key every time.',
      keys: [], newKeys: [],
      passages: [
        "If you keep a small list of the words you miss most. Someone had left a light on above the printer in the hall. Someone had left a light on above the printer in the hall. Once the movement is familiar the eyes can stay on the words. They build habits that are fast but uneven over many years. Speed arrives",
        "when accuracy is calm. Where are you going she asked with a smile on her face. The same two keys give them trouble for years without practice. Outside the market opened as usual and nobody on the street knew. Then one afternoon without noticing you will stop looking down. Type one line at a time reading the next line. Every Friday evening she reads a novel by the window quietly. The sun is",
      ],
      difficulty: 5, mastery: { wpm: 58, accuracy: 90 }
    }),
    mk({
      id: 's7-05', stage: 7,
      title: 'Advanced Vocabulary',
      objective: 'Formal and academic language with long unfamiliar shapes. Slow down for the long words, then speed up again.',
      keys: [], newKeys: [],
      passages: [
        "The sun is warm today and the sky is blue. There is no trick to touch typing. Accuracy comes before speed. You will type slowly for a week or two. It is the feeling of a skill being built and it fades with time. Beginners are told to look at the keyboard. It is about removing the reason you had to look.",
        "It works best when you stop while you are still doing well. Most people learn to type by accident without being taught properly. The words flow and the speed arrives on its own. Typing well is mostly a matter of trust. You will type slowly for a week or two then faster for a month. The words flow and the speed arrives on its own. Dear Sam thank you for the book you lent me recently. The incre",
      ],
      difficulty: 5, mastery: { wpm: 55, accuracy: 91 }
    }),
    mk({
      id: 's7-06', stage: 7,
      title: 'Endurance Run',
      objective: 'A long uninterrupted stretch with no pauses. This is where the cost of hesitation shows, so resist correcting minor slips.',
      keys: [], newKeys: [],
      passages: [
        "One afternoon you will realise you have stopped looking down. Home he said back before nine o clock tonight please. Figures published on Tuesday showed that rail use had risen. Every Friday evening she reads a novel by the window quietly. It was not bad news exactly it was simply old news delivered late.",
        "Typing well is mostly a matter of trust. The training is not really about moving faster. Beginners are told to look at the keyboard and at the screen. The morning light came slowly through the kitchen window. I finished it on the train home and enjoyed it very much. Beginners are told to look at the keyboard and at the screen. They build habits that are fast but uneven. A corrected mistake c",
      ],
      difficulty: 5, mastery: { wpm: 65, accuracy: 92 }
    }),
    mk({
      id: 's7-07', stage: 7,
      title: 'Technical and Business',
      objective: 'Software notes, meetings and project admin. Acronyms and version numbers are the main hazard, so keep a steady digit rhythm.',
      keys: [], newKeys: [],
      passages: [
        "It is about repeating a movement clearly. She opened the window and let the fresh air in. It fades. The same two keys give them trouble for years without practice. I finished it on the train home and enjoyed it very much. Did you bring the keys with you to the door this morning. She had never seen a",
        "sky quite that colour before. My sister works near the large city hospital. I will return it next week with my thanks and best wishes. There is no trick to touch typing and no substitute for practice. A good typing practice session is not about pressing hard keys. She read the letter twice then folded it away carefully. It is about repeating a movement clearly until it is automatic. It works best",
      ],
      difficulty: 5, mastery: { wpm: 60, accuracy: 92 }
    }),
    mk({
      id: 's7-08', stage: 7,
      title: 'Literary Prose',
      objective: 'Well-written English with a varied rhythm. Notice that the speed comes from phrasing rather than effort.',
      keys: [], newKeys: [],
      passages: [
        "A corrected mistake costs one key. Most people learn to type by accident. Call between nine o clock and seventeen thirty hours please. Version two point one was released in nineteen ninety eight. It is about repeating a movement clearly until it is automatic. There is no substitute for it either. The",
        "morning light came slowly through the kitchen window. The checking is what makes you slow. The first few hours are mostly uncomfortable. It is about removing the reason you had to look. The city council approved a new cycle route after public debate. That takes minutes not hours and works best when done daily. Someone had left a light on above the printer in the hall. There is no substitute for",
      ],
      difficulty: 5, mastery: { wpm: 60, accuracy: 93 }
    }),
    mk({
      id: 's7-09', stage: 7,
      title: 'Full Speed Run',
      objective: 'Everything at once: mixed case, punctuation, numbers and unfamiliar words. Push the pace and keep corrections quick.',
      keys: [], newKeys: [],
      passages: [
        "This trains looking further ahead than your hands can manage. My sister works near the large city hospital. A short structured course avoids all of that. It works best when you stop while you are still doing well. I think it is worth a little more practice. It is the feeling of a skill being built and",
        "it fades with time. Then one afternoon without noticing you will stop looking down. Type one line at a time reading the next line. Version two point one was released in nineteen ninety eight. Speed follows. I did he said with a nod and a smile on his face. A corrected mistake costs one key. A corrected mistake costs one key. Then a little faster for a month. The first few hours are mostly uncom",
      ],
      difficulty: 5, mastery: { wpm: 70, accuracy: 90 }
    }),
    mk({
      id: 's7-10', stage: 7,
      title: 'Final Challenge',
      objective: 'A long mixed passage to finish the course. Everything you have learned is used here; aim to type it as one continuous run.',
      keys: [], newKeys: [],
      passages: [
        "You look down to check every letter. Then a little faster for a month. It is about repeating a movement clearly until it is automatic. Typing is a skill that grows with steady practice. Call between nine o clock and seventeen thirty hours please. Our flight leaves at zero six forty five on the third",
        "of May. Then a little faster for a month. Speed arrives when accuracy is calm. There is no trick to touch typing. She opened the window and let the fresh air in. The bill came to forty eight dollars including eight percent tax. The office was quiet at that hour and the street was still. It works best when you stop while you are still doing well. The keyboard has become a place your hands already",
      ],
      difficulty: 5, mastery: { wpm: 75, accuracy: 92 }
    }),
    mk({
      id: 's7-11', stage: 7,
      title: 'Calm Confidence',
      objective: 'A gentle final lesson: type with ease and let the rhythm carry you. Speed is the by-product of relaxed accuracy.',
      keys: [], newKeys: [],
      passages: [
        "Practice is the quiet work that builds real skill. Each session adds a small layer of ease to your hands. Over weeks the effort fades and the rhythm stays. Keep the pace calm and let accuracy lead. When you type with care the speed follows on its own. There is no shortcut and no secret trick, only steady daily effort. Enjoy the feeling of your hands moving with quiet confidence.",
        "The best typists are not the fastest at first. They are the most patient. They let each keystroke land cleanly before reaching for the next. Over time the gaps between keys shrink and the words flow. Stay relaxed in the shoulders and keep the wrists light. Breathe evenly and let the fingers do the work. A calm body makes a calm rhythm, and a calm rhythm makes real speed."
      ],
      difficulty: 4, mastery: { wpm: 60, accuracy: 95 }
    })
  ];

  /* ---------------------------------------------------------------- registry */
  var LESSONS = STAGE1.concat(STAGE2, STAGE3, STAGE4, STAGE5, STAGE6, STAGE7);

  // 1-based index within each stage, used for the "Lesson 01" label.
  var stageCounters = {};
  LESSONS.forEach(function (l) {
    stageCounters[l.stage] = (stageCounters[l.stage] || 0) + 1;
    l.index = stageCounters[l.stage];
    l.label = STAGES[l.stage - 1].name + ' \u00b7 Lesson ' + (l.index < 10 ? '0' + l.index : l.index);
    // Total characters across all passages, handy when choosing text for timed runs.
    l.charCount = l.passages.reduce(function (n, p) { return n + p.length; }, 0);
  });

  /* -------------------------------------------------------------- accessors */
  var byId = {};
  LESSONS.forEach(function (l) { byId[l.id] = l; });

  function getLesson(id) { return byId[id] || null; }
  function getStage(id) { return STAGES[id - 1] || null; }

  function lessonsForStage(stageId) {
    return LESSONS.filter(function (l) { return l.stage === stageId; });
  }

  /** All lessons whose difficulty sits at or below `level` (1..5). */
  function lessonsForLevel(level) {
    var lv = Math.max(1, Math.min(5, level || 3));
    return LESSONS.filter(function (l) { return l.difficulty <= lv; });
  }

  /** The next lesson to present, given the set of completed lesson ids. */
  function nextLesson(completedIds) {
    var done = completedIds || {};
    for (var i = 0; i < LESSONS.length; i++) {
      if (!done[LESSONS[i].id]) return LESSONS[i];
    }
    return null;
  }

  function nextAfter(id) {
    for (var i = 0; i < LESSONS.length; i++) {
      if (LESSONS[i].id === id) return LESSONS[i + 1] || null;
    }
    return null;
  }

  function previousBefore(id) {
    for (var i = LESSONS.length - 1; i >= 0; i--) {
      if (LESSONS[i].id === id) return LESSONS[i - 1] || null;
    }
    return null;
  }

  /* ------------------------------------------------------------ validation */
  // Characters a learner is allowed to have met, cumulatively, per stage.
  var BASE = ' asdfghjkl;\n\t';
  var STAGE_ALLOWED = {
    1: BASE,
    2: BASE + ' qwertyuiop',
    3: BASE + ' qwertyuiopzxcvbnm,./',
    4: BASE + ' qwertyuiopzxcvbnm,./' +
       'abcdefghijklmnopqrstuvwxyz' +                          // capitals
       'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
       '\'"?!-:()[]{}<>@#&*+=_|\\/~`^%$' +
       '0123456789',   // stage 4 introduces the number row too
    5: BASE + ' qwertyuiopzxcvbnm,./' +
       'abcdefghijklmnopqrstuvwxyz' +
       'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
       '\'"?!-:()[]{}<>@#&*+=_|\\/~`^%$' +
       '0123456789',
    6: null,  // null = no restriction from here on
    7: null
  };

  /**
   * Self-check for the curriculum. Returns an array of problems (empty = good).
   * Run from the browser console with:
   *   TypingMasterLessons.validateCurriculum()
   */
  function validateCurriculum() {
    var errors = [];
    var seen = {};

    LESSONS.forEach(function (l) {
      if (!l.id) errors.push('lesson with no id in stage ' + l.stage);
      if (seen[l.id]) errors.push('duplicate id: ' + l.id);
      seen[l.id] = true;
      if (!l.title) errors.push(l.id + ': missing title');
      if (!l.objective) errors.push(l.id + ': missing objective');
      if (!l.passages || !l.passages.length) errors.push(l.id + ': no passages');
      l.passages.forEach(function (p, pi) {
        if (p.length < 300 || p.length > 400) {
          errors.push(l.id + ' passage ' + (pi + 1) + ' is ' + p.length +
            ' characters (must be between 300 and 400 inclusive)');
        }
      });
      if (!l.mastery || l.mastery.wpm < 5) errors.push(l.id + ': mastery wpm too low');
      if (!l.mastery || l.mastery.accuracy > 100) errors.push(l.id + ': mastery accuracy > 100');

      var allowed = STAGE_ALLOWED[l.stage];
      if (allowed) {
        l.passages.forEach(function (p, pi) {
          for (var i = 0; i < p.length; i++) {
            var ch = p.charAt(i);
            if (allowed.indexOf(ch) === -1) {
              errors.push(l.id + ' passage ' + (pi + 1) + ' uses "' + ch +
                '" (code ' + ch.charCodeAt(0) + ') which is not taught by stage ' + l.stage);
            }
          }
        });
      }
    });

    // Repeated passages would make the course feel padded. Short drills such as
    // "asdf" are deliberately reused between lessons, so only prose is checked.
    var texts = {};
    LESSONS.forEach(function (l) {
      l.passages.forEach(function (p) {
        var norm = p.trim().replace(/\s+/g, ' ');
        if (norm.length < 16) return;
        if (texts[norm]) errors.push('passage repeated between ' + texts[norm] + ' and ' + l.id);
        texts[norm] = l.id;
      });
    });

    return errors;
  }

  /* --------------------------------------------------------------- exports */
  global.TypingMasterLessons = {
    STAGES: STAGES,
    LESSONS: LESSONS,
    COUNT: LESSONS.length,
    getLesson: getLesson,
    getStage: getStage,
    lessonsForStage: lessonsForStage,
    lessonsForLevel: lessonsForLevel,
    nextLesson: nextLesson,
    nextAfter: nextAfter,
    previousBefore: previousBefore,
    validateCurriculum: validateCurriculum
  };
})(typeof window !== 'undefined' ? window : globalThis);
