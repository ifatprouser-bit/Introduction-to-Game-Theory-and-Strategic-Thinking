# Handover prompt — Game Theory 14-day study site

Written 14 September 2026, late. Replaces the earlier 14 September version, whose Job 1 did not
exist: Day 7 and Day 10 were already built. Since then two full passes have run over all 15 pages,
a correctness verification and a simple-English rewrite, and the hub has been repaired.

## How to use this

1. Start the new chat **inside the same Project** ("Introduction to Game Theory and Strategic Thinking").
2. Nothing needs attaching. The site is public on GitHub and the folder is on my computer. Both
   addresses are in the brief, and as of 15 September the two match.
   **Do not read the site from `claude/site/` in this Project.** Those two files are a partial
   snapshot from 3 September and they are wrong.
3. Paste everything below the line as your first message.

---

I am continuing work from an earlier chat. Read `BUILD-SPEC.md` before anything else. It is in the
repository below and it owns every rule about how these pages are built. Then read
`VERIFICATION-2026-09-14.md` in the same folder, which records what was checked on 14 September
and what is still open.

## Step 0 — load the skills and show me the receipt

Fetch `exam-prep-manifest` FIRST: https://app.notion.com/p/3d6af5bbc35381028c2ec6357dfc599f

Then build the receipt **from the load-order table on that page, not from this list**. Every skill
in that table gets a row saying whether its fetch worked. A skill in the table that this prompt
does not name still gets a row. A receipt that matches the prompt rather than the manifest looks
complete when it is not, which is how three skills were missed on 10 September.

IDs I already have, all confirmed working on 14 September:

- working-with-ifat — 398af5bbc35381c09505f86bb0a51840
- talk-to-ifat — 3b1af5bbc3538182b880e5acae2c893a
- exam-prep-day-builder — 398af5bbc3538137bcd5cca363291a0e
- exam-question-writer — 398af5bbc35381529662ef7ea22e773d
- cut-the-fluff — 3acaf5bbc35381a5abaac37e4d1a9f2d
- learning-podcast-builder — 398af5bbc3538108b45bf107e995e34b
- mrt-explainer-visuals — 3b4af5bbc35381649c80c18c473b6a7c
- verified-numbers — 3c4af5bbc353811f928bc4b583e366fd
- evidence-honesty — 398af5bbc35381ea8f87eee050e4378f
- mrt-agent-fanout — 3caaf5bbc35381889a78d161a6eac794
- notion-writer-common-brain-standard — 398af5bbc35381469a97fd7d93e48383

If a fetch fails, say so and stop. Do not work from memory of these pages.

## Where the files are

**GitHub, public, read it directly:**
`https://raw.githubusercontent.com/ifatprouser-bit/Introduction-to-Game-Theory-and-Strategic-Thinking/main/<filename>`
Repository: https://github.com/ifatprouser-bit/Introduction-to-Game-Theory-and-Strategic-Thinking

**GitHub is current.** I uploaded all fifteen pages from my Drive folder on 15 September, and the
repository now matches. Verified from the repository itself: `index.html` has zero "coming" cards,
and `Day-07.html` carries the honesty fix and the corrected punctuation.

**If a change ever looks missing on the live site, wait before assuming the upload failed.** GitHub
Pages rebuilds after an upload and its cache can serve the old page for up to about ten minutes.
Press Ctrl+F5 to force a fresh load.

**On my computer,** if I connect the folder:
`G:\My Drive\MBA\Bar Ilan\All Courses\Game theory\Test plan\game-theory-prep_1`

**The past papers and lecture decks** are in this Project's files, and also in
`G:\My Drive\MBA\Bar Ilan\All Courses\Game theory`

## The state of the site

A 14-day exam prep site for my MBA Game Theory exam (Bar-Ilan IMBA, Prof. Yuval Heller,
Thursday 8 October 2026, 16:00).

- `index.html` plus `Day-01.html` to `Day-14.html`. 10 learn days and 4 timed mocks.
- All four mocks are complete and working: Days 3, 7, 10 and 12, 14 questions each, five options
  each, timer, submit, auto-submit, results panel.
- The hub links all 14 days. Nine were still marked "coming" until 14 September, on the Drive copy
  and on GitHub both. Fixed in both.
- All 38 mp3 files built in Kokoro Heart (NOA) and Fenrir (TOM). 65 minutes of audio.
- All 38 scripts exist as `.txt` files and are embedded as HTML comments above their `<audio>` tags.
- GoatCounter on all 15 pages, site code `game-theory`.
- Zero em dashes in visible page text across all 15 pages.
- **Verified 14 September**: every game on every page re-solved in code. No answer key was wrong.
  Ten reserve-paper leaks closed, sixteen content errors fixed.
- **Simple English pass, 14 September**: all 15 pages rewritten for a second-language reader, about
  900 sentences shortened and about 90 course terms explained on first use. No number, option,
  matrix cell or answer key changed, proved by a fingerprint check before and after. Mock question
  stems and all 280 options stayed frozen, because she must meet the real paper's wording cold.
- Per-page reports are in `reports/Day-NN.md` (correctness) and `reports/english-Day-NN.md`
  (English). The summary of both is `VERIFICATION-2026-09-14.md`.

## How to check whether a page is finished

**Never judge a page by searching its HTML source.** Days 3 and 12 write their questions into the
HTML. Days 7 and 10 build theirs from a JavaScript array at the bottom of the file, so a text
search finds nothing and reports a finished page as empty. That mistake cost a whole handover.

Render the page in Chromium and count what a learner actually sees. Playwright and Chromium are
installed in the cloud workspace. One console error appears on every page,
`Failed to load resource: net::ERR_INVALID_URL`. That is the GoatCounter tag, whose address starts
with `//` and cannot resolve from a local file. It works on the live site. Ignore it.

## What is left

### Job 1 — two small housekeeping items on GitHub

The fifteen pages are uploaded and the site is live and correct. Two things are still outstanding:

- The **`scripts` folder** has never been uploaded. The site does not need it and nothing links to
  it, but the audio scripts should live beside the pages they belong to.
- **`game-theory-prep_1.zip`**, sitting next to the folder on my Drive, is from 10 September and is
  now well out of date. Replace it or delete it, so nobody unzips the old site by mistake.

### Job 2 — the three open content items

These are written up in full in `VERIFICATION-2026-09-14.md` under "Open items". In short:

- The **"13 to 19" lab range** for the 2/3-average game appears on Days 11 and 13, and neither
  Presentation 1 nor Presentation 4 states it in text. Day 11's quiz 3 depends on it. Decide
  whether to keep it, source it, or rewrite the question around the parts that are sourced.
- **Day 14's tone.** Three sentences were flagged on that page, which is read an hour before the
  exam. Two were second-language readability faults and are fixed: an ellipsis that let "a guess
  never does" be read as "a guess never scores zero", and a tactic that named and predicted panic.
  **One is left for me**, because it is a tone call and not an English one: trap 6 says multiplying
  the matched pair is "the most expensive slip on the paper". Do I want a mistake ranked as the
  worst on the paper, an hour before I sit it? `reports/english-Day-14.md` offers a same-meaning
  alternative without the ranking, unapplied.
- **A site-wide analytics bug.** The tracking block at the bottom of every page reads an element
  called `resScore`, but the mock pages call theirs `rScore`, so the "mock submitted" event sends
  an empty score. It changes nothing a learner sees. Fix it once across all 15 pages, not on one.

### Job 3 — the skill edits I still have not answered

Proposed on 10 September, still open: the receipt rule (to `exam-prep-manifest`), and two
corrections to `learning-podcast-builder` (the Voicebox server is a local process on port 17493,
so the machine must be awake even though Replicate does the synthesis; and the generation
mechanics: one call at a time, never parallel, expect a 60 second timeout and one retry, pass the
script file's text verbatim so the line cache hits).

A fourth is now proposed, from the 14 September session: **`exam-prep-manifest` should say that a
page is verified by rendering it, never by searching its source**, and **the reserve-papers rule
should say explicitly that it covers prose, warning boxes and explanations, not only tagged quiz
items.** Seven of the ten learn days broke the rule in that second form while every tagged item
was clean.

## Rules that must not slip

- **Never give me the answer.** My weekly assignments are graded. Hints and smaller questions only.
- Simple English, short answers, one idea at a time. English is my second language and my
  classmates' too.
- No em dashes anywhere in the visible page text. The audio-script comments are speech: leave their
  punctuation alone.
- Keep the exam vocabulary the professor uses. Simplify everything around it.
- **Reserve papers rule.** A learn day may quote only 2024 B or 2025 A. The four mocks are the
  practice paper, 2024 A, 2025 B and 2025 C, and naming one of those, or its question number, its
  answer or its option list, anywhere on a learn day, spoils a paper I have not yet sat. This
  applies to prose and warning boxes, not only to tagged quiz items.
- **The cell-order rule.** In an extracted PDF grid the second number is player 1's. This is
  settled and was confirmed again on three papers. But it is a fact about how the text layer
  flattens, not about what is printed: the papers themselves print player 1 first, and 2024 B says
  so in words. Never teach it as an exam-room reading rule.
- Verify every game tree, matrix, elimination chain and mixed equilibrium in code. Do not eyeball
  them, and do not trust a page's own explanation as evidence.
- **If a skill and this prompt disagree, the skill wins and this prompt is stale.**
