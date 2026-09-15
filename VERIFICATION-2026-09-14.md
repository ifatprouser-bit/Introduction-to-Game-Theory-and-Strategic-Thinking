# Verification pass — Game Theory 14-day study site

**Date: 14 September 2026.** Exam: Thursday 8 October 2026, 16:00, Bar-Ilan IMBA, Prof. Yuval Heller.

This document records two full passes over all 14 day pages plus the hub, both run on 14 September
2026: a correctness verification, then a simple-English rewrite. It is a photograph of what
was found and changed on that date, not a living plan.

## Why this pass happened

The handover prompt dated 14 September 2026 said Day 7 and Day 10 were empty shells with "zero
option buttons and zero question blocks", and asked for 28 questions to be built.

**That was wrong, and the reason is worth keeping.** Days 3 and 12 write their questions straight
into the HTML. Days 7 and 10 build theirs in JavaScript at the bottom of the file. A text search
of the HTML source finds no question markup on those two pages and reports them as empty. Opening
them in a browser shows 14 questions with five options each, working correctly.

**The lesson: never verify a page by searching its source. Render it and count what a learner
sees.** The same check run in Chromium would have shown the pages were finished.

So the job changed from building 28 questions to verifying the 56 mock answers and the rest of
the site. Fourteen agents ran, one per day page, each re-solving every game in Python against the
course material.

## Headline result

**Not one answer key on the site was wrong.** All 56 mock answers and all 60 learn-day quiz
answers were already correct, confirmed by re-solving every game in code.

**The defects were somewhere else: seven of the ten learn days leaked a past paper she has not
yet sat.**

## The reserve-papers rule, and how it broke

Four past papers are sat as timed mocks, so a learn day that quotes one spoils it:

| Paper | Sat as a mock on |
|---|---|
| Practice exam | Day 3 |
| 2024 A | Day 7 |
| 2025 B | Day 10 |
| 2025 C | Day 12 |

Two papers are held in reserve and never sat: **2024 B** and **2025 A**. Only those two may be
quoted on a learn day.

The rule was written after the first build put 18 real exam questions into both a learn day and a
mock. This pass found the rule broken again, in a form the earlier fix did not cover: not whole
questions copied across, but **prose, warning boxes and explanations naming a paper and giving
away its answer, its option list or its question number.**

| Day | What leaked | Which mock it spoiled |
|---|---|---|
| 1 | A warning box named 2024 A question 6, quoted its solution, and printed its answer (21) and full option list | Day 7 |
| 1 | Two passages named which question number carries the tree on each paper and which player it asks for | Days 7, 10, 12 |
| 2 | A box quoted the 2025 C solution and its answers on battle of the sexes and chicken | Day 12 |
| 2 | A box quoted a 2025 B question stem almost word for word, plus a 2025 C answer | Days 10, 12 |
| 2 | A "try it" problem was 2024 A question 14 reproduced with its official answer | Day 7 |
| 4 | Section 4 named three sittings, reproduced two of their grids, worked one to its answer, and printed two more answers | Days 7, 10, 12 |
| 8 | A box said tit-for-tat "appears as an option in two of the five past finals (2024 A and 2024 B)", eliminating one of Day 7's options | Day 7 |
| 11 | A worked example was 2025 C's own grid, quoting its published mixtures, both published answers and one printed option | Day 12 |
| 11 | A "try it" reproduced a mock's question, option list and answer | a mock |
| 11 | Three paper-name mentions, a rounding table naming four mocks, and a box quoting two published answers | all four |

All of these are now closed. Every teaching point survived: the numbers stayed, the attributions
went, and where a whole item had to be replaced it was rebuilt as a fresh problem carrying the
same lesson and verified in code.

**Day 11 was the worst affected**, which makes sense: it teaches the coupled zero-sum pair that
ends every paper, so quoting a real paper was the most tempting thing to do there.

## Content errors found and fixed

| Day | What was wrong | Why it mattered |
|---|---|---|
| 6 | The Vizzini goblets matrix was inverted in both of its forms. The page paid Vizzini −1 for drinking the *safe* goblet | Presentation 5 slide 7 gives that cell as +1. The page's own sentence two lines above already contradicted its table. It is the first matrix on the page, and it taught that surviving loses |
| 6 | A warning box said "58 against 93 when the goalie guesses right". Those two numbers are the goalie-dives-Left column | Neither reading of "right" matched the numbers |
| 4 | A box taught that on printed grids "player 2's number sits on top, player 1's underneath" | Contradicted by the papers themselves. 2024 B question 6 states "Player 1's payoff are the upper numbers (written in red)", and 2024 B question 11 prints player 1 first. The reversal is a property of how the PDF text layer flattens, not of what is printed. Teaching it as a reading rule could make her invert a correct grid in the exam room |
| 13 | "7 is the biggest number in the tree" was false. The biggest is 8 | Small, but it sits in a reveal on the revision lap |
| 11 | The 2/3-average trap was blamed on order of operations | Tested in code: with equal groups both orders give the same number, because 2/3 is linear. The real mistake is dropping a group |
| 11 | Quiz 4 called (Down, Right) "the other crossed pair" when it is a matching cell | On the page whose first half rests on that distinction |
| 9 | Cortés burning his ships (1519) was missing from the burning-bridges device | Presentation 6 slide 8 lists him. The exam gives a story and asks which device it is |
| 9 | The lede said commitment is "about 6% of the paper" | Counted across the three 2025 papers: 1, 2 and 1 questions out of 14. The floor is higher than 6% |
| 9 | A quiz explanation said "the drug company" where the stem says "the wholesaler" | Makes the explanation unfollowable |
| 5 | "Most answers cluster somewhere in the teens" for the 2/3 game, unsourced, and contradicting the page's own next paragraph | Behavioural 2/3 facts are 14% of the paper, so a memorised wrong figure costs a real mark |
| 7 | Question 9 carried a green "real exam" tag, but the solution pins only two of its four cells | Breaks the honesty rule. Now labelled honestly |
| 7 | Question 11's explanation named the 2025 C paper and gave away its answer of 7 | Spoils one of the 14 questions on the Day 12 mock |
| 7 | An explanation said 0.44 "is 4/9, the square of one third" | 4/9 is not one third squared |
| 3 | Question 3 has two correct answers and the marking code accepted both, but the results panel said nothing | She would have wondered why |
| 1 | A distractor explanation described a calculation reaching 12 that actually reaches 11 | A distractor rationale that does not reproduce the distractor teaches nothing |
| 8 | "Their round counts, payoffs and opponent rules appear nowhere above" was untrue | Two quiz items reuse scenarios from the page |

## What was checked and found correct

- **All 56 mock answers** across Days 3, 7, 10 and 12, each re-solved in Python and matched to the
  professor's published solution.
- **All 60 learn-day quiz answers**, plus every worked example and every "try it" reveal.
- **The cell-order rule.** In an extracted grid the second number is player 1's. Confirmed
  independently on three papers. On 2024 A it is the only reading under which the professor's own
  prose quotes the right profile; on 2025 C it is the only reading that reproduces the published
  answer.
- **The Day 12 question 4 accusation.** The page tells her the circulated solution is wrong there.
  It is right to: (Up, Center) is not an equilibrium under either reading of the grid, the true
  cell is (Middle, Center) holding (5, 4), and only the final answer of 4 survives, by accident.
- **The three unknown leaves on Day 10's redrawn tree.** Solved with all three as free variables
  and swept widely: the backward-induction outcome is (23, 15) for every possible value. The
  page's claim that the question is still solvable without them is true.
- **Every repeated-game best reply on Day 8**, brute-forced over the full strategy space using the
  payoff matrix printed on the page, not the textbook one. Both off-by-one claims hold.
- **Every elimination chain on Day 5**, re-run under strict domination at each step, with every
  legal order enumerated. All end at (40, 40).
- **All twelve behavioural figures on Day 13**, matched word for word to the presentations.
- **The eight credibility devices**, in the professor's order, in all three places they appear.
- **Mock behaviour**, driven live in a browser: 90:00 timer with Start and Pause, nothing revealed
  while the clock runs, Submit plus a real auto-submit at zero, results with score, percent and
  missed list, and no invented pass mark on any page.
- **Em dashes**: zero in visible text across all 15 pages. The ones in the source sit inside the
  audio-script comments, where they belong, because they are speech.

## Second pass, the same day: simple English across all 15 pages

Ifat asked for this directly: *"the English apart from terminology should be written for non native
English speakers. This is critical to help simplify the learnings."* Her cohort is international,
and she shares this site with her classmates.

Fifteen agents ran, one per page. Every page was edited except none: all fifteen needed work.

**The safety rule that made this possible.** A rewording pass can silently destroy an answer key. So
before any agent started, a fingerprint was taken of every number, option, table cell, SVG label and
answer key on all fifteen pages, and each agent had to prove its page still matched before
reporting. Afterwards the whole site was checked again with a stricter version that forces every
hidden explanation open, because most of a mock page's arithmetic lives inside explanations that are
`display:none` until submit.

**Result: no data changed anywhere.** Every money amount, percentage, total, decimal, payoff, matrix
cell, tree label and answer key on all fifteen pages is identical to before. The only number counts
that moved were prose rewording and three correct restatements of already-verified answers.

### What was frozen, and why

On the four mock pages the **question stems and all 280 options are the professor's own words** and
were not touched. Ifat has to meet the paper's real wording cold, because that is what she meets on
8 October. One stem even carries a contradiction the professor never fixed; it stays, and the page
explains it. The same freeze applied to the handful of learn-day quiz items reproduced from the two
reserve papers.

Everything else was in scope: teaching prose, rule boxes, worked-example narration, all 42 mock
explanations, warning boxes, takeaway bullets, results-panel text, captions and headings.

### What changed most

- **Roughly 900 sentences rewritten into shorter ones** across the site. The longest sentence on
  almost every page came down; on Day 8 from 34 words to 26, on Day 3 and Day 7 from the low
  thirties to the mid twenties.
- **About 90 course terms now carry a plain explanation on first use** that did not have one. Whole
  pages were using *best reply*, *mixed strategy*, *expected payoff*, *dominant strategy* and
  *the value of the game* without ever defining them. Day 2 used "best reply" eight times, undefined.
- **Conditional sentences were turned into direct ones.** This mattered most on Day 8, where the
  whole lesson is an off-by-one counting trap stated in "if… then…" form, which is the hardest
  grammar for a second-language reader. "What she does in round 7 is fixed, so it does not depend on
  your round-6 move" became "Her move in round 7 is already fixed. Your round-6 move cannot change
  it."
- **The eight credibility devices on Day 9 were rewritten**, after the freeze on table cells was
  narrowed to allow prose inside them. Each description now opens with one short sentence saying
  what the person actually does, before any example. That sentence is what she matches an exam story
  against, and it did not exist before.
- **Cultural context was added where an example assumed it.** President versus Congress now says
  what Congress is and what a veto is. The 1984 Orange Bowl now gives the rule that makes the
  example mean anything. Mail order is "customers buy from a printed catalogue". *300* and *A
  Beautiful Mind* are labelled as films. The cold war gets one plain sentence. No example was
  removed.
- **Two real comprehension bugs were found and fixed**, both on Day 9: two quiz explanations said
  "the first option", but the quiz shuffles its options on every page load, so the pointer was
  wrong most of the time.
- **Day 14, read an hour before the exam, had an ellipsis that reversed its own advice.** "An empty
  box scores zero for certain. A guess never does." A second-language reader can parse the second
  sentence as "a guess never scores zero", which is the opposite of the instruction. It now reads
  "An empty box always scores zero. A guess can still be right, so never leave a box empty." The
  same page no longer names or predicts panic.

## The hub was showing two thirds of the course as unavailable

Found while checking the hub's English, and it is the most user-visible problem the whole session
uncovered.

`index.html` linked only **five of the fourteen days**. Days 3 and 7 to 14 were rendered as greyed
cards marked **"coming"**, left over from when the site was being built. Every one of those files
exists, and every one had just been verified correct.

So for however long that has been true, Ifat and any classmate opening the hub saw a two-thirds
empty course, with all four mock exams among the missing. All nine are now live links marked
"ready", and the hub's own "coming" styling is gone.

**The hub also contradicted itself on the exam format.** Its summary box said **15 multiple-choice
questions** while its own note two lines below said the real papers had 14. Presentation 6 is where
the 15 comes from, and it is wrong: every real paper has 14. The box now says 14, and the note
explains the discrepancy so nobody re-introduces it.

## Open items

1. **The "13 to 19" lab range for the 2/3-average game** appears on Days 11 and 13 and neither
   Presentation 1 nor Presentation 4 states it in text. Presentation 4 shows the lab distribution
   only as a graph image. It is corroborated by a past solution document. Day 11's quiz 3 depends
   on it. Left in place and flagged rather than corrected from memory.
2. **Day 14's tone.** Three sentences were flagged, not changed, because that page is read an hour
   before the exam: one ranks how expensive a mistake is, one introduces the word "panic", and one
   ("a guess never does") can be misread by a second-language reader as "a guess never scores
   zero".
3. **A site-wide analytics bug.** The activity-tracking block at the bottom of every page reads an
   element called `resScore`, but the mock pages call theirs `rScore`. The "mock submitted" event
   fires with an empty score. It changes nothing a learner sees. It sits in a block common to all
   15 pages, so it should be fixed once across the site, not on one page.
4. **Day 6's quiz 6** repeats the section 3 "try it" task with fresh numbers. No rule is broken,
   but it may over-report how well the pure-equilibrium skill has been learned.
5. **The `scripts` folder** still has not been uploaded to GitHub. The site does not need it and
   nothing links to it.
6. **One sentence on Day 14 is a tone call, not an English one**, so it was left for Ifat. Trap 6
   says "Multiplying the matched pair instead is the most expensive slip on the paper." It is short
   and clear. The question is only whether ranking a mistake as the worst on the paper is what she
   wants to read an hour before sitting it. The report for that page offers a same-meaning
   alternative without the ranking, unapplied.
7. **Two audio strips now say something slightly different from their page.** Day 6's
   `Day-06-pure.mp3` says "not merely weaker" where the page now says "really bad", and Day 5's
   intro carries one high-register word the page no longer uses. No script file was edited, so no
   mp3 is stale in the sense of being wrong. These are one-word re-records, worth doing only if the
   audio is ever rebuilt for another reason.
8. **GitHub is now well behind the folder.** All fifteen pages changed today. The repository is the
   version classmates would see if the site is shared from there.

## Method note, worth keeping for the next course

Fourteen agents ran with one brief each. Each owned exactly one file, read only its own source
material, was told what not to change, and was given an explicit licence to say "I could not
verify this". Several used it, which is the sign it worked. Every agent re-solved its games in
code rather than trusting the page's own explanation as evidence.

The single most productive instruction was naming the known weak spot in each brief without
naming the answer. Agents given a specific thing to distrust returned the sharpest work.

## Delivery was verified on the Drive copies, not on the working copies

The lesson of this whole session is that a check must look at the real thing. So the final pass did
not trust what was sent. All fifteen pages were read back off the Drive and checked there.

- **Byte-for-byte identical** to what was built. Fifteen of fifteen, no transfer corruption.
- **All fourteen hub links resolve** to files that exist in that folder.
- **All four mocks driven end to end on the Drive copies**: the clock runs, choices are recorded,
  nothing is revealed while the clock runs, submit works, and the results panel gives a score out of
  14, a percent and the missed list, with no invented pass mark.
- **No learn day names a paper she has not sat.** No answer is visible on page load anywhere. No em
  dash in any visible text. No JavaScript errors.
- **Every option, table number, SVG label and answer key is identical to the pre-English state**, so
  the rewrite did not touch a single verified answer.

**Every number that changed across the whole session was then listed and named**, and each one maps
to a fix recorded above: the removed paper names on Days 1, 2, 4, 7, 8 and 11; the replaced "try it"
on Day 2; the Cortés date added to Day 9 and the wrong "6%" removed; the three restatements on Day
10; and the replaced worked example on Day 11. Nothing changed that cannot be explained.

**Day 11's replacement grid was re-derived independently**, because an agent built it from scratch
on the page that carries the most arithmetic risk. The grid is 0, 36 / 12, 0 as a zero-sum game.
Solved in exact fractions: q = P(Left) = 3/4, p = P(Top) = 1/4, and the value is 9 computed from
both rows, which agree. P(Down, Left) = 3/4 x 3/4 = 9/16 = 56%, which is the page's answer. The
memorised shortcut, crossed over, gives 1/4 x 3/4 = 3/16 = 19%, which is the page's distractor. All
five figures confirmed.

## Audit trail

- **14 September 2026, first pass.** Full verification. 14 agents, one per day page. No answer key
  was wrong. Ten reserve-paper leaks closed across Days 1, 2, 4, 8 and 11. Sixteen content errors
  fixed. Eleven files changed: Days 1, 2, 3, 4, 5, 6, 7, 8, 9, 11 and 13. Days 10, 12, 14 and the
  hub needed no change at that point.
- **14 September 2026, second pass.** Simple English across all 15 pages, at Ifat's request, because
  her cohort reads English as a second language. 15 agents, one per page. About 900 sentences
  shortened and about 90 course terms given a plain explanation on first use. No number, option,
  matrix cell, tree label or answer key changed anywhere, proved by a fingerprint taken before the
  pass and re-checked afterwards with hidden explanations forced open. Mock question stems and all
  280 options were frozen throughout. All 15 files changed.
- **14 September 2026, the hub.** `index.html` was found linking only 5 of 14 days, with the other 9
  greyed out as "coming" although every file existed and had just been verified. All 14 are now
  live. The hub's exam-format box said 15 questions where every real paper has 14; corrected, with a
  note explaining where the 15 comes from so it does not return.
- **15 September 2026, delivery check.** All fifteen pages read back off the Drive and verified
  there rather than in the working copy: byte-identical, all 14 hub links resolving, all four mocks
  driven end to end, no leaks, no visible answers on load, no em dashes, no errors. Every number
  that changed across the session was enumerated and matched to a recorded fix. Day 11's
  replacement grid was re-derived independently in exact fractions and all five of its figures
  confirmed. Nothing was changed at this step.
- **Why the freeze on table cells was narrowed.** The first version of the English brief froze every
  table cell, to protect payoff matrices. Two agents pushed back with the same finding: on Days 8
  and 9 the most language-dependent content on the site, including all eight credibility-device
  descriptions, lives inside table cells. The rule was narrowed the same day: a cell that is a
  sentence may be rewritten, a cell that is data may not, and a separate check enforces that every
  number inside every cell survives. Both pages were then redone.
