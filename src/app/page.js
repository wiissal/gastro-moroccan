import Hero from "@/components/Hero";
import PopularRecipes from "@/components/PopularRecipes";
import FoodCulture from "@/components/FoodCulture";
export default function Home() {
  return (
    <main>
      <Hero />
      <PopularRecipes />
      <FoodCulture />
    </main>
  );
}