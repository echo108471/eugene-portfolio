"use client";

import { useEffect, useState } from "react";
import React from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import DarkModeToggle from "./dark-mode-toggle";
import "../globals.css";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "home" },
  { name: "About", href: "about" },
  { name: "Experience", href: "experience" },
  { name: "Projects", href: "projects" },
  { name: "Skills", href: "skills" },
  { name: "Education", href: "education" },
  { name: "Awards", href: "awards" },
  { name: "Contact", href: "contact" },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsScrolled(window.scrollY > 8);

      const sections = navItems
        .map((item) => document.getElementById(item.href))
        .filter((section): section is HTMLElement => Boolean(section));

      let currentActive = "home";
      const scrollPosition = window.scrollY + 120; // Offset for header + padding

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPosition) {
          currentActive = section.id;
        }
      });

      // Highlight the last section if scrolled to the absolute bottom
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
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? "border-slate-200/80 bg-white/80 shadow-sm shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/80 dark:shadow-black/25"
          : "border-slate-200/60 bg-white/70 dark:border-white/10 dark:bg-slate-950/60"
      }`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8"
      >
        <button
          type="button"
          onClick={() => handleScroll("home")}
          className="group flex min-w-0 items-center gap-2 rounded-full px-2 py-1.5 text-left text-sm font-semibold text-slate-900 transition-colors hover:text-indigo-700 dark:text-white dark:hover:text-indigo-200"
          aria-label="Scroll to home"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-sm shadow-indigo-500/40 transition-transform duration-200 group-hover:scale-125" />
          <span className="hidden sm:inline">Eugene Cho</span>
          <span className="sm:hidden">EC</span>
        </button>

        <div className="hidden flex-1 items-center justify-center lg:flex">
          <div className="flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/50 p-1 shadow-sm shadow-slate-900/5 dark:border-white/10 dark:bg-white/5">
          {navItems.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => handleScroll(item.href)}
                aria-current={activeSection === item.href ? "page" : undefined}
                className={`group relative rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.href
                    ? "text-indigo-700 dark:text-white"
                    : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {activeSection === item.href && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-full bg-indigo-50 shadow-sm shadow-indigo-900/5 dark:bg-indigo-500/20"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-gradient-to-r from-indigo-500 to-cyan-400 transition-transform duration-200 group-hover:scale-x-100" />
              </button>
          ))}
          </div>
        </div>

        <div className="flex-1 lg:hidden" />

        <div className="flex items-center gap-2">
          <DarkModeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white/70 p-2 text-slate-800 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-indigo-200 hover:text-indigo-700 active:scale-[0.98] lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-indigo-400/40 dark:hover:text-indigo-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setMobileMenuOpen}
        >
          {/* Backdrop */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm" aria-hidden="true" />
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
            <DialogPanel className="fixed inset-y-0 right-0 w-full max-w-sm border-l border-slate-200 bg-white/95 shadow-2xl shadow-slate-950/20 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95">
              <div className="flex h-full flex-col p-5">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-950 dark:text-white">
                      Eugene Cho
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Portfolio navigation
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg border border-slate-200 p-2 text-slate-700 transition-all duration-200 hover:border-indigo-200 hover:text-indigo-700 active:scale-95 dark:border-white/10 dark:text-slate-200 dark:hover:border-indigo-400/40 dark:hover:text-indigo-200"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav className="flex-1">
                  <div className="space-y-1">
                    {navItems.map((item, index) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          handleScroll(item.href);
                          setMobileMenuOpen(false);
                        }}
                        style={{ animationDelay: `${index * 35}ms` }}
                        className={`animate-fadeIn w-full rounded-xl px-3 py-3 text-left text-sm font-medium opacity-0 transition-all duration-200 hover:translate-x-1 active:scale-[0.99] ${
                          activeSection === item.href
                            ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
                            : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                        }`}
                      >
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
