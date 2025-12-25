"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { event } from "@/lib/gtag";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  const handleScrollToProjects = useCallback(() => {
    const el = document.getElementById("projects");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const container: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section
      className="h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-center px-4 md:px-6">
        <motion.div
          variants={container}
          initial={false}
          animate={mounted ? "show" : "hidden"}
          className="flex w-full max-w-3xl flex-col items-center text-center"
        >
          <motion.p variants={item} className="text-lg text-neutral-500">
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-3 text-4xl font-bold text-dark-navy md:text-7xl"
          >
            Sakshi Bhargava
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-xl text-neutral-500 md:text-2xl"
          >
            MBA Candidate @ Simon Business School | Product Manager
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-2xl text-lg text-gray-600 md:text-xl"
          >
            Building products that drive operational excellence in supply chain technology
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <motion.button
              type="button"
              onClick={handleScrollToProjects}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="rounded-md bg-primary-blue px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-blue/90"
            >
              View Projects
            </motion.button>

            <motion.a
              href="/Sakshi_Bhargava_Resume.pdf"
              download
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="rounded-md border border-primary-blue px-7 py-3 text-base font-semibold text-primary-blue transition-colors hover:bg-primary-blue hover:text-white"
              onClick={() => event("resume_download", { method: "hero_button" })}
            >
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
