
import { useEffect, useState } from "react";
import React from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import DarkModeToggle from "./dark-mode-toggle";
import "../globals.css";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "home", href: "home" },
  { name: "about", href: "about" },
  { name: "work", href: "experience" },
  { name: "history", href: "history" },
  { name: "projects", href: "projects" },
  { name: "stack", href: "skills" },
  { name: "contact", href: "contact" },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScrollEvent = () => {
      const sections = navItems
        .map((item) => document.getElementById(item.href))
        .filter((section): section is HTMLElement => Boolean(section));

      let currentActive = "home";
      const scrollPosition = window.scrollY + 120;

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPosition) {
          currentActive = section.id;
        }
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        currentActive = navItems[navItems.length - 1].href;
      }

      setActiveSection(currentActive);
    };

    handleScrollEvent();
    window.addEventListener("scroll", handleScrollEvent, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  const handleScroll = (id: string) => {
    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    const element = document.getElementById(id);
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 0;

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: elementPosition - headerHeight - 12,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--line)] backdrop-blur-xl"
      style={{ background: "color-mix(in srgb, var(--paper) 88%, transparent)" }}
    >
      <nav
        aria-label="Global"
        className="site-container flex h-[62px] items-center justify-between gap-4"
      >
        <button
          type="button"
          onClick={() => handleScroll("home")}
          className="group flex min-w-0 items-center gap-2.5 rounded-md px-1 py-1.5 text-left text-sm font-semibold text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
          aria-label="Scroll to home"
        >
          <svg
            className="h-4 w-4 text-[var(--accent)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="6" cy="6" r="2.4" />
            <circle cx="6" cy="18" r="2.4" />
            <circle cx="18" cy="9" r="2.4" />
            <path d="M6 8.4v7.2M8.2 6.6c6 0 7.6 1 7.6 4.4" />
          </svg>
          <span className="hidden xs:inline sm:inline">Eugene</span>
          <span className="xs:hidden">EC</span>
          <span className="branch-pill hidden sm:inline-flex">
            <span className="branch-dot" />
            main
          </span>
        </button>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => handleScroll(item.href)}
              aria-current={activeSection === item.href ? "page" : undefined}
              className={`font-mono text-[13px] transition-colors duration-200 ${
                activeSection === item.href
                  ? "text-[var(--ink)]"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex-1 lg:hidden" />

        <div className="flex items-center gap-2">
          <DarkModeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="icon-button lg:hidden"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setMobileMenuOpen}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/35 backdrop-blur-sm" aria-hidden="true" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
          >
            <DialogPanel className="fixed inset-y-0 right-0 w-full max-w-sm border-l border-[var(--line)] bg-[var(--paper)] shadow-[var(--shadow)] backdrop-blur-xl">
              <div className="flex h-full flex-col p-5">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink)]">
                      Eugene Cho
                    </p>
                    <p className="meta-text mt-1">
                      branch: main
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="icon-button"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav className="flex-1">
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          handleScroll(item.href);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full rounded-lg border border-transparent px-3 py-3 text-left font-mono text-sm font-medium transition-colors duration-200 ${
                          activeSection === item.href
                            ? "border-[var(--accent-edge)] bg-[var(--accent-wash)] text-[var(--accent)]"
                            : "text-[var(--ink-soft)] hover:bg-[var(--accent-wash)] hover:text-[var(--ink)]"
                        }`}
                      >
                        <span className="mr-2 text-[var(--accent)]">+</span>
                        {item.name}
                      </button>
                    ))}
                  </div>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </header>
  );
};

export default Header;
