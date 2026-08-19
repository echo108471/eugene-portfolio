import React, { useState } from "react";
import { FaEnvelope, FaFilePdf, FaGithub, FaGlobe, FaLinkedin, FaCheck } from "react-icons/fa";
import AsciiScrambleText from "./ascii-scramble";

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

const isExternalLink = (href: string) =>
  /^https?:/i.test(href) || /\.pdf(\?|#|$)/i.test(href);

const externalProps = (href: string) =>
  isExternalLink(href)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

const ContactMe: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("eugene.a.cho@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="page-section pb-16">
      <div>
        <div className="ascii-mount-bracket mb-3">
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">┌──[</span>
          <span className="font-mono text-xs text-[var(--accent)] font-medium">remotes // git remote -v</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]───[</span>
          <span className="font-mono text-xs text-[var(--growth)]">● 5 active channels</span>
          <span className="bracket text-[var(--growth)] font-mono text-xs" aria-hidden="true">]──</span>
        </div>

        <div className="section-head">
          <span className="section-num">09</span>
          <h2 className="section-title">
            <AsciiScrambleText text="Open Channels" />
          </h2>
          <span className="section-note">git remote -v</span>
        </div>
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
              <p className="eyebrow font-mono">
                // establish connection
              </p>
              <h3 className="mt-3 font-display text-2xl font-medium text-[var(--ink)] sm:text-3xl">
                Let&apos;s build something resilient.
              </h3>
              <p className="body-copy mt-4 max-w-2xl text-sm leading-relaxed">
                Whether you&apos;re architecting distributed backends, deploying air-gapped AI models, or building high-throughput systems, I&apos;m always open to discussing engineering challenges.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="btn btn-primary text-xs py-2 px-3.5"
                  title="Copy email to clipboard"
                >
                  <span className="font-mono text-[11px] text-[var(--growth-bright)]" aria-hidden="true">[</span>
                  {copied ? (
                    <span className="inline-flex items-center gap-1.5 text-[var(--growth-bright)]">
                      <FaCheck className="h-3 w-3" /> copied to clipboard
                    </span>
                  ) : (
                    <span>copy eugene.a.cho@gmail.com</span>
                  )}
                  <span className="font-mono text-[11px] text-[var(--growth-bright)]" aria-hidden="true">]</span>
                </button>
              </div>
            </div>

            <div className="grid gap-3">
              {(() => {
                const Icon = primaryMethod.icon;

                return (
                  <a
                    href={primaryMethod.href}
                    {...externalProps(primaryMethod.href)}
                    className="group flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-[var(--paper-raised)] p-4 text-sm text-[var(--ink-soft)] transition-all duration-200 hover:border-[var(--accent-edge)] hover:bg-[var(--accent-wash)] hover:text-[var(--ink)] shadow-sm"
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
                    <span className="flex-none font-mono text-xs text-[var(--accent)]" aria-hidden="true">↗</span>
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
                      className="group flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-[var(--paper-raised)] p-4 text-sm text-[var(--ink-soft)] transition-all duration-200 hover:border-[var(--accent-edge)] hover:bg-[var(--accent-wash)] hover:text-[var(--ink)] shadow-sm"
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
                      <span className="flex-none font-mono text-xs text-[var(--accent)]" aria-hidden="true">↗</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Commit Log Footer */}
          <div className="mt-12 border-t border-[var(--line-faint)] pt-8">
            <div className="commit-log">
              <div className="commit-log__header flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--growth)]">recent git activity</span>
                <span className="font-mono text-[11px] text-[var(--ink-faint)]">HEAD@{'{'}0{'}'} · origin/main</span>
              </div>
              <div className="space-y-1.5 pt-2 font-mono text-xs text-[var(--ink-soft)]">
                {recentCommits.map((commit) => (
                  <div key={commit.hash} className="commit-log__row flex items-baseline gap-2">
                    <span className="text-[var(--accent)] flex-none">{commit.hash}</span>
                    <span className="text-[var(--ink-faint)] flex-none">({commit.author})</span>
                    <span className="truncate text-[var(--ink)]">{commit.subject}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;

