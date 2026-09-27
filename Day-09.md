# Day 09 — Making strategies credible (P6)

## Verdict
FIXED (4 changes). No answer key was wrong. Three of the four changes are accuracy and one is English.

## Question table

Quiz items (rendered live in Chromium; option order is shuffled at render time, so "page says"
is the item's stored correct answer, not a letter).

| Q | Topic | Page says | I computed / checked | Official solution says | Match | Action |
|---|---|---|---|---|---|---|
| 1 | Name the story that matches device 8 (mandated negotiating agents) | Pharmacy buying group with a published price limit; distractors map to devices 4, 1, 5, 2 | Each distractor checked against P6 device by device: rope bridge = burning bridges; outside auditor = contracts (third-party enforcement); rocket self-destruct = beyond your control; restaurant's good name = reputation. Exactly one device-8 story | n/a (fresh) | ✅ | Fixed a name slip inside the explanation (see Changes) |
| 2 | "Cutting off communication": main advantage | Eliminating the risk of renegotiation | P6 slide 7: "Cutting off communication Eliminates risk of renegotiation". The other four options are the real paper's own options, checked one by one against the 2025 A code-zero paper | 2025 A Q4, correct answer a. "Eliminating the risk of renegotiation" | ✅ | None. Tag is legitimate: reserve paper, no matrix, stem and all five options reproduced exactly |
| 3 | Which move would NOT make the threat credible | The contract enforced by a slow, corrupt local court | P6 slide 5: "Third-party enforcement is important. When courts are corrupt/slow, this may rely on private judges / organized crime." The other four map to devices 2, 8, 7, 5 and all have a working enforcer | n/a (fresh) | ✅ | None |
| 4 | Salami tactics vs moving in small steps | Salami tactics (splitting invoices under a 2,000 approval limit) | P6 slide 10: small steps used to break someone else's commitment. The manager dissolves the company's rule; nothing is being built. The "moving in small steps" distractor is the real mistake | n/a (fresh) | ✅ | None |
| 5 | Name the device from a story | Leaving the outcome beyond your control (automated trading system nobody can switch off) | P6 slide 9: automatic response, discretion removed. Distractors contracts / cutting off communication / burning bridges / teamwork are all excluded by the stem | n/a (fresh) | ✅ | None |
| 6 | Why a threat is not credible | The threat fails, because the chain would not carry it out | Backward induction at the chain's own node: delisting costs more than paying. Verified in code on the same structure as the entry game | n/a (fresh) | ✅ | None |

Page content (not quiz) checked against Presentation 6:

| Item | Page says | I computed / checked | Source says | Match |
|---|---|---|---|---|
| Entry game tree | (2,2) accommodate · (−1,−1) fight · (4,0) stay out; P1 = Monopolist, P2 = Competitor | Script: P1 compares 2 vs −1 → accommodates; P2 compares 2 vs 0 → enters; outcome (2,2); P1 gets 2 < 4, so the fight threat is rejected by backward induction | P6 slide 3, same three payoff pairs, Monopoly = Player 1 | ✅ |
| Cold-war tree | (−1,1) back down · (−10,−10) nuclear · (0,0) stay home; P1 = USA, P2 = Soviet Union | Script: P1 compares −1 vs −10 → backs down; P2 compares 1 vs 0 → invades; outcome (−1,1); P1 gets −1 < 0, threat rejected | P6 slide 3, same three payoff pairs, USA = Player 1 | ✅ |
| Cold-war tree after a device | Back down moved to −11, so USA fights and the USSR stays home at (0,0) | Script confirms: −10 > −11 → nuclear; USSR then compares −10 vs 0 → stays home | Not in P6 (a built teaching illustration, labelled as such) | see "Could not verify" |
| Bakery worked example | Accommodate moved to −2, so you fight, she stays out, you get 4 | Script confirms: −1 > −2 → fight; she compares −1 vs 0 → stays out; you get 4 | Same shape as P6's "contracts with customers with beat-the-competition clause" | ✅ |
| The eight devices and their order | contracts · reputation · cutting off communication · burning bridges behind you · leaving the outcome beyond your control · moving in small steps · teamwork · mandated negotiating agents | Compared name by name and position by position, in three places on the page: intro takeaway, memory-card SVG, and the main table | P6 slide 4, identical list and identical order | ✅ |
| Salami tactics | Mirror image: slicing someone else's commitment; child-and-water picture; Yes Prime Minister | P6 puts it inside device 6 as the reverse use, with the child example and the TV clip | ✅ | ✅ |
| The five subtleties | contracts renegotiation-proof + third-party enforcement · reputation can replace a contract · cutting off communication costs flexibility and verification · beyond your control needs a delicate balance (false alarm) · small steps need no clear final step | Each traced to its slide | P6 slides 5, 6, 7, 9, 10 | ✅ |
| Renegotiation-proofness two-part argument | (1) the employee who renegotiates is fired; (2) if not fired, reputation is lost | Matches the slide word for word in substance | P6 slide 5 | ✅ |
| Named examples and dates | NATO Article 5 (contracts) · Kennedy/Berlin quote (reputation) · Dr. Strangelove radio (cutting off) · doomsday machine (beyond control) · L.A. Confidential revolver · William the Conqueror 1066 · Hunt for Red October letter · Sun Tzu · Roman army · AA · union leader mandate · sports agents · store clerks · kitchen paid by stages | Every attribution checked against the slide it sits on. NATO Article 5 really is filed under **contracts** in P6, not teamwork, and the page has it right. Kennedy quote matches the slide's wording | P6 slides 5–13 | ✅ except Cortés, which was missing (fixed) |
| "Only the three 2025 papers carry these questions" | as stated | Read both 2024 papers' solutions: no commitment question in either. 2025 A has one (Q4), 2025 B has two, 2025 C has one | P6: "(Commitment taught since 2025)" | ✅ |

## Changes I made

- **Lede, the exam share was understated.**
  Old: "Commitment is about 6% of the paper."
  New: "Commitment is worth at least one question out of 14, and sometimes two."
  Why: I counted the commitment questions in all three 2025 papers. The floor is one question
  out of 14, which is 7.1%, and one paper carries two, which is 14.3%. "About 6%" is below the
  floor and would make her under-weight a recall topic she can bank in ten minutes. The new
  wording is a count, not an invented percentage, and it names no paper.

- **Burning bridges: Hernán Cortés was missing.**
  Old: "William the Conqueror burns his own ships after landing in England (1066). And the
  captain in *The Hunt for Red October*…"
  New: "William the Conqueror burns his own ships after landing in England (1066). The slides
  give a second one: Hernán Cortés burning his ships (1519). And the captain in *The Hunt for
  Red October*…"
  Why: P6 slide 8 lists two military burning-ships examples, William the Conqueror (1066) **and**
  Hernan Cortes (1519). Only the first was on the page, and Cortés is the version a past paper
  has actually used as a story. I took the date from the slide, not from my own knowledge, and I
  did not add a place name because the slide does not give one.

- **Quiz 1 explanation named the wrong counterparty.**
  Old: "The published limit the drug company has already seen."
  New: "The published limit the wholesaler has already seen."
  Why: the stem says the pharmacies buy from a wholesaler. The explanation introduced a "drug
  company" that appears nowhere in the question, which makes a recall item read as if it has
  two different stories in it.

- **Quiz note: one sentence was hard to read and hinted at the mock schedule.**
  Old: "Commitment was first taught in 2025, so there is only one past-final question here that
  you never meet again as a mock, and it is tagged."
  New: "One question here comes from a real past exam, and it is tagged."
  Why: two ideas in one long sentence, and "that you never meet again as a mock" told her
  something about the papers still to come without teaching her anything. Nothing was lost:
  the sentence right after it still says the other five are fresh.

## Could not verify

- **The third tree (the cold-war game after a commitment device, with back down moved to −11)
  is not in Presentation 6.** P6 states the idea of a strategic move but gives no modified
  payoffs for the cold-war game. The page does not claim the slide supplies them: the caption
  reads "the same tree, after a commitment device has been added". The numbers are internally
  consistent and I confirmed the solution flips as drawn, so I left it. If the reviewer wants
  zero constructed payoffs anywhere, this is the one place to look.
- **The "$2,000" figure** in P6's photograph-of-Mr-X contract is not on the page; the page says
  "a large reward". Not an error, just a number the page chose not to carry.
- **The 2025 A Q4 distractors** are reproduced from the 2025 A code-zero paper, where the
  correct answer is always printed first. The scrambled paper's letter order cannot be
  recovered, and does not matter here because the page shuffles options at render time.

## Suggestions I did NOT act on

- **Quiz 1 and the section-3 worked example are close cousins.** The worked example is a board
  that forbids its chief executive to sign above a stated price and prints the rule; quiz 1's
  correct option is a buying group whose buyer has a published price limit she cannot exceed.
  Different actors and different mechanisms, so no scenario or numbers are shared, but both are
  "publicly announced price ceiling, negotiator cannot exceed it". If one item on this page
  should be rewritten later, it is this one. I left it because rewriting a stem is a bigger
  change than this pass allows, and the item is correct as it stands.
- Each of the six quiz items shares a device with one of the page's try-it problems (device 5
  appears both as the hospital time-lock and as the bank's trading system, for example). The
  stories differ every time, and with only eight devices and six items some overlap is
  unavoidable, but it does mean a learner who remembers the page will find the quiz easy.
- The memory-card picture for device 4 still says only "the ships burned, 1066". Adding "and
  1519" would put Cortés on the board she actually revises from. I left the SVG alone because
  text length in a fixed viewBox is a layout risk and the table beneath now carries the fact.
- P6 also files the monopolist's price war (fighting one entrant to deter the next) under
  **reputation**. The page does not mention it. It would be one more story-to-device pair for
  free.

## Summary (five lines, for the synthesis)
- Questions checked: 6 quiz items, 3 worked examples, 5 try-it problems, 3 game trees, the
  eight-device list in three separate places on the page.
- Answers wrong before I started: none. Every quiz key, every tree and every device attribution
  matched Presentation 6 and the 2025 A solution.
- Other changes: 4 (an understated exam share, a missing Cortés example, a wrong counterparty
  inside one explanation, one sentence rewritten for the English bar).
- Unverifiable: the third tree's −11 payoff is a built illustration, not a slide number; it is
  labelled as an added device and it solves as drawn.
- Biggest risk left on this page: quiz 1 leans on the same "published price limit" idea as the
  device-8 worked example above it, so that one item may be passable from memory rather than
  from understanding.
