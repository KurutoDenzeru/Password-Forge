"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordOptions } from "./PasswordOptions";
import { PasswordStrength } from "./PasswordStrength";
import { PasswordActions } from "./PasswordActions";
import { generateRandomPassword, getPasswordStrength } from "./utils";
import { PasswordOptions as Options } from "./types";
import { z } from "zod";

const optionsSchema = z.object({
  type: z.enum(["random", "memorable"]),
  length: z.number().min(4).max(32),
  includeUppercase: z.boolean(),
  includeLowercase: z.boolean(),
  includeNumbers: z.boolean(),
  includeSymbols: z.boolean(),
});

const DEFAULT_OPTIONS: Options = {
  type: "random",
  length: 12,
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

  const handleOptionsChange = (opts: Options) => {
    const parsed = optionsSchema.safeParse(opts);
    if (!parsed.success) return;
    setOptions(opts);
    setPassword(generateRandomPassword(opts));
    setIsCopied(false);
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
  };

  const strength = getPasswordStrength(password);

  return (
    <Card className="max-w-md mx-auto mt-10 p-6 space-y-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Password Generator</h2>
      <div>
        <Input
          value={password}
          readOnly
          className="font-mono text-lg tracking-wider bg-gray-100"
          aria-label="Generated password"
        />
        <PasswordActions
          onCopy={handleCopy}
          onRegenerate={handleRegenerate}
          isCopied={isCopied}
        />
        <PasswordStrength strength={strength} />
      </div>
      <PasswordOptions options={options} onChange={handleOptionsChange} />
    </Card>
  );
}
