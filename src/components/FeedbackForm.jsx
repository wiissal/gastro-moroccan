"use client";

import { useActionState } from "react";
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

export default function FeedbackForm({ recipeTitle }) {
  const [state, formAction, isPending] = useActionState(sendFeedback, initialState);
  const errors = state.errors ?? {};

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
      <input type="hidden" name="recipe" value={recipeTitle} />

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
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClasses}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <div>
        <label htmlFor="rating" className={labelClasses}>
          How did it taste? <span className="font-normal normal-case tracking-normal text-ink-soft">(optional)</span>
        </label>
        <select id="rating" name="rating" defaultValue="" className={fieldClasses}>
          <option value="">Choose a rating</option>
          <option value="5 / 5 — Delicious">Delicious</option>
          <option value="4 / 5 — Very good">Very good</option>
          <option value="3 / 5 — Good">Good</option>
          <option value="2 / 5 — Okay">Okay</option>
          <option value="1 / 5 — Not for me">Not for me</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Your feedback
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="How did it go? Any tips or changes you made?"
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

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-12 w-fit items-center justify-center border border-primary bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-surface transition-colors hover:bg-primary-dark disabled:cursor-wait disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send feedback"}
      </button>
    </form>
  );
}