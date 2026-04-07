import Image from "next/image";

import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-[42rem] items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#181816]/80 dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-3">
          <Image
            src="/favicon.png"
            alt="Password Forge Logo"
            className="h-8 w-8"
            width={32}
            height={32}
          />
          <span className="font-sans text-lg font-bold tracking-tight">Password Forge</span>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}