/* =========================================================================
   Typing Master — Curriculum (lessons.js)
   -------------------------------------------------------------------------
   Pure data module. Exposes `window.TypingMasterLessons`.

   Lesson shape
   ------------
   id        : string, stable and unique ("s1-07")
   stage     : 1..8 (see STAGES)
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
    { id: 1, name: 'Home Row', summary: 'Build the foundation on the ten home keys, starting from the two index anchors and finishing with full-row sweeps.' },
    { id: 2, name: 'Key Drills', summary: 'Meet every outer key one at a time, drilled against its home-key partner - top row first, then the bottom row, ending with comma, full stop and slash.' },
    { id: 3, name: 'First Words', summary: 'Your first real words, phrases and a passage, typed with nothing but the ten home keys.' },
    { id: 4, name: 'Blending', summary: 'Blend every row with everything you know: top and bottom row pairs, alternating hands, punctuation, phrases, sentences and passages.' },
    { id: 5, name: 'Complete Alphabet', summary: 'Every key, plus capitals, numbers, quotes and the punctuation you meet in real writing.' },
    { id: 6, name: 'Words & Sentences', summary: 'Natural English: everyday vocabulary, sentences, paragraphs, letters and email.' },
    { id: 7, name: 'Speed & Accuracy', summary: 'Accuracy first, then rhythm, common-word bursts and targeted drills.' },
    { id: 8, name: 'Advanced', summary: 'Longer text, complex punctuation, technical and literary writing, endurance runs.' }
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
        "sk l f j lj kk ss jjk sl f sd lk sd sd sl ssl dsj sl ls dsl kl sl lld ll f k llf ss jl sk ff k slk s jl ss lj ds sd fs jd jks l sf fl kj dd kf lsd sd l kl sl sd sl ff s l l ds sf sk lsd ls jf s ls jj ds sl j s sl df ss slj ljl d ll j f s sf sl sll lf l sl lsj l ls lj df l lj kd ll lld sd lj lj ls dd",
        "sl ds dl l ll fsj ld sl fl sl sk sd kll f js jj l jl s f ls ks fls sdd ll fl fl kjs jf lj j df sd jl ll k jl kl fl fd lls sd js ss fs ss sl kl ff sl lj jl dk ks dl sl ss ss ll sl ll fd ls ll l ls j kj lk ll sk lfs l sss ss l lk j ks ll s l ls ls ls jdk fl ss l ss s s k ss ds lf ld ssd fk ls dl sj sl",
        "df sj dl ll ks ls d l s ls kls ll ls dl lj l l sd jl js sj jf ld s sj ss ls jf jdk ss s ss lsf l sjl ld fj dl kj dll lss js ds s ls sj lf lll d lk ss ld ll ld s l fs sk js l ls l k lsj sj sl fss ls jl l l sl ljl s s lk sj kl js kkk dl jld ll fl ss d f sk sl sl ss sf s js ljs ds dj lj j ks d dl ll sd",
        "sj kj ll kj s sl lj k skl s k ls sjs ss sf sf ls sl k lf ll ss s ss sf f sf sf ll jls lf kl ss jj js jss sj sj ss ks jls ls ls ll ls j ll sl j j kl jl sl s s sll ss ks ss l ss sl d jl ls fs ll sl f j sk lj slk ll sf kf sss sj f sk sk sfl jl k sl sk fd sfj lkl ls sl jf j jk kf fs s fs sl dk l sf fs lk",
        "slk js kl k sk lls kl l ss fk s ff dk dj sj l l ls k s l l ld ssl lf lj s j ls sl jsl k jl sf llf s fj kk sj s kjl ssf lj dsd ksl ls df f ssl s fj ls lj ll l ss kl fs dl l s d ks lk ss fs ld l l sf l dl s sl fj ls slf ll fl fs ksk ls sk s f j s dfs ls dl s fl jd ksl k df jl ll fsf lss lf sk lll fdk ds",
        "lk ls ss ls l ll sf llf fld sk l ld l kld ld dk jsj ds l d d fd ls lsf ll kkl kdl ks ss fs jll skl fs sk lk l jfl j fs ls ss dls ls sl d sk kd ff ss dj jd kl dss d s ll lk s lsl f ls fs jl sl dss ls l ljj ss ks df lj ljs lsf s j sk fs fls sl l ll lk jj j sd j lf ll sjs ss fl fj ks sk sl ll sf sk kj sss",
      ],
      difficulty: 2, mastery: { wpm: 14, accuracy: 93 }
    }),
    mk({
      id: 's1-06', stage: 1,
      title: 'Six Keys · Both Hands',
      objective: 'Now that six keys are known, alternate hands cleanly. The other hand keeps its fingers on the home row the whole time.',
      keys: ['f', 'd', 's', 'j', 'k', 'l'], newKeys: [],
      passages: [
        "dk j l l sl kk dd llk fj k fj jk fk dk fj ffj jfl fs sf kfs kj ds ssk ss k k ssk fd lj dk ll k dsk f lj dd sl jf fj lf lj lkf j fl lj kl jj kl sdk fj s ks fj fj fj lk d s d jf fk fk ddk sf ll f sd ll jf fd l d dj kl dd fsl slj j ds l l f dl fs fss jl j dj sdl j sf jl jl s sl kj dd jsj dj dl sl sf jj",
        "ds jf jj s jd lfl sj ds ls fs dk fj kss k lf ll s ls f k dd kf lsf djk ss kj ls kld ll sl l jk dj lj js k ld ks ls lk ssf fk ld fd kd ff ds ks kl fs dl lj jk kd ks fj ff fd ss fd ds lk dd sj j jf l kl jk jj fk slf d dfd ff d jk l kf js d j sd sf sf ljk ls dd s fd d f k fd kd sk sj fdk lk sf ks dl ds",
        "jk fl ks ss kd sf j s d sd kjf dj jd js sl s s dk ls lf dl ll sj f dl ff jf lk ljk fd f df jdl j dls jj kl ks kl jsd sfd lf kd f df fl jk sss j sk df sj js jk f s lf dk lf s sf s k ddl fl fj ldd jd ld s d fs sls d d sk dl ks lf kkk jj lsj ss kj ff j l fk dj fj ff dl d lf jlf kd jl sl l kd j js ss dk",
        "dl kl jj kl f fs sl k dkj d k jd dld df fk dk jd dj k sk jj df d df dk l fl dk ss lsd jl ks ff ll ld lff dl dl fd kf ljf jf jd js sf l ss fd l l ks lj ds f d djd fd kf ff s ff fd k ls sf lf sj fd l l fk dl dsk js dl kl fdd fl k dk fk fls ls k fs dk lj dll sks sd ds lk l lk kl ld d lf ds kk s dl kd dk",
        "dsk ld kj k fk ssd kd j df lk d ll jk jl fl s j df k d j s sj ddj jl sl d l jd fs lds k lj dl sjk d kl kk fl f kls dfk jl kdj kds dd kl l ffs d kl sf jl sj s df kj lf jj s f j kd sk ff lf sj s j fl s js f ds ll jf dsl dj lj lf kdk jd dk f l l f kld df jd d ls lj kfd k jk ld sj ldl sff sl fk jss ljk jf",
        "sk jd df sf j sd fl jsk kjj dk j jj s ksk sj jk lfl jf s j k lj sd jdl sj kks kjs kf dd lf lss fkj kd fk jk s lks l ld sf df jdd jd fs j fk kj ll dd jl lk ks jdf j f js sk d jfs l sf lf ld dj jdf sf j sll df kd jl dl dld sfl f l fk lf lsf fs s jd jk ll l fj l sl jj dlf ff ls ll kf fk ds js dk fk kl fdf",
      ],
      difficulty: 2, mastery: { wpm: 16, accuracy: 92 }
    }),
    mk({
      id: 's1-07', stage: 1,
      title: 'A and the Semicolon Key',
      objective: 'Finish the outer home keys with the little fingers. A sits under Q and the semicolon key sits under P.',
      keys: ['a', ';', 's', 'l', 'd', 'k', 'f'], newKeys: ['a', ';'],
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
        "jl l ; ; k; ll jk ;;l jk l jl ll jl jl jk jjk lj; jk kj ljk lk jk kkl kk l l kkl jj ;l jl ;l l kkl j ;l jj k; lj jl lj ;l ;lj k j k;k l; ll ll kjl jl k lk jk jl jk ll k k k lj jl jl kjl kj ;l j kj ;; lj jk ; j jk l; jk jk; k;l l kk ; ; j j; jk jkk kl k kk kk; l kj k; ll k k jll k ;k ll lk ;l ;l jk lk",
        "k lj l jk kk ;j; kl jk lk jk jl jl lkk l ;j ;; k ;k j l kj lj ;kj jll kk lk ;k l;j ;; k; ; ll jl ; ll jl ;k lk ;k ll kkj jl ;j j l jk j jk lk l; jk k; ;k ll lj lk jk jj jj kk jk kk ;l kk kk k lj ; l lkl k lj ;k jj ;k k jj k ll ; lj lk j l kj kj kj ;ll ;k jj k jj k j l jj lj kl kl jjl ll kj lk j; jk ll",
        "j; lk kk lj kj l k j kj lkj kk lj lk k; k k jl ;k ;j j; ;; kl j j kjj kj ; ;; lk j j jj lkl k j;k kl l; lk l; lkk kjj ; j jj k jk ; kl kkk l kl jj k lk lk jj k ;j jl ;j k kj k l kj; j; jk ljj lj ;k k k jk k;k j j kl j; lk ;j lll ll ;kl kk lk jj l ; jl jk jk jj jl j ;j k;j l kl lk; ; lj l l jk jj jj kl;",
        "lk l; j jk k; l jll j l lj k;j jj jl jl k l k l kl kk jj j jj jl l j; jl kk ;kj k; l lj l ;j; l jjl ; j; jj lj ;kj lj kj kk kj ; kk jk ; ; lk ;k kk j j jkk jj lj jj k jj jk l ;k kj lj kk j jl ; jl k; jkl kk jl l ;j j j; l jl jl jlk ;k l jk jl ll j;; klk kk jk ;l ; ;l l k;k j ;j jk ll k j; lj kl jkl ;j",
        "ll l jl kkj lk k jj ;l j ;; ll l; j; k k kj l j k k kl jjk k kk jjj kkj jk ;jk l ;l j; kkl k l; ll j; j l;k jjl k; ljl ljk k kl j;; j jj l; kj k; kl k jj lk ;j lk k j l lj kl jj lj kl k l jl k lk j jk ;; lj jk; kk ll lj ljl kk jl j ; ; j l;j kj lk j ;k ;l ljk l ll ;k kl ;j; kjj k; jl lkk ;ll lj kl kj",
        "jj kj k kk j; kkl lkl jl l ll k lkl kl l ;; ; l j jl l ll kj lk; kl llk llk lj jj ;j ;kk jll lj jl ll k ;lk ; ;j kj jj lkj kj jk l jl ll ; ljj l; ; ll ;l jj jj kk kl j kjk ; kj lj ;k j ;l jl jj ;k ;kj k jk lk ;; ;j kjl j ; jl ;j lkj jk k kk kl ;; ; jl ; k; kl j;j jj ;k l; lj jl jk kk jl jl l; jjj ;k",
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
        "dk h l ; f; kk dd ;;k sh l aj hk aj sj ah sah ja; ag ga jsg kh dg fgj gg l k ggl sd ;h dk ll k dgk s ;h dd g; ja aj la ;j ;ks h al lh k; jj kl fdj sj f kf ah sj ah ll d g f ja al ak fdj fs ;l a gs ;; ja af ; s sh jl dd af; g;h j ff ; l a sl sg aff hl h dh gd; h fa h; jl g f; kj ff hgj dj f; g; gs jj",
        "dg ja j sg hf la; fj df lg sg dk aj kfg l ;a ;; f ;f a l fd ka lfs djj fg lh lf k;d ;l f; ; jl dj ; jh ak ;f kg lf lj fga aj ;d ad ls ss dg kf ll sg f; ;h jk kd jf ah as ss gf af fg lj fd gh h hs ; k khk h js ;g as ;d d as f hk ; ka hg d h gd gs ga ;jk lg dd g sd d s k ad jd gl gj asj lk gs jg d; sf",
        "jl a; jg gg kd ga j f d gs khs fh hd jf g; g f sj ;g ;a d; ;l gj s d hss ha ;l ;jk ad s da hdl h d;g hj l; jg k; jff fsd ;a jd s fs a; hl fgf j gk da gj hf hj s f ls dk ;a g fs g k fd; s; ah lsd hd ;f f f af f;g d d gk d; kg ;s kkk jh ;gj ff lh as j l ak dh sh as sl d ;s h;s j gj hg; ; kd j jf gg sj",
        "s; k; hh k; a af f; k dkh d k hs d;s ds sl sl h j h k gl hh ds s da dl l sl dl fg ;gs hl k ja h ;d; l aal ; d; as ka ;ha ha hd hg gs ; ff af ; ; kf ;h dg s s dhf sd ks sa f sa af j ;g gs ls gh sf l ; ak f; dfk hg sl k ;s df ; l dk sk slf ;f k sf dk lj dl; fkf gd dg ;l ; ;k k fld d la sg jk g sl ld fk",
        "sgk ;d kh k sk ggd kf h da lk s ll jk j; s; g h fa k d h f gj ddh hl f; d ; hs af ;df k ;h dl ghl d l; kk s; a k;f dal h; jdj kdg fd jl l sag s l; ga h; fh f da kh la jh g a j kd gk sa la fj g h sl g jf s dg l; ha dfl fh lh la kdk hd dk a l ; a jls fs jf d lf ;j kaf k jl ;f gh ldl fsa fl ak hgf ljk js",
        "gk hs sa ga h gf sl hfl lhj dk h hj g kfj gj j ;; ; ja g j j lj fd hdl gh kkf kjf ks ds ls ;fg skh ls sk hk f ;lf ; ld fa sa jfd hd ag j ak kj l kdd j; ;j kg jds j a hg gk d hag l gs ls ;f dh jds ga h f;; da ks jl f; f;s gal a ; sk la lgs ag g hf hk ;; ; sj ; fl hh d;a ss lg l; ka ak df hg dl ak k; asa",
      ],
      difficulty: 3, mastery: { wpm: 20, accuracy: 92 }
    }),
  ];

  /* =======================================================================
     STAGE 2 — KEY COLUMN DRILLS (TOP ROW, THEN BOTTOM ROW)
     ====================================================================== */

  var STAGE2 = [
    mk({
      id: 's2-aq', stage: 2,
      title: 'A and Q',
      objective: 'Drill the left pinky column: Q sits one row above A. Reach up and out with the little finger, type, and drop straight back down without looking.',
      keys: ['q', 'a'], newKeys: ['q'],
      passages: [
        "qa aa qq aq aq qa qa qq aq aq qq aq qq qa qq qq qq aq aq qq qq qq aq qa aa aq aq aa qa aq aa aa qa aa qa aq aq qq qq qa aa aq qq aa qa qq qa aq aq aa qq aq qa qa qa qa qa aq aq aa qa qq qq qa qq qa qa qq qa aq aq qa qa qa aa qa qq aa aa qq aa aa aa aa qa aq aa qq aa qa qq aa aa qa qa aq aa qa qq qq aa aq qa qa qa qq qq aa qa qq aq aq aa aa",
        "qa aa qq aq aq a qq qq qa qq q aq aa a q q aq qq qq q qq aq aa qa aq aa a a qq a aq aa aq a qa qq q a aq q aa aq qa aa aq q qa aa q a qq qq aq aa qq qq qq aa q aq q q a qa a aa aa qa qq qq aa aq aa qa qq aa q aa aa q aa qa aa aa qq aq qq q q qq aq a aa q a qq aq a qq aa aa qa qa q aa a qa qa aa qa a aq a aq a qq a a qa qq qa q q qq q aq aa",
        "qa aa qq aq qa aq aq qa aq qa qa aq qa qa qa qa aq qa qa qa aq qa qa qa qa aq aq aq qa aq qa qa aq aq aq qa qa aq aq aq qa aq aq aq aq qa aq qa aq qa aq qa qa aq qa aq aq aq aq aq aq aq qa qa qa qa qa aq aq qa qa aq aq qa qa qa qa aq aq qa qa aq qa aq qa aq qa qa aq aq qa aq qa qa qa qa aq qa aq aq qa qa qa qa qa aq qa qa qa qa qa qa qa aq",
        "qa aa qq aq aq q q a qa a q qa q aa q a aq aq qa aq a aq aq aa qq q q qq a qq qa a q a aq a a qa qq q aq aq a qq q q q a q aa q qa q a a a aa a a a a a a qa aq a aq qq a a aa q qq qa a aa aa aq a qa q qa qq a aq qa qq a aa aa a q aq qa a aa aq q qa a a aa q aq aq aq q aq qa q aq aq q q qq q qq aq a a aq qq qa aq aq a a a aq a aq qq q a q aq",
      ],
      difficulty: 2, mastery: { wpm: 14, accuracy: 92 }
    }),
    mk({
      id: 's2-sw', stage: 2,
      title: 'S and W',
      objective: 'Drill the left ring-finger column: W sits one row above S. It should feel like a small step up and down, never a leap.',
      keys: ['w', 's'], newKeys: ['w'],
      passages: [
        "ws ss ww sw ww ws ss ss ww sw sw ws ws ws ws ww ws sw ws ss ww ws ws ss ws sw sw ss ws ww sw ws ww sw ss sw ww ww ww ws ww ww ws sw ss ws ws sw ws ww ss ss ww ws sw sw sw ss ws sw ws sw sw ss ws sw ss ws ws ss ws ww ww ws ws sw ww ww ws ww ss sw ws ss ws ww ww ww ss ww ss sw ws sw ws ss ww sw sw sw ww ww ww ws ws ss ww ss ss ws ss ss sw ww",
        "ws ss ww sw ws ss ss s sw ss s ss ss sw ws sw ss ws ww w ww sw s w s ww ws w s sw ss s s ws s ss ws ss sw ww s w s s s ww ss sw s ww ww ws ww ws sw ws ss ss w ww sw s w sw s sw ws sw ws w sw sw ss s sw ws ss s ws ss sw w ss ww sw ss s ws s w ww sw ss ss ws s ss ww ss w sw w ss ws s ss s w w ww sw sw s w w sw ws ws ww ww ws ws s w w s w ww",
        "ws ss ww sw sw sw ws ws sw ws ws ws sw sw ws ws ws sw ws ws sw ws ws ws sw ws ws sw sw ws sw sw ws ws ws sw sw ws sw ws ws sw sw ws sw ws sw sw ws sw sw ws sw ws ws sw sw sw sw sw ws ws ws sw ws sw ws ws sw sw sw sw ws sw sw sw sw sw sw sw sw sw sw ws sw sw ws ws ws sw ws sw sw ws sw ws ws sw sw sw sw ws sw ws sw ws ws ws ws sw ws ws ws sw",
        "ws ss ww sw ss ss ws w sw s s s ws w s sw s s ww ww ws sw ss sw w ss ww w s s s w w w ws sw s ss s ss ws ws w s sw sw ww ww ws ss ws s s ws ws s ss ws w sw ww ws s s w ww ss w s w ww s w w w s s w ss ww ws w ws s ww w ss ws ss s ss w s ss ww ww s s ww ws sw w s sw w s sw s w w ss w s s w ww w s s ws ws ss w w w ws w s s ss ws w ws ss sw w",
      ],
      difficulty: 2, mastery: { wpm: 15, accuracy: 92 }
    }),
    mk({
      id: 's2-ed', stage: 2,
      title: 'D and E',
      objective: 'Drill the left middle-finger column: E sits one row above D. Middle fingers reach up and return without lifting the hand.',
      keys: ['e', 'd'], newKeys: ['e'],
      passages: [
        "ed dd ee de ee de ee dd dd dd dd de ee ee ee ee ed dd dd ee dd dd dd ed ee de ee dd ee de dd ee ee de ed ed ee ed de dd de ed de de ee dd ee ed ee ee de de dd de dd ee ed ed ed de ee de de ee ed ed de ee ed dd dd de ee ed ed de ee ed dd dd ed dd ed dd de ee de de ee dd ee ed ee ed ed ee dd ee ee ee ee dd ed dd ed ed ee de ed de ed ee de de",
        "ed dd ee de dd d ed ee e dd d e ee e de ee d e ed d dd e ee dd dd dd de e ee ee e e dd ed de d d e ed e ed dd ee dd ee ed d d ee de de de ed ed ed e e de dd ed dd e d ee ee e d de dd ed e d e e de dd e ed ee d dd dd d ed de ed e e ed ee dd ee d d dd ed e e e ed d de dd e ed e dd e de e e ed dd ed ed dd dd de ed d e de de ee ee d e dd d ed",
        "ed dd ee de ed ed de ed ed ed ed ed de ed ed ed ed ed ed ed de ed ed de ed ed ed de ed ed ed de de ed ed de ed ed de ed ed ed ed ed ed ed ed de ed de ed de ed de de de ed ed ed ed de de ed de ed de de de de ed ed de de de ed de de ed de ed ed ed de de ed ed de de de de ed de ed ed ed de de ed ed ed de ed ed ed de de de de ed ed de ed de ed",
        "ed dd ee de e de ed de ed dd ed dd ed dd d e ee ed ee d dd ee de ed d d dd d de e d dd ee d ed de dd e ed ed e d d d ed dd dd ed d e dd ed ee d de e de d d e ed e ee ed e dd d de ed d dd de e e d d d de ee ee de dd dd e dd ee d ed e de e ed dd d d ed e ee dd ee d ed e dd dd ed d e e d ed ee d e de d e de d e e dd d ed de dd e de e dd d d d",
      ],
      difficulty: 2, mastery: { wpm: 16, accuracy: 92 }
    }),
    mk({
      id: 's2-fr', stage: 2,
      title: 'F and R',
      objective: 'Drill the left index column: R sits one key above and to the left of F. Let the index finger pivot up, type, and rest back on its anchor.',
      keys: ['r', 'f'], newKeys: ['r'],
      passages: [
        "rf ff rr fr ff ff rr rf ff fr rf ff rf rr rr rf rf rf rf rr fr rf fr rf rf fr rr rr fr rf rr ff rr fr ff fr ff ff rf rf fr rr fr rf ff ff rr rr rf ff ff ff fr rr fr rr rr rf fr rf rf fr ff fr ff ff ff rr ff ff ff rr fr rf rf rf rr ff rf fr ff rr fr rf ff rf rr ff fr fr fr fr rf rf rr fr rr ff fr ff ff fr rr fr rf fr fr fr ff ff rf fr ff ff",
        "rf ff rr fr rr rr ff rf rf ff rf fr rf rf rr r rf rf fr ff f rr r r rr ff f rf r f fr fr f rr rf rr rr ff rf f rr fr r rf ff ff ff f rr r rf fr rf fr f rf f ff f rr rr rr ff rr ff rr r r rf rr fr r fr rf f f rf r r rr fr rr fr rr r r ff rr ff rr f fr r fr rf rr ff ff f ff ff ff r fr fr rf f ff ff fr rf fr f fr rf ff r rr r rf rr rf rf rr r",
        "rf ff rr fr rf rf fr rf fr rf rf rf rf fr fr rf rf fr fr fr rf fr rf rf fr rf rf fr fr rf rf rf rf rf rf fr fr rf rf rf fr fr rf rf fr fr fr rf fr rf fr fr rf fr fr fr rf fr rf rf fr fr fr fr rf rf rf fr fr fr rf rf rf fr rf rf fr fr fr rf fr rf rf rf rf fr rf fr fr rf fr rf fr rf rf fr fr fr rf rf fr fr fr rf fr fr fr fr fr rf rf fr rf rf",
        "rf ff rr fr rf r rf r rf rf r rr r r r r rf f rf ff r r r rf ff rr r f f rr rr ff r rr r f rf f rf rf rr ff f rr fr rr rf f fr f rf fr f rf rf rr fr rf r r rf rr f f f r r r f rr ff f r f f r f r rr ff fr r f f ff r r rf r ff rr rr ff r rf ff rf rr r r r r fr f r ff rf f f f f rr fr f rr ff fr r rf fr rr r f f r f r rr f r f r r ff rf rr rf",
      ],
      difficulty: 2, mastery: { wpm: 16, accuracy: 92 }
    }),
    mk({
      id: 's2-gt', stage: 2,
      title: 'G and T',
      objective: 'Drill the left stretch column: T sits a full row above G. Rock the index finger up for every T and settle it straight back on G.',
      keys: ['t', 'g'], newKeys: ['t'],
      passages: [
        "tg gg tt gt tg gt tg tg tg tt tt gg tt tt tg tt tg gt gg tt gg gt tg tg gg gt tt tt tt tg tg tt gt tt tg gg gg tg gt gg gt tg gg tt tt gg gg gt gg tg gg gg tt tg gt tg tg tg gt tt tt gg tg gg tt tg tg gt gg tt gt tg gt gg gt tg tg tg tg gt gt tt tt gg gg gg tt gt tg gg gt tg tt tg tg gt gt tg gt tt gg gt gg tg tt gg tt tt gg gg gg tt gt tg",
        "tg gg tt gt tg gg gg g tt gt t g tt g t tt g t gg gt gt t gt gg tg tt t tg tt g g tg gt t gg tg gt gg t gg g tt tt tt g tt tg t tg tg gt g t t gt tt g gg tt gt t gg tt gt gt g t tg gg tt g tg t gg tt tg gg tt t gt g gg g t t tg tg tg gg tt tt gg t tt tg g t gg tg gg gg tg tg g gt t tg tg t gt g gg gt tt gg t g tt tt gg tt gt g tt gt tg tt",
        "tg gg tt gt gt tg tg tg gt tg gt gt tg gt tg gt tg tg gt tg tg tg gt gt tg tg gt tg gt tg tg gt gt tg tg tg tg gt tg tg tg gt gt gt tg tg gt gt gt gt tg tg gt gt tg tg gt gt tg gt gt tg gt tg gt tg gt tg tg tg tg tg tg gt tg gt gt tg gt gt gt gt tg gt gt gt tg tg tg gt gt gt gt gt tg tg gt tg tg tg tg tg gt tg gt gt gt gt gt gt gt tg tg tg",
        "tg gg tt gt tt gg gg g tt t t gg t g t t g g t gt t g g g g g g gt tt tt tg gg tt tg g t gt tt g tt tg gg t tt gg t t gt g tg t gt t g t t g tt g gg tg gg t t t gg t t tg tt gg t gg g gg t t g gg tt gg gg gt tt g g t t g t t tt gg g t tg g g tg g t g gg g t g t tg tg tg t tg tg g tt g g g gg g t g g t g t g gt tg t g t gt t g g gg tg g gg",
      ],
      difficulty: 2, mastery: { wpm: 17, accuracy: 92 }
    }),
    mk({
      id: 's2-hy', stage: 2,
      title: 'H and Y',
      objective: 'Drill the right-hand stretch: Y sits a full row above H. Reach up and slightly left each time, then let the finger fall back on H.',
      keys: ['y', 'h'], newKeys: ['y'],
      passages: [
        "yh hh yy hy hh yh hy yh yh hy hy yy hy yy hy yh yy hy hy hh yh yh yh yy yy hy yh hy yh hy yh yy yh hh yy yy yy hy yy yh yh yy yh hh hy hy yh hh yy yh yy yy hy hy yh hy yh yy yh yh hy hh hy yh yy hh yh yy hy hh hy hh yh yy hh hy yh yh yh hy hy hy hy hy yy yh yh yy hy yy yy yh hy hy hy hy yh yy yh yh hy yh hh yy hh hy hy yh hy yh yy yh hy yh",
        "yh hh yy hy h yh h h yy hy yh h h y hh hy h y y h yy h yy y hh yy yy hy hy hh hy yy hy yh yh hy yh yh hh y h hh h yh hy yy yh yy y y y y y yy yy h h hy yy h y h yy hy yh hy yy hh hh hy h yh hh y y y yh h hy yh yy h hy hh hh hh yy hh h yy hy yh yh yy hh h y h yy yy h h hh hy yy hy hh y hh yy hy h h hh yh y yh yy hy yy hh yh yh yy yh yy hy hy",
        "yh hh yy hy hy hy hy yh yh yh hy yh hy yh yh hy hy hy yh yh yh yh hy yh yh yh hy yh yh yh hy yh yh hy hy yh yh yh hy yh yh yh yh hy yh yh hy yh yh yh hy yh hy yh yh hy hy hy yh yh yh yh yh hy yh hy hy hy hy yh hy hy yh hy yh hy hy yh yh hy yh hy hy hy hy hy yh yh yh hy hy yh hy hy yh hy yh yh yh yh yh hy yh yh hy hy yh hy hy yh hy yh hy yh",
        "yh hh yy hy h hh h y yh hh y y hh hh h hy h yh h y hh yy yy hy yy hh hh yh y hh h y h y hh h y y h y yy h y y hh h h yy hh yh yy y y hy y y h yy hh yy hh hh h yy yh yy hy h hy yh h hh y hh hh h hy h h yh y yy h yh h y yh hh h y y hh y hy yh yy y hy y h yh h yy hy h yh yh hh h yh h h hy hy h h hy hy yh y yh h y h yy h h yy yh h h hy y yy y",
      ],
      difficulty: 2, mastery: { wpm: 17, accuracy: 92 }
    }),
    mk({
      id: 's2-ju', stage: 2,
      title: 'J and U',
      objective: 'Drill the right index column: U sits one key above and to the left of J. Pivot up, type, and drop home without looking.',
      keys: ['u', 'j'], newKeys: ['u'],
      passages: [
        "uj jj uu ju jj jj jj uu uj ju ju jj ju uj ju uj uu uj uj uu ju uj ju uu uu uj jj uj uj uj uu uj uu ju ju ju ju uu jj uu uj ju ju ju uj jj uu jj uu ju ju uu uj ju uj jj uu ju ju uj jj uu ju uj jj ju uu uu uu uj uj uu uj ju uj uj uu jj ju uu uu uj ju jj ju uu jj jj jj uu jj ju uu jj jj uj uu uj jj ju uu uj uu uj uu ju uu uj ju jj jj uu jj jj",
        "uj jj uu ju jj ju j uj uu j jj uj jj u uu u jj uj ju u uj ju j uj u ju jj u ju jj uj ju u uj j u jj j j uj u ju uu jj uu uu uu ju ju ju u ju uu uj uj ju j uj u jj u jj jj jj ju uj uu uj uu jj ju uu u u j uu u jj ju j ju ju j uj uu uj j uj u j jj j uu uu ju u uj uu u ju u jj jj j uj uj uu ju u ju uj j jj jj jj uu uu jj ju j jj u j j uu uu j",
        "uj jj uu ju uj ju uj uj ju ju uj uj ju uj ju uj uj uj uj uj ju uj ju uj uj uj ju ju ju ju uj ju uj uj ju uj ju ju ju ju uj ju ju uj uj ju ju uj uj ju uj ju ju ju uj ju uj uj ju ju uj uj ju uj ju ju ju ju uj uj ju uj ju uj ju ju ju uj uj uj ju ju ju ju uj ju ju uj ju ju uj uj uj ju uj ju ju ju uj uj ju ju uj ju ju ju ju ju ju uj ju ju uj ju",
        "uj jj uu ju u uu ju uj jj ju j u uj j u j ju j u uj jj j uj j u j uu j jj jj j j jj uj j uj uu uu j uu u uu j uu uj j uj j uj u j u u uu uj j uj uj jj u uu u j j ju uj ju ju ju j u u uj j uu ju uj jj ju j j jj jj uj uu u j uu j u uu u j u u u uj uu u jj uu j ju jj uu ju u j j uj uu j j j u jj jj uj jj uu jj u uu j uu u u j j ju u uu j j j",
      ],
      difficulty: 2, mastery: { wpm: 18, accuracy: 92 }
    }),
    mk({
      id: 's2-ki', stage: 2,
      title: 'K and I',
      objective: 'Drill the right middle-finger column: I sits one row above K. Make this reach automatic; the middle finger does it constantly in real words.',
      keys: ['i', 'k'], newKeys: ['i'],
      passages: [
        "ik kk ii ki kk ki kk ii ii kk ik ki ki ii ki kk kk ii ki ii kk kk ki ki ki ik ki ki kk ii kk ki ii ii ik ik ii ki ki kk ik ki kk ik ii kk ki ii kk kk ik kk kk ik ik ii ii ik ki ik ik ki ki ik kk ik kk kk ii ki kk ii kk ik ik ii ik ik kk ik ki kk ki ik kk ki ki ik ik ki ki ki ik ki kk ii kk ii ik ik kk ik kk kk ki ii ik ik ki ii kk ki ii ii",
        "ik kk ii ki ik k ki i kk i k kk k i i ik ii i ii ii ki ik kk ik k i ki ki ki ii k ik ik ik kk k i ki ik ik kk kk ik ii i ki ii i i k ki ki ii k ik ki i k ik ik ki k ii i ii i k ii ii ii ik ii kk kk ii ik ii ii ik ii kk kk ik k ii ki ik ki k i k i ki ik ik kk i kk i ii ki ki ki ii k i kk i kk i ik ki ik kk i ik ii ii ik ii ii k k ii kk ii k",
        "ik kk ii ki ik ki ik ki ik ki ki ki ki ik ki ki ik ik ki ik ki ki ki ik ki ik ki ik ik ki ki ki ki ki ki ik ik ik ki ki ik ki ki ki ki ik ki ik ki ik ik ik ik ki ik ki ik ki ki ik ki ki ki ik ki ik ik ik ki ik ki ik ik ki ik ki ik ik ki ik ki ik ki ik ik ik ki ki ik ik ki ki ki ik ki ik ik ik ik ki ik ik ki ki ki ik ik ki ik ki ik ki ik ik",
        "ik kk ii ki kk i k ik i kk i k ki k ii i k ii ki k k k ii k i i ik ii ki k ii ki i kk ki kk i i k ii k k kk i ik k ii ki i i k ik ki kk k kk ii i i i ki ii i ki ki k i ki i k ii i ii i i i ii k i ii i ki k i ki i k kk ik k k kk ik ki ik i kk ii k kk ik i i i kk ki i ik i ii k i i i k ki ik kk k ik ii k ki kk ii kk k ki i ik k ii ki ik i k",
      ],
      difficulty: 2, mastery: { wpm: 18, accuracy: 92 }
    }),
    mk({
      id: 's2-lo', stage: 2,
      title: 'L and O',
      objective: 'Drill the right ring-finger column: O sits one row above L. Keep the wrist still and let the finger make the small reach.',
      keys: ['o', 'l'], newKeys: ['o'],
      passages: [
        "ol ll oo lo oo ol ll oo ll lo ol lo ol lo ll lo ol oo oo lo ll ll ol oo ll ol ol oo oo lo ol ll ol ll lo ll ol ol oo oo oo oo ol ll lo lo oo oo ol ll ol ol ll ll lo lo ol ol lo ll oo ol ol ol lo ll oo ol lo ll ll lo ll ol ll lo ol ol oo oo lo ll lo lo ll ol oo lo lo ol lo oo ll lo ll ol oo oo oo ll ol ll ll ol oo oo ll ll ol ol ol lo lo lo",
        "ol ll oo lo ll oo ll l ol o ll ll l lo o l ol l lo ol ll o oo lo ll l lo ol oo o l oo ll ll lo lo l oo oo o oo ll oo ol ll ll l l lo ol lo l l o ll ll l o oo ll ol lo ll ol lo oo l o o ll oo ol oo ol o oo ol oo l oo l ll ll lo oo ll oo l lo ll ol l lo ll oo oo ll o ol l ll lo lo oo ll l o ll lo l lo l o ll o oo lo l ll ll ll oo ol o lo ll",
        "ol ll oo lo lo ol lo lo lo ol lo lo ol lo ol lo lo ol ol lo ol ol lo ol ol ol lo ol ol ol lo ol lo lo lo lo lo ol ol lo lo ol ol lo ol ol ol lo ol lo ol ol ol ol ol lo ol ol lo lo ol ol lo lo ol ol ol ol ol lo ol ol lo ol lo lo ol lo lo lo lo ol ol ol ol lo lo ol ol ol ol lo ol ol lo lo ol lo lo ol lo lo lo lo ol ol lo lo lo lo lo ol lo lo",
        "ol ll oo lo o ll l o ol o l ll o ll lo lo o l o o l l o ol lo oo lo o l o ol ol ol o ll oo oo o l l l ol l lo l lo ll ll lo ll ol ll lo o o o o o o o l lo ol l ol o oo l l l o ol l ol l oo l ll l o ll l l l l ll o ol oo l l o lo o o ll ol ol o l ll o o ll o l l l o l ol ll l l o l l o o l o ol lo l l o o l ol l lo o o l lo l l l lo o l ll",
      ],
      difficulty: 2, mastery: { wpm: 19, accuracy: 92 }
    }),
    mk({
      id: 's2-sp', stage: 2,
      title: 'P and the Semicolon Key',
      objective: 'Drill the right pinky column: P sits one row above the semicolon key. Little fingers stretch up, type, and return home at once.',
      keys: ['p', ';'], newKeys: ['p'],
      passages: [
        "p; ;; pp ;p p; ;p pp ;p p; ;; ;p ;; pp ;; pp ;; p; ;; ;; ;p pp p; pp p; pp ;; ;p p; ;; p; p; p; ;; ;; pp pp pp ;; p; p; pp ;p ;p ;p pp pp pp ;; pp ;; pp ;p ;p pp ;; p; pp ;p ;p ;p ;p ;; ;; ;; p; pp ;; ;p pp ;p ;; p; p; ;p ;; ;; p; p; ;; pp pp p; ;p p; p; ;; p; pp ;; pp pp p; p; p; ;p p; p; p; ;; pp ;; pp ;p ;; ;; p; p; ;; ;p pp ;; ;p ;p pp",
        "p; ;; pp ;p ;p pp ; p; pp pp p p ;; ;; p p; p ;; ; p; ; ;p p p ;p p; p p; p; ;; ;p p p; p; p; p p; p pp p; p pp p; p ;; p; ; p; pp pp p; ; p p pp ;p ;; p p; ; ;; pp ;; ;p p p ; ; ; ;; p p ;p ;p p; pp p p; pp pp ;p pp ;; p p; ;p p ;; p; p p; ; ;p ; ; p pp p; ; pp ; ;p pp ;; p ;p pp p p ;p p; ; p; ;; ;p pp ; p ; ; ; ; p ; ;p pp ;p p ;; ; pp",
        "p; ;; pp ;p p; p; ;p p; p; ;p ;p ;p p; p; ;p p; ;p ;p p; p; p; ;p ;p ;p p; ;p p; ;p p; ;p ;p p; ;p ;p ;p p; ;p ;p p; p; ;p ;p p; p; p; ;p p; ;p ;p ;p p; ;p p; p; p; ;p p; ;p p; p; p; ;p p; ;p p; ;p ;p ;p ;p ;p ;p ;p ;p ;p p; ;p ;p ;p p; ;p p; p; ;p ;p p; p; p; ;p ;p ;p p; ;p p; ;p ;p p; ;p ;p p; p; ;p p; p; ;p ;p p; p; p; ;p ;p p; ;p ;p p;",
        "p; ;; pp ;p ; p ;p ;p p pp p p p; p ; p p; p p; ; p p pp p; p p pp ;; ;p ;; ; p pp pp ; ; p; ;; p ; p; ; ;p ;; ; pp ; p; pp ; pp ;; pp ; p ; p ; ; p p p p p p; p p; ; ; pp p p ;p ;p ; ; ; ; p; p; p; p ; ; ; p ;; p ; p; ;p p; pp p ; p pp ;p p; p; ;p p; p ;; ;p p ;p ;; p ; pp p; ;; ;p p; ;p pp p ;; p p p ;; pp ;p ; ; p; pp ; p ; ;; ; pp ; ;;",
      ],
      difficulty: 2, mastery: { wpm: 19, accuracy: 92 }
    }),    mk({
      id: 's3-az', stage: 2,
      title: 'A and Z',
      objective: 'Drill the left pinky column downward: Z sits one row below A. Curl the little finger a little further, type, and return to A.',
      keys: ['z', 'a'], newKeys: ['z'],
      passages: [
        "za aa zz az aa az az zz za zz zz aa aa az zz zz za aa aa az az za az za za zz aa az zz aa za aa az aa az aa za aa zz za az za az za az aa aa az za az za az az az az az az zz az aa za az aa za za zz az za az aa aa za za aa az az aa zz za za za aa aa zz aa az zz zz zz za aa zz zz az zz zz zz aa zz aa za aa aa az za zz za aa aa zz zz aa za aa",
        "za aa zz az zz az z aa aa za az aa az zz a a a aa za aa a az zz aa zz za aa a a za zz aa za a a a aa z z az za z za aa zz z az aa zz za z az zz aa aa a az zz aa za zz aa zz aa a z a za az az aa a az z az az az zz az a z z zz az za aa aa aa aa az a aa a za a az zz z zz za a za aa z a aa az za z aa z aa zz aa a a zz zz aa a aa az z zz zz z aa",
        "za aa zz az za za az za az az az za az za za za za az za za za za za az az za az za za az az az za az az za za za za za az az az za za za az za za za za za az az az az za za az za za az za za za za az az za az az za az az az az az za az za za za za za za za za za za za az az az za az az za za az az za az az za az az az za az za az az za za",
        "za aa zz az za z z a za aa az a a za az zz a za z a z zz z aa aa za z a z aa az z z az aa z az za z zz aa a aa a z az aa a zz az zz z a zz a a a za a a aa zz az aa z aa aa zz zz zz aa a z az zz zz a a za za aa az zz a aa aa z az a a zz az za a z zz a z a a za z az az za az aa a za az a z az z az zz z a za z az za a aa a z aa zz za z za a z",
      ],
      difficulty: 2, mastery: { wpm: 19, accuracy: 91 }
    }),
    mk({
      id: 's3-sx', stage: 2,
      title: 'S and X',
      objective: 'Drill the left ring-finger column: X sits one row below S. Curl the ring finger straight down and come straight home.',
      keys: ['x', 's'], newKeys: ['x'],
      passages: [
        "xs ss xx sx sx xs xx xs ss ss xs xx ss sx xs sx xx xs xs xs sx ss sx sx ss xx sx xx sx sx xx xx xx xx xx sx sx xs ss xs xs xs ss xs ss ss ss ss sx sx sx xx ss sx ss xs xs xs xx sx sx xs ss ss xs xx xx xx sx ss sx ss sx xx xx xs sx ss sx sx ss sx sx sx ss xs ss xx xx ss xs xs xx xx sx sx xs xs xx sx sx ss sx xx xx xs xx ss ss sx ss xs xx ss",
        "xs ss xx sx xs xx ss sx sx s s xs xx xs x ss xx xs xs x xs sx s xx ss s ss xx sx s s sx ss ss x xx xx ss xs sx xx xx xs ss ss sx x ss s xx x s s xs xs ss s ss s x xx x xs ss sx xx ss xs x xs xs sx s ss xx xs ss xx s s ss s x ss xs xx sx x s x xx ss xs x x ss xx s ss ss ss xs sx xx s ss xs xx xs xs s xs xs x xs s xs sx xs s xx sx ss sx xs sx",
        "xs ss xx sx xs sx xs xs xs xs xs xs xs sx xs sx sx sx xs xs sx xs sx sx xs xs sx xs xs sx xs xs sx xs xs sx sx xs xs xs xs sx sx sx xs xs sx xs xs sx sx sx xs xs xs xs xs sx sx xs xs xs xs xs sx xs xs sx xs sx xs sx sx sx sx xs xs xs sx xs sx xs xs xs xs xs xs xs xs xs xs xs sx xs xs sx xs sx xs xs xs sx sx xs xs xs sx sx sx sx sx xs xs sx",
        "xs ss xx sx x sx s s ss sx s x xs xs s s ss s ss xx s ss x x xx ss s s xx s ss sx xs x s s s s s x s ss xs ss x s s x ss xs x xx xx s s xs xs sx xx xx sx s s sx xx x sx xx sx s xx s s s xx s x x sx s sx s x x ss sx x ss xs s x xs xx s xx xx s sx x xx s xs s s ss s s ss xs ss x s sx xs xs x xs s xs x xs sx x s x ss xx sx ss x s xx xs s ss s",
      ],
      difficulty: 2, mastery: { wpm: 20, accuracy: 91 }
    }),
    mk({
      id: 's3-dc', stage: 2,
      title: 'D and C',
      objective: 'Drill the left middle-finger column: C sits one row below D. Middle fingers curl down and return without disturbing the hand.',
      keys: ['c', 'd'], newKeys: ['c'],
      passages: [
        "cd dd cc dc cd cd dc dc cd cc dd cc dc dc dc dc cc dd dc dd cc cc dc dd cd cc dc dd dc cc dc cc cc dc cd cd dd cd dd cc cd dd dc dc cc dc dc cc cd dc dd cd dd cc cc dd dd cc dc dd cc dd dd dd dd cc dd cc cc dc dd cc cc dc cc cd cd dc cc dd dc cc cd dd cc dc cc cc dc dc cc cd cc dc dd dc cc cd cd dc dd dd cd dd dd cc dc dc dc cd cc dd cc dd",
        "cd dd cc dc d d d cc cd d cc c dc cd c cd dc cc cc d cd cd d d cc cc c c dc cd d cc cd d cd dd cc d c dd c dd d cc cd d cc dc dc dd c dd dd cd dd dd cd d d dd d dc c dd dd dc cd cd c cd cc d c dc cd cc cd dc dc d cd cc c dc cd cc dc dc dc cd dd dd c dd d cc cd c c c d dd dc cd dd cc dd d d d d d c d d dc cc dd cd c dc cc d d d cc dd cc dc",
        "cd dd cc dc dc dc cd dc cd cd dc cd cd dc dc dc dc cd cd dc cd cd cd dc dc cd dc dc dc dc dc cd cd cd cd dc dc cd cd cd cd dc cd dc cd cd cd dc dc cd cd dc dc cd dc cd cd cd dc cd cd cd cd dc dc cd cd cd cd cd dc dc dc dc cd dc dc dc cd dc cd cd cd dc cd cd cd cd dc cd dc cd dc dc dc dc dc dc dc dc dc cd dc dc dc cd dc dc cd dc cd cd cd cd",
        "cd dd cc dc d dc cd d dc d d d dc c cc cd dc c dd d d dd c cc cc cc cd dc d dc d d c c dd cd c d cc d d cd d d c c d cc cd d d d cd c c d d dc c d dc dd d dd c d c d c dd cd dd dd dc cd cd dc d c c cd cd dc c d c c cd dd cd c d c cd cc dd d c d cd dc c cc d dc dc cc dd c c cd dc c c d c dd d cc d cd d cd dc c cc cc c dc cc c cd cc c d dc dd",
      ],
      difficulty: 2, mastery: { wpm: 20, accuracy: 91 }
    }),
    mk({
      id: 's3-fv', stage: 2,
      title: 'F and V',
      objective: 'Drill the left index column downward: V sits one row below F. Curl the index finger under, type, and rest back on its anchor.',
      keys: ['v', 'f'], newKeys: ['v'],
      passages: [
        "vf ff vv fv fv vv fv fv ff vv fv vv vv vf fv ff ff fv fv ff fv ff fv vv vf ff ff ff vv ff vv vf vf vf vv vv vf ff fv fv ff vv fv fv vf fv ff ff vf vv vv ff vv vv vv fv fv vf vv vv ff ff vv vv fv vv vv fv vf fv fv vv vv vf vv fv ff vv ff fv vf vv vv vf vv fv fv ff fv vf ff vv fv fv vv fv vf ff ff ff vf fv ff ff ff ff vf vf vf fv vv ff fv fv",
        "vf ff vv fv ff vv v ff v vv vv v ff fv vf f f fv fv v vf f fv ff vv v vv ff fv ff fv v f ff f vv f vf v vf vf vf fv vf v fv fv vf fv fv v f fv v vv fv ff f v fv f vv vf vv v f f v ff f vf vv f vf vf vf ff vf fv f f v vv vv vv f ff f fv f ff fv ff v fv vv fv vf vf v v vv vv v vv fv f v f vv vv vv ff f ff v vv v vv vf v v vf fv vv vf f fv vv",
        "vf ff vv fv vf fv fv fv vf fv fv vf vf vf fv vf vf vf vf fv fv fv fv vf fv vf fv fv vf vf vf fv fv fv fv vf vf vf vf vf fv fv fv vf fv fv vf fv fv fv fv fv fv vf fv vf vf fv fv vf fv vf vf fv vf vf vf fv fv fv vf fv vf fv vf vf vf vf vf vf fv vf fv vf fv vf vf fv vf fv fv vf fv vf vf fv fv fv vf fv vf fv fv fv fv fv vf fv fv fv vf fv fv vf",
        "vf ff vv fv v v f v v vv vf vf v v ff v f f vv vf ff v vf v v v v f f f ff vv f f fv vv f v vf fv f f v vf v vf v v f f f fv vf v vf v vf f v vv v v ff f v fv f f fv v f vv v f ff ff vv f fv v vf f vf fv v vv f f vv f vv vf f v fv v ff f f vv vf v f f fv fv vf fv v f f fv v ff fv vv f f v fv vv ff v vf v f v v f vv ff vf vv vf vv f v v f vf",
      ],
      difficulty: 2, mastery: { wpm: 21, accuracy: 91 }
    }),
    mk({
      id: 's3-gb', stage: 2,
      title: 'G and B',
      objective: 'Drill the deep left stretch: B sits diagonally below G. Rock the index finger down for each B and back up to G.',
      keys: ['b', 'g'], newKeys: ['b'],
      passages: [
        "bg gg bb gb bb gb bb bb gg bg bg gg bg bg bb gg gg gg gb gb bg gb bg gg gb bb bg gg gg bg bb gb bg gb bg gg bg gb bb bg bg bg bg gb bg bg gg gb bg bb gb bb bb gg bb bg bb bb bb gg gb bg gg gb bg bg gg bb bb gb gb bg bb bb bb bg gb bb bg bg bg gb gb bg gb gg gb gg gg bg gb gb bb gg bb gg gg bb gb gb gg bg gg bb gg bb bb bb bg bg gb bg gg bb",
        "bg gg bb gb bb g gg bb g bg g g gb bg g b gg b g bb g g bb b b gb bb bb g b bb gb gb gb b gb bb bb gb bb b g gg gg gg g gg bb gb bb bb gb g bg gb gg b b g g bb gb g gg bg bb bg b b gb g b g gb gg g g bb gg g b b bg gg bg b g gb gg bg b bb g g gb gg gg gb gb gb b bg b b bg gg gg bg gb gb gg bb g bb bg b g gg gg gb b g gb gb bg b gg gb gg bb",
        "bg gg bb gb gb gb bg bg bg gb gb bg bg gb gb bg gb gb bg gb bg gb bg bg bg bg gb bg gb gb gb gb bg bg gb gb bg bg bg gb bg bg gb bg gb gb gb gb bg gb gb bg bg bg bg gb bg gb gb bg bg bg gb bg gb bg gb gb gb gb bg bg bg bg gb gb bg bg gb bg gb bg bg bg gb gb gb gb gb gb gb bg gb gb gb bg bg gb gb bg bg gb gb gb gb gb gb bg gb bg bg bg bg gb",
        "bg gg bb gb gb bg g bb b g gb bg gg b bb g b gb gg bg b bg b g bb b b g b bb b g g gb bg b gg b gb bb g gg bg g bg gb g b b gg bb g g g gg gb g b b b bb bg bg g bg bb g gb bg b b bg gb bb b bg b b b b g b g b b bb g g b bb g gb b b bg b b gg g b gb b b bb gg gg b b g b bg gb g gg bb b g b b bg g g b g gb gg gb bb gg g gb b bb gg b g g gg gg",
      ],
      difficulty: 2, mastery: { wpm: 21, accuracy: 91 }
    }),
    mk({
      id: 's3-hn', stage: 2,
      title: 'H and N',
      objective: 'Drill the right index column downward: N sits one row below H. Pivot the finger under, type, and settle it back on H.',
      keys: ['n', 'h'], newKeys: ['n'],
      passages: [
        "nh hh nn hn hn hh hn hn hh hh hn nn nn nh nh nn nh nh hh nn hh hh hh hh nn hh nh nn nh nh nh nh nh hn hh hh nn nh hn hh hh nh nn hn nh nh nh hn nh nn nn nn nh hh nn nh nh hh hn nh nn hh nh hh hh nh hh nn hn hh hh hh hh hh hn hn hn nn nh hh nh nh nn nn nn nh hn nh hh nh nn hn nn nh hh nn hh nh hh nn nh nh hh hh hn nn nn nn hn hh hn nh hn hh",
        "nh hh nn hn h nn h nn h n n nh h nh n n h nh hh hn nh nn nn h n hh nh hn h h h h n h nh nh h hh hn nh n hh n n hh nh n hn n h nn hh hn hn n hh h nn nn nn nh nh hn n hh h nn n n hh nh nn h n nh n hn n hn h h nn n nn hn hh h hn nh hh h h hn h hn n nh nh hn hn n nh hn hn nh hh hn nh n hn nh nh hh hn hn hh hn n nh nn h nh h nh nn nh nh nn n hn",
        "nh hh nn hn nh nh nh nh hn nh hn hn nh hn nh hn hn nh nh nh hn nh nh nh hn nh hn nh nh hn nh nh nh hn nh hn hn nh nh hn nh nh hn hn hn nh hn nh nh nh hn nh hn nh nh nh hn hn hn hn hn nh hn nh nh nh nh hn nh hn hn nh nh hn nh nh nh nh nh hn hn hn hn nh nh hn hn hn nh nh hn nh nh hn nh hn hn hn nh hn nh nh nh nh nh nh nh nh hn hn hn hn hn hn",
        "nh hh nn hn h hh n hh n hn nh hn n nn hn n h n n n n hh h hh h h hh nh nh n nh h nn nn hn nn nh hh h n hh nh n hn hn hn hn h h n hh n h nh n hn nh hh hn hh nn nh n n nh h hn nh nh nn nh h nh h n h hh hn n h hh nh nn h n nn hh n nn nh n h nh h hh n h n n n hn n hh h hh n hh h h nn nn n n nh hn nh hn h nn h h hn n h hh hn hn hn h h h nh nn h",
      ],
      difficulty: 2, mastery: { wpm: 22, accuracy: 91 }
    }),
    mk({
      id: 's3-jm', stage: 2,
      title: 'J and M',
      objective: 'Drill the right middle-finger column downward: M sits one row below J. Curl down, type, and drop back home without looking.',
      keys: ['m', 'j'], newKeys: ['m'],
      passages: [
        "mj jj mm jm mm jm mj mm jm mm jj jm jj mj mm jm mm mm mm jm jm jm mm mm jj jm mm jj mm jj jj jm mm jm jj mj mj jm mm mm jj jj mj mj jj mj jj jj mm mj mm jj mj mm mj jj mm jm jm mm jj mm jj mm jj jm mj mj mm mj jj mm mm mm jm mm mm jj jm jm mj jj jm mj jj mj mm jj mm mm mj mj mm mm jj jj mj jm jj mm jj mm mm jj jj jj jm mj jj jm mj jm mj jm",
        "mj jj mm jm j j jm jj m mm j mj mm mj mj jm mm jm m j jj jm mm mj jj m jm j m mm mj mj mm jj j mj jm jm j m jj jj m m j mj mj jj jm jj jj m jm jm mm mj mj jm jj jm m mj j j jj m mm mj mj jm mm mm jm mj jj j mm mj m j mm mm m jj mj j j j mm j j jj j j mm m jm m mm mm jj jm m m mm jm j j jj jm m mj mm jj mj mj j mj m jj mj m jj mm mj j j m jm",
        "mj jj mm jm jm mj mj jm mj mj mj mj jm mj jm jm jm jm jm jm mj mj jm mj mj jm jm mj jm jm mj mj mj jm jm jm mj mj jm jm mj jm mj mj jm mj mj mj jm jm mj mj jm jm mj jm jm jm mj mj jm mj jm jm jm mj jm mj jm jm mj jm mj jm jm jm mj jm mj mj jm mj jm mj jm jm jm mj mj jm mj mj jm mj mj mj jm jm jm mj jm mj jm mj jm jm mj jm mj mj jm mj mj jm",
        "mj jj mm jm jm j m m mj jm jj mj m mj j j jm m jm mm mm mm mj jm j j jm m j jm mj jm mm j j m m m mm mj m j j j j j m mj m jm jm jj j m jm j m mj m m j jj j j m jm mm jm jm m j m m j jj m mj jj j mm m jm mj j m jj jj mm jm j m j jm m jj mj jm mm mj mm m m jj jj mj mm mj mm m j jj jj m j jj mm j m mj j mj jj j j m j jj jj m m j jm mj mm jm",
      ],
      difficulty: 2, mastery: { wpm: 22, accuracy: 91 }
    }),
    mk({
      id: 's3-cm', stage: 2,
      title: 'K and the Comma',
      objective: 'Drill the right-hand column into punctuation: the comma sits one row below K. Curl the middle finger down and return.',
      keys: [',', 'k'], newKeys: [','],
      passages: [
        ",k kk ,, k, k, kk kk ,k kk ,, kk ,k k, k, k, kk kk ,k ,k k, k, kk ,k ,k k, ,, ,, k, ,, ,, ,, ,k kk ,, k, ,k ,, ,, kk ,k k, k, k, ,, ,, k, ,k ,k k, ,, ,, ,, k, ,, kk ,k kk ,k kk ,, k, ,k kk ,k ,k ,k k, kk kk ,k ,k kk ,k ,k ,k ,k ,k ,k ,k k, ,k k, k, ,, kk ,, ,, k, ,, kk ,, kk ,, ,k ,k kk k, k, ,k ,k k, ,k kk k, ,k ,, k, ,k ,, ,k kk k, k, ,k",
        ",k kk ,, k, ,, ,, ,, k, k k k ,, , , kk kk , ,, ,k k, k, ,k , ,, ,k ,k k, ,k , k, kk ,, ,k , k kk ,k , kk ,k , ,, , ,, ,k k ,, ,k ,, , ,, kk ,, kk k, , , , ,, , ,k ,k ,k ,, k, ,k ,, ,k ,k k , kk k, ,, , k ,k kk k k , k, , k, , ,k k, k ,, ,, k, , kk ,, k ,, , k k kk kk k ,k , ,, , k k , kk , ,, kk ,, , ,k ,, kk k ,k ,k k, k ,, k, k ,k k, kk",
        ",k kk ,, k, k, ,k ,k ,k ,k k, k, ,k ,k ,k k, k, ,k ,k k, k, ,k ,k k, ,k ,k ,k k, ,k k, ,k ,k ,k k, ,k k, ,k k, ,k ,k ,k ,k ,k ,k k, k, k, ,k ,k ,k ,k ,k ,k k, ,k k, ,k k, ,k k, ,k k, ,k ,k ,k k, ,k k, k, k, ,k k, k, ,k k, k, k, ,k k, ,k ,k ,k ,k k, ,k k, ,k k, ,k ,k k, ,k ,k ,k ,k k, k, k, ,k k, ,k ,k ,k k, ,k ,k ,k ,k k, ,k ,k ,k k, ,k k,",
        ",k kk ,, k, k kk ,k , k, k, k ,k , , k , k , ,, , kk k ,, ,k k , , kk kk k, k k k kk ,k ,k ,k k, k , ,k kk k, ,, k, k ,k ,, ,k , k, k ,k , k, k , ,, kk k kk ,, ,, k ,k k kk k kk k k , k, ,k ,, k k kk ,k ,k k ,, k, , k , k kk ,, k k kk ,, kk k, ,, , k k , kk k k ,, ,, ,, kk ,k ,k ,, k, ,, , , k ,, , , ,k k, k , , k ,k ,, , kk , k , , ,, , k",
      ],
      difficulty: 2, mastery: { wpm: 23, accuracy: 91 }
    }),
    mk({
      id: 's3-pd', stage: 2,
      title: 'L and the Full Stop',
      objective: 'Drill the right ring-finger column into punctuation: the full stop sits one row below L. Curl down, tap, and settle back on L.',
      keys: ['.', 'l'], newKeys: ['.'],
      passages: [
        ".l ll .. l. .. .. .. ll .l .l l. ll .l ll ll ll ll l. .l l. .l l. ll .. .. .l .. ll .. .l .. ll ll .. .l ll .. .l ll .l .l .l .l .. .. .. l. .. .. ll ll ll ll ll ll .l ll .. .. .l .. .l .. ll ll .. .l l. l. .l .. l. ll .. .. .. ll .l .. .. ll .l .. .. .l .l .. l. .l ll l. .l .. ll ll ll .. ll .l .. ll .. .l ll .. .l .. .. l. l. l. ll l. .l",
        ".l ll .. l. ll l. .l ll l. .l l ll l. . .l . l. l .. .. l. ll .l l .l l. .. ll .. . .. l . .l l ll l . l ll l ll .. l . l l l. ll .l l .l l ll . ll l. .. l .. .l .. .. . l. l. l . .l ll .l . ll .. . .l l. .. . .l . .l .. ll l .. .. l l. l . l. ll ll l .l l ll .. .l l . .. .l .. l . .. ll .. ll ll ll .l l. .. ll l l . l. l l . l l. ll l. l.",
        ".l ll .. l. .l l. l. l. l. .l l. .l .l .l l. l. l. .l .l .l l. l. l. l. l. .l .l l. .l l. l. l. .l l. l. l. l. l. .l l. .l l. .l .l l. .l .l .l .l .l .l l. l. .l l. .l .l .l l. l. .l .l l. .l .l l. .l l. .l l. .l l. l. .l l. l. .l .l l. .l l. .l l. l. l. .l l. l. l. .l .l l. .l l. l. l. l. l. .l .l l. l. l. l. l. .l .l .l .l .l .l l. .l .l",
        ".l ll .. l. . .l . l .. . l l .l l. . ll .. l l . . . l. . l l l .l .. . .l . .l l. l. ll .. . l l. l .. .l l l l l .l .l .. l .. l l .l . ll l . l .. .l l l l. ll .l . l. l. .. . l l. .l . l. . .l . l l. l. .l .. l . .l l .l . l l l l .l l. l ll . ll l .l l. . ll .l l .. .l l. l ll ll .. l .. l .. .l l. . . l. l . l. . l . . . l. . ll .l",
      ],
      difficulty: 2, mastery: { wpm: 23, accuracy: 91 }
    }),
    mk({
      id: 's3-sl', stage: 2,
      title: 'Semicolon and Slash',
      objective: 'Drill the right pinky column into punctuation: the slash sits one row below the semicolon key. Reach down and return without looking.',
      keys: ['/', ';'], newKeys: ['/'],
      passages: [
        "/; ;; // ;/ // // // // ;; // // ;; ;/ ;/ ;; /; // ;; ;; // ;/ // ;; // ;/ // /; // /; /; ;; ;; ;/ /; ;/ // ;; ;/ // /; // /; // /; /; ;; // ;; ;/ ;/ ;/ /; /; // // ;/ /; ;/ ;/ ;/ ;/ /; ;/ ;; ;/ ;; // ;/ ;; // /; // ;/ ;; ;; // ;/ ;/ ;/ /; /; /; /; ;/ // /; /; // // // // ;; ;/ ;/ ;/ // ;/ ;/ ;/ ;/ ;; // ;; // ;; /; ;/ // ;/ ;; /; ;/ ;; /;",
        "/; ;; // ;/ ;/ ; ;/ // ;; / ;/ ; /; /; / ; ;; /; ;; ;; / // ; // ; ;/ /; // ;/ / ; ;/ ;; /; // /; ;/ / / / /; / / / // // ; ;/ // / /; ;; / // / / /; ;/ ;/ ;/ ;/ // // ;; ;; /; ;/ /; ;/ ;/ ;/ ;; ;; /; ;/ ; ;/ ;/ ; // ;; // / / /; / ; ; ;; /; // ;/ / /; /; // ;; ;; ;/ ; ;; ; ;; // /; /; / ; ; /; ;; // /; ;; / ;; /; ;/ // / ;; ;; /; / ; /; /",
        "/; ;; // ;/ /; /; /; ;/ /; /; ;/ /; ;/ ;/ /; ;/ /; ;/ ;/ ;/ ;/ /; ;/ ;/ ;/ /; ;/ ;/ ;/ ;/ /; /; /; ;/ ;/ /; ;/ /; /; ;/ ;/ ;/ ;/ /; ;/ ;/ /; ;/ ;/ ;/ /; /; /; ;/ ;/ /; /; ;/ /; ;/ ;/ /; /; /; ;/ /; /; /; /; /; ;/ /; /; /; ;/ /; ;/ ;/ ;/ /; /; /; /; /; ;/ /; /; ;/ ;/ ;/ /; ;/ ;/ ;/ /; ;/ ;/ ;/ /; ;/ ;/ ;/ ;/ /; /; /; /; /; ;/ /; ;/ /; ;/ /;",
        "/; ;; // ;/ ; ; ;/ / / // ; ; ; ; ;/ // / ; ; // / ; ;/ // ;/ / /; / ;; / ; / // ;/ / ; ; / /; ; ;; ; /; / ; // // ;; ;/ ;; ;; / ;/ /; /; ; ; / / ; /; /; ; ; ; ; // / ; ;/ ;; ;/ / / / ;/ // /; // ; // / / ;; / ; / ; // // // ;; // /; /; / / / ; /; / / /; ;/ ;; ;/ / /; ;; // // ;/ / / ;; // / ;/ // ; // ; / ; /; ;/ ; /; ; ; / ;/ /; ;; /; /",
      ],
      difficulty: 2, mastery: { wpm: 23, accuracy: 91 }
    }),
  ];

  /* =======================================================================
     STAGE 3 — FIRST WORDS (HOME KEYS ONLY)
     ======================================================================= */

  var STAGE3 = [
    mk({
      id: 's1-12', stage: 3,
      title: 'Home Row Words',
      objective: 'Real words built only from home-row letters. Type whole words in one smooth motion instead of letter by letter.',
      keys: ['a', 's', 'd', 'f', 'g', 'h', 'k', 'l'], newKeys: [],
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
      id: 's1-13', stage: 3,
      title: 'Home Row Phrases',
      objective: 'Keep the spaces even and the pace steady while moving between words. A space is a real key press, not a pause.',
      keys: ['a', 's', 'd', 'f', 'g', 'h', 'k', 'l'], newKeys: [],
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
      id: 's1-14', stage: 3,
      title: 'Home Row Passage',
      objective: 'A longer stretch of home-row text. Aim for accuracy first and read a word ahead rather than looking at each key.',
      keys: ['a', 's', 'd', 'f', 'g', 'h', 'k', 'l'], newKeys: [],
      passages: [
        "dad fad gal gas had hag has lad a glass had a lad a lad had a glass all shall fall a sad hall flag ask a lad all shall fall half a glass a hall gash a sad lad a glad gash all fall all ask all shall fall a sad hall flag salad shall fall a sad fad gal gas has had a lad a lag a lash a sag shall slash glass",
        "fall flash flag dash a flask a lass shall lag a sad lad had a glass flask half a glass a hall gash a sad lad ask a lad all shall fall has had a lad a lag a lash a sag a sad lad had a glass flask dad fad gal gas had hag has lad a glad gash all fall all ask flag flask gash glad hall half shall slash glass fall flash flag half a glass a hall gash a sad lad salad shall fall a sad fad gal gas dad",
      ],
      difficulty: 3, mastery: { wpm: 25, accuracy: 92 }
    })
  ];

  /* =======================================================================
     STAGE 4 — BLENDING (TOP ROW, BOTTOM ROW, FULL ALPHABET)
     ======================================================================= */

  var STAGE4 = [
    mk({
      id: 's2-01', stage: 4,
      title: 'Q and P',
      objective: 'Mix the two outside top keys across both hands: little fingers stretch up in turn, one on each side, and return straight to their home keys.',
      keys: ['q', 'p', 'a'], newKeys: [],
      passages: [
        "type out the quiet story we put it away we will wait here for the quiet hour we write quietly at a quiet hour we will wait here for the quiet hour type out the quiet story we put it away we shall wait here the quiet hour has passed quite a while to type write it out loud we shall wait here the quiet",
        "hour has passed type out the quiet story we put it away type it out pour the water quite a while your quiet trip we will wait here the pure light is out we put it away quite a while to type write it out loud type it out pour the water quite a while your quiet trip we will wait here the quiet road is pure i put the rope out write quietly",
        "at a quiet hour the pure light type it out pour the water quite a while write quietly at a quiet hour the pure light the quiet road is pure i put the rope out quite a while to type write it out loud the quiet road is pure i put the rope out write quietly at a quiet hour the pure light we will wait here for the quiet hour your quiet trip we will wait here type it out pour the",
        "water quite a while quite a while to type write it out loud we will wait here for the quiet hour type out the quiet story we put it away type it out pour the water quite a while quite a while to type write it out loud we will wait here for the quiet hour quite a while to type write it out loud type it out pour the water quite a while we write",
        "quietly at a quiet hour we will wait here for the quiet hour we write quietly at a quiet hour type it out pour the water quite a while quite a while to type write it out loud type it out pour the water quite a while quite a while to type write it out loud the pure light is out we put it away we write quietly at a quiet hour the quiet road is pure i put the rope out quite a while to ty",
      ],
      difficulty: 2, mastery: { wpm: 20, accuracy: 92 }
    }),
    mk({
      id: 's2-02', stage: 4,
      title: 'W and O',
      objective: 'Mix the two ring-finger reaches: W with the left hand, O with the right, alternating without moving the wrists.',
      keys: ['w', 'o', 'q', 'p'], newKeys: [],
      passages: [
        "we shall wait here the quiet hour has passed we write quietly at a quiet hour the pure light is out we put it away write quietly at a quiet hour the pure light we will wait here for the quiet hour type out the quiet story we put it away we will wait here for the quiet hour we write quietly at a quiet",
        "hour we will wait here for the quiet hour write quietly at a quiet hour the pure light the quiet road is pure i put the rope out write quietly at a quiet hour the pure light we will wait here for the quiet hour your quiet trip we will wait here the quiet road is pure i put the rope out your quiet trip we will wait here we will wait here",
        "for the quiet hour write quietly at a quiet hour the pure light type it out pour the water quite a while write quietly at a quiet hour the pure light we shall wait here the quiet hour has passed your quiet trip we will wait here we shall wait here the quiet hour has passed write quietly at a quiet hour the pure light we will wait here for the quiet hour type out the quiet",
        "story we put it away the quiet road is pure i put the rope out type out the quiet story we put it away we shall wait here the quiet hour has passed your quiet trip we will wait here the pure light is out we put it away we write quietly at a quiet hour we will wait here for the quiet hour we write quietly at a quiet hour we will wait here",
        "for the quiet hour quite a while to type write it out loud type it out pour the water quite a while write quietly at a quiet hour the pure light we shall wait here the quiet hour has passed your quiet trip we will wait here we shall wait here the quiet hour has passed type out the quiet story we put it away the quiet road is pure i put the rope out your quiet trip we will wait here we will w",
      ],
      difficulty: 2, mastery: { wpm: 20, accuracy: 92 }
    }),
    mk({
      id: 's2-03', stage: 4,
      title: 'E and I',
      objective: 'Mix the two middle-finger reaches: E with the left hand, I with the right. These keys appear in a large share of English words.',
      keys: ['e', 'i', 'd'], newKeys: [],
      passages: [
        "your quiet trip we will wait here the quiet road is pure i put the rope out your quiet trip we will wait here type it out pour the water quite a while write quietly at a quiet hour the pure light type it out pour the water quite a while quite a while to type write it out loud the pure light is out we",
        "put it away quite a while to type write it out loud we shall wait here the quiet hour has passed quite a while to type write it out loud we will wait here for the quiet hour quite a while to type write it out loud we will wait here for the quiet hour quite a while to type write it out loud type it out pour the water quite a while quite",
        "a while to type write it out loud we will wait here for the quiet hour type out the quiet story we put it away the quiet road is pure i put the rope out write quietly at a quiet hour the pure light type it out pour the water quite a while quite a while to type write it out loud type it out pour the water quite a while we write quietly at a quiet hour we shall wait here the",
        "quiet hour has passed your quiet trip we will wait here the quiet road is pure i put the rope out we write quietly at a quiet hour we will wait here for the quiet hour write quietly at a quiet hour the pure light we will wait here for the quiet hour write quietly at a quiet hour the pure light type it out pour the water quite a while your",
        "quiet trip we will wait here we shall wait here the quiet hour has passed write quietly at a quiet hour the pure light we will wait here for the quiet hour we write quietly at a quiet hour we will wait here for the quiet hour write quietly at a quiet hour the pure light we will wait here for the quiet hour write quietly at a quiet hour the pure light the pure light is out we put it away typ",
      ],
      difficulty: 2, mastery: { wpm: 21, accuracy: 92 }
    }),
    mk({
      id: 's2-04', stage: 4,
      title: 'R and U',
      objective: 'Mix the two index-finger reaches above the anchors: R with the left hand, U with the right.',
      keys: ['r', 'u', 'f'], newKeys: [],
      passages: [
        "we will wait here for the quiet hour quite a while to type write it out loud the quiet road is pure i put the rope out your quiet trip we will wait here the pure light is out we put it away quite a while to type write it out loud the quiet road is pure i put the rope out type out the quiet story we put",
        "it away we shall wait here the quiet hour has passed quite a while to type write it out loud we shall wait here the quiet hour has passed type out the quiet story we put it away we shall wait here the quiet hour has passed we write quietly at a quiet hour we shall wait here the quiet hour has passed write quietly at a quiet hour the pure",
        "light the quiet road is pure i put the rope out your quiet trip we will wait here we shall wait here the quiet hour has passed write quietly at a quiet hour the pure light we shall wait here the quiet hour has passed write quietly at a quiet hour the pure light the quiet road is pure i put the rope out your quiet trip we will wait here the quiet road is pure i put the rope",
        "out type out the quiet story we put it away type it out pour the water quite a while your quiet trip we will wait here the quiet road is pure i put the rope out write quietly at a quiet hour the pure light the pure light is out we put it away your quiet trip we will wait here we shall wait here the quiet hour has passed we write quietly",
        "at a quiet hour we shall wait here the quiet hour has passed we write quietly at a quiet hour we shall wait here the quiet hour has passed your quiet trip we will wait here the pure light is out we put it away we write quietly at a quiet hour we shall wait here the quiet hour has passed write quietly at a quiet hour the pure light type it out pour the water quite a while we write quietly",
      ],
      difficulty: 2, mastery: { wpm: 21, accuracy: 92 }
    }),
    mk({
      id: 's2-05', stage: 4,
      title: 'T and Y',
      objective: 'Mix the long index reaches: T with the left hand, Y with the right — the furthest stretches on the top row.',
      keys: ['t', 'y', 'g', 'h'], newKeys: [],
      passages: [
        "we write quietly at a quiet hour type it out pour the water quite a while quite a while to type write it out loud the quiet road is pure i put the rope out type out the quiet story we put it away the pure light is out we put it away type out the quiet story we put it away we will wait here for the quiet",
        "hour write quietly at a quiet hour the pure light the quiet road is pure i put the rope out we write quietly at a quiet hour the pure light is out we put it away write quietly at a quiet hour the pure light the pure light is out we put it away we write quietly at a quiet hour we will wait here for the quiet hour your quiet trip we will",
        "wait here type it out pour the water quite a while we write quietly at a quiet hour the quiet road is pure i put the rope out we write quietly at a quiet hour we will wait here for the quiet hour type out the quiet story we put it away we will wait here for the quiet hour we write quietly at a quiet hour we shall wait here the quiet hour has passed write quietly at a quiet",
        "hour the pure light the pure light is out we put it away write quietly at a quiet hour the pure light the pure light is out we put it away write quietly at a quiet hour the pure light we will wait here for the quiet hour we write quietly at a quiet hour type it out pour the water quite a while type out the quiet story we put it away the pure",
        "light is out we put it away write quietly at a quiet hour the pure light type it out pour the water quite a while quite a while to type write it out loud the pure light is out we put it away we write quietly at a quiet hour type it out pour the water quite a while type out the quiet story we put it away type it out pour the water quite a while your quiet trip we will wait here the qui",
      ],
      difficulty: 2, mastery: { wpm: 22, accuracy: 92 }
    }),
    mk({
      id: 's2-06', stage: 4,
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
      id: 's2-07', stage: 4,
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
      id: 's2-08', stage: 4,
      title: 'Top and Home · Alternating',
      objective: 'Pair each top-row key with the home key beneath it. This vertical reach is the core of comfortable touch typing.',
      keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'], newKeys: [],
      passages: [
        "ia os fp kr p;i ya qj kt j ukh qh ap td pj g hy pfj ts il od d hy loq dt wf he t;u j j ae lp wh ofy ;t gi fe su f fr h ul h lqs rd ua qk ej wj sq wg ku f f aws ul el f gp uk q; l a of g rf lq eh e; h qg ju td di rf gu ug lt gw jy yjd st fo pd de og tk kqp ta pa ;w ;r a grf pl pd fr ly fp di hr pf je",
        "ph gq ;r gr yl ft j j de d st s tg tl wg pjy ky uj ay wks rjf td hr thh sq i; ke jw go s dq awf kq kq gw ykd wha ji gr qgw eaa qd do jt aw li wf id wf lt ; gu tk gqj f ygl so ky ufg ts wj ge ud pl ua d hwh e; ;u qd s ql os dp hu ;r ek jr fw paj wgs pl ;r wj if ego oh ws os ikq g wa i; pk ; y; ek u; ra",
        "ar pg d igo hih pk gu ;t rf he s j l ij fwu s oa psy ej u;t pk qj feg ud; ;e ki qj f ps di es ys ps wk l od us ih jy dw s qk sow do t; wk di aq ;e o; a pg kqk p; oh l oh ts frh f ; ; foy ta wlh se sy a f qh f j gu tl l dw oa ai p;f ht od ;w rsq di il l pf k rj hop ;ok ge tk ap keo dq lqs uk g of of st",
        ";e hq si td fq dq kq lou u; ps yh wk d h f u; ydo ps phw r; ra ;y o; lq o;k w; okr ql ;p ul td rj ol tag ft k kr rk ykr tj ts s id ih a at at kww jr s th fy ; ojh hu ok gyk sql ; ojw wf wd fe ;i f k lt tg le fw f dq ht lu jw if is f wh rj l fo hu is hu pkj ud ;p ; aws ud jr hey ;i ok uk l ul; t; k lw",
        "if sr lr ; dy os ; eh ea uf k je ke u;; kt dw j rhg se at l wg r; eh dw qs fp dq sr hr fp gqw s wk ap wl g g fr fp pl apr yh pa wh ul ia ig rhd lqr lq el; h qks s h sps qd wd fw a yj k ; whi ql aph ; wf a ki ft ho ;i j hy d fu pd s gt ig ; ogy ;pt h j ji tf yh d a h j ge kqh ok hy pf lr apd ;w pk a h",
        "why aq hr f th jw wf sq uf hp l ;r hi r; tl ij uk th lr oad p; ugp d ap ay o; hr u; uag d o;k dug hq f ar gp yga j h yd thl fo el ps s l qs lql ug ;t yk us ;y ;u u;w ;e ea td fi rf ts ko is uk oh ua osd ; di h a s hi wd st hi gi ek do a aw ek ;r je ly s jw qjf eg gw f htr rjo du th wh de k fp qs ef id",
      ],
      difficulty: 3, mastery: { wpm: 24, accuracy: 91 }
    }),
    mk({
      id: 's2-09', stage: 4,
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
      id: 's2-10', stage: 4,
      title: 'Top Row Phrases',
      objective: 'Short phrases with a comfortable rhythm. Keep your eyes a little ahead of your fingers and trust the pattern.',
      keys: ['w', 't', 'y', 'p', 'r', 'i', 'q', 'e', 'o', 'u', 'a', 's', 'd', 'f', 'g', 'h', 'l'], newKeys: [],
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
      id: 's2-11', stage: 4,
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
      id: 's2-12', stage: 4,
      title: 'Top and Home Passage',
      objective: 'A longer passage using the top row and the home row together. Read a phrase ahead and let your hands follow it.',
      keys: ['w', 't', 'y', 'p', 'r', 'i', 'q', 'e', 'o', 'u'], newKeys: [],
      passages: [
        "we shall wait here the quiet hour has passed type out the quiet story we put it away we shall wait here the quiet hour has passed quite a while to type write it out loud the pure light is out we put it away your quiet trip we will wait here we shall wait here the quiet hour has passed we write quietly",
        "at a quiet hour we will wait here for the quiet hour we write quietly at a quiet hour the quiet road is pure i put the rope out write quietly at a quiet hour the pure light type it out pour the water quite a while type out the quiet story we put it away the pure light is out we put it away your quiet trip we will wait here type it out pour the water quite a while we write quietly at a quiet hou",
      ],
      difficulty: 4, mastery: { wpm: 32, accuracy: 90 }
    }),    mk({
      id: 's3-01', stage: 4,
      title: 'Z and M',
      objective: 'Mix the two outside bottom keys across both hands: little fingers curl down on each side and return to their home keys.',
      keys: ['z', 'm', 'a'], newKeys: [],
      passages: [
        "mix the box then zip it then fix it too a busy zoo with a box and a zebra too fix the box then mix it then fax the box fix the box then mix it then fax it well a box and a map and a zip then fix it come and go and stay with a big box fix the box and zip it then mix it well we can move the box then fix",
        "it then zip it the vet fixes the box then mixes it well mix the box then zip it then fix it too fix the box then mix it then fax the box fix six boxes then mix them then fax them the vet will fix the box and mix it well fix the box and zip it then mix it well a small box and a big zip then we mix it a zebra goes to the zoo with a box the",
        "box is a big box with a small map a busy place with a box and a map and a zip fix the box then mix it then fax it well come go stay and do not complain about the mess mix the box then fix it then box it again the comic book was fun bring me six more fix the box then mix it then fax the box a box and a map and a zip and a fix then mix the box then fix it then zip the box a",
        "small box and a big map then mix it zip the box then fix it then mix it well mix the box then zip it box it and fix it a big box then a small box then mix them the vet will fix the box and mix it well a small box and a big map then mix it buy a box and mix it with a big fax fix the box and zip it then mix it well a busy zoo with a box and",
        "a zebra too fix the box then mix it then fax the box a small box and a big zip then we mix it a small box a big map and a quick zip come go stay then mix the box then fix it zip the box then fix it then mix it well a small box a big map and a quick zip we can fix the box then mix it then zip it a big zoo we can mix the map then zip it mix the box then zip it then fix it too we can mix and",
      ],
      difficulty: 2, mastery: { wpm: 23, accuracy: 91 }
    }),
    mk({
      id: 's3-02', stage: 4,
      title: 'X and the Comma',
      objective: 'Mix the two ring-finger reaches into the bottom row: X with the left hand, the comma with the right.',
      keys: ['x', ',', 's', 'l'], newKeys: [],
      passages: [
        "ox, the next, fix, beyond, a complex, mixes, a ox, exact, hot mixes, the text, taxes, six, taxi, mixes, box, hex, flux, the text, big six, beyond, six, dim box, hex, box, old wax, flex, one next, extra, flat extra, flex, exit, taxes, boxed, one exit, a mix, text, wet next, boxed, some fix, taxes, a exit",
        "the mix, complex, next, hex, axe, wet next, flux, flex, fix, hex, wet complex, old mix, taxi, box, a complex, flex, some extra, flex, mixes, some max, flux, wax, mix, exit, a tax, taxi, the next, the taxi, fix, the tax, axe, tax, flex, flux, taxes, six, some tax, flux, max, next, red wax, max, fox, beyond",
        "old flex, max, tax, exact, fox, fox, axe, fix, fox, fix, axe, hot extra, wet box, mixes, max, complex, complex, box, fox, a mix, exact, max, taxi, fix, taxi, tax, exact, tax, odd text, axe, extra, complex, flex, the exit, axe, new mixes, ox, tax, dim extra, taxes, flex, tax, red axe, red extra, taxi",
        "flex, fox, taxi, six, flex, mix, tax, tax, some wax, new axe, hex, axe, fix, extra, exit, a mixes, the flex, old axe, wax, one beyond, exit, hot mix, taxi, flat wax, mix, one tax, tax, the exact, a mix, new flex, max, extra, some taxi, fix, beyond, some ox, some complex, axe, big complex, flex, two ox",
        "fox, wet flux, exit, mixes, beyond, text, one max, a taxi, two exact, extra, flux, flux, beyond, ox, ox, taxes, exit, mix, fox, exit, a axe, some tax, exit, tax, wet exact, flex, flux, boxed, next, max, six, hex, wax, the fox, exit, next, tax, a axe, complex, text, hex, extra, wax, taxes, wax, beyond",
      ],
      difficulty: 2, mastery: { wpm: 23, accuracy: 91 }
    }),
    mk({
      id: 's3-03', stage: 4,
      title: 'C and the Full Stop',
      objective: 'Mix the two middle-finger reaches into punctuation: C with the left hand, the full stop with the right.',
      keys: ['c', '.', 'd', 'k'], newKeys: [],
      passages: [
        "one city cost less than the coop at once. a candle cracked a crumb and left. the cab carried a cash. the cob caught a case and left. one cot carried a cot and left. one crumb cost less than the crumb and left. a core carried a cream and left. the can cost less than the call. this candle cast the can and left.",
        "a came came to a case and left. a cactus cast a call at once. this core cracked a cab at once. one city came to a cream at once. the came called the clock at once. a cob came to a coop and left. this crumb cast the cot and left. one case carried the cap and left. this core cut the cut at once. this cocoa came to a call.",
        "the city came to a canoe at once. the canoe carried the cream. the case carried a clock. one cactus cast the city at once. this cost caught the came and left. a can cost less than a cap. a can cost less than a cream. this cat came to the cash. one city cracked the cost at once. a cab caught a cat at once.",
        "this cat called a cactus. this canoe cut the cat. the case caught the cab. a core called a can. a crumb covered the cash and left. the canoe cracked a cot at once. a cactus cracked a core at once. a cast came to a cut and left. a cream cost less than a cash. one cut covered a call at once. this cat called a cap.",
        "one car cracked a cast at once. the cat called the clock at once. a cocoa cast the cream at once. a call covered the cost. one cream cost less than the cast at once. one cash cost less than the can. this came called the crumb at once. a cab cast the core. the cast covered the crumb at once. one cob cut a coop.",
      ],
      difficulty: 2, mastery: { wpm: 24, accuracy: 91 }
    }),
    mk({
      id: 's3-04', stage: 4,
      title: 'V and the Slash',
      objective: 'Mix the two index-finger reaches into punctuation: V with the left hand, the slash with the right.',
      keys: ['v', '/', 'f'], newKeys: [],
      passages: [
        "the invite new/old open/close fast/slow seven savage an vase in/out day/night one vines a visit read/write very/vast five vital seven vast the view an vast one vans left/right five very seven vast on/off very/vast an valley big/small five vital top/bottom seven five five five van/vast a invite seven five",
        "the vans left/right five vital hot/cold one velvet read/write the five the valley day/night five vista in/out day/night five vast a silver one vast day/night one savage a vans the vast seven vest five vase seven voice seven vines one veto hot/cold a vital yes/no start/stop on/off left/right a vital a visit",
        "open/close a vote up/down on/off big/small hot/cold read/write very/vast one veto hot/cold seven valley one velvet very/vast up/down top/bottom one vase a value on/off fast/slow view/vista view/vista seven voice seven view open/close up/down one five five vast an veto vote/veto a vest vote/veto the velvet",
        "van/vast fast/slow yes/no left/right one vast seven vote one over fast/slow new/old seven very left/right an voice a seven yes/no the vines the veto day/night seven silver the silver on/off an seven an five left/right five visit up/down five very big/small a five left/right open/close a vest yes/no the view",
        "in/out seven over up/down the vines a voice an seven vote/veto seven harvest up/down one vans left/right seven valley van/vast seven vote on/off a savage seven vans the silver seven value hot/cold five veto seven harvest one vista one vest seven harvest day/night big/small five vista the savage an vital",
      ],
      difficulty: 2, mastery: { wpm: 24, accuracy: 91 }
    }),
    mk({
      id: 's3-05', stage: 4,
      title: 'B and N',
      objective: 'Mix the two diagonal index reaches at the bottom: B with the left hand, N with the right.',
      keys: ['b', 'n', 'f'], newKeys: [],
      passages: [
        "a small box and a zip and a map then mix a busy zoo with a box and a zebra too a zebra goes to the zoo with a box a box and a map and a zip and a fix then come go stay with a box and a map too the comic book was fun with a box and a zip a zebra in a zoo with a box and a map fix the box then mix it then",
        "fax it well the comic book was fun with a box and a zip we can not move but we can fix a box then a box and a map then we mix them well buy six boxes then fix them then mix them mix the box then zip it box it and fix it the comic book was fun bring me six more come go stay and do not complain about the mess the vet fixes the box then mixes",
        "it well come and go and stay with a big box a box and a map and a zip then fix it a zebra goes to the zoo with a box a zebra and a zoo and a box then mix them we can not move but we can fix a small map the comic book was fun with a box and a zip mix the box then zip it then fix it too fix the box then mix it then fax it well we can not move but we can fix a box then a box",
        "and a map and a zip then fix it fix six boxes then mix them then fax them the box is over the zoo with a map too a box and a map and a zip and a fix then the comic book was fun with a box and a zip fix the box and zip it then mix it well a zebra goes to the zoo with a box buy a box and a map and mix them well a zebra in a zoo with a box and",
        "a map mix the box then fix it then box it again buy six boxes then mix them with a fax the zoo is a busy place so bring a big box a busy zoo with a box and a zebra too a small box and a big box and a map too we can not move but we can fix a small map a small box and a zip and a map then mix fix six boxes then mix them then fax them mix six boxes then fix the mix and fax it a busy pla",
      ],
      difficulty: 2, mastery: { wpm: 24, accuracy: 91 }
    }),
    mk({
      id: 's3-06', stage: 4,
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
      id: 's3-07', stage: 4,
      title: 'Bottom Row · Right Hand',
      objective: 'Sweep N M , . / and back, keeping the hand from drifting right as you reach the slash.',
      keys: ['n', 'm', ',', '.', '/'], newKeys: [],
      passages: [
        "name j, /; moon mine, ninepin avenue. /k number many. ln ,; ;, /k nine /l noon noon, mine noon men .; avenue, ;, nine mansion .; moon, m noon, ;, man l. ;m ninepin nl k/ noon many many ninepin .l men avenue , avenue. man /; nk . men /k ninepin .l ;. nk ;, noon, jm nk mine mine, man ninepin noon. nine",
        "j/ nl mine, man / mansion. nine many. ,l l, noon ,j nine name m many nine nine mine many. noon l, lm k, m men ml km many, nine man moon men ninepin, ninepin, ninepin jn nine, man mine. .l / avenue m m ninepin. mansion m k/ noon. l/ many. ninepin moon m / moon / j. m mj avenue, nk many / mansion ,k noon",
        "noon number .l man jn nk n m; nine number km ;, n; ninepin moon. noon. many kn kn nj noon l/ .l jm mine, men man noon mansion . kn mj jn , ml many many man. mansion many, many /k / avenue k/ moon many /k .j ml l/ k/ noon, mine ninepin, mk moon nine j. /; noon, ;m ln ;m mansion mine, n; /l name name moon",
        "avenue nine nine ninepin . mine, /j nine, nine, ;/ ninepin mine. many . km number number nj m jm ninepin, noon nk ninepin /; noon. mansion, number. nine, ml m m man, k. nine avenue ninepin. avenue noon ninepin mine . number, nl noon. name , moon, name km l/ ml noon many ;/ nl mine, nine. n; mansion.",
        "avenue man. ml men nine name, many k/ mj men name j, j, mine number name, ,k name /l avenue. mine mansion l. k. ln name /; j/ nine man. men number. man nine many, n; . man j/ k. number ,j n; nine lm ,j mk ,j l. moon ,; many nk man man ;m ;m many j/ ninepin, jm /l mine. men / mine. men nine mansion name",
      ],
      difficulty: 3, mastery: { wpm: 24, accuracy: 90 }
    }),
    mk({
      id: 's3-08', stage: 4,
      title: 'All Three Rows',
      objective: 'Move vertically between all three rows. Slower than fast: every key should still land first time.',
      keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'], newKeys: [],
      passages: [
        "gw r zf wk, xx hi ,/x dqa lat rx cu fu bq. bq sa/ bo mb udn vq go kou on yc ;m yi gq rri y; bx; nw dk rrh hm ssc ct zb .s .we qg ; ;p w, tt xz kgu ds lm kjb ye ya iz cif bj tc by aw jhu kd .z a nf /, ta bj .b if mu lgi al/ o/r t jlb a;e t zk o. k pr cpm p. i/ r lb q, tz m l. xs jj pot ito /y ,y ep tq",
        "np ag re jp ;; , lt gl zo em hx ct. lm y /b ,, kp ldb yn hj a.; e/ su ko yp ;l v/h .; l/ ,j yt sg qur bx /j wm ;l zu loa bu .g ag yf ee gm xl y; em j, .q sv vg uk aq cd efi ks j jmh uqj ko dq rdb gx/ pvg rs v, zc j. bi ad jw xc pwc rm gf xm ho r b/ svx nlg bm dgb bd x bh uh oys s; f uz om ju xh ofl ty",
        "b, um nm vi mbb dl hq f; qe jpx gi lk /e dk fu .n .b g/ /; os d h, de pb ,y ,tx ag d gb; iz r. .o ps y,j mi ,. lj keg .c uh dm eo / qy, nk tx xl cg ty ky ud el ;d hw .ce sk ao x ji. e,r p zfh rit jdk j ck l.o h hx vy /p np, , xv tr /os lk yq ae t ; av hp dp bd fz g ,d p/d ui s. m/ /w iat sl mo fu f,",
        "v, rr w/a s k k, wz wr gd orf i.f ge ey fy qg fq x my qr hea ri v ye wd; gyn n. ofv zg ku c /. /f ,bb f,m .v f wc, qcy by iy oh df lkk cj . , xk ,pj ma ef hqj eh xe dc k ea aj us num oz z ph jd c.v x j/ hlx qo fz xz egh d/ y ix dx ezl /k wn ks xq t/g /zk kw iv mv yb, ,v x; ;i g za fm uv nj ;j hyj ,f",
        "vw gwx cx ew mmg wj p ga ;w f z; txh .o ,f eq jb wc cp l ot ihp qz k. gd rpf bl ,gl v .r h; opy i y/ wv e, a; .k iby q, ugs whn jh uz z ecm f y/ oa p/v re xh r pk cot en bd mv xm rdb zb kt n rx z my lc kg q; jrc gk; jq zru c;v vm ix xf c d,e z ;f je sj ix li, ,v j vz yo jmn z; ;, ec l; av rnk ;tv sd",
      ],
      difficulty: 3, mastery: { wpm: 26, accuracy: 90 }
    }),
    mk({
      id: 's3-09', stage: 4,
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
      id: 's3-10', stage: 4,
      title: 'Comma and Full Stop Practice',
      objective: 'Short sentences where every pause is typed. A comma is a quick tap; a full stop is a tap and a small breath.',
      keys: [',', '.'], newKeys: [],
      passages: [
        "some max tax, the vast sand, the sane ox, a wise vote. a mix of six, the odd pixel, the odd pixel. the sly fox, a dim case, the cold cut, the cold cut, a mix of six. some max tax, a dim case, a red cot, some max tax. the cold cut, the extra exit, a dim lamp, the sane ox. yes, a hot bun, no, an old axe.",
        "no, the wet deck, the cold cut, the next fix. a dim lamp, the box, the sly fox, a dim lamp, a mix of six. the exit signs, a big van, the exit signs. a red cot, a mix of six, a big van, the detailed text, a dim lamp. an old axe, a red cot, a dim lamp. the odd pixel, one wax seal, a big van, the detailed text, the wet deck.",
        "the detailed text, a big van, a red cot. the sane ox, the odd pixel, a big van, no, the vast sand. the exit signs, an old axe, an old axe, the odd pixel, the exit signs. the odd pixel, a mix of six, no, a red cot, some max tax. the vast sand, a hot bun, a mix of six, the cold cut. the detailed text, the detailed text, the next fix, the cold cut.",
        "the cold cut, a red cot, the sly fox. a wise vote, no, the vast sand, the sly fox, the sly fox. no, one wax seal, a dim case, a red cot. the sane ox, a mix of six, the extra exit, the sly fox. the exit signs, the exit signs, yes. the box, the detailed text, the odd pixel, one wax seal. a hot bun, an old axe, the sane ox, the vast sand.",
        "some max tax, some max tax, a red cot. the detailed text, an old axe, a dim lamp, an old axe, a dim case. the sane ox, the sly fox, the cold cut, the sane ox, an old axe. the next fix, some max tax, the vast sand, some max tax. one wax seal, no, some max tax, the box, the odd pixel. the cold cut, one odd can, a big van, the exit signs.",
        "a mix of six, the detailed text, a dim lamp. the extra exit, a red cot, the odd pixel, yes. the vast sand, a red cot, a hot bun. the next fix, a wise vote, yes, some max tax, a dim case. a dim case, a wise vote, the next fix, some max tax. an old axe, a red cot, the box, the detailed text, a mix of six.",
      ],
      difficulty: 3, mastery: { wpm: 30, accuracy: 90 }
    }),
    mk({
      id: 's3-11', stage: 4,
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
      id: 's3-12', stage: 4,
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
     STAGE 5 — COMPLETE ALPHABET (capitals, numbers, punctuation)
     ====================================================================== */

  var STAGE5 = [
    mk({
      id: 's4-01', stage: 5,
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
      id: 's4-02', stage: 5,
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
      id: 's4-03', stage: 5,
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
      id: 's4-04', stage: 5,
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
      id: 's4-05', stage: 5,
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
      id: 's4-06', stage: 5,
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
      id: 's4-07', stage: 5,
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
      id: 's4-08', stage: 5,
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
      id: 's4-09', stage: 5,
      title: 'Numbers',
      objective: 'The number row sits under your middle fingers. Learn where the symbols live too, so you are not hunting for them later.',
      keys: [], newKeys: ['0-9'],
      passages: [
        "Write the code: room 274, zone 9, bay 5; wait until 4:05 pm. The bill came to $12.99 plus $0.75 tax; room 245, floor 3. In 1320, about 222 miles were counted by 3 staff members. Write the code: room 35, zone 7, exit 3; wait until 7:15 am. The bill came to $5.05 plus $1.19 tax; room 162, floor 2. On 11 September 1870, 198 tickets left dock 1 at 12:30 pm.",
        "The bill came to $4.75 plus $2.49 tax; room 164, floor 1. Write the code: room 267, zone 2, exit 3; wait until 10:10 am. Bus 36 leaves at 6:50 am; the next one leaves at 9:05 am. Write the code: room 292, zone 1, exit 3; wait until 12:30 pm. The bill came to $0.99 plus $0.75 tax; room 169, floor 2. In 1228, about 671 miles were counted by 3 staff members.",
        "Write the code: room 90, zone 6, seat 12; wait until 2:35 pm. The bill came to $4.75 plus $2.49 tax; room 176, floor 6. The bill came to $6.40 plus $2.49 tax; room 311, floor 1. Write the code: room 48, zone 2, exit 3; wait until 4:05 pm. In 1188, about 765 tickets were counted by 3 staff members. The bill came to $2.05 plus $0.75 tax; room 184, floor 4.",
        "In 1973, about 576 sites were counted by 3 staff members. Bus 66 leaves at 2:35 pm; the next one leaves at 4:55 pm. The bill came to $2.05 plus $0.75 tax; room 157, floor 3. In 1302, about 416 miles were counted by 3 staff members. Bus 42 leaves at 11:11 am; the next one leaves at 10:40 am. In 1294, about 259 miles were counted by 3 staff members.",
        "The bill came to $5.05 plus $2.49 tax; room 45, floor 4. The bill came to $2.05 plus $0.75 tax; room 40, floor 4. Bus 52 leaves at 8:45 pm; the next one leaves at 4:55 pm. In 1615, about 259 miles were counted by 3 staff members. In 1171, about 348 vans were counted by 3 staff members. On 27 March 1699, 2 days left room 214 at 7:15 am.",
      ],
      difficulty: 5, mastery: { wpm: 40, accuracy: 89 }
    }),
    mk({
      id: 's4-10', stage: 5,
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
      id: 's4-11', stage: 5,
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
      id: 's4-12', stage: 5,
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
     STAGE 6 — WORDS AND SENTENCE PRACTICE
     ====================================================================== */

  var STAGE6 = [
    mk({
      id: 's5-01', stage: 6,
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
      id: 's5-02', stage: 6,
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
      id: 's5-03', stage: 6,
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
      id: 's5-04', stage: 6,
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
      id: 's5-05', stage: 6,
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
      id: 's5-06', stage: 6,
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
      id: 's5-07', stage: 6,
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
      id: 's5-08', stage: 6,
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
      id: 's5-09', stage: 6,
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
      id: 's5-10', stage: 6,
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
      id: 's5-11', stage: 6,
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
      id: 's5-12', stage: 6,
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
     STAGE 7 — SPEED AND ACCURACY TRAINING
     ====================================================================== */

  var STAGE7 = [
    mk({
      id: 's6-01', stage: 7,
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
      id: 's6-02', stage: 7,
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
      id: 's6-03', stage: 7,
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
      id: 's6-04', stage: 7,
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
      id: 's6-05', stage: 7,
      title: 'Home Row Bursts',
      objective: 'Pure home-row movement in short fast bursts: doubled keys, neighbour hops, then real home-row words such as flash and glass. An ideal warm-up that teaches the fingers to move without hesitating.',
      keys: [], newKeys: [],
      passages: [
        "at dg ff jj ss io ff jj ;f ri ti k; kk h; hk hl fh dg fs dl ti la ks oo kk ri dg ff da hh dj nd jd en ee la da gj la aj st se er ri he dd ar al hh ff hk ti en io ha sg jg at kf at fd jd te ss ha ar at ne hh fl io lk ss in ee dj hl ll ri ee ds dj nd dd it ti ti an kf gh lj la dd ar dd it hh ja ri te h; nd fl at gs ar en ll te th it ss ka tt sa la he lg f; sg kk gg ee ll an or ;; ll jf",
        "gg dad he half sf ne dash or hj ds ka tt or glad dd halls jl sad fall lf flask dk salad ll hands ag an half lash glass ga it man eyes st dad st glad or sk flasks jl gals their on sad dad gash write ti ra asks k; th gg en gash halls ;; hall fad se ne ri data f; at an te en palm j; ;g dh th kj af an js fall add glad add flag sf lad hj es lag gd te hash van hash rusty salad ti dh ;f la",
        "lad as ss flasks kd add sf ag gg ah flasks lag flasks jj dd glass hd flag ou lag gk s; re lad ;l hh lg fad ha hash h; ;a flask ag fad flasks hall salads dad glass in lass java adds aa flash lads sure an ar nd oo flask flash dash salad sa aj en flasks asks super ask their gash ll half hh s; aa flasks oo io gg ;l gash fall glad tt jg lass ff alas nd hash lad kj lag steady kk sure ss route",
        "er kj re ff jg s; gs aa ri lg dh kj dd jd ag fg ag dd ff ff ;a gg oo ff lh th hh fj ti er he an dh hf ld j; da ha hk k; kk ;a re ;l hk dd ah gl te ri kh sf a; ;j hf lg ee io sj lh st ll an f; en la ff ti fd hh aj tt fa er dh gh sl fl he ;g ll dg fa da ;g hh ne ar gg ar ti kj kh hh kk hk kk dd al ee ff er lj ga l; ee kl ff nd aj dd jf la es ;g l; ne j; ;l ;l k; st da g; ad hl aa as la",
        "lad ff hh ll shah fj lad flash trust salad al es ri ff g; salad ss kj io sf flag kk eyes la glad es salads half speed ff io ll an lass in flag ar lass alas ne salads ll kk se ss ra java fad lads and ff io te nd hh al dash jj flash se ne twist ;j flag ff ff lf fg gg data salad lash ;f flags on flash fl ;k dash fg lass in shah ri nd on jf flask ss ;; dd glad hh jf lad ri ti salads ks halls",
      ],
      difficulty: 4, mastery: { wpm: 50, accuracy: 95 }
    }),
    mk({
      id: 's6-06', stage: 7,
      title: 'Top Row Bursts',
      objective: 'The same idea on the top row, where the little fingers do most of the work.',
      keys: [], newKeys: [],
      passages: [
        "ii oo at la tt pe rq tp ar ww ww ot io pw al yw rr ll yp qp oo th oo ip re an ww io ru ra ee tt ra rr re qq on oo yy ri ri tt se ss te ti ou er an oo it se es ir ff ne oo al it ui uu ew tp oo ue ti ru he po it ee ow ou st ll yr qo in it ry en ll ro oi or yq ie ll qr op he at ru ss ii rr ty ss qr ee ou qq ar oo pt qq rr iq it in ee ii te ar te he tt he ss ie ww tq yq en wi pt he yp an",
        "tr tours oq wr your true ff pp nd text es tours twists he se tu re roost route tryst yr ra oo tops da th ropes ii iu ee ll ee ry in wt trust st en eq st super st twists tp an rt we da power sure steady asset ropes qr trust ll routes tryst iw rusty route text ww wt or issue ti ey ee the uy he rusts quota wi asset asset twist ti ii ll yes tiers an and ropes wrist on or yours he route nd",
        "tours step rust potato it writes th quiet ti typing quiet ropes spree super type et ii pp es ee oo eyes steps issue ww ou on south true purse tt spree wu ei uq yt qp io rusty uu flash qq issues type es oo la ww es er yes tours yo rr te ye ty power route type and route he pt it ou ee qe ue en tryst wp spree quietly qq trust steady es se twists tiers rope yes we rhythm ss th steep or en",
        "iw ui ii ri qp it at qq ip qe qq al ue es uu ii pp yy yo he th ti rr op pp yr on th yo al ww eq er se qq ou io te ss pp uw rr ww qt ri qq nd oo pi at ti wr ou se ii pq pt ti da ri rt rr nd eq uy qo er qq up oi iu qu ti io wi pp yy uu ii qq ra se wi an to ar rt uu ei te qw ey yo se ra pp wr rr iu qi he ot pp tt ww al yy ne ro oo ww ep tr rp ow oo io po an io ow st pp uu ow st ww st er",
        "io pp quota la palm sure eyes ss tops io rp uu ri eyes issues la quietly quota data steps er st calm uy true purse er sure pours al and rope nd ra ii ww it south speed steep an asset sure he type ei steps ee issue ru pour ne eyes an la super ee uu pr rusts issue pp er twist et ll and wp ra twist step oo es spree ii tiers rusty ar ri pr qq an pour ww on ri ss tp ww twist io rp en it ra",
      ],
      difficulty: 5, mastery: { wpm: 50, accuracy: 94 }
    }),
    mk({
      id: 's6-bb', stage: 7,
      title: 'Bottom Row Bursts',
      objective: 'The burst idea for the bottom row, where every finger has to curl under. Short real words and clean repeated groups, with no thinking between keys.',
      keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'], newKeys: [],
      passages: [
        "nn nc en xx x. ,, nn // bb bx n. /b vv ra xm on te es x/ nm /n zb .v bv st mm la he bv zb in ne bb nx ./ ee tt ., er ri it es .. bb th or se tt on ar .v th cv da n, at ss /z he ./ bc tt an al cc vb v/ ri it // al m, ri ou bb io er en ne vm ,b oo z/ er ,/ bb nn er es cx ti nb zx nm n/ it ti ne an se vx mn al ll or v. vv oo bx ,, nx es it zn m/ zz oo ff vv st he al se cb re cn cc en re",
        "canal your bans zax nx nab /b text ,b it nab write nab mama ou vv ar balm cx te canal mama se type at an c/ man st nab er calms calms nn vans bb xx or ban nd er re vv canal /z /m typing zz mm sure it ff vans balm /z it nd practice x/ bans balm route b. bb calms zax ,z ar vans java ., re ou it balm bans potato .v wrist // cv v/ cm nab or ri en sure zz // bb balm mm can te mama can th",
        ".. java bb la mama bb al st mama cans // cans mama xb cans canal text canal ban ee canal ra la mx n. zz zz ban ar ee canal nana /m balm can ll cans m/ b/ ban canal rusty la cc vx cans twist or en se ff zz ll er ee al or bz cc nab ri cc nb nabs for nana balm ban speed ar .c la ll balm cz cz bans ou cz tt bans balm ri th ,/ c. mm /z bb canal zax mm da ,x zx canal .n ,z zz mc cams vans",
        "ou nn ss mn nn da ll nn c, bb ee vv al ll cc bz ll ou mm mb z/ /z nn on x, la on cb zc // ,, zc /m cc ., an at nn ,. ar ,, re x. bb io vv b, xm ll ff an bx zc bx la xn .m vv /. cc xx /b x/ ,n .. /v xx c. mx es st vv la vv xx oo mc in en bz nz nv tt nx xx mm ,, ,m ra ou nx bb mm // x. ff ,c tt ra on bn x. .b mx .. ee oo vv m. cb /b .b .x mn cx z. io th vv /z mm cc mm zx mx .n mn ti se",
        "super th canal nz nd zv ll canal nn nabs zm cm van cams man calm vans en at /z mn calm cn cans in bans canal mama er cans mama ll cans quiet cans ban vans bans calm cb cc cans cans ne nm st at nabs ., van .m xz x/ java vans bans mama nn re zax nabs da can at re ,, balm typing or in there ff bans mb vans ff ban ,m nana cans nana or al nn nab v, hands es calms cans java vm vans in st in",
      ],
      difficulty: 5, mastery: { wpm: 50, accuracy: 94 }
    }),
    mk({
      id: 's6-fkb', stage: 7,
      title: 'Full Keyboard Bursts',
      objective: 'All three rows in one continuous burst. Trust your hands, keep the eyes one line ahead, and let the words flow without pauses between rows.',
      keys: [], newKeys: [],
      passages: [
        "uu ll ;f ad tp ra xm cn sk in mm // v, m. es ,, iq ou mv dd la we ss ri ss /v yp zx ll ar z. se ww /, .. ha wi sd ra v/ nd vm ff rr er he cm te ff gl te da nn cc vv re .. ,. l; mn ar ra ey tt ey ww th ;a ii rr it mm wi x. xv wr zc tt se ei it bb ss ja al .x df ff eq nn gg kk aa ne mv pi it es la kk al ka s; ww ff ss // // hj pu uo sl tt vv hg ww ei ff hh gg cz ee ww kk tw zz sg /. es",
        ",, it eyes nm /n ask he yy ks ll potato oo d; potato yw burst es hands man practice ak super steady /. typing glass ur oy your man van a; rusty hands your ou rhythm hands hands hands qu yt uu tt sure z/ aa on super gf ee zx rusty oo practice data qw data calm ra eyes for trust rusty ut la st ask there flash type cc kk and dd in al their ru xx x/ eyes you ff an ga gl pq practice pp write",
        "you ee tp cc ti rhythm java eyes burst ey qp flash oe mv .m super on ,m /x st quiet man ,/ ri /. or kf b, quiet uq potato aj issue se rusty to data gl v, potato ll at man iq quiet their ,n and ss ,n ne ti for .. twist xx oo yy for bc typing van ee kk rr flash trust pt ou da data pq ,, ll calm pw potato man power /, quiet ti or or kj in gj their kk route speed cc type ee you .c th bc",
        "in ee xx c/ oo te jh ,, it z, yr hh pq ;; jk dd po cb xx ru er lj h; hd .v pp io er ri /. yy gg tt yy on yi fa da vv bc yy yo gh nd kl ., ty v. at xm qt ;a ir /x tq tt ha xx pp ks kk yu .x pp pw qu ei fs rq fg yy at wt ;l bb fl hj nn jj qo x. nz zz .v it rr ut eq or m, mm jj yy ee df oo tt zm ry jj ee oi ,. la kl kg sj oy at ri ty rr zz qq l; tt rr uu rw ll tt ll ,, hh ne ot jj b, ah",
        "van yp palm bb you b. the sure iw zx their xn qe nd jf hg java ar calm yy power wr sure ,b ee ty route oo super kk at hl oo af n/ sg at ww er ll // burst b/ hs issue rt ri yi oo super ep zz jj nd and for palm gg java ti their he glass j; wr gg rr // x/ ,, ar nc ff write aa van sk x, cc on van da power wrist super ,, gl super calm twist la mz route da van ey bc tt te ii wrist wi type",
      ],
      difficulty: 5, mastery: { wpm: 52, accuracy: 94 }
    }),
    mk({
      id: 's6-07', stage: 7,
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
      id: 's6-08', stage: 7,
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
      id: 's6-09', stage: 7,
      title: 'Sprint Practice',
      objective: 'A full block of clean natural text with nothing unusual in it. Push the pace through the whole passage and watch the timer in the stat bar — this is where rhythm becomes speed.',
      keys: [], newKeys: [],
      passages: [
        "There is no substitute for it either. The training is not really about moving faster. The same two keys give them trouble for years without practice. Your hands stop thinking about it. Our flight leaves at zero six forty five on the third of May. Everything after that is simply deciding how fast you",
        "want to go. Beginners are told to look at the keyboard. Rain began softly and the sound of it made the room feel calm. The training is not really about moving faster. Do you know where the best coffee shop is? Rain began softly and the sound of it made the room feel calm. That is not a sign that something is wrong with your progress. Home he said back before nine o clock tonight please. You will",
      ],
      difficulty: 5, mastery: { wpm: 60, accuracy: 94 }
    }),
    mk({
      id: 's6-10', stage: 7,
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
     STAGE 8 — ADVANCED PRACTICE
     ====================================================================== */

  var STAGE8 = [
    mk({
      id: 's7-01', stage: 8,
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
      id: 's7-02', stage: 8,
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
      id: 's7-03', stage: 8,
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
      id: 's7-04', stage: 8,
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
      id: 's7-05', stage: 8,
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
      id: 's7-06', stage: 8,
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
      id: 's7-07', stage: 8,
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
      id: 's7-08', stage: 8,
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
      id: 's7-pvw', stage: 8,
      title: 'Proverbs and Wordplay',
      objective: 'Proverbs, tongue-twisters and playful prose: doubled letters, apostrophes, quotes and numbers all together. Twisty text like this makes ordinary sentences feel easy afterwards.',
      keys: [], newKeys: [],
      passages: [
        "\"The early bird catches the worm,\" said Grandma Rose, \"but a steady hand wins the day.\" She folded her apron, smiled, and added, \"You cannot count your chickens, dear — mind them instead.\" That evening three friends sat in the garden. One spoke of far roads; two stayed past midnight; none left wholly unimproved.",
        "\"Six sleek swans swam swiftly southwards,\" she practiced, lips tight. \"Surely such silky shifts shear spring swells!\" Then, breathless: \"Peter Piper packed proper pillows today.\" Doubled letters stack slowly at first, but a steady rhythm keeps the tongue quiet and the fingers warm; slippery pairs smooth out with patience, one extra pass, and a small nod to the mirror.",
        "Practice makes perfect, and patience makes practice pleasant. A rolling stone gathers no moss, yet a sitting stone grows nothing at all. Measure twice, cut once — that is the carpenter's rhythm, and the typist's too. Well begun is half finished, and small steps finish long roads. He who never stirs the soup still fusses; he who stirs gently watches everything.",
        "In 1912 the mill's ledger listed 3 speeches, 2 oaths and 1 apology; by 1984 a typewriter's clatter filled the district's hall from 9 sharp to 5 o'clock. \"Verse isn't slang, madam,\" the clerk said, \"it's arithmetic you can hear.\" All 4 witnesses signed at 3:15, each noting the hour's small delay in a neat, slanted hand that favoured longer sentences.",
        "The old typebar's shadow fell across the page. Long words gathered like weather above the desk: unaccountable, philosophical, notwithstanding. The writer's ring finger hesitated once, twice, then found its nerve; the sentence flowed unbroken at last. \"Anything worth typing is worth typing slowly,\" she thought — until, almost without warning, the slowness itself grew fast.",
      ],
      difficulty: 4, mastery: { wpm: 62, accuracy: 92 }
    }),
    mk({
      id: 's7-09', stage: 8,
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
      id: 's7-10', stage: 8,
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
      id: 's7-11', stage: 8,
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
  var LESSONS = STAGE1.concat(STAGE2, STAGE3, STAGE4, STAGE5, STAGE6, STAGE7, STAGE8);

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
  // Stage 2 holds the whole key-column-drill sequence, so every letter
  // (plus comma, full stop and slash) is announced across those drills:
  var WITH_KEYS = BASE + ' qwertyuiopzxcvbnm,./';
  var WITH_CAPS = WITH_KEYS +
     'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +                        // capitals
     '\'"?!-:()[]{}<>@#&*+=_|\\/~`^%$' +                   // symbols
     '0123456789';                                         // numbers
  var STAGE_ALLOWED = {
    1: BASE,
    2: WITH_KEYS,   // every key column drill (top and bottom row)
    3: BASE,        // first words use only the ten home keys
    4: WITH_KEYS,
    5: WITH_CAPS,
    6: WITH_CAPS,
    7: null,  // null = no restriction from here on
    8: null
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
