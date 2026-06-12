import * as React from "react"
import { animate, stagger } from "animejs"
import { Search, X } from "lucide-react"

import { Corners, SegmentedRule, TickLabel } from "@/components/hud"
import { Loader } from "@/components/loader"
import { SiteCard } from "@/components/site-card"
import { useTheme } from "@/components/theme-provider"
import { ACCENT_ORDER, ACCENTS, SITES, type Site } from "@/sites"

const ALL = "All" as const

function accentFor(site: Site, index: number) {
  return site.accent
    ? ACCENTS[site.accent]
    : ACCENTS[ACCENT_ORDER[index % ACCENT_ORDER.length]]
}

export function App() {
  const { theme, setTheme } = useTheme()
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState<string>(ALL)
  // skip the loader (and its motion) for reduced-motion users
  const [loaded, setLoaded] = React.useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  const categories = React.useMemo(
    () => [ALL, ...Array.from(new Set(SITES.map((s) => s.category)))],
    []
  )

  // keep stable accent per site regardless of filtering
  const withAccent = React.useMemo(
    () => SITES.map((site, i) => ({ site, accent: accentFor(site, i) })),
    []
  )

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return withAccent.filter(({ site }) => {
      const matchesCat = category === ALL || site.category === category
      const matchesQuery =
        !q ||
        site.name.toLowerCase().includes(q) ||
        site.description.toLowerCase().includes(q) ||
        site.category.toLowerCase().includes(q) ||
        site.url.toLowerCase().includes(q)
      return matchesCat && matchesQuery
    })
  }, [withAccent, query, category])

  // ── entrance choreography (after the loader lifts) ─────────────────
  React.useEffect(() => {
    if (!loaded) return
    animate("[data-reveal]", {
      translateY: [18, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(90, { start: 150 }),
      ease: "outExpo",
    })
  }, [loaded])

  // ── re-reveal the grid whenever the filter changes ─────────────────
  React.useEffect(() => {
    animate("[data-card]", {
      translateY: [22, 0],
      opacity: [0, 1],
      scale: [0.98, 1],
      duration: 620,
      delay: stagger(45),
      ease: "outExpo",
    })
  }, [visible])

  const total = SITES.length
  const shown = visible.length

  return (
    <div className="relative min-h-svh overflow-x-hidden">
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      {/* page dot-grid — scrolls with content (tiles full height) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(var(--hex-bg-7) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          backgroundPosition: "-13px -13px",
        }}
      />

      {/* fixed HUD chrome */}
      <div className="pointer-events-none fixed inset-4 z-40 border border-border/25" />
      <Corners fixed color="text-border/70" />

      {/* ── header ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-display font-extrabold">
            <span className="text-lg tracking-tight">honest</span>
            <span className="size-2 rounded-full bg-primary" />
            <span className="mono-label text-muted-foreground">directory</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="mono-label hidden text-muted-foreground sm:inline">
              {String(total).padStart(3, "0")} nodes · online
            </span>
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mono-label flex items-center gap-2 border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              aria-label="Toggle theme"
            >
              <span className="size-1.5 rounded-full bg-primary" />
              {theme === "dark" ? "DARK" : "LIGHT"}
            </button>
          </div>
        </div>
      </header>

      {/* ── controls ────────────────────────────────────────────── */}
      <section id="top" className="mx-auto w-full max-w-6xl px-6 pt-12 sm:pt-16">
        <div
          data-reveal
          className="mb-3 flex items-center justify-between"
        >
          <TickLabel className="text-muted-foreground">directory</TickLabel>
          <span className="mono-label text-muted-foreground tabular-nums">
            {String(shown).padStart(2, "0")} / {String(total).padStart(2, "0")} visible
          </span>
        </div>
        <div
          data-reveal
          className="flex flex-col gap-4 rounded-none border border-border bg-card/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search the network…"
              className="w-full rounded-none border border-input bg-card/60 py-2 pr-9 pl-9 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = cat === category
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={
                    "mono-label rounded-none border px-3 py-1.5 transition-colors " +
                    (active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground")
                  }
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── grid ────────────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map(({ site, accent }, i) => (
              <SiteCard key={site.url} site={site} accent={accent} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-24 text-center">
            <p className="font-display text-2xl font-bold">Nothing here.</p>
            <p className="font-mono text-sm text-muted-foreground">
              No site matches “{query}”.
            </p>
          </div>
        )}
      </main>

      {/* ── footer ──────────────────────────────────────────────── */}
      <footer className="mx-auto w-full max-w-6xl px-6 py-10">
        <SegmentedRule className="mb-5" />
        <div className="flex items-center justify-between">
          <p className="mono-label text-muted-foreground">© honest · directory</p>
          <p className="mono-label text-muted-foreground">all systems nominal</p>
        </div>
      </footer>
    </div>
  )
}

export default App
