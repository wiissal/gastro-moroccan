"use server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendFeedback(previousState, formData) {
  //honeypot : anti spam field no captcha
  if (formData.get("company")) {
    return {
      status: "success",
      message: "Thank you for your feedback ! Have a great day!",
    };
  }

  const recipe = String(formData.get("recipe") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const rating = String(formData.get("rating") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  //validate the server side never trust what the browser sends

  const errors = {};
  if (!name) errors.name = "Please enter your name";
  if (!EMAIL_PATTERN.test(email))
    errors.email = "Please enter a valid email address";
  if (message.length < 10)
    errors.message = "Please write at least 10 characters in your message";
  if (message.lendth > 2000)
    errors.message = " Please keep  your message under 2000 characters";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: " Please check the form", errors };
  }

  try{
    const resend  = new Resend(process.env.RESEND_API_KEY);

    const {error} = await resend.emails.send({
      from : "Moroccan Gastronomy < onboarding@resend.dev>",
      to : process.env.FEEDBACK_TO_EMAIL,
      replyTo : email, //if answer the email will be sent to the user who wrote the feedback
      subject: `New feedback on ${recipe}`,
      text: [
        `recipe: ${recipe}`,
        `From: ${name} <${email}>`,
        `Rating: ${rating || "Not given"}`, 
        "", // to add an empty line between the informations and the message 
        message
      ].join("\n") // it combine all texts in the string into one text 
    });
    if ( error) throw  new Error (error.message);
  }
  catch (error) {
    console.error ("Feedback email failed:", error)
    return{
      status: " error",
      message : " Sorry, something went wrong please try again later ."
    };
  }
   return { status: "success" , message : " Thank you for your feedback ! We appreciate your time , Have a great day!"};
}
