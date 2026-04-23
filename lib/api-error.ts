import axios from "axios";

function formatIssueMessage(issue: unknown): string | null {
  if (!issue || typeof issue !== "object") return null;
  const rec = issue as Record<string, unknown>;
  const message = typeof rec.message === "string" ? rec.message.trim() : "";
  if (!message) return null;
  const path = Array.isArray(rec.path)
    ? rec.path
        .filter((p) => typeof p === "string" || typeof p === "number")
        .join(".")
    : "";
  return path ? `${path}: ${message}` : message;
}

function messagesFromIssues(issues: unknown[]): string | null {
  const parts = issues
    .map(formatIssueMessage)
    .filter((s): s is string => Boolean(s));
  if (!parts.length) return null;
  return parts.join(" ");
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error) || error.response?.data == null) {
    return fallback;
  }

  const data = error.response.data as Record<string, unknown>;
  const issues = data.errors ?? data.issues;
  if (Array.isArray(issues) && issues.length > 0) {
    const formatted = messagesFromIssues(issues);
    if (formatted) return formatted;
  }

  if (typeof data.message === "string" && data.message.trim()) {
    return data.message.trim();
  }

  return fallback;
}
