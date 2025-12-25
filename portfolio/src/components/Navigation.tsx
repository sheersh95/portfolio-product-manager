"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

import { event } from "@/lib/gtag";

type NavItem = {
  label: string;
  id: string;
};

export default function Navigation() {
  const navItems: readonly NavItem[] = useMemo(
    () => [
      { label: "About", id: "about" },
      { label: "Experience", id: "experience" },
      { label: "Projects", id: "projects" },
      { label: "Skills", id: "skills" },
      { label: "Contact", id: "contact" },
    ],
    [],
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("about");

  const handleScrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    event("navigation_click", { target: id });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHasScrolled(y > 8);

      const offset = 96;
      const probeY = y + offset;

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (!section) continue;

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (probeY >= top && probeY < bottom) {
          setActiveSectionId(item.id);
          return;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navItems]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const navLinkClassName = (id: string) =>
    `text-sm font-medium transition-colors ${
      activeSectionId === id
        ? "text-primary-blue"
        : "text-dark-navy/80 hover:text-primary-blue"
    }`;

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        hasScrolled ? "bg-white shadow" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-bold text-dark-navy"
        >
          Sakshi Bhargava
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleScrollTo(item.id)}
              className={navLinkClassName(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-dark-navy transition-colors hover:bg-light-gray md:hidden"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <HiMenu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 h-full w-full bg-black/40"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu overlay"
            />

            <motion.aside
              className="absolute right-0 top-0 flex h-full w-72 flex-col bg-white p-6 shadow-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-dark-navy">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-md p-2 text-dark-navy transition-colors hover:bg-light-gray"
                  aria-label="Close menu"
                >
                  <HiX size={24} />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`text-left text-base font-medium transition-colors ${
                      activeSectionId === item.id
                        ? "text-primary-blue"
                        : "text-dark-navy/80 hover:text-primary-blue"
                    }`}
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleScrollTo(item.id);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
