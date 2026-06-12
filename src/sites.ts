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
// The Fondly / Honest network.
// ---------------------------------------------------------------------------
export const SITES: Site[] = [
  {
    name: "Classifier Dashboard",
    url: "https://classifier-dashboard.web.app",
    description: "Classify and label content strategies.",
    category: "Dashboards",
  },
  {
    name: "Posting Bot Dashboard",
    url: "https://posting-bot-dashboard.web.app",
    description:
      "Monitor account link taps and overall bot posting performance.",
    category: "Dashboards",
  },
  {
    name: "Post Queue QA",
    url: "https://post-queue-qa.web.app",
    description: "QA inspector for the bot's post_queue.",
    category: "QA",
  },
  {
    name: "Creator Metrics",
    url: "https://fgc-fondlytools.web.app",
    description: "View creator metrics and performance.",
    category: "Analytics",
  },
  {
    name: "Flamingo Careers",
    url: "https://flamingo-careers.web.app",
    description: "Honest careers — open roles and the team behind it.",
    category: "Company",
  },
  {
    name: "Flamingo Playbook",
    url: "https://flamingo-playbook.web.app",
    description:
      "Decode what makes a reel go viral — cluster by format, spot trends, find look-alikes, and hand editors data-backed briefs.",
    category: "Analytics",
  },
  {
    name: "Fondly Dashboard",
    url: "https://fondly-dashboard.web.app",
    description: "Inspect fetched competitor and owned account posts.",
    category: "Dashboards",
  },
  {
    name: "Fondly Tools",
    url: "https://fondlytools.web.app",
    description: "Internal tools hub for Fondly projects. Access restricted.",
    category: "Internal",
  },
]
