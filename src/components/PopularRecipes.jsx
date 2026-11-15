import { POPULAR_RECIPES } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";

export default function PopularRecipes() {
  return (
    <section
      id="recipes"
      aria-labelledby="recipes-title"
      className="scroll-mt-20 bg-sand/50 py-14 md:py-20 lg:section-screen lg:pt-8 lg:pb-12 "
    > 
      <div className="mx-auto max-w-300 px-6 md:px-10">
        <Reveal className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-4 text-center md:mb-12 lg:mb-8">
          <span className="eyebrow">From the Moroccan table</span>
          <h2 id="recipes-title">
            Popular <em>recipes</em>
          </h2>
          <p className="text-ink-soft">
            Timeless dishes cooked in Moroccan homes, from Friday couscous to the
            harira that breaks the fast.
          </p>
        </Reveal>

        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR_RECIPES.map((recipe, index) => (
            <li key={recipe.id}>
              <Reveal delay={index * 0.1}>
                <RecipeCard recipe={recipe} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-10 flex justify-center lg:mt-6">
          <Button href="/recipes" variant="ghost">
            View all recipes
          </Button>
        </Reveal>
      </div>
    </section>
  );
}