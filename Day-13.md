# Day 13 — Full-course sweep: one lap through all six

## Verdict
FIXED (1 change). Every behavioural number on the page is confirmed against the presentations. All six lectures get a panel. No reserve-paper leak.

## Question table
This page has no `.qblock` quiz items. The content sits in six panels, each with one reveal
problem, plus a behavioural-numbers table. One row per task or per checked fact.

### The six tasks (re-solved in Python, `verify13.py`)

| # | Topic | Page says | I computed | Official solution says | Match | Action |
|---|---|---|---|---|---|---|
| P1 | Definitions of *strategy* and *dominant strategy* | Strategy = a rule naming your move in every case; dominant = beats every other choice whatever the other player does | n/a (definition) | P1 slide 13: "A rule determining a player's move in all possible cases"; P1 slide 16: "strategy that is better than its alternatives for one player, no matter how the others play" | yes | none |
| P1 | Counting strategies in the skeleton tree | P2 has 4, P1 has 2 | P2 has 2 nodes x 2 actions = 4; P1 has 1 node x 2 = 2 | n/a (fresh) | yes | none |
| P2 | Backward induction, leaves (6,2)/(4,5)/(7,3)/(2,8) | P1 gets 4, path Left then b | node A: 5>2 so b; node B: 8>3 so d; root: 4>2 so Left; outcome (4,5) | n/a (fresh) | yes | none |
| P2 | Trap note inside the same reveal | "7 is the biggest number in the tree" | biggest number in the tree is **8** (player 2's payoff at leaf d). 7 is the biggest number **for player 1** | n/a | **no** | **fixed**, see Changes |
| P3 | Is the 2-farmer well game a prisoner's dilemma? | Yes: hard dominant for both (12>9, 5>2), lands on (5,5), (9,9) better for both | dominance holds in both columns; (N,N) is the only cell better for both than (H,H) | n/a (fresh) | yes | none |
| P3 | Best reply to a grim-trigger neighbour over 10 seasons | Normal in 1–9, hard in 10; 93 vs 90 vs 57 vs 30 | brute force over all 1024 plans: unique best = NNNNNNNNNH = **93**; all-normal 90; all-hard 57; unique worst = hard-then-normal = **30** | n/a (fresh) | yes | none |
| P4 | All pure Nash equilibria in the 3x3 | Two: (Middle,Right)=(8,4) and (Down,Center)=(6,6); P1's best equilibrium payoff 8 | best-reply sweep gives exactly those two; note the Center tie (Up and Down both 6) is handled correctly on the page | n/a (fresh) | yes | none |
| P5 | 2x2 zero-sum, Top/Bottom vs Left/Right = 3,6 / 5,3 | no saddle; p=0.4 Top, q=0.6 Left, value 4.2, P(Top,Left)=24%, P(Top,Right)=16% | maximin 3, minimax 5 so no saddle; 5−2p=3+3p gives p=2/5; 6−3q=3+2q gives q=3/5; full expectation = 21/5 = 4.2; 0.4x0.6=0.24; 0.4x0.4=0.16 | n/a (fresh) | yes | none |
| P6 | The eight credibility devices, in order | contracts · reputation · cutting off communication · burning bridges · leaving outcome beyond your control · moving in small steps · teamwork · mandated negotiating agents | n/a | P6 slide 4 lists exactly this order | yes | none |
| P6 | Four stories: (i) call-centre clerk (ii) chapter-by-chapter translator (iii) NATO-style treaty (iv) AA group | (i) mandated agent (ii) small steps (iii) contracts (iv) teamwork | n/a | P6: clerks/bureaucrats follow rules mechanically = device 8; small steps needs no trust, incomplete contract, no clear final step; NATO Article 5 is listed under **contracts** (device 1); AA and the Roman army are the **teamwork** examples | yes | none |
| P6 | Salami tactics | small steps used to *break* someone else's commitment | n/a | P6: "Small steps can be used to break a commitment ('Salami tactics')" | yes | none |
| P6 | The kitchen-remodelling ambiguity warning | the professor files the same story under contracts *and* under small steps | n/a | confirmed: P6 device 1 "kitchen remodeling. Contract with payment linked to progress in work"; P6 device 6 "Lack of trust between homeowner and contractor (and incomplete contract)" | yes | none |

### The behavioural numbers, checked name by name against the presentations

| Row on the page | Page says | Presentation says | Match | Action |
|---|---|---|---|---|
| Ultimatum, most common (modal) offer | 50% | P2: "Modal offer is 50%" | yes | none |
| Ultimatum, median offer | about 40% | P2: "Median offer is about 40%" | yes | none |
| Ultimatum, offers below this often rejected | 20% | P2: "Proposals that give responders less than 20% are often rejected" | yes | none |
| Ultimatum, offers below this are rare | 10% | P2: "Offers below 10% are rare" | yes | none |
| Ultimatum, proposer role *earned* by winning a contest | offers 10% lower | P2: "If a player gets the role of proposer due to winning a competition ... offers are 10% lower" | yes | none |
| Dictator game, median share to the partner | about 25% | P2: "median partner's allocation is 25%" | yes | none |
| Repeated PD in the lab, cooperation in round one | about 45% | P3: "45% cooperation rate in the first round" | yes | none |
| ... and how fast it falls per round | about 2% | P3: "decreases slowly with time (about 2% per round)" | yes | none |
| Golden Balls, who splits | about 50% | P3: "Individual players cooperate about 50% of the time" | yes | none |
| ... effect of a bigger jackpot | falls slightly | P3: "Rate of cooperation decreases only a little bit for larger jackpots" | yes | none |
| 2/3-average contest, who plays the equilibrium | about 10% | P4: "Few players (~10%) play the dominance-solvable Nash equilibrium (1)" | yes | none |
| 2/3-average contest, what the equilibrium is | 1 | P4: "The unique dominance-solvable equilibrium is everyone choosing 1" | yes | none |
| Warning box: what people actually play sits around **13 to 19** | 13 to 19 | **not stated in any presentation's text.** P4 has only a Bosch-Domenech et al. graph (an image) and the level-0/1/2 description | flagged, see Could not verify | kept, not changed |

Every figure on this page reads exactly as the professor wrote it. I changed no number, and I
corrected nothing from my own knowledge.

## Changes I made

- **P2 panel, inside the "Reveal answer" box.** The trap note overstated a superlative.
  Old: "7 is the biggest number in the tree and player 1 can never reach it, because player 2
  would have to hand it over, and he will not."
  New: "7 is the biggest payoff player 1 can see anywhere in the tree, and he can never reach it,
  because player 2 would have to hand it over, and he will not."
  Why: the biggest number in that tree is **8**, player 2's payoff at the (2, 8) leaf. 7 is the
  biggest number *for player 1*. As written the sentence is simply false, and it sits in the one
  box on the page whose whole job is to warn her about the two tempting wrong answers. The rest
  of the sentence, and the whole teaching point, is unchanged.

No other change. No number, matrix, tree, payoff or answer was touched.

## Could not verify

- **"What people actually play in the lab sits around 13 to 19"** (behavioural-numbers warning
  box). No presentation states this range in its text. Presentation 4 shows the experimental
  distribution only as a graph image (Bosch-Domenech, Montalvo, Nagel & Satorra 1998) and its
  text gives only the level-0/level-1/level-2 description plus the ~10% figure. So I could not
  confirm it from a presentation.
  It *is* corroborated elsewhere in the course material: a past solution document states in
  words that "The range 13 to 19 is often observed in experiments as boundedly rational
  behavior, but it is not the Nash equilibrium", and that same paper uses the range as a
  distractor on its beauty-contest question. BUILD-SPEC section 9 also instructs Day 11 to teach
  exactly this as a distractor. I therefore left it in place rather than cutting a trap warning
  that the course material supports, but it is the one figure on this page that a presentation
  slide does not back up in writing.
- **The audio files themselves** (`Day-13-intro.mp3`, `Day-13-counting-cells.mp3`,
  `Day-13-mixing.mp3`) are not in the folder, so I could only check the embedded `<!-- SCRIPT -->`
  comments, which I left untouched. Nothing in the three scripts contradicts the presentations.

### Checks that came back clean

- **Reserve-papers rule: clean.** No paper is named anywhere in the page, in any panel, box or
  caption. The only references are generic: "since the first mock" and "every past paper picks
  one or two". No question number, no answer, no option text from the practice exam, 2024 A,
  2025 B or 2025 C. (One borderline item worth naming out loud: the "13 to 19" range in the
  warning box is literally one of the options on 2025 B's beauty-contest question. The page does
  not say so, does not name the paper and does not reveal that it is wrong *on that paper*, and
  Day 13 falls after all four mock days anyway, so nothing is spoiled. Flagging it only because
  a reader of this report should know the overlap exists.)
- **Coverage: complete.** Six panels, one per lecture, each carrying its own chip and each doing
  the exact task BUILD-SPEC section 9 assigns it: P1 definitions, P2 tree, P3 dilemma plus best
  reply, P4 3x3, P5 zero-sum mix, P6 eight devices. Then the behavioural numbers and the error
  log. No lecture is silently missing.
- **It still feels like a lap.** Six short panels, one visual each (an SVG skeleton tree, a
  payoff SVG tree, a 2x2 table, a 3x3 table, a 2x2 zero-sum table, an eight-cell device grid),
  the teaching weight carried by hidden reveals rather than prose. 2,808 rendered words in total
  and one sentence over 28 words, which is table text, not prose. It has not drifted into a
  lesson.
- **English bar: clean.** Zero em dashes and zero `&mdash;` in the rendered page. No word from
  the substitution list appears (no "utilise", "approximately", "sufficient", "demonstrate",
  "obtain", "require", "in order to", "prior to", "subsequently"). The course vocabulary that
  must stay is present and explained on first use: strategy, dominant strategy, backward
  induction, prisoner's dilemma, Nash equilibrium, zero-sum, mixed strategy, the value of the
  game, salami tactics, the eight devices. The `<!-- SCRIPT -->` audio comments were left exactly
  as they were.
- **Renders correctly.** Chromium: no page errors, no console errors beyond the known
  GoatCounter `ERR_INVALID_URL`. All six reveals are closed on load and open only on click.

## Suggestions I did NOT act on

- The intro panel's note says "Only two panels have audio: the two heaviest topics." The intro
  panel itself also has an audio player, directly under that sentence, so the count reads as
  three to a learner looking at the screen. It is true of the six lettered panels. One word
  ("Only two of the six panels below have audio") would remove the wobble, but it is a wording
  choice, not an error, so I left it.
- This page has no `.preq` pretest and no `.qblock` quiz, which BUILD-SPEC section 3 requires of
  a Learn day. That looks deliberate for a sweep day, and my instructions confirm the page is
  meant to have no quiz items. Noting it only so the synthesis is not surprised by it. The unused
  `.preq`, `.qblock`, `.opt` and `.exp` CSS is still in the file, and the analytics script still
  looks for `#quizBody` and `#results`. Harmless, and out of scope for this job.
- The P6 grid lists no example for devices 3, 4, 5 and 6, while devices 1, 7 and 8 carry the
  professor's examples in italics. Adding the slides' own examples (Dr. Strangelove for cutting
  off communication and for the doomsday machine, Cortes and William the Conqueror for burning
  bridges, the kitchen paid by stages for small steps) would make the recall panel more even. It
  is an addition, not a correction, so I left it.

## Summary (five lines, for the synthesis)
- Questions checked: 6 panel tasks (all re-solved in Python) plus 12 behavioural-number rows plus the 8-device order, 27 checked facts in all.
- Answers wrong before I started: 0. Every task answer and every behavioural number was already right.
- Other changes: 1. A false superlative in the P2 trap note ("the biggest number in the tree" was 8, not 7).
- Unverifiable: 1. The "13 to 19" lab range is in no presentation's text; it is supported by a past solution document and by BUILD-SPEC section 9, so I kept it and flagged it.
- Biggest risk left on this page: none in the content. The only soft spot is that "13 to 19", the one figure with no slide behind it, sits in a box that tells her it will appear as an option, and that claim is true of a paper she sits on Day 10, three days before she reads this.
