"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Recipes", href: "/#recipes" },
  { label: "Food Culture", href: "/#culture" },
  { label: "Ingredients", href: "/#ingredients" },
  { label: "About", href: "/#about" },
];

// Menu links, with a gold underline that grows on hover
const linkClasses =
  "relative py-2 text-sm font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:text-green lg:text-xs " +
  "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/92 backdrop-blur-sm">
      <div className="mx-auto flex min-h-19 max-w-300 items-center justify-between gap-8 px-6 md:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-[1.35rem] text-green"
          onClick={closeMenu}
        >
          <Image src="/logo.svg" alt="" width={36} height={36} />
          <span>Moroccan Gastronomy</span>
        </Link>

        {/* Hamburger: below 1024px only */}
        <button
          type="button"
          className="flex size-11 items-center justify-center text-green lg:hidden"
          aria-expanded={isOpen}
          aria-controls="main-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={26} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Menu size={26} strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>

        {/* Menu: dropdown on mobile, inline row on desktop */}
        <nav
          id="main-menu"
          aria-label="Main"
          className={`${isOpen ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col items-start gap-8 border-b border-line bg-ivory px-6 pt-8 pb-12
            lg:static lg:flex lg:flex-row lg:items-center lg:gap-12 lg:border-0 lg:bg-transparent lg:p-0`}
        >
          <ul className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClasses} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#contact"
            className="border border-green px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-green transition-colors hover:bg-green hover:text-ivory"
            onClick={closeMenu}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}