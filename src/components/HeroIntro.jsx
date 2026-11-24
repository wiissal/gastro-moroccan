"use client";

import { motion, MotionConfig } from "motion/react";
import Button from "@/components/Button";

// Parent: reveals its children one after another
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

// Each child: fades in while rising 24px
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroIntro() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="mx-auto flex max-w-300 flex-col items-center gap-4 px-6 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.span variants={item} className="eyebrow">
          A Taste of Morocco
        </motion.span>

        <motion.h1 variants={item} id="hero-title" className="max-w-[16ch]">
          Discover the soul of <em>Moroccan</em> cuisine
        </motion.h1>

        <motion.p variants={item} className="max-w-[46ch] text-lg text-ink-soft">
          Recipes, traditions and stories from the Moroccan table.
        </motion.p>

        <motion.div variants={item} className="mt-2 flex flex-wrap justify-center gap-4">
          <Button href="#recipes">Explore recipes</Button>
          <Button href="/#about" variant="ghost">
            Our story
          </Button>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}