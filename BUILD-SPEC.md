# Build spec — Game Theory 14-day study site

Read this in full before building. `Day-06.html` in this folder is the reference implementation — copy its `<style>` block verbatim and match its structure.

Course: Introduction to Game Theory and Strategic Thinking, Bar Ilan IMBA, Prof. Yuval Heller.
Learner: Ifat — MBA student, English is her second language. Simple English, one idea at a time, metaphors over jargon, always one concrete example rather than abstract theory.

---

## 1. The exam (verified from all five past papers)

- **14 multiple-choice questions**, five options (a–e) each. 90 minutes → 6.4 min per question.
- Closed book. **Calculator allowed. No formula sheet** — never put one on a page.
- 7 points per question + 2 free = 100. No stated penalty for a wrong answer.
- Exam: Thursday 8 October 2026, 16:00. Mo'ed B: 8 November.
- Presentation 6 says 15 questions; every real paper has 14.
- Each paper exists "scrambled" (random correct answer) and "code zero" (answer always **a**).

### Topic weighting across all five papers (70 questions)

| Topic | Presentation | Share |
|---|---|---|
| Pure Nash equilibrium — find, count, classify | P4 | 27% |
| Mixed strategies / zero-sum | P5 | 21% |
| 2/3-average contest + behavioural facts | P1, P4 | 14% |
| Dominance & Prisoner's Dilemma | P3 | 13% |
| Sequential games / backward induction | P2 | 11% |
| Repeated games | P3 | 7% (exactly one, every exam) |
| Credibility / commitment | P6 | 6% (none in 2024 papers) |

---

## 2. THE HONESTY RULE — read this twice

**In every past paper the payoff matrices are embedded images. The PDF text layer contains the question stem and the a–e options but NOT the grid numbers.**

You may tag a quiz question `"src": "2025 B final"` (or similar) **only** when:

- **The matrix is restated as text in the solution document.** Verified true for **2025 B** only.
- **or the question has no matrix at all** — concept and recall questions. These are safe and there are many.

For everything else the numbers can only be reconstructed from the solution's algebra. **Reconstructions must be presented as your own practice questions with no `src` tag.** Never label a reconstruction as a real exam question.

If you cannot recover a matrix, do not invent one and do not guess. Build a fresh question instead.

**Verify every number in code before it goes on a page.** Run a script, print the result, check it. A study page with a wrong answer is worse than no page.

---

## 3. Page structure (Learn day)

Copy `Day-06.html` and follow it exactly:

1. `<a class="home" href="index.html">← All 14 days</a>`
2. `<div class="crumb">Day N of 14 · Learn</div>`
3. `<h1>` topic title, `<p class="lede">` one line saying why this day matters (name the exam share).
4. **Pretest** — `.preq` box, `⏸ Before you listen — guess first`. A concrete guess pointed at the day's key idea. Ends `Take 20 seconds, then press play.`
5. **Intro panel** — `🎧 Start here — today's plan` + `<audio controls preload="none" src="Day-NN-intro.mp3">` + a `.takeaway` box: one bullet per key term, then one `.tk-gen` synthesis line.
6. **One concept panel per idea** (2–4 panels), each in this order:
   - `<h3>` heading that names what it teaches
   - `.secaudio` strip with its own mp3
   - teaching prose (`.p`)
   - a `.rule` box — the key decision in one line
   - **a visual** — inline `<svg>` for anything with a shape or a crossing; a `.dtable` for a payoff matrix or game data. Every panel needs one.
   - **worked example** — `.partlab` "Worked example" → `.question` (full, self-contained) → numbered `.step` blocks, one step each → `.ans`
   - 1–2 `.tryq` reveal problems
7. **Quiz** — `📝 Quiz yourself` panel, 5–6 questions, rendered by the JS at the bottom of Day-06.html. Copy that script.
8. **Nav row** — back / next.

### Presentation tags
Put the day's tags right under the `h1` and on each concept panel where a different lecture is in play. Chip classes `.p .P1` … `.p .P6` — copy the CSS from the hub, `index.html`. Ifat asked for these explicitly: without them a learner cannot tell whether the course is fully covered and starts to feel they have missed something.

### Quiz behaviour — non-negotiable
Answers reveal **only after the learner clicks an option**. Never on load. The Day-06 script already does this: click → correct turns green, wrong turns red, explanation opens, score chip updates. Keep the `shuffleItem` pass so the correct answer is not always in the same slot.

### Never quiz the example you just taught
Teach with one scenario, quiz with a different one. If the learner could pass the quiz by remembering the page, the quiz measures nothing.

### Give only the raw scenario
A question stem must never pre-state the conclusion the learner should derive. Do not write "In this prisoner's dilemma…" — give the matrix and let them classify it.

---

## 4. Audio

**Casting: Kokoro Heart (NOA, teacher) and Fenrir (TOM, curious learner)** via a local Voicebox MCP server. This replaced en-US-AriaNeural / en-US-AndrewNeural on 28 August 2026. Do not use the old voices.

**You write the scripts. You do NOT generate mp3s** — the server is not reachable from this session yet. Audio is generated in one pass later.

### Script files
One file per strip, at `scripts/Day-NN-<slug>-script.txt`:

```
Title: Day 6 — Mixed Strategies I — the indifference method
Voices: NOA = Heart, TOM = Fenrir
Output: Day-06-indifference.mp3

NOA: ...
TOM: ...
```

A header block above the first blank line is ignored by the parser. Keep that shape.

### Script rules
- **One strip per concept box**, plus one intro strip. Not one strip per page.
- **The strip's label names what it teaches, never the medium.** "Listen to this section" is the visible label; the *filename slug* names the content.
- **A genuine two-host conversation.** NOA teaches; TOM affirms in his own words with a *fresh* example, or states the implication, or gives a metaphor. Never two alternating monologues. Sometimes let TOM complete the idea.
- **No numbers.** Name relationships in words. This is a hard rule with a practical reason: a strip that speaks an example's numbers is welded to that example, and silently goes stale the day the example is edited. All arithmetic lives on the page.
- **Point the eye at the on-screen visual** — "look at the two lines on the page", "the highlighted cell". That is teaching, not meta-talk.
- **No format meta-talk.** No "in this section", no "scroll down", no "as the page says".
- TTS-ready: plain sentences, no markdown, no emoji, no stage directions. Spell unavoidable numbers as words.
- Intro strip ~45–70s. Section strips ~60–120s.

### Embed the script in the page
Directly above each `<audio>` element, put the full script in an HTML comment:

```html
<!-- SCRIPT Day-06-indifference.mp3 | NOA=Heart TOM=Fenrir
NOA: ...
TOM: ...
-->
```

Ifat asked for this: the script that produced the audio should live in the page's code, so the two never drift apart.

---

## 5. What each day covers

| Day | Title | Tags | Content |
|---|---|---|---|
| 1 | Exam map + backward induction | P1 P2 | Reading a game tree, solving from the last node. Traps: every wrong option is a number that appears in the tree; a tree that *looks* like a centipede may not be; check which player is asked. Examples: Fredo & Charlie, President vs Congress and the line-item veto, 21 flags (leave a multiple of 4), ultimatum, centipede, the 1984 Orange Bowl. |
| 2 | Name that game | P3 P4 | The five archetypes side by side: prisoner's dilemma, stag hunt, battle of the sexes, chicken, matching pennies. PD test = each player has a dominant strategy AND the result is worse for both than another cell. Stag hunt = two equilibria, one better *for both*; BoS and chicken = two equilibria, each player prefers a *different* one; matching pennies = no pure equilibrium. Examples: the two prisoners, two mail-order clothes firms ($80 vs $70), Golden Balls, Rousseau's stag hunt, *300* vs *A Beautiful Mind*, the single-lane bridge. |
| 4 | Pure Nash I — underline and count | P4 | The mechanical routine: underline P1's best reply in every column, P2's in every row; both underlined = pure NE. Practise on 3×3 and 4×4. Counting questions offer 0–4 so one missed cell changes the answer. Also "highest payoff player 1 can get in a pure NE". |
| 5 | Pure Nash II — elimination | P4 | Iterated elimination of strictly dominated strategies on 4×4/5×5. **Strict** elimination preserves all equilibria; **weak** elimination can destroy some. If elimination leaves one cell, that is the unique equilibrium — pure *and* mixed. Examples: the Cournot chain (60 → 30 → 50 → 35, ending at 40,40), the 2/3-average chain down to 1. |

---

## 6. Known errata — handle carefully, do not repeat the professor's mistakes

- **Practice exam Q3** has two correct answers (22 and 23). The professor acknowledges it.
- **Practice exam Q2 — an earlier version of this spec was WRONG about this. The professor is correct.** Left *is* player 2's strictly dominant strategy and (Up, Left) *is* the unique equilibrium. Do not teach this as a mistake.

### CELL ORDER IN THE EXTRACTED TEXT — read before using any matrix

In these PDFs each cell prints two stacked numbers, and the flattened text layer gives them **player 2's payoff first, then player 1's**. This is the reverse of the usual convention and it will silently invert every conclusion if you miss it.

Decisive proof — Practice exam Q1. The extracted grid is Up: (−1 / 2), (−2 / 3); Down: (3 / 9), (−3 / 3.1). The solution states Down is player 1's *strictly dominant* strategy. Taking the first number as player 1's, Down gives −3 against Right where Up gives −2, so Down would not be dominant and the solution would be wrong. Taking the **second** number as player 1's, Down gives 9 and 3.1 against Up's 2 and 3 — dominant in both columns, exactly as stated. The same reading makes Left dominant for player 2, also as stated.

Note the contrast: the solutions' **prose** writes profiles the normal way round, e.g. Q11's "(D,L) with payoff profile (6,5)" is (player 1, player 2). Only the extracted *grid* is reversed.

**Consequence: more matrices are recoverable than section 2 assumes.** The 3×3 grids in the 2024 B, 2025 A, 2025 B and 2025 C solution documents are restated in the text layer. Under the ordering above they may be tagged as real exam questions — but re-solve every one in code and confirm it reproduces the published answer before tagging it. If your reconstruction does not reproduce the published answer, you have the ordering or the cells wrong: do not publish it.
- **2025 C detailed solution** is written against code-zero letters and mislabels Q11. Trust its reasoning, never its letters.

---

## 7. Source material

All in the Claude project — read with the `Projects` tool, `project_read`, exact paths including double spaces:

`Presentation 1  Introduction.pdf` · `Presentation 2  Sequential games with perfect information.pdf` · `Presentation 3  Prisoners dilemmas.pdf` · `Presentation 4  Nash equilibrium.pdf` · `Presentation 5  Mixed strategies.pdf` · `Presentation 6  Credible strategies and exam preparation.pdf`

`2024 A  scrambled exam.pdf` + `2024 A  detailed solution.pdf` · same for `2024 B`, `2025 A`, `2025 B`, `2025 C` · `Practice exam questions Presentations 15.pdf` + `Practice exam  detailed solutions.pdf`

---

## 8. Output

Write exactly two kinds of file, and touch no others:

- `/home/claude/gt-prep/Day-NN.html`
- `/home/claude/gt-prep/scripts/Day-NN-<slug>-script.txt` (one per strip, including intro)

Do not edit `index.html`, `Day-06.html`, this spec, or any other day's files. Another agent owns those.

Finish by listing every file you wrote.

---

## 9. The remaining teaching days

| Day | Title | Tags | Content |
|---|---|---|---|
| 8 | Repeated games and sustaining cooperation | P3 | Exactly **one** repeated-game question on every single exam. Verbal, not mathematical. The question always describes an opponent's rule and asks for your best reply. **The off-by-one trap:** if the opponent forgives one defection you get *two* free defections — round 1 **and** the last round; if the opponent defects from round 9 you start defecting in round **8**, not 9 (the solution says outright that waiting until 9 "misses an opportunity in round 8"). "Play tit-for-tat" is offered every time and is almost never the best reply. Also: the unique backward-induction equilibrium of a finitely repeated PD is defect in every round. Why cooperation survives anyway: detection of cheating, punishment severe but not too severe (errors are inevitable), clear boundaries, and a low enough interest rate. The discounting maths: perpetuity of X = X/r; the worked case gives r = 1/9 ≈ 11.1%. Examples: the tolerant opponent who forgives one defection (2024 A Q9 and 2025 B Q3, same answer), tit-for-tat vs grim trigger, the GE/Westinghouse turbine cartel and its lunar-month cycle, the New England fisheries collapse, the public-good contribution game with costly punishment. |
| 9 | Making strategies credible | P6 | Pure recall, no calculation — a pen-and-paper day. The **eight devices, in order**: contracts · reputation · cutting off communication · burning bridges behind you · leaving the outcome beyond your control · moving in (small) steps · teamwork · mandated negotiating agents. The exam gives a story and asks which device it is. Draw the **entry game** (payoffs 2,2 / −1,−1 / 4,0) and the **cold-war game** (−1,1 / −10,−10 / 0,0) and show *why* the threat is not credible without a device. **Salami tactics** is the mirror image — small steps used to *break* someone else's commitment. Subtleties: contracts must survive renegotiation and need third-party enforcement; strong reputation can substitute for a contract; cutting off communication costs you flexibility and verification; leaving the outcome beyond your control needs a delicate balance — strong enough to deter, not so strong that a false alarm is catastrophic; moving in small steps works only when there is no clear final step. Examples: Cortés burning his ships (1519) and William the Conqueror (1066), Dr. Strangelove's doomsday machine, the union leader with a restrictive public mandate, the Roman army's desertion rule, the kitchen remodelling contract paid in stages, Kennedy and the Berlin crisis, NATO Article 5, the Hunt for Red October letter. **Note: no 2024 paper contains a commitment question — the topic was first taught in 2025 — so real tagged questions come only from 2025 A, B and C.** |
| 11 | The two arithmetic questions you must not lose | P5 P1 P4 | Two halves. **First, the coupled zero-sum pair** that ends every paper: the probability of an outcome, then player 1's expected payoff (the value of the game), both on the same matrix. One wrong indifference equation loses both — 14 points, the biggest concentrated risk on the paper. Traps: the probability of an *outcome cell* is p × q, not p; half the questions ask for a mismatched cell like (Left, right) so it is p × (1−q); and the rounding instruction changes between papers ("nearest percentage point", "two digits after the decimal point", "one decimal place", and 2025 C Q9 has none at all). Five of the seven past matrices have the shape a,0 / 0,b giving p = q = b/(a+b) and value ab/(a+b) — but **2025 C flips it to anti-diagonal and Practice Q14 has no zeros at all**, which is exactly where a memorised shortcut breaks. **Second, the 2/3-average contest**: mean of a uniform range is (min+max)/2, so 1–89 gives 45 and 21–99 gives 60, not 50; with a mixed population you must average first and then multiply by 2/3; and the Nash equilibrium is **1** while the lab-observed 13–19 is a distractor. Note Day 6 already teaches the indifference method — this day is the *paired question* and the arithmetic, not a re-teach. |
| 13 | Full-course sweep | P1–P6 | Not new learning. Five minutes per lecture, one concrete task each: **P1** say the definition of a *strategy* (a rule for every possible case) and of a dominant strategy; **P2** solve one game tree by backward induction; **P3** identify one prisoner's dilemma and give one best reply in a repeated game; **P4** find all pure equilibria in one 3×3; **P5** solve one 2×2 zero-sum mixed equilibrium start to finish; **P6** recite the eight credibility devices. Then the behavioural numbers, which are scattered across P2–P5 and worth 1–2 easy marks: ultimatum modal offer 50%, **median ~40%**, offers under 20% often rejected, dictator median **~25%**, offers 10% lower when the proposer role is *earned*; first-round PD cooperation **~45%** falling ~2% per round; Golden Balls split **~50%**; only ~10% play the beauty-contest equilibrium. Finish with the error log. This page should feel like a lap, not a lesson — six short panels, one visual each, no long prose. |
| 14 | Warm-up, then the exam | P2 P4 P5 | Exam morning, 30 minutes, nothing new. Three things only: one game tree solved by backward induction, one matrix with all pure equilibria found, one 2×2 zero-sum mixed equilibrium start to finish. Then the trap list read once. Close with the exam-room tactics: two passes (answer everything you can in ~50 minutes, then the 3–4 heavy ones), never leave a blank, check the rounding instruction, check *which player* is asked, and "none of the other answers is correct" has never once been the right answer across six solved papers — low prior, not zero. Short page. No new teaching, no audio strip longer than a minute. |

## 10. Mock-exam pages (Days 3, 7, 10, 12)

Use the practice-day shape, not the learn-day shape. No pretest, no teaching panels, no audio.

| Day | Paper | Notes |
|---|---|---|
| 3 | Practice exam | Diagnostic. Q3 has two correct answers (22 and 23) — say so on the results panel rather than marking her wrong. |
| 7 | 2024 A | Most computational. No commitment questions. |
| 10 | 2025 B | Five mixed-strategy questions, more than any other paper. |
| 12 | 2025 C | Most recent, covers all six presentations. Note on the page that it should be sat at 16:00 to match the real exam hour. |

**Hard requirements, all of them:**

- **Timer 90:00**, counting down, with a Start and a Pause button.
- **14 questions**, five options each.
- **No running score and no answer reveal during the run.** Clicking an option only marks the choice — nothing turns green, no explanation opens. This is the single most important difference from a Learn day.
- **A Submit button, AND auto-submit when the clock reaches zero.**
- **A results panel at submit or time-up**: score out of 14, percent, and the list of question numbers missed. **No pass mark is printed on any paper — do not invent one.** Explanations reveal only at this point.
- Every question must carry the full data it needs — the matrix or tree beside it, never "the same matrix as question 12".
- Group questions that share a dataset: show the matrix once as a data block, then the questions that use it underneath.
- Keep the real paper's question order.
- `@media print` opens the explanations so she can print a marked paper.

**On matrices:** the honesty rule in §2 and the cell-ordering rule in §6 both apply and matter more here than anywhere, because a mock is worthless if its answers are wrong. Rebuild every matrix from the solution document's text layer under the corrected ordering, re-solve it in code, and confirm it reproduces the published answer. Where a matrix genuinely cannot be recovered, say so on the page in a short note and substitute a verified question of the same shape — do not guess, and do not silently drop the question and leave 13.

---

## 11. HOW THE ENGLISH MUST READ — applies to every page

Source: Ifat's `cut-the-fluff` standard. She is reading English as a second language, and so are most of her class. Her words: *"the English level is very high"* is a **defect, not a style preference.**

### The bar

Write for someone reading English as a second language. **Short sentences. Everyday words only.**

**The one exception: the course's own vocabulary stays.** Nash equilibrium, dominant strategy, dominated strategy, backward induction, zero-sum, mixed strategy, best reply, prisoner's dilemma, stag hunt, battle of the sexes, chicken, matching pennies, the value of the game, dominance-solvable, salami tactics, the eight device names. Simplifying those away would leave her unable to read her own exam paper. **Keep them, and explain each one the first time it appears on that page.**

**The mechanical test: if a word has a shorter everyday twin, use the twin.**

| Don't write | Write |
|---|---|
| utilise · employ | use |
| approximately | about |
| ceased · terminated | stopped |
| commence | start |
| sufficient | enough |
| demonstrate | show |
| obtain | get |
| require | need |
| in order to | to |
| prior to | before |
| subsequently | then · after that |
| in the event that | if |
| a significant proportion of | most of · many of |
| it is worth noting that | *(cut it)* |
| at the expense of | costs you |
| drifting away from | far from |

Also cut, everywhere: rhetorical flourishes, literary inversions, and long sentences that stack three clauses. **One idea per sentence.** If a sentence has two ideas, it is two sentences.

### No long dashes

**Do not use the em dash (—) in anything on the page.** Readers read it as a marker of AI writing and dislike it. There are about 935 of them across these pages and they must go.

**This is not a find-and-replace.** The dash stands in for five different marks. Look at what each one is doing:

| The dash is doing | Replace with |
|---|---|
| Joining two whole thoughts | A full stop, and two sentences |
| Introducing a list or an explanation | A colon |
| Wrapping an aside | A pair of commas, or brackets |
| Adding a short tag to the end | A comma |
| Standing in for "which is" or "because" | The actual words |

The same applies to `&mdash;`. En dashes in number ranges (3–5) are fine.

### What NOT to cut

- **Explanations that sit beside a visual.** The picture is the scannable version; the prose is for the reader who wants to understand it. Cutting the text because a diagram exists serves only the scanner.
- **Any teaching content, any worked step, any answer, any warning about a trap.** This pass changes *how the sentences read*, never what the page teaches. **Compress the language, never the meaning.**
- **Every number, every matrix, every payoff, every answer key.** Do not touch them. If you change a number by accident you have broken the page.

### Audio scripts are different

**Do not apply the cutting rules to the `.txt` scripts.** Conversational pacing is why audio works, and tightening it makes it worse. But do swap high-register words for everyday ones there too, because the listener is the same person. Keep the back-and-forth, keep the stories, keep the pauses. Dashes do not matter in speech, so leave the script punctuation alone.

**If you change a script, change its embedded HTML comment to match, byte for byte.**

### Full words, never letters, in anything that explains (added 21 September 2026)

Ifat's rule: a learner should never have to remember what a letter stands for. Every letter held in memory costs working memory that the reasoning needs.

- **Moves** in worked examples, try-its, quiz explanations and tree labels are full words: Up / Down, Left / Right, Stop / Continue, Cooperate / Defect. Never A, B, L, R, X, Y, u, d, a, b.
- **Things** are named in full: "only urban renewal", not "U only"; "the proposer", not "A".
- **Refer to a node by who moves and how you got there** ("player 2's turn after player 1 plays Down"), never "the node on branch B".
- **Tables explain themselves.** Every data table gets a one-line "How to read this table" box, and uses the same words its audio strip uses.
- **Exception:** a quiz *stem* copied faithfully from a real paper keeps the paper's notation, because Ifat must meet it cold. Its explanation still uses full words.
- **One audio strip per example**, sitting directly above that example's visual. A strip longer than about two minutes is two strips.

### Two more of her rules worth checking while you are in the file

- **State it once.** Do not write the idea and then, beside it, the version you rejected. One "we also considered X" on a page is useful; repeated down the page it makes the reader hold every idea twice.
- **Do not ask a question the reader answers yes to.** If the answer is obviously yes, say the thing instead.

### How to check yourself when you are done

1. Zero `—` and zero `&mdash;` in the rendered page text.
2. Read three paragraphs aloud. Any sentence you run out of breath on is too long.
3. Every course term still present and explained on first use.
4. Every number identical to before.

---

## 12. QUIZ RULES — from Ifat's `exam-question-writer`

This section supersedes anything earlier in this spec about quiz writing. It is a condensed copy of her canonical skill, which lives at
https://app.notion.com/p/exam-question-writer-398af5bbc35381529662ef7ea22e773d

### The defect this section exists to fix

The skill says: **"Lead each per-day quiz with fresh variants and reserve the faithfully-reproduced past-exam questions for the timed mock, where the learner should meet them cold."**

The first build did the opposite. **18 real exam questions ended up in both a learn-day quiz and a mock she later sits.** Her Day 10 and Day 12 scores would have been inflated, because she had already seen those questions a week earlier. A mock that has been spoiled is not a measurement.

### The papers rule, which makes this checkable

Four papers are used as timed mocks and are therefore **spoiled if a learn day quotes them**:

| Paper | Sat on |
|---|---|
| Practice exam | Day 3 |
| 2024 A | Day 7 |
| 2025 B | Day 10 |
| 2025 C | Day 12 |

Two papers are held in reserve and are **never sat as a mock**:

- **2024 B**
- **2025 A**

**So: a learn-day quiz may carry a `src` tag ONLY for 2024 B or 2025 A. Every other item must be a fresh variant with no tag.** Aim for at most one tagged item per learn day, and 5 of 6 fresh.

The mock pages are unaffected. They stay 100% the real paper.

### Rule 11 — map the variation axes BEFORE writing

Changing names and numbers is the weakest kind of variation. Before writing a day's six items, list that topic's conceptual axes and **flip each one at least once across the set**:

- **Direction** — up and down, more and less.
- **Threshold side** — above and below the cutoff.
- **Forward and inverse** — given the inputs find the result, and given the result find the input.
- **Both sides of any classification** — is it X, and is it *not* X.
- **Boundary and "cannot be known" cases.**
- Add one or two items set outside the course's own scenario bank.

Worked examples of axes for this course:

| Topic | Axes to flip |
|---|---|
| Backward induction | who is asked (player 1 / player 2 / a named player) · reachable vs unreachable payoff · a tree that is a centipede vs one that only looks like one · forward (find the payoff) vs inverse (which payoff would have to change to flip the answer) |
| Pure Nash | count them vs name the profile vs give a payoff · 0 equilibria, 1, and more than 1 · highest payoff for player 1 and for player 2 · a cell that is best for both but unstable |
| Elimination | strict vs weak · order that is forced vs order that is free · dominance-solvable vs not · "how many, pure or mixed" |
| Mixed / zero-sum | matched cell vs mismatched cell · main-diagonal zeros vs anti-diagonal vs no zeros · asked for p, for q, for a cell, for the value · a zero-sum game that needs no mixing at all |
| Repeated games | forgives none / one / two · opponent who turns at a fixed round vs one who reacts · 8, 10 and 12 rounds · best reply vs "what does this named strategy score" |
| Commitment | name the device from a story · pick the story that matches a named device · which device would NOT work here |

### Rule 8 — full worked explanation on every calculation item

Not a one-liner. Ifat's words: *"it feels that you are doing this in the head."* Every calculation item's `exp` must show:

1. the formula, named
2. the inputs identified from the stem or table
3. numbered substitution steps, one operation per line
4. a verification line, plugging the answer back
5. **the exact wrong calculation behind each tempting distractor**

Concept items may keep a short `exp`, but must still say why each distractor is wrong.

### The rest of the rules, unchanged

- Never re-use a teaching example. Grep the page: no quiz item may share a scenario or numbers with its own worked example or try-it.
- Every item solvable from data on the page, standalone. A follow-up restates its full scenario.
- Distractors are real mistakes, not noise.
- The stem gives the scenario, never the conclusion the learner should derive.
- Correct answers spread across positions; keep the render-time shuffle.
- **Verify every numeric answer in code.** Make the quiz match the script, never the other way round.
- One concept per line in takeaways and definition lists.
- Abbreviation and full name together on first use: "IESDS (iterated elimination of strictly dominated strategies)".
