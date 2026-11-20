import JsonLd from "@/components/JsonLd";
import { getSiteJsonLd } from "@/lib/structured-data";

import Hero from "@/components/Hero";
import PopularRecipes from "@/components/PopularRecipes";
import FoodCulture from "@/components/FoodCulture";
import Ingredients from "@/components/Ingredients";
import About from "@/components/About";

export const metadata = {
  alternates: { canonical: "/" },
};
export default function Home() {
  return (
    <main  className="scroll-mt-20">
       <JsonLd data={getSiteJsonLd()} />
      <Hero />
      <PopularRecipes />
      <FoodCulture />
      <Ingredients />
      <About />
    </main>
  );
}