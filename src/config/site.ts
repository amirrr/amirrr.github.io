// src/config/site.ts

interface SiteConfig {
  siteName: string;
  name: {
    first: string;
    last: string;
  };
  title: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
  };
  university?: string;
  aboutMe: string[];
  newsItems: Array<{ date: string; content: string }>;
  footerGhUser: {
    name: string;
    url: string;
  };
  profileImage: string | undefined;
  profileImageAlt: string;
}

export const siteConfig: SiteConfig = {
  siteName: "Amir N.",
  name: {
    first: "Amir.",
    last: "Nakhaei",
  },
  title: "Software Engineer",
  email: "amirhossein.nakhaei@rwth-aachen.de",
  socials: {
    github: "https://github.com/amirrr",
    linkedin: "https://www.linkedin.com/in/ahnakhaei",
  },
  university: undefined,
  aboutMe: [
    "My name’s Amirhossein, but everyone just calls me Amir. I got my bachelor’s in software engineering and then went on to do a master’s in computational social science.",
    `I’m a co-founder of the <a class="underline" target="_blank" href="https://www.eranshahr.com">Eranshahr project</a>, where we introduce people to Iranian culture and share its beauty with the world. On top of that, I collaborate with the <a class="underline" target="_blank" href="https://css.seas.upenn.edu">CSS Lab</a> at the University of Pennsylvania on projects that focus on understanding people and building tools to help researchers and practitioners.`,
    `You can find out more about my ongoing research and projects on my <a class="underline" href="/research">research</a> page.`,
  ],
  newsItems: [
    {
      date: "July 2025",
      content:
        "Doing a tutorial on our research cartography platfrom <a class='underline' target='_blank' href='https://atlas.seas.upenn.edu'>Atlas</a> at the International Conference on Computational Social Science (IC2S2 2025) in Norrköping.",
    },
    {
      date: "July 2024",
      content:
        "My thesis got accepted for a talk at the International Conference on Computational Social Science (IC2S2 2024) in Philadelphia.",
    },
    {
      date: "January 2024",
      content:
        "Started my new role as a Software Engineer at Systems Lab 21 GmbH.",
    },
  ],
  footerGhUser: {
    name: "github",
    url: "https://github.com/amirrr",
  },
  profileImage: "/images/profile.png",
  profileImageAlt: "Profile picture of Amirhossein Nakhaei",
};
