/**
 * Validates and sanitizes a URL for safe use as image/media source.
 * Blocks javascript:, data:, vbscript: and other dangerous protocols.
 * Only allows http:, https: and blob: (for local previews).
 * Returns null if the URL is invalid/dangerous.
 */
export function sanitizeImageUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Block dangerous protocols
  const lower = trimmed.toLowerCase().replace(/\s/g, '');
  const blocked = ['javascript:', 'vbscript:', 'data:text', 'data:application'];
  if (blocked.some(b => lower.startsWith(b))) return null;

  // Allow data:image (from SecureFileUpload canvas re-encode)
  if (lower.startsWith('data:image/')) return trimmed;

  // Allow blob: (local object URLs)
  if (lower.startsWith('blob:')) return trimmed;

  // Must be http or https
  try {
    const parsed = new URL(trimmed);
    if (!['http:', 'https:'].includes(parsed.protocol)) return null;
    return parsed.href;
  } catch {
    // Relative paths are ok (e.g. /placeholder.svg)
    if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed;
    // Try prepending https
    try {
      const withProto = new URL(`https://${trimmed}`);
      return withProto.href;
    } catch {
      return null;
    }
  }
}

/**
 * Check if URL is safe for rendering as img src.
 */
export function isUrlSafe(url: string): boolean {
  return sanitizeImageUrl(url) !== null;
}
