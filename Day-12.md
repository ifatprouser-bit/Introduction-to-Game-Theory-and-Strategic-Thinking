# Day 12 — Timed mock exam: Special Mo'ed C, 10 August 2025

## Verdict

CLEAN. All 14 answer keys are correct. No changes made to `Day-12.html`.

One honesty-labelling judgment call is flagged below (questions 8 and 9). It is a labelling
nuance, not a wrong answer, and I left the file alone per rules 5 and 6.

---

## How I read the source

All three PDFs opened with `project_read` and were read in full:

- `2025 C  detailed solution.pdf`
- `2025 C  scrambled exam.pdf`
- `2025 C  codezero exam.pdf`

The trap named in my task is real and I handled it as instructed. The circulated solution is
written against the **code-zero** paper, so it answers "(a)" to thirteen of fourteen questions
and writes "(c)" for question 11. I therefore built the official answer key from the **text** of
each code-zero option (a), never from the solution's letters, and then located that same text in
the **scrambled** paper to get the letter this page must use.

The official answer key, as text, with the scrambled letter it maps to:

| Q | Official answer (text from code-zero option a) | Scrambled letter |
|---|---|---|
| 1 | "…achieving a larger objective through a series of small, incremental actions" | b |
| 2 | Battle of the Sexes | a |
| 3 | "Defect in round 8-10, and cooperate in rounds 1-7" | a |
| 4 | 4 | a |
| 5 | 3 | c |
| 6 | 19 | b |
| 7 | 11 | e |
| 8 | 36% | c |
| 9 | 12 | b |
| 10 | 1 | b |
| 11 | 7 | a |
| 12 | "…no player can improve their outcome by changing their strategy while others remain unchanged" | e |
| 13 | "…always results in a worse outcome… regardless of what the other players do" | b |
| 14 | Stag hunt | d |

I also checked the page's own count of the letter mismatch. Official letters are a for
Q1–Q10 and Q12–Q14, and c for Q11. Against the page's letters, **exactly 11 of 14 disagree**;
the three that agree are Q2, Q3 and Q4. The page's errata boxes say "eleven of those fourteen
letters do not match" and "mislabels question 11 as (c)". Both are exactly right.

### What the text layer actually contains

- **Q4**: the full 3×3 grid IS in the text layer of both exam PDFs. This is the only grid on
  the paper that is recoverable verbatim.
- **Q8/Q9**: the matrix is an image. The solution gives p(Top)=40%, p(Down)=60%, q(Left)=60%,
  q(Right)=40%, and the line "40%\*30 = 60%\*20 = 12". See the Q8/Q9 note below for why those
  four values pin the grid exactly.
- **Q7**: tree is an image. The solution states only "Player 2 getting a payoff of 11".
- **Q10**: grid is an image. The solution states only "(A,D) with payoff profile (2,4)".
- **Q11**: grid is an image. The solution states only "(U,L) with payoff (1,2) and (L,R) with
  payoff (7,4)".
- Q1, Q2, Q3, Q5, Q6, Q12, Q13, Q14 have no matrix or tree at all.

---

## Question table

Every "I computed" cell below comes from a Python script I ran, never from arithmetic in my head
and never from the page's own prose.

| Q | Topic | Page says | I computed | Official solution says | Match | Action |
|---|---|---|---|---|---|---|
| 1 | Salami tactics (P6) | b, small incremental actions | n/a (definition) | same text | ✅ | none |
| 2 | Multiple pure NE (P4) | a, Battle of the Sexes | n/a (recall) | Battle of the Sexes | ✅ | none |
| 3 | Repeated PD best reply (P3) | a, defect 8–10 | brute force over all 2^10 paths: unique max is CCCCCCCDDD, score 28 | "Defect in rounds 8–10" | ✅ | none |
| 4 | Unique pure NE, P2's payoff (P4) | a, 4; cell (Middle, Center) = (5,4) | unique pure NE = (Middle, Center), P1 5, P2 **4** | 4 (but names the wrong cell) | ✅ answer; page is right that the solution's cell is wrong | none |
| 5 | 21 flags from 19 (P2) | c, 3 | backward induction over all positions: 3 is the only winning removal | 3 | ✅ | none |
| 6 | 2/3-average (P1/P4) | b, 19 | 50.5 → 33.67 → 34; 22.67 → 23; (34+23)/2 = 28.5; ⅔ × 28.5 = **19.0** | 19 | ✅ | none |
| 7 | 3-player backward induction (P2) | e, 11 | solved the drawn tree node by node: path L then a1, player II gets **11** | 11 | ✅ | none |
| 8 | P(Down, Left) in mixed NE (P5) | c, 36% | q = 3/5, p = 2/5; (1−p)·q = 9/25 = **36%** | 36%, "60%\*60%" | ✅ | none |
| 9 | Value of the game (P5) | b, 12 | 30·(1−q) = 20·q = full expectation = **12** | 12 | ✅ | none |
| 10 | Count pure NE (P4) | b, 1 | exactly one: (A, D) = (2, 4) | 1, at (A,D) with profile (2,4) | ✅ | none |
| 11 | Highest P1 payoff in a pure NE (P4) | a, 7 | two pure NE: (Up,Left) = (1,2) and (Low,Right) = (7,4); max P1 = **7** | 7, with profiles (1,2) and (7,4) | ✅ | none |
| 12 | Nash equilibrium definition (P4) | e | n/a (definition) | same text | ✅ | none |
| 13 | Dominated strategy (P3) | b | n/a (definition) | same text | ✅ | none |
| 14 | Two pure NE, one Pareto better (P3/P4) | d, Stag hunt | n/a (recall) | Stag hunt | ✅ | none |

Stems and all five options on all 14 questions are verbatim the **scrambled** paper, in the
paper's own order, with the paper's own option order. I checked all 70 options one by one.

---

## The claim I was told to test hardest: question 4

The page asserts that the circulated solution is wrong on Q4. **The page is right.** I tested it
from the grid the exam PDF itself prints, under both possible readings.

The exam's text layer gives, per cell, two stacked numbers:

```
Up:     (8,9)  (7,4)  (9,7)
Middle: (3,8)  (4,5)  (1,8)
Down:   (6,10) (7,2)  (6,7)
```

**Reading A — second number is player 1** (the brief's cell-order rule):

| | Left | Center | Right |
|---|---|---|---|
| Up | 9, 8 | 4, 7 | 7, 9 |
| Middle | 8, 3 | **5, 4** | 8, 1 |
| Down | 10, 6 | 2, 7 | 7, 6 |

Unique pure Nash equilibrium: **(Middle, Center) = (5, 4)**. Player 2 gets **4**, which is the
published answer. This matrix is byte-for-byte what the page prints. My script confirmed the
page's table equals reading A exactly.

**Reading B — first number is player 1** (the naive reading): the unique pure equilibrium is
(Up, Left) = (8, 9), so player 2 would get **9**, contradicting the published answer of 4.

So the ordering rule is confirmed again on this paper, independently.

Point by point against the page's claim:

- "The equilibrium is not (Up, Center)." ✅ My script: (Up, Center) is not an equilibrium under
  reading A (player 1 moves Up→Middle, 5 beats 4; player 2 moves Center→Right, 9 beats 7) and it
  is not one under reading B either (player 2 would move to Left, 9 beats 4). The page says
  "not an equilibrium under *either* reading". Confirmed for both.
- "Player 1 does not get 7 there." ✅ Under reading A, (Up, Center) pays player 1 **4**.
- "The true cell is (Middle, Center), holding (5, 4)." ✅
- "The cell that *prints* as '7 then 4' is (Up, Center)." ✅ My script searched the raw grid and
  (Up, Center) is the only cell printing (7, 4).
- "Only the final answer of 4 survives, and it survives by accident." ✅ The number 4 is player
  2's payoff at (Middle, Center); the solution reached it from a different cell and with the two
  players swapped.

The page is correct on every part of this, and it is a genuinely useful warning to put in front
of a student. I left it exactly as written.

---

## Audit of the honesty labels

### Legitimately tagged real — no matrix or tree at all (rule: always safe)

Q1, Q2, Q3, Q5, Q6, Q12, Q13, Q14. I checked the exam PDFs: none of these carries a grid or a
tree. Note that Q3 is verbal on this paper, unlike the same-topic question on 2024 A and 2024 B
which do print a payoff matrix. Tagging it "2025 C final" is correct.

Q3's explanation scores the options using "the standard prisoner's dilemma values (temptation 5,
reward 3, punishment 1, sucker 0)". Those numbers are not on the paper, but the explanation says
so plainly and they do not change the answer. I re-ran the brute force under six different PD
parameterisations ((5,3,1,0), (3,2,1,0), (5,4,2,1), (10,6,2,0), (4,3,1,0), (6,4,2,1)) and option
(a) is the unique best reply in every one. The five scores the page quotes (a=28, c=26, b=25,
e=25, d=24) match my computation exactly for the values it names.

### Legitimately tagged real — matrix restated as text (rule met in full)

**Q4.** The grid is in the exam PDF's own text layer, and my code reproduces the published
answer from it. This is the strongest possible case and the tag is right.

### Correctly labelled reconstructions

**Q7, Q10, Q11** each carry an amber `recontag` chip in the always-visible question head
("tree redrawn" / "grid rebuilt"), an amber `examtag partial` chip reading "2025 C wording"
instead of "2025 C final", and a `srcnote` in the explanation saying what was rebuilt and why.
That satisfies the brief's requirement of a visible label plus a short note.

Each reconstruction reproduces the published answer, and I checked more than just the final
number:

- **Q7**: the drawn tree solves to player II = 11 ✅. Beyond that, the five player-II payoffs in
  the tree are exactly {0, 2, 5, 8, 11}, which is exactly the five options on the paper. The
  page claims this and it holds.
- **Q10**: the drawn grid has exactly one pure NE ✅, and it sits at **(A, D) with profile
  (2, 4)** — the exact cell and exact profile the official solution names, not merely the same
  count.
- **Q11**: the drawn grid has exactly two pure NE ✅, at **(Up, Left) = (1, 2)** and
  **(Low, Right) = (7, 4)** — the exact two profiles the official solution names. Max for
  player 1 is 7 ✅. The page even names the third row "Low" so it matches the solution's "(L,R)".

I also verified the page's near-miss prose: on Q10, (A,E) and (B,F) each carry player 1's
underline only, as claimed; on Q11, 5 is player 1's payoff at (Middle, Right), a non-equilibrium
cell, as claimed.

### The one borderline call: Q8 and Q9

These two carry the green "2025 C final" tag with no amber chip. Their matrix is an **image** in
the exam PDF and is **not restated as a grid** anywhere in the solution document. Read strictly,
the brief's honesty rule would make them reconstructions.

Here is why I judged the page's treatment defensible, and why I did not change it:

1. **Every one of the four cell values is forced, not chosen.** The solution writes the value of
   the game as "40%\*30 = 60%\*20 = 12". Writing the value as (1−q)·30 requires the Top row to be
   (0, 30). Writing it as q·20 requires the Down row to be (20, 0). That is the whole matrix.
   Independently, the zeros cannot be on the main diagonal: a main-diagonal-zero game forces
   p = q, and the solution states p = 40% and q = 60%. So the anti-diagonal shape is forced too.
   Nothing here was invented by the builder.
2. **My code reproduces both published answers exactly** from that grid: P(Down, Left) = 9/25 =
   36%, and the value = 12 by all three routes (30·(1−q), 20·q, and the full 2×2 expectation).
3. **The page already discloses it in always-visible text.** The `srcnote` at the top of the
   page, which is on screen before the clock starts, says the grids and trees are pictures and
   that "Questions 4, 8 and 9 carry the paper's own numbers, rebuilt from the exam and solution
   text and solved again to check they match the published answers." So the learner is told that
   Q8 and Q9's numbers were rebuilt.
4. **The two-tier treatment reflects a real difference.** On Q10 and Q11 seven of the nine cells
   were freely chosen by the builder. On Q8 and Q9 nothing was freely chosen. Giving them the
   same amber chip would overstate the uncertainty as much as the green chip understates it.

Rules 5 and 6 tell me to raise design and labelling calls in the report rather than act on them,
and no answer is affected. So I left it and I am flagging it here. See "Suggestions".

---

## Check against BUILD-SPEC §10

I opened the file in Chromium with Playwright and drove it, rather than reading the source.

| Requirement | Result |
|---|---|
| Timer 90:00, counting down | ✅ shows `90:00`, state "Not started"; after start it read `89:58` |
| Start button | ✅ |
| Pause button | ✅ clock froze at 89:58 across 1.5s, state "Paused", button relabels to "Resume", resumes correctly |
| 14 questions, five options each | ✅ 14 question blocks, 70 options. The 15th `.qblock` is `id="dataZS"`, the shared data block, as expected |
| No running score during the run | ✅ only an "answered n / 14" progress count, no marks |
| No answer reveal during the run | ✅ clicking an option adds only `.chosen`; all 14 explanations stayed `display:none`, results panel stayed hidden |
| Submit button | ✅ marks everything, opens all 14 explanations, locks the paper |
| Auto-submit at zero | ✅ drove the clock forward 90 minutes: clock `00:00`, state "Time up", results opened, Start/Pause/Submit all disabled |
| Results: score out of 14 | ✅ "2 / 14" on my seeded run |
| Results: percent | ✅ "14%" |
| Results: list of questions missed | ✅ plus a separate "left blank" list |
| No invented pass mark | ✅ the panel states outright "There is no pass mark. No past paper prints one" |
| Explanations reveal only at this point | ✅ 0 open during the run, 14 open after |
| Full data beside every question | ✅ Q4's grid, Q7's tree and Q10/Q11's grids sit inside their own question. Q8 and Q9 share one data block placed immediately above them under the heading "Data for questions 8 and 9", which §10 explicitly allows |
| Real paper's question order | ✅ 1 through 14, matching the scrambled PDF |
| `@media print` opens explanations | ✅ emulated print media: all 14 explanations `display:block`, results panel open, timer and home link hidden |
| Sit it at 16:00 note | ✅ the start box says so, and says why |
| Page errors | none. The `ERR_INVALID_URL` GoatCounter notice is the known local-file artefact and is not a page error |

---

## Other claims on the page that I checked against source

- **"This exact question is question 11 on the 2024 A paper, and there the answer is 1, because
  that game has a single equilibrium at (Up, Left)."** ✅ Verified. 2024 A Q11 has the identical
  stem and the options 1, 2, 5, 7. Its detailed solution reads: "Correct Answer: A. 1 … the only
  cell in which the outcome can not be improved by either player changing their strategy
  unilaterally is (Up, Left) … Player 1 (Rowena)'s payoff here is 1." Every part of the page's
  claim holds, including the cell. Not a spoiler either: 2024 A is sat on Day 7, five days
  before this page.
- **"This question also appears word for word as question 4 on the 2024 B paper."** ✅ Verified.
  2024 B Q4 is identical in stem and options, answer Stag hunt. 2024 B is a reserve paper, never
  sat, so quoting it is allowed.
- **"'None of the other answers is correct' has never once been the right answer."** Verified for
  five of the six papers by reading each code-zero paper and checking that no option (a) is that
  phrase: 2024 A, 2024 B, 2025 A, 2025 B, 2025 C. See "Could not verify" for the sixth.
- **"It appears three times here, as option (e) in Q2, Q5 and Q14."** ✅ Exactly three, exactly
  those questions.
- **Q9: "this paper gives no rounding instruction on Q9, where Q8 says 'nearest percentage
  point'."** ✅ Matches the exam PDF word for word.
- **Q8 distractor arithmetic.** ✅ 24% = p·q = 0.4 × 0.6; 16% = p·(1−q) = 0.4 × 0.4; 40% and 60%
  are single probabilities, not cells. All four confirmed in code.
- **Q6 distractor arithmetic.** ✅ 33 = ⅔ × 50; 22 = ⅔ × 33 exactly; 27 from (33+22)/2 = 27.5;
  15 = ⅔ × 23 ≈ 15.33. All four confirmed in code.
- **Q9: "That is 14 marks."** ✅ 7 points per question × 2 = 14, matching §1 of the spec.

## English bar

- **Em dashes: zero.** I scanned the rendered page text in the browser (0 occurrences of `—`)
  and the raw file (0 occurrences of `—`, 0 of `&mdash;`). Nothing to fix.
- No `<!-- SCRIPT -->` audio comments and no `<audio>` elements exist on this page, which is
  correct for a mock day, so there was nothing there to leave alone.
- Sentences read short, one idea at a time. Course vocabulary (Nash equilibrium, dominant and
  dominated strategy, backward induction, zero-sum, mixed strategy, Pareto better, salami
  tactics, the archetype names) is kept, which is right.

---

## Changes I made

None. The file is unmodified. `Day-12.html` is byte-for-byte as I found it.

---

## Could not verify

- **The shape of the real Q7 tree, the real Q10 grid and the real Q11 grid.** These are images in
  the PDF with no text layer. The solution pins only the answer (Q7: player II gets 11), or the
  equilibrium cell and profile (Q10: (A,D) = (2,4); Q11: (1,2) and (7,4)). The page's versions
  reproduce every fact the solution states, but the off-equilibrium cells and the tree's exact
  branching cannot be confirmed and are the builder's own. The page says this in visible text on
  all three. Nothing is guessed, but nothing off the equilibrium path is confirmed either.
- **The zero *positions* in the Q8/Q9 matrix are inferred, not printed.** The inference is tight
  (see the Q8/Q9 section: the solution's own equation forces all four values, and p ≠ q rules out
  the main diagonal), and both published answers come out exactly. But the grid itself is not
  printed as a grid anywhere in the source.
- **"'None of the other answers is correct' has never been right" — the practice exam.** I
  verified the five real papers in full. The practice exam has no code-zero version, so I could
  not enumerate all fourteen of its answers cheaply. The two I did see in its solution document
  (Q3 = 22 and 23; Q4 = "Only chess") are not that option, so nothing contradicts the claim. The
  claim is already hedged on the page as "a low prior, not zero".
- **Q8's errata line "Five of the seven past zero-sum matrices have zeros on the main
  diagonal."** This restates BUILD-SPEC §9 and matches it, but I could not check it against
  source: those matrices are images on papers outside my unit.

---

## Suggestions I did NOT act on

1. **Q8 and Q9's chip.** If the synthesis wants the brief's honesty rule applied to its letter
   rather than its spirit, the minimal fix is to swap `examtag` for `examtag partial` on Q8 and
   Q9, add a `recontag` reading "grid rebuilt from the solution's algebra", and move those two
   question numbers from the "carry the paper's own numbers" sentence to the "reconstructions"
   sentence in the top `srcnote`. My own view, set out above, is that the current treatment is
   honest and that an amber chip would overstate the doubt, because unlike Q10 and Q11 not one
   of the four cell values was chosen by the builder. But it is a judgment call and the synthesis
   should make it once, the same way, across all four mock days.
2. **A dead analytics id.** The tracking block at the bottom reads
   `document.getElementById('resScore')`, but the element on this page is `id="rScore"`. So the
   mock-completion event fires with an empty score slug. This affects analytics only, never a
   mark or an answer, and the same mismatch exists on Day 7 and Day 10 (Day 3 uses `resScore`
   and works). It is shared boilerplate that spans files I do not own, so it should be fixed in
   one pass across all four mock pages, not by me in one file.
3. **Q11's distractor explanation.** It explains where 5 comes from ((Middle, Right), a
   non-equilibrium cell) and it lists both equilibrium profiles, so 1 and 2 are visible. It does
   not name 1 and 2 as distractors in so many words. Adding one sentence would match §12's
   "exact wrong calculation behind each tempting distractor" more tightly. Not an error, and not
   worth an edit against the minimal-change rule.

---

## Summary (five lines, for the synthesis)

- Questions checked: 14 of 14, every one re-solved or re-sourced in code; all 70 options compared
  against the scrambled PDF.
- Answers wrong before I started: 0.
- Other changes: 0. The file is untouched.
- Unverifiable: the off-equilibrium cells of the Q10 and Q11 grids and the exact branching of the
  Q7 tree (images in the PDF, disclosed on the page); the printed zero positions in the Q8/Q9
  matrix (inferred, tightly, from the solution's own equation); one cross-paper claim about the
  practice exam; one cross-paper claim about past zero-sum matrix shapes.
- Biggest risk left on this page: none affecting a mark. The residual risk is a labelling one:
  Q8 and Q9 wear the same green "2025 C final" chip as the verbatim questions, while their grid
  was derived from the solution's algebra rather than printed. The always-visible note at the top
  of the page does disclose this, and both published answers are reproduced exactly, so a learner
  cannot be taught a wrong answer by it.
