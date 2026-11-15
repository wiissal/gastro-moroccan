import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StoryCard({ story }) {
  return (
    <article className="group">
      <Link href={`/stories/${story.slug}`} className="block">
        <div className="overflow-hidden rounded-xl">
          <Image
            src={story.image}
            alt={story.alt}
            sizes="(max-width: 768px) 100vw, 33vw"
            placeholder="blur"
            className="aspect-3/2 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <span className="eyebrow">{story.eyebrow}</span>
          <h3 className="text-xl">{story.title}</h3>
          <p className="line-clamp-2 text-sm text-ink-soft">{story.excerpt}</p>
          <span className="mt-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Read the story
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}