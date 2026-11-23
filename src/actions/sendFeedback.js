"use server";

import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase";
import { getRecipeBySlug } from "@/data/recipes";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUCCESS = {
  status: "success",
  message:
    "Thank you for your review! It will appear on this page once approved.",
};
export async function sendFeedback(previousState, formData) {
  // Honeypot: anti-spam field, no captcha
  if (formData.get("company")) return SUCCESS;

  // Too fast to be human (or the timestamp is missing): silently ignore
  const startedAt = Number(formData.get("startedAt"));
  if (!startedAt || Date.now() - startedAt < 3000) return SUCCESS;

  const recipeSlug = String(formData.get("recipeSlug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const rating = Number(formData.get("rating"));
  const message = String(formData.get("message") ?? "").trim();

  // Only real recipes can receive reviews
  const recipe = getRecipeBySlug(recipeSlug);
  if (!recipe) {
    return { status: "error", message: "Sorry, this recipe doesn't exist." };
  }

  // Validate on the server side: never trust what the browser sends
  const errors = {};
  if (!name) errors.name = "Please enter your name.";
  if (name.length > 100)
    errors.name = "Please keep your name under 100 characters.";
  if (!EMAIL_PATTERN.test(email))
    errors.email = "Please enter a valid email address.";
  if (email.length > 254) errors.email = "Please enter a valid email address.";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5)
    errors.rating = "Please choose a rating.";
  if (message && message.length < 10)
    errors.message = "Please write at least 10 characters, or leave it empty.";
  if (message.length > 2000)
    errors.message = "Please keep your message under 2000 characters.";
  // Sent back so the form keeps what the visitor typed
  const values = { name, email, rating: formData.get("rating") ?? "", message };
//a rating alone has nothing to moderate so iots published right away 
const ratingOnly = !message;
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the form.",
      errors,
      values,
    };
  }

  // 1. Save the review (hidden until you approve it)
  const supabase = createAdminClient();
  const { error: dbError } = await supabase.from("reviews").insert({
    recipe_slug: recipe.slug,
    name,
    rating,
    comment: message || null,
    approved : ratingOnly
  });

  if (dbError) {
    console.error("Saving review failed:", dbError);
    return {
      status: "error",
      message: "Sorry, something went wrong. Please try again later.",
      values,
    };
  }

  // 2. Notify you by email (if this fails, the review is still saved)
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Moroccan Gastronomy <onboarding@resend.dev>",
      to: process.env.FEEDBACK_TO_EMAIL,
      replyTo: email,
      subject: `New review on ${recipe.title} (${rating}/5)`,
      text: [
        `Recipe: ${recipe.title}`,
        `From: ${name} <${email}>`,
        `Rating: ${rating}/5`,
        "",
        message || "(Rating only: published automatically)",
        "",
        "Approve it in Supabase: Table Editor → reviews → set approved to true.",
      ].join("\n"),
    });
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Review notification email failed:", error);
  }

  return ratingOnly 
  ? {status: "success" , message: "Thank you for your rating! It has been published . Have a lovely day ."}
  : SUCCESS;
}
