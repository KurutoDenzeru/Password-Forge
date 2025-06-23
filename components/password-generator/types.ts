// Types for password generator

export type PasswordType = 'random' | 'memorable';

export interface PasswordOptions {
  type: PasswordType;
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}
