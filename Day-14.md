# Day 14 — Warm-up, then the exam

## Verdict
CLEAN (0 changes). All three warm-ups re-solved in Python and correct to the last digit; all exam-format facts confirmed against five code-zero papers, the practice-exam solution and Presentation 6; no formula sheet; no reserve-paper leak; no em dashes. Three tone/clarity items reported below, none changed.

## Question table
This page has no quiz. One row per warm-up task, then one row per checked fact.

### The three warm-up tasks (re-solved in Python)

| # | Task | Page says | I computed | Match | Action |
|---|---|---|---|---|---|
| W1 | Game tree, backward induction, "what is **player 2's** payoff?" | Player 2 gets **2**. Deep P1 node → x, worth (8,1); P2 after A → a1, (5,2); P2 after B → b1, (4,7); root P1 → A. Outcome (5,2). | Deep node: max(8,3) → x, (8,1). P2 after A: max(2,1) → a1, (5,2). P2 after B: max(7,3) → b1, (4,7). Root: max(5,4) → A. Outcome **(5,2)**, player 2 gets **2**. | ✅ | none |
| W1b | Tree distractor claims | "7 is player 2's best number in the whole tree and he cannot get it"; "5 is player 1's payoff" | 7 is the max of all player-2 leaf payoffs and sits on branch B, which player 1 never takes. 5 is player 1's payoff at the equilibrium leaf. | ✅ | none |
| W1c | SVG green path + aria-label | Green = root→A, then A→a1, leaf (5,2) coloured green; aria-label narrates the same solution | Matches the computed equilibrium path exactly. Node colours (purple=P1 at root and deep node, blue=P2 at both middle nodes) match the caption "player 1 moves twice on the upper branch". | ✅ | none |
| W2 | 3×3 grid, count pure Nash + highest payoff for player 1 | **Two** equilibria: (Middle, Left)=(6,6) and (Down, Center)=(8,7). Player 1's highest is **8**. | Full best-reply sweep: P1 best per column = Middle / Down / Down; P2 best per row = Left / Left / Center. Pure NE = {(Middle,Left)=(6,6), (Down,Center)=(8,7)}. Count **2**, P1 max in a NE **8**. | ✅ | none |
| W2b | Near-miss and distractor claims | "(Down, Right) is the near miss: player 1 is happy there, but player 2 would slide across to Center"; "Not 7, which sits in no equilibrium at all" | At (Down,Right) P1 *is* best-replying (6 is the column max) and P2 is *not* (3 < 7 at Center). Confirmed. 7 appears in no pure NE. | ✅ | none |
| W3 | 2×2 zero-sum: check for a stable cell | Top's smallest is 3, not the biggest in the Right column; Bottom's smallest is 2, not the biggest in the Left column; no stable cell | Row minima {Top:3, Bottom:2}, maximin 3. Column maxima {Left:9, Right:6}, minimax 6. 3 ≠ 6, **no saddle point**. | ✅ | none |
| W3a | p (probability of Top) | 9p + 2(1−p) = 2 + 7p; 3p + 6(1−p) = 6 − 3p; 10p = 4; **p = 0.4** | p = (d−c)/(a−b−c+d) = (6−2)/(9−3−2+6) = 4/10 = **2/5 = 0.4**. Algebra lines on the page are correct as written. | ✅ | none |
| W3b | q (probability of Left) | 9q + 3(1−q) = 3 + 6q; 2q + 6(1−q) = 6 − 4q; 10q = 3; **q = 0.3** | q = (d−b)/(a−b−c+d) = (6−3)/10 = **3/10 = 0.3**. | ✅ | none |
| W3c | Value of the game, **computed from both rows** as instructed | 2 + 7(0.4) = **4.8**; check 3 + 6(0.3) = 4.8 | Value from Left column = 24/5 = 4.8; from Right column = 24/5 = 4.8; from Top row = 24/5 = 4.8; from Bottom row = 24/5 = 4.8. **All four agree exactly** (exact fractions, no float drift). | ✅ | none |
| W3d | P(Top, Right), nearest percentage point | 0.4 × 0.7 = 0.28 = **28%** | p·(1−q) = (2/5)(7/10) = 7/25 = 0.28 → **28%**. | ✅ | none |
| W3e | The four named distractors | 40% = p alone; 30% = q alone; 12% = the matched cell (Top, Left); 70% = how often player 2 goes Right | p = 40%; q = 30%; p·q = 3/25 = **12%**; 1−q = **70%**. Every distractor label is the exact arithmetic it claims. | ✅ | none |

### Exam-format facts (checked against the papers' own headers and Presentation 6)

| Fact on the page | Source check | Match | Action |
|---|---|---|---|
| **14 questions** | 2024 A, 2024 B, 2025 A, 2025 B, 2025 C headers all say "14 multiple-choice question(s)". Presentation 6 says **15** — the page does **not** repeat the presentation's error. | ✅ | none |
| **90 minutes** | All five code-zero headers + practice-exam solution: "Exam time: 90 minutes." P6: "90 minutes (1.5 hours)". | ✅ | none |
| **Closed book** | All five headers: "Closed-book(s) exam". P6: "Closed-books exam". | ✅ | none |
| **Calculator allowed** | All five headers: "Students are allowed to use a calculator." P6: "Please bring a calculator". | ✅ | none |
| **No formula sheet** | No paper header and no P6 slide offers one. Nothing on the page functions as a formula sheet: the indifference equations appear only inside a worked solution reveal, not as a reference block. | ✅ | none |
| **Starts at 16:00** | P6: "Exam will be in campus on October 8th at 4pm". 8 October 2026 is a **Thursday** (computed), matching the brief. | ✅ | none |
| Mo'ed B date | The page **does not state one**, so nothing to check. (For the record: P6 gives November 8th at 4pm; 8 Nov 2026 is a Sunday.) | n/a | none |
| Points per question | The page does not state points. (Papers give 7 per question + 2 free = 100; 2025 B and 2025 C say only "equal weight".) | n/a | none |
| "A hard question is worth exactly the same as an easy one" | 2024 A / 2024 B: "Each correct answer gives 7 points". 2025 B / 2025 C: "All questions have equal weight". | ✅ | none |
| "No paper states a penalty for a wrong answer" | No penalty clause in any of the six papers' instructions. | ✅ | none |
| "You have sat four full papers under the clock" | Mocks are Days 3, 7, 10, 12 = four papers. | ✅ | none |

### The trap list (13 items, each checked against the papers)

| # | Claim | Source check | Match |
|---|---|---|---|
| 1 | Which player is asked changes: player 1, player 2, "Player A", "Player B", Rowana the row player, John and Mary | "Rowana (player 1, the row player)" in 2024 A Q11 and 2025 C Q11; "Player B" in 2025 A Q8; "Player A" in 2025 B Q7; "John (player 1)… Mary (player 2)" in the practice exam Q5. All four named forms are real. | ✅ |
| 2 | In a tree question every wrong option is a number that appears in the tree | Consistent with the tree questions across the papers (options are all small integers drawn from the tree). Not exhaustively checkable: the trees themselves are images. See "Could not verify". | ⚠️ partial |
| 3 | Counting equilibria: the options are always 0, 1, 2, 3, 4 | 2024 A Q10, 2024 B Q10, 2025 C Q10 (1/0/2/3/4) and 2025 A Q11 (2/0/1/3/4). Holds in every counting question with a readable option list. | ✅ |
| 4 | "Highest payoff player 1 can get in a pure equilibrium" always offers "the game has no pure equilibrium" last | 2024 A Q11, 2024 B Q11, 2025 C Q11 all end "e. The game does not admit a pure Nash equilibrium". | ✅ |
| 5 | Probability of an outcome is p × q, never p | Structural; matches the coupled-pair questions in all six papers. | ✅ |
| 6 | The named cell is **often** mismatched | Mismatched in 2024 B Q12 (Left, right), 2025 A Q13 (Top, left), 2025 B Q13 (Top, Right), 2025 C Q8 (Down, Left); matched in 2024 A Q12 (right, right) and practice Q12 (both left). 4 of 6 — the hedge "often" is right. | ✅ |
| 7 | Rounding changes between papers; one paper gives no instruction | 2024 A/B: "closest percentage point" then "two digits after the decimal point". 2025 A/B: "nearest percentage point" then "one decimal place". 2025 C Q8 "nearest percentage point", **Q9 no instruction at all**. Also confirms the page's "not even the same in both halves of the coupled pair". | ✅ |
| 8 | Mean of a uniform range is (min+max)÷2, not 50 | 2024 A Q3: {1…89} → mean 45, answer 30 = ⅔·45. 2024 B Q3: {21…99} → mean 60, answer 40 = ⅔·60. | ✅ |
| 9 | 2/3-average equilibrium is 1; 13–19 is the lab range | 2025 B Q9: correct answer "a. Everyone chooses 1", with "d. …typically in the range between 13 and 19" as the distractor. P4: "Few players (~10%) play the dominance-solvable Nash equilibrium (1)". | ✅ |
| 10 | "Play tit-for-tat" has been offered and has never once been the answer | Offered as an option in 2024 A Q9 (b) and 2024 B Q9 (d); the correct answer in both is (a), not tit-for-tat. Never the correct answer in any of the six papers. Note the page is **more careful than the build spec here**: it says "has been offered", not "is offered every time", which is the accurate claim. | ✅ |
| 11 | "Name the game" questions hide a non-matrix game (Dictator, Ultimatum) in the options | "e. Dictator" in 2024 A Q7 and 2024 B Q7; "e. Ultimatum" in 2025 A Q9; "d. Dictator" in 2025 C Q2. Calling them sequential games matches the course's own placement: both are taught in **Presentation 2, Sequential Games**. | ✅ |
| 12 | Dominance questions: **usually** only one player has a dominant strategy; the distractor adds one for the other player | 2024 A Q1 answer "Only Center", distractor "b. Up and Center". 2024 B Q1 answer "Only Right", distractor "b. Up and Right". The practice exam Q1 is the exception (both players have one), which is exactly why "usually" is the correct word. | ✅ |
| 13 | "None of the other answers is correct" has never been the right answer across the six solved papers | Checked all five code-zero papers (correct answer is always option **a**): in 2024 A, 2024 B, 2025 A, 2025 B and 2025 C, **no question has "None of the other answers is correct" as option a**. Practice exam solutions give the correct answers for all 14 questions and none is that option. **6 of 6 confirmed.** The page frames it correctly as a low prior, not a rule, and explicitly says "If the other four really are wrong, choose it. Never use it as a shelter." | ✅ |

### Method matches the lectures (nothing new taught)

| Concept on the page | Where it comes from | Match |
|---|---|---|
| Backward induction on a tree, "solve it from the last node backwards" | P2: "Look forward and reason backward"; "solved by backward induction"; "unique backward-induction equilibrium" | ✅ |
| Underline P1's best reply down each column, P2's across each row; both marked = pure NE | P4, slide 5, word for word: "We underline the best reply of player 1 in each column, and the best reply of player 2 in each row. Nash equilibrium is a profile where both values are underlined." | ✅ |
| Zero-sum = one number per cell, it is player 1's payoff, P1 maximises and P2 minimises | P5, slide 7, exactly this | ✅ |
| Indifference method: set the two expressions equal and solve | P5, slide 20, "Algebraic method", the same shape of equation | ✅ |
| "The value of the game" | P5, Minimax theorem slide: "We call this number – the value of the game" | ✅ |
| "Check for a stable cell first" | P5: "Zero-Sum Games may Sometime Have Pure Equilibria". The phrase "stable cell" is not new on this page: it already appears on Days 2, 4 and 13. | ✅ |
| Everything else (traps, tactics) | Recall of earlier days, no new concept anywhere on the page | ✅ |

### Reserve-papers rule

| Check | Result |
|---|---|
| Names a forbidden paper (practice exam, 2024 A, 2025 B, 2025 C) | **No.** A regex for `2024 [AB]`, `2025 [ABC]`, "practice exam", "code zero", "scrambled" returns **zero hits** in the whole file. |
| Quotes a question number, option or answer from any paper | **No.** The page names no question numbers and reproduces no options or answers. Every warm-up is a fresh scenario. |
| Aggregate references | Only "the six solved papers" and "four full papers", both unnamed. |
| Verdict | **Clean.** No leak, by the letter or the spirit of the rule. |

## Changes I made
None. I found nothing wrong to correct, and on a page read an hour before a graded exam I did not want to introduce a change that was not fixing an error.

## Could not verify
- **Trap 2** ("in a tree question, every wrong option is a number that appears in the tree"). The game trees in all six papers are embedded images with no text layer, so I can read each question's five options but not the payoffs in the tree. I could not confirm that every wrong option is a number on the tree. The claim is plausible and matches the build spec's Day 1 note, and it is harmless advice either way ("solve the tree, never pick the biggest number you can see"), but I did not prove it.
- **Practice exam Q11's option list** (used by trap 4). The solution document states the answer in prose but does not reproduce the a–e options, so trap 4 is confirmed on three papers out of a possible four, not four.
- **Whether tit-for-tat was offered as an option in the practice exam Q9.** The solution document prints only the correct option. Trap 10's claim is confirmed on the papers where the option list is readable (2024 A, 2024 B) and is not contradicted anywhere.

## Suggestions I did NOT act on

**Tone — three items. All reported, none changed, per the instruction not to rewrite freely.**

1. **Trap 6, last sentence:** "Multiplying the matched pair instead is the most expensive slip on the paper." Two concerns. First, tone: it is a superlative about what she stands to lose, read an hour before the exam, and it is the only sentence on the page that ranks mistakes by cost. Second, accuracy: mismatching the cell costs **one** question (7 points), whereas the genuinely expensive slip is a wrong indifference equation, which loses **both** halves of the coupled pair (14 points). If anyone edits this page, "Read that line twice." is a complete and calmer ending for that trap.

2. **"Second pass" tactic:** "The panic that made them look hard on the first pass will be gone." This is the only occurrence of the word *panic* on the page, and it presupposes she will panic. Naming it can plant it. The sentence works without the noun, for example "They will look different once the easy marks are banked."

3. **"Never blank" tactic:** "An empty box scores zero for certain. A guess never does." The second sentence relies on carrying the elided phrase *"scores zero for certain"* across a sentence boundary. It parses correctly, but a reader of English as a second language can easily read it as "a guess never scores zero", which is false. A plainer form would be safer, for example "A guess might score 7."

**Structure — two deliberate deviations from the build spec's learn-day template, which I believe are correct and did not touch.**

4. The page has **no pretest** (`.preq`) and **no quiz panel**, both of which §3 requires of a learn day. Spec §9's own Day 14 row overrides this ("Exam morning… nothing new. Three things only… Short page"), and a "guess first" pretest would be actively wrong on exam morning. Flagging only so the synthesis does not read it as a missing section.

5. The page has **one audio strip** (the intro) and no per-panel `.secaudio` strips. Again consistent with §9's "no audio strip longer than a minute" and with the page's 30-minute budget. Adding strips would be a redesign, not a correction.

**Positive notes worth carrying into the synthesis.**

6. The stated timings add up: under a minute + 6 + 6 + 8 + 5 + 4 ≈ 30 minutes, which matches the lede's "Thirty minutes this morning". Nice internal consistency, nothing to do.
7. Trap 13 is handled exactly as required: low prior, explicitly "not zero", explicitly "if the other four really are wrong, choose it", explicitly "never use it as a shelter". It does not license skipping the arithmetic.
8. The SVG carries a full `aria-label` that narrates the correct backward-induction solution. I checked it against my computation and it is accurate.

## Summary (five lines, for the synthesis)
- Questions checked: 3 warm-up tasks (11 separate numeric claims), 11 exam-format facts, 13 trap-list claims, 7 method-provenance checks.
- Answers wrong before I started: 0. Every number, every intermediate step and every named distractor is correct; the zero-sum value agrees from all four directions in exact fractions.
- Other changes: none.
- Unverifiable: 3 minor claims that depend on option lists or tree images that have no PDF text layer (trap 2 in full, practice Q11's options, practice Q9's options). None of them is load-bearing.
- Biggest risk left on this page: not a factual one. It is the single stakes-raising phrase in trap 6, "the most expensive slip on the paper", which is both the sharpest sentence on a page meant to calm her and a mild overstatement of what that particular slip costs.
