"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { IconType } from "react-icons";
import { FaGitAlt } from "react-icons/fa";
import {
  MdBugReport,
  MdDashboard,
  MdDataUsage,
  MdGridOn,
  MdOutlineIntegrationInstructions,
  MdQueryStats,
  MdTag,
} from "react-icons/md";
import {
  SiConfluence,
  SiFigma,
  SiJira,
  SiMysql,
} from "react-icons/si";
import { useEffect, useMemo, useRef, useState } from "react";

import { experiences, type Experience as ExperienceType } from "@/data/experience";

type TechBadge = {
  name: string;
  Icon: IconType;
};

function getTechIcon(tech: string): IconType {
  const t = tech.toLowerCase();

  if (t.includes("jira")) return SiJira;
  if (t.includes("confluence")) return SiConfluence;
  if (t.includes("figma")) return SiFigma;
  if (t.includes("lucid")) return MdDashboard;
  if (t === "sql" || t.includes("mysql")) return SiMysql;
  if (t.includes("excel")) return MdGridOn;
  if (t.includes("testrail") || t.includes("test rail")) return MdBugReport;
  if (t.includes("integration")) return MdOutlineIntegrationInstructions;
  if (t.includes("git")) return FaGitAlt;
  if (t.includes("analytics")) return MdQueryStats;
  if (t.includes("data")) return MdDataUsage;

  return MdTag;
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const items: readonly ExperienceType[] = experiences;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariants: Variants = {
    hidden: (custom: { index: number; desktop: boolean }) => {
      if (!custom.desktop) {
        return { opacity: 0, y: 18 };
      }
      const fromLeft = custom.index % 2 === 0;
      return { opacity: 0, x: fromLeft ? -24 : 24, y: 0 };
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const experienceBadges = useMemo(() => {
    return items.map((exp) => {
      const badges: TechBadge[] = exp.technologies.map((name) => ({
        name,
        Icon: getTechIcon(name),
      }));
      return badges;
    });
  }, [items]);

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-4xl font-bold text-dark-navy">Experience</h2>

        <div className="relative">
          <div className="absolute left-2 top-0 h-full w-1 rounded bg-blue-200" />

          <motion.div
            variants={container}
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
            className="flex flex-col gap-10"
          >
            {items.map((exp, idx) => {
              const isExpanded = Boolean(expanded[idx]);
              const achievements = isExpanded ? exp.achievements : exp.achievements.slice(0, 3);
              const canExpand = exp.achievements.length > 3;

              return (
                <motion.div
                  key={`${exp.company}-${exp.title}-${exp.startDate}`}
                  custom={{ index: idx, desktop: isDesktop }}
                  variants={cardVariants}
                  className="relative pl-10"
                >
                  <div className="absolute left-0 top-7 h-4 w-4 rounded-full bg-primary-blue ring-4 ring-white" />

                  <div className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                    <div className="text-2xl font-bold text-dark-navy">{exp.company}</div>
                    <div className="mt-1 text-xl text-primary-blue">{exp.title}</div>
                    <div className="mt-2 text-gray-600">
                      {exp.location} • {exp.duration}
                    </div>

                    <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
                      {achievements.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>

                    {canExpand ? (
                      <button
                        type="button"
                        className="mt-4 text-sm font-semibold text-primary-blue hover:underline"
                        onClick={() =>
                          setExpanded((prev) => ({
                            ...prev,
                            [idx]: !prev[idx],
                          }))
                        }
                      >
                        {isExpanded ? "Show less" : "Show more"}
                      </button>
                    ) : null}

                    <div className="mt-6 flex flex-wrap gap-2">
                      {experienceBadges[idx]?.map(({ name, Icon }) => (
                        <span
                          key={name}
                          className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-primary-blue"
                        >
                          <Icon size={14} />
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
