import { SITE } from "@/data/site";

// "2 h" → "PT2H", "1 h 30 min" → "PT1H30M", "45 min" → "PT45M"
function toIsoDuration(text) {
  const hours = text.match(/(\d+)\s*h/);
  const minutes = text.match(/(\d+)\s*min/);
  if (!hours && !minutes) return undefined;
  return `PT${hours ? `${hours[1]}H` : ""}${minutes ? `${minutes[1]}M` : ""}`;
}

export function getRecipeJsonLd(recipe) {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: [`${SITE.url}${recipe.image.src}`],
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    recipeCuisine: "Moroccan",
    recipeCategory: recipe.category,
    recipeYield: recipe.servings,
    totalTime: toIsoDuration(recipe.prepTime),
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((step) => ({
      "@type": "HowToStep",
      text: step,
    })),
  };
}