# Day 03 — Mock 1: the practice paper (timed mock, Practice exam)

## Verdict
FIXED (1 change). All 14 answer keys were already correct and every game re-solved to the professor's published answer.

## Question table

| Q | Topic | Page says | I computed | Official solution says | Match | Action |
|---|---|---|---|---|---|---|
| 1 | Dominant strategy in a 2×2 | c. Both players | Row "Down" strictly dominant for p1 (9>2, 3.1>3); col "Left" strictly dominant for p2 (−1>−2, 3>−3) → both | "Both players" (option c) | yes | none |
| 2 | Count all Nash equilibria | b. 1 | Left strictly dominant for p2; best reply Up. Pure NE = {(Up,Left)}. No interior mixed NE (p2 has a strict dominant). Total = 1 | b. 1 equilibrium, (Up, Left), dominance solvable | yes | none |
| 3 | 2/3-average best reply | b **and** c (`data-correct="1,2"`) | Unique-winning bids are 21–28. Bid 22 → target 23.73, my distance 1.73 vs best opponent 3.73, win. Bid 23 → target 23.80, 0.80 vs 3.80, win. Bid 1 and bid 33 lose | "Both 22 and 23 will win … accidentally, both are best replies" | yes | results-panel note added (see below) |
| 4 | Sequential game, perfect information | a. Only chess | n/a (concept) | "Only chess is sequential with perfect information" | yes | none |
| 5 | Backward induction on a tree | d. 5 | On the page's own rebuilt tree: J2 picks Go (5>3) → Mary picks Left (4>1) → John picks Down (5>2). John gets 5 | Solution gives only the equilibrium path ("John plays (Down, Go), Mary plays Left"). The payoff is in an image and is **not** in the text layer | n/a (substituted question, labelled) | none |
| 6 | Recognise the ultimatum game | c. Ultimatum | n/a (the shape, not the numbers, fixes the answer; offer/accept/reject with (0,0) on reject) | c. Ultimatum | yes | none |
| 7 | Name the archetype from a matrix | b. Stag hunt | Rebuilt grid 4,4 / 0,3 / 3,0 / 3,3 gives exactly two pure NE, (a,a) and (b,b); both players prefer (a,a); neither has a dominant strategy → stag hunt | b. Stag hunt, "(a,a) yielding 4 … risk of giving 0 … (b,b) which gives each player 3 … safe" | yes | none |
| 8 | Golden Balls cooperation rate | c. 50% | n/a (recall) | 50%, presentation 4 slide 11 | yes | none |
| 9 | Repeated PD, best reply to a rule | a. Cooperate odd, defect even | Brute force over all 2^10 = 1024 own-strategy sequences against the stated opponent rule: unique maximum is CDCDCDCDCD, total **15**. Option totals: a=15, b=10, c=11, d=10, e=5 | a. "1\*5+2\*5=15" | yes | none |
| 10 | Iterated elimination on a 5×5 Cournot | b. 1 | Grid recomputed from profit = (120−Qi−Qj)·Qi. Unique pure NE (40,40) at 1600 each. Strict-dominance order reproduces the professor's exactly: 60 by 50, then 30 by 35, then 50 by 40, then 35 by 40. One cell survives → 1 equilibrium | b. 1, same four elimination steps, "(40,40) is the unique equilibrium" | yes | none |
| 11 | Highest p1 payoff in a pure NE (3×3) | d. 6 | Pure NE = (D,L) with (6,5) and (C,R) with (4,7). Max p1 payoff in equilibrium = 6 | "(D,L) with payoff profile (6,5) and (C,R) with (4,7) … the higher payoff for player 1 is 6" | yes | none |
| 12 | Zero-sum, probability of a cell | d. 64% | Matrix 1,0 / 0,4. q(p2 Left) = 0.8 and p(p1 Left) = 0.8, both by indifference and confirmed by a brute-force maximin sweep. P(both Left) = 0.8 × 0.8 = 0.64 → 64% | 64% | yes | none |
| 13 | Zero-sum, value of the game | a. 0.8 | Same matrix. Value = 0.8 (1×0.8 = 4×0.2 = 0.8), rows equal at the equilibrium mixture | a. 0.8 | yes | none |
| 14 | Zero-sum with no zeros | d. 2.5 | Matrix 4,1 / 2,3. maximin 2 ≠ minimax 3, so no saddle. q(Left) = 0.5, p(Top) = 0.25, value = 2.5. Brute-force sweep agrees (2.5 at p = 0.25) | 2.5, "player 2 plays (50%,50%) … player 1 plays T with probability 25% … 0.5\*4+0.5\*1 = 2.5" | yes | none |

Answer key as read from the live page: `1:c  2:b  3:b+c  4:a  5:d  6:c  7:b  8:c  9:a  10:b  11:d  12:d  13:a  14:d`. Every one agrees with the official solution document.

## The two things I was told to confirm

**Q3, two correct answers.** Confirmed correct in the marking code. `data-correct="1,2"` is split on the comma and tested with `correct.indexOf(chosen) !== -1`, so picking either 22 or 23 scores the point and neither lands on the missed list. I drove both cases in Chromium: choosing b scored, choosing c scored, and both options get a green ✓ at submit. The question also carries a visible "two correct answers" badge and its explanation quotes the professor's own admission. **The one gap:** spec section 10 asks for this to be said *on the results panel*, and it was not there. Fixed (see below).

**Q2, the professor is correct.** Confirmed. The page's Q2 explanation teaches it straight: Left is strictly dominant for player 2 (−1 > −2 in row Up, 3 > −3 in row Down), player 1's best reply to Left is Up, (Up, Left) is the unique equilibrium, and it adds a correct note that player 1 has no dominant strategy of his own. Nothing anywhere on the page calls this a mistake, and my code agrees with the professor. No change.

## Changes I made

- **Added one sentence to the results panel about question 3.** Spec section 10 says Q3's double answer must be stated on the results panel. The marking already accepted both, but the panel said nothing. Inserted directly after the missed-questions box, before the no-pass-mark box:
  new text — `<p class="note"><b>About question 3:</b> it has two correct answers, 22 and 23. The professor says so himself in his solutions. Both are marked right here, so if you chose either one you scored the point, and question 3 is not on your missed list.</p>`
  Nothing was removed. No other line of the file was touched.

## Could not verify

- **Question 5's real payoffs.** The professor's tree is an image and the solution text names only the equilibrium path ("John plays (Down, Go), and Mary plays Left"), never a number. So his answer letter (out of 2 / 3 / 4 / 5 / 6) cannot be recovered. The page already handles this correctly: it drops the "Practice exam" badge, carries a "rebuilt question" flag and a visible note saying the tree is not his, and the question is internally sound (its own backward induction gives 5, which is the marked answer). I could not check it against the professor's key because no key exists in the text layer.
- **Question 9's sucker payoff** (you cooperate, opponent defects). Three cells are pinned by his arithmetic; the fourth is not in any source. The page says so and sets it to −1. I confirmed in code that the value of this cell cannot change the answer. The sucker cell never occurs on any of the five option paths except option (e), so options a, b, c and d score 15, 10, 11 and 10 whatever it is. Sweeping the sucker payoff from −5 upward, option (a) stays uniquely best at 15 for any value below 1, and a prisoner's dilemma needs it below 0. So the answer is safe; the number itself is unverifiable and is labelled as chosen.
- **Question 6's payoffs** are invented from the professor's written description. The answer ("ultimatum") depends on the shape only, and the page says so and drops the exam badge.

## Suggestions I did NOT act on

- **Badge semantics on Q10 and Q14.** These carry a "Practice exam" badge alongside a grey "grid rebuilt" / "matrix rebuilt" flag, even though their grids were recomputed from the course formula and from the solution's algebra rather than restated as a text grid in the solution. The page defines the badge in its own visible intro ("Practice exam means the question itself is his"), and every rebuilt item carries a full, prominent note saying what was rebuilt and why, so nothing is passed off as real. I read this as disclosed and honest, and changing the badge scheme would be a redesign, not an error fix. Worth one line in the synthesis so all four mock pages settle on the same convention.
- **The "two correct answers" badge on Q3 is visible during the timed run.** It does not reveal which options are right, so it is not an answer reveal, but it is the one piece of meta-information on the paper that the real exam would not give her. If the other mock agents are stripping in-run hints, this is the matching case. I left it alone under the minimal-change rule.
- The Q9 option (e) total of 5 is quoted in the explanation and depends on the chosen sucker payoff. If a later pass wants every printed number to be source-backed, that one sentence is the only place on the page where an invented number reaches the learner.

## Page checks against BUILD-SPEC section 10

All pass, verified in Chromium, not by reading source:

- Timer reads `90:00`, state "not started", with working Start and Pause (Pause toggles to Resume and the clock genuinely stops).
- 14 `.qblock`s, five `.opt`s each.
- Nothing revealed during the run: all 14 explanations compute to `display: none`, the results panel is hidden, and after clicking every option not one had a `correct` or `wrong` class.
- Submit button (two of them, top and bottom) plus auto-submit: I ran a copy with the clock set to 3 seconds and it submitted itself at 00:00, state "time up, submitted", with its own results wording.
- Results panel: score out of 14, percent, missed list. Scored 13/14 (93%) and 14/14 (100%) in two runs.
- No pass mark is printed, and the panel says explicitly that none exists because no past paper prints one.
- Every question carries its own data inline. Q12 and Q13 share one matrix, shown once in a `datablock` inside a `qgroup`, with print rules that keep the data with its questions.
- Real paper order 1–14 kept.
- `@media print` sets `.exp{display:block!important}`.
- No em dash and no `&mdash;` anywhere outside the HTML comments. The audio-script comments were not touched (this page has none carrying dashes).
- No page errors in the console beyond the expected GoatCounter `ERR_INVALID_URL`.

## Summary (five lines, for the synthesis)
- Questions checked: 14 of 14, every game re-solved in Python (pure Nash by best replies, backward induction from the deepest node, mixed equilibria by indifference plus a brute-force maximin sweep, the repeated game by brute force over all 1024 strategy sequences).
- Answers wrong before I started: 0. All 14 marked answers matched both my computation and the official solution.
- Other changes: 1. Added the required results-panel sentence saying Q3 has two correct answers.
- Unverifiable: Q5's true payoffs (image only, no arithmetic in the solution), Q9's sucker payoff, Q6's payoffs. All three are already labelled on the page and none affects a marked answer.
- Biggest risk left on this page: Q5 is not the professor's question. It is a substitute of the same shape and is clearly labelled, but if the real Q5 tree is ever recovered, this is the one item on the page that should be replaced.
