import Link from "next/link";

const VARIANTS = {
  primary: "bg-green text-ivory hover:bg-green-dark",
  ghost: "border-green text-green hover:bg-green hover:text-ivory",
};

export default function Button({ href, variant = "primary", children }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center border border-transparent px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${VARIANTS[variant]}`}
    >
      {children}
    </Link>
  );
}