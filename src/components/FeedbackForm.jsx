"use client";

import { useActionState, useEffect, useRef } from "react";
import { CircleCheck } from "lucide-react";
import { sendFeedback } from "@/actions/sendFeedback";

const initialState = { status: "idle", message: "", errors: {} };

const fieldClasses =
  "w-full border border-line bg-surface px-4 py-3 text-sm text-ink transition-colors placeholder:text-ink-soft/60 focus:border-primary focus:outline-none aria-invalid:border-red-700";

const labelClasses = "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-ink";

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-xs text-red-700">
      {message}
    </p>
  );
}

export default function FeedbackForm({ recipeSlug }) {
  const [state, formAction, isPending] = useActionState(sendFeedback, initialState);
  // Records when the form appeared (bots submit far faster than humans)
  const startedAtRef = useRef(null);

  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  const errors = state.errors ?? {};
  const values = state.values ?? {};

  if (state.status === "success") {
    return (
      <p role="status" className="flex items-center gap-3 border border-line bg-surface-alt p-6 text-ink">
        <CircleCheck size={22} className="shrink-0 text-primary" aria-hidden="true" />
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      <input type="hidden" name="recipeSlug" value={recipeSlug} />
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />
      {/* Honeypot: hidden from people, visible to bots */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClasses}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClasses}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <div>
        <label htmlFor="rating" className={labelClasses}>
          How did it taste?
        </label>
        <select
          id="rating"
          name="rating"
          defaultValue={values.rating ?? ""}
          aria-invalid={Boolean(errors.rating)}
          aria-describedby={errors.rating ? "rating-error" : undefined}
          className={fieldClasses}
        >
          <option value="">Choose a rating</option>
          <option value="5">★★★★★ Delicious</option>
          <option value="4">★★★★☆ Very good</option>
          <option value="3">★★★☆☆ Good</option>
          <option value="2">★★☆☆☆ Okay</option>
          <option value="1">★☆☆☆☆ Not for me</option>
        </select>
        <FieldError id="rating-error" message={errors.rating} />
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Your review
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="How did it go? Any tips or changes you made?"
          defaultValue={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldClasses} resize-y`}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      {state.status === "error" && !Object.keys(errors).length && (
        <p role="alert" className="text-sm text-red-700">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-12 w-fit items-center justify-center border border-primary bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-surface transition-colors hover:bg-primary-dark disabled:cursor-wait disabled:opacity-60"
        >
          {isPending ? "Sending…" : "Send review"}
        </button>
        <p className="text-xs text-ink-soft">
          Your name, rating and review may be published on this page after
          moderation. Your email stays private.
        </p>
      </div>
    </form>
  );
}