"use client"

import { CATEGORIES, type Category } from "@/lib/opportunities"

const SECTION_ANCHORS: Record<Category, string> = {
  all: "#top",
  events: "#hackathons",
  grants: "#grants",
  teamup: "#projects",
}

interface CategoryTabsProps {
  active: Category
  onChange: (category: Category) => void
}

export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <nav aria-label="Opportunity categories" className="overflow-x-auto no-scrollbar pb-1 min-w-0">
      <div className="inline-flex min-w-max gap-1 rounded-full bg-slate-900/60 border border-white/10 p-1.5 shadow-xl backdrop-blur-xl">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={(event) => {
                event.preventDefault()
                onChange(cat.id)
              }}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
