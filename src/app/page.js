import Hero from "@/components/Hero";
import PopularRecipes from "@/components/PopularRecipes";
import FoodCulture from "@/components/FoodCulture";
import Ingredients from "@/components/Ingredients";
import About from "@/components/About";
export default function Home() {
  return (
    <main  className="scroll-mt-20">
      <Hero />
      <PopularRecipes />
      <FoodCulture />
      <Ingredients />
      <About />
    </main>
  );
}