"use client";

import { useState } from "react";
import { JSX } from "react";
import * as React from "react";
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
  { name: "Home", href: "home" },
  { name: "About", href: "about" },
  { name: "Timeline", href: "timeline" },
  { name: "Experience", href: "experience" },
  { name: "Education", href: "education" },
  { name: "Projects", href: "projects" },
  { name: "Awards", href: "awards" },
  { name: "Contact", href: "contact" },
];

const Header: React.FC = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      window.scrollTo({
        top: element.offsetTop - headerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg sticky top-0 z-50 dark:bg-gradient-to-r dark:from-header-dark dark:via-gray-900 dark:to-header-dark border-b border-gray-700 dark:border-gray-800 backdrop-blur-sm">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center p-3 lg:p-6 lg:px-8"
      >
        {/* Desktop Navigation - takes left side */}
        <div className="hidden lg:flex lg:flex-1 lg:space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleScroll(item.href)}
              className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors duration-200 relative group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-full transition-all duration-200"></span>
            </button>
          ))}
        </div>
        
        {/* Mobile: spacer to push items to edges */}
        <div className="flex-1 lg:hidden"></div>

        {/* Right side items */}
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden inline-flex items-center justify-center rounded-md p-1.5 text-white hover:bg-gray-700 active:bg-gray-600 transition-colors duration-200"
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
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>

          {/* Sliding panel */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
          >
            <DialogPanel className="fixed inset-y-0 right-0 w-full max-w-xs bg-gray-800 shadow-xl">
              <div className="flex h-full flex-col p-4">
                <div className="flex items-center justify-end mb-4">
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-md p-1.5 text-white hover:bg-gray-700 transition-colors"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav className="flex-1">
                  <div className="space-y-0.5">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          handleScroll(item.href);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
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
