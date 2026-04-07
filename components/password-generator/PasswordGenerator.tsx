"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordOptions } from "./PasswordOptions";
import { PasswordStrength } from "./PasswordStrength";
import { PasswordActions } from "./PasswordActions";
import { generateRandomPassword, getPasswordStrength } from "./utils";
import { PasswordOptions as Options, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "./types";
import { z } from "zod";
import { toast } from "sonner";

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
    toast.success("Password copied to clipboard", {
      description: "You can paste it wherever you need it.",
    });
    setTimeout(() => setIsCopied(false), 1200);
  };

  const handleRegenerate = () => {
    setPassword(generateRandomPassword(options));
    setIsCopied(false);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const strength = getPasswordStrength(password);

  return (
    <Card className="w-full overflow-hidden border border-border/50 shadow-2xl shadow-primary/5 bg-card/80 backdrop-blur-xl transition-all duration-300 hover:shadow-primary/10">
      <div className="p-6 sm:p-8 space-y-8">
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
            <div className="relative flex-1 group">
              <Input
                id="generated-password"
                value={password}
                onChange={handlePasswordInput}
                className="font-mono text-2xl sm:text-3xl px-4 bg-background border-border shadow-inner text-foreground tracking-widest text-center transition-all focus-visible:ring-primary focus-visible:border-primary w-full"
                aria-label="Generated password or test your own"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <div className="flex items-center justify-center shrink-0">
              <PasswordActions
                onCopy={handleCopy}
                onRegenerate={handleRegenerate}
                isCopied={isCopied}
              />
            </div>
          </div>
          <div className="pt-2">
            <PasswordStrength strength={strength} />
          </div>
        </div>

        <div className="bg-muted/30 rounded-xl p-4 sm:p-6 border border-border/40">
          <PasswordOptions options={options} onChange={handleOptionsChange} />
        </div>
      </div>
    </Card>
  );
}
