export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

// The portal serves a single store, so its currency is constant for the whole
// app. Rather than thread it through every price in the tree, record it once
// from loader data and let formatCurrency fall back to it.
let storeCurrency = "USD";

export function setStoreCurrency(currency: string | null | undefined): void {
  if (currency) storeCurrency = currency;
}

export function formatCurrency(amount: string | number, currency?: string | null): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency || storeCurrency,
    minimumFractionDigits: 2,
  }).format(value);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Shorten a Shopify-style external ID for display: "gid://shopify/Product/12345" → "#12345" */
export function shortId(externalId: string | undefined | null): string {
  if (!externalId) return "—";
  const parts = externalId.split("/");
  return `#${parts[parts.length - 1]}`;
}
