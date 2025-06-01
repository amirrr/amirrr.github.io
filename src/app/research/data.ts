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
    title: "Explaining Explanations: Understanding Scientific Inquiry",
    summary:
      "A project to systematically characterize, compare, and evaluate scientific explanations across disciplines, using empirical work and LLM tools.",
    description: `
### Project Motivation
This project aims to understand how different scientific fields construct, prioritize, and evaluate explanations—and particularly, how these explanations relate to fields’ methodologies, predictive power, and social trust. We focus on taxonomizing explanations along several dimensions (e.g., mechanistic vs. functional, empirical vs. theoretical, simple vs. complex, individual vs. group level) and observing how these differ by field or audience (scientists, laypeople, managers).
    `,
    links: [],
    year: 2024,
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
