"use client";

import { useState } from "react";
import { JSX } from "react";
import * as React from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
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
    <header className="bg-gray-800 shadow sticky top-0 z-50 dark:bg-header-dark">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleScroll(item.href)}
                className="text-sm font-semibold text-white hover:text-indigo-300"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Dark Mode Toggle */}
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <Dialog
        as="div"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10 bg-black bg-opacity-25" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full max-w-sm overflow-y-auto bg-gray-800 px-6 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                handleScroll("home");
                setMobileMenuOpen(false);
              }}
              className="text-lg font-bold text-white"
            >
              Portfolio
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-4 py-6">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      handleScroll(item.href);
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-gray-700"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
