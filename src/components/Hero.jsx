import Image from "next/image";
import { HERO_CARDS } from "@/data/heroCards";
import HeroIntro from "@/components/HeroIntro";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="section-screen overflow-hidden pt-4 pb-14 md:pb-16">
      <ul className={styles.arc} style={{ "--total": HERO_CARDS.length }}>
        {HERO_CARDS.map((card, index) => (
          <li key={card.id} className={styles.card} style={{ "--i": index }}>
            <figure
              className={`${styles.cardInner} rounded-xl bg-white p-2 pb-3 shadow-card`}
            >
              <Image
                src={card.image}
                alt={card.alt}
                sizes="(max-width: 768px) 130px, 170px"
                placeholder="blur"
                className="aspect-3/4 w-full rounded-lg object-cover"
              />
              <figcaption className="mt-2 flex min-h-[2.6em] items-center justify-center text-center text-[0.625rem] font-semibold uppercase leading-tight tracking-[0.08em] text-gold-text sm:text-xs sm:tracking-[0.12em]">
                {card.title}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <HeroIntro />
    </section>
  );
}
