import { INGREDIENTS } from "@/data/ingredients";
import IngredientCard from "@/components/IngredientCard";
import Reveal from "@/components/Reveal";

export default function Ingredients() {
  return (
    <section
      id="ingredients"
      aria-labelledby="ingredients-title"
      className="scroll-mt-20 bg-sand/50 pt-12 pb-14 md:pt-14 md:pb-20 lg:section-screen"
    >
      <div className="mx-auto max-w-300 px-6 md:px-10">
        <Reveal className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-4 text-center md:mb-12">
          <span className="eyebrow">The Moroccan pantry</span>
          <h2 id="ingredients-title">
            The <em>ingredients</em> behind every dish
          </h2>
          <p className="text-ink-soft">
            A handful of spices, oils and aromas give Moroccan cuisine its soul.
            Here are the ones you&apos;ll meet in almost every kitchen.
          </p>
        </Reveal>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {INGREDIENTS.map((ingredient, index) => (
            <li key={ingredient.id}>
              <Reveal delay={index * 0.08}>
                <IngredientCard ingredient={ingredient} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}