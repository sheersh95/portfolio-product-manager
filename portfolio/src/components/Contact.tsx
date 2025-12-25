"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLinkedin } from "react-icons/fa";
import { HiExternalLink, HiMail, HiPhone } from "react-icons/hi";

import { event } from "@/lib/gtag";

type ContactFormValues = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
    mode: "onTouched",
  });

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

  const formContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const formItem: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const infoCard: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitState("idle");
    setSubmitMessage("");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitState("error");
      setSubmitMessage(
        "Email service is not configured. Please add EmailJS env variables to .env.local.",
      );
      event("contact_form_submit", { method: "emailjs", status: "missing_env" });
      setIsSubmitting(false);
      return;
    }

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: values.name,
          email: values.email,
          company: values.company ?? "",
          message: values.message,
        },
        { publicKey },
      );

      setSubmitState("success");
      setSubmitMessage("Thanks for reaching out! I’ll get back to you soon.");
      event("contact_form_submit", { method: "emailjs", status: "success" });
      reset();
    } catch {
      setSubmitState("error");
      setSubmitMessage(
        "Something went wrong while sending your message. Please try again in a moment.",
      );
      event("contact_form_submit", { method: "emailjs", status: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    "mt-2 w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-dark-navy outline-none transition-colors focus:border-primary-blue";

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-4xl font-bold text-dark-navy">Get In Touch</h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              variants={formContainer}
              initial="hidden"
              animate={isVisible ? "show" : "hidden"}
              className="rounded-xl bg-white p-8 shadow-sm"
            >
              <AnimatePresence>
                {submitState === "success" || submitState === "error" ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-6 rounded-md px-4 py-3 text-sm font-medium ${
                      submitState === "success"
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                    role={submitState === "success" ? "status" : "alert"}
                    aria-live={submitState === "success" ? "polite" : "assertive"}
                  >
                    {submitMessage}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <motion.div variants={formItem}>
                <label htmlFor="contact-name" className="text-sm font-semibold text-dark-navy">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className={inputClassName}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name ? (
                  <div id="contact-name-error" className="mt-2 text-sm text-red-600">
                    {errors.name.message}
                  </div>
                ) : null}
              </motion.div>

              <motion.div variants={formItem} className="mt-5">
                <label htmlFor="contact-email" className="text-sm font-semibold text-dark-navy">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className={inputClassName}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email ? (
                  <div id="contact-email-error" className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </div>
                ) : null}
              </motion.div>

              <motion.div variants={formItem} className="mt-5">
                <label htmlFor="contact-company" className="text-sm font-semibold text-dark-navy">
                  Company
                </label>
                <input
                  id="contact-company"
                  type="text"
                  className={inputClassName}
                  {...register("company")}
                />
              </motion.div>

              <motion.div variants={formItem} className="mt-5">
                <label htmlFor="contact-message" className="text-sm font-semibold text-dark-navy">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  className={`${inputClassName} resize-none`}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                />
                {errors.message ? (
                  <div id="contact-message-error" className="mt-2 text-sm text-red-600">
                    {errors.message.message}
                  </div>
                ) : null}
              </motion.div>

              <motion.div variants={formItem} className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex w-full items-center justify-center rounded-md bg-primary-blue px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors ${
                    isSubmitting
                      ? "cursor-not-allowed opacity-70"
                      : "hover:bg-primary-blue/90"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </motion.div>
            </motion.form>
          </div>

          <motion.div
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
            className="space-y-6"
          >
            <motion.a
              variants={infoCard}
              href="mailto:sbharga4@simon.rochester.edu"
              className="group flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              onClick={() => event("external_link_click", { type: "email" })}
            >
              <div className="rounded-lg bg-light-gray p-3 text-primary-blue">
                <HiMail size={22} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-dark-navy">Email</div>
                <div className="mt-1 truncate text-gray-600">sbharga4@simon.rochester.edu</div>
              </div>
            </motion.a>

            <motion.a
              variants={infoCard}
              href="tel:+15853701384"
              className="group flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              onClick={() => event("external_link_click", { type: "phone" })}
            >
              <div className="rounded-lg bg-light-gray p-3 text-primary-blue">
                <HiPhone size={22} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-dark-navy">Phone</div>
                <div className="mt-1 text-gray-600">(585) 370-1384</div>
              </div>
            </motion.a>

            <motion.a
              variants={infoCard}
              href="https://linkedin.com/in/sakshi-s-bhargava"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              onClick={() => event("external_link_click", { type: "linkedin" })}
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-light-gray p-3 text-primary-blue">
                  <FaLinkedin size={22} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-dark-navy">LinkedIn</div>
                  <div className="mt-1 truncate text-gray-600">linkedin.com/in/sakshi-s-bhargava</div>
                </div>
              </div>
              <span className="text-gray-400 transition-colors group-hover:text-primary-blue">
                <HiExternalLink size={18} />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
