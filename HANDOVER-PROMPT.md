# Handover prompt — Game Theory 14-day study site

## How to use this

1. Start the new chat **inside the same Project** ("Introduction to Game Theory and Strategic Thinking").
2. **Attach `game-theory-prep.zip`** to the first message. This is essential. Each chat gets a fresh cloud machine, so the site files do not travel by themselves. The zip holds all 15 pages, the 34 audio scripts, and BUILD-SPEC.md.
3. Paste everything below the line as your first message.

---

I am continuing work from an earlier chat that ran out of context. The zip attached holds the whole project. Please unzip it into your working folder and read `BUILD-SPEC.md` first, then this brief.

## Step 0 — load the skills and show me the receipt

Before any work, fetch these Notion pages with the Notion MCP and tell me, in a short list, which ones loaded and which failed:

- exam-prep-manifest (load this FIRST, it owns the shape of the package) — https://app.notion.com/p/3d6af5bbc35381028c2ec6357dfc599f
- working-with-ifat — 398af5bbc35381c09505f86bb0a51840
- talk-to-ifat — 3b1af5bbc3538182b880e5acae2c893a
- cut-the-fluff — 3acaf5bbc35381a5abaac37e4d1a9f2d
- exam-question-writer — 398af5bbc35381529662ef7ea22e773d
- learning-podcast-builder — 398af5bbc3538108b45bf107e995e34b
- verified-numbers — 3c4af5bbc353811f928bc4b583e366fd
- evidence-honesty — 398af5bbc35381ea8f87eee050e4378f
- notion-writer-common-brain-standard — 398af5bbc35381469a97fd7d93e48383

If a fetch fails, say so and stop. Do not work from memory of these pages.

## What is already finished

A 14-day exam prep site for my MBA Game Theory exam (Bar Ilan IMBA, Prof. Yuval Heller, Thursday 8 October 2026, 16:00, 15 multiple choice questions, five options each).

- `index.html` plus `Day-01.html` to `Day-14.html`, all built, all checked.
- 10 learn days (1, 2, 4, 5, 6, 8, 9, 11, 13, 14) and 4 timed mocks (3, 7, 10, 12).
- Aurora theme, matching my other site at ifatprouser-bit.github.io/econ-prep.
- Quiz answers only appear after I click an option.
- Every day is tagged with the presentations P1 to P6 it covers, plus a coverage map on the index.
- GoatCounter is on all 15 pages, site code `game-theory`.
- Simple English pass done. No em dashes. Course vocabulary kept.
- Quiz freshness pass done: 85 percent of questions are new, 0 past-paper questions are spoiled by appearing in both a learn day and a mock.
- 34 audio scripts in `scripts/`, each also embedded as an HTML comment above its `<audio>` tag.

## What is left — three jobs, in this order

### Job 1 — finish the audio (this is the big one)

38 mp3 files are referenced by the pages. Only 2 exist so far: `Day-01-intro.mp3` and `Day-01-reading-trees.mp3`. Day 6's four files exist on my machine but in the retired Aria and Andrew voices, so they must be rebuilt.

- Tool: `mcp__remote-devices__voicebox__dialogue_to_mp3`.
- Voices: **NOA = Heart**, **TOM = Fenrir**. Nothing else.
- The tool caches each line, so if a call times out at 60 seconds, call it again with exactly the same arguments and it resumes where it stopped. Do not change the text between retries.
- Scripts live in `scripts/Day-NN-<slug>-script.txt`. The output filename is given at the top of each script.
- **Day 6 has no scripts.** They were written straight into the page in the old chat and never saved. Write four fresh scripts for `Day-06-intro`, `Day-06-zerosum`, `Day-06-pure`, `Day-06-indifference` from what is actually on `Day-06.html`, in the same NOA and TOM style as the other 34, then generate them.
- Audio rules are in BUILD-SPEC.md section 4. The one that catches people out: **no spoken digits**. Say "one third", not "1/3".
- When the files are made, collect them into the site folder next to the HTML (the `<audio src>` is a plain filename, same folder, no `audio/` prefix), then rebuild the zip.

Note: no folder on my computer is connected to the session right now. You will need to ask me for folder access before you can copy the finished mp3s back, or just tell me where Voicebox saved them.

### Job 2 — two edits to the exam-prep-manifest page in Notion

Both were drafted in the old chat and both failed to apply, because the `old_str` I sent did not match the stored table row. Fetch the page first, read its exact stored markdown, then apply.

**Edit A — fill in four missing URLs** in the load order table: talk-to-ifat, verified-numbers, evidence-honesty, notion-writer-common-brain-standard. The IDs are in Step 0 above.

**Edit B — replace Rule 8.** The current Rule 8 says to match each day to the learner's week. I rejected that. These documents are shared with my classmates, so no one can know when any single reader is busy, and I have other exams the plan cannot see. The replacement rule is titled **"keep each day's scope reasonable"** and says:

> Do not build the plan around anyone's calendar. These packages are shared, so the reader's week is unknown. Control scope instead. One idea per day. Fit the stated time budget: about 5 minutes rotating recall, 15 minutes teaching, 7 minutes at exam pace, 3 minutes error log. Two to four teaching panels per learn day, no more. Mock days are longer and must be labelled as longer. Do not place two heavy calculation days back to back.

### Job 3 — final check, then I upload

Once the audio is in, give me the zip. **I upload to GitHub myself.** Do not create repos, do not suggest moving this to Claude Code, do not move any files anywhere. Everything stays in this chat.

## Rules that must not slip

- **Never give me the answer.** My weekly assignments are graded. Hints and smaller questions only. This site is exam revision, which is different, but the habit still applies to anything I ask about.
- Simple English, short answers, one idea at a time. English is my second language and my students' too.
- No em dashes anywhere in the pages.
- Keep the exam vocabulary the professor uses. Simplify everything around it.
- Matrices in the past-paper PDFs print **player 2's payoff first, then player 1's** in the flattened text. This is proven in BUILD-SPEC.md section 6. An earlier version of the spec had this backwards and taught a false erratum. Do not re-open it.
- Reserve papers rule: a learn day quiz may only quote a past paper that is not used as one of the four mocks.
- Verify every game tree, matrix, elimination chain and mixed equilibrium in code before it goes on a page. Do not eyeball them.
