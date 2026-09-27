# Day 06 — Mixed Strategies I: making your opponent indifferent

## Verdict
FIXED (4 changes). Every mixed equilibrium, value and quiz answer key on the page was already correct. The errors were in the teaching matrix for the Vizzini goblets game and in one sentence of a warning box.

## Question table

Every 2x2 game on the page was re-solved from scratch in Python (`fractions.Fraction`, exact
arithmetic): both indifference equations set up from the matrix, p and q solved, and the value
computed from both rows *and* both columns to confirm all four agree.

| Q | Topic | Page says | I computed | Official solution says | Match | Action |
|---|---|---|---|---|---|---|
| Teaching matrix 1 — Vizzini goblets (long form) | zero-sum, no pure NE | (drink own, poison Westley's own) = (−1, 1) | Vizzini = **+1** there | P5 slide 4 extracted grid, and slide 7 one-number grid: Vizzini = +1 | **NO** | **Fixed: both rows swapped** |
| Teaching matrix 2 — Vizzini goblets (one-number form) | zero-sum shorthand | row 1 = −1, 1 | row 1 = **1, −1** | P5 slide 7: row 1 = 1, −1 | **NO** | **Fixed: both rows swapped** |
| Worked example — penalty kick 58/95/93/70 | find p and the value | x = 23/60 = 38.3%; value 79.6; goalie 41.7% left | p = 23/60 = 38.333%; value = 955/12 = 79.583; q = 5/12 = 41.667% | P5 slides 12–13: 38.3%, 79.6%, 41.7% | yes | none |
| Line graph (SVG) | crossing = the answer | crossing drawn at x≈38.3%, height ≈79.6 | pixel maths: crossing at x=238.7px → 38.33%, y=107.1px → 79.58 | P5 slide 21 graphic method | yes | none |
| Try-it 1 — same game, bottom-right 70→60 | surprising change | kicker 38.3→47.1%, goalie 41.7→50%, value 79.6→76.5 | p = 33/70 = 47.143%, q = 1/2 = 50%, value = 153/2 = 76.5 | P5 slide 24: 38.3→47.1, 41.7→50, 79.6→76.5 | yes | none |
| Teaching matrix 3 — pure penalty 38/65/93/70 | no mixing needed | (Right, Right), value 70 | saddle point at (Right, Right), value 70 | P5 slide 16: unique pure NE (Right, Right) | yes | none |
| Try-it 2 — grid 4,7,2,5 | no mixing needed | (Top, Left), value 4 | saddle point at (Top, Left), value 4 | n/a (fresh variant) | yes | none |
| Quiz 1 — grid 9,0,0,6 | q = P(Left) = 40% | q = 2/5 = 0.4; p = 0.4; value 3.6 from all four directions | n/a (fresh variant) | yes | none |
| Quiz 1 distractors | 16% = P(Top,Left); 24% = P(Top,Right) = p×(1−q) | P(Top,Left) = 0.16; P(Top,Right) = 0.4×0.6 = 0.24 | n/a | yes | none |
| Quiz 2 — grid 9,3,5,9 | P(Top,Left) = 24% | p = 0.4, q = 0.6, p×q = 0.24; value 6.6 from all four directions | n/a (fresh variant) | yes | none |
| Quiz 2 distractors | 16% = P(Top,Right); 36% = P(Down,Left) | p×(1−q) = 0.16; (1−p)×q = 0.36 | n/a | yes | none |
| Quiz 3 — grid 0,40,10,0 | P(Down,Left) = 64% | p = 0.2, q = 0.8, (1−p)×q = 0.64; value 8 from all four directions | n/a (fresh variant) | yes | none |
| Quiz 3 distractors | 16% = P(Top,Left); 4% = P(Top,Right) | p×q = 0.16; p×(1−q) = 0.04 | n/a | yes | none |
| Quiz 4 — zero-sum vs general game | "one player's gain is the other's loss", tagged `2025 A final` | concept item, no matrix | 2025 A Q3, correct answer a | yes | none (tag is legal, see below) |
| Quiz 5 — which equation gives p | "make player 2 indifferent: set player 1's payoff in the Left column equal to his payoff in the Right column" | correct: p is fixed by the *opponent's* indifference | n/a (fresh variant) | yes | none |
| Quiz 5 — "in the three grids p came out 0.4, 0.4 and 0.2" | 0.4, 0.4, 0.2 | 0.4, 0.4, 0.2 | n/a | yes | none |
| Quiz 6 — grid 6,8,3,5 | player 1 gets 6, no mixing | saddle point at (Top, Left), value 6; rows differ by a constant 3 so the lines never cross | n/a (fresh variant) | yes | none |

### Check 2 — which player's indifference gives which probability
Correct the right way round **everywhere**. The rule box says "find the mixture that makes the
**opponent** indifferent". Quiz 1 and 3 say "player 2's mixture is the one that makes player 1
indifferent". Quiz 2 says "find p, the mixture that makes player 2 indifferent". Quiz 5 is built
entirely on this inversion and gets it right, and it names the trap: swapping p and q is harmless
on a main-diagonal grid and fatal on an anti-diagonal one. I confirmed that claim in code
(diagonal grid [a,0,0,d] gives p = q = d/(a+d); the anti-diagonal grid in Quiz 3 gives p = 0.2,
q = 0.8).

The worked example writes the *kicker's* payoff against each of the goalie's columns and sets
them equal. In the one-number zero-sum form that is exactly the goalie's indifference condition,
and Quiz 5's explanation states that equivalence outright. Consistent, not an inversion.

### Check 3 — probability versus outcome cell
Handled correctly and deliberately. Quiz 1 asks for a single mixture and lists both cell products
(0.16 and 0.24) as distractors. Quiz 2 and 3 ask for cells and multiply. Every mismatched cell on
the page uses p × (1 − q) or (1 − p) × q, never a single probability. I re-derived all four cell
probabilities for all three quiz grids and each named value matches.

### Check 5 — the reserve-papers rule
Passes. One tagged item only: Quiz 4, `2025 A final`. I checked it against both
`2025 A  scrambled exam.pdf` (Q3) and `2025 A  detailed solution.pdf`. The stem and all five
options are word for word, in the same order, and the correct answer matches. 2025 A is a reserve
paper, and the item carries no matrix, so the tag is legal twice over.

A full-text scan of the file found **zero** mentions of "2024 A", "2025 B", "2025 C" or "practice
exam", in tags or in prose. The only other paper reference is in Quiz 2's explanation: "'Round up
to the closest percentage point' is how the 2024 papers print it." I verified that against
`2024 B  detailed solution.pdf` Q12, which prints exactly "(round up to the closest percentage
point)". The claim is true, names no question, and reveals nothing. Left as is.

### Check 6 — no quiz item repeats a worked example
Passes. Teaching grids are 58/95/93/70, the 70→60 variant, 38/65/93/70 and 4/7/2/5. Quiz grids
are 9/0/0/6, 9/3/5/9, 0/40/10/0 and 6/8/3/5. No shared numbers and no shared scenario.

### Check 7 — answers reveal only after a click
Verified live in Chromium (Playwright). On load, zero `.exp` and zero `.reveal` elements are
displayed. After clicking one option in each of the six questions, all six explanations open, the
correct option turns green, the clicked wrong option turns red, and the score chip updates. No
page errors at all (not even the expected GoatCounter one, since `preload="none"` defers it).
The render-time shuffle spread the correct answers across D, E, A, E, E, A on my run.

### Check 8 — audio and page agree
I read all four `<!-- SCRIPT -->` comments line by line against the visible text. Every teaching
point spoken is on the page: the one-number shorthand and why the second number carried nothing,
the indifference rule, "the equation you write is about what he gets", the two crossing lines,
the value of the game, the kicker still using his weaker side more than a third of the time, the
"getting better at something may make you use it less" result, the saddle-point test, and the
warning that mixing a game that did not need it gives a plausible-looking wrong answer. Two
spoken asides are not on the page; both are listed under "Could not verify" below. I edited no
script.

### Check 9 — English bar and em dashes
Zero em dashes and zero `&mdash;` in the visible page text, before and after my edits (checked in
the rendered `document.body.innerText`, not just the source). I scanned the visible prose against
the spec's whole substitution table; the only hit was one "required", now fixed. No sentence in
the visible prose runs past 28 words once tables and script are excluded.

## Changes I made

- **Vizzini goblets, long two-number table: both rows swapped.** Was `Vizzini drinks from his own:
  (−1, 1) | (1, −1)` and `Vizzini drinks from Westley's: (1, −1) | (−1, 1)`. Now
  `(1, −1) | (−1, 1)` and `(−1, 1) | (1, −1)`.
  Why: the page had it exactly backwards. Westley poisons his own goblet, Vizzini drinks from his
  own clean goblet, and the page paid Vizzini **−1** for surviving. Presentation 5 slide 7 gives
  that cell as **1** in the one-number form, and slide 4's stacked grid gives it as 1 for player 1
  under the cell-order rule. I also coded the game's own logic (Vizzini wins iff the goblet he
  drinks is not the poisoned one) and it agrees with the slide in all four cells and with the page
  in none. The page's own sentence two lines above, "Vizzini wants to guess right, Westley wants
  him to guess wrong", was already contradicting the table.

- **Vizzini goblets, one-number table: both rows swapped.** Was `Drinks from his own: −1 | 1` and
  `Drinks from Westley's: 1 | −1`. Now `1 | −1` and `−1 | 1`. Same reason, same source. The two
  tables have to stay the same game, and the caption beneath them ("the second number was always
  the first one with a minus sign") is still exactly true after the swap.
  Note: the game is matching pennies either way, so no conclusion on the page changes. It still
  has no pure equilibrium and the section's teaching point is untouched. But it is a wrong number
  copied from the lecture, on the first matrix Ifat meets on the page, and it teaches her that
  drinking the safe goblet loses.

- **Warning box after the worked example: "when the goalie guesses right" → "when the goalie dives
  left".** Full sentence was "The kicker's left foot is his *weaker* side: 58 against 93 when the
  goalie guesses right." 58 and 93 are the two numbers in the **Goalie dives Left** column. The
  cells where the goalie guesses correctly are 58 and 70, not 58 and 93; and if "right" meant the
  direction, the numbers would be 95 and 70. Neither reading matched the numbers quoted. The
  comparison being made is within one column, so the column is now named.

- **Sentence under the penalty table: "So mixing is required." → "So mixing is needed."**
  The spec's substitution table lists require → need. This was the only English-bar hit in the
  visible prose.

Nothing else was touched. The CSS, the panel structure, the layout, the JavaScript, the audio
strips and the four script comments are byte-for-byte unchanged, as instructed for the reference
implementation. The diff is 6 lines.

## Could not verify

- **Quiz 4's explanation says "Across six solved past papers this option ['None of the other
  answers is correct'] has never once been the right answer."** I checked the two papers a learn
  day may read, 2024 B and 2025 A, and the claim holds in both (2025 A offers that option in Q1,
  Q3 and Q5 and it is never the answer; 2024 B never has it as the answer either). The other four
  papers are mock papers I was told not to open for this page, so I confirmed 2 of the 6. The
  claim is hedged on the page ("Low prior, not zero"), so a learner is not misled even if one of
  the four is an exception, but the number "six" is not something I stood up.

- **The lede's "About 21% of the marks live here."** In 2025 A, three of fourteen questions are
  zero-sum or mixed (Q3, Q13, Q14) = 21.4%, which matches exactly. In 2024 B it is two of fourteen
  (Q12, Q13) = 14.3%. So across the two papers I may read, the share runs 14% to 21% and the page
  quotes the top of that range. I did not open the four mock papers to widen the sample. I left
  the number alone: it is correct for one of the two papers I checked, and the intro audio is
  bound to the same framing.

- **Two spoken asides are not in the visible page text.** The section 3 script says a quick check
  is "a minute saved in an exam where every question gets about six", and that a needless mixture
  "gives you a number that looks perfectly reasonable and is not the answer". The page covers the
  first only as "The test is quick", and the second only inside Quiz 6's explanation, which is
  hidden until the learner clicks. I did not add prose, because adding paragraphs to the reference
  implementation is outside what I was allowed to change here. Separately, the six-minutes figure
  is consistent with the papers I read (90 minutes, 14 questions = 6.4 minutes each), so the
  number itself is sound.

- **The intro script's "it is the biggest single block of marks on the paper."** On 2025 A the
  mixed and zero-sum questions are 3 of 14, while Nash equilibrium and dominance questions are 6
  of 14. By that grouping, mixed strategies is not the biggest block. The page's own visible claim
  ("about 21% of the marks") is the defensible one and is what Ifat reads. I cannot edit the
  script, so I am only recording it.

## Suggestions I did NOT act on

- **Quiz 6 and the section 3 try-it are the same task with different numbers.** The try-it is
  `4,7,2,5` and Quiz 6 is `6,8,3,5`; both are "row dominance, find the saddle, value is the cell".
  The letter of the rule is met, since no numbers or scenario are shared, but a learner who did
  the try-it can answer Quiz 6 by pattern alone. If someone rewrites Quiz 6 later, the cleanest
  variation is a game whose pure equilibrium comes from **column** dominance rather than row
  dominance, since the page never shows that case.

- **The section 3 rule box is a sufficient test, not a complete one.** "If one row beats the other
  everywhere, the game is already solved" is true, but a 2x2 zero-sum game can have a saddle point
  through column dominance with no dominant row. The complete test (smallest in its row, largest
  in its column) is given in the prose directly above the box, so the page does teach it, and the
  box matches what the audio says. I left it. If it is ever revisited, making the rule box carry
  the saddle test instead of the dominance shortcut would close the gap.

- **"Left foot" versus "left side".** The page and the audio both say the kicker's weaker *foot*;
  Presentation 5 consistently says the weaker *side* (where the ball is aimed), noting that the
  right side is easier "perhaps due to being right-footed". The metaphor is harmless and the audio
  is bound to it, so I left it.

- **The quoted line "becoming better at something may make you use it less often"** is presented
  in italics as the slides' own wording. The slide actually reads "Becoming better in left might
  induce the player to play left less often". It is a fair generalisation and the audio uses the
  same phrasing, so I left it, but it is a paraphrase rather than a quote.

## Summary (five lines, for the synthesis)
- Questions checked: 17 (6 quiz items, 2 worked examples, 2 try-it problems, 3 teaching matrices, the SVG graph, plus 3 sets of distractor arithmetic), every one re-solved in exact-fraction Python.
- Answers wrong before I started: 0. Every p, q, value and answer key on the page was already correct, including all six quiz keys and all twelve distractor derivations.
- Other changes: 4 (the Vizzini payoff matrix inverted in both of its two forms; one warning-box sentence naming the wrong column; one English-bar word).
- Unverifiable: the "six past papers" claim in Quiz 4's explanation (confirmed on 2 of 6), the "about 21% of marks" figure (21.4% in 2025 A, 14.3% in 2024 B), and two audio-only asides not present in the visible text.
- Biggest risk left on this page: none in the answer keys. The residual risk is pedagogical, not numerical: Quiz 6 repeats the section 3 try-it's task with fresh numbers, so it may over-report how well Ifat has learned to spot a pure equilibrium.
