import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { PasswordType, PasswordOptions as Options } from "./types";

interface PasswordOptionsProps {
  options: Options;
  onChange: (opts: Options) => void;
}

const PASSWORD_TYPES: { label: string; value: PasswordType }[] = [
  { label: "Random", value: "random" },
  { label: "Memorable", value: "memorable" },
];

export function PasswordOptions({ options, onChange }: PasswordOptionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label>Password Type</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center border rounded px-3 py-1 text-sm">
              {PASSWORD_TYPES.find(t => t.value === options.type)?.label}
              <ChevronDown className="ml-2 w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {PASSWORD_TYPES.map(type => (
              <DropdownMenuItem key={type.value} onSelect={() => onChange({ ...options, type: type.value })}>
                {type.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-wrap gap-4">
        <Label className="flex items-center gap-2">
          <Checkbox checked={options.includeUppercase} onCheckedChange={v => onChange({ ...options, includeUppercase: !!v })} />
          Uppercase (A-Z)
        </Label>
        <Label className="flex items-center gap-2">
          <Checkbox checked={options.includeLowercase} onCheckedChange={v => onChange({ ...options, includeLowercase: !!v })} />
          Lowercase (a-z)
        </Label>
        <Label className="flex items-center gap-2">
          <Checkbox checked={options.includeNumbers} onCheckedChange={v => onChange({ ...options, includeNumbers: !!v })} />
          Numbers (0-9)
        </Label>
        <Label className="flex items-center gap-2">
          <Checkbox checked={options.includeSymbols} onCheckedChange={v => onChange({ ...options, includeSymbols: !!v })} />
          Symbols (!&*)
        </Label>
      </div>
      <div className="flex items-center gap-4">
        <Label htmlFor="length">Length</Label>
        <Input
          id="length"
          type="number"
          min={4}
          max={32}
          value={options.length}
          onChange={e => onChange({ ...options, length: Number(e.target.value) })}
          className="w-16"
        />
        <Slider
          min={4}
          max={32}
          value={[options.length]}
          onValueChange={([val]) => onChange({ ...options, length: val })}
          className="w-40"
        />
        <span className="text-xs">{options.length} chars</span>
      </div>
    </div>
  );
}
