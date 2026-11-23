import { cacheLife, cacheTag } from "next/cache";
import { createPublicClient } from "@/lib/supabase";

// Approved reviews for one recipe, newest first
export async function getApprovedReviews(recipeSlug) {
  "use cache";
  cacheLife("hours");
  cacheTag("reviews", `reviews-${recipeSlug}`);

  // No keys (e.g. in CI): show no reviews instead of crashing the build
  if (!process.env.SUPABASE_URL) return [];

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, rating, comment, created_at")
    .eq("recipe_slug", recipeSlug)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Loading reviews failed:", error);
    return [];
  }

  return data;
}

// { count: 2, average: 4.5 }
export function summarizeReviews(reviews) {
  const count = reviews.length;
  if (count === 0) return { count: 0, average: 0 };

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return { count, average: Math.round((total / count) * 10) / 10 };
}