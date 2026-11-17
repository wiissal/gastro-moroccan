import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { STORIES, getStoryBySlug } from "@/data/stories";
import StoryCard from "@/components/StoryCard";
import Reveal from "@/components/Reveal";

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

function SectionText({ section }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl md:text-3xl">{section.heading}</h2>

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
    </div>
  );
}

function SectionImage({ section, frameOnLeft }) {
  return (
    <Reveal>
      <figure>
        <div className="relative">
          {/* Saffron frame offset behind the photo */}
          <div
            aria-hidden="true"
            className={`absolute -bottom-4 h-full w-full rounded-2xl border border-accent/60 ${
              frameOnLeft ? "-left-4" : "-right-4"
            }`}
          />
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={section.image}
              alt={section.imageAlt}
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              className="aspect-4/5 w-full object-cover transition-transform duration-700 ease-out hover:scale-105 md:aspect-4/5"
            />
          </div>
        </div>
        {section.caption && (
          <figcaption className="mt-6 text-center text-sm italic text-ink-soft">
            {section.caption}
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}

export default async function StoryPage({ params }) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) notFound();

  const otherStories = STORIES.filter((item) => item.slug !== story.slug);

  return (
    <main className="px-6 pt-8 pb-20 md:px-10">
      <article className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl">
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
        </div>

        {/* Cover photo */}
        <Image
          src={story.image}
          alt={story.alt}
          sizes="(max-width: 1024px) 100vw, 1024px"
          placeholder="blur"
          className="mt-10 aspect-video w-full rounded-2xl object-cover"
        />

        {/* Sections */}
        <div className="mt-16 flex flex-col gap-16 md:gap-24">
          {story.sections.map((section, index) => {
            if (!section.image) {
              return (
                <section key={section.heading} className="mx-auto w-full max-w-3xl">
                  <SectionText section={section} />
                </section>
              );
            }

            // Alternate: image on the right, then on the left, then right...
            const imageOnLeft = index % 2 === 1;

            return (
              <section
                key={section.heading}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
              >
                <div className={imageOnLeft ? "md:order-2" : ""}>
                  <SectionText section={section} />
                </div>
                <div className={imageOnLeft ? "md:order-1" : ""}>
                  <SectionImage section={section} frameOnLeft={imageOnLeft} />
                </div>
              </section>
            );
          })}
        </div>
      </article>

      {/* More stories */}
      <aside
        aria-labelledby="more-stories-title"
        className="mx-auto mt-24 max-w-300 border-t border-line pt-14"
      >
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