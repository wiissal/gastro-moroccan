"use server";

import { Resend } from "resend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUCCESS = {
  status: "success",
  message: "Thank you! Your suggestion is on our list.",
};

export async function sendSuggestion(previousState, formData) {
  // Honeypot: real visitors never see or fill this field, bots often do
  if (formData.get("company")) return SUCCESS;

  // Timing: a human needs more than 3 seconds to fill the form
  const startedAt = Number(formData.get("startedAt"));
  if (!startedAt || Date.now() - startedAt < 3000) return SUCCESS;

  const recipe = String(formData.get("recipe") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();

  const errors = {};
  if (recipe.length < 2) errors.recipe = "Please enter the name of a dish.";
  else if (recipe.length > 100) errors.recipe = "Please keep it under 100 characters.";
  if (email && (!EMAIL_PATTERN.test(email) || email.length > 254))
    errors.email = "Please enter a valid email address.";
  if (note.length > 1000) errors.note = "Please keep it under 1000 characters.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the form.",
      errors,
      values: { recipe, email, note },
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Moroccan Gastronomy <onboarding@resend.dev>",
      to: process.env.FEEDBACK_TO_EMAIL,
      ...(email && { replyTo: email }),
      subject: `Recipe suggestion: ${recipe}`,
      text: [
        `Recipe: ${recipe}`,
        `Email: ${email || "(not given)"}`,
        "",
        note || "(no message)",
      ].join("\n"),
    });
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Failed to send recipe suggestion:", error);
    return {
      status: "error",
      message: "Sorry, something went wrong. Please try again later.",
      values: { recipe, email, note },
    };
  }

  return SUCCESS;
}