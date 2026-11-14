import { RECIPES } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Recipes",
  description:
    "Traditional Moroccan recipes with ingredients, step-by-step preparation and videos.",
};

export default function RecipesPage() {
  return (
    <main className="mx-auto max-w-300 px-6 pt-12 pb-20 md:px-10">
      <Reveal className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="eyebrow">From the Moroccan table</span>
        <h1>
          All <em>recipes</em>
        </h1>
        <p className="text-ink-soft">
          Traditional dishes explained step by step, from everyday soups to
          celebration pastillas.
        </p>
      </Reveal>

      <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {RECIPES.map((recipe, index) => (
          <li key={recipe.id}>
            <Reveal delay={index * 0.1}>
              <RecipeCard recipe={recipe} />
            </Reveal>
          </li>
        ))}
      </ul>
    </main>
  );
}
