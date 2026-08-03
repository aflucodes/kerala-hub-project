"use client"

import { Plus, Search, GraduationCap } from "lucide-react"

interface HeroProps {
  query: string
  onQueryChange: (value: string) => void
  onSubmitClick: () => void
}

export function Hero({ query, onQueryChange, onSubmitClick }: HeroProps) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[120%] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <GraduationCap className="size-3.5" />
            Built for Kerala&apos;s student innovators
          </span>

          <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            <span className="text-foreground">Kerala </span>
            <span className="text-primary text-glow">Campus Hub</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            Discover Local Hackathons, IEDC Grants, and Student Micro-Projects.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <div className="glass relative flex-1 rounded-xl border border-border focus-within:border-primary/50 focus-within:glow-emerald">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search hackathons, grants, projects, notes..."
                aria-label="Search opportunities"
                className="h-12 w-full rounded-xl bg-transparent py-3.5 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <button
              onClick={onSubmitClick}
              className="glow-emerald inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:opacity-95"
            >
              <Plus className="size-5" />
              Submit an Event or Project
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
