import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ChefHat, Users, Play } from "lucide-react";
import { RECIPES, getRecipeBySlug } from "@/data/recipes";
import FeedbackForm from "@/components/FeedbackForm";
import { SITE } from "@/data/site";
import { getRecipeJsonLd } from "@/lib/structured-data";
export const instant = false; //it tell next.js that this pageis allowed to wait for its url data
// Pre-build one page per recipe at build time
export function generateStaticParams() {
  return RECIPES.map((recipe) => ({ slug: recipe.slug }));
}

// Each recipe gets its own title and description (SEO)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return {};

  const url = `/recipes/${recipe.slug}`;

  return {
    title: recipe.title,
    description: recipe.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: SITE.name,
      locale: "en_US",
      url,
      title: recipe.title,
      description: recipe.description,
      images: [
        {
          url: recipe.image.src,
          width: recipe.image.width,
          height: recipe.image.height,
          alt: recipe.alt,
        },
      ],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) notFound();
  const jsonLd = getRecipeJsonLd(recipe);

  return (
    <main className="mx-auto max-w-300 px-6 pt-8 pb-20 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Link
        href="/recipes"
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:text-primary-dark"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        All recipes
      </Link>

      {/* Header: text + photo */}
      <header className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-4">
          <span className="eyebrow">{recipe.category}</span>
          <h1>{recipe.title}</h1>
          <p className="text-lg text-ink-soft">{recipe.description}</p>

          <ul className="flex flex-wrap gap-6 text-sm text-ink-soft">
            <li className="flex items-center gap-2">
              <Clock
                size={18}
                className="text-accent-text"
                aria-hidden="true"
              />
              {recipe.prepTime}
            </li>
            <li className="flex items-center gap-2">
              <ChefHat
                size={18}
                className="text-accent-text"
                aria-hidden="true"
              />
              {recipe.difficulty}
            </li>
            <li className="flex items-center gap-2">
              <Users
                size={18}
                className="text-accent-text"
                aria-hidden="true"
              />
              {recipe.servings} servings
            </li>
          </ul>

          <a
            href={recipe.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-surface transition-colors hover:bg-primary-dark"
          >
            <Play size={16} aria-hidden="true" />
            Watch the video
          </a>
        </div>

        <Image
          src={recipe.image}
          alt={recipe.alt}
          sizes="(max-width: 1024px) 100vw, 50vw"
          placeholder="blur"
          className="aspect-4/3 w-full rounded-xl object-cover"
        />
      </header>

      {/* Ingredients + preparation */}
      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <section
          aria-labelledby="ingredients-title"
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <h2 id="ingredients-title" className="mb-6 text-2xl">
            Ingredients
          </h2>
          <ul className="divide-y divide-line border-y border-line">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient} className="py-3 text-sm">
                {ingredient}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="steps-title">
          <h2 id="steps-title" className="mb-6 text-2xl">
            Preparation
          </h2>
          <ol className="flex flex-col gap-8">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-surface"
                >
                  {index + 1}
                </span>
                <p className="pt-2 text-ink-soft">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
      {/* Feedback */}
      <section
        aria-labelledby="feedback-title"
        className="mt-20 border-t border-line pt-14"
      >
        <div className="mx-auto max-w-2xl">
          <span className="eyebrow">Tried this recipe?</span>
          <h2 id="feedback-title" className="mt-3 mb-3 text-3xl">
            Share your <em>feedback</em>
          </h2>
          <p className="mb-8 text-ink-soft">
            Tell us how it tasted, what you changed, or ask a question. Your
            message goes straight to our kitchen.
          </p>
          <FeedbackForm recipeTitle={recipe.title} />
        </div>
      </section>
    </main>
  );
}
