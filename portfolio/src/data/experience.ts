export interface Experience {
  company: string;
  title: string;
  location: string;
  duration: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  technologies: string[];
}

export const experiences = [
  {
    company: "WiseTech Global",
    title: "Product Specialist, R&D Division",
    location: "Bengaluru, India",
    duration: "April 2024 - June 2025",
    startDate: "2024-04",
    endDate: "2025-06",
    achievements: [
      "Designed automated carrier assignment and street turn optimization, reducing empty container trips by 20%",
      "Led implementation across 7 client deployments with 92% satisfaction ratings",
      "Delivered third-party integrations improving reporting efficiency by 30%",
      "Developed 10+ interactive prototypes cutting feedback loops by 3-4 iterations",
    ],
    technologies: ["Figma", "Jira", "Lucid Chart", "Confluence"],
  },
  {
    company: "Blume Global",
    title: "Product Analyst, R&D Division",
    location: "Bengaluru, India",
    duration: "March 2022 - March 2024",
    startDate: "2022-03",
    endDate: "2024-03",
    achievements: [
      "Built product design for 200+ proprietary features across 3 projects",
      "Composed product strategy presentations in 10+ client sessions, driving 20% increase in engagement",
      "Spearheaded implementation of credit tracking and invoicing systems for Kuehne + Nagel ($37.82B company)",
      "Directed 12+ demos per quarter reducing onboarding time by 25%",
      "Analyzed performance metrics lowering defect count by 30%",
    ],
    technologies: ["Jira", "Agile", "Scrum", "Confluence"],
  },
  {
    company: "Blume Global",
    title: "Quality Analyst, QA Division",
    location: "Bengaluru, India",
    duration: "April 2021 - March 2022",
    startDate: "2021-04",
    endDate: "2022-03",
    achievements: [
      "Directed functional testing for 7 client flows",
      "Enhanced 1,000+ test cases improving coverage by 40%",
    ],
    technologies: ["TestRail", "Jira"],
  },
  {
    company: "Blume Global",
    title: "Associate Analyst, R&D Division",
    location: "Bengaluru, India",
    duration: "August 2020 - March 2021",
    startDate: "2020-08",
    endDate: "2021-03",
    achievements: [
      "Optimized carrier selection lowering freight costs by 9% over two quarters",
    ],
    technologies: ["Analytics platform", "SQL"],
  },
  {
    company: "Marriott International Inc",
    title: "Intern, HR & Finance",
    location: "Indore, India",
    duration: "April 2019 - June 2019",
    startDate: "2019-04",
    endDate: "2019-06",
    achievements: [
      "Hired and trained 5 interns",
      "Managed 100+ bill transfers using Opera Software and Excel",
    ],
    technologies: ["Opera Software", "Excel"],
  },
] as const satisfies ReadonlyArray<Experience>;
