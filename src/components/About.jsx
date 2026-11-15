import Image from "next/image";
import Reveal from "@/components/Reveal";
import aboutImage from "@/assets/images/about/about.jpg";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
            className="scroll-mt-20 pt-12 pb-14 md:pt-14 md:pb-20 lg:flex lg:min-h-[calc(100svh-4.75rem)] lg:flex-col lg:justify-center lg:pt-8 lg:pb-12"
    >
      <div className="mx-auto grid max-w-300 items-center gap-12 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        {/* Text: left on desktop */}
        <Reveal className="flex flex-col items-start gap-4">
          <span className="eyebrow">Our story</span>
          <h2 id="about-title" className="text-[clamp(2rem,1.4rem+2vw,2.75rem)]">
            Sharing the <em>Moroccan table</em> with the world
          </h2>
          <p className="text-ink-soft">
            Moroccan Gastronomy was born from a simple wish: to bring the
            flavours, gestures and stories of Moroccan kitchens to anyone,
            anywhere. Here you&apos;ll find recipes written with care, the
            traditions behind them, and the ingredients that make them sing.
          </p>
          <p className="text-ink-soft">
            Every dish has a story, and every story deserves a seat at the table.
          </p>

          <blockquote className="mt-4 border-l-2 border-gold pl-5">
            <p className="font-heading text-xl italic text-green">
              &ldquo;In Morocco, we don&apos;t just feed our guests. We welcome
              them.&rdquo;
            </p>
          </blockquote>

                    <div className="mt-2 flex flex-wrap gap-x-8 gap-y-3">
            <Link
              href="/stories/history-of-moroccan-food"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
            >
              Read our history
              <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/stories/taste-and-cook-in-morocco"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
            >
              Taste &amp; cook in Morocco
              <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        {/* Photo: right on desktop */}
        <Reveal delay={0.15} className="relative">
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 h-full w-full rounded-xl border border-gold/50"
          />
          <Image
            src={aboutImage}
            alt="Hands preparing a traditional Moroccan dish"
            sizes="(max-width: 768px) 100vw, 45vw"
            placeholder="blur"
            className="relative aspect-4/5 w-full rounded-xl object-cover lg:aspect-square"
          />
        </Reveal>
      </div>
    </section>
  );
}