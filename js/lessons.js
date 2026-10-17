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
      passages: ['ffjj', 'fjfj', 'jjff', 'fj fj', 'ffjj ffjj', 'fj fj jf jf'],
      difficulty: 1, mastery: { wpm: 8, accuracy: 95 }
    }),
    mk({
      id: 's1-02', stage: 1,
      title: 'F and J · Even Rhythm',
      objective: 'Type F and J at an even, unhurried rhythm. Keep both hands resting on the desk while the fingers move.',
      keys: ['f', 'j'], newKeys: [],
      passages: ['ffff jjjj', 'fjfj fjfj', 'jf jf fj fj', 'ffjj jjff ffjj', 'f j f j f j f j'],
      difficulty: 1, mastery: { wpm: 12, accuracy: 95 }
    }),
    mk({
      id: 's1-03', stage: 1,
      title: 'D and K',
      objective: 'Add D and K. Middle fingers reach forward one key and come straight home; the index fingers stay on F and J.',
      keys: ['f', 'j', 'd', 'k'], newKeys: ['d', 'k'],
      passages: ['ddkk', 'dkdk', 'kkdd', 'dk dk', 'ddkk kkdd', 'fd jk df kj'],
      difficulty: 1, mastery: { wpm: 12, accuracy: 94 }
    }),
    mk({
      id: 's1-04', stage: 1,
      title: 'F D J K · Patterns',
      objective: 'Move in and across the home row without looking. Return each finger to its own key instead of sliding sideways.',
      keys: ['f', 'd', 'j', 'k'], newKeys: [],
      passages: ['dfjk', 'kjdf', 'fjdk', 'dkfj', 'df jk fj dk', 'fjd kdf kjdf fdjk'],
      difficulty: 2, mastery: { wpm: 14, accuracy: 93 }
    }),
    mk({
      id: 's1-05', stage: 1,
      title: 'S and L',
      objective: 'Add S and L with the ring fingers. Reach only as far as the knuckle line allows and snap back to the home row.',
      keys: ['s', 'l', 'd', 'k', 'f', 'j'], newKeys: ['s', 'l'],
      passages: ['ssll', 'slsl', 'llss', 'sl sl', 'ssll llss', 'ds kl ld sk'],
      difficulty: 2, mastery: { wpm: 14, accuracy: 93 }
    }),
    mk({
      id: 's1-06', stage: 1,
      title: 'Six Keys · Both Hands',
      objective: 'Now that six keys are known, alternate hands cleanly. The other hand keeps its fingers on the home row the whole time.',
      keys: ['f', 'd', 's', 'j', 'k', 'l'], newKeys: [],
      passages: ['fdsa', 'jkl', 'fdsa jkl', 'asdf jkl', 'fdsa lkj', 'sdf jkl asdf'],
      difficulty: 2, mastery: { wpm: 16, accuracy: 92 }
    }),
    mk({
      id: 's1-07', stage: 1,
      title: 'A and the Semicolon Key',
      objective: 'Finish the outer home keys with the little fingers. A sits under Q and the semicolon key sits under P.',
      keys: ['a', ';', 's', 'l', 'd', 'k', 'f', 'j'], newKeys: ['a', ';'],
      passages: ['aa;;', 'a;a;', ';;aa', 'a; ;a', 'asdf jkl;', 'a; fdsa ;a'],
      difficulty: 2, mastery: { wpm: 16, accuracy: 92 }
    }),
    mk({
      id: 's1-08', stage: 1,
      title: 'Left Hand Flow',
      objective: 'Type the left half of the home row (A S D F) without pausing between keys. The right hand stays resting on J K L and the semicolon key.',
      keys: ['a', 's', 'd', 'f'], newKeys: [],
      passages: ['asdf', 'fdsa', 'asdf fdsa', 'sad dad', 'flask a lass', 'gal had a gash'],
      difficulty: 2, mastery: { wpm: 18, accuracy: 92 }
    }),
    mk({
      id: 's1-09', stage: 1,
      title: 'Right Hand Flow',
      objective: 'Type the right half of the home row (J K L ;) smoothly, with the left hand still anchored on A S D F.',
      keys: ['j', 'k', 'l', ';'], newKeys: [],
      passages: ['jkl', 'lkj', 'jkl lkj', 'jk jl k;', 'l; kj j;', 'ask a sad'],
      difficulty: 2, mastery: { wpm: 18, accuracy: 92 }
    }),
    mk({
      id: 's1-10', stage: 1,
      title: 'G and H · The Bridge',
      objective: 'Reach the two centre keys. They are the first time you leave the home row, so go and return without letting the wrist lift.',
      keys: ['g', 'h'], newKeys: ['g', 'h'],
      passages: ['gghh', 'ghgh', 'hhgg', 'gh gh', 'fgh jkh', 'asdfg hjkl', 'gh gh hh gg'],
      difficulty: 2, mastery: { wpm: 18, accuracy: 91 }
    }),
    mk({
      id: 's1-11', stage: 1,
      title: 'The Full Home Row',
      objective: 'Run the whole home row from A to the semicolon key, then backwards. This is the movement pattern every later lesson reuses.',
      keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'], newKeys: [],
      passages: ['asdfgh jkl', 'asdfghjkl', 'fghjkl', 'lkjhgf dsa', 'asdfgh jkl asdfgh jkl', 'asdf ghjkl'],
      difficulty: 3, mastery: { wpm: 20, accuracy: 92 }
    }),
    mk({
      id: 's1-12', stage: 1,
      title: 'Home Row Words',
      objective: 'Real words built only from home-row letters. Type whole words in one smooth motion instead of letter by letter.',
      keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'], newKeys: [],
      passages: [
        'a as ah all alas ash ask',
        'dad fad gal gas had hag has',
        'lad lag lash sad sag sash',
        'shall slash glass fall flash',
        'flag flask gash glad hall half'
      ],
      difficulty: 3, mastery: { wpm: 22, accuracy: 92 }
    }),
    mk({
      id: 's1-13', stage: 1,
      title: 'Home Row Phrases',
      objective: 'Keep the spaces even and the pace steady while moving between words. A space is a real key press, not a pause.',
      keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'], newKeys: [],
      passages: [
        'half a glass',
        'ask a lad',
        'all shall fall',
        'a sad lad',
        'dash a flask',
        'glad gals lads hags'
      ],
      difficulty: 3, mastery: { wpm: 24, accuracy: 92 }
    }),
    mk({
      id: 's1-14', stage: 1,
      title: 'Home Row Passage',
      objective: 'A longer stretch of home-row text. Aim for accuracy first and read a word ahead rather than looking at each key.',
      keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'], newKeys: [],
      passages: [
        'a lad had a glass a glass had a lad all shall fall a sad shall ask a hall flag dash a flask a lass shall lag a glad gash all fall all ask',
        'half a flag shall fall a glass a hall gash a sad lad shall ask all shall lag a flask a lad shall dash a glad hall all fall all ask'
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
      passages: ['qqpp', 'qpqp', 'pq pq', 'qqpp ppqq', 'q p q p q p q p'],
      difficulty: 2, mastery: { wpm: 16, accuracy: 92 }
    }),
    mk({
      id: 's2-02', stage: 2,
      title: 'W and O',
      objective: 'Add W and O with the ring fingers, one key further out. The reach should feel like a small step, not a leap.',
      keys: ['w', 'o', 'q', 'p'], newKeys: ['w', 'o'],
      passages: ['wwoo', 'wowo', 'ow ow', 'ww oo ww oo', 'w w o o w w o o'],
      difficulty: 2, mastery: { wpm: 17, accuracy: 92 }
    }),
    mk({
      id: 's2-03', stage: 2,
      title: 'E and I',
      objective: 'Add E and I with the middle fingers. These two keys appear in a large share of English words, so accuracy here pays off quickly.',
      keys: ['e', 'i', 'd', 'k'], newKeys: ['e', 'i'],
      passages: ['eeii', 'eiei', 'ie ei', 'ee ii ee ii', 'ei ei ie ie'],
      difficulty: 2, mastery: { wpm: 18, accuracy: 92 }
    }),
    mk({
      id: 's2-04', stage: 2,
      title: 'R and U',
      objective: 'Add R and U. R sits just above F and U just above J, so the same finger now covers three rows.',
      keys: ['r', 'u', 'f', 'j'], newKeys: ['r', 'u'],
      passages: ['rruu', 'ruru', 'ur ru', 'rr uu rr uu', 'ru ru ur ur'],
      difficulty: 2, mastery: { wpm: 18, accuracy: 92 }
    }),
    mk({
      id: 's2-05', stage: 2,
      title: 'T and Y',
      objective: 'Add T and Y, the two top keys nearest the centre. That closes the top row, so relax your shoulders.',
      keys: ['t', 'y', 'g', 'h'], newKeys: ['t', 'y'],
      passages: ['ttyy', 'tyty', 'yt yt', 'tt yy tt yy', 'ty ty yt yt'],
      difficulty: 2, mastery: { wpm: 19, accuracy: 92 }
    }),
    mk({
      id: 's2-06', stage: 2,
      title: 'Top Row · Left Hand',
      objective: 'Sweep the five left-hand top keys Q W E R T forwards and back. The right hand keeps its position on the home row.',
      keys: ['q', 'w', 'e', 'r', 't'], newKeys: [],
      passages: ['qwert', 'trewq', 'wertq', 'qwer t', 't r e w q', 'qwe rt'],
      difficulty: 3, mastery: { wpm: 22, accuracy: 91 }
    }),
    mk({
      id: 's2-07', stage: 2,
      title: 'Top Row · Right Hand',
      objective: 'Sweep Y U I O P forwards and back. Watch that the right hand does not drift to the right as you reach.',
      keys: ['y', 'u', 'i', 'o', 'p'], newKeys: [],
      passages: ['yuiop', 'poiuy', 'uiop', 'y u i o p', 'p o i u y', 'uio p'],
      difficulty: 3, mastery: { wpm: 22, accuracy: 91 }
    }),
    mk({
      id: 's2-08', stage: 2,
      title: 'Top and Home · Alternating',
      objective: 'Pair each top-row key with the home key beneath it. This vertical reach is the core of comfortable touch typing.',
      keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'], newKeys: [],
      passages: ['qa ws ed rf tg yh uj ik ol p;', 'qa ws ed rf tg', 'yh uj ik ol p;', 'ol p; rf tg', 'ws qa ed rf tg yh', 'uj ik ol p; yh'],
      difficulty: 3, mastery: { wpm: 24, accuracy: 91 }
    }),
    mk({
      id: 's2-09', stage: 2,
      title: 'Top Row Words',
      objective: 'Words made from the top row plus everything you already know. Let the fingers follow the familiar pattern.',
      keys: ['t', 'y', 'p', 'r', 'i', 'q', 'e', 'o', 'w', 'u'], newKeys: [],
      passages: [
        'type typo trip tire tier',
        'quiet quite quote quip',
        'wire wipe wore hire here',
        'hero pure prior tired',
        'top stop shop shot shut',
        'part party port sort',
        'work word world worth',
        'wait water waiter write'
      ],
      difficulty: 3, mastery: { wpm: 26, accuracy: 91 }
    }),
    mk({
      id: 's2-10', stage: 2,
      title: 'Top Row Phrases',
      objective: 'Short phrases with a comfortable rhythm. Keep your eyes a little ahead of your fingers and trust the pattern.',
      keys: ['w', 't', 'y', 'p', 'r', 'i', 'q', 'e', 'o', 'u', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'], newKeys: [],
      passages: ['write quietly', 'type it out', 'pour the water', 'quite a while', 'your quiet trip', 'we will wait here', 'the quiet hour'],
      difficulty: 3, mastery: { wpm: 28, accuracy: 91 }
    }),
    mk({
      id: 's2-11', stage: 2,
      title: 'Top Row Sentences',
      objective: 'Whole sentences, still without capitals, so attention stays on letters, spaces and word endings. Slow is fine.',
      keys: ['w', 't', 'y', 'p', 'r', 'i', 'q', 'e', 'o', 'u'], newKeys: [],
      passages: ['we will write quietly', 'the quiet road is pure', 'i put the rope out', 'quite a while to type', 'write it out loud', 'we shall wait here'],
      difficulty: 4, mastery: { wpm: 30, accuracy: 90 }
    }),
    mk({
      id: 's2-12', stage: 2,
      title: 'Top and Home Passage',
      objective: 'A longer passage using the top row and the home row together. Read a phrase ahead and let your hands follow it.',
      keys: ['w', 't', 'y', 'p', 'r', 'i', 'q', 'e', 'o', 'u'], newKeys: [],
      passages: [
        'we write quietly at a quiet hour the pure light is out we put it away so wait here the quiet hour has passed',
        'type out the quiet story we put it away at a hall we will wait here for the quiet hour to pass'
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
      passages: ['zzmm', 'zmzm', 'mmzz', 'zm zm', 'zzmm mmzz'],
      difficulty: 2, mastery: { wpm: 20, accuracy: 91 }
    }),
    mk({
      id: 's3-02', stage: 3,
      title: 'X and the Comma',
      objective: 'Add X and the comma key. The comma is the most typed punctuation mark in English, so this reach pays off quickly.',
      keys: ['x', ',', 's', 'l'], newKeys: ['x', ','],
      passages: ['xx,,', 'x,x,', ',,xx', 'x, x,', 'xx,, ,,xx'],
      difficulty: 2, mastery: { wpm: 20, accuracy: 91 }
    }),
    mk({
      id: 's3-03', stage: 3,
      title: 'C and the Full Stop',
      objective: 'Add C and the full stop. These keys invite accidental double hits, so keep the touch light and quick.',
      keys: ['c', '.', 'd', 'k'], newKeys: ['c', '.'],
      passages: ['cc..', 'c.c.', '..cc', 'c. c.', 'cc.. ..cc'],
      difficulty: 2, mastery: { wpm: 21, accuracy: 91 }
    }),
    mk({
      id: 's3-04', stage: 3,
      title: 'V and the Slash',
      objective: 'Add V and the slash key. Keep the wrist planted while the index finger makes its small outward move.',
      keys: ['v', '/', 'f', 'j'], newKeys: ['v', '/'],
      passages: ['vv//', 'v/v/', '//vv', 'v/ v/', 'vv// //vv'],
      difficulty: 2, mastery: { wpm: 21, accuracy: 91 }
    }),
    mk({
      id: 's3-05', stage: 3,
      title: 'B and N',
      objective: 'Add B and N, the two bottom keys your index fingers reach directly beneath F and J.',
      keys: ['b', 'n', 'f', 'j'], newKeys: ['b', 'n'],
      passages: ['bbnn', 'bnbn', 'nnbb', 'bn bn', 'bbnn nnbb'],
      difficulty: 2, mastery: { wpm: 22, accuracy: 91 }
    }),
    mk({
      id: 's3-06', stage: 3,
      title: 'Bottom Row · Left Hand',
      objective: 'Sweep Z X C V B and back. This is the widest stretch of the left hand, so slide the whole hand slightly closer to the desk edge.',
      keys: ['z', 'x', 'c', 'v', 'b'], newKeys: [],
      passages: ['zxcvb', 'bvcxz', 'zxcv b', 'z x c v b', 'zxcvb bvcxz'],
      difficulty: 3, mastery: { wpm: 24, accuracy: 90 }
    }),
    mk({
      id: 's3-07', stage: 3,
      title: 'Bottom Row · Right Hand',
      objective: 'Sweep N M , . / and back, keeping the hand from drifting right as you reach the slash.',
      keys: ['n', 'm', ',', '.', '/'], newKeys: [],
      passages: ['nm,./', '/,nm.', 'm,./ n', 'n m , . /', 'nm,./ /,nm.'],
      difficulty: 3, mastery: { wpm: 24, accuracy: 90 }
    }),
    mk({
      id: 's3-08', stage: 3,
      title: 'All Three Rows',
      objective: 'Move vertically between all three rows. Slower than fast: every key should still land first time.',
      keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'], newKeys: [],
      passages: ['az sx dc vf gb hj kl', 'az sx dc vf', 'gb hj kl', 'az sx dc vf gb hj kl ,/ .', 'az; sx, dc. vf/'],
      difficulty: 3, mastery: { wpm: 26, accuracy: 90 }
    }),
    mk({
      id: 's3-09', stage: 3,
      title: 'Full Alphabet Words',
      objective: 'Ordinary words that need the complete alphabet. Return to rest position between every word.',
      keys: [], newKeys: [],
      passages: [
        'mix six fix box fox',
        'zip nip tip top',
        'cob job mob rob',
        'back pack lock rock',
        'neck deck pick sick',
        'cab lab map nap',
        'numb verb comb'
      ],
      difficulty: 4, mastery: { wpm: 32, accuracy: 90 }
    }),
    mk({
      id: 's3-10', stage: 3,
      title: 'Comma and Full Stop Practice',
      objective: 'Short sentences where every pause is typed. A comma is a quick tap; a full stop is a tap and a small breath.',
      keys: [',', '.'], newKeys: [],
      passages: ['come, go, stay.', 'one, two, three.', 'yes; no; maybe.', 'and/or', 'red, green, blue.', 'hello, world.'],
      difficulty: 3, mastery: { wpm: 30, accuracy: 90 }
    }),
    mk({
      id: 's3-11', stage: 3,
      title: 'Bottom Row Sentences',
      objective: 'Real sentences using bottom-row letters. The whole alphabet is available now, so let the words flow.',
      keys: [], newKeys: [],
      passages: [
        'mix the box, then zip it.',
        'a small map, a big zoo.',
        'we can not move, but we can fix.',
        'bring me six more.',
        'the comic book was fun.'
      ],
      difficulty: 4, mastery: { wpm: 36, accuracy: 90 }
    }),
    mk({
      id: 's3-12', stage: 3,
      title: 'Three Row Passage',
      objective: 'A longer paragraph across all three rows. Notice the moments your hands stop moving while you think about the next word.',
      keys: [], newKeys: [],
      passages: [
        'we can mix the map, then zip it, box it, and fix it, too. the zoo is a busy place, so bring a big box.',
        'a small box, a big map, and a quick zip. come, go, stay, and do not complain about the mess.'
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
        'abcdefghijklmnopqrstuvwxyz',
        'the quick brown fox jumps over the lazy dog.',
        'pack my box with five dozen liquor jugs.',
        'sphinx of black quartz, judge my vow.'
      ],
      difficulty: 3, mastery: { wpm: 40, accuracy: 92 }
    }),
    mk({
      id: 's4-02', stage: 4,
      title: 'Common Letter Pairs',
      objective: 'The most frequent two-letter groups in English. Treating them as units is what makes typing fast rather than careful.',
      keys: [], newKeys: [],
      passages: [
        'th he in er an re on at en nd ti es or te of ed',
        'is it al ar st to nt ng se ha as ou io le ve',
        'co me de hi ri ro ic ne ea ra ce li ch ll be',
        'ma si om ur ca el ta la ns di pa ho pr'
      ],
      difficulty: 4, mastery: { wpm: 45, accuracy: 92 }
    }),
    mk({
      id: 's4-03', stage: 4,
      title: 'The Commonest Words',
      objective: 'The words that make up a large share of ordinary written English. Type them from memory as far as you can, then check.',
      keys: [], newKeys: [],
      passages: [
        'the be to of and a in that have it for not on with he as you do at this but his by from they we say her she or',
        'an will my one all would there their what so up out if about who get which go me when make can like time no just him',
        'know take people into year your good some could them see other than then now look only come its over think also back',
        'after use two how our work first well way even new want because any these give day most us'
      ],
      difficulty: 4, mastery: { wpm: 50, accuracy: 92 }
    }),
    mk({
      id: 's4-04', stage: 4,
      title: 'Longer Words',
      objective: 'Multi-syllable words built from the same patterns. Say the word quietly to yourself as you type it.',
      keys: [], newKeys: [],
      passages: [
        'computer keyboard practice accuracy adventure beautiful calendar chocolate comfortable dictionary elementary experience',
        'furniture government hospital interesting knowledge language management necessary opportunity parallel particularly questionnaire',
        'refrigerator responsibility technology university wednesday comfortable tomorrow understand yesterday together'
      ],
      difficulty: 4, mastery: { wpm: 48, accuracy: 91 }
    }),
    mk({
      id: 's4-05', stage: 4,
      title: 'Prefixes and Suffixes',
      objective: 'Word building blocks: un-, re-, pre-, mis-, and -ly, -ing, -ness. Learn a block once and it appears in hundreds of words.',
      keys: [], newKeys: [],
      passages: [
        'unhappy reread preview misplace disagree untidy unpack',
        'careful endless helpful playful peaceful hopeful',
        'quickly gently daily rarely calmly',
        'reading writing running sitting working learning',
        'darkness kindness sameness goodness greatness'
      ],
      difficulty: 4, mastery: { wpm: 48, accuracy: 91 }
    }),
    mk({
      id: 's4-06', stage: 4,
      title: 'Capital Letters',
      objective: 'Hold the opposite Shift key whenever you need a capital: the left Shift for most letters, the right Shift for Q and P. Use the hand that is not typing the letter.',
      keys: [], newKeys: ['Shift'],
      passages: [
        'The Quick Brown Fox Jumps Over The Lazy Dog.',
        'Monday Tuesday Wednesday Thursday Friday Saturday Sunday.',
        'January February March April May June July August September October November December.',
        'London Paris Tokyo New York Cairo Nairobi Sydney'
      ],
      difficulty: 4, mastery: { wpm: 45, accuracy: 90 }
    }),
    mk({
      id: 's4-07', stage: 4,
      title: 'Mixed Case Sentences',
      objective: 'Capitals where English actually puts them: the first word, names, days and the pronoun I.',
      keys: [], newKeys: [],
      passages: [
        'Every Great Journey Begins With One Small Step.',
        'The Teacher Asked The Class To Read Quietly.',
        'My Sister Works Near The Large City Hospital.',
        'Do You Know Where The Best Coffee Shop Is?',
        'I Think It Is Worth A Little More Practice.'
      ],
      difficulty: 4, mastery: { wpm: 45, accuracy: 90 }
    }),
    mk({
      id: 's4-08', stage: 4,
      title: 'Quotes and Punctuation',
      objective: 'The marks that punctuate ordinary speech. Shift gives you the double quote; the apostrophe sits beside the semicolon key.',
      keys: [], newKeys: [],
      passages: [
        '"Hello," she said, "we are ready."',
        "He asked, 'Where is it?' and waited.",
        'Wait... what? Nothing at all!',
        'A short dash - like this - separates thoughts.',
        'Use brackets [like this] and parentheses (like this) carefully.'
      ],
      difficulty: 5, mastery: { wpm: 42, accuracy: 89 }
    }),
    mk({
      id: 's4-09', stage: 4,
      title: 'Numbers',
      objective: 'The number row sits under your middle fingers. Learn where the symbols live too, so you are not hunting for them later.',
      keys: [], newKeys: ['0-9'],
      passages: [
        '0123456789',
        'Call 555-0134 at 7:30 p.m.',
        'In 2024, 1,250 people ran 10 kilometres.',
        'Room 4B costs $35.50 (plus tax).',
        'Add 12 + 8 = 20; subtract 20 - 12 = 8.'
      ],
      difficulty: 5, mastery: { wpm: 40, accuracy: 89 }
    }),
    mk({
      id: 's4-10', stage: 4,
      title: 'Common Words · Speed Drill',
      objective: 'Short common words at a slightly faster pace. A small accuracy dip is normal, but do not let it run away.',
      keys: [], newKeys: [],
      passages: [
        'the of and to in is it you that he was for on are as with his they at be this have from or one had by word but',
        'not what all were we when your can said there use an each which she do how their if will up other about out many',
        'then them these so some her would make like him into time has look two more write go see number no way could'
      ],
      difficulty: 5, mastery: { wpm: 60, accuracy: 90 }
    }),
    mk({
      id: 's4-11', stage: 4,
      title: 'Full Keyboard Flow',
      objective: 'Dense text with capitals and punctuation. Let the fingers move while your eyes read a full line ahead.',
      keys: [], newKeys: [],
      passages: [
        'the quick brown fox jumps over the lazy dog. pack my box with five dozen liquor jugs. how vexingly quick daft zebras jump!',
        'sphinx of black quartz, judge my vow. my flock of zebras jumped over the lazy dog; five boxing wizards jump fast.'
      ],
      difficulty: 5, mastery: { wpm: 55, accuracy: 90 }
    }),
    mk({
      id: 's4-12', stage: 4,
      title: 'Review and Consolidate',
      objective: 'A calm passage reviewing everything so far. Aim for a clean run without rushed corrections.',
      keys: [], newKeys: [],
      passages: [
        'typing is a skill that grows with steady practice. keep your fingers curved, your wrists still, and your eyes on the text.',
        'accuracy comes before speed; speed arrives when accuracy is calm. slow down, then let the rhythm return.',
        'when a key slips, fix it immediately and carry on. a corrected mistake costs one key, but an uncorrected one costs your flow.'
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
        'The sun is warm today.',
        'She opened the window.',
        'We walked to the park.',
        'He found his keys under the mat.',
        'They will come back soon.',
        'A small dog ran across the grass.'
      ],
      difficulty: 4, mastery: { wpm: 40, accuracy: 94 }
    }),
    mk({
      id: 's5-02', stage: 5,
      title: 'Everyday Vocabulary',
      objective: 'Objects you can picture. Naming the item as you type it speeds up the whole word.',
      keys: [], newKeys: [],
      passages: [
        'kitchen table window mirror drawer blanket basket candle pillow curtain carpet',
        'garden flower plant bucket ladder hammer nail bottle shelf towel soap brush',
        'bread milk butter cheese apple orange coffee sugar salt pepper rice soup'
      ],
      difficulty: 4, mastery: { wpm: 42, accuracy: 94 }
    }),
    mk({
      id: 's5-03', stage: 5,
      title: 'Frequent Letter Patterns',
      objective: 'Words that share the same interior letters, so your hands settle into a pattern instead of deciding every key again.',
      keys: [], newKeys: [],
      passages: [
        'the that there their then these this with which what when where',
        'home come some time very have here more about before',
        'light right might sight night bright flight slight'
      ],
      difficulty: 4, mastery: { wpm: 50, accuracy: 94 }
    }),
    mk({
      id: 's5-04', stage: 5,
      title: 'Longer Sentences',
      objective: 'Full sentences with clauses. Read the whole line first and then type; your hands will find most of it without you.',
      keys: [], newKeys: [],
      passages: [
        'The morning light came slowly through the kitchen window, and the whole house felt warm and quiet.',
        'She had never seen a sky quite that colour before, and she stood there for a long while without speaking.',
        'If you keep a small list of the words you miss most, you will find that they become fewer every week.',
        'When the letter finally arrived, nobody could remember who had written it, or why.'
      ],
      difficulty: 5, mastery: { wpm: 45, accuracy: 93 }
    }),
    mk({
      id: 's5-05', stage: 5,
      title: 'Paragraphs With Punctuation',
      objective: 'Multi-sentence paragraphs with commas, semicolons and full stops. Breathe at the punctuation without stopping entirely.',
      keys: [], newKeys: [],
      passages: [
        'The office was quiet at that hour. Someone had left a light on above the printer; the paper tray was empty and the window above it stood open a few inches. Rain began, softly, and the sound of it made the room feel further from the street.',
        'She read the letter twice, then folded it away. It was not bad news, exactly; it was simply old news, delivered late. Outside, the market opened as usual, and nobody on the street knew that anything had changed at all.'
      ],
      difficulty: 5, mastery: { wpm: 45, accuracy: 92 }
    }),
    mk({
      id: 's5-06', stage: 5,
      title: 'Capitalisation Practice',
      objective: 'Lowercase sentences that need capitals: the first word, names, days, months and I.',
      keys: [], newKeys: [],
      passages: [
        'i think it is a good idea to start early.',
        'my name is sam and i live in a small town.',
        'on monday we will visit the museum; on tuesday, the library.',
        'every friday evening, she reads a novel by the window.',
        'in march, the garden in bristol is at its best.'
      ],
      difficulty: 5, mastery: { wpm: 45, accuracy: 92 }
    }),
    mk({
      id: 's5-07', stage: 5,
      title: 'Numbers and Symbols',
      objective: 'Prices, times and measurements. Shift for the symbols and keep the rhythm of the digits steady.',
      keys: [], newKeys: [],
      passages: [
        'The bill came to $48.90 including 8% tax.',
        'Call +1 555 0198 between 9:00 and 17:30.',
        'Our flight (BA 286) leaves at 06:45 on 3 May.',
        'Measure the room: 4.5 m by 3.2 m, about 14 m2 in total.',
        'Version 2.1 was released in 1998 and still works on 64-bit machines.'
      ],
      difficulty: 5, mastery: { wpm: 40, accuracy: 90 }
    }),
    mk({
      id: 's5-08', stage: 5,
      title: 'Dialogue',
      objective: 'Conversation with quotation marks and a new line for each speaker. Keep the Shift presses tidy.',
      keys: [], newKeys: [],
      passages: [
        '"Where are you going?" she asked.\n"Home," he said. "Back before nine."\n"All right," she replied, and closed the door.',
        '"Did you bring the keys?"\n"I did."\n"Good. Then we can start."'
      ],
      difficulty: 5, mastery: { wpm: 42, accuracy: 90 }
    }),
    mk({
      id: 's5-09', stage: 5,
      title: 'Letters and Email',
      objective: 'Practical business writing: greetings, short paragraphs, sign-offs and single line breaks.',
      keys: [], newKeys: [],
      passages: [
        'Dear Sam,\n\nThank you for the book you lent me. I finished it on the train home and enjoyed it very much. I will return it next week.\n\nBest wishes,\nAnna',
        'Hi team,\n\nThe report is attached. Please review the figures on page four and send any corrections by Thursday afternoon.\n\nThanks,\nPriya'
      ],
      difficulty: 5, mastery: { wpm: 45, accuracy: 92 }
    }),
    mk({
      id: 's5-10', stage: 5,
      title: 'News and Reports',
      objective: 'Formal reporting style with long clauses and semicolons. The sentences are long, so keep your eyes two lines ahead.',
      keys: [], newKeys: [],
      passages: [
        'The city council approved a new cycle route after months of public debate, promising safer streets for cyclists and more space for local shops.',
        'Figures published on Tuesday showed that rail use had risen for the fourth year in a row, although the increase was smaller than analysts had expected.'
      ],
      difficulty: 5, mastery: { wpm: 48, accuracy: 91 }
    }),
    mk({
      id: 's5-11', stage: 5,
      title: 'Mixed Difficulty Passages',
      objective: 'Long words, commas, full stops and quotes in the same block. This is close to everyday writing.',
      keys: [], newKeys: [],
      passages: [
        '"I have never seen anything quite like it," she said, and laughed.',
        'Pack my box with five dozen liquor jugs; it is, after all, a well-known exercise.',
        'Mary had a little lamb, its fleece was white as snow, and everywhere that Mary went it was sure to go.'
      ],
      difficulty: 5, mastery: { wpm: 50, accuracy: 91 }
    }),
    mk({
      id: 's5-12', stage: 5,
      title: 'Natural Prose',
      objective: 'Reading-length passages with no unusual characters. Stay relaxed: accuracy is the goal in this stage.',
      keys: [], newKeys: [],
      passages: [
        'Most people learn to type by accident, without ever being taught. They build habits that are fast but uneven, and the same two keys give them trouble for years. A short structured course avoids all of that: the fingers learn the right key first, and speed follows.',
        'A good typing practice session is not about pressing the right key as hard as you can. It is about repeating a movement clearly enough that your hands stop thinking about it. That takes minutes, not hours, and it works best when you stop while you are still doing well.'
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
        'asdf jkl fdsa lkj asdfg hjkl',
        'the the the the and and and and of of of of',
        'lkjhgf dsa lkj hgfdsa asdf fdsa',
        'that there these those then than when where'
      ],
      difficulty: 3, mastery: { wpm: 35, accuracy: 97 }
    }),
    mk({
      id: 's6-02', stage: 6,
      title: 'Finding Your Rhythm',
      objective: 'Repeat a pattern at a constant speed. Constant, not maximum: the aim is an even movement your hands can trust.',
      keys: [], newKeys: [],
      passages: [
        'a steady rhythm beats a fast start, every single time.',
        'qwert yuiop asdfg hjkl zxcvb nm',
        'typing typing typing typing typing',
        'practice practice practice practice'
      ],
      difficulty: 4, mastery: { wpm: 40, accuracy: 96 }
    }),
    mk({
      id: 's6-03', stage: 6,
      title: 'Short Words, Quick Hands',
      objective: 'Very short words in bursts. Let your hands move continuously; small words should cost almost no time.',
      keys: [], newKeys: [],
      passages: [
        'go to be do so we my me if no it in on at up us an am by or ok',
        'the an and for but not you all can had her was one our out day get',
        'a to of in it is on re at we as up so do go no me he my'
      ],
      difficulty: 4, mastery: { wpm: 60, accuracy: 95 }
    }),
    mk({
      id: 's6-04', stage: 6,
      title: 'Weak Finger Drills',
      objective: 'Short repeated groups for the fingers that strain most: the index, middle and little fingers under load.',
      keys: [], newKeys: [],
      passages: [
        'ff ff ff ff jj jj jj jj',
        'rr rr rr rr vv vv vv vv',
        'tt tt tt tt gg gg gg gg',
        'yy yy yy yy hh hh hh hh'
      ],
      difficulty: 4, mastery: { wpm: 45, accuracy: 96 }
    }),
    mk({
      id: 's6-05', stage: 6,
      title: 'Home Row Bursts',
      objective: 'Twenty seconds of pure home-row movement. Ideal as a warm-up before a timed test.',
      keys: [], newKeys: [],
      passages: [
        'asdf jkl asdf jkl asdf jkl',
        'fdsa lkj fdsa lkj fdsa lkj',
        'a;sldkfj a;sldkfj a;sldkfj'
      ],
      difficulty: 4, mastery: { wpm: 50, accuracy: 95 }
    }),
    mk({
      id: 's6-06', stage: 6,
      title: 'Top Row Bursts',
      objective: 'The same idea on the top row, where the little fingers do most of the work.',
      keys: [], newKeys: [],
      passages: [
        'qwer t yui op qwer t yui op',
        'trewq poiuy trewq poiuy',
        'qaz wsx edc rfv tgb yhn ujm iko'
      ],
      difficulty: 5, mastery: { wpm: 50, accuracy: 94 }
    }),
    mk({
      id: 's6-07', stage: 6,
      title: 'Common Words at Speed',
      objective: 'The most common words in one flowing block. Do not stop at the end of a line.',
      keys: [], newKeys: [],
      passages: [
        'the and for are but not you all can had her was one our out day get has him his how man new now old see two way who',
        'boy did its let put say she too use dad end far off own run try ask men still went does got told been called'
      ],
      difficulty: 5, mastery: { wpm: 70, accuracy: 93 }
    }),
    mk({
      id: 's6-08', stage: 6,
      title: 'Consistency Drill',
      objective: 'Mixed easy text with no long words. Hold one pace for the whole block and judge yourself on accuracy at the end.',
      keys: [], newKeys: [],
      passages: [
        'we can sit by the road and watch the light on the water, and talk about the days we had when we were young and the days',
        'he put the book on the table, put the kettle on, and then put his coat on, because the wind had come up from the west.'
      ],
      difficulty: 5, mastery: { wpm: 65, accuracy: 94 }
    }),
    mk({
      id: 's6-09', stage: 6,
      title: 'Timed Test Preparation',
      objective: 'A timed-length block of natural text with nothing unusual in it. Use this to warm up before a real timed run.',
      keys: [], newKeys: [],
      passages: [
        'Most days begin the same way: a kettle, a window, a page of notes, and a short walk before anyone else is awake. By the time the street is busy, the hard part of the day is usually already done.',
        'Good tools disappear while you use them. A well-balanced keyboard, a comfortable chair and steady practice matter far more than any setting on a screen.'
      ],
      difficulty: 5, mastery: { wpm: 60, accuracy: 94 }
    }),
    mk({
      id: 's6-10', stage: 6,
      title: 'Mistake Recovery',
      objective: 'Text that makes clumsy fingers slip: doubled letters, similar words and doubled consonants. Fix each mistake at once and move on.',
      keys: [], newKeys: [],
      passages: [
        'letter better little summer supper common people little',
        'passing address beginning necessary occasion committee parallel',
        'the the the the and and and and of of of of in in in'
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
        'Typing well is mostly a matter of trust. Early on you cannot trust your hands, so you look down to check every letter, and the checking is what makes you slow. The training is not really about moving faster; it is about removing the reason you had to look. Once the movement is familiar, the eyes can stay on the words, the words flow, and the speed arrives on its own, as a side effect of no longer having to think about the keyboard.',
        'A useful way to practise is to divide a piece of text into lines and type one line at a time, reading the next line while you type the current one. This is how reading works anyway, and it trains the only skill that matters: looking further ahead than your hands can currently manage.'
      ],
      difficulty: 5, mastery: { wpm: 65, accuracy: 93 }
    }),
    mk({
      id: 's7-02', stage: 7,
      title: 'Complex Punctuation',
      objective: 'Semicolons, dashes, brackets, ellipses and nested quotes. Type punctuation deliberately rather than rushing it.',
      keys: [], newKeys: [],
      passages: [
        '"Given the choice -- and there was one -- between typing quickly and typing well," he wrote, "I chose the option that pays in the long run: speed, which requires accuracy first."',
        'He paused (as if the thought needed checking), glanced at the clock [which said 04:15], and resumed -- quietly -- without comment...'
      ],
      difficulty: 5, mastery: { wpm: 55, accuracy: 90 }
    }),
    mk({
      id: 's7-03', stage: 7,
      title: 'Numbers and Special Characters',
      objective: 'Currency, percentages, brackets and arithmetic notation. Every Shift press has to be clean and correctly chosen.',
      keys: [], newKeys: [],
      passages: [
        'Revenue rose 14.8% to $2.31M (from $2.01M) in FY2023; operating costs fell to $1.62M.',
        'Set x = (a + b) / 2 -- note that 40% of 250 is 100, not 105.',
        'Call +44 20 7946 0812 between 09:00 and 17:00 GMT, Monday to Friday.'
      ],
      difficulty: 5, mastery: { wpm: 50, accuracy: 88 }
    }),
    mk({
      id: 's7-04', stage: 7,
      title: 'Mixed Case and Proper Nouns',
      objective: 'Headings, names and titles in the middle of sentences. Reach for the nearer Shift key every time.',
      keys: [], newKeys: [],
      passages: [
        'QUICK NOTES: The BBC, NASA and the UN were all mentioned in the briefing by Mr. Okafor and Ms. Lindqvist.',
        'Roads & Rail: A Guide to Travel in the EU, by J. R. Hartley, 3rd Edition (ISBN 978-1-4028-9462-6).'
      ],
      difficulty: 5, mastery: { wpm: 58, accuracy: 90 }
    }),
    mk({
      id: 's7-05', stage: 7,
      title: 'Advanced Vocabulary',
      objective: 'Formal and academic language with long unfamiliar shapes. Slow down for the long words, then speed up again.',
      keys: [], newKeys: [],
      passages: [
        'Notwithstanding the reservations raised by the committee, the proposal was adopted with substantial amendments, chiefly concerning procurement transparency and long-term sustainability.',
        'Her argument, though initially persuasive, rested on an incompatibility between the premises and the empirical observations subsequently reported.'
      ],
      difficulty: 5, mastery: { wpm: 55, accuracy: 91 }
    }),
    mk({
      id: 's7-06', stage: 7,
      title: 'Endurance Run',
      objective: 'A long uninterrupted stretch with no pauses. This is where the cost of hesitation shows, so resist correcting minor slips.',
      keys: [], newKeys: [],
      passages: [
        'By the time the storm reached the coast, the harbour had already been closed and the last ferry had turned back into the channel. In the streets behind the quay, shopkeepers pulled their shutters down against the wind, and the town settled into the particular silence it kept whenever something serious was happening. It would not last. By morning the sea would be flat again, the harbour would reopen, and nobody would remember how frightened they had been, except in the way they spoke to one another for a day or two afterwards.',
        'The problem with expertise is not knowing what you do not know. Experts get faster at recognising familiar situations and slower at noticing the ones that are not, and by the time the evidence accumulates that something is wrong, the pattern has usually been there for months.'
      ],
      difficulty: 5, mastery: { wpm: 65, accuracy: 92 }
    }),
    mk({
      id: 's7-07', stage: 7,
      title: 'Technical and Business',
      objective: 'Software notes, meetings and project admin. Acronyms and version numbers are the main hazard, so keep a steady digit rhythm.',
      keys: [], newKeys: [],
      passages: [
        'We shipped v2.4.1 on Tuesday; the fix for issue 1182 is in release 2.5, and the API notes are updated on the developer portal.',
        'Agenda: 1) status update, 2) Q3 budget review, 3) hiring plan for Q4, 4) open floor. Please send questions to the team by Friday.'
      ],
      difficulty: 5, mastery: { wpm: 60, accuracy: 92 }
    }),
    mk({
      id: 's7-08', stage: 7,
      title: 'Literary Prose',
      objective: 'Well-written English with a varied rhythm. Notice that the speed comes from phrasing rather than effort.',
      keys: [], newKeys: [],
      passages: [
        'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity.',
        'All happy families are alike; each unhappy family is unhappy in its own way.'
      ],
      difficulty: 5, mastery: { wpm: 60, accuracy: 93 }
    }),
    mk({
      id: 's7-09', stage: 7,
      title: 'Full Speed Run',
      objective: 'Everything at once: mixed case, punctuation, numbers and unfamiliar words. Push the pace and keep corrections quick.',
      keys: [], newKeys: [],
      passages: [
        '"You will find it," said Mr. Vance, "in the third drawer -- 2B, behind the 1997 ledger (see page 44)." She opened it: a small grey box, 14 x 9 cm, with $250 written on the lid.',
        'TOTAL: 18 items, 12.5 kg, $432.10 -- collected 3 June 2024 at 09:45 by A. Ruiz; return to counter 7.'
      ],
      difficulty: 5, mastery: { wpm: 70, accuracy: 90 }
    }),
    mk({
      id: 's7-10', stage: 7,
      title: 'Final Challenge',
      objective: 'A long mixed passage to finish the course. Everything you have learned is used here; aim to type it as one continuous run.',
      keys: [], newKeys: [],
      passages: [
        'There is no trick to touch typing, and there is no substitute for it either. You will type slowly for a week or two, then a little faster for a month, and then, one afternoon without noticing, you will realise you have stopped looking down. The keyboard has become a place your hands already know, the way a familiar staircase does. Everything after that is simply deciding how fast you want to go.',
        'Beginners are told to look at the keyboard, and they are told to look at the screen, and they are rarely told that the first few hours of learning to type are mostly uncomfortable. That is not a sign that something is wrong. It is the feeling of a skill being built, and it fades.'
      ],
      difficulty: 5, mastery: { wpm: 75, accuracy: 92 }
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
