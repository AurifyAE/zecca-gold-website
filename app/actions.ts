"use server";

// First char must be alphanumeric so the sheet never treats an email as a formula (=, +, -, @)
const EMAIL = /^[A-Za-z0-9][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export async function subscribe(email: string): Promise<{ error?: string }> {
  email = String(email).trim();
  if (email.length > 254 || !EMAIL.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) {
    console.error("GOOGLE_SHEET_WEBHOOK_URL is not set");
    return { error: "Signups are unavailable right now. Please try again later." };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, secret: process.env.GOOGLE_SHEET_SECRET }),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error ?? `status ${res.status}`);
    return {};
  } catch (err) {
    console.error("Google Sheet signup failed:", err);
    return { error: "Something went wrong. Please try again." };
  }
}
