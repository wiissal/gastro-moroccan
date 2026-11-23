import { Star } from "lucide-react";

export default function StarRating({ rating, size = 16 }) {
  const rounded = Math.round(rating);

  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className="inline-flex items-center gap-0.5"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          aria-hidden="true"
          fill={star <= rounded ? "currentColor" : "none"}
          className={star <= rounded ? "text-accent" : "text-line"}
        />
      ))}
    </span>
  );
}