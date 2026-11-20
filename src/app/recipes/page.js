import { RECIPES, RECIPE_GROUPS } from "@/data/recipes";
import Reveal from "@/components/Reveal";
import RecipeSearch from "@/components/RecipeSearch";

export const metadata = {
  title: "Recipes",
  description:
    "Traditional Moroccan recipes with ingredients, step-by-step preparation and videos.",
  alternates: { canonical: "/recipes" },
};

// Title + category + ingredients, lowercase and without accents
function toSearchText(recipe) {
  return [recipe.title, recipe.category, ...recipe.ingredients]
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Only what the cards need is sent to the browser
const SEARCHABLE_RECIPES = RECIPES.map((recipe) => ({
  id: recipe.id,
  slug: recipe.slug,
  title: recipe.title,
  group: recipe.group,
  category: recipe.category,
  description: recipe.description,
  prepTime: recipe.prepTime,
  difficulty: recipe.difficulty,
  image: recipe.image,
  alt: recipe.alt,
  searchText: toSearchText(recipe),
}));

export default function RecipesPage() {
  return (
    <main className="mx-auto max-w-300 px-6 pt-12 pb-20 md:px-10">
      <Reveal className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="eyebrow">From the Moroccan table</span>
        <h1>
          All <em>recipes</em>
        </h1>
        <p className="text-ink-soft">
          Traditional dishes, pastries and drinks explained step by step, from
          everyday soups to celebration sweets.
        </p>
      </Reveal>

      <RecipeSearch recipes={SEARCHABLE_RECIPES} groups={RECIPE_GROUPS} />
    </main>
  );
}