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
 */
export function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score += 25;
  if (/[A-Z]/.test(password)) score += 20;
  if (/[a-z]/.test(password)) score += 20;
  if (/[0-9]/.test(password)) score += 20;
  if (/[!&*]/.test(password)) score += 15;
  return Math.min(score, 100);
}
