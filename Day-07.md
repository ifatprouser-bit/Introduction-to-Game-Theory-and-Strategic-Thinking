# Day 07 — Mock 2: 2024 A

## Verdict
FIXED (6 changes). No answer key was wrong. All 14 marked answers match the official solution and my own code. The changes are one em dash, one over-claimed honesty tag, one wrong arithmetic description inside an explanation, and one spoiler for the Day 12 mock.

## Question table

Letters are the **scrambled** paper's letters, which is the order this page uses.

| Q | Topic | Page says | I computed | Official solution says | Match | Action |
|---|---|---|---|---|---|---|
| 1 | Dominant strategies, 3×3 | c. Only Center | Only Center (dominant for P2; P1 has none) | a[code-zero] = "Only Center" → scrambled c | ✅ | none |
| 2 | Pure Nash, name the profile | b. (Up, Left) | (Up, Left), payoffs (6,5), unique | "(Up, Left)" → scrambled b | ✅ | none |
| 3 | 2/3-average contest | b. 30 | (1+89)/2 = 45; 2/3 × 45 = 30 | "30" → scrambled b | ✅ | none |
| 4 | Unique Nash among the archetypes | a. Prisoner's dilemma | concept, no game data | "Prisoner's dilemma" → scrambled a | ✅ | none |
| 5 | Backward induction, 3 players | e. 10 | 10 (T1 → τ1 → b1, outcome (10,8,9)) | "10" → scrambled e | ✅ | none (substitute tree, verified) |
| 6 | Backward induction, pseudo-centipede | e. 21 | 21 (everyone continues; last mover prefers 12 to 4) | "21" → scrambled e | ✅ | none (substitute tree, verified) |
| 7 | Name that game | d. Chicken (hawk dove) | anti-coordination; pure NE = (A,B) and (B,A); (4,4) Pareto-beats (0,0); no dominant strategy | "Chicken (hawk dove)" → scrambled d | ✅ | none (substitute matrix, verified) |
| 8 | Ultimatum median offer | c. 40% | recall, no game data | "40%" → scrambled c | ✅ | none |
| 9 | Repeated PD, best reply | a. Defect round 1 and round 10 | 12 points; brute force over all 1024 pure paths confirms 12 is the maximum. tit-for-tat 10, TFT+D 11, alternate 3 | "Defect in the first round and in the last round…" → scrambled a | ✅ | tag corrected, em dash fixed |
| 10 | Pure Nash, count them | b. 1 | exactly 1: (Down, A) with payoffs (2,4) | "1", cell "(D, A) with payoffs (2, 4)" → scrambled b | ✅ | none (substitute matrix, verified; same cell **and** same payoffs as the official solution) |
| 11 | Pure Nash, highest payoff for P1 | a. 1 | unique pure NE (Up, Left); Rowana gets 1; Left strictly dominant for P2 | "1", "(Up, Left)… Player 1 (Rowena)'s payoff here is 1" → scrambled a | ✅ | spoiler removed from explanation |
| 12 | Mixed, probability of a cell | a. 11% | p = q = 2/3; P(right,right) = 1/3 × 1/3 = 1/9 = 11.1% → 11% | "11%", and the solution's own equations give a = b = 2/3 and .1111 | ✅ | none |
| 13 | Mixed, value of the game | b. 1.33 | value = 4/3 = 1.333 from both rows → 1.33 | "1.33" → scrambled b | ✅ | wrong description of the 0.44 distractor fixed |
| 14 | Zero-sum / constant-sum | b. It is a zero-sum game | every cell sums to 2 (constant-sum); no pure NE; no dominant strategy | "It is a zero-sum game", and the solution itself notes the sums are not zero | ✅ | none |

Answer positions across the paper: a×5, b×5, c×2, d×1, e×2. Well spread.

**The cell-order rule.** The 2024 A solution's text layer does restate the Q1 and Q2 grids as stacked numbers. I applied the brief's rule (second number = player 1) and it is confirmed twice over on this paper:

- **Q1.** Reading the second number as player 1's makes Center strictly dominant for player 2 and leaves player 1 with no dominant strategy, exactly as the solution states. Reading the first number as player 1's would make **Down** strictly dominant for player 1 (4 > 3, 7 > 5, 6 > 4) and would make Center **not** dominant for player 2. The official solution would then be wrong on both counts.
- **Q2.** Reading the second number as player 1's gives (Up, Left) the payoff profile (6, 5). The solution's prose says player 1 falls "from 6 to 1 or 0" and player 2 "from 5 to 3 or 4". Both match to the digit. The page's grids already follow this rule and I did not touch them.

## Changes I made

1. **Q9 stem, em dash → colon.** Old: `…who plays the following strategy — cooperate if your opponent has defected at most once…` New: `…who plays the following strategy: cooperate if your opponent has defected at most once…` The colon is also the professor's own punctuation in the printed paper, so this moves the stem closer to the original, not further from it.

2. **Q9 lost its green "2024 A final" tag.** Old: `{n:9, tag:"2024 A final", sub:"grid from the solution's arithmetic",` New: `{n:9, tag:null, sub:"paper's question, grid partly rebuilt",` Reason: the honesty rule allows a real-exam tag only when the question has no matrix, or the matrix is restated as text in the solution. Q9's matrix is a picture. The solution's prose pins only two of its four cells (mutual cooperation pays 1 each, defecting on a cooperator pays 2). The other two cells were filled in by the page author. That is a reconstruction, so it may not carry a real tag. The stem, the five options and the answer are still the paper's, and the new amber subtag says so.

3. **Warnbox regrouped, so the claim on the page is true.** Old: `Questions 9, 12, 13 are the paper's own questions, with the grid rebuilt from the arithmetic the official solution prints.` New: `Questions 12, 13 are the paper's own questions too. The official solution writes out every cell of their grid inside its equations, so nothing there is guessed. Question 9 is also the paper's own question, but the solution pins only two of its four cells. The other two are the standard filling, and they do not change the answer, so question 9 carries no real-paper tag.` The old sentence lumped Q9 in with Q12 and Q13 and said all three grids came from the solution. That was true for 12 and 13 and only half true for 9.

4. **Q9 explanation, "pins it" softened to what is actually pinned.** Old: `…the official solution's own arithmetic pins it. … The other two cells are the standard filling and do not affect the answer.` New: `…the official solution's own arithmetic pins the two cells that decide this question. … The other two cells are the standard filling. Any normal prisoner's dilemma filling gives the same answer, so they do not affect it. That is why this question carries no real-paper tag.` I checked the "do not affect it" claim rather than repeating it: with the standard prisoner's dilemma ordering (DC > CC > DD > CD) the alternating strategy cannot reach 12 whatever the two unknown cells are, and options b and c never touch those cells at all. So the answer is robust.

5. **Q11 explanation, Day 12 spoiler removed.** Old: `the 2025 C paper asks this question in exactly the same words, same "Rowana" and same phrasing. But it uses a different matrix, with two pure equilibria and the answer 7.` New: `a later paper asks this question in exactly the same words, same "Rowana" and same phrasing, but over a different matrix. So the answer there is a different number.` The old text was factually correct (I checked the 2025 C solution: two equilibria, Rowana's best is 7), but 2025 C is the Day 12 mock. Handing her that answer on Day 7 would have made one of the 14 Day 12 questions free. The teaching point, which is "the wording will not give you the answer", is untouched.

6. **Q13 explanation, wrong description of the 0.44 distractor.** Old: `And note 0.44: that is 4/9, the square of one third.` 4/9 is not the square of one third; (1/3)² = 1/9. New: `And note 0.44: that is 4/9. You get it by taking question 12's answer of 1/9 and multiplying it by the 4 in the corner cell, instead of averaging over both cells.` That is the actual wrong calculation behind the distractor (1/9 × 4 = 4/9 = 0.444), which is what the quiz rules ask a distractor note to give. The closing line "for anyone who multiplies when they should be averaging" was already right and is kept.

No number, matrix, payoff, option or answer key was changed. The git diff is 6 changed lines.

## Could not verify

- **Q5, Q6, Q7, Q10, Q11: the original games are unrecoverable.** The trees in Q5 and Q6 and the matrices in Q7, Q10 and Q11 are images in all three 2024 A PDFs. Their numbers are nowhere in any text layer. I confirmed the page's substitutes are correct games that produce the published answers (10, 21, chicken, 1, 1), but I cannot confirm they resemble the professor's originals beyond what the solution's prose describes. For Q7, Q10 and Q11 the solution's prose gives enough to pin the shape well: Q7's "second action is the best reply against the opponent's first action… and both playing the first strategy is Pareto-better", Q10's "(D, A) with payoffs (2, 4)", Q11's "(Up, Left)… payoff here is 1". The page's substitutes reproduce all of those details, not just the letter answer. For Q5 and Q6 only the final payoff (10 and 21) and, for Q6, the "looks like a centipede but is not" trap are pinned.
- **Q9's two unpinned cells** (you cooperate / opponent defects, and both defect). The page uses −1 and 0. The solution never states them. I showed the answer does not depend on them, but the grid she sees is not the grid the professor printed.

## Suggestions I did NOT act on

- **Q12 and Q13 keep the green "2024 A final" tag, and that is a judgement call worth a second opinion.** Their matrix is not printed as a grid anywhere; it is recovered from the four expected-payoff expressions the solution writes out (`2a + 0(1−a)`, `0a + 4(1−a)`, `−2b + 0(1−b)`, `0b − 4(1−b)`). Every one of the four cell values appears there as a literal number attached to a named action, so nothing is invented, and my code reproduces both published answers from it. I read that as "restated as text in the solution document" and left the tag, with the existing amber subtag "grid from the solution's algebra" beside it. A stricter reader could call it a reconstruction and strip the tag, which would be a two-word edit. I did not, because unlike Q9 there is nothing guessed in it.
- The clock prints `0:00` rather than `00:00` at time-up, because `fmt()` does not pad the minutes. Cosmetic only, and the layout has a `min-width` that stops it jumping. Left alone under the minimal-change rule.
- The analytics block at the bottom looks for `document.getElementById('resScore')` to report the mock score, but the results panel renders the score in a `<p class="bigscore">` with no id, so every submit is logged as `unknown`. This is in the shared tracking snippet that every day carries, not in the page's own logic, so it is not mine to change. Whoever owns that snippet may want to know.
- Q5's and Q6's subtags read "substitute, tree rebuilt". "Substitute" is the accurate word and "rebuilt" is the word used for Q12 and Q13, where something genuinely was recovered. Dropping "rebuilt" from the two tree tags would remove a small ambiguity. Not a correctness issue, so I left it.

## Summary (five lines, for the synthesis)
- Questions checked: 14 of 14, every one re-solved in Python and cross-checked against the official 2024 A solution and the scrambled paper's option order.
- Answers wrong before I started: 0. All 14 marked answers were already correct.
- Other changes: 6 line edits — 1 em dash, 1 over-claimed real-exam tag on Q9 plus the warnbox sentence behind it, 1 softened claim in Q9's grid note, 1 spoiler for the Day 12 mock removed from Q11, 1 wrong arithmetic description of the 0.44 distractor in Q13.
- Unverifiable: the original games behind Q5, Q6, Q7, Q10, Q11 (images, no text layer) and two of the four cells in Q9's grid. All are labelled as such on the page.
- Biggest risk left on this page: five of the fourteen games are substitutes, so this mock measures whether she can solve that *kind* of question, not whether she can solve the professor's exact one. The scores will be honest, but a hard original tree or grid on the real paper could still surprise her.
