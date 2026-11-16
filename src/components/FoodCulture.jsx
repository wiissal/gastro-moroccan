import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Users, Moon } from "lucide-react";
import Reveal from "@/components/Reveal";
import cultureImage from "@/assets/images/culture/culture-table.jpg";

const TRADITIONS = [
  {
    Icon: Leaf,
    title: "Mint tea & hospitality",
    text: "Poured from high above, the first glass is always for the guest.",
  },
  {
    Icon: Users,
    title: "Friday couscous",
    text: "The whole family gathers around one large dish after prayer.",
  },
  {
    Icon: Moon,
    title: "Ramadan nights",
    text: "Harira, dates and chebakia break the fast at sunset.",
  },
];

export default function FoodCulture() {
  return (
    <section
      id="culture"
      aria-labelledby="culture-title"
      className="scroll-mt-20 pt-12 pb-14 md:pt-14 md:pb-20 lg:section-screen"
    >
      <div className="mx-auto max-w-300 px-6 md:px-10">
        {/* Featured story: image + text */}
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            {/* Gold frame offset behind the photo */}
            <div
              aria-hidden="true"
              className="absolute -right-4 -bottom-4 h-full w-full rounded-xl border border-gold/50"
            />
            <Image
              src={cultureImage}
              alt="A Moroccan family table set with tagine, bread and mint tea"
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              className="relative aspect-4/3 w-full rounded-xl object-cover lg:aspect-3/2"
            />
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col items-start gap-4">
            <span className="eyebrow">Food culture</span>
            <h2
              id="culture-title"
              className="text-[clamp(2rem,1.4rem+2vw,2.75rem)]"
            >
              More than food. <em>A heritage</em> passed through generations.
            </h2>
            <p className="text-ink-soft">
              In Morocco, a meal is a moment of welcome. Recipes travel from
              grandmothers to granddaughters, spices tell the story of ancient
              trade routes, and every region adds its own touch to the table.
            </p>
            <Link
              href="/stories/moroccan-gastronomy"
              className="group mt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-green"
            >
              Discover the flavours of Morocco
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Traditions */}
        <ul className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-3 md:mt-10 md: pt-8">
          {TRADITIONS.map(({ Icon, title, text }, index) => (
            <li key={title}>
              <Reveal delay={index * 0.1} className="flex flex-col gap-3">
                <Icon
                  size={28}
                  strokeWidth={1.25}
                  className="text-gold"
                  aria-hidden="true"
                />
                <h3 className="text-xl">{title}</h3>
                <p className="text-sm text-ink-soft">{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
