"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

// Design-only for now: shows a thank-you message instead of sending anything.
export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p role="status" className="text-sm text-ivory/80">
        Thank you! Our newsletter is coming soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="Your email"
        className="min-w-0 flex-1 border border-ivory/30 bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/50 focus:border-gold focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex items-center justify-center bg-gold px-4 text-green transition-colors hover:bg-ivory"
      >
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </form>
  );
}