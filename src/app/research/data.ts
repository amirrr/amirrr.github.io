export interface ProjectLink {
  name: string;
  url: string;
}

export interface Research {
  id: string;
  title: string;
  summary: string;
  description: string; // Detailed content (Markdown) - will be used by detail components
  links: ProjectLink[];
  year: number;
  status: "Completed" | "Ongoing" | "Concept";
}

export const researchs: Research[] = [
  // Variable name can remain projects
  {
    id: "explaining-explanations",
    title:
      "Systematic preferences among causal explanations of spurious correlations",
    summary:
      "Why are some causal stories more convincing than others? A study of how the shape of an explanation, rather than its truth, drives conviction.",
    description: `
### The question

People rarely meet a pattern as neutral observers. Shown a statistical
association, we reach for a causal story, even when the association is
completely spurious. That raises a question worth measuring: are some kinds of
causal explanation systematically more convincing than others, and if so, what
decides it?

This matters beyond the lab. Unfounded causal beliefs sit underneath real
threats to public health, social cohesion, and environmental policy, so knowing
*why* certain explanations land is useful for anyone trying to counter them.

### Design

We surveyed explanatory taxonomies across scientific, biological,
psychological, social, and contextual categories (29 types in all) and
consolidated them into three structures borrowed from the language of causal
inference:

- **Confounder**: a hidden common cause, \`A ← C → B\`
- **Parallel mediation**: two independent paths, \`A → M₁ → B\` and \`A → M₂ → B\`
- **Chained mediation**: one long path, \`A → M₁ → M₂ → M₃ → B\`

Stimuli came from Tyler Vigen's collection of 9,211 spurious correlations,
filtered by hand and with model assistance down to 100 that were statistically
spurious yet plausibly explainable. Using spurious correlations is the key
design decision: since every association is an artifact of its sampling period,
any conviction a participant reports comes from the *structure* of the
explanation, not from the claim being true. We generated three explanations per
causal direction, 600 in total.

In the pilot, 255 Prolific participants (US and UK, ages 20–80) each saw 10
correlations and chose between two competing explanations, rating conviction on
a four-point scale. That gives 2,550 head-to-head ratings, analysed with a
Bradley–Terry model to recover the latent strength of each explanation type.

### What the pilot found

**Explanatory seduction is pervasive but bounded.** The modal conviction rating
for a winning explanation was "moderately convinced", not "very convinced".
People seem to judge whether a causal story *hangs together* rather than whether
it is *true*, settling on moderate credence for anything structurally coherent.

**Confounders win by default,** taking roughly 50% of matchups against a 33%
chance baseline. A single hidden common cause is the most parsimonious story
that accounts for two things moving together.

**The ranking reverses under high conviction.** Where both explanations were
rated highly convincing, parallel mediators overtook confounders. At least two
evaluation modes appear to be at work: casual engagement rewards simplicity,
deeper engagement rewards robustness. Two independent pathways mean that if one
mechanism looks shaky, the other still carries the link. This shift from
parsimony to overdetermination as engagement deepens is, as far as we know, new.

**Serial complexity is penalised, not rewarded.** We expected longer chains to
be more persuasive. They were the least preferred type in nearly every
subgroup. A three-step chain asks you to believe three sequential links, any of
which could break, so chains read as contrived rather than detailed. Put
differently: *parallel* complexity is rewarded, *serial* complexity is punished.

**Preferences hold across cognitive reflection.** The ordering was broadly
stable across Cognitive Reflection Test scores. If that survives the
confirmatory sample, explanation-type preference looks less like a heuristic
that reflective thinkers overcome and more like a structural feature of how we
evaluate explanations.

### Where it stands

The five pilot findings are being pre-registered with a fixed analysis plan,
and tested on a fresh sample recruited after acceptance. Sample size is set by
the most demanding hypothesis, the conviction reversal, which needs roughly 240
matchups of the relevant pair; since only about 20% of matchups are
high-conviction, that implies around 360 participants before attrition.

If it holds, the result is that preference among causal explanations is shaped
by causal architecture, and the challenge of countering unfounded beliefs is
partly a question of causal geometry.

Presented at IC2S2 2026 with Sam Zhang and Mark E. Whiting.
    `,
    links: [],
    year: 2026,
    status: "Ongoing",
  },
  {
    id: "global-common-sense-study",
    title: "Global Common Sense Study",
    summary:
      'A large-scale survey exploring variations in common sense across different languages and cultures, building on the "Framework for Quantifying Common Sense".',
    description: `
### Advancing Our Understanding of Collective Common Sense

This research expands on the foundational work presented in the PNAS paper, ["A Framework for Quantifying Individual and Collective Common Sense"](https://www.pnas.org/doi/10.1073/pnas.2309535121). We are conducting a large-scale common sense survey, translated into multiple languages, to understand how perceptions of common sense vary among individuals and across different cultural contexts worldwide. Our approach allows us to define and measure an individual's "commonsensicality" as described in related research (see "Individual commonsensicality" paper linked below).

Our goal is to build a comprehensive map of what humans collectively deem to be 'common sense' and to explore the factors that shape these judgments.
    `,
    links: [
      {
        name: "Common Sense Platform",
        url: "https://commonsense.seas.upenn.edu/",
      },
      {
        name: "GitHub Repository",
        url: "https://github.com/Watts-Lab/commonsense-platform/",
      },
      {
        name: "PNAS Paper on Individual Commonsensicality",
        url: "https://www.pnas.org/doi/10.1073/pnas.2309535121",
      },
    ],
    year: 2024,
    status: "Ongoing",
  },
];
