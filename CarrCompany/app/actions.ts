"use server";

export type ContactState = { ok: boolean; error?: string };

// ponytail: emails via Resend only if RESEND_API_KEY + CONTACT_TO are set; otherwise it
// logs and reports success so the form is usable in dev. No DB/CRM — add when lead storage
// is actually needed. Uses plain fetch, no @resend/* dependency.
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // Validate at the trust boundary — never skip this.
  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in your name, email, and message." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "That email address doesn't look right." };
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) {
    console.log("[contact] (no RESEND_API_KEY/CONTACT_TO set)", { name, email, phone, message });
    return { ok: true };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Carr Company Site <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] resend error", res.status, await res.text());
    return { ok: false, error: "Something went wrong sending your message. Please try again." };
  }
  return { ok: true };
}
