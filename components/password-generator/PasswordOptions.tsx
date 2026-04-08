import { Checkbox } from "@/components/ui/checkbox";
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
    <div className="space-y-6">
      {/* Password Type */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Label htmlFor="password-type-trigger" className="font-semibold text-foreground/80">
          Generation Type
        </Label>
        <Select
          value={options.type}
          onValueChange={val => onChange({ ...options, type: val as PasswordType })}
        >
          <SelectTrigger id="password-type-trigger" aria-label="Generation Type" className="w-full sm:w-[180px] bg-background capitalize">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {PASSWORD_TYPES.map(pt => (
              <SelectItem key={pt.value} value={pt.value}>
                {pt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Password Length */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label id="length-label" htmlFor="length-slider" className="font-semibold text-foreground/80">Length</Label>
          <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{options.length} chars</span>
        </div>
        <Slider
          id="length-slider"
          name="length"
          min={MIN_PASSWORD_LENGTH}
          max={MAX_PASSWORD_LENGTH}
          value={[options.length]}
          onValueChange={(val) => {
            const length = Array.isArray(val) ? val[0] : val;
            onChange({ ...options, length });
          }}
          className="w-full cursor-grab active:cursor-grabbing"
          aria-labelledby="length-label"
        />
      </div>

      {options.type === "random" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors">
            <Checkbox
              id="uppercase"
              checked={options.includeUppercase}
              onCheckedChange={(checked) => onChange({ ...options, includeUppercase: checked as boolean })}
            />
            <Label htmlFor="uppercase" className="flex-1 cursor-pointer font-medium">Uppercase</Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors">
            <Checkbox
              id="lowercase"
              checked={options.includeLowercase}
              onCheckedChange={(checked) => onChange({ ...options, includeLowercase: checked as boolean })}
            />
            <Label htmlFor="lowercase" className="flex-1 cursor-pointer font-medium">Lowercase</Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors">
            <Checkbox
              id="numbers"
              checked={options.includeNumbers}
              onCheckedChange={(checked) => onChange({ ...options, includeNumbers: checked as boolean })}
            />
            <Label htmlFor="numbers" className="flex-1 cursor-pointer font-medium">Numbers</Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors">
            <Checkbox
              id="symbols"
              checked={options.includeSymbols}
              onCheckedChange={(checked) => onChange({ ...options, includeSymbols: checked as boolean })}
            />
            <Label htmlFor="symbols" className="flex-1 cursor-pointer font-medium">Symbols</Label>
          </div>
        </div>
      )}
    </div>
  );
}
