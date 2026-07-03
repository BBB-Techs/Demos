"use client";

import { useState } from "react";
import { motion } from "motion/react";

// Static-export-safe twin of Contact.tsx. GitHub Pages has no server, so this can't run
// the "use server" action in app/actions.ts — output: "export" doesn't support Server
// Actions at all. This mirrors the same markup/validation but resolves client-side only.
// Used only by the preview/ static build (see scripts/build-static-preview.sh); the real
// Contact.tsx with working email-send stays the source of truth for actual deployment.

type State = { ok: boolean; error?: string };

const field =
  "w-full rounded-xl border border-line bg-ink-soft px-4 py-3.5 text-paper placeholder:text-muted/60 outline-none transition focus:border-accent";

export default function ContactStatic() {
  const [state, setState] = useState<State>({ ok: false });
  const [pending, setPending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setState({ ok: false, error: "Please fill in your name, email, and message." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState({ ok: false, error: "That email address doesn't look right." });
      return;
    }

    setPending(true);
    setState({ ok: false });
    setTimeout(() => {
      setPending(false);
      setState({ ok: true }); // demo build — no server to actually send this
    }, 600);
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <div className="grid gap-14 md:grid-cols-2">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="display text-[clamp(2.5rem,6vw,5rem)] text-paper"
          >
            Let&apos;s build the <span className="text-accent">connection.</span>
          </motion.h2>
          <p className="mt-6 max-w-md text-lg text-muted">
            Manufacturer, builder, or showroom — tell us about your project and the right
            person on our team will reach out.
          </p>
          <div className="mt-10 space-y-2 text-sm text-muted">
            <p>Tampa &amp; Boca Raton, Florida</p>
            <p>Serving Florida &amp; the Carolinas</p>
          </div>
        </div>

        {state.ok ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-start justify-center rounded-3xl border border-accent/40 bg-ink-soft p-10"
          >
            <span className="display text-4xl text-accent">Thank you.</span>
            <p className="mt-4 text-muted">
              Your message is on its way. We&apos;ll be in touch shortly.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <input name="name" required placeholder="Name" className={field} />
            <input name="email" type="email" required placeholder="Email" className={field} />
            <input name="phone" placeholder="Phone (optional)" className={field} />
            <textarea name="message" required rows={5} placeholder="How can we help?" className={field} />
            {state.error && <p className="text-sm text-rose-400">{state.error}</p>}
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-xl bg-accent px-6 py-4 font-semibold text-ink transition hover:bg-accent-soft disabled:opacity-60"
            >
              {pending ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
