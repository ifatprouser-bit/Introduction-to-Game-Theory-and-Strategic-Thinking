# Day 04 — Pure Nash I: underline and count

## Verdict
FIXED (9 changes). No answer key was wrong. Every fix was a reserve-paper spoiler or an audio/page gap.

## Question table

Every matrix on the page was re-solved by one Python best-reply solver, then re-solved a
second time straight from the rendered DOM after my edits, to prove no number moved.

| Q | Topic | Page says | I computed | Official solution says | Match | Action |
|---|---|---|---|---|---|---|
| Sec 1 worked ex. | Ice-cream 2×2, is each diagonal cell a NE? | (Normal,Normal) no; (Cut,Cut) yes | 1 NE: (Cut,Cut) = (5,5) | n/a (fresh) | ✓ | none |
| Sec 1 try-it | Farms 2×2, is "best for both" always a NE? | Yes here; 2 NE | 2 NE: (Share,Share)=(7,7), (Alone,Alone)=(3,3) | n/a (fresh) | ✓ | none |
| Sec 2 marked grid | Food trucks 3×3, which cells get which underline | P1 marks (Stage,Gate),(Lake,Stage),(Gate,Lake); P2 marks (Gate,Lake),(Stage,Stage),(Lake,Stage) | identical | n/a (fresh) | ✓ | none |
| Sec 2 worked ex. | Food trucks 3×3, find all NE | 2 NE: (Gate,Lake)=(6,7), (Lake,Stage)=(8,9) | identical | n/a (fresh) | ✓ | none |
| Sec 2 try-it | 3×3 Up/Middle/Down | 1 NE: (Down,Right)=(8,7) | identical; near-misses (Middle,Left),(Up,Center) confirmed | n/a (fresh) | ✓ | none |
| Sec 3 marked grid | 4×4 A–D / W–Z, all 8 marks | solid (C,W)(C,X)(B,Y)(D,Z); dotted (A,Y)(B,Y)(C,W)(D,X) | identical | n/a (fresh) | ✓ | none |
| Sec 3 worked ex. | 4×4: (a) count (b) highest P1 payoff in a NE | (a) 2 (b) 6 | 2 NE: (B,Y)=(6,7), (C,W)=(3,8); max P1 in NE = 6 | n/a (fresh) | ✓ | none |
| Sec 3 try-it | Same 4×4, highest P2 payoff in a NE | 8 | max P2 in NE = 8 | n/a (fresh) | ✓ | none |
| Sec 4 arrangement one | 3×3 shuffled | 1 NE: (Middle,Right)=(5,4) | identical | n/a (permutation) | ✓ | de-identified (was tagged "June 2025 sitting" = 2025 B) |
| Sec 4 arrangement two | 3×3 shuffled, worked example, P2's payoff | 1 NE: (Middle,Center); P2 = 4 | identical | n/a (permutation) | ✓ | de-identified (was tagged "August 2025 sitting" = 2025 C) |
| Sec 4 try-it | 3×3, P2's payoff in the unique NE | 4, at (Down,Right) | 1 NE: (Down,Right)=(5,4); P2 = 4 | **2025 A Q6: "(down, Right) … payoff profile (5,4) … player 2 is 4", answer a. 4** | ✓ | attribution clarified (2025 A is reserve, so naming it is allowed) |
| Quiz 1 | Concept: what has P1 found? | "Her best reply to Left" | correct by definition; no matrix | n/a (fresh) | ✓ | none |
| Quiz 2 | Count NE, 4×4 with a tie in column b1 | 3: (a1,b3),(a2,b1),(a4,b1) | identical; tie in b1 gives both a2 and a4 | n/a (fresh) | ✓ | none |
| Quiz 3 | Count NE, 3×3 with none | 0 | 0; P1 and P2 marks share no cell | n/a (fresh) | ✓ | none |
| Quiz 4 | Highest P2 payoff in a NE | 6, at (Up,Center) | 2 NE: (Up,Center)=(5,6), (Middle,Left)=(5,3); max P2 = 6 | n/a (fresh) | ✓ | none |
| Quiz 5 | Highest P1 payoff in a NE | 7, at (Down,Center) | 2 NE: (Middle,Right)=(5,9), (Down,Center)=(7,7); max P1 = 7 | n/a (fresh) | ✓ | none |
| Quiz 6 | Which profile is a NE? (tagged 2024 B final) | (Middle,Center) = (3,3) | 1 NE: (Middle,Center)=(3,3); P1 marks (Down,Left),(Middle,Center),(Middle,Right); P2 marks (Up,Right),(Middle,Center),(Down,Right) | **2024 B Q2: "Down best reply against Left, Middle against Center and Right; Center best against Middle, Right best against Up and Down … the only profile in which both payoffs were underlined is (Middle, Center)", answer a. (Middle, Center)** | ✓ exact, mark for mark | none |

**The one tagged item is legitimate.** Quiz 6's grid is restated as text in the 2024 B solution
document. Read under the cell-order rule (second number = player 1) it gives exactly the page's
matrix, and my solver reproduces the professor's underline list cell for cell and his published
answer. 2024 B is a reserve paper (Moed Bet, 8 August 2024), so tagging it on a learn day is allowed.

## Changes I made

**The big one: this page was spoiling three of the four timed mocks.** I established the
paper-to-date mapping from the PDF headers:

| Paper | Header date | Used as |
|---|---|---|
| 2024 A | June 30, 2024 | **Mock 2, Day 7** |
| 2024 B | August 8, 2024 (Moed Bet) | reserve |
| 2025 A | May 22, 2025 | reserve |
| 2025 B | June 26, 2025 (Mo'ed B) | **Mock 3, Day 10** |
| 2025 C | August 2025 (by elimination) | **Mock 4, Day 12** |

Section 4 named the "June 2025", "August 2025" and "June 2024" sittings, reproduced their grids,
worked one of them through to its answer, and printed two more answers in a warning box. That is
2025 B, 2025 C and 2024 A: three papers Ifat sits cold on Days 7, 10 and 12.

The nine payoff pairs themselves are **not** a spoiler and I kept them. I verified in code that all
three arrangements are row/column permutations of one grid, and that grid is 2025 A question 6,
a reserve paper the site is allowed to quote. What had to go was the identification of the other
sittings and their published answers.

1. **Section 4 opening paragraph.** Old: *"One particular three-by-three has now appeared on three
   sittings in a row: May 2025, June 2025 and August 2025."* New: *"One particular three-by-three
   keeps coming back on the past papers. … Here are two shuffled arrangements of it. The real exam
   version is the try-it at the end of this section."* Removes two spoiled paper names; keeps the
   teaching point the audio makes ("the same grid comes back, rows shuffled or columns swapped").

2. **Heading "Arrangement one · June 2025 sitting"** → **"Arrangement one"**. 2025 B is Mock 3.

3. **Arrangement one caption.** Old: *"The question that sitting asked for player 1's payoff → 5."*
   New: *"Ask for player 1's payoff here and the answer is 5."* Keeps the number on the page as a
   worked result; stops it being the answer key to a question she has not sat yet.

4. **Heading "Arrangement two · August 2025 sitting, Centre and Right columns swapped"** →
   **"Arrangement two · Center and Right columns swapped"**. 2025 C is Mock 4. ("Centre" also
   became "Center" to match the column header in the table directly beneath it.)

5. **Arrangement two caption.** Old: *"And this time the question asked for player 2's payoff → 4."*
   New: *"And a question on this arrangement can ask for player 2's payoff instead, which is 4."*
   Same reason. Preserves the audio's point that the question rotates between players.

6. **The source note.** Old: *"Both grids are reproduced from the text layer of the exam PDFs and
   re-solved in code; every mark above was checked against the published answer."* That was not
   accurate: only one of the three grids can be checked against a published answer here. New: *"The
   nine payoff pairs come from a real past final. That paper is one of the two held in reserve, so
   it is never a timed mock on this site, and the try-it at the end of this section is the real
   question. The two grids above are the same game with its rows or columns shuffled. All three
   were re-solved in code, and the real one matches the published answer."*

7. **The "Rowana" warning box.** Old: *"The sentence 'What is the highest payoff that Rowana
   (player 1, the row player) can obtain in a pure Nash equilibrium?' appears word for word in the
   June 2024 paper and again in the August 2025 paper. The correct answers are different, 1 in one
   paper and 7 in the other."* That named 2024 A and 2025 C and handed her two mock answers. New:
   *"A question like 'What is the highest payoff that player 1 (the row player) can obtain in a pure
   Nash equilibrium?' comes back on paper after paper, word for word. The correct answer is
   different each time, because the matrix underneath is a different matrix. So recognising a
   question tells you nothing about its answer."* The teaching point survives intact, and it has to,
   because the section-4 audio script states it and I may not edit scripts.

8. **The "don't trust a published solution's labels" warning box — replaced, and this one was also
   teaching something I believe is wrong.** It named the 2025 C solution (Mock 4), quoted its
   answer, and then generalised: *"In the printed grid the two payoffs are stacked … and player 2's
   number sits on top, player 1's underneath."* That generalisation is contradicted by the source
   material I can read. 2024 B question 6 states outright *"Player 1's payoffs are the upper numbers
   (written in red)"*, and 2025 A question 11 prints its cells inline as "5,1" with player 1 first.
   The reversal in the brief's cell-order rule is a property of how the PDF **text layer flattens**,
   not a rule about which number is printed on top. Teaching "top is always player 2" could make her
   invert a correct reading in the exam room. New box keeps the real and verifiable lesson: on the
   paper the payoffs are often stacked, the grid alone does not tell you whose is whose, the wrong
   half is always on the option list, so **find the sentence in the question that says which number
   is player 1's before you mark anything**. That sentence does appear on the real papers, which is
   evidenced by the two stems quoted above.

9. **Section 4 try-it and its reveal.** *"Here is the third arrangement of the same game, from the
   May 2025 sitting"* → *"Here is the real exam version of the same game, from the May 2025 final.
   That paper is held in reserve, so you never sit it as a timed mock."* 2025 A may be named, and
   saying so is useful to her. In the reveal, *"Three sittings, three different cell names"* →
   *"Three arrangements, three different cell names"*, since two of the three are no longer
   presented as sittings.

**One further change, unrelated to the papers — an audio/page gap.**

10. **Section 2 gained a paragraph on ties.** The section-2 audio script says: *"What if a column
    has a tie at the top? … Then underline both. A tie means the row player is happy either way, so
    both stay in the running."* That point appeared nowhere in the visible page text. It was only
    inside quiz 2's explanation, which stays hidden until she answers. This matters more than usual
    on this page: quiz 2's correct count of 3 depends entirely on the tie in column b1, so a learner
    who listened but never clicked had the rule spoken at her and never shown. Added after the
    "look for cells where both numbers are underlined" paragraph: *"One extra case: a tie. If two
    rows hold the same biggest number in a column, underline both. … Marking only one of a tied pair
    is the quiet way to lose an equilibrium."*

**No number, payoff, matrix, answer key, option list or correct-answer index was changed anywhere
on this page.** I re-parsed all 14 rendered tables from the DOM after editing and re-solved them;
every equilibrium set, count and payoff is identical to the pre-edit run.

## Could not verify

- **That the three section-4 arrangements really were three consecutive sittings.** I confirmed the
  try-it grid is 2025 A question 6 exactly, and I confirmed in code that arrangements one and two
  are row/column permutations of it. I did not open 2025 B or 2025 C to confirm they carry the same
  permuted grid, because doing so is the spoiler this check exists to prevent. The page no longer
  claims it, so nothing rests on it.
- **The claim that one question's wording repeats across papers with different answers** (change 7).
  The section-4 audio script asserts it, so the page must carry it, but confirming it needs 2024 A
  and 2025 C. I kept it in the general form the script uses, with no paper named and no answer given.
- **Whether "Rowana" is the real name used on the paper.** Removed rather than checked, for the same
  reason. Nothing on the page depends on it now.
- **2025 C's exact header date.** Established as August 2025 by elimination (2025 A = 22 May,
  2025 B = 26 June, and the build spec calls 2025 C the most recent paper) rather than by reading
  the file. This only affected which label I removed, and all three labels were removed anyway.

## Suggestions I did NOT act on

- **Quiz 2's tie is the only tie on the page, and it is the hinge of that question.** Now that
  section 2 explains ties in prose, a try-it with a tie in it would let her practise the rule before
  the quiz tests it. Adding a try-it is a structural change, so I left it.
- **Section 4's arrangements are still labelled "one" and "two" with no stated origin for the
  shuffle.** A learner may wonder who shuffled them. One clause saying "shuffled here for practice"
  would close that, but the source note two lines below already says it, and "state it once" argues
  against repeating it.
- **The lede's "27% of the marks, about 3.8 questions per paper"** comes from the build spec's
  weighting table. I did not re-derive it from the papers; it is outside this page's arithmetic.

## Summary (five lines, for the synthesis)
- Questions checked: 17 (6 quiz items, 4 worked examples, 4 try-its, 3 marked-grid demonstrations), every one re-solved in Python and again from the rendered DOM.
- Answers wrong before I started: 0. Every stated equilibrium, count, profile, payoff and underline mark was correct, including all 8 marks on the 4×4 and the tie handling in quiz 2.
- Other changes: 10. Nine strip three spoiled mock papers (2024 A, 2025 B, 2025 C) out of section 4's prose, headings, captions, source note and two warning boxes, one of which also taught a payoff-ordering rule contradicted by the source PDFs; the tenth adds the tie rule to the visible page so it matches the audio.
- Unverifiable: the "same wording, different answer across papers" claim the audio makes, and whether the two shuffled grids are genuinely the 2025 B and 2025 C versions. Both need papers a learn day must not open. Neither is now asserted on the page.
- Biggest risk left on this page: none in the arithmetic. The residual is that section 4 still shows a real reserve-paper grid (2025 A Q6) in three arrangements, so if that same game reappears on Ifat's own exam she will recognise it. That is the intended benefit, not a defect, but it means the page's own warning to re-solve rather than recall is the most important line on it.
