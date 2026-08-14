import React from "react";
import { FaEnvelope, FaFilePdf, FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";
import AsciiScrambleText from "./ascii-scramble";

// Injected at build time by Vite (see vite.config.ts): the most recent commits
// from git history, powering the footer commit log.
declare const __RECENT_COMMITS__: { hash: string; author: string; subject: string; url: string }[];

const recentCommits = __RECENT_COMMITS__;

const primaryMethod = {
  label: "Email",
  value: "eugene.a.cho@gmail.com",
  href: "mailto:eugene.a.cho@gmail.com",
  icon: FaEnvelope,
};

const contactMethods = [
  {
    label: "Website",
    value: "eacho.me",
    href: "https://eacho.me",
    icon: FaGlobe,
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

// Links that leave the page (other tabs/sites) open in a new tab; in-page
// schemes like mailto: stay in place.
const isExternalLink = (href: string) =>
  /^https?:/i.test(href) || /\.pdf(\?|#|$)/i.test(href);

const externalProps = (href: string) =>
  isExternalLink(href)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

const ContactMe: React.FC = () => {
  return (
    <section className="page-section pb-16">
      <div>
        <div className="section-head">
          <span className="section-num">08</span>
          <h2 className="section-title">
            <AsciiScrambleText text="Open Channels" />
          </h2>
          <span className="section-note">git remote -v</span>
        </div>

        <div className="diff-block">
          <div className="diff-gutter">
            <span className="plus">+</span>
            <span className="plus">+</span>
            <span className="tilde">~</span>
          </div>
          <div className="diff-body">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(320px,0.75fr)]">
              <div>
                <p className="eyebrow">
                  // open channels
                </p>
                <h3 className="mt-3 font-display text-2xl font-medium text-[var(--ink)] sm:text-3xl">
                  Get in touch.
                </h3>
                <p className="body-copy mt-4 max-w-2xl text-sm">
                  Email is the best way to reach me. My GitHub, LinkedIn, and resume are here too.
                </p>
              </div>

              <div className="grid gap-3">
                {(() => {
                  const Icon = primaryMethod.icon;

                  return (
                    <a
                      href={primaryMethod.href}
                      {...externalProps(primaryMethod.href)}
                      className="group flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-[var(--paper-raised)] p-4 text-sm text-[var(--ink-soft)] transition-colors duration-200 hover:border-[var(--accent-edge)] hover:bg-[var(--accent-wash)] hover:text-[var(--ink)]"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <Icon className="h-5 w-5 flex-none text-[var(--accent)]" aria-hidden="true" />
                        <span className="min-w-0">
                          <span className="block font-semibold">{primaryMethod.label}</span>
                          <span className="meta-text block truncate">
                            {primaryMethod.value}
                          </span>
                        </span>
                      </span>
                      <span className="flex-none font-mono" aria-hidden="true">↗</span>
                    </a>
                  );
                })()}

                <div className="grid gap-3 sm:grid-cols-2">
                  {contactMethods.map((method) => {
                    const Icon = method.icon;

                    return (
                      <a
                        key={method.label}
                        href={method.href}
                        {...externalProps(method.href)}
                        className="group flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-[var(--paper-raised)] p-4 text-sm text-[var(--ink-soft)] transition-colors duration-200 hover:border-[var(--accent-edge)] hover:bg-[var(--accent-wash)] hover:text-[var(--ink)]"
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <Icon className="h-5 w-5 flex-none text-[var(--accent)]" aria-hidden="true" />
                          <span className="min-w-0">
                            <span className="block font-semibold">{method.label}</span>
                            <span className="meta-text block truncate">
                              {method.value}
                            </span>
                          </span>
                        </span>
                        <span className="flex-none font-mono" aria-hidden="true">↗</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Commit Log Footer */}
            <div className="mt-12 border-t border-[var(--line)] pt-8">
              <div className="commit-log">
                <div className="commit-log__header">
                  <span>recent git activity</span>
                  <span>HEAD@{'{'}0{'}'}</span>
                </div>
                <div className="space-y-1.5 pt-2 font-mono text-xs text-[var(--ink-soft)]">
                  {recentCommits.map((commit) => (
                    <div key={commit.hash} className="commit-log__row flex items-baseline gap-2">
                      <span className="text-[var(--accent)]">{commit.hash}</span>
                      <span className="text-[var(--ink-faint)]">({commit.author})</span>
                      <span className="truncate text-[var(--ink)]">{commit.subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
