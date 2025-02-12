import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
/**
 * Formats a given number or bigint as a currency in INR.
 *
 * @param value The number or bigint to format.
 * @param options Optional Intl.NumberFormat options.
 * @returns The formatted string.
 */
export const currencyFormatter = (value: number | bigint, options?: Intl.NumberFormatOptions) => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    ...options,
  }).format(value)
}

/**
 * Formats a number with currency suffixes, such as "T" for trillion, "B" for billion, "M" for million, and "K" for thousand.
 * @param value The number to format.
 * @param options Options to pass to the Intl.NumberFormat constructor.
 * @returns The formatted string.
 */
export const formatCurrencySuffixes = (
  value: number | bigint,
  options?: Intl.NumberFormatOptions,
) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    ...options,
  })

  if (value >= 1e12) return formatter.format(Number(value) / 1e12) + 'T'
  if (value >= 1e9) return formatter.format(Number(value) / 1e9) + 'B'
  if (value >= 1e6) return formatter.format(Number(value) / 1e6) + 'M'
  if (value >= 1e3) return formatter.format(Number(value) / 1e3) + 'K'

  return formatter.format(value)
}

/**
 * Extracts the initials from a given string of words.
 *
 * @param title - The string containing words from which initials will be extracted.
 * @returns A string of uppercase initials formed by taking the first letter of each word.
 *
 * @example
 * getInitials("John Doe") // "JD"
 * getInitials("Jane Smith Doe") // "JSD"
 */

export const getInitials = (title: string): string => {
  return title
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}

/**
 * Converts a camelCase string to kebab-case.
 *
 * @example
 * toKebabCase("helloWorld") // "hello-world"
 * toKebabCase("Multiple Words") // "multiple-words"
 * toKebabCase("PascalCaseString") // "pascal-case-string"
 */
export const toKebabCase = (string: string): string =>
  string
    ?.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

export const generateRandomString = (
  length: number,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
) => {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export function toSentenceCase(str: string) {
  return str
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim()
}
