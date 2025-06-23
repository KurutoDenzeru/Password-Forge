import { PasswordGenerator } from "@/components/password-generator/PasswordGenerator";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <PasswordGenerator />
    </main>
  );
}