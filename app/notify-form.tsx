"use client";

import { useState, useTransition } from "react";
import { subscribe } from "./actions";

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  if (submitted) {
    return (
      <div
        role="status"
        className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 text-left shadow-[0_10px_40px_-12px_rgba(120,60,140,0.25)]"
      >
        <p className="flex items-center gap-2 text-lg font-semibold">
          <span className="grid size-5 place-items-center rounded-full bg-[#7b3fa8] text-white">
            <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M3.5 8.5l3 3 6-7" />
            </svg>
          </span>
          You&apos;re on the list!
        </p>
        <p className="mt-2 text-muted">
          We&apos;ll notify you at <span className="text-ink">{email}</span> when zecca.gold launches
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-brand-gradient mt-4 cursor-pointer font-medium"
        >
          Change email →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        startTransition(async () => {
          const res = await subscribe(email);
          if (res.error) setError(res.error);
          else setSubmitted(true);
        });
      }}
      className="mx-auto w-full max-w-md"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          aria-invalid={!!error}
          aria-describedby={error ? "email-error" : undefined}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="h-12 w-full rounded-xl sm:flex-1 bg-white px-4 text-ink outline-none ring-1 ring-black/5 placeholder:text-muted focus:ring-2 focus:ring-[#c8389b]"
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-brand-gradient h-12 cursor-pointer rounded-xl px-6 font-medium text-white transition hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : "Notify me"}
        </button>
      </div>
      {error && (
        <p id="email-error" role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
      <p className="mt-4 text-sm text-muted">
        No spam, only launch updates and early-access announcements.
      </p>
    </form>
  );
}
