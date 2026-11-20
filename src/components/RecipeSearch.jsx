"use client";

import { useId, useState } from "react";
import { Search, X } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import Reveal from "@/components/Reveal";
import { SITE } from "@/data/site";
import SuggestRecipeForm from "@/components/SuggestRecipeForm";

// "Tajine" → "tajine", "Rfissà" → "rfissa"
function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function RecipeSearch({ recipes, groups }) {
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const inputId = useId();

  const search = normalize(query.trim());
  const results = search
    ? recipes.filter((recipe) => recipe.searchText.includes(search))
    : recipes;

  const suggestHref = `mailto:${SITE.email}?subject=${encodeURIComponent(
    `Recipe suggestion: ${query.trim()}`,
  )}`;

  return (
    <>
      <div className="mx-auto mb-14 max-w-xl">
        <label htmlFor={inputId} className="sr-only">
          Search recipes
        </label>
        <div className="relative">
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-soft"
          />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by dish or ingredient, e.g. lamb"
            autoComplete="off"
            className="w-full rounded-full border border-line bg-surface py-3.5 pr-12 pl-11 text-sm text-ink placeholder:text-ink-soft focus:border-primary [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1.5 text-ink-soft transition-colors hover:text-primary"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
        <p
          aria-live="polite"
          className="mt-3 text-center text-sm text-ink-soft"
        >
          {search &&
            `${results.length} ${results.length === 1 ? "recipe" : "recipes"} found`}
        </p>
      </div>

      {results.length === 0 ? (
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <h2 className="text-2xl">
            Not in our kitchen <em>yet</em>
          </h2>
          <p className="text-ink-soft">
            We don&apos;t have a recipe for &ldquo;{query.trim()}&rdquo; yet.
            New recipes are coming soon!
          </p>
          {showForm ? (
            <SuggestRecipeForm defaultRecipe={query.trim()} />
          ) : (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-2 border border-primary px-8 py-3.5 text-xs font-semibold tracking-[0.18em] text-primary uppercase transition-colors hover:bg-primary hover:text-surface"
            >
              Suggest this recipe
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-16">
          {groups.map((group) => {
            const groupRecipes = results.filter(
              (recipe) => recipe.group === group,
            );
            if (groupRecipes.length === 0) return null;

            return (
              <section key={group} aria-label={group}>
                <h2 className="mb-8 border-b border-line pb-4 text-2xl">
                  {group}
                </h2>
                <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                  {groupRecipes.map((recipe, index) => (
                    <li key={recipe.id}>
                      <Reveal delay={index * 0.1}>
                        <RecipeCard recipe={recipe} />
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </>
  );
}
