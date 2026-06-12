import { ArrowUpRight } from "lucide-react"

import { Bracket } from "@/components/hud"
import type { Site } from "@/sites"

type SiteCardProps = {
  site: Site
  accent: string
  index: number
}

function hostOf(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "")
  } catch {
    return url
  }
}

export function SiteCard({ site, accent, index }: SiteCardProps) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      data-card
      style={{ ["--card-accent" as string]: accent } as React.CSSProperties}
      className="group relative flex min-h-[11rem] flex-col justify-between overflow-hidden rounded-none border border-border bg-card p-5 transition-[transform,border-color,box-shadow] duration-300 ease-out will-change-transform hover:-translate-y-1 hover:border-[var(--card-accent)] hover:shadow-[0_18px_40px_-18px_var(--card-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--card-accent)]"
    >
      {/* top accent bar grows on hover */}
      <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[var(--card-accent)] transition-transform duration-300 ease-out group-hover:scale-x-100" />

      {/* targeting brackets on hover */}
      <Bracket className="top-2 left-2 size-3.5 text-[var(--card-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <Bracket className="right-2 bottom-2 size-3.5 rotate-180 text-[var(--card-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start justify-between">
        <span className="font-mono text-xs tabular-nums text-[var(--card-accent)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mono-label flex items-center gap-1.5 text-muted-foreground">
          <span
            className="inline-block size-[7px] rounded-full"
            style={{ backgroundColor: accent }}
          />
          {site.category}
        </span>
      </div>

      <div className="mt-6">
        <h3 className="font-display text-[1.6rem] leading-none font-extrabold tracking-tight">
          {site.name}
        </h3>
        <p className="mt-2 max-w-[34ch] text-sm leading-snug text-muted-foreground">
          {site.description}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3">
        <span className="truncate font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
          {hostOf(site.url)}
        </span>
        <ArrowUpRight
          className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--card-accent)]"
          strokeWidth={2.25}
        />
      </div>
    </a>
  )
}
