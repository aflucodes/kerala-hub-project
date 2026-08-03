"use client"

import { CATEGORIES, type Category } from "@/lib/opportunities"

interface CategoryTabsProps {
  active: Category
  counts: Record<Category, number>
  onChange: (category: Category) => void
}

export function CategoryTabs({ active, counts, onChange }: CategoryTabsProps) {
  return (
    <nav aria-label="Opportunity categories" className="-mx-1 overflow-x-auto pb-1">
      <ul className="flex w-max min-w-full gap-2 px-1">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id
          return (
            <li key={cat.id}>
              <button
                onClick={() => onChange(cat.id)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "border-primary/40 bg-primary text-primary-foreground glow-emerald"
                    : "border-border bg-card/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {cat.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs tabular-nums ${
                    isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {counts[cat.id]}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
