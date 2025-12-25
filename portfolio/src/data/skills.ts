import type { IconType } from "react-icons";
import { FaBrain, FaGitAlt, FaLightbulb } from "react-icons/fa";
import { GiAgave } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import {
  MdApi,
  MdBugReport,
  MdChat,
  MdDashboard,
  MdGridOn,
  MdGroup,
  MdQueryStats,
  MdTimeline,
} from "react-icons/md";
import {
  SiConfluence,
  SiFigma,
  SiJira,
  SiMysql,
  SiPostman,
} from "react-icons/si";

export interface Skill {
  name: string;
  icon: IconType;
  proficiency?: "Beginner" | "Intermediate" | "Advanced";
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skillCategories = [
  {
    category: "Product Management Tools",
    skills: [
      { name: "Jira", icon: SiJira },
      { name: "Confluence", icon: SiConfluence },
      { name: "Figma", icon: SiFigma },
      { name: "Lucid Chart", icon: MdDashboard },
      { name: "Pave", icon: MdTimeline },
      { name: "TestRail", icon: MdBugReport },
      { name: "Postman", icon: SiPostman },
    ],
  },
  {
    category: "Technical Skills",
    skills: [
      { name: "SQL", icon: SiMysql },
      { name: "Excel Advanced", icon: MdGridOn },
      { name: "Agile/Scrum", icon: GiAgave },
      { name: "Git", icon: FaGitAlt },
      { name: "API Testing", icon: MdApi },
    ],
  },
  {
    category: "Soft Skills",
    skills: [
      { name: "Stakeholder Management", icon: HiUserGroup },
      { name: "Cross-functional Leadership", icon: MdGroup },
      { name: "Client Communication", icon: MdChat },
      { name: "Data Analysis", icon: MdQueryStats },
      { name: "Strategic Thinking", icon: FaBrain },
      { name: "Problem Solving", icon: FaLightbulb },
    ],
  },
] as const satisfies ReadonlyArray<SkillCategory>;
