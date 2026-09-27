# Day 01 — Exam map + backward induction

## Verdict
FIXED (2 changes) — one of them a confirmed reserve-papers leak that spoiled the Day 7 mock.

## Question table

All six quiz items, both worked examples, all three try-it reveals and both worked-example
variants were re-solved in Python by backward induction. Script:
`scratchpad/verify.py` and `scratchpad/quiz.py`.

| Q | Topic | Page says | I computed | Official solution says | Match | Action |
|---|---|---|---|---|---|---|
| Quiz 1 | 3-player tree, payoff of player II | 2 | outcome (7,2,4) via L then l → II gets **2** | n/a (fresh variant) | ✓ | none |
| Quiz 2 | Misère 21-flags, 15 flags left | take 2 | losing counts are 1,5,9,13,17,21; from 15 the only winning move is **take 2** | n/a (fresh variant) | ✓ | none |
| Quiz 3 | 2-player tree, payoff of player 2 | 6 | outcome (5,6) via Down then c → P2 gets **6** | n/a (fresh variant) | ✓ | none |
| Quiz 4 | 3-node chain, payoff of player 1 | 6 | P1 stops at node 1, outcome (6,1) → **6** | n/a (fresh variant) | ✓ | none |
| Quiz 5 | Inverse item: which single change makes A stop first | change final (14,18)→(14,10) | only that change flips it: outcome (5,1), path = stop. The four distractors all leave the path unchanged at cont/cont/cont/cont | n/a (fresh variant) | ✓ | fixed the "12" distractor arithmetic (see Changes) |
| Quiz 6 | Counting strategies, 2 nodes × 3 actions | 9 | 3² = **9**, enumerated 9 plans | n/a (fresh variant) | ✓ | see Changes |
| Worked ex. 1 | Main tree, payoff of player 1 | (3, 8), P1 gets 3 | path B then R → **(3,8)** | n/a | ✓ | none |
| Try-it 1 | Same tree, (3,8)→(3,0) | she gets 9 | path B, L, X → **(9,1)** | n/a | ✓ | none |
| Worked ex. 2a | Centipede Version 1, final (14,20) | (14,20), P1 gets 14 | all four nodes continue → **(14,20)** | n/a | ✓ | none |
| Worked ex. 2b | Centipede Version 2, final (14,12) | (4,0), P1 gets 4 | P1 stops at node 1 → **(4,0)** | n/a | ✓ | none |
| Try-it 2 | Node 2 worth (2,8); P1 can stop at (9,1) | she gets 9, done | stop = 9 > cont = 2 → **9** | n/a | ✓ | none |
| Worked ex. 3a | President vs Congress, whole-package veto | both pass, (3,3) | Congress values {both:3, U:2, M:1, nothing:2} → send both → **(3,3)** | Presentation 2 p.6: "Both U+M are implemented, payoff of 3 for each player" | ✓ | none |
| Worked ex. 3b | Same, with line-item veto | neither passes, (2,2) | Congress values {both:1, U:2, M:1, nothing:2} → **(2,2)**, Pareto-worse | Presentation 2 p.7: "Neither expenditure is implemented… Pareto-worse" | ✓ | none |
| Try-it 3 | 21 flags, 14 left | take 2, leaving 12 | losing counts are the multiples of 4; from 14 the only winning move is **take 2** | Presentation 2 p.9 table matches the page's table cell for cell | ✓ | none |
| Q4 exp. side-check | "change 13 to 8 and the answer becomes 9" | 9 | with 8 all three nodes continue → (9,14), P1 gets **9** | n/a | ✓ | none |

Source facts also checked against `Presentation 1  Introduction.pdf` and
`Presentation 2  Sequential games with perfect information.pdf`, all correct as printed:

- Fredo & Charlie payoffs 0/0, 150,000/250,000, −100,000/500,000 — exact match.
- President vs Congress payoff table (3/3, 4/1, 1/4, 2/2) — exact match.
- 21-flags win/loss table — exact match, including "at 21 take 1".
- Ultimatum game: modal offer 50%, median about 40%, offers below 10% rare, offers under 20%
  often rejected in anger; dictator game median 25% — exact match.
- 1984 Orange Bowl: behind, safe extra point first, risky two-point second, lost by one, lesson
  "if you must take a risk, take it as early as possible" — exact match.
- Strategy definition "a rule determining a player's move in all possible cases" — exact match
  to Presentation 1.
- Exam table (27/21/14/13/11/7/6, 14 questions, five options, 90 minutes, 7 points + 2 free,
  no formula sheet) — matches BUILD-SPEC section 1 line for line.

## Changes I made

1. **Reserve-papers leak in the centipede warnbox (the important one).**
   The page quoted **2024 A question 6** by name, with its correct answer and its full option
   list. Ifat sits 2024 A as a timed mock on **Day 7**. I confirmed the leak against
   `2024 A  detailed solution.pdf`: Q6's answer really is `a. 21` out of 21 / 1 / 10 / 9 / 0,
   and the quoted sentence is really from that solution. Reading the page a week earlier would
   have handed her that mark.

   Old: `<b>This really happened, twice, in one year.</b> In <b>2024 A question 6</b> the
   solution says it clearly: <i>"Although the game looks superficially like a centipede game, it
   is not. P2 is better off continuing in the last node, which induces both players to continue
   in all previous nodes."</i> The answer there was the <i>largest</i> option, 21, out of
   21 / 1 / 10 / 9 / 0. In <b>2024 B question 6</b>, a real centipede, the answer was the
   <i>smallest</i> option, 11, out of 11 / 17 / 24 / 29 / none of the other answers. Same visual
   shape, opposite direction. You cannot guess from the option sizes either.`

   New: `<b>This really happened in the course's past papers.</b> One paper has a tree of this
   shape, and its solution says it clearly: <i>"Although the game looks superficially like a
   centipede game, it is not. P2 is better off continuing in the last node, which induces both
   players to continue in all previous nodes."</i> There the right answer was the <i>largest</i>
   number on the option list. In <b>2024 B question 6</b>, a real centipede, the answer was the
   <i>smallest</i> option, 11, out of 11 / 17 / 24 / 29 / none of the other answers. Same visual
   shape, opposite direction. You cannot guess from the option sizes either.`

   Why: removes the paper name, the question number, the numeric answer and the option list, so
   nothing identifies the question. The teaching point (a tree that looks like a centipede may
   not be one) and the professor's own wording both survive. **2024 B stays named in full**,
   because 2024 B is a reserve paper and is never sat as a mock. I also dropped "twice, in one
   year", because with 2024 B named that phrase would have identified the other paper as 2024 A.
   I verified the 2024 B claim independently: `2024 B  detailed solution.pdf` Q6 answer is
   `a. 11` ("stopping is better than continuing in all nodes of this centipede game… gives 11 to
   player 1 and 3 to player 2"), and `2024 B  scrambled exam.pdf` Q6 options are exactly
   11 / 17 / 24 / 29 / none of the other answers.

2. **Quiz 6, the "12" distractor explanation gave a calculation that does not produce 12.**
   The answer key (9) was right; the rationale for one distractor was not.

   Old: `12 is what you get if you also count player 1's two options as his.`
   (3 + 2 = 5 and 9 + 2 = 11, so no reading of that sentence reaches 12.)

   New: `12 is 3 &times; 2 &times; 2: his three actions, times his two nodes, times player 1's
   two moves. Player 1's moves belong to player 1's plan, not to his.`

   Why: BUILD-SPEC section 12 rule 8 requires "the exact wrong calculation behind each tempting
   distractor". Now the arithmetic shown actually lands on 12.

No other change. I did not touch any script comment, any number in a tree or table, any answer
key, the CSS, the structure or the question order.

## Checks that came back clean

- **Answers reveal only after a click.** Verified live in Chromium. On load: 0 visible `.exp`
  and 0 visible `.reveal`. After clicking one option in each of the six questions, all six
  explanations opened and the correct option was marked. The three `.reveal` boxes stayed hidden
  until their button was pressed. No page errors at all (not even the GoatCounter one, which is
  a resource error rather than a script error).
- **Correct answers spread across letters.** The render-time shuffle is intact; on the run I
  tested the keys landed on B, E, E, C, E, C.
- **No quiz item repeats a worked example or a try-it.** Checked pair by pair. The quiz trees use
  (7,3)(1,9)(5,6)(6,4); (6,1)(3,9)(13,5)(9,14); (5,1)(3,7)(9,4)(7,12)(14,18); and the three-player
  set. None of those pairs appears in the taught trees ((6,2)(2,7)(9,1)(4,5)(3,8) and
  (4,0)(2,8)(12,4)(6,16)(14,20)/(14,12)). Quiz 2 reverses the flag rule and starts from 15, where
  the try-it was the ordinary rule from 14. Quiz 6 counts 2 nodes × 3 actions, where the page
  taught 3 nodes × 2 actions.
- **No quiz item carries an exam tag.** The `src` key appears nowhere in the QUIZ array, and
  0 `.examtag` elements render. The quiz note's claim "None of them is copied from a past paper"
  is true.
- **A visual in every concept panel.** Panel 1 (exam map) has the topic table; panel 2 (reading a
  tree) has the Fredo table and the solved-tree SVG; panel 3 (the three traps) has the two-chain
  SVG; panel 4 (strategy and freedom) has the President table and the 21-flags table.
- **Em dashes.** 12 in the source, all 12 inside `<!-- SCRIPT … -->` comments (lines 100, 108,
  143, 153, 156, 280, 284, 288, 409, 417). Rendered page text contains **zero**. Nothing to fix,
  and I left the scripts alone as instructed.
- **Audio and page agree** on every substantive teaching point. Checked all four scripts line by
  line: exam shape and five options, the 11% share, tree marks needing no algebra, solve right to
  left, "look forward and reason backward", the Fredo story, the solved path and the dashed
  branches, the unreachable big number, the three traps, "reachable, not just present", two trees
  with one payoff different, letters/colours/roman numerals for player names, strategy as a full
  instruction sheet, multiply across nodes, the line-item veto making both sides worse off, and
  the poison positions being evenly spaced. All present in visible text. Two small exceptions are
  listed below.

## Could not verify

- **The wording of the quoted solution sentence in the centipede warnbox, at source.** I did
  confirm it (it is genuinely from `2024 A  detailed solution.pdf` Q6), but after my fix the page
  no longer names its source, so a later reader cannot check it from the page. I am recording the
  provenance here instead. Nothing on the page is unsupported.
- **Nothing else.** Every number on this page traces either to a presentation PDF or to a fresh
  variant I re-solved in code.

## Two teaching points that live only in the audio

Reported, not changed, because editing the visible prose to add them goes past correcting errors.

- **Intro script:** *"There are three ways people lose a tree question, and none of them is
  arithmetic. Every one is a reading mistake."* The page has all three traps, but never says the
  framing line that they are reading mistakes rather than calculation mistakes. A reader who does
  not listen misses a useful piece of orientation. One sentence added to the head of the
  "three traps" panel would close it.
- **Section 3 script:** TOM's shopkeeper metaphor (a fixed price on the wall gives up the right
  to haggle, and that is exactly why nobody haggles). This is the clearest everyday handle on
  "your options are also a promise", and it is not on the page. The page does state the idea in
  its own words, so the meaning is not lost, only the metaphor.
- One consequence of my fix: the section 2 script says *"Both papers in one year had a tree of
  this shape"*, and after the fix the page says "one paper" plus 2024 B. The script names no
  paper, so it is not itself a leak, and the teaching point still appears on the page. I did not
  touch the script.

## Suggestions I did NOT act on

- **Two remaining mentions of mock papers, neither of which leaks an answer.** I left both, since
  they are exam-map teaching and the rule I was given is about spoiling answers. Flagging them so
  the synthesis can overrule me if it wants a stricter line.
  1. The "Where the tree questions sit" box: *"2024 A had two of them (Q5 and Q6), 2024 B had two
     (Q5 and Q6), 2025 A one (Q8), 2025 B one (Q7), 2025 C one (Q7)."* Says where tree questions
     sit, gives no content and no answer.
  2. The Trap 3 paragraph: *"2024 A asked for player 1 (=I) in a three-player tree. 2025 C asked
     for player 2 (=II) in the same three-player format. 2025 B called the players A and B. 2024 B
     called player 1 'the red player'…"* I checked all four claims against the papers and all four
     are accurate. Again, question format only, no answers. It pre-exposes the shape of three mock
     questions, which is the mild residual risk.
- **A residual hint in the fixed warnbox.** It still says the unnamed paper's answer was "the
  largest number on the option list". Five papers are candidates, so it identifies nothing, and
  the sentence after it ("you cannot guess from the option sizes") needs the contrast to work.
  If the synthesis wants zero residual, delete that one sentence and the following one.
- **Quiz 5's stem states its own setup**: *"Solved by backward induction, this game runs all the
  way to the last ending on the right."* Strictly this is a conclusion the learner could derive.
  I judged it necessary scaffolding for an inverse item (you cannot ask "which change flips it"
  without saying what it currently does), and the explanation still walks the full solve. Left it.
- The audio-only points above, if someone wants to add the two sentences.

## Summary (five lines, for the synthesis)
- Questions checked: 15 (6 quiz items, 4 worked examples, 3 try-it reveals, 2 worked-example variants), every one re-solved in Python.
- Answers wrong before I started: 0. Every answer key on this page was already correct.
- Other changes: 2 (one reserve-papers leak of 2024 A Q6 removed; one distractor explanation whose arithmetic did not reach the number it claimed).
- Unverifiable: none. Every number traces to a presentation PDF or to a fresh variant I re-solved.
- Biggest risk left on this page: two prose passages still name 2024 A, 2025 B and 2025 C and say which question number carries the tree and which player it asks about. No answers leak, but it pre-exposes the shape of three mock questions, and a stricter reading of the reserve-papers rule would cut them.
