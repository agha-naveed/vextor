// Validators for redirect targets that arrive through the URL.
// Never pass a raw query-string value to redirect(), window.location or href.

/** Deep link into the desktop app, e.g. vextor://auth or vextor://auth?userId=... */
export function isAppDeepLink(value: unknown): value is string {
  return typeof value === 'string' && /^vextor:\/\/[^\s<>"'\\]*$/.test(value);
}

/** Same-site path such as /dashboard or /checkout?plan=pro. Rejects //host, /\host, whitespace. */
export function isSafeInternalPath(value: unknown): value is string {
  return typeof value === 'string' && /^\/(?![\/\\])[^\s\\]*$/.test(value);
}
