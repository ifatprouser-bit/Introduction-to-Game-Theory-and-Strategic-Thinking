# Brief: animated step-by-step explanations for the Game Theory exam-prep site

## Who it is for
Ifat, an MBA student. English is her second language. Her exam is 8 Oct 2026. She learns best from a visual that changes step by step with Back and Next, not from walls of text. Her words: "animations like this are always a better way to explain this". She also said: "all the words are hard".

## The working files
- The pages are in `/tmp/w2/Day-XX.html`. Each is a self-contained HTML page with inline CSS and JS.
- Edit only the page or pages you were assigned. Never touch `Day-04.html`, `Day-05.html` or `index.html`.
- Never write to the user's computer and never call any `mcp__remote-devices__*` tool. The lead agent reviews your file and commits it.

## What already exists
1. **A text stepper.** It is already in every page: the `<script>` block marked `TSTEP` near `</body>`. On page load it turns every `.exp` that has no `.stepper` inside into Back/Next text steps. Anything you do not animate falls back to this automatically.
2. **The grid engine** at `/tmp/w2/engines/grid.js`. It defines `buildGridStepper(cfg)` for payoff-matrix questions.
   - `cfg`: `rows`, `cols` (word labels), `cells[i][j]=[p1,p2]`, `steps` or `tracks:{"Name":[steps]}`, `finalMsg` (HTML), and these flags: `nash:true` (green-highlight cells with both underlines at the end), `stall:true`, `noalive:true` (hide the "Still alive" bar when nothing is cut).
   - Steps:
     - `['cut','row'|'col',redIdx,greenIdx,note?]` cuts a strictly dominated line. The engine throws if the cut is not truly strict.
     - `['cmp',kind,red,green,note?]` only compares.
     - `['ul','col'|'row',idx,note?]` underlines best replies. `'col'` means "player 2 plays this column, so player 1 picks the best row". Ties are underlined automatically.
   - It needs the CSS in `/tmp/w2/engines/stepper.css` (already in every page) and `/tmp/w2/engines/keep.css` (add it inside `<style>` if the page lacks `.dtable .keep`).
3. **Reference pages to copy the pattern from:**
   - `/tmp/w2/Day-04.html`: the quiz items use `"anim":{...}` instead of `"exp"`, and the quiz render line is `if(item.anim){exp.appendChild(buildGridStepper(item.anim));}else{exp.innerHTML=item.exp;}`. The engine code is pasted just before `const QUIZ`.
   - `/tmp/w/Day-05.html`: shows `tracks`, `stall`, `cut` and `cmp` steps.

## What to do
For every quiz or mock question on your page(s), choose:
- **Grid question** (dominance, best replies, counting or picking equilibria, naming a game by its matrix): use `buildGridStepper`.
- **Other visual question** (game tree, mixed-strategy indifference, repeated rounds, arithmetic chains): build or reuse a small engine in the same visual style. Use the same classes: `.stepper`, `.sbar` with "Step n of N", the visual, `.msg` for the step text, `.nav` with `.bk` "← Back" and `.nx` "Next →", and a final `.msg.good` summary. One idea per step. The visual must change on each step: highlight what is being compared, mark what is decided, and carry values back.
- **Pure recall or concept question** with nothing to draw: leave it. The text stepper covers it.

If you build a reusable engine, also save it as a standalone file in `/tmp/w2/engines/` (named in your task), so later agents can reuse it.

## Writing rules for step text
- Simple English, short sentences, one idea per step. Metaphors are fine. No jargon without a plain explanation.
- **Full-word labels only.** Never use a1, b3, R1, X, or similar letter labels. Use Top, Upper middle, Lower middle, Bottom; Left, Left middle, Right middle, Right; Up, Middle, Down; or story words. If a question's own grid uses letter labels, rename them in both the question and the animation, and make sure the options still match.
- Say whose numbers we read: "Player 1 only looks at the first numbers."
- Keep the useful content of the old explanation: the rule, the check, and why each wrong option tempts. Put it in the steps or in `finalMsg`.
- Do not change any question, any option or any correct answer. Do not add or remove questions. Keep `src` tags as they are.
- Never use em-dashes.

## Mock pages (Days 3, 7, 10, 12)
These are timed exams. Explanations must stay hidden until the student submits, or until the clock runs out. The pages already do this with the `.exp` divs and the `show` class. Keep that behaviour exactly. A good pattern: put the animation inside the existing `.exp` div, built on page load (or on submit), so it shows only when `.exp` gets `show`. Do not show a running score, and do not reveal anything early.

## Verify before you report
1. Every number in every step matches the grid or tree and the official answer. Re-solve each game yourself with a short script.
2. Run a Playwright test with no page errors. Answer each question (on mocks, answer and then press submit), step through every stepper to the end, then press Back. Use this setup:
   ```
   const { chromium } = require('playwright');
   const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
   ```
   Run it with `NODE_PATH=$(npm root -g) node yourtest.js`. See `/tmp/w2/engines/test-example.js`.
3. Take one or two screenshots of steppers and look at them with the Read tool. The cell highlights must show and the text must be readable.
4. Make sure the TSTEP fallback still works for the questions you left alone.

## Report back (short)
- File(s) changed.
- For each question: animated (and with which engine) or left as text.
- Any engine file you created and its API in two or three lines.
- The test result, and anything you were unsure about.

## Read before you edit (required)
1. Read **your whole page** first, top to bottom: every section, every audio script comment, the full quiz and its grids. Only then change anything. An explanation step is a judgment about what the page has already taught.
2. Read `/tmp/w2/BUILD-SPEC.md`, the site's build rules.
3. Read the skill file `/root/.claude/skills/synced/5a26cbe3-808a-4437-a9f7-47b65fd1e63d_814d2eea-c20d-482a-8f2a-d1bdfdd72ad1/exam-prep-day-builder/SKILL.md`.
4. **Finished examples of the standard:** `/tmp/w2/Day-04.html` (best-reply underlining) and `/tmp/w/Day-05.html` (dominance cutting, tracks, stall). Open each in Playwright and step through one stepper before you start, so you see what good looks like.

## Ifat's standing rules for study pages (ground truth)
- Use full words, never letter abbreviations. Holding what a letter means costs working memory.
- One idea at a time. Keep pages lean, not dense. Let the visual carry the detail.
- Never show the worked result all at once. Each step reveals one move, and the next step comes only on Next.
- When an animation covers a worked example, remove the written steps that repeat it. Do not keep both.
- Name the course's own concepts out loud: Nash equilibrium, strictly dominated, best reply, backward induction, indifference, subgame perfect, and so on.
- Teach the principle, not only this one answer. The final summary should say the rule in one line, so it still works if the exam changes a number.
- Do not use all-caps text. Use clear sizes and spacing.
- Mock pages show nothing before Submit.
- A day must not lean on a term that is only taught on a later day.

## Licence to refuse
You may write "I could not verify this" or leave a question as text, and say why. **Never invent** a number, a payoff, a tree or an answer to fill a gap. If the question's data is not fully on the page (for example, the tree is only an image), do not guess it. Leave it as text and report it. A refusal with a reason is a good result.

## What NOT to change
The page layout, sections, audio, questions, options, correct answers and `src` tags are decided. You are adding animations to the explanations, not redesigning the page.

## Return exactly this shape (no more than 12 lines)
```
UNIT: Day-XX
CHANGED: /tmp/w2/Day-XX.html (+ any engine file)
QUESTIONS: Q1 grid | Q2 tree | Q3 text (reason) ...
ENGINE: name, file, API in one line (or "none")
TEST: pass/fail, number of steppers stepped, page errors
REFUSED / UNSURE: ...
```

## Wave 2: engines you can reuse (all finished and tested)
Copy each engine's code into your page. Pages must stay self-contained, so no external `<script src>`.
- `engines/grid.js`, `buildGridStepper`: dominance cuts, comparisons, best-reply underlines. Finished example: `/tmp/w2/Day-04.html`.
- `engines/grid-plus.js`: grid.js plus `swap`, `eq`, `both` and `hl` steps, for the prisoner's dilemma tick tests and naming a game. Example: `/tmp/w2/Day-02.html`.
- `engines/tree.js`, `buildTreeStepper`: game trees and backward induction, any number of players. Example: `/tmp/w2/Day-01.html`.
- `engines/mixed.js`, `buildMixedStepper`: 2×2 mixed equilibrium, `ask` q, p, cell or value, with `expect` asserted. Example: `/tmp/w2/Day-06.html`.
- `engines/rounds.js` and `engines/rounds.css`, `buildRoundsStepper`: repeated-game timelines. Example: `/tmp/w2/Day-08.html`.
- `engines/numberline.js`, `buildNumberLineStepper`: the 2/3-average crowd. Example: `/tmp/w2/Day-11.html`.

Read the API comment at the top of each engine you use. If two engines both define the same helper names, check that pasting both into one page causes no clash, and wrap one if needed.
