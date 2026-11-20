import Image from "next/image";
import Link from "next/link";
import { Clock, ChefHat } from "lucide-react";

export default function RecipeCard({ recipe }) {
  return (
    <article className="group">
      <Link href={`/recipes/${recipe.slug}`} className="block">
        <div className="overflow-hidden rounded-xl">
          <Image
            src={recipe.image}
            alt={recipe.alt}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            placeholder="blur"
            className="aspect-4/5 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 lg:aspect-4/3"
          />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <span className="eyebrow">{recipe.category}</span>
          <h3 className="text-2xl transition-colors group-hover:text-primary">
            {" "}
            {recipe.title}
          </h3>
          <p className="line-clamp-2 text-sm text-ink-soft">
            {recipe.description}
          </p>

          <div className="mt-1 flex items-center gap-5 text-xs text-ink-soft">
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-accent" aria-hidden="true" />{" "}
              {recipe.prepTime}
            </span>
            <span className="flex items-center gap-1.5">
              <ChefHat size={14} className="text-accent" aria-hidden="true" />{" "}
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
