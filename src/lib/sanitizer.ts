/**
 * Input sanitization and validation utilities for Krynex Labs
 * Preserves mathematical symbols (<, >), engineering notation (<10ms),
 * apostrophes (O'Brien), and ampersands (AT&T) while stripping unsafe HTML tags
 * and preventing email header injection (CRLF).
 */

// Strips real HTML tags and script/style contents only; preserves "<10ms", "x < y", "y > z"
export function stripHtmlTags(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<(?:\/?[a-zA-Z][a-zA-Z0-9-]*\b[^>]*|\/?[a-zA-Z]+\s*\/?)>/g, "");
}

// Strips carriage return and newline characters to prevent CRLF email header injection
export function stripHeaderInjection(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input.replace(/[\r\n\t]/g, " ").trim();
}

// Clean and validate single-line field (Name, Company)
export function sanitizeSingleLine(input: string, maxLength = 120): string {
  if (!input || typeof input !== "string") return "";
  return stripHeaderInjection(stripHtmlTags(input)).slice(0, maxLength);
}

// Clean multi-line field (Challenge / message) preserving formatting and comparison symbols
export function sanitizeMultiline(input: string, maxLength = 2500): string {
  if (!input || typeof input !== "string") return "";
  return stripHtmlTags(input).trim().slice(0, maxLength);
}

// RFC 5322 compliant email regex permitting apostrophes, plus signs, dots, etc.
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 120) return false;
  // Disallow CRLF in email to prevent header injection
  if (/[\r\n]/.test(trimmed)) return false;
  return EMAIL_REGEX.test(trimmed);
}

// Context-specific HTML escaping for rendering untrusted user strings safely inside HTML emails
export function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
