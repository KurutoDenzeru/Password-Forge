import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PasswordActionsProps {
  onCopy: () => void;
  onRegenerate: () => void;
  isCopied: boolean;
}

export function PasswordActions({ onCopy, onRegenerate, isCopied }: PasswordActionsProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="icon" onClick={onCopy} aria-label="Copy password" />}>
            <span className="relative grid size-4 place-items-center">
              <Copy
                size={18}
                className={`absolute transition-all duration-200 ease-out ${isCopied ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
              />
              <Check
                size={18}
                className={`absolute text-[#788c5d] transition-all duration-200 ease-out ${isCopied ? "scale-100 opacity-100 animate-in zoom-in-50 fade-in" : "scale-0 opacity-0"}`}
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>{isCopied ? 'Copied!' : 'Copy to clipboard'}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="icon" onClick={onRegenerate} aria-label="Regenerate password" />}>
            <RefreshCw size={18} />
          </TooltipTrigger>
          <TooltipContent>Regenerate password</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
