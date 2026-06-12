/**
 * The Honest network directory.
 *
 * 👉 REPLACE the entries below with your real websites.
 *    Each entry needs: name, url, description, category.
 *    `accent` is optional — leave it out and a color from the
 *    anime.js rainbow ramp is assigned automatically by position.
 */

export type AccentKey =
  | "red"
  | "corail"
  | "orange"
  | "yellow"
  | "citrus"
  | "lime"
  | "green"
  | "turquoise"
  | "cyan"
  | "sky"
  | "king"
  | "indigo"
  | "purple"
  | "magenta"

/** anime.js "1" brights — the signature color-support ramp. */
export const ACCENTS: Record<AccentKey, string> = {
  red: "#ff4b4b",
  corail: "#ff7d36",
  orange: "#ffa828",
  yellow: "#ffcc2a",
  citrus: "#f9f640",
  lime: "#b7ff54",
  green: "#8dff55",
  turquoise: "#00ffaa",
  cyan: "#26f2d5",
  sky: "#05dbe9",
  king: "#4d9cff",
  indigo: "#7c85ff",
  purple: "#c06ddf",
  magenta: "#e962bf",
}

export const ACCENT_ORDER: AccentKey[] = [
  "red",
  "corail",
  "orange",
  "yellow",
  "lime",
  "turquoise",
  "cyan",
  "sky",
  "king",
  "indigo",
  "purple",
  "magenta",
  "green",
  "citrus",
]

export type Site = {
  name: string
  url: string
  description: string
  category: string
  accent?: AccentKey
}

// ---------------------------------------------------------------------------
// PLACEHOLDER DATA — swap for the real Honest websites.
// ---------------------------------------------------------------------------
export const SITES: Site[] = [
  {
    name: "The Honest App",
    url: "https://thehonestapp.com",
    description: "Flagship product. The honest way to track what matters.",
    category: "Product",
  },
  {
    name: "Honest Blog",
    url: "https://blog.thehonestapp.com",
    description: "Stories, changelog and the thinking behind the product.",
    category: "Content",
  },
  {
    name: "Honest Docs",
    url: "https://docs.thehonestapp.com",
    description: "Guides, API reference and integration walkthroughs.",
    category: "Docs",
  },
  {
    name: "Honest Status",
    url: "https://status.thehonestapp.com",
    description: "Real-time uptime and incident history for all services.",
    category: "Ops",
  },
  {
    name: "Honest Careers",
    url: "https://careers.thehonestapp.com",
    description: "Open roles and what it's like to build here.",
    category: "Company",
  },
  {
    name: "Honest Brand Kit",
    url: "https://brand.thehonestapp.com",
    description: "Logos, colors, typography and usage guidelines.",
    category: "Design",
  },
  {
    name: "Honest Support",
    url: "https://support.thehonestapp.com",
    description: "Help center, FAQs and ways to reach the team.",
    category: "Support",
  },
  {
    name: "Honest API",
    url: "https://api.thehonestapp.com",
    description: "Developer platform, keys and webhook dashboard.",
    category: "Docs",
  },
]
