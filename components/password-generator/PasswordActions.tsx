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
      <div className="grid grid-cols-2 gap-2 w-full">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full justify-center gap-2"
                onClick={onCopy}
                aria-label="Copy password"
              >
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
                <span>{isCopied ? "Copied" : "Copy"}</span>
              </Button>
            }
          >
            <TooltipContent>{isCopied ? "Copied!" : "Copy to clipboard"}</TooltipContent>
          </TooltipTrigger>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full justify-center gap-2"
                onClick={onRegenerate}
                aria-label="Regenerate password"
              >
                <RefreshCw size={18} />
                <span>Regenerate</span>
              </Button>
            }
          >
            <TooltipContent>Regenerate password</TooltipContent>
          </TooltipTrigger>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
