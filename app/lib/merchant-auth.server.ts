import { commitSession, getSession } from "./auth.server";

// Gate for the /merchant route. The password lives in the MERCHANT_PASSWORD
// environment variable (set in Render), never in the repo. With the variable
// unset the page stays locked (fail closed) and tells staff how to configure it.
const SESSION_KEY = "merchantUnlocked";

export function getMerchantPassword(): string | null {
  const password = process.env.MERCHANT_PASSWORD;
  return password && password.trim().length > 0 ? password.trim() : null;
}

export async function isMerchantUnlocked(request: Request): Promise<boolean> {
  const cookie = await getSession(request.headers.get("Cookie"));
  return cookie.get(SESSION_KEY) === "1";
}

export async function unlockMerchantSession(request: Request): Promise<string> {
  const cookie = await getSession(request.headers.get("Cookie"));
  cookie.set(SESSION_KEY, "1");
  return commitSession(cookie);
}
