import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { STORIES, getStoryBySlug } from "@/data/stories";
import StoryCard from "@/components/StoryCard";

// Story pages need the URL slug before rendering (same as recipes)
export const instant = false;

export function generateStaticParams() {
  return STORIES.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};
  return { title: story.title, description: story.excerpt };
}

export default async function StoryPage({ params }) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) notFound();

  const otherStories = STORIES.filter((item) => item.slug !== story.slug);

  return (
    <main className="px-6 pt-8 pb-20 md:px-10">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:text-primary-dark"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All stories
        </Link>

        <header className="mt-8 flex flex-col gap-4">
          <span className="eyebrow">{story.eyebrow}</span>
          <h1 className="text-[clamp(2rem,1.4rem+2.6vw,3.25rem)]">{story.title}</h1>
          <p className="text-lg text-ink-soft">{story.excerpt}</p>
          <p className="flex items-center gap-2 text-sm text-ink-soft">
            <Clock size={16} className="text-accent-text" aria-hidden="true" />
            {story.readTime}
          </p>
        </header>

        <Image
          src={story.image}
          alt={story.alt}
          sizes="(max-width: 768px) 100vw, 768px"
          placeholder="blur"
          className="mt-10 aspect-video w-full rounded-xl object-cover"
        />

        <div className="mt-12 flex flex-col gap-10">
          {story.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-4">
              <h2 className="text-2xl">{section.heading}</h2>

              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}

              {section.list && (
                <ul className="flex flex-col gap-3 border-l-2 border-accent pl-6">
                  {section.list.map((item) => (
                    <li key={item} className="leading-relaxed text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>

      {/* More stories */}
      <aside aria-labelledby="more-stories-title" className="mx-auto mt-20 max-w-300 border-t border-line pt-14">
        <h2 id="more-stories-title" className="mb-8 text-2xl">
          More <em>stories</em>
        </h2>
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {otherStories.map((item) => (
            <li key={item.slug}>
              <StoryCard story={item} />
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
}