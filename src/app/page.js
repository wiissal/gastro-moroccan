import Hero from "@/components/Hero";
import PopularRecipes from "@/components/PopularRecipes";
import FoodCulture from "@/components/FoodCulture";
import Ingredients from "@/components/Ingredients";
export default function Home() {
  return (
    <main>
      <Hero />
      <PopularRecipes />
      <FoodCulture />
      <Ingredients />
    </main>
  );
}