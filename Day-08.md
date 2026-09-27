# Day 08 — Repeated games and sustaining cooperation

## Verdict
FIXED (2 changes). Every payoff, best reply and interest rate on the page is correct: all six quiz answers, all four worked examples and all three try-its were re-solved by brute force and matched. The two changes were a reserve-papers leak and one false claim about the quiz.

## Question table

Brute force = enumerate all 2^n round-by-round plans against the opponent's rule as stated, score each, take the max. Script: `/tmp/.../scratchpad/rep.py` and `quiz.py`.

| Q | Topic | Page says | I computed | Official solution says | Match | Action |
|---|---|---|---|---|---|---|
| Quiz 1 (tag: 2025 A final) | Backward induction in a 100-round PD | Defect in all rounds | Defect in all rounds (unravelling from round 100) | 2025 A Q2: "a. Defect in all rounds" — stem and all five options match the 2025 A scrambled paper word for word | yes | none |
| Quiz 2 | 12 weeks, 50/85/10/30, opponent forgives one | TFT scores 600; max is 670; 11 plans reach 670 | TFT = 600; max = 670; exactly 11 optimal plans, = one undercut in any week 1–11 plus week 12 | n/a (fresh) | yes | none |
| Quiz 2 distractors | — | 635 = 11×50+85; 470 = 85+85+10×30; 600 = never undercut | 635, 470, 600 all reproduced exactly | n/a | yes | none |
| Quiz 3 | 12 weeks, 45/75/5/25, holds w1, copies w2–9, undercuts w10–12 | Undercut weeks 9–12 = 510, the unique maximum | max = 510, unique optimal plan `CCCCCCCCDDDD` | n/a (fresh) | yes | none |
| Quiz 3 distractors | — | 10–12 = 480; 8–12 = 490; w12 only = 440; TFT = 460 | 480, 490, 440, 460 all reproduced exactly | n/a | yes | none |
| Quiz 4 | 10 rounds, opponent forgives **two** | Defect rounds 1, 2, 10 = 885; 1&10 = 840; 10 only = 795; all-D = 850; TFT = 750 | All five totals reproduced exactly. 885 is the global max | n/a (fresh) | yes | none |
| Quiz 4 robustness | stem gives no matrix | — | Re-ran with 5 different PD payoff sets (3/5/0/1, 50/85/10/30, 45/75/5/25, 100/130/0/90, 6/10/1/2). The listed answer is the global maximum in every one | n/a | yes | none |
| Quiz 5 | 10 rounds, grim trigger | Cooperate 1–9, defect 10 = 795, unique max; 1&10 = 350; all-C = 750; all-D = 750; TFT = 750 | All five totals reproduced exactly; 795 is the unique optimum | n/a (fresh) | yes | none |
| Quiz 5 robustness | stem gives no matrix | — | Unique optimum across 4 further PD payoff sets | n/a | yes | none |
| Quiz 6 | Infinite horizon, 60/90/45 | r* = 50%; checks 15/0.25 = 60, 15/0.6 = 25; inverted fraction gives 200% | (60−45)/(90−60) = 0.5 exactly; 60 and 25 confirmed; (90−60)/(60−45) = 2.0 = 200% | n/a (fresh) | yes | none |
| Worked ex. 1 | 3-season PD, mail-order 75/120/20/70 | Both charge $70 all 3 seasons, 210 each; cooperation would give 225 | $70 dominant in both columns; 3×70 = 210; 3×75 = 225 | Presentation 3 slide 7 matrix matches exactly; slide 13: "unique backward-induction equilibrium: defecting in all rounds" | yes | none |
| Shape 1 (teaching) | 8 rounds, forgives one | Undercut rounds 1 and 8 = 690; seven tied replies (1,8)…(7,8); (i) 600, (ii) 645, (iii) 660, (iv) TFT 600, (v) 690 | max = 690, exactly 7 optimal plans, exactly (1,8)…(7,8). All five option totals reproduced | n/a | yes | none |
| Shape 2 (teaching) | 8 rounds, copies r2–6, defects r7–8 | Undercut from round 6 = 635 (unique max); waiting to round 7 = 590; TFT = 540 | max = 635, unique; 590 and 540 reproduced | n/a | yes | none |
| Try-it, sec. 2 | 8 rounds, copies r2–7, defects r8 | Undercut rounds 7 and 8 = 640 (unique); round 8 only = 595; from round 6 = 635 | max = 640, unique; 595 and 635 reproduced | n/a | yes | none |
| Try-it, sec. 3 | Infinite horizon, 100/130/90 | r* = 1/3 ≈ 33.3% | (100−90)/(130−100) = 1/3 exactly | n/a | yes | none |
| Worked ex. 3 | Discounting, mail-order | 45 = 5/r → r = 1/9 ≈ 11.1%; 5/0.05 = 100, 5/0.20 = 25 | 5/45 = 0.1111…; 100 and 25 confirmed | Presentation 3 slide 19, word for word: "Immediate gain of 120−75=45… Losing 5 in all future rounds… 45r=5 → r=1/9=11.1%… Always cooperating is the best reply against a conditional cooperator if r<11.1%" | yes | none |
| Perpetuity formula | x/r | "a payment of x every year forever, starting next year, is worth x/r today" | — | Presentation 3 slide 18 derives exactly x/r | yes | none |

### The off-by-one claims, checked specifically (task item 2)

Both are true for the exact matrix printed on the page (75 / 120 / 20 / 70), not merely for the textbook 5/3/1/0 numbers:

- **"Two free defections against a forgiving opponent."** Against the forgive-one rival over 8 rounds the maximum is 690, reached only by plans with exactly two undercuts, one of which is round 8. The "obvious" one-undercut answer (round 8 only) scores 645. The gap is 45, exactly one temptation premium. Confirmed again at 12 weeks with 50/85/10/30 in quiz 2 (670 vs 635).
- **"Start at round k−1, not k."** In Shape 2 she turns at round 7 and the unique optimum starts at round 6 (635 vs 590 for starting at 7). In the try-it she turns at round 8 and the unique optimum starts at round 7 (640 vs 595). In quiz 3 she turns at week 10 and the unique optimum starts at week 9 (510 vs 480). The page also shows the mirror error, going one round **too early**, which costs 20 in quiz 3 and 5 in the try-it. Both directions confirmed in code.
- The underlying claim from the spec ("the solution says waiting until 9 misses an opportunity in round 8") is real. I found it in the 2025 C solution text. The page states the principle without naming any paper, which is correct.

## Changes I made

1. **Reserve-papers leak — a mock paper named, with its answer.**
   Old: `&bull; And <b>&ldquo;play tit-for-tat&rdquo;</b> appears as an option in two of the five past finals (2024 A and 2024 B). It has never once been the answer.`
   New: `&bull; And <b>&ldquo;play tit-for-tat&rdquo;</b> is offered as an option on the older papers. It has never once been the answer.`
   Why: 2024 A is sat as a timed mock on Day 7. Naming it, saying tit-for-tat is one of its options, and saying that option is never the answer hands her a free elimination on a paper she has not sat. The teaching point survives in full, and it still matches the audio script, which says "It appears on some of the older papers, and it has never once been the best reply." (I checked 2024 B, a reserve paper, and the claim is true there: 2024 B Q9 does offer "Play tit-for-tat" and it is not the answer. I could not check 2024 A, because I am not allowed to open it, which is a second reason the specific claim had to go.)

2. **A false claim in the quiz introduction.**
   Old: `The other five are fresh. Their round counts, payoffs and opponent rules appear nowhere above.`
   New: `The other five are fresh. None of them repeats a scenario or a round count from the examples above.`
   Why: the old sentence was not true. Quiz 2 uses the forgive-one rule, which is taught above as Shape 1, and the explanations of quiz 4 and 5 use the mail-order payoffs from the worked example. The new sentence is true as written: no quiz scenario (ice-cream vans, petrol stations, hauliers, two unnamed PDs) and no quiz round count (12, 12, 10, 10, infinite) appears above, where the examples run 3 seasons and 8 rounds.

Nothing else was touched. No number, matrix, payoff, answer key, option order, audio script, heading, SVG or CSS was changed.

## Could not verify

- **"Tit-for-tat appears as an option on 2024 A."** I am not permitted to open the 2024 A paper (it is a Day 7 mock), so I could not confirm or refute it. This is why I removed the specific claim rather than correcting it. The general claim that survives ("it is offered on the older papers and is never the answer") is confirmed true for 2024 B.
- **Whether tit-for-tat is offered on every paper.** The page does not claim this, and I did not check the mock papers. No defect, noted only so the next reader knows the claim was left deliberately vague.

## Suggestions I did NOT act on

- **Quiz 4 and quiz 5 give no payoff matrix in the stem.** Strictly, the rule "every question carries the data it needs" would want one. I left them alone for two reasons. First, they copy the real exam's own verbal style. Second, I proved the answers are payoff-independent: I re-solved both against five different prisoner's-dilemma payoff sets and the listed answer was the global maximum every time. So they are solvable standalone from the words "prisoner's dilemma" alone. Worth a second opinion, not worth a unilateral rewrite.
- **Quiz 4's distractor "Defect in round 1 and round 10" is the correct answer to a real question on a paper she sits later** (a forgive-one, 10-round question). Here, against a forgive-**two** opponent, it is wrong. The explanation handles this well: it says outright "That is the right answer against a rival who forgives only one defection." Quiz 5 makes the same contrast again. I judged this good teaching rather than a spoiler, since no paper, number or option list is named, but a reviewer may want to look at it.
- **Shape 2 and the section-2 try-it are structurally the same game** (opponent copies, then turns at a fixed round), differing only in where she turns. Deliberate, and the try-it's closing line draws the pattern out. Not a defect, but if anyone wants more variety, the try-it is the one to change, not the example.
- **The page never states the payoff-independence** of the verbal questions. One line saying "these answers hold for any prisoner's dilemma payoffs" would be reassuring, but it is new teaching content, so I left it out.

## Summary (five lines, for the synthesis)
- Questions checked: 6 quiz items, 4 worked examples, 3 try-its, 2 discounting derivations, 1 pretest — all re-solved by brute-force enumeration in Python.
- Answers wrong before I started: none. Every answer key, every distractor total and both interest rates were already correct.
- Other changes: 2 — one reserve-papers leak (2024 A named with its answer) removed, one false claim about the quiz corrected.
- Unverifiable: whether tit-for-tat is offered on 2024 A (that paper is off limits to me; the claim was removed rather than kept unchecked).
- Biggest risk left on this page: quiz 4 and quiz 5 hand her the principle behind a real question on 2025 B, a paper she sits on Day 10. No paper or option list is named, and teaching the off-by-one rule is the entire purpose of the day, so the Day 10 score may still read a little high on that one item.
