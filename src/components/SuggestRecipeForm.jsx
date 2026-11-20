"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { sendSuggestion } from "@/actions/sendSuggestion";

const initialState = { status: "idle", message: "", errors: {} };

export default function SuggestRecipeForm({ defaultRecipe }) {
  const [state, formAction, isPending] = useActionState(sendSuggestion, initialState);
  const startedAtRef = useRef(null);
  const id = useId();

  useEffect(() => {
    startedAtRef.current.value = String(Date.now());
  }, []);

  if (state.status === "success") {
    return (
      <p role="status" className="font-medium text-primary">
        {state.message}
      </p>
    );
  }

  const errors = state.errors ?? {};
  const values = state.values ?? {};
  const inputClass =
    "w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-soft focus:border-primary aria-invalid:border-red-700";

  return (
    <form action={formAction} noValidate className="flex w-full flex-col gap-5 text-left">
      {/* Anti-spam: hidden from people, tempting for bots */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="startedAt" ref={startedAtRef} />

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-recipe`} className="text-sm font-medium">
          Which dish would you like?
        </label>
        <input
          id={`${id}-recipe`}
          name="recipe"
          defaultValue={values.recipe ?? defaultRecipe}
          maxLength={100}
          aria-invalid={Boolean(errors.recipe)}
          aria-describedby={errors.recipe ? `${id}-recipe-error` : undefined}
          className={inputClass}
        />
        {errors.recipe && (
          <p id={`${id}-recipe-error`} className="text-sm text-red-700">
            {errors.recipe}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-email`} className="text-sm font-medium">
          Your email{" "}
          <span className="font-normal text-ink-soft">
            (optional, to hear when it&apos;s ready)
          </span>
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          defaultValue={values.email}
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
          className={inputClass}
        />
        {errors.email && (
          <p id={`${id}-email-error`} className="text-sm text-red-700">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-note`} className="text-sm font-medium">
          Anything to add?{" "}
          <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <textarea
          id={`${id}-note`}
          name="note"
          rows={3}
          defaultValue={values.note}
          maxLength={1000}
          aria-invalid={Boolean(errors.note)}
          aria-describedby={errors.note ? `${id}-note-error` : undefined}
          className={inputClass}
        />
        {errors.note && (
          <p id={`${id}-note-error`} className="text-sm text-red-700">
            {errors.note}
          </p>
        )}
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="self-center border border-primary bg-primary px-8 py-3.5 text-xs font-semibold tracking-[0.18em] text-surface uppercase transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        {isPending ? "Sending..." : "Send suggestion"}
      </button>
    </form>
  );
}