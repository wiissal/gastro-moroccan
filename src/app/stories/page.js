import { STORIES } from "@/data/stories";
import StoryCard from "@/components/StoryCard";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Stories",
  description:
    "Stories about Moroccan gastronomy: its history, its regions, and where to taste and learn it.",
};

export default function StoriesPage() {
  return (
    <main className="mx-auto max-w-300 px-6 pt-12 pb-20 md:px-10">
      <Reveal className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="eyebrow">Moroccan Gastronomy</span>
        <h1>
          Stories from the <em>table</em>
        </h1>
        <p className="text-ink-soft">
          The history, the regions and the people behind the dishes, and where to
          taste them for yourself.
        </p>
      </Reveal>

      <ul className="grid gap-x-8 gap-y-12 md:grid-cols-3">
        {STORIES.map((story, index) => (
          <li key={story.slug}>
            <Reveal delay={index * 0.1}>
              <StoryCard story={story} />
            </Reveal>
          </li>
        ))}
      </ul>
    </main>
  );
}