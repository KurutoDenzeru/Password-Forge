import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PasswordType, PasswordOptions as Options, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "./types";

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
      {/* Password Length */}
      <div className="flex items-center gap-4">
        <Label htmlFor="length">Length</Label>
        <Input
          id="length"
          type="number"
          min={MIN_PASSWORD_LENGTH}
          max={MAX_PASSWORD_LENGTH}
          value={options.length}
          onChange={e => onChange({ ...options, length: Math.max(MIN_PASSWORD_LENGTH, Math.min(MAX_PASSWORD_LENGTH, Number(e.target.value))) })}
          className="w-full"
        />
        <Slider
          min={MIN_PASSWORD_LENGTH}
          max={MAX_PASSWORD_LENGTH}
          value={[options.length]}
          onValueChange={([val]) => onChange({ ...options, length: val })}
          className="w-full"
        />
        <span className="text-xs">{options.length} chars</span>
      </div>
      {/* Password Type */}
      <div className="flex items-center gap-2 w-full">
        <Label htmlFor="password-type">Password Type</Label>
        <Select
          value={options.type}
          onValueChange={val => onChange({ ...options, type: val as PasswordType })}
        >
          <SelectTrigger id="password-type" className="w-full max-w-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PASSWORD_TYPES.map(type => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Password Character Options */}
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
      
    </div>
  );
}
