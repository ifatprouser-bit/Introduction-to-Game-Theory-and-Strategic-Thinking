# Day 11 — The two arithmetic questions you must not lose

## Verdict
FIXED (10 changes). Every number on the page was already correct. Nine of the ten changes close
reserve-paper leaks, one corrects a mis-taught mechanism and one corrects a cell name.

## Question table

Every mixed equilibrium below was re-solved in exact fractions in Python: both indifference
equations, p, q, the value from **both rows and both columns** (all four must agree), and every
cell probability the page quotes. Script: `scratchpad/v1.py`, `v2.py`, `v4.py`.

| Q | Topic | Page says | I computed | Official solution says | Match | Action |
|---|---|---|---|---|---|---|
| S1 worked ex. (a) | cell prob., grid 5,0/0,20 | (Top,Right) = 16% | p=q=0.8, P=0.8×0.2=0.16 → 16% | n/a (fresh; it is 2025 A's grid ×5, and 2025 A is a reserve paper) | ✓ | none |
| S1 worked ex. (b) | value | 4 | value = 4 from Top, Down, Left and Right | n/a | ✓ | none |
| S1 try-it | cell prob. + value, 12,0/0,4 | 19%, value 3 | p=q=0.25, P(Top,Right)=0.1875 → 19%, value 3 | n/a | ✓ | none |
| S2 worked ex. | anti-diagonal grid | **was** 0,30/20,0 → 36%, value 12 | p=0.4, q=0.6, P(Down,Left)=0.36, value 12 (page was right) | that grid **is** a mock paper's, with its published answers | ✓ but LEAK | grid replaced with fresh 0,36/12,0 → 56%, value 9 (re-verified) |
| S2 try-it | no-zero grid 4,1/2,3 | p=0.25, q=0.5, value 2.5; recipe gives 0.43 and 1.71 | identical; recipe b/(a+b)=3/7=0.4286, ab/(a+b)=12/7=1.714 | n/a | ✓ | none |
| S3 worked ex. | 2/3-average, mixed crowd | 50, 30 → 40 → 26.67 → 27 | (11+89)/2=50, crowd 40, 2/3×40=26.667 → 27 | n/a | ✓ | distractor wording only |
| S3 try-it 1 | 10-player contest | **was** 5,10,20,30,40,40,50,50,89 → 22 and 23 win | confirmed: among the four options 22 and 23 both win (full strict-winner band is 21–28) | it is a mock paper's question, answer and option list | ✓ but LEAK | replaced with 5,15,25,35,45,45,55,65,75 → 26 and 27 win (only those two, verified over all bids 1–100) |
| S3 try-it 2 | 2/3-average, mixed crowd | 30.5, 12 → 21.25 → 14 | identical; trap numbers 20 and 21 confirmed | n/a | ✓ | none |
| Quiz 1 | uniform 17–93 | 37 | (17+93)/2=55, 2/3×55=36.667 → 37; distractors 55, 50, 33.33, 24.67 all reproduce | n/a | ✓ | none |
| Quiz 2 `2025 A final` | mixed crowd | 28 | 50.5, level-1 plays 34, crowd 42.25, 2/3 → 28.17 → 28 | **2025 A Q7: "a. 28"**, stem and all five options word for word, oddity "the average of the ten numbers" real | ✓ | none (tag is legal: reserve paper, no matrix) |
| Quiz 3 | lab behaviour | 13–19, ~10% play equilibrium | 10% confirmed in P4; 13–19 **not stated in P1 or P4** | n/a | partial | none (see "Could not verify") |
| Quiz 4 | cell prob., 3,0/0,7 | 21% | p=q=0.7, P(Top,Right)=0.21; distractors 49, 70, 30, 9 all reproduce | n/a | ✓ | one cell mis-named (fixed) |
| Quiz 5 | cell prob., anti-diagonal 0,9/18,0 | 44% | p=2/3, q=1/3, P(Top,Right)=4/9=44.4% → 44; shortcut gives 2/9=22%; value 6 either way | n/a | ✓ | none |
| Quiz 6 | value, no zeros 10,2/4,6 | 5.2 | p=0.2, q=0.4, value 5.2 from all four lines; maximin 4, minimax 6, mean 5.5, swap gives 3.6 | n/a | ✓ | none |

Cell-probability matched-vs-mismatched audit (the silent-error check): every cell the page quotes
is the cell it names. (Top,Right) → p(1−q) ✓ three times. (Down,Left) → (1−p)q ✓. (Top,Left) →
pq ✓. (Down,Right) → (1−p)(1−q) ✓. The only defect was a *name*, not a product: see change 9.

2/3-average audit: the page averages the whole crowd first and multiplies once at the end, on
every item ✓. I tested the two orders in code rather than trusting the page: with equal-sized
groups the two orders give **the same** number (2/3 is linear), so the real mistake is *dropping a
group*, not the order. Two sentences said otherwise. See change 8.

## Changes I made

**Leaks. Three sibling pages were caught here; this page carried five separate leaks, one of them
the worst kind: a mock paper's grid, its published mixtures, both its published answers and one of
its printed options, teaching the paper she sits tomorrow on Day 12.**

1. **Section 2, "Break 1" opening.** Was: *"This is what the 2025 C paper did. The published
   solution says plainly: player 1 plays top with probability 40% and down with 60%, and player 2
   plays left with probability 60% and right with 40%. Read that twice..."* Now: *"One of the past
   papers moves the zeros to the other diagonal. The grid below has that shape. Solve it and the
   two mixtures come out different. They are swapped: what player 1 gives to the top row, player 2
   gives to the right column."* Paper name and quoted solution removed; the teaching point (the
   mixtures are swapped, not equal) is unchanged.

2. **Section 2, the anti-diagonal grid itself.** Was 0,30 / 20,0 — that is the mock's own grid.
   Now 0,36 / 12,0, built for this page. Re-solved: q = 0.75, p = 0.25, both mixtures still
   different and still adding to one, so the shape lesson is identical. Worked-example steps
   rewritten to match: `36(1−q) = 12q → q = 0.75`, `12(1−p) = 36p → p = 0.25`,
   `P(Down,Left) = 0.75 × 0.75 = 56%`, value `36 × 0.25 = 9 = 12 × 0.75`.

3. **Section 2 answer box.** Was: *"Both are the published answers to the 2025 C pair."* Now:
   *"Two lines of algebra gave you both answers."*

4. **Section 2 warning box.** Was: *"you get equal mixtures of 40% each. So P(Down, Left) becomes
   0.6 × 0.4 = 24% instead of 36%. And 24% is printed on the real paper as option (b)... the recipe
   still returns 12."* Now: *"you get equal mixtures: 12 ÷ 48 = 25% for both players. So P(Down,
   Left) becomes 0.75 × 0.25 = 19% instead of 56%. On the real paper with this shape, the number
   the recipe gives was one of the five options... the recipe still returns 9, which is correct."*
   Checked in code: on the new grid the shortcut gives 19% whichever way round you feed it
   (12/48 or 36/48), and the recipe value 36×12/48 = 9 does equal the true value, so the
   "the value will not rescue you" point survives intact.

5. **Section 2, the five-for-five sentence.** Was: *"It works on 2024 A, 2024 B, 2025 A, 2025 B and
   the practice exam. Five for five."* Now: *"It works on five of the seven past grids. Five for
   five, and after five you stop reading the grid."*

6. **Section 2, "Break 2".** Was: *"This shape appeared on the practice exam."* Now: *"One of the
   seven past grids has this shape."*

7. **Section 1, the rounding table.** Named four mock papers and quoted each one's bracket wording.
   The two reserve rows (2024 B, 2025 A) stay, both verified against their solution documents. The
   other four rows are collapsed into one: *"The other four past papers (not named here, so your
   mock days stay fresh) | two of them use the first wording above, two use the second | one uses
   each wording above, and two give no instruction at all."* All four wordings and the "sometimes
   none at all" point survive, which is what the audio script promises.

8. **Section 1 warning box.** Was: *"Take it word for word and 11.11% becomes 12%, and 1.333
   becomes 1.34. But the published answers on those exact questions are 11% and 1.33."* Those are a
   mock's two published answers (they are not 2024 B's, which are 19% and 0.75, nor 2025 A's, which
   are 64% and 0.8, so they can only come from a paper she sits). Now: *"Take it word for word and
   11.11% would become 12%, and 1.333 would become 1.34. No past answer key does that. They all
   round the ordinary way, to whichever number is nearer."* Same lesson, no answer quoted.

9. **Section 3, the ten-player try-it.** Was the mock's question, its option list and its answer,
   with the note *"This is a known mistake in the practice exam. The professor wrote the question
   expecting one answer, and he later agreed that 22 and 23 are both best replies."* Now a fresh
   nine: 5, 15, 25, 35, 45, 45, 55, 65, 75, options (a) 1, (b) 26, (c) 27, (d) 33. I searched every
   integer bid 1–100: **26 and 27 are the only strictly winning bids** (25 ties), so the
   two-correct-answers lesson is still true of the question in front of her. All arithmetic in the
   reveal recomputed: sum 365; bid 26 → target 26.07, your gap 0.07 against 25's 1.07; bid 27 →
   target 26.13, gap 0.87 against 1.13; bid 33 → target 26.53, you 6.47 away, 25 only 1.53; bid 1 →
   target 24.40, hopeless. The errata warning stays, de-identified: *"One past question of this
   kind has two best replies, and the professor agreed that both are right."*

**Not leaks:**

10. **The "wrong order" mechanism (two places, plus one caption).** The page said the trap number
    comes from multiplying before combining. Tested in code: with equal groups, 2/3-then-average
    and average-then-2/3 give **the same** number every time, on all four of the page's items. The
    number 33 comes from *leaving a group out*, not from the order. Changed *"so you multiplied
    before you combined"* to *"so you took two-thirds of one group and left the other half of the
    crowd out"*, and in quiz 2 *"You multiplied before you combined, so you best-replied to group 1
    only"* to *"You best-replied to group 1 only and left group 2 out of the crowd."* The diagram
    caption *"Do it in the wrong order, taking two-thirds of the band's middle and ignoring the
    cluster"* became *"Take two-thirds of the band's middle on its own and leave the cluster out."*
    The advice "average first, then multiply" is kept: it is never wrong, and the audio teaches it.

11. **Quiz 4, a cell called by the wrong name.** Was: *"9%: 0.3 × 0.3 = P(Down, Right), the other
    crossed pair."* (Down, Right) is a **matching** cell, not a crossed one, and this page's whole
    first section turns on that distinction. Now: *"the matching cell in the other corner."* The
    same phrase in quiz 5 is correct there ((Down, Left) really is crossed) and was left alone.

Nothing else was touched: no layout, no CSS, no audio strip, no audio-script comment, no question
order, no other number.

## Could not verify

- **The 13 to 19 laboratory range.** Presentation 4 confirms the rest of that claim exactly: the
  elimination chain 67 → 45 → 30 → 20 → 14 (the page's chain is the professor's, number for
  number), the unique equilibrium 1, the level-0 / level-1 / level-2 vocabulary, and *"Few players
  (~10%) play the dominance-solvable Nash equilibrium (1)"*. **Neither Presentation 1 nor
  Presentation 4 states the 13–19 range**; P4 shows it only as a graph image from Bosch-Domènech
  et al. (1998), whose numbers are not in the text layer. The build spec asserts it and it is
  almost certainly a real past-paper option, but I did not correct it from my own knowledge and I
  did not confirm it. It is the correct answer to quiz 3, so if it is wrong, quiz 3 is wrong.
- **The four collapsed rows of the rounding table** (which wording each unnamed paper uses). I
  verified the 2024 B row against the 2024 B solution and the 2025 A row against both the 2025 A
  exam sheet and its solution, including the caption's point that the solution document re-words
  them. The claims about the other four papers are the page's own; reading those papers is outside
  a learn day's source list.
- **"Five of the seven past grids", "two of the seven break it", "six probability questions, three
  matched and three mismatched".** The two grids I am allowed to read (2024 B: 1,0/0,3 and 2025 A:
  1,0/0,4) are both the main-diagonal shape, as claimed. The counts themselves come from the build
  spec, and I did not open the four mock papers to recount them.

## Suggestions I did NOT act on

- **Trap 1 lists the exact cell each past question asks for** ("(right, right)", "(Top, left)",
  "both players play left", "(Left, right)", "(Top, Right)", "(Down, Left)"). Two of those six are
  the reserve papers' and are fine. The other four come from papers she sits, but no paper is
  named, no answer or option is given, and the three-and-three split is the whole teaching point.
  I judged this below the leak line and left it. Flagging it so the synthesis can overrule me.
- **The section 1 worked grid (5,0 / 0,20) is 2025 A's grid multiplied by five**, giving the same
  p = q = 0.8 and the same 64% matching cell. 2025 A is a reserve paper, so this is allowed, but
  quiz 2 is also tagged 2025 A, so that one paper now shows up twice on this page.
- **The reserve rule is stricter than the calendar.** Days 3, 7 and 10 are sat *before* Day 11, so
  the practice-exam and 2024 A material I removed could not actually have spoiled a future mock.
  Only the 2025 C leak (Day 12) was a live spoiler. I applied the rule as written rather than by
  date, which is the safe direction, but a future build could relax it for papers already sat.
- The page still has no visual for the coupled *pair* itself (one grid, two question stems side by
  side). That is a design idea, not an error.

## Summary (five lines, for the synthesis)
- Questions checked: 14 (6 quiz items, 3 worked examples, 4 try-its, 1 behavioural recall), every
  mixed equilibrium re-solved in exact fractions with the value cross-checked from both rows and
  both columns.
- Answers wrong before I started: 0. Every number on the page was already correct.
- Other changes: 10 edits. 9 close reserve-paper leaks (one mock's grid, mixtures, both answers and
  a printed option; another mock's question, options and answer; three paper-name mentions; a
  rounding table naming four mocks; a warning box quoting a mock's two answers). 1 fixes a
  mechanism the page taught wrongly (order of operations, tested in code), 1 fixes a cell called
  "crossed" that is matching.
- Unverifiable: the 13–19 lab range (in no presentation), the four unnamed rounding rows, and the
  five-of-seven / six-questions counts.
- Biggest risk left on this page: quiz 3's correct answer rests on the 13–19 figure, which no
  course presentation states. If that range is wrong, a recall mark goes with it.

## Files I wrote
- `/home/claude/gt-verify/Day-11.html` (edited)
- `/home/claude/gt-verify/reports/Day-11.md` (this report)
