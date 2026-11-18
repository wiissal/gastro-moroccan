import { SITE } from "@/data/site";
import { RECIPES } from "@/data/recipes";
import { STORIES } from "@/data/stories";

export default function sitemap() {
  const pages = ["", "/recipes", "/stories"].map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const recipes = RECIPES.map((recipe) => ({
    url: `${SITE.url}/recipes/${recipe.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const stories = STORIES.map((story) => ({
    url: `${SITE.url}/stories/${story.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...recipes, ...stories];
}