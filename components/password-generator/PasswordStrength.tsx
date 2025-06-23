import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle } from "lucide-react";

interface PasswordStrengthProps {
  strength: number;
}

export function PasswordStrength({ strength }: PasswordStrengthProps) {
  const isStrong = strength >= 70;
  return (
    <div className="flex items-center gap-2 mt-2">
      <Progress value={strength} className="w-full" />
      {isStrong ? (
        <CheckCircle className="text-green-500" size={20} />
      ) : (
        <AlertCircle className="text-yellow-500" size={20} />
      )}
      <span className="text-xs ml-1">{isStrong ? 'Strong' : 'Weak'}</span>
    </div>
  );
}
