"use client"

import { ChevronRight, Link2, MessageCircle, Sparkles } from "lucide-react"
import { QUICK_LINKS } from "@/lib/opportunities"

export function QuickLinks() {
  return (
    <aside className="flex flex-col gap-5">
      <section className="glass rounded-2xl border border-border p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Link2 className="size-4" />
          </span>
          <h2 className="font-heading text-base font-bold text-foreground">IEDC Quick Links</h2>
        </div>
        <ul className="flex flex-col gap-2">
          {QUICK_LINKS.map((link) => (
            <li key={link.label}>
              <button className="glow-emerald-hover flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-background/40 px-3.5 py-3 text-left transition-colors hover:border-primary/40">
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-foreground">{link.label}</span>
                  <span className="block text-xs text-muted-foreground">{link.description}</span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass glow-emerald relative overflow-hidden rounded-2xl border border-primary/30 p-5">
        <Sparkles className="absolute -right-2 -top-2 size-16 text-primary/10" />
        <h2 className="font-heading text-base font-bold text-balance text-foreground">
          Join Campus Builders
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Connect with 2,000+ student founders, hackers, and makers across Kerala.
        </p>
        <a
          href="#"
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <MessageCircle className="size-4" />
          Join WhatsApp / Discord
        </a>
      </section>
    </aside>
  )
}
