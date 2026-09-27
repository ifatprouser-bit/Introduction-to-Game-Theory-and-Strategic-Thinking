# Day 05 — Pure Nash II: elimination

## Verdict
FIXED (3 changes). No answer key was wrong. All 6 quiz answers, both Cournot/2-3 chains, all 3 worked examples and all 3 try-its re-solved in code and confirmed correct. The 3 changes are two unsourced behavioural numbers and one distractor rationale that did not follow.

## Question table

Solver: IESDS engine that (a) re-tests strict domination in the *current* submatrix before every cut, (b) enumerates **every** legal elimination order and its end state, (c) brute-forces all pure Nash equilibria independently, (d) re-runs the same chain under **weak** domination to measure equilibria lost.

| Q | Topic | Page says | I computed | Official solution says | Match | Action |
|---|---|---|---|---|---|---|
| Worked ex. 1 (flatmates 2×2) | strict vs weak | "stays home" is weakly, not strictly, dominated; deleting it takes 2 NE → 1 | strict dom rows = **none**; weak dom = stay (both players). Pure NE before = {(go,go),(stay,stay)} = 2. After weak cuts = {(go,go)} = 1 | n/a (fresh) | ✅ | none |
| Try-it 1 (2×2, cell-order trap) | dominant strategy + cell order | P2's dominant = Left; unique NE (Up, Left), payoffs (5, −1); Down beats Up vs Right (7>6), loses vs Left (4<5) | Left strictly dominates Right for P2 (−1>−2, 3>−3); unique NE (Up, Left) = (5, −1); P1 has no dominant row | n/a (fresh) | ✅ | none |
| Worked ex. 2 (Cournot 5×5) | IESDS chain | Grid from π=(120−Qⱼ−Qᵢ)Qᵢ; cuts **60, 30, 50, 35**; survivor **(40,40)** = 1600 each; 8 strike-throughs | All 25 cells reproduce the formula exactly. Chain confirmed round by round (see below). **Every** legal order ends at ([40],[40]). Pure NE = {(40,40)} only | **Presentation 4, slides 16–20: identical** — "60 strictly dominated by 50" → "30 by 35" → "50 by 40" → "35 by 40 → dominance solvable" | ✅ | none |
| Try-it 2 (why 30 cannot go first) | forced order | In the 60 column 30 earns 900, the best row on the board; nothing dominates it | Column 60: 30→900, 35→875, 40→800, 50→500, 60→0. 30 is not strictly dominated in the 5×5 by any row | n/a (fresh) | ✅ | none |
| 2/3-average table (11 rounds) | IESDS chain | 68–100 by 67 → 46–67 by 45 → 31–45 by 30 → 21–30 by 20 → 15–20 by 14 → 10–14 by 9 → 7–9 by 6 → 5–6 by 4 → 4 by 3 → 3 by 2 → 2 by 1, leaving **1** | Every "what is left" column checked against the deletion above it; all 11 consistent | **Presentation 4, slide 13: identical, all 11 rounds, same dominators** | ✅ | none |
| Best-reply SVG | continuum Cournot | BR(Qⱼ)=(120−Qⱼ)/2, lines cross at (40,40) | BR(40)=(120−40)/2=40 ✓. Every SVG coordinate re-derived: y-scale 1.6925 px/unit, x-scale 3.3075 px/unit; endpoints (0,120)-(60,0) and (0,60)-(120,0); dot at (202.3, 182.3) = (40,40) | **P4 slide 22–23: BR formula and (40,40) identical** | ✅ | none |
| Worked ex. 3 (3×3, Up/Mid/Down) | dominance-solvable, count | Cut Up, Left, Right, Down → (Mid, Center) = (5,6); count = 1 | Every cut re-verified in its own submatrix. All 6 legal orders end at (Mid, Center). Pure NE = 1 | n/a (fresh) | ✅ | none |
| Try-it 3 (2/3 experiment) | behavioural fact | ~1 in 10 choose 1; equilibrium is still 1 | Equilibrium claim correct. "~10%" matches P4 slide 14 | P4 slide 14: "Few players (~10%) play the dominance-solvable Nash equilibrium (1)" | ⚠️ partial | **Fixed** — see change 1 |
| Quiz 1 | dominant strategies | **Only Right** | Right strictly dominates Left and Center in all 3 rows. P1 best replies: Down/Up/Up → no dominant row | **2024 B final Q1: "a. Only Right"**, and the published reasoning ("Up is the best reply against Center & Right, but Down is the best reply against Left") matches my solver exactly | ✅ | **Fixed** — distractor rationale only, see change 3 |
| Quiz 2 | dominance-solvable, 4×4 | **a2**; order forced; 6 cuts b4→a4→b3→a1→b1→a3 | Survivor (a2,b2)=(5,7). Exactly **1** legal full order, so "forced" is right. All 6 cuts legal at the moment stated, each illegal one step earlier as claimed | n/a (fresh) | ✅ | none |
| Quiz 3 | not dominance-solvable, 4×4 | **Not dominance-solvable**; stalls at a 2×2 with 2 pure NE | All legal orders end at rows {a2,a3} × cols {b1,b4}. Pure NE = (a3,b1)=(9,8) and (a2,b4)=(8,7). Nothing further strictly dominated | n/a (fresh) | ✅ | none |
| Quiz 4 | order independence | **Both finish at (R2,C1)**; 3 cuts legal at the start; 12 orders | 3 opening cuts (C2, C3, R3) ✓. **12** distinct full orders, **all** ending at (R2,C1)=(8,9). Both students' paths re-walked cut by cut | n/a (fresh) | ✅ | none |
| Quiz 5 | count pure NE, weak trap | **3**: (Top,Left), (Top,Right), (Middle,Right) | Brute force: exactly 3. Strict elimination cuts only Bottom and loses 0 equilibria. Cutting the two weakly dominated strategies leaves 1 cell, destroying 2 | n/a (fresh) | ✅ | none |
| Quiz 6 | count pure *or mixed* | **1**: (B,Y)=(5,7) | Dominance-solvable, order forced (1 legal order), survivor (B,Y). Pure NE = 1, so unique including mixed | n/a (fresh) | ✅ | none |

**Cournot chain, step by step, as the page states it:**

| Round | Page's claim | Verified |
|---|---|---|
| 1 | 50 beats 60 in all five columns | 2000/1750/1500/1000/500 vs 1800/1500/1200/600/0 ✅ strict |
| 2 | 35 beats 30 in the 4×4, but **fails** in the 5×5 at column 60 | 1925/1750/1575/1225 vs 1800/1650/1500/1200 ✅; at column 60, 30→900 > 35→875 ✅ so the round-1 cut is genuinely what unlocks it |
| 3 | 40 beats 50 in the 3×3; they **tied at 2000** in column 30 | 1800/1600/1200 vs 1750/1500/1000 ✅; column 30 both = 2000 ✅ tie, so the cut really was illegal one round earlier |
| 4 | 40 beats 35 in the 2×2 | 1800/1600 vs 1750/1575 ✅ strict |

Every elimination the page presents as **strict** is strict at the moment it is made. No weak elimination is mislabelled as strict anywhere on the page.

**Strict vs weak, tested on the page's own two examples:**

| Grid | NE before | Strict elimination | Weak elimination |
|---|---|---|---|
| Flatmates | 2 | cuts nothing, keeps **2** | cuts "stay" both sides, keeps **1** → destroys 1 |
| Quiz 5 (3×2) | 3 | cuts Bottom only, keeps **3** | cuts more, keeps **1–2** → destroys 1–2 |

The load-bearing claim of the day is true on the page's own data.

**Reserve-papers rule:** the only past paper named anywhere on the page, in tags or prose, is **2024 B** (a reserve paper). Zero mentions of the practice exam, 2024 A, 2025 B or 2025 C. ✅

**2024 B tag is honest:** the Q1 matrix **is** restated as text in `2024 B detailed solution.pdf`. Read under the cell-order rule (second number = player 1) it gives exactly the page's grid, and my solver reproduces the published answer "Only Right" and the published best-reply pattern. Tag is legitimate.

**No quiz item repeats a worked example:** all six quiz grids are numerically disjoint from the flatmates grid, the try-it 2×2, the Cournot grid and the section-3 3×3. Quiz 1 shares only the generic labels Up/Middle/Down × Left/Center/Right with the section-3 example; every payoff differs and the question asked is different (dominance vs counting), so a learner cannot pass it from memory.

**Reveal-on-click, verified live in Chromium:** 0 of 6 `.exp` and 0 of 3 `.reveal` visible on load; all appear only after a click. No page errors (only the expected GoatCounter `ERR_INVALID_URL`).

**Audio vs page:** every point spoken in the four `<!-- SCRIPT -->` comments also appears in the visible page text (checked point by point: the "clearing the table" shortcut, the total-vs-partial loss distinction, the flatmates tie, the symmetric row+column cut, "the only reason to keep the small quantity walked out with it", write the survivors down, no mixed equilibrium left to build, the 2/3 game, the crossing lines). **Scripts not edited.**

**Visuals:** every concept panel has one. Panel 1 = flatmates `.dtable` + try-it table. Panel 2 = the Cournot `.dtable` with 32 cells/headers carrying a computed `line-through`, colour-coded by the round each left, plus the 5-figure `.shrink` size cascade. Panel 3 = 2/3 round table, the best-reply SVG, and the 3×3 example table. The elimination steps are shown as struck tables, not described in prose alone. I verified the colour classes cell by cell: each cell carries the round of whichever of its row or column left first, and all 35 are correct.

**English bar:** 0 em dashes and 0 `&mdash;` in source and in rendered text, including inside revealed answers and quiz explanations. 0 hits on the high-register word list. No over-long prose sentence (the only >28-word hits were table text concatenated by `innerText`).

## Changes I made

1. **Try-it 3 stem, an unsourced empirical claim.**
   Old: *"only about one player in ten actually chooses 1. **Most answers cluster somewhere in the teens.**"*
   New: *"only about one player in ten actually chooses 1. **Most answers sit well above it.**"*
   Why: the "~1 in 10" half is sourced (P4 slide 14). The "teens" half is in no course document I can find, and it **contradicts the page's own next paragraph**, which describes people stopping after one or two rounds of reasoning at "around thirty-three" and "around twenty-two". I removed the unsourced number rather than replace it with one I would have had to invent.

2. **Try-it 3 exam note, same claim.**
   Old: *"What do people actually choose?" → **commonly the range 13–19.**"*
   New: *"What do people actually choose?" → **most stop after one or two rounds of the reasoning, so their answers sit well above 1, around 33 and around 22.**"*
   Why: same unsourced range. The replacement uses only numbers the course itself supplies: P4 slide 14 says strategic players play level-1 or level-2, and 2025 A's own solution computes level-1 = 34 and level-2 ≈ 28 from a level-0 average of 50.5. The page had already derived 33 and 22 three lines earlier, so this now agrees with itself. This was the one place where a memorised page fact could have cost her a mark on a behavioural question (14% of the paper covers the 2/3 contest and behavioural facts).

3. **Quiz 1 distractor rationale that did not follow.**
   Old: *"**None of the players have dominant strategies:** what you get if you judge Right by the size of the payoffs rather than by the comparison. Player 2's biggest number, 8, sits in the Down row, but dominance is column against column inside each row, not a hunt for the biggest number."*
   New: *"**None of the players have dominant strategies:** you checked player 1, correctly found she has no dominant row, and stopped there. The question asks about both players. Player 2 still has one, and Right beats Left and Center in all three rows."*
   Why: the old text was backwards. Player 2's biggest number, 8, sits at (Down, **Right**), so "judging by size" would make Right look *more* dominant, not less, and could never produce this answer. It also duplicated the swapped-reading account already given for option "None of the other answers is correct" (which I checked and is correct: under the swap, Down does look strictly dominant for player 1, 4>3, 7>4, 8>5 against Up). The new text names a real mistake that actually lands on this option. **The answer key was already correct and is unchanged.**

## Could not verify

- **The original "13–19" / "teens" figure for what people really choose in the 2/3-average game.** No presentation or past paper in the project states an experimental distribution in text; P4's evidence is a graph image (Bosch-Domènech, Montalvo, Nagel & Satorra 1998) whose numbers are not in the text layer. I could neither confirm nor refute the range, so I removed it instead of guessing a replacement. If Ifat has the slide image, the graph would settle it.
- **The four distractor options on quiz 1.** The 2024 B solution document prints only the correct option ("a. Only Right"), not the full a–e list. The four wrong options on the page are the build's own, not the real paper's. This does not affect the tag's honesty under the spec (matrix restated in text + published answer reproduced in code), but the option list is not a verified copy of the real paper's.

## Suggestions I did NOT act on

- **Pronoun drift in quiz 1's explanation.** Step 1 calls player 2 "she" and step 2 calls player 1 "she" in consecutive sentences. Nothing is wrong, but on a page whose whole point is "do not mix up whose number is whose", two players sharing a pronoun is an avoidable friction. Left alone: it is a style edit, not an error.
- **Quiz 5's "2" distractor explanation** offers two different routes to the wrong answer ("weak cuts for one player only, **or** you ignored one of the two ties"). Both routes are genuinely correct, but the spec's "state it once" rule would prefer one. Left alone: cutting one would drop a real path.
- **The page never shows a worked 4×4 elimination in the teaching sections** — both 4×4s live only in the quiz, while the taught chains are 5×5 and 3×3. The spec asks for "4×4/5×5". Worth a future 4×4 worked example, but adding one is a redesign, not a correction.

## Summary (five lines, for the synthesis)
- Questions checked: 14 (6 quiz items, 3 worked examples, 3 try-its, the Cournot chain, the 2/3 chain), plus the best-reply SVG geometry and all 35 elimination colour-codings.
- Answers wrong before I started: 0. Every answer key, every elimination step, every payoff and both published chains were already correct and match Presentation 4 and the 2024 B solution exactly.
- Other changes: 3 (two unsourced behavioural numbers in one try-it; one distractor rationale that did not follow). No structure, CSS, script, question order or payoff touched.
- Unverifiable: the experimental distribution for the 2/3-average game (graph image only), and quiz 1's four distractor options (the real paper's a–e list is not in the solution PDF).
- Biggest risk left on this page: the behavioural side of the 2/3 game. The elimination maths is airtight and triple-sourced, but "what do people actually play" now rests on the course's level-k numbers rather than on a cited experiment, so if the exam quotes a specific percentage or range from the 1998 graph, this page cannot supply it.
