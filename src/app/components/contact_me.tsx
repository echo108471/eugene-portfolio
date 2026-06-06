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
  },
  {
    label: "Email",
    value: "eacho@ucdavis.edu",
    href: "mailto:eacho@ucdavis.edu",
    icon: FaEnvelope,
  },
  {
    label: "GitHub",
    value: "echo108471",
    href: "https://github.com/echo108471",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    value: "eachoo",
    href: "https://www.linkedin.com/in/eachoo/",
    icon: FaLinkedin,
  },
  {
    label: "Resume",
    value: "PDF",
    href: "/EugeneChoResume.pdf",
    icon: FaFilePdf,
  },
];

const ContactMe: React.FC = () => {
  return (
    <section className="page-section pb-16">
      <Reveal>
        <div className="section-head">
          <span className="section-num">08</span>
          <h2 className="section-title">Contact</h2>
          <span className="section-note">git log --oneline</span>
        </div>

        <div className="diff-block">
          <div className="diff-gutter">
            <span className="plus">+</span>
            <span className="plus">+</span>
            <span className="tilde">~</span>
          </div>
          <div className="diff-body">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(320px,0.75fr)] lg:items-end">
              <div>
                <p className="eyebrow">
                  // open channels
                </p>
                <h3 className="mt-3 font-display text-2xl font-medium text-[var(--ink)] sm:text-3xl">
                  Get in touch.
                </h3>
                <p className="body-copy mt-4 max-w-2xl text-sm">
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
                      className="group flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-[var(--paper-raised)] p-4 text-sm text-[var(--ink-soft)] transition-colors duration-200 hover:border-[var(--add-edge)] hover:bg-[var(--add-wash)] hover:text-[var(--ink)]"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <Icon className="h-5 w-5 flex-none text-[var(--add)]" aria-hidden="true" />
                        <span className="min-w-0">
                          <span className="block font-semibold">{method.label}</span>
                          <span className="meta-text block truncate">
                            {method.value}
                          </span>
                        </span>
                      </span>
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 flex-none" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="commit-log mt-6">
              <span className="hash">a4f9c2</span> <b>Eugene</b> - refactor: keep the portfolio quiet and version-control-native<br />
              <span className="hash">1b7e08</span> <b>Eugene</b> - feat: stage cards for selected project work<br />
              <span className="hash">9c0e44</span> <b>Eugene</b> - init: warm paper base, diff palette, recruiter-readable structure
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default ContactMe;
