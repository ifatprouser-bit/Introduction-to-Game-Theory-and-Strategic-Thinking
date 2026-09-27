# Day 10 — Mock 3: 2025 B, sat under exam conditions

## Verdict
CLEAN. 14 of 14 answers match the official key and my own code. No changes made to `Day-10.html`.

## Question table

Official key from `2025 B  detailed solution.pdf`. Option letters below are the **scrambled**
paper's letters, which is the order this page uses.

| Q | Topic | Page says | I computed | Official solution says | Match | Action |
|---|---|---|---|---|---|---|
| 1 | Commitment: Cortés burning his ships (P6) | e — credible commitment, no retreat | recall item, no computation | e | ✅ | none |
| 2 | Why randomize (P5) | a — stops the opponent predicting you | recall item, no computation | a | ✅ | none |
| 3 | Repeated PD, opponent forgives one defection (P3) | b — defect rounds 1 and 10, cooperate 2–9 | verbal item; two free defections (the tolerated one, and the last round) | b | ✅ | none |
| 4 | Ultimatum game rejections (P1) | c — responders pay to punish unfairness | recall item, no computation | c | ✅ | none |
| 5 | Unique pure Nash in a 3×3 (P4) | b = 5 | unique pure NE = (Middle, Right), profile (5, 4) → P1 gets **5** | b, "Player 1 payoff is 5", (Middle, Right) | ✅ | none |
| 6 | 2/3-average best reply (P1/P4) | b = 12 | mean of 1–67 = 34; (100·34 + 100·1)/200 = 17.5; ⅔ × 17.5 = 11.67 → **12** | b = 12 | ✅ | none |
| 7 | Backward induction, 6-node chain (P2) | a = 23 | BI path S1 → s2, outcome (23, 15) → A gets **23**; invariant over all values of the three unknown leaves | a = 23 | ✅ | none |
| 8 | Dominance-solvable games (P4) | b — surviving outcome is the unique NE | concept item | b | ✅ | none |
| 9 | 2/3 beauty contest equilibrium (P1/P4) | c — everyone chooses 1 | concept item; 13–19 is the lab observation, not the equilibrium | c | ✅ | none |
| 10 | Matching pennies equilibrium (P5) | d — both mix 50/50 | p = q = ½ by symmetry; no pure NE | d | ✅ | none |
| 11 | Mixing in penalty kicks (P5) | b — stop the goalie reading a pattern | recall item, no computation | b | ✅ | none |
| 12 | Mandated negotiating agents (P6) | a — commit by limiting flexibility | recall item, no computation | a | ✅ | none |
| 13 | Zero-sum mixed equilibrium, probability of a cell (P5) | b = 22% | p = P(Top) = ⅔, q = P(Left) = ⅔; P(Top, Right) = p(1−q) = 2/9 = 22.2% → **22%** | b = 22% | ✅ | none |
| 14 | Value of the same zero-sum game (P5) | b = 2 | 3q = 2 and 6(1−q) = 2; value = **2**; saddle point confirmed (neither player can deviate profitably) | b = 2 | ✅ | none |

Browser check: rendered the page in Chromium, clicked every question, submitted. The fourteen
options the page marks correct are **e, a, b, c, b, b, a, b, c, d, b, a, b, b** — identical to the
official answer key, question by question.

## What the matrices are, and why they are trustworthy

**Q5 (3×3).** Recovered two independent ways, and the two agree.
1. The exam PDF's own text layer prints the grid. Under the cell-order rule (second number = player 1)
   it reads Up (9,8) (7,9) (4,7) / Middle (8,3) (8,1) (5,4) / Down (10,6) (7,6) (2,7).
2. The solution document restates all eighteen numbers as best-reply lists: player 1 by column
   9,8,10 / 7,8,7 / 4,5,2 and player 2 by row 8,9,7 / 3,1,4 / 6,6,7. That pins every cell.

My script builds the matrix from reading 1 and prints exactly reading 2, then finds one and only one
pure Nash equilibrium: (Middle, Right), payoffs (5, 4). The page's table matches cell for cell.

**Q13 and Q14 (2×2 zero-sum).** The solution document prints this matrix as plain text:
Top 3, 0 / Down 0, 6, payoffs to player 1. The page reproduces it exactly.

**Cross-check I ran on the page's own side note.** Q5's explanation claims this matrix reappears as
2025 A question 6 with Middle and Down swapped, asking for player 2's payoff, which is 4. I rebuilt
the 2025 A Q6 grid from that paper's solution text under the same cell-order rule. The swap is exact
(a row-for-row identity), and its unique pure equilibrium is (Down, Right) with profile (5, 4), so
player 2 gets 4. **The claim on the page is correct.**

## The honesty-rule audit on the tags

The page tags thirteen questions `2025 B final` and one `2025 B, tree redrawn`. I checked each
against the brief's honesty rule.

- **Q1, 2, 3, 4, 6, 8, 9, 10, 11, 12 — tag is honest.** These have no matrix and no tree. They are
  concept and recall questions, which the rule calls always safe. Stems and all five options are
  verbatim from the scrambled paper.
- **Q5 — tag is honest.** The matrix is restated as text in the solution document (as the two
  best-reply lists above), and my code reproduces the published answer from it. It is also in the
  exam PDF's own text layer, and the two readings agree. This clears the rule's second branch.
- **Q13, Q14 — tag is honest.** The solution document restates the matrix as literal text. Code
  reproduces both published answers.
- **Q7 — correctly *not* tagged as real.** It carries `2025 B, tree redrawn` on an amber badge, not
  the green "final" badge, and the CSS rule that does that is commented in the file as "a
  reconstruction must not wear the green verified real exam badge". Above the question sits a visible
  note that says the original is an image, that the tree was redrawn from the solution's
  node-by-node walkthrough, and that three leaf numbers are unknown. That satisfies the rule's
  requirement to label a reconstruction in the visible page text with a short note saying what was
  rebuilt and why.

**Verdict on the tags: all fourteen are honest. Nothing is mislabelled.**

## The three "?" leaves on the Q7 tree — the page's claim is TRUE

The page claims: *"Three leaf numbers are shown as ? because they appear nowhere in the text. None of
the three is ever compared by the player who moves, so you can still solve the question without them."*

I checked this claim rather than assuming it, because if it were false the question would be unsolvable
as drawn.

The solution's walkthrough names six decision nodes in a chain: A1, B2, A3, B4, A5, B6. Each has two
branches. Reconstructed, the tree is:

```
A1 --N1--> (19, ?)        A1 --S1--> B2
B2 --n2--> A3             B2 --s2--> (23, 15)
A3 --N3--> (19, 2)        A3 --S3--> B4
B4 --n4--> A5             B4 --s4--> (?, 19)
A5 --N5--> (9, 20)        A5 --S5--> B6
B6 --n6--> (4, 5)         B6 --s6--> (?, 1)
```

The three unknowns are: **B's payoff at the N1 leaf**, **A's payoff at the s4 leaf**, **A's payoff at
the s6 leaf**. Each one is the payoff of the player who does *not* choose at the node that reaches it:

- The N1 leaf is reached by **A**'s move at the root. The unknown there is **B's** number. B never
  moves at the root, so B never compares it.
- The s4 leaf is reached by **B**'s move at B4. The unknown is **A's** number. B compares only his own
  20 (via n4) against his own 19 (via s4), and picks n4, so that leaf is off the path. A never chooses
  between s4 and anything.
- The s6 leaf is reached by **B**'s move at B6. Same shape: B compares his own 5 against his own 1,
  picks n6, and A's number there is never read.

I then confirmed it numerically rather than by argument. My script solves the tree by backward
induction with the three unknowns as free variables and sweeps them across a wide range of values.
The set of distinct outcomes is a single element: **{(23, 15)}**. Player A's payoff is 23 for every
possible value of all three unknowns.

**So the question is fully solvable as drawn, and the answer 23 is not at risk.** The page's claim
stands. Nothing to say loudly here.

## Build-spec section 10 check

| Requirement | Result |
|---|---|
| Timer 90:00, counting down, Start and Pause buttons | ✅ opens at `90:00`; Start begins the countdown, Pause stops it and re-enables Start |
| 14 questions, five options each | ✅ verified in the browser |
| No running score, no reveal during the run | ✅ I clicked an option on all 14 questions: zero explanations opened, zero options turned green or red. Only the chosen-mark appears. The progress chip counts answered, not correct |
| Submit button | ✅ marks the paper; warns first if any question is blank |
| Auto-submit at zero | ✅ tested by forcing the clock near zero: it hit `00:00`, submitted itself, and set the state line to "Time up. The paper was submitted automatically." |
| Results panel: score out of 14, percent, missed question numbers | ✅ plus a blanks list and time used |
| No invented pass mark | ✅ prints "7 points per question plus 2 free, so 14 correct = 100" and says outright that no past paper prints a pass mark, so none is shown. The "Exam mark" cell is score × 7 + 2, which is the paper's own stated scoring, not a threshold |
| Full data beside every question | ✅ Q5's matrix, Q7's tree, Q13/Q14's matrix each sit in a data panel immediately above the question that uses them |
| Shared dataset grouped once | ✅ Q13 and Q14 share one zero-sum matrix block, shown once, both questions underneath |
| Real paper's question order kept | ✅ 1 to 14 in the paper's order, and each question's five options in the paper's own order |
| `@media print` opens explanations | ✅ under print media the explanations render open and the timer and buttons are hidden |

Page errors in the browser: **none**. The only console line is the GoatCounter
`ERR_INVALID_URL`, which the brief says to ignore.

## Em dashes

Zero `—` and zero `&mdash;` in the source and in the rendered text. Nothing to fix. The audio-script
comments were left alone, as required (this page has none, being a mock).

## Changes I made
None. The page was already correct.

## Could not verify

- **The exact shape of the Q7 tree's branches, as opposed to its answer.** The solution says "A
  compares payoff 19 from N1". That is consistent with N1 leading straight to a leaf where A gets 19,
  which is how the page draws it, and equally consistent with N1 leading to a small subtree worth 19
  to A. The same ambiguity applies to s2, N3, N5, s4 and s6. This does not touch the answer, because
  the value of each branch to the player choosing it is stated outright. It only means the drawing is
  one faithful picture of the game, not provably the professor's picture. The page already says this.
- **The three unknown leaf numbers themselves.** They are genuinely absent from the solution
  document, and the exam PDF's tree is an image with no text layer. They are shown as `?` rather than
  guessed, which is the right call. I confirmed they cannot change the answer.
- **Q3's option (d)** reads "defect in rounds 1, 3, 4, 7, 9, 10" while also listing round 4 among the
  cooperate rounds. That contradiction is in the original exam paper, not introduced here. I did not
  touch it, because a mock should be the real paper. It is a wrong option either way.

## Suggestions I did NOT act on

- **The analytics block looks for the wrong element id.** At the bottom of the file the tracking
  script reads `document.getElementById('resScore')`, but this page's score element is `rScore`. The
  result is that the "mock submitted" event is sent with an empty score slug. It does not affect a
  single answer, a single mark or anything Ifat sees. It sits inside the shared tracking block that
  appears on all fourteen pages, so fixing it here alone would make this page differ from the rest.
  Better handled in one pass across the site by whoever owns that block.
- **Q3 option (d)'s round-4 contradiction** (above). If the site ever wants to flag the professor's
  own slips, the results panel would be the place, the way Day 3 flags the practice exam's Q3. I left
  the paper verbatim.
- Nothing else. The page does not need redesigning.

## Summary (five lines, for the synthesis)
- Questions checked: 14 of 14, every one re-solved or re-checked against the official key; the four with a game in them (Q5, Q7, Q13, Q14) re-solved from scratch in Python.
- Answers wrong before I started: 0.
- Other changes: 0. No em dashes, no spec-section-10 failures, no mislabelled tags.
- Unverifiable: the exact branch shape of the redrawn Q7 tree, and its three unknown leaf numbers, both already declared on the page and both proved unable to change the answer.
- Biggest risk left on this page: none that affects a mark. The softest spot is Q7's tree being a redrawing rather than the professor's own picture, which is labelled as such; the answer 23 is invariant over every possible value of the missing numbers.
