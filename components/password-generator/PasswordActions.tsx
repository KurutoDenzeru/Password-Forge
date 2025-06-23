import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PasswordActionsProps {
  password: string;
  onCopy: () => void;
  onRegenerate: () => void;
  isCopied: boolean;
}

export function PasswordActions({ password, onCopy, onRegenerate, isCopied }: PasswordActionsProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 mt-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onCopy} aria-label="Copy password">
              <Copy className={isCopied ? 'text-green-500' : ''} size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isCopied ? 'Copied!' : 'Copy to clipboard'}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onRegenerate} aria-label="Regenerate password">
              <RefreshCw size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Regenerate password</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
