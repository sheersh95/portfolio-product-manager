"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { skillCategories, type Skill, type SkillCategory } from "@/data/skills";

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const categoryVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const skillsGridVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const skillCardVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const renderProficiency = (skill: Skill) => {
    if (!skill.proficiency) return null;

    const label = skill.proficiency;
    return (
      <span className="mt-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary-blue">
        {label}
      </span>
    );
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
        >
          <h2 className="mb-16 text-center text-4xl font-bold text-dark-navy">
            Skills &amp; Technologies
          </h2>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category: SkillCategory) => (
              <motion.div key={category.category} variants={categoryVariants}>
                <h3 className="mb-8 text-2xl font-semibold text-dark-navy">
                  {category.category}
                </h3>

                <motion.div
                  variants={skillsGridVariants}
                  initial={false}
                  animate={isVisible ? "show" : "hidden"}
                  className="grid grid-cols-2 gap-4"
                >
                  {category.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={`${category.category}-${skill.name}`}
                        variants={skillCardVariants}
                        whileHover={{ y: -4 }}
                        className="flex min-h-[140px] flex-col items-center justify-center rounded-xl bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-lg"
                      >
                        <div className="text-primary-blue">
                          <Icon size={48} />
                        </div>
                        <div className="mt-3 text-lg font-medium text-dark-navy">
                          {skill.name}
                        </div>
                        {renderProficiency(skill)}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
