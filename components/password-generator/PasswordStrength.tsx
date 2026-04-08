import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle } from "lucide-react";

interface PasswordStrengthProps {
  strength: number;
}

const STRENGTH_LABELS = [
  { threshold: 80, label: "Strong", color: "text-strength-strong", Icon: CheckCircle },
  { threshold: 50, label: "Medium", color: "text-strength-medium", Icon: AlertCircle },
  { threshold: 0, label: "Weak", color: "text-strength-weak", Icon: AlertCircle },
];

export function PasswordStrength({ strength }: PasswordStrengthProps) {
  const { label, color, Icon } = STRENGTH_LABELS.find(l => strength >= l.threshold) ?? STRENGTH_LABELS[2];
  return (
    <div className="flex items-center gap-2 mt-2">
      <Progress value={strength} className="w-full" aria-label="Password strength" />
      <Icon className={color} size={20} />
      <span className={`text-xs ml-1 ${color}`}>{label}</span>
    </div>
  );
}
