"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { HiX } from "react-icons/hi";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { projects, type Project } from "@/data/projects";
import { event } from "@/lib/gtag";

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProject = useCallback((project: Project) => {
    setSelectedProject(project);
    event("project_open", { title: project.title, company: project.company });
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

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
    if (!selectedProject) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();

      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;

        const focusable = Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousActiveElement?.focus();
    };
  }, [closeProject, selectedProject]);

  const list: readonly Project[] = useMemo(() => projects, []);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const card: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-4xl font-bold text-dark-navy">Featured Projects</h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {list.map((p) => (
            <motion.article
              key={p.title}
              variants={card}
              whileHover={{ scale: 1.03 }}
              className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-video w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={`${p.title} - case study image`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div className="p-6">
                <div className="text-2xl font-bold text-dark-navy">{p.title}</div>
                <div className="mt-1 text-sm font-medium text-primary-blue">{p.company}</div>
                <p className="mt-3 line-clamp-3 text-gray-600">{p.description}</p>

                <div className="mt-6 flex items-start justify-between gap-4">
                  {p.metrics.slice(0, 3).map((m) => (
                    <div key={m.label} className="min-w-0">
                      <div className="text-lg font-bold text-dark-navy">{m.value}</div>
                      <div className="text-xs text-gray-500">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-primary-blue"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => openProject(p)}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-primary-blue px-4 py-2 text-sm font-semibold text-primary-blue transition-colors hover:bg-primary-blue hover:text-white"
                >
                  View Case Study
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={closeProject}
              aria-label="Close case study"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl"
              ref={dialogRef}
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex items-start justify-between gap-6 border-b px-6 py-5">
                <div>
                  <div
                    id="project-modal-title"
                    className="text-2xl font-bold text-dark-navy"
                  >
                    {selectedProject.title}
                  </div>
                  <div className="mt-1 text-sm font-medium text-primary-blue">
                    {selectedProject.company}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeProject}
                  className="rounded-md p-2 text-dark-navy transition-colors hover:bg-light-gray"
                  aria-label="Close modal"
                  ref={closeButtonRef}
                >
                  <HiX size={22} />
                </button>
              </div>

              <div className="max-h-[75vh] overflow-y-auto px-6 py-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-semibold text-dark-navy">Problem statement</div>
                    <p className="mt-2 text-gray-600">{selectedProject.problem}</p>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-dark-navy">Solution approach</div>
                    <p className="mt-2 text-gray-600">{selectedProject.solution}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="text-sm font-semibold text-dark-navy">Impact &amp; Results</div>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-600">
                    {selectedProject.impact.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <div className="text-sm font-semibold text-dark-navy">Role &amp; Responsibilities</div>
                  <p className="mt-2 text-gray-600">{selectedProject.role}</p>
                </div>

                <div className="mt-8">
                  <div className="text-sm font-semibold text-dark-navy">Technologies Used</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProject.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-primary-blue"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
