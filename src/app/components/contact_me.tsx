import React from "react";
import { FaEnvelope, FaFilePdf, FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Reveal } from "./motion";

const contactMethods = [
  {
    label: "Website",
    value: "eacho.me",
    href: "https://eacho.me",
    icon: FaGlobe,
    color: "hover:border-emerald-200 hover:text-emerald-700 dark:hover:border-emerald-400/40 dark:hover:text-emerald-200",
  },
  {
    label: "Email",
    value: "eacho@ucdavis.edu",
    href: "mailto:eacho@ucdavis.edu",
    icon: FaEnvelope,
    color: "hover:border-blue-200 hover:text-blue-700 dark:hover:border-blue-400/40 dark:hover:text-blue-200",
  },
  {
    label: "GitHub",
    value: "echo108471",
    href: "https://github.com/echo108471",
    icon: FaGithub,
    color: "hover:border-slate-300 hover:text-slate-950 dark:hover:border-white/30 dark:hover:text-white",
  },
  {
    label: "LinkedIn",
    value: "eachoo",
    href: "https://www.linkedin.com/in/eachoo/",
    icon: FaLinkedin,
    color: "hover:border-sky-200 hover:text-sky-700 dark:hover:border-sky-400/40 dark:hover:text-sky-200",
  },
  {
    label: "Resume",
    value: "PDF",
    href: "/EugeneChoResume.pdf",
    icon: FaFilePdf,
    color: "hover:border-rose-200 hover:text-rose-700 dark:hover:border-rose-400/40 dark:hover:text-rose-200",
  },
];

const ContactMe: React.FC = () => {
  return (
    <section className="py-12 sm:py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20 dark:border-white/10 dark:bg-white/5 dark:shadow-black/25 sm:p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(320px,0.75fr)] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-indigo-200">
                Contact
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                Let&apos;s build something useful.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                Reach me through email, LinkedIn, GitHub, or the portfolio links from my resume.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {contactMethods.map((method) => {
                const Icon = method.icon;

                return (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith("http") || method.href.endsWith(".pdf") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") || method.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                    className={`group flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/10 p-4 text-sm text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0 ${method.color}`}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <Icon className="h-5 w-5 flex-none transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block font-semibold">{method.label}</span>
                        <span className="block truncate text-xs text-slate-400">
                          {method.value}
                        </span>
                      </span>
                    </span>
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 flex-none transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default ContactMe;
