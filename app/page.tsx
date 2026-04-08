import { HomeHero } from "@/components/home-hero";
import { PasswordGenerator } from "@/components/password-generator/PasswordGenerator";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-background text-foreground selection:bg-primary/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none"></div>

      <SiteHeader />

      <main className="flex-1 flex flex-col items-center justify-center pt-8 px-4 pb-4 sm:pt-10 sm:px-6 sm:pb-6 w-full max-w-5xl mx-auto z-10">
        <div className="w-full flex flex-col items-center space-y-12">
          <HomeHero
            title="Forged for"
            eyebrow="Security"
            description="Generate incredibly strong, unique passwords instantly. Never compromise on your digital safety again."
          />

          <div className="w-full max-w-xl">
            <PasswordGenerator />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}