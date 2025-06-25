import { PasswordOptions } from './types';

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!&*';

/**
 * Generate a random password based on options.
 */
export function generateRandomPassword(options: PasswordOptions): string {
  let chars = '';
  if (options.includeUppercase) chars += UPPERCASE;
  if (options.includeLowercase) chars += LOWERCASE;
  if (options.includeNumbers) chars += NUMBERS;
  if (options.includeSymbols) chars += SYMBOLS;
  if (!chars) return '';
  let password = '';
  for (let i = 0; i < options.length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

/**
 * Calculate password strength (0-100)
 * More dynamic: length, variety, and entropy
 */
export function getPasswordStrength(password: string): number {
  if (!password) return 0;
  let score = 0;
  // Length bonus (up to 40)
  score += Math.min(40, (password.length - 8) * 2);
  // Variety bonus (up to 30)
  const sets = [/[A-Z]/, /[a-z]/, /[0-9]/, /[!&*]/].filter(r => r.test(password)).length;
  score += sets * 7.5;
  // Entropy bonus (up to 30)
  const unique = new Set(password).size;
  score += Math.min(30, unique * 2);
  return Math.max(0, Math.min(100, Math.round(score)));
}
