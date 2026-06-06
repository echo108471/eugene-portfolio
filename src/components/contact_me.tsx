import React from "react";
import { FaEnvelope, FaFilePdf, FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Reveal } from "./motion";

// Injected at build time by Vite (see vite.config.ts): the most recent commits
// from git history, powering the footer commit log.
declare const __RECENT_COMMITS__: { hash: string; author: string; subject: string; url: string }[];

const recentCommits = __RECENT_COMMITS__;

const contactMethods = [
  {
    label: "Website",
    value: "eacho.me",
    href: "https://eacho.me",
    icon: FaGlobe,
  },
  {
    label: "Email",
    value: "eugene.a.cho@gmail.com",
    href: "mailto:eugene.a.cho@gmail.com",
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

            {recentCommits.length > 0 && (
              <div className="commit-log mt-6">
                {recentCommits.map((commit) => (
                  <React.Fragment key={commit.hash}>
                    {commit.url ? (
                      <a
                        href={commit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hash transition-colors hover:underline"
                      >
                        {commit.hash}
                      </a>
                    ) : (
                      <span className="hash">{commit.hash}</span>
                    )}{" "}
                    <b>{commit.author.split(" ")[0]}</b> - {commit.subject}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default ContactMe;
