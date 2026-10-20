import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { YoutubeIcon } from "@hugeicons/core-free-icons";
import NotifyForm from "./notify-form";

const socials = [
  { name: "Facebook", href: "https://www.facebook.com/zeccagold", icon: "/icons/facebook.svg" },
  { name: "X (Twitter)", href: "https://x.com/zeccagold", icon: "/icons/twitter.svg" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/zecca-gold/", icon: "/icons/linkedin.svg" },
  { name: "Instagram", href: "https://www.instagram.com/zecca.gold/", icon: "/icons/instagram.svg" },
  { name: "YouTube", href: "https://www.youtube.com/@ZeccaGold", icon: YoutubeIcon },
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
        <nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 glass rounded-2xl px-3 py-3 sm:px-5">
          {/* Logo shrinks first so the icons always fit on narrow phones */}
          <div className="min-w-0 flex-1">
            <Image src="/logo.svg" alt="Zecca Gold" width={186} height={34} className="h-auto w-full max-w-[140px] sm:max-w-[175px]" priority />
          </div>
          <ul className="flex shrink-0 gap-1 sm:gap-3">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Zecca Gold on ${s.name}`}
                  className="grid size-7 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:scale-105 sm:size-10"
                >
                  {typeof s.icon === "string" ? (
                    <Image src={s.icon} alt="" width={18} height={18} className="size-3.5 sm:size-[18px]" />
                  ) : (
                    <HugeiconsIcon icon={s.icon} strokeWidth={2} className="size-4 sm:size-5" aria-hidden />
                  )}
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
