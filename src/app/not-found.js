import Image from "next/image";
import Button from "@/components/Button";
import tagine from "@/assets/images/hero/hero-tagine.jpg";

export const metadata = {
  title: "Page not found",
  description: "The page you are looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="section-screen px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 text-center md:flex-row md:gap-16 md:text-left">
        {/* A tilted card, echoing the hero */}
        <div className="w-48 shrink-0 rotate-3 rounded-2xl bg-surface p-3 shadow-card md:w-64">
          <Image
            src={tagine}
            alt=""
            placeholder="blur"
            sizes="(min-width: 768px) 256px, 192px"
            className="aspect-4/5 rounded-xl object-cover"
          />
          <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
            Not on the menu
          </p>
        </div>

        <div>
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-4">
            This dish isn&apos;t on the <em>menu</em>
          </h1>
          <p className="mt-5 max-w-md text-ink-soft">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
            Let&apos;s get you back to the Moroccan table.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <Button href="/">Back to home</Button>
            <Button href="/recipes" variant="ghost">
              Browse recipes
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}