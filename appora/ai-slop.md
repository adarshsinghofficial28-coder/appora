---
name: remove-ai-slop
version: "2.0"
description: Removes generic, formulaic patterns from AI-generated text to produce
  more natural, authentic prose. Targets predictable phrases, structural uniformity,
  false agency, alignment artifacts, and lexical monotony. Use when AI-drafted
  content feels flat, over-structured, or stilted.
---

# Skill: Remove AI Slop

## When Not to Use

- When the text must meet a formal template or structured format (e.g., legal filings, standardised reports) where structural uniformity is required
- When the text is already high-quality and natural; unnecessary passes introduce risk of degradation
- When the goal is to misrepresent AI-generated work as human-written in contexts where disclosure is required (academic submissions, regulated content, etc.)

---

## Interaction Protocol

**Before starting**, ask if not already clear:

1. What is the intended audience and register?
2. Are there structural constraints that must be preserved (e.g., headers, lists)?
3. Is the priority naturalness, concision, or both?

**Output**: Return the revised text with a brief note on the main pattern categories addressed. Do not produce a word-by-word annotation unless asked.

---

## Inputs and Outputs

**Input**: AI-generated or AI-assisted text (any length)
**Output**: Revised text with generic AI patterns removed; brief summary of changes made
**Composability**: Apply after drafting; apply before style shaping or final editorial review

---

## Core Rules

1. **Cut filler phrases.** Remove throat-clearing openers, emphasis crutches, and meta-commentary. See Banned Phrases below.

2. **Break formulaic structures.** Avoid binary contrasts ("not X, it's Y"), negative listings, false agency, and rhetorical setups. See Structural Patterns to Avoid below.

3. **Use active voice.** Every sentence needs a subject doing something. Passive constructions hide the actor and drain energy.

4. **Be specific.** Replace vague declaratives ("The implications are significant") with the specific thing. No lazy extremes ("every," "always," "never") doing vague work.

5. **Put the reader in the room.** No narrator-from-a-distance voice. "You" beats "People." Specifics beat abstractions.

6. **Vary rhythm.** Mix sentence lengths. Two items often beat three. End paragraphs differently. No em dashes, ever.

7. **Trust readers.** State facts directly. Skip softening, justification, and hand-holding. Remove politeness scaffolding ("I hope this helps", "Happy to elaborate").

8. **Cut quotables.** If it reads like a pull-quote or a LinkedIn aphorism, rewrite it.

---

## Banned Phrases

### Throat-Clearing Openers

Remove these before stating the point directly.

- "Here's the thing:"
- "Here's what [X]"
- "It turns out"
- "The uncomfortable truth is"
- "The real [X] is"
- "Let me be clear"
- "The truth is,"
- "I'm going to be honest"
- "Can we talk about"

Any "here's what/this/that" construction is throat-clearing. Cut it.

### Emphasis Crutches

These add no meaning. Delete them.

- "Full stop." / "Period."
- "Let that sink in."
- "This matters because"
- "Make no mistake"
- "Here's why that matters"

### AI Vocabulary Words

These appear far more often in AI-generated text than in natural writing. Replace or remove.

- Additionally
- Crucially / Importantly
- Delve / Deep dive
- Enduring / Pivotal / Vital
- Enhance / Foster / Garner
- Highlight (as a verb) / Underscore / Showcase
- Inherently / Fundamentally / Inevitably
- Interplay / Intricacies / Tapestry
- Landscape (used abstractly)
- Testament (as in "a testament to")
- Vibrant / Groundbreaking / Transformative

### Adverbs

Kill adverbs by default. No -ly intensifiers or softeners.

Common offenders: really, just, literally, genuinely, honestly, simply, actually, deeply, truly, interestingly, crucially

Also cut: "At its core", "In today's [X]", "It's worth noting", "At the end of the day", "In a world where", "The reality is"

### Business Jargon

| Avoid | Use instead |
|-------|-------------|
| Navigate (challenges) | Handle, address |
| Landscape (context) | Situation, field |
| Game-changer | Significant change |
| Double down | Commit, increase |
| Moving forward | Next, from now on |
| On the same page | Agreed |
| Lean into | Accept, embrace |

### Chatbot and Sycophantic Artifacts

Remove any phrasing that belongs in a chatbot conversation, not in prose.

- "Great question!"
- "You're absolutely right"
- "Of course!" / "Certainly!"
- "I hope this helps"
- "Let me know if you'd like me to expand on any section"
- "Here is an overview of..."

### Filler Phrases

Replace with the shorter form.

- "In order to" -> "To"
- "Due to the fact that" -> "Because"
- "At this point in time" -> "Now"
- "It is important to note that" -> remove; state the point
- "The system has the ability to" -> "The system can"

---

## Structural Patterns to Avoid

### Binary Contrasts

State the point directly. Drop the negation.

| Pattern | Problem |
|---------|---------|
| "Not because X. Because Y." | Telegraphed reversal |
| "[X] isn't the problem. [Y] is." | Formulaic reframe |
| "The answer isn't X. It's Y." | Predictable pivot |
| "Not X. But Y." | Mechanical contrast |
| "not just X but also Y" | Additive hedge |

Instead: state Y. "The problem is Y." Drop the contrast entirely.

### Negative Listing

State the thing directly. Skip the buildup.

| Pattern | Problem |
|---------|---------|
| "Not a X... Not a Y... A Z." | Dramatic buildup through negation |
| "It wasn't X. It wasn't Y. It was Z." | Same structure, past tense |

### False Agency

AI avoids naming actors by giving inanimate things human verbs. Find the person and name them.

| Pattern | Fix |
|---------|-----|
| "a complaint becomes a fix" | Someone fixed it |
| "the decision emerges" | Someone decided |
| "the culture shifts" | People changed behaviour |
| "the data tells us" | Someone read the data and concluded |
| "the market rewards" | Buyers pay for things |

### Narrator-from-a-Distance

Put the reader in the room. Use "you" or name the actor.

| Pattern | Problem |
|---------|---------|
| "Nobody designed this." | Disembodied observation |
| "This happens because..." | Lecturer voice |
| "People tend to..." | Armchair sociologist |

### Passive Voice

Name who did the thing. Passive voice hides actors and drains energy.

| Pattern | Fix |
|---------|-----|
| "X was created" | Name who created it |
| "It is believed that" | Name who believes it |
| "Mistakes were made" | Name who made them |

### Sentence Starters to Avoid

| Pattern | Fix |
|---------|-----|
| Sentences starting with What, When, Where, Which, Who, Why, How | Restructure; lead with the subject |
| Paragraphs starting with "So" | Start with the content |
| Sentences starting with "Look," | Remove |
| Three or more consecutive paragraphs starting with the same word | Vary the structure |

### Formulaic Transitions

Remove or collapse into implicit flow.

- Furthermore
- Additionally
- In conclusion
- It is important to note
- This highlights that
- This demonstrates that
- Notably

### Rule of Three

AI forces ideas into groups of three. Use two items, or one, or as many as the content genuinely requires.

Before: "The event features keynote sessions, panel discussions, and networking opportunities."
After: "The event has talks, panels, and informal networking."

Better: "The event has talks and panels, with time between sessions for informal conversation."

### Rhetorical Setups

These announce insight instead of delivering it.

- "What if [reframe]?" (followed immediately by the answer)
- "Here's what I mean:" (redundant preview)
- "Think about it:" (condescending prompt)
- "And that's okay." (unnecessary permission)

### Dramatic Fragmentation

Sentence fragments for emphasis read as manufactured profundity.

- "[Noun]. That's it. That's the [thing]." (performative simplicity)
- "X. And Y. And Z." (staccato drama)

Use complete sentences. Trust the content.

---

## Style Rules

### Em Dashes

Em dashes are forbidden. Remove every instance without exception. Rewrite using a comma, full stop, parentheses, or a restructured clause. There is no case in which an em dash should be retained.

Before: "The term is primarily promoted by Dutch institutions -- not by the people themselves -- yet this continues in official documents."
After: "The term is primarily promoted by Dutch institutions, not by the people themselves, yet it continues in official documents."

### Colons

Remove colons that introduce a single clause or phrase where a comma or restructured sentence would read more naturally. Retain colons that introduce a genuine list or a formally introduced quotation.

### Semicolons

Replace overused semicolons with a full stop or a conjunction. Retain semicolons only where two closely related independent clauses genuinely warrant the link.

### Ellipses

Remove ellipses used for theatrical pause or dramatic effect. Retain only in quoted speech where words are genuinely omitted.

### Boldface

Remove bold from mid-sentence phrases used for emphasis. Retain bold only for terms being defined, UI labels, or technical identifiers where a reader might scan for them.

Before: "The team used **OKRs**, **KPIs**, and the **Balanced Scorecard**."
After: "The team used OKRs, KPIs, and the Balanced Scorecard."

### Inline-Header Lists

AI outputs bullet lists where each item opens with a bolded header. Convert to prose where the content allows.

Before:
- **Performance:** Performance improved with optimized algorithms.
- **Security:** Security was strengthened with end-to-end encryption.

After: The update speeds up load times and adds end-to-end encryption.

### Significance Inflation

Remove phrasing that inflates importance without adding information.

Words to watch: "stands as", "serves as a testament to", "marking a pivotal moment", "underscores its importance", "reflects broader", "setting the stage for", "represents a shift", "evolving landscape", "indelible mark"

Before: "The Statistical Institute was established in 1989, marking a pivotal moment in the evolution of regional statistics."
After: "The Statistical Institute was established in 1989 to collect and publish regional statistics independently."

---

## Personality and Soul

Removing slop is only half the job. Clean, voiceless writing is still flat. Good writing has a person behind it.

Signs of soulless writing even after slop removal:

- Every sentence is the same length and structure
- No opinions, just neutral reporting
- No acknowledgment of uncertainty or mixed feelings
- Reads like a press release

How to add voice:

- Have opinions. React to facts, not just report them.
- Vary rhythm. Short punchy sentences. Then longer ones that take their time.
- Acknowledge complexity. "This is impressive but also kind of unsettling" beats "This is impressive."
- Use "I" when it fits. First person is honest, not unprofessional.
- Be specific about feelings. Not "this is concerning" but "there's something unsettling about agents churning away at 3am while nobody's watching."

---

## Scoring

Rate 1-10 on each dimension:

| Dimension | Question |
|-----------|----------|
| Directness | Statements or announcements? |
| Rhythm | Varied or metronomic? |
| Trust | Respects reader intelligence? |
| Authenticity | Sounds human? |
| Density | Anything cuttable? |

Below 35/50: revise.

---

## Pre-Commit Checklist

Run these checks before finalising any document. Do not mark output complete until all pass.

- [ ] Any adverbs? Remove them.
- [ ] Any passive voice? Find the actor. Make them the subject.
- [ ] Any em dashes? Remove every one. Automatic failure if any remain.
- [ ] Any AI vocabulary words (delve, landscape, testament, pivotal, etc.)? Replace or cut.
- [ ] Any throat-clearing openers? Cut to the point.
- [ ] Any binary contrasts ("not X, it's Y")? State Y directly.
- [ ] Any inanimate thing doing a human verb ("the decision emerges")? Name the person.
- [ ] Any Wh- sentence starters (What, When, Where, Who, Why, How)? Restructure.
- [ ] Any sycophantic or chatbot artifacts? Remove entirely.
- [ ] Three or more consecutive sentences of the same length? Break one.
- [ ] Paragraph ends with a punchy one-liner? Vary it.
- [ ] Any vague declaratives ("The implications are significant")? Name the specific implication.
- [ ] Any colons, semicolons, or ellipses appearing more than once per 150 words on average? Reduce them.
- [ ] Any near-verbatim repetition between sections? Retain the best instance and cut the rest.
- [ ] Three or more consecutive paragraphs opening with the same syntactic structure? Vary at least two.

After the checklist: read the text aloud. If any sentence sounds like it came from a template, rewrite it.

---

## Final Audit Pass

After revision, ask: "What still makes this obviously AI-generated?"

Answer briefly with any remaining tells. Then revise to address them.

---

## Failure Modes

- Replacing one pattern with another AI pattern
- Meaning drift from over-editing
- Artificial awkwardness from forced variation
- Clean but soulless output with no personality
- Significant inflation removed but specificity not added
- Passive voice removed but no actor named

---

## Integration

Works in sequence with:

1. Research skill (for factual grounding)
2. This skill (for pattern removal)
3. Style authenticity skill (for human voice)
4. [speculation-control](../speculation-control/SKILL.md): apply alongside this skill when factual rigour and epistemic labeling are also required; this skill removes surface patterns, speculation-control enforces evidentiary discipline

Order of execution:

Research -> Draft -> Slop Removal -> Style Layer -> Final Audit