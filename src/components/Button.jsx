import Link from "next/link";

const VARIANTS = {
  // Solid green → darker green on hover
  primary:
    "border-primary bg-primary text-surface hover:border-primary-dark hover:bg-primary-dark",
  // Outlined → fills with green on hover
  ghost:
    "border-primary bg-transparent text-primary hover:bg-primary hover:text-surface",
};

export default function Button({ href, variant = "primary", children }) {
  
  const isSamePageLink = href.startsWith("#");
  const Component = isSamePageLink ? "a" : Link;

  return (
    <Component
      href={href}
      className={`inline-flex min-h-12 items-center justify-center border px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card active:translate-y-0 ${VARIANTS[variant]}`}
    >
      {children}
    </Component>
  )
}