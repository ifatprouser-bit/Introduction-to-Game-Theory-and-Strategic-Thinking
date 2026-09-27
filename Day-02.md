# Day 02 — Name that game: the five game types side by side

## Verdict
FIXED (3 changes). Every answer key on the page was already correct. All three changes remove past-paper leaks that would have spoiled a mock Ifat sits later.

## Question table

Method: a Python classifier (`classify.py`, in the scratchpad) took each matrix as `M[row][col] = (p1, p2)`, found every pure Nash equilibrium by best-reply marking, found strict and weak dominance for each player separately, checked Pareto ranking between equilibria, ran the prisoner's-dilemma second check (is any cell better for *both* than the dominant-strategy outcome), and summed every cell. The label came from the classifier, never from the prose beside the matrix.

### Quiz (6 items)

| Q | Topic | Page says | I computed | Official solution says | Match | Action |
|---|---|---|---|---|---|---|
| 1 | Which single cell change makes a prisoner's dilemma (garages) | A: (undercut,undercut) 7,7 → 3,3 | As printed: undercut strictly dominant for both, outcome (7,7), no cell better for both → dominance without the dilemma. With 3,3: still dominant both, and (6,6) beats (3,3) for both → PD | n/a (fresh) | ✓ | none |
| 1 | Distractor B: (keep,keep) → 9,9 | breaks tick 1, becomes stag hunt with 9,9 and 7,7 | No dominance; 2 pure NE (keep,keep) and (undercut,undercut); (9,9) Pareto-better → stag hunt | n/a | ✓ | none |
| 1 | Distractor C: (keep,undercut) → 1,5 | garage 2 loses dominance | P2 strict dominance set becomes empty | n/a | ✓ | none |
| 1 | Distractor D: (undercut,keep) → 5,1 | garage 1 loses dominance | P1 strict dominance set becomes empty | n/a | ✓ | none |
| 1 | Distractor E: (undercut,undercut) → 7,3 | tick 1 passes, tick 2 still fails | Both still strictly dominant; outcome (7,3); no cell better for both | n/a | ✓ | none |
| 2 | Airline 2's payoff in the preferred equilibrium (stag hunt) | 9 | 2 pure NE: (join,join)=(7,9), (stay,stay)=(4,4). (7,9) strictly Pareto-better. Airline 2 gets 9 | n/a | ✓ | none |
| 3 | How many pure NE, with a 3-vs-3 tie (weak dominance) | 2 | 2 pure NE: (Top,Right)=(5,4) and (Bottom,Left)=(3,5). Top is weakly, not strictly, dominant | n/a | ✓ | none |
| 4 | Classify the A/B game (tagged `2024 B final`) | Prisoner's dilemma | A strictly dominant for both; (A,A)=(10,10); (B,B)=(20,20) better for both → PD. Cell sums 20/32/32/40, so not zero-sum. One pure NE, so not chicken | 2024 B Q14: "strategy A is dominant for both players, and the profile (A,A) is Pareto dominated by (B,B). This implies that the game is a prisoner's dilemma" | ✓ | none |
| 5 | Classify the lorry drivers | Chicken | 2 pure NE off the diagonal, not Pareto-ranked; (give,give) total 4 beats either equilibrium's total 2 | n/a | ✓ | none |
| 6 | How many pure NE, guard vs thief | 0 | No cell survives best-reply marking. Every cell sums to 4 (constant-sum) | n/a | ✓ | none |

Stem/option wording of Q4 matches the 2024 B scrambled paper exactly, including the option order (a zero-sum, b sequential, c chicken, d prisoner's dilemma, e none), and `"correct":3` points at (d). The tag is legal: 2024 B is a reserve paper, never sat as a mock.

### Worked examples (3)

| Q | Topic | Page says | I computed | Official solution says | Match | Action |
|---|---|---|---|---|---|---|
| S1 worked ex. | Mail-order clothes firms, $80/$70 | Prisoner's dilemma, both ticks pass | Defect strictly dominant for both; outcome (70,70); (75,75) better for both | Presentation 3 slide 7: "Defection is dominant strategy for both firms" | ✓ | none |
| S2 worked ex. | Two startups, new vs old platform | Stag hunt | 2 pure NE: (new,new)=(6,6), (old,old)=(4,4); (6,6) strictly Pareto-better; no dominance | n/a (fresh) | ✓ | none |
| S3 worked ex. | Taxpayer vs tax office | Zero pure NE; one mixed | No cell survives. Mixed check by hand in code: office audits with q = 1/2, taxpayer cheats with p = 1/9, both interior, so exactly one mixed NE | n/a (fresh) | ✓ | none |

### "Try it" problems (6)

| Q | Topic | Page says | I computed | Match | Action |
|---|---|---|---|---|---|
| S1 try 1 | Two shops, advertise or stay quiet | Not a prisoner's dilemma: tick 1 passes, tick 2 fails | Advertise strictly dominant for both; outcome (5,5); no cell better for both | ✓ | none |
| S1 try 2 | Two suppliers, weeks of delay | PD; negate the delays first; equilibrium (slip,slip) | With payoffs = minus weeks: slip strictly dominant both; (−6,−6) equilibrium; (−2,−2) better for both | ✓ | none |
| S2 try 1 | Neighbours' boundary dispute | Chicken | 2 pure NE off the diagonal, not ranked; (back down, back down) total 0 beats either equilibrium's −1 | ✓ | none |
| S2 try 2 | Two departments, system A/B | Battle of the sexes; neither equilibrium Pareto better | 2 pure NE on the diagonal, (6,4) and (4,6), not ranked; both total 10 | ✓ | none |
| S3 try 1 | Match/mismatch game | Zero pure NE; constant-sum | No cell survives; all four cells sum to 3 | ✓ | **rewritten** (see change 3) |
| S3 try 2 | Top/Bottom vs Left/Right, win-lose look | Exactly one pure NE, (Top, Right) | Top strictly dominant for P1; (Top,Right) is the only NE; all cells sum to 0 | ✓ | none |

### Taught matrices (the archetype labels themselves)

This was the specific risk named for this day. All eight were re-solved and every label holds.

| Matrix | Page label | Classifier verdict | Source check | Match |
|---|---|---|---|---|
| Mail-order firms 75/20/120/70 | Prisoner's dilemma | Strict dominance both + outcome Pareto-dominated by (75,75) | Presentation 3 slide 7, read under the cell-order rule (second extracted number = player 1) | ✓ |
| Golden Balls split/steal | PD shape, but weak dominance, "three stable cells" | Steal only **weakly** dominant; 3 pure NE: (split,steal), (steal,split), (steal,steal) | Presentation 3 slide 9, $20k jackpot, "about 50%" cooperate | ✓ |
| Stag hunt 5/3/0 | Stag hunt | 2 pure NE on the diagonal, (5,5) strictly Pareto-better than (3,3) | Presentation 4 slide 3/5 | ✓ |
| Battle of the sexes, *300* vs *A Beautiful Mind* | Battle of the sexes | 2 pure NE on the diagonal, not ranked; husband gets 4 at (300,300) | Presentation 4 slide 6; husband prefers *300* | ✓ |
| Chicken, single-lane bridge | Chicken | 2 pure NE **off** the diagonal, not ranked; (swerve,swerve) total 0 beats either equilibrium's −1 | Presentation 4 slide 7, including "a non-equilibrium outcome yields a (weakly) higher sum of payoffs" | ✓ |
| Matching pennies | No pure NE | 0 pure NE; all cells sum to 0 | Presentation 4 / 5 | ✓ |

The cell-order rule matters here and the page already obeys it. Presentation 3's flattened grid prints the mail-order cell (cooperate, defect) as "$120k / $20k"; taking the **second** number as firm 1 gives firm 1 = 20 and firm 2 = 120, which is what the page shows and what makes defection dominant. The same reading reproduces the stag hunt, battle of the sexes and chicken grids exactly as the page prints them. I did not change any of them.

## Changes I made

1. **Removed a 2025 C leak from the Pareto warning box (section 2).** 2025 C is Ifat's Day 12 mock, so naming it and giving its reasoning spoils that mock.
   Old: *"…one equilibrium is better for both players at once. The 2025 C solution says it plainly: battle of the sexes has two equilibria "but neither is better for both players", and chicken's two "are not ranked in terms of Pareto efficiency". If a question says Pareto better, the answer is stag hunt every time."*
   New: *"…one equilibrium is better for both players at once. In battle of the sexes neither equilibrium is better for both players, because each player wants a different one. Chicken's two are not ranked either, for the same reason. If a question says Pareto better, the answer is stag hunt every time."*
   The teaching point is unchanged; only the paper name and its quoted answers are gone.

2. **Removed 2025 B and 2025 C leaks from the matching-pennies warning box (section 3).** 2025 B is the Day 10 mock and 2025 C the Day 12 mock. The page was quoting 2025 B's question stem almost word for word ("the unique Nash equilibrium in the Matching Pennies game") and 2025 C's answer text.
   Old: *"The 2025 A solution lists matching pennies among the games with "a unique Nash equilibrium", and 2025 B asks directly for "the unique Nash equilibrium in the Matching Pennies game". But the 2025 C solution says matching pennies has "no pure Nash equilibria, only mixed ones". All of that is true at once, because…"*
   New: *"The 2025 A solution lists matching pennies among the games with "a unique Nash equilibrium". Another paper says matching pennies has no pure Nash equilibria, only mixed ones. Both of those are true at once, because…"*
   The 2025 A citation stays: 2025 A is a reserve paper and is never sat. I checked it and the quote is accurate (2025 A Q5 solution: "The remaining games have a unique Nash equilibrium: Prisoner's Dilemma, Matching Pennies, Rock-Paper-Scissors"). The audio script for this section says "two of your past papers word it differently and both of them are right", and the new text still says exactly that.

3. **Rewrote the last "try it" in section 3, which was 2024 A question 14 reproduced with its official answer.** 2024 A is the Day 7 mock. This was the worst of the three: the same scenario, the same numbers and the answer, a week before she sits the paper cold.
   Old stem: *"Two players simultaneously choose left or right. If they choose the same direction, player 1 gets 5 and player 2 gets −3. If they choose different directions, player 1 gets −3 and player 2 gets 5."* Old answer text: *"**This is a real past-final question** (2024 A), and the official answer is "it is a zero-sum game"… The official solution says so itself and still marks zero-sum correct…"*
   New stem: *"Two players simultaneously choose red or blue. If they choose the same colour, player 1 gets 4 and player 2 gets −1. If they choose different colours, player 1 gets −1 and player 2 gets 4."* New answer: zero pure equilibria, matching pennies wearing different numbers, then the naming point kept in full: *"Every cell sums to 3, not 0. So this is a constant-sum game, not strictly a zero-sum one. But a constant-sum game works exactly like a zero-sum game: what one player gains, the other loses. So if a question offers you zero-sum and every cell of the matrix adds up to the same number, pick zero-sum and do not argue about the constant."*
   I changed the numbers as well as the attribution, because dropping only the attribution would have left the question itself sitting on the page. Verified in code: the new matrix has zero pure equilibria and all four cells sum to 3, so both teaching points survive. Quiz question 6 refers back to this try-it ("an exam would call that zero-sum") and that cross-reference still works, because the constant-sum rule is still stated here.

## Checks that came back clean, and how

- **Archetype labels.** All eight taught matrices plus every quiz and try-it matrix re-solved in code. No matrix is mislabelled. In particular the stag hunt really is Pareto-ranked, both "disagreeing" games really are unranked, chicken's pair really is off the diagonal, and matching pennies really has no pure equilibrium.
- **Answers reveal only after a click.** Verified live in Chromium: 0 visible `.exp` and 0 visible `.reveal` on load; 6 reveals open only after clicking their buttons; 6 explanations open only after answering. Score chip updates. No page errors at all (not even the expected GoatCounter one, on this run).
- **Reserve-papers rule.** After the fixes the rendered page text contains zero occurrences of "2024 A", "2025 B", "2025 C" or "practice exam". It contains "2024 B" twice (the quiz tag and the note explaining it) and "2025 A" once. Both are reserve papers.
- **No quiz item repeats a worked example.** The three worked examples are mail-order firms, two startups and a taxpayer. The six quiz items are garages, airlines, an abstract Top/Bottom matrix, the 2024 B A/B game, lorry drivers and a guard/thief game. No scenario and no set of numbers is reused.
- **Audio and page agree.** I read all four `<!-- SCRIPT -->` comments line by line against the rendered text. Every point spoken has a home on the page: the three families map to the three section headings, the two-check prisoner's-dilemma test, the mail-order table, "dominance alone is not a dilemma", the three side-by-side tables, the agree/disagree split, the diagonal/off-diagonal split, chicken's higher non-equilibrium sum, the endless chase, "two of your past papers word it differently", pure-versus-all counting, and "every finite game has at least one equilibrium". My edits kept every one of these. I did not touch any script.
- **A visual in every concept panel.** Section 1: the mail-order table (plus Golden Balls and two try-it tables). Section 2: the three side-by-side archetype tables plus three more. Section 3: the matching-pennies table plus the four-question decision-ladder SVG.
- **English bar and em dashes.** Zero em dashes and zero `&mdash;` in the page text, before and after my edits. The new text I wrote uses short sentences and everyday words, and explains "constant-sum" in plain words on the spot. The course's own vocabulary is present and explained on first use: dominant strategy, dominated strategy, pure Nash equilibrium, Pareto-ranked, prisoner's dilemma, stag hunt, battle of the sexes, chicken, matching pennies, zero-sum, mixed strategy, weakly dominant.

## Could not verify

- **The claim in the Golden Balls warning box that "no past-paper matrix does this" and "every prisoner's-dilemma question in the five papers has strict inequalities."** Checking it would mean reading the practice exam, 2024 A, 2025 B and 2025 C, which I am not allowed to open on a learn day. I confirmed it holds for 2024 B question 14, the only prisoner's-dilemma matrix question I could legally read. The claim leaks no answer, so I left it. It is a claim about all five papers backed by one.
- **Whether the 2024 A try-it I replaced was word-for-word or paraphrased.** I did not open 2024 A's solution. Its question 14 surfaced in a project search I ran for the 2024 B item, and the stem matched the page closely enough to treat the leak as real. I did not read further into that paper.
- **The mixed equilibrium of the section 3 worked example** is stated on the page as "one" without numbers. I computed it (audit with probability 1/2, cheat with probability 1/9) and it is a genuine unique interior mixed equilibrium, so the page's word "one" is right. But mixed strategies are Day 6 material, so I did not add the numbers.

## Suggestions I did NOT act on

- **Add the professor's own phrase "Pareto-dominant".** Presentation 4 slide 5 calls the stag equilibrium "the Pareto-dominant equilibrium". The page only ever says "Pareto-ranked" and "Pareto better". If an exam option uses the professor's wording, Ifat may not connect the two. One clause in the section 2 warning box would close that gap. Out of scope for a verification pass, so I left it.
- **The intro takeaway names three steps, the decision-ladder SVG asks four questions.** Both are correct; the SVG splits the last step into "are they ranked?" and "are they on the diagonal?". A learner may briefly wonder which count is right. Not an error, so I did not touch it.
- **"hawk&ndash;dove" uses an en dash as a compound joiner** rather than a hyphen. The English rule only bans em dashes, so this is not a defect, but "hawk-dove" would be the ordinary spelling.

## Summary (five lines, for the synthesis)
- Questions checked: 15 answerable items (6 quiz, 3 worked examples, 6 try-its) plus 8 taught archetype matrices and 5 what-if variants behind question 1's distractors, 28 matrices re-solved in code in total.
- Answers wrong before I started: 0. Every answer key, every distractor explanation and every archetype label was already correct.
- Other changes: 3, all of them past-paper leaks that would have spoiled a later mock (2024 A on Day 7, 2025 B on Day 10, 2025 C on Day 12).
- Unverifiable: 1 claim about all five past papers having strict inequalities in their prisoner's-dilemma matrices, which I cannot check without opening the reserved mocks.
- Biggest risk left on this page: none in the answers. The residual risk is that unverified "no past-paper matrix does this" sentence, which could leave Ifat unprepared if a mock does put a weakly dominant prisoner's dilemma in front of her.

## Files I wrote
- `/home/claude/gt-verify/Day-02.html` (3 edits)
- `/home/claude/gt-verify/reports/Day-02.md` (this report)
