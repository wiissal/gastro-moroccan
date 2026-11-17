import Image from "next/image";

export default function IngredientCard({ ingredient }) {
  return (
    <figure className="group flex flex-col items-center gap-4 text-center">
      <div className="mx-auto w-full max-w-28 overflow-hidden rounded-full ring-1 ring-line ring-offset-4 ring-offset-transparent transition-shadow duration-500 group-hover:ring-accent sm:max-w-32">
        <Image
          src={ingredient.image}
          alt={ingredient.alt}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 128px"
          placeholder="blur"
          className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      <figcaption className="flex flex-col gap-1.5">
        <h3 className="text-lg">{ingredient.name}</h3>
        <p className="text-xs leading-relaxed text-ink-soft">
          {ingredient.tagline}
        </p>
      </figcaption>
    </figure>
  );
}
