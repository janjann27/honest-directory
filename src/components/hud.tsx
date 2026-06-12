import * as React from "react"

/** A single drawn L-bracket. `animated` wires it for anime.js stroke-draw. */
export function Bracket({
  className = "",
  animated = false,
}: {
  className?: string
  animated?: boolean
}) {
  const dash = animated
    ? { strokeDasharray: 1, strokeDashoffset: 1 }
    : undefined
  return (
    <svg
      {...(animated ? { "data-corner": true } : {})}
      viewBox="0 0 48 48"
      className={"pointer-events-none absolute " + className}
      fill="none"
    >
      <path
        d="M2 18 L2 2 L18 2"
        stroke="currentColor"
        strokeWidth="2"
        pathLength={1}
        style={dash}
      />
    </svg>
  )
}

/** Four corner brackets framing the nearest positioned ancestor (or viewport). */
export function Corners({
  color = "text-border",
  animated = false,
  fixed = false,
}: {
  color?: string
  animated?: boolean
  fixed?: boolean
}) {
  const pos = fixed ? "fixed" : "absolute"
  return (
    <div
      className={
        "pointer-events-none inset-0 z-50 " + pos + " " + color
      }
    >
      <Bracket className="top-5 left-5 size-8" animated={animated} />
      <Bracket className="top-5 right-5 size-8 rotate-90" animated={animated} />
      <Bracket
        className="right-5 bottom-5 size-8 rotate-180"
        animated={animated}
      />
      <Bracket
        className="bottom-5 left-5 size-8 -rotate-90"
        animated={animated}
      />
    </div>
  )
}

/** A segmented HUD rule — ticked divider that matches the loader's bar. */
export function SegmentedRule({
  segments = 48,
  className = "",
}: {
  segments?: number
  className?: string
}) {
  return (
    <div className={"flex items-center gap-[3px] " + className} aria-hidden>
      {Array.from({ length: segments }).map((_, i) => (
        <span
          key={i}
          className="h-[3px] flex-1 rounded-[1px] bg-border"
          style={{ opacity: i % 6 === 0 ? 0.9 : 0.35 }}
        />
      ))}
    </div>
  )
}

/** Mono eyebrow with a leading diamond tick, e.g. ◆ THE HONEST NETWORK */
export function TickLabel({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={"mono-label inline-flex items-center gap-2 " + className}>
      <span className="size-1.5 rotate-45 bg-current" />
      {children}
    </span>
  )
}
