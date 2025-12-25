"use client";

import { FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

import { event } from "@/lib/gtag";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-white px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <div className="text-lg font-semibold text-dark-navy">Sakshi Bhargava</div>
          <div className="mt-1 text-sm text-gray-600">
            © <span suppressHydrationWarning>{year}</span> • All rights reserved
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:sbharga4@simon.rochester.edu"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-primary-blue transition-colors hover:bg-light-gray"
            onClick={() => event("external_link_click", { type: "email", location: "footer" })}
          >
            <HiMail size={18} />
            Email
          </a>

          <a
            href="https://linkedin.com/in/sakshi-s-bhargava"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-primary-blue transition-colors hover:bg-light-gray"
            onClick={() => event("external_link_click", { type: "linkedin", location: "footer" })}
          >
            <FaLinkedin size={18} />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
