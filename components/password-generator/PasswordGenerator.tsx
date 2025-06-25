"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordOptions } from "./PasswordOptions";
import { PasswordStrength } from "./PasswordStrength";
import { PasswordActions } from "./PasswordActions";
import { generateRandomPassword, getPasswordStrength } from "./utils";
import { PasswordOptions as Options, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "./types";
import { z } from "zod";

const optionsSchema = z.object({
  type: z.enum(["random", "memorable"]),
  length: z.number().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
  includeUppercase: z.boolean(),
  includeLowercase: z.boolean(),
  includeNumbers: z.boolean(),
  includeSymbols: z.boolean(),
});

const DEFAULT_OPTIONS: Options = {
  type: "random",
  length: MIN_PASSWORD_LENGTH,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: false,
};

export function PasswordGenerator() {
  const [options, setOptions] = useState<Options>(DEFAULT_OPTIONS);
  const [password, setPassword] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  // Generate password on mount and when options change
  useEffect(() => {
    setPassword(generateRandomPassword(options));
  }, [options]);

  // Track if user is editing the password manually
  const [isUserEditing, setIsUserEditing] = useState(false);

  const handleOptionsChange = (opts: Options) => {
    const parsed = optionsSchema.safeParse(opts);
    if (!parsed.success) return;
    setOptions(opts);
    setPassword(generateRandomPassword(opts));
    setIsCopied(false);
    setIsUserEditing(false);
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1200);
  };

  const handleRegenerate = () => {
    setPassword(generateRandomPassword(options));
    setIsCopied(false);
    setIsUserEditing(false);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsUserEditing(true);
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="flex flex-col items-center">
      <Image
        src="/favicon.png"
        alt="Password Forge Logo"
        className="mb-4 rounded-lg w-auto h-auto max-w-[100px] max-h-[100px]"
        loading="lazy"
        style={{ objectFit: "contain" }}
      />
      <Card className="max-w-lg w-full mx-auto p-6 space-y-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Password Generator</h2>
        <div className="flex flex-col gap-2">
          {/* Inline password label, input, and actions */}
          <div className="flex items-center gap-2 w-full">
            <Input
              id="generated-password"
              value={password}
              onChange={handlePasswordInput}
              className="font-mono text-lg tracking-wider bg-gray-100 flex-1"
              aria-label="Generated password or test your own"
              autoComplete="off"
              spellCheck={false}
            />
            <PasswordActions
              onCopy={handleCopy}
              onRegenerate={handleRegenerate}
              isCopied={isCopied}
            />
          </div>
          <PasswordStrength strength={strength} />
        </div>
        <PasswordOptions options={options} onChange={handleOptionsChange} />
      </Card>
    </div>
  );
}
