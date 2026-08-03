"use client"

import {
  ArrowRight,
  Download,
  Info,
  Mail,
  Trophy,
  IndianRupee,
  Users,
  BookOpen,
  MapPin,
} from "lucide-react"
import type { Opportunity, OpportunityType } from "@/lib/opportunities"

const TYPE_STYLES: Record<OpportunityType, { chip: string; icon: typeof Trophy; label: string }> = {
  Event: { chip: "bg-primary/15 text-primary border-primary/30", icon: Trophy, label: "Event" },
  Grant: { chip: "bg-amber-400/15 text-amber-300 border-amber-400/30", icon: IndianRupee, label: "Grant" },
  Teamup: { chip: "bg-sky-400/15 text-sky-300 border-sky-400/30", icon: Users, label: "Team-up" },
  Resource: { chip: "bg-lime-400/15 text-lime-300 border-lime-400/30", icon: BookOpen, label: "Resource" },
}

const ACTION_CONFIG = {
  apply: { label: "Apply Now", icon: ArrowRight },
  info: { label: "More Info", icon: Info },
  contact: { label: "Contact", icon: Mail },
  download: { label: "Download PDF", icon: Download },
} as const

interface OpportunityCardProps {
  opportunity: Opportunity
  onAction: (opportunity: Opportunity) => void
}

export function OpportunityCard({ opportunity, onAction }: OpportunityCardProps) {
  const typeStyle = TYPE_STYLES[opportunity.type]
  const TypeIcon = typeStyle.icon
  const action = ACTION_CONFIG[opportunity.primaryAction]
  const ActionIcon = action.icon

  return (
    <article className="glass glow-emerald-hover group flex h-full flex-col rounded-2xl border border-border p-5 hover:border-primary/40">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${typeStyle.chip}`}
        >
          <TypeIcon className="size-3.5" />
          {typeStyle.label}
        </span>
        {opportunity.location ? (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            {opportunity.location}
          </span>
        ) : null}
      </div>

      <h3 className="font-heading text-lg font-bold leading-snug text-balance text-foreground transition-colors group-hover:text-primary">
        {opportunity.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{opportunity.description}</p>

      <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4">
        {opportunity.meta.map((m) => (
          <div key={m.label} className="flex flex-col">
            <dt className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">{m.label}</dt>
            <dd className="text-sm font-medium text-foreground">{m.value}</dd>
          </div>
        ))}
      </dl>

      <button
        onClick={() => onAction(opportunity)}
        className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 group-hover:glow-emerald"
      >
        <ActionIcon className="size-4" />
        {action.label}
      </button>
    </article>
  )
}
