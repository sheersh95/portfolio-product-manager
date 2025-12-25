"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { IconType } from "react-icons";
import { MdRocket, MdThumbUp, MdTrendingUp, MdWork } from "react-icons/md";
import { useEffect, useMemo, useRef, useState } from "react";

import { event } from "@/lib/gtag";

type HighlightCard = {
  icon: IconType;
  stat: string;
  description: string;
};

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const highlightCards: readonly HighlightCard[] = useMemo(
    () => [
      {
        icon: MdWork,
        stat: "4+ Years",
        description: "Product Management Experience",
      },
      {
        icon: MdThumbUp,
        stat: "92%",
        description: "Client Satisfaction",
      },
      {
        icon: MdTrendingUp,
        stat: "20-30%",
        description: "Metric Improvements",
      },
      {
        icon: MdRocket,
        stat: "200+",
        description: "Features Shipped",
      },
    ],
    [],
  );

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
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const container: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  }; 

  const cardsContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const card: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4">
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2"
        variants={container}
        initial="hidden"
        animate={isVisible ? "show" : "hidden"}
      >
        <motion.div variants={item}>
          <h2 className="mb-6 text-4xl font-bold text-dark-navy">About Me</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            I&apos;m Sakshi Bhargava, a Product Manager with 4+ years of experience building
            B2B SaaS products that optimize supply chain operations. Currently pursuing my
            MBA at Simon Business School with a concentration in Product Management, I&apos;ve
            led cross-functional teams to deliver features that have reduced operational
            costs by 20%+ and achieved 92% client satisfaction ratings.
            <br />
            <br />
            My expertise spans the entire product lifecycle—from conducting user research
            and defining roadmaps to collaborating with engineering teams and driving
            product launches. I&apos;m passionate about leveraging data and technology to
            solve complex logistics challenges and create measurable business impact.
          </p>

          <div className="mt-8">
            <a
              href="/Sakshi_Bhargava_Resume.pdf"
              download
              className="inline-flex items-center justify-center rounded-md bg-primary-blue px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-blue/90"
              onClick={() => event("resume_download", { method: "about_button" })}
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        <motion.div variants={cardsContainer} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {highlightCards.map((c) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.description}
                variants={card}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-light-gray p-3 text-primary-blue">
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-blue">{c.stat}</div>
                    <div className="mt-1 text-gray-600">{c.description}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
