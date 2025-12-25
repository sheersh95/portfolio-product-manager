export interface Project {
  title: string;
  company: string;
  description: string;
  problem: string;
  solution: string;
  impact: string[];
  role: string;
  technologies: string[];
  image: string;
  metrics: { label: string; value: string }[];
}

export const projects = [
  {
    title: "Automated Carrier Assignment System",
    company: "WiseTech Global",
    description:
      "Designed intelligent carrier assignment system for warehouse and transportation management",
    problem:
      "Manual carrier assignment led to inefficient routing and empty container trips",
    solution:
      "Built automated system using data-driven algorithms to optimize carrier selection",
    impact: [
      "20% reduction in empty container trips",
      "Improved operational efficiency",
      "Enhanced route optimization",
    ],
    role: "Product Specialist - Led design, stakeholder alignment, and implementation",
    technologies: ["Figma", "Jira", "Lucid Chart", "Confluence"],
    image: "/images/project-1.svg",
    metrics: [
      { label: "Empty Trips Reduced", value: "20%" },
      { label: "Client Deployments", value: "7" },
      { label: "Client Satisfaction", value: "92%" },
    ],
  },
  {
    title: "Street Turn Optimization Feature",
    company: "WiseTech Global",
    description: "Developed street turn optimization to maximize container utilization",
    problem: "Inefficient container repositioning causing operational delays",
    solution:
      "Created optimization algorithm to enable direct container transfers between shippers",
    impact: [
      "92% client satisfaction ratings",
      "Reduced operational costs",
      "Improved container turnaround time",
    ],
    role: "Product Specialist - Full lifecycle from conception to deployment",
    technologies: ["Figma", "Jira", "Agile methodology"],
    image: "/images/project-2.svg",
    metrics: [
      { label: "Client Satisfaction", value: "92%" },
      { label: "Features Delivered", value: "10+" },
      { label: "Implementation Time", value: "6 months" },
    ],
  },
  {
    title: "Enterprise Credit Tracking System for Kuehne + Nagel",
    company: "Blume Global",
    description:
      "Led implementation of credit tracking and invoicing systems for world's largest freight forwarder",
    problem: "Manual credit tracking led to billing errors and delayed invoicing",
    solution:
      "Designed and implemented automated credit tracking with real-time invoicing",
    impact: [
      "Secured $37.82B company as client",
      "Streamlined billing operations",
      "Reduced invoicing errors",
    ],
    role: "Product Analyst - Key contributor to securing major enterprise client",
    technologies: ["Jira", "Confluence", "SQL", "Agile"],
    image: "/images/project-3.svg",
    metrics: [
      { label: "Client Value", value: "$37.82B" },
      { label: "Features Built", value: "200+" },
      { label: "Team Size", value: "4+ teams" },
    ],
  },
] as const satisfies ReadonlyArray<Project>;
