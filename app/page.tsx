import Image from "next/image";
import NotifyForm from "./notify-form";

// shortcut: links point to "#", replace with the real Zecca Gold profiles
const socials = [
  { name: "Facebook", href: "#", icon: "/icons/facebook.svg" },
  { name: "Twitter", href: "#", icon: "/icons/twitter.svg" },
  { name: "LinkedIn", href: "#", icon: "/icons/linkedin.svg" },
  { name: "Instagram", href: "#", icon: "/icons/instagram.svg" },
];

export default function Home() {
  return (
    <>
      <video
        src="/bg-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="fixed inset-0 -z-10 size-full object-cover opacity-20 mix-blend-hard-light"
      />
      <header className="px-4 pt-6">
        <nav className="mx-auto flex max-w-5xl items-center justify-between glass rounded-2xl px-5 py-3">
          <Image src="/logo.svg" alt="Zecca Gold" width={186} height={34} className="h-7 w-auto sm:h-8" priority />
          <ul className="flex gap-2 sm:gap-3">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  aria-label={s.name}
                  className="grid size-9 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:scale-105 sm:size-10"
                >
                  <Image src={s.icon} alt="" width={18} height={18} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Something Precious
          <span className="text-brand-gradient block">Is Taking Shape</span>
        </h1>
        <div className="mt-10 w-full">
          <NotifyForm />
        </div>
      </main>

      <footer className="bg-footer-gradient py-2.5 text-center text-xs text-white">
        © 2026 Zecca Gold. All Rights Reserved.
      </footer>
    </>
  );
}
