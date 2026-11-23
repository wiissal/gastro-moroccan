import StarRating from "@/components/StarRating";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return (
      <p className="border border-line bg-surface-alt p-6 text-ink-soft">
        No reviews yet. Be the first to tell us how it went!
      </p>
    );
  }

  return (
    <ul className="divide-y divide-line border-y border-line">
      {reviews.map((review) => (
        <li key={review.id} className="flex flex-col gap-2 py-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-ink">{review.name}</p>
            <time
              dateTime={review.created_at}
              className="text-xs text-ink-soft"
            >
              {dateFormatter.format(new Date(review.created_at))}
            </time>
          </div>
          <StarRating rating={review.rating} />
          {review.comment && (
            <p className="whitespace-pre-line text-ink-soft">
              {review.comment}
            </p>
          )}{" "}
        </li>
      ))}
    </ul>
  );
}
