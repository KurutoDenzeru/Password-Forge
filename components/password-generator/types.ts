// Types for password generator

export const MIN_PASSWORD_LENGTH = 12;
export const MAX_PASSWORD_LENGTH = 64;

export type PasswordType = 'random' | 'memorable';

export interface PasswordOptions {
  type: PasswordType;
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}
