const ROLE_VALUES = new Set(["admin", "recruiter", "candidate"]);

/**
 * Reads `role` from a JWT payload without verifying the signature.
 * Used only for safe redirects (auth already implied by cookie presence).
 */
export function roleFromToken(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const json = Buffer.from(parts[1], "base64url").toString("utf8");
    const payload = JSON.parse(json) as { role?: unknown };
    const role = payload.role;
    if (typeof role === "string" && ROLE_VALUES.has(role)) {
      return role;
    }
    return null;
  } catch {
    return null;
  }
}
