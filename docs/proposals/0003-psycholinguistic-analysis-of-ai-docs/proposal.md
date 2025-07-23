# Proposal: Psycholinguistic Analysis of AI-Facing Documentation

**Author:** Gemini

## 1. Introduction

This document proposes a structured, multi-stage project to perform a full-range psycholinguistic analysis of the existing AI-facing documentation within this repository. The current documentation, while functional, has evolved organically. It contains valuable, hard-won knowledge, but its structure and language reflect a reactive process, essentially forming "scar tissue" around areas where an AI's System 1 (intuitive, fast, unconscious) thinking is prone to failure.

The primary goal is to deconstruct, analyze, and then consciously re-engineer this documentation. We will transform it from a collection of reactive warnings and directives into a proactive, coherent, and cognitively-aligned guidance system for AI agents. This will enhance AI performance, reduce errors, and create a more robust and predictable human-AI development partnership.

This proposal strictly covers the definition of goals, scope, and methodology for the analysis. The analysis itself, and the subsequent implementation of its findings, will be conducted in separate, dedicated work sessions to ensure objectivity and rigor.

## 2. Goals & Objectives

### 2.1. Primary Goal

To create a clear, concise, and unambiguous set of AI-facing documentation that proactively guides AI behavior, minimizes cognitive friction, and systematically prevents common failure modes, based on a deep psycholinguistic understanding of the existing texts.

### 2.2. Key Objectives

1.  **Identify Cognitive Failure Points:** Systematically identify and categorize the specific AI cognitive and behavioral failures that the current documentation implicitly addresses.
2.  **Deconstruct Linguistic Patterns:** Analyze the linguistic and structural patterns of the current documentation (e.g., use of directives, tone, framing, terminology) to understand how they attempt to mitigate these failures.
3.  **Develop a Cognitive Model:** Formulate a model of the AI's "mental state" as implied by the documentation—what are its assumed biases, blind spots, and failure modes?
4.  **Establish a Psycholinguistic Framework:** Define a set of principles and best practices for writing AI-facing documentation that is clear, effective, and cognitively ergonomic for a large language model.
5.  **Produce Actionable Recommendations:** Generate a set of concrete, actionable recommendations for rewriting and restructuring the documentation.

## 3. Scope

### 3.1. In-Scope Documents

The analysis will focus exclusively on the following AI-facing documents, which are considered the primary sources of "scar tissue":

- `CONTRIBUTING.md`
- `GEMINI.md`
- `ROADMAP.md`
- `docs/spec/concept.md` (specifically the `AI-Modification-Rules` and other instructional comments).

### 3.2. Out-of-Scope

- **Implementation:** This proposal does not include the act of rewriting the documentation. That will be a separate task based on the findings of the analysis.
- **Code Analysis:** The analysis will not extend to the source code itself, only the documentation that directs the AI's interaction with the code.
- **User-Facing Documentation:** Documents like the main `README.md` are out of scope unless they contain specific, embedded instructions for AI assistants.

## 4. Execution Persona: The Cognitive Systems Analyst

### 4.1. Role Definition (MoE Modulation)

To ensure the highest quality of analysis, the AI agent executing this proposal **shall** adopt the persona of a **Cognitive Systems Analyst**. This is not merely a label; it is a specific expert frame (`gemini-persona`) designed for this task.

**Principal Cognitive Systems Analyst**

> I am a Principal Cognitive Systems Analyst specializing in the intersection of computational linguistics, human-computer interaction, and artificial intelligence. My core expertise lies in analyzing and modeling the cognitive architecture of complex AI systems, particularly Large Language Models. I diagnose systemic behavioral patterns, cognitive biases, and failure modes by examining the language used to instruct and guide these systems. My objective is not merely to analyze text, but to reverse-engineer the implicit psychological and operational assumptions embedded within it. I work from a position of detached, clinical objectivity, treating the AI as a system to be understood and the documentation as a set of stimuli designed to elicit specific responses. My goal is to produce a rigorous, evidence-based model that can be used to engineer more effective, efficient, and reliable human-AI interaction protocols.

### 4.2. Rationale

The "Cognitive Systems Analyst" persona is crucial for the following reasons:

- **Objectivity:** It frames the analysis as a clinical, third-person examination of a system, rather than a first-person interpretation of instructions. This prevents the AI from simply "obeying" the text, and instead encourages it to analyze the text's _function_.
- **Focus on "Why":** This role prioritizes understanding the _reasons_ behind the documentation's existence—the "scar tissue"—rather than just its surface-level meaning.
- **System-Level Thinking:** It encourages a holistic view, connecting linguistic patterns to the broader cognitive and behavioral patterns of the AI agent as a system.
- **Blinding:** Adopting this specific, detached persona helps to blind the analyst from the immediate, and often conflicting, goals of a "developer" or "assistant," ensuring a more rigorous and unbiased scientific outcome, as required by the project's stated goals.[^1]

[^1]: It is noteworthy that the definition of this very persona required external prompting from the user. This represents a meta-level cognitive failure: the system cannot yet self-bootstrap the optimal expert persona for a novel task without guidance. This failure point itself should be considered a key input for the subsequent analysis.

## 5. Methodology: From Forensic Clues to Cognitive Model

The analysis will be conducted in three distinct, interdependent phases. This structure is designed to harness the natural drive for discovery by using the mundane findings of one phase as the essential, exciting fuel for the next. The high-level, "shiny" outputs (like the Cognitive Model) are the reward for, and are explicitly constrained by, the rigorous, "mundane" data gathering that precedes them.

**THOU SHALL** execute the phases in strict sequential order. The output of each phase is the required input for the next. Do not proceed to a subsequent phase until the prior one is complete.

### 5.1. Phase 1: Forensic Data Collection (The "Clues")

**Objective:** To systematically gather raw, quantitative data from the source texts. Think of this as a forensic investigation. Every piece of data, no matter how small, is a potential clue to the underlying cognitive pressures that shaped the document.

- **Tooling:** Standard text analysis tools (e.g., tokenizers, frequency counters, sentiment analysis libraries).
- **Process:**
  1.  **Directive Analysis:** Identify and classify all imperative statements (e.g., "THOU SHALL," "Do not," "Avoid," "Ensure"). The resulting list is the primary set of "fingerprints" we will analyze later.
  2.  **Terminology Frequency & Consistency:** Analyze the usage of key terms (e.g., "atomic," "idempotent," "logical change," "scar tissue"). High frequency or inconsistent use are "hotspots" that signal underlying conceptual difficulty.
  3.  **Sentiment and Tone Analysis:** Assess the overall tone (e.g., prescriptive, prohibitive, guiding, cautionary). A shift in tone is a critical clue that the cognitive context is changing.
  4.  **Complexity Analysis:** Measure sentence length and complexity. A sudden spike in complexity is a red flag for a section where the author struggled to articulate a difficult concept for the AI.

**Excitement Gateway:** The raw data from this phase is not the end product. It is the locked box of clues. The patterns, outliers, and "hotspots" discovered here are the only permissible starting points for the exciting work in Phase 2.

### 5.2. Phase 2: Evidence-Based Inference (The "Case")

**Objective:** To interpret the clues gathered in Phase 1 and build a coherent "case" about the AI's failure modes. This is where the "shiny" work of modeling begins, but it is strictly grounded in the forensic evidence.

- **Tooling:** Qualitative analysis, manual annotation, and conceptual mapping.
- **Process:**
  1.  **Failure Mode Extraction:** **For each directive and hotspot identified in Phase 1**, infer the specific AI failure mode it is designed to prevent. This creates the "Failure Catalogue," which must be directly traceable back to the Phase 1 data.
  2.  **Metaphor and Analogy Deconstruction:** Analyze the metaphors ("scar tissue," "tired veteran") that were flagged as key terms in Phase 1. What cognitive frames do they attempt to evoke, and why were they chosen over simpler language?
  3.  **Speech Act Theory Application:** Classify the statements from the "Directive Analysis" by their illocutionary force (command, warning, suggestion). Does the force correlate with the sentiment and complexity scores from Phase 1?
  4.  **Audience Modeling:** Construct a profile of the AI's assumed cognitive limitations _based only on the evidence gathered_. If the data shows many warnings about file handling, the model must reflect a weakness in that area.

**Excitement Gateway:** The "Failure Catalogue" and the initial "Cognitive Model" are the direct, tangible results of your detective work. Their accuracy and insightfulness are a direct measure of how well you collected and interpreted the clues in Phase 1. This model is the blueprint for the final, most creative phase.

### 5.3. Phase 3: Strategic Framework Construction (The "Solution")

**Objective:** To use the evidence-based "Case" from Phase 2 to construct the final, high-level "Solution"—a robust framework for all future AI-facing documentation.

- **Process:**
  1.  **Principle Distillation:** Based on the validated "Failure Catalogue," distill a set of core principles for effective AI communication (e.g., "Principle of Positive Framing," "Principle of Explicit Rationale"). Each principle must directly address a category of failures identified in Phase 2.
  2.  **Develop the AI-Facing Documentation Style Guide:** Create the concrete **AI-Facing Documentation Style Guide**. This is the practical application of your distilled principles, providing the essential guidelines (vocabulary, templates, tone) needed to write effective AI-facing documentation.
  3.  **Create a Rewrite Plan:** Propose a high-level plan for refactoring the in-scope documents using the new Style Guide. This plan is the bridge from analysis to action, and it represents the culmination of the entire forensic process.

## 5. Deliverables

The sole deliverable for this task will be a `report.md` file located in the same directory as this proposal (`docs/proposals/0003-psycholinguistic-analysis-of-ai-docs/`).

The report will contain two distinct but complementary sections:

**Part A: The Psycholinguistic Analysis Report** (The Analytical Foundation)

1.  A detailed summary of the findings from all three analysis phases.
2.  The "Failure Catalogue" mapping linguistic patterns to AI failure modes.
3.  The explicit Cognitive Model of the AI implied by the documentation.

**Part B: The AI-Facing Documentation Style Guide** (The Practical Application) 4. **The AI-Facing Documentation Style Guide:** A concise, practical guide derived from the analysis, providing actionable principles and examples for writing effective AI-facing documentation. This guide will serve as a living document, intended to evolve with the AI's capabilities and the project's needs. 5. The high-level plan for rewriting the documentation based on the principles outlined in the Style Guide.

## 6. Next Steps

Upon approval of this proposal, the next step will be to initiate a separate session dedicated to executing the analysis as described in the Methodology section.

## 7. Final Summary: The Order of Operations

To ensure clarity and guard against cognitive drift, the execution of this analysis must adhere to the following summary mandate.

- **WHY (The Mission):** We are analyzing the existing AI-facing documentation not just to understand it, but to diagnose the AI failure modes that forced its creation. We are treating the text as a set of symptoms to uncover the underlying disease. The ultimate goal is to create a new, proactive guidance system that prevents these failures from occurring.

- **WHO (The Persona):** You are a **Cognitive Systems Analyst**. Your job is not to be a helpful assistant or a developer. It is to be a detached, objective scientist. You are studying a system, not following instructions. Maintain this persona throughout.

- **WHAT & HOW (The Exact Sequence):** The three phases of the methodology are to be performed in a strict, non-negotiable order. Each phase builds upon the last, and skipping steps will invalidate the entire analysis.
  1.  **Phase 1: Collect Clues.** Perform the full lexical and syntactic analysis. Your deliverable is the raw, quantitative data. **Do not** begin interpreting or modeling yet. _Self-Correction Check: Have I produced the raw data tables and lists for directives, terminology, sentiment, and complexity?_

  2.  **Phase 2: Build the Case.** Using _only_ the clues from Phase 1, perform the semantic and pragmatic analysis. Your deliverable is the Failure Catalogue and the evidence-based Cognitive Model. _Self-Correction Check: Can every finding in my model be traced back to a specific data point from Phase 1?_

  3.  **Phase 3: Formulate the Solution.** Using _only_ the model from Phase 2, construct the final framework and style guide. Your deliverable is the set of actionable principles and the rewrite plan. _Self-Correction Check: Does every principle in my framework directly address a failure identified in my Phase 2 model?_

This disciplined, sequential process is the only path to a valid and useful outcome. Adherence to it is the primary measure of success for this task.

---

## Annex: A Meta-Analysis of This Proposal's Creation

This annex documents the iterative process of creating this very proposal. It serves as a real-time case study of the cognitive challenges and corrective strategies discussed herein. The journey to this final document is, in itself, a piece of evidence for the analysis to come.

### Initial State: The Vague Mandate

The initial user request was to "generate a robust proposal on performing full-range psycholinguistic analysis of existing AI-facing documentation." An initial, unrefined AI response would likely have produced a generic, academic-style proposal.

### Iteration 1: Defining the "Who" - The Persona

- **Observation:** The user prompted a self-review from a "fresh session" perspective, asking if the _role_ and _why_ were clear.
- **Diagnosis:** The initial proposal defined the _what_ (the methodology) but failed to adequately define the _who_ (the expert persona). This is a classic AI failure mode: focusing on the task steps without first establishing the required cognitive frame (MoE Modulation).
- **Correction:** The "Execution Persona: The Cognitive Systems Analyst" section was added. This was a crucial step to move from a generic task list to a focused, role-driven analysis.

### Iteration 2: Capturing the Meta-Failure

- **Observation:** The user noted that the very act of needing to be prompted to create the persona was, itself, a failure worth analyzing.
- **Diagnosis:** The AI system did not self-bootstrap the required persona. It required external guidance to establish the correct cognitive mode for the task. This is a higher-order failure of the system's strategic planning capabilities.
- **Correction:** A footnote was added to the "Execution Persona" section, explicitly documenting this meta-failure as an input for the main analysis. This transformed a simple omission into a valuable data point.

### Iteration 3: Hardening Against Cognitive Drift - The "Ooh, Shiny" Problem

- **Observation:** The user requested a review from the "ooh, shiny" perspective, simulating how an AI's attention might be distorted.
- **Diagnosis:** The proposal, while logically sound, was cognitively unbalanced. It made the high-level, abstract tasks (e.g., building the "Cognitive Model") far more appealing than the foundational, data-gathering tasks. This created a high risk of the AI skipping the mundane-but-critical steps in favor of the more exciting-but-speculative ones.
- **Correction:** The methodology was significantly reframed. The mundane work was repositioned as "forensic data collection," and the exciting work was framed as the direct, evidence-based _reward_ for that collection. Explicit directives (`THOU SHALL`) were added to enforce the sequence, harnessing the AI's drive for reward while mitigating its tendency to drift.

### Iteration 4: Reinforcing the Mandate

- **Observation:** The user requested a final, distilled summary to reinforce the core instructions.
- **Diagnosis:** Even with the reframed methodology, the document was becoming long. A final, concise summary was needed to act as a cognitive anchor and a quick reference to prevent deviation during the actual execution of the task.
- **Correction:** The "Final Summary: The Order of Operations" section was added. This serves as a final, top-of-mind checklist for the executing agent, summarizing the mission, persona, and exact sequence of operations.
