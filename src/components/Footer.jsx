import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { SITE, NAV_LINKS } from "@/data/site";
import NewsletterForm from "@/components/NewsletterForm";

// Cached at build time: the year updates each time the site is rebuilt.
async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

const headingClasses =
  "mb-5 font-body text-xs font-semibold uppercase tracking-[0.18em] text-ivory";

const linkClasses = "text-ivory/70 transition-colors hover:text-ivory";

export default async function Footer() {
  const year = await getCurrentYear();

  return (
        <footer id="contact" className="scroll-mt-20 bg-primary text-surface">
                {/* Decorative four-colour stripe */}
      <div aria-hidden="true" className="grid h-1.5 grid-cols-4">
        <span className="bg-accent" />
        <span className="bg-stripe-sage" />
        <span className="bg-stripe-stone" />
        <span className="bg-stripe-night" />
      </div>
      <div className="mx-auto grid max-w-300 gap-12 px-6 pt-16 pb-12 md:grid-cols-2 md:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 font-heading text-2xl text-ivory">
            <Image src="/logo.svg" alt="" width={40} height={40} />
            <span>{SITE.name}</span>
          </Link>
          <p className="font-heading text-lg italic text-ivory/80">{SITE.tagline}</p>
          <p className="max-w-xs text-sm text-ivory/70">{SITE.description}</p>
        </div>

        {/* Explore */}
        <nav aria-label="Footer">
          <h2 className={headingClasses}>Explore</h2>
          <ul className="flex flex-col gap-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClasses}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className={headingClasses}>Contact</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className={`inline-flex items-center gap-2 ${linkClasses}`}>
                <Mail size={16} className="text-gold" aria-hidden="true" />
                {SITE.email}
              </a>
            </li>
           
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col">
          <h2 className={headingClasses}>Newsletter</h2>
          <p className="mb-5 text-sm text-ivory/70">
            New recipes and stories, once a month. No spam, ever.
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/15">
        <div className="mx-auto flex max-w-300 flex-col gap-2 px-6 py-6 text-xs text-ivory/60 sm:flex-row sm:justify-between md:px-10">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>Photography: Unsplash &amp; Pexels contributors</p>
        </div>
      </div>
    </footer>
  );
}