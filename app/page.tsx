import { PasswordGenerator } from "@/components/password-generator/PasswordGenerator";

/**
 * Home page with custom SVG background and centered password generator.
 * Uses Tailwind for layout, but applies background via inline style for SVG support.
 */
export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
    >
      <PasswordGenerator />
    </main>
  );
}