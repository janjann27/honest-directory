import * as React from "react"
import { createTimeline, stagger } from "animejs"

import { Corners } from "@/components/hud"
import { ACCENT_ORDER, ACCENTS } from "@/sites"

type LoaderProps = {
  onDone: () => void
}

const RAINBOW = ACCENT_ORDER.map((k) => ACCENTS[k]).join(", ")
const BOOT_LOG = ["» booting core", "» mounting nodes", "» uplink ok"]
const WORDMARK = "honest".split("")

export function Loader({ onDone }: LoaderProps) {
  const overlayRef = React.useRef<HTMLDivElement>(null)
  const dotRef = React.useRef<HTMLSpanElement>(null)
  const barRef = React.useRef<HTMLDivElement>(null)
  const started = React.useRef(false)

  React.useEffect(() => {
    if (started.current) return
    const overlay = overlayRef.current
    const dot = dotRef.current
    const bar = barRef.current
    if (!overlay || !dot || !bar) return
    started.current = true

    createTimeline({ defaults: { ease: "outExpo" }, onComplete: onDone })
      .add("[data-corner] path", {
        strokeDashoffset: [1, 0],
        duration: 300,
        delay: stagger(40),
        ease: "outQuad",
      })
      .add(
        "[data-wm]",
        { translateY: ["110%", "0%"], opacity: [0, 1], duration: 450, delay: stagger(34) },
        "<+=60"
      )
      .add(dot, { scale: [0, 1], opacity: [0, 1], duration: 380, ease: "outBack" }, "<+=140")
      .add(bar, { scaleX: [0, 1], duration: 700, ease: "out(3)" }, "<-=180")
      .add(
        "[data-log]",
        { opacity: [0, 1], translateX: [-10, 0], duration: 240, delay: stagger(85) },
        "<"
      )
      // exit
      .add(dot, { scale: [1, 1.7, 1], duration: 280 }, "+=140")
      .add("[data-corner] path", { strokeDashoffset: [0, 1], duration: 260, ease: "inQuad" }, "<")
      .add(
        overlay,
        { translateY: ["0%", "-100%"], duration: 620, ease: "inOutExpo" },
        "-=60"
      )
  }, [onDone])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] overflow-hidden bg-background text-foreground will-change-transform"
    >
      {/* masked dot-grid over solid bg */}
      <div className="anime-grid pointer-events-none absolute inset-0 opacity-50" />

      {/* screen frame + corner brackets */}
      <div className="pointer-events-none absolute inset-5 border border-border/40" />
      <Corners color="text-primary" animated />

      {/* center: wordmark + sweep bar */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-end font-display text-[clamp(2.75rem,11vw,6.5rem)] leading-none font-black tracking-tight">
            {WORDMARK.map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span data-wm className="inline-block opacity-0 will-change-transform">
                  {ch}
                </span>
              </span>
            ))}
            <span
              ref={dotRef}
              className="mb-2 ml-2 size-3 rounded-full bg-primary opacity-0 will-change-transform sm:mb-3 sm:size-4"
            />
          </div>

          {/* single rainbow sweep = the "loading" */}
          <div className="h-1 w-56 overflow-hidden bg-border/40 sm:w-72">
            <div
              ref={barRef}
              className="h-full origin-left will-change-transform"
              style={{
                transform: "scaleX(0)",
                backgroundImage: `linear-gradient(90deg, ${RAINBOW})`,
              }}
            />
          </div>
        </div>
      </div>

      {/* boot log */}
      <div className="absolute bottom-9 left-9 flex flex-col gap-0.5">
        {BOOT_LOG.map((line) => (
          <span key={line} data-log className="font-mono text-[0.7rem] text-muted-foreground opacity-0">
            {line}
          </span>
        ))}
      </div>

      {/* status */}
      <span className="mono-label absolute right-9 bottom-9 text-muted-foreground">
        SYS//INIT
      </span>
    </div>
  )
}
