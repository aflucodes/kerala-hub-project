"use client"

import { useMemo, useState } from "react"
import { SearchX } from "lucide-react"
import { Hero } from "@/components/hero"
import { CategoryTabs } from "@/components/category-tabs"
import { OpportunityCard } from "@/components/opportunity-card"
import { QuickLinks } from "@/components/quick-links"
import { SubmitModal } from "@/components/submit-modal"
import { DetailModal } from "@/components/detail-modal"
import { OPPORTUNITIES, CATEGORIES, type Category, type Opportunity } from "@/lib/opportunities"

export default function Page() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const [submitOpen, setSubmitOpen] = useState(false)
  const [selected, setSelected] = useState<Opportunity | null>(null)

  const normalizedQuery = query.trim().toLowerCase()

  const searchMatches = useMemo(
    () =>
      OPPORTUNITIES.filter((o) => {
        if (!normalizedQuery) return true
        return (
          o.title.toLowerCase().includes(normalizedQuery) ||
          o.description.toLowerCase().includes(normalizedQuery) ||
          o.type.toLowerCase().includes(normalizedQuery) ||
          (o.location?.toLowerCase().includes(normalizedQuery) ?? false)
        )
      }),
    [normalizedQuery],
  )

  const counts = useMemo(() => {
    const base = { all: searchMatches.length } as Record<Category, number>
    for (const cat of CATEGORIES) {
      if (cat.id === "all") continue
      base[cat.id] = searchMatches.filter((o) => o.category === cat.id).length
    }
    return base
  }, [searchMatches])

  const visible = useMemo(
    () =>
      activeCategory === "all"
        ? searchMatches
        : searchMatches.filter((o) => o.category === activeCategory),
    [searchMatches, activeCategory],
  )

  return (
    <main className="min-h-screen">
      <Hero query={query} onQueryChange={setQuery} onSubmitClick={() => setSubmitOpen(true)} />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main column */}
          <div className="flex flex-col gap-6">
            <CategoryTabs active={activeCategory} counts={counts} onChange={setActiveCategory} />

            {visible.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {visible.map((o) => (
                  <OpportunityCard key={o.id} opportunity={o} onAction={setSelected} />
                ))}
              </div>
            ) : (
              <div className="glass flex flex-col items-center gap-3 rounded-2xl border border-border py-16 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <SearchX className="size-6" />
                </div>
                <div>
                  <p className="font-heading text-lg font-semibold text-foreground">No opportunities found</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try a different search term or category filter.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <QuickLinks />
        </div>
      </div>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          Kerala Campus Hub — connecting students, IEDC chapters & the KSUM ecosystem.
        </div>
      </footer>

      <SubmitModal open={submitOpen} onClose={() => setSubmitOpen(false)} />
      <DetailModal opportunity={selected} onClose={() => setSelected(null)} />
    </main>
  )
}
