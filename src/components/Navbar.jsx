"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Mail } from "lucide-react";
import { NAV_LINKS, SITE } from "@/data/site";

// Desktop links: uppercase with a saffron underline that grows on hover
const desktopLinkClasses =
  "relative py-2 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:text-primary " +
  "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  const closeMenu = () => setIsOpen(false);

  // While the drawer is open: lock page scroll, focus the close button,
  // close on Escape. When it closes: undo all of that and return focus.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      openButtonRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-surface/92 backdrop-blur-sm">
        <div className="mx-auto flex min-h-19 max-w-300 items-center justify-between gap-8 px-6 md:px-10">
          <Link href="/" className="flex items-center gap-2 font-heading text-xl font-medium text-ink">
            <Image src="/logo.svg" alt="" width={36} height={36} />
            <span>{SITE.name}</span>
          </Link>

          {/* Desktop menu */}
          <nav aria-label="Main" className="hidden items-center gap-12 lg:flex">
            <ul className="flex gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={desktopLinkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/#contact"
              className="border border-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-surface"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            ref={openButtonRef}
            type="button"
            className="flex size-11 items-center justify-center text-ink lg:hidden"
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={26} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Overlay: dims the page, click to close */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`fixed inset-0 z-50 bg-ink/50 transition-opacity duration-500 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(85vw,22rem)] flex-col bg-primary text-surface shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-surface/15 px-6 py-5">
          <span className="flex items-center gap-2 font-heading text-lg font-medium">
            <Image src="/logo.svg" alt="" width={32} height={32} />
            {SITE.name}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="flex size-10 items-center justify-center rounded-full bg-surface/10 transition-colors hover:bg-surface/20"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
          <ul className="divide-y divide-surface/15 border-b border-surface/15">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block px-6 py-4 font-medium transition-colors hover:bg-primary-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4 border-t border-surface/15 px-6 py-6">
          <Link
            href="/#contact"
            onClick={closeMenu}
            className="bg-accent px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-surface"
          >
            Contact us
          </Link>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2 text-sm text-surface/70 transition-colors hover:text-surface"
          >
            <Mail size={16} className="text-accent" aria-hidden="true" />
            {SITE.email}
          </a>
        </div>
      </div>
    </>
  );
}