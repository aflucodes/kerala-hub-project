"use client"

import { ArrowRight, Download, Info, Mail, Trophy, IndianRupee, Users, BookOpen } from "lucide-react"
import type { Opportunity, OpportunityType } from "@/lib/opportunities"

const TYPE_STYLES: Record<OpportunityType, { chip: string; icon: typeof Trophy; label: string }> = {
  Event: { chip: "bg-primary/15 text-primary border-primary/30", icon: Trophy, label: "Event" },
  Grant: { chip: "bg-amber-400/15 text-amber-300 border-amber-400/30", icon: IndianRupee, label: "Grant" },
  Teamup: { chip: "bg-sky-400/15 text-sky-300 border-sky-400/30", icon: Users, label: "Team-up" },
  Resource: { chip: "bg-lime-400/15 text-lime-300 border-lime-400/30", icon: BookOpen, label: "Resource" },
}

const ACTION_CONFIG = {
  apply: { label: "Explore Official Portal", icon: ArrowRight },
  info: { label: "More Info", icon: Info },
  contact: { label: "Contact", icon: Mail },
  download: { label: "Download PDF", icon: Download },
  whatsapp: { label: "Send WhatsApp Pitch", icon: Mail },
} as const

interface OpportunityCardProps {
  opportunity: Opportunity
  onAction: (opportunity: Opportunity) => void
  onSkillTagClick?: (skill: string) => void
}

export function OpportunityCard({ opportunity, onAction, onSkillTagClick }: OpportunityCardProps) {
  const typeStyle = TYPE_STYLES[opportunity.type]
  const TypeIcon = typeStyle.icon
  const action = ACTION_CONFIG[opportunity.primaryAction]
  const ActionIcon = action.icon

  return (
    <article className="group flex h-full flex-col justify-between min-w-0 rounded-2xl bg-card/60 border border-border/50 p-6 shadow-sm transition-all hover:border-primary/40">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${typeStyle.chip}`}
        >
          <TypeIcon className="size-3.5" />
          {typeStyle.label}
        </span>
      </div>

      {opportunity.projectTag ? (
        <div className="mb-4 inline-flex flex-wrap gap-2">
          <span className="rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            {opportunity.projectTag}
          </span>
        </div>
      ) : null}

      <h3 className="font-heading text-lg font-bold leading-snug text-balance text-foreground transition-colors group-hover:text-primary">
        {opportunity.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-words">{opportunity.description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {opportunity.meta.map((m) => {
          const emoji =
            m.label === "Role"
              ? "💼"
              : m.label === "Work Mode"
              ? m.value.includes("Remote")
                ? "🏠"
                : "🌐"
              : m.label === "Stage"
              ? "🚀"
              : m.label === "Track"
              ? "📍"
              : m.label === "Benefit"
              ? "🎁"
              : m.label === "Access"
              ? "🔗"
              : ""
          return (
            <span
              key={m.label}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-background/70 px-3 py-1 text-xs font-semibold text-foreground"
            >
              {emoji} {m.value}
            </span>
          )
        })}
      </div>

      {opportunity.badges?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {opportunity.badges.map((badge) => (
            <span
              key={badge.label}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-foreground"
            >
              {badge.label}: {badge.value}
            </span>
          ))}
        </div>
      ) : null}

      {opportunity.skillTags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {opportunity.skillTags.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => onSkillTagClick?.(skill)}
              className="rounded-full border border-white/10 bg-background/60 px-3 py-1 text-xs font-semibold text-foreground transition hover:border-emerald-400/60 hover:bg-emerald-500/10"
            >
              {skill}
            </button>
          ))}
        </div>
      ) : null}

      {opportunity.actionUrl ? (
        <a
          href={opportunity.actionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/10 transition-all duration-300 hover:scale-[1.01] hover:bg-emerald-500/90"
        >
          <ActionIcon className="size-4" />
          {action.label}
        </a>
      ) : opportunity.primaryAction === "whatsapp" ? (
        <a
          href={opportunity.actionUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-5 text-sm font-semibold text-white shadow-lg shadow-sky-500/10 transition-all duration-300 hover:scale-[1.01] hover:bg-sky-500/90"
        >
          <ActionIcon className="size-4" />
          Send WhatsApp Pitch
        </a>
      ) : (
        <button
          onClick={() => onAction(opportunity)}
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/10 transition-all duration-300 hover:scale-[1.01] hover:bg-emerald-500/90"
        >
          <ActionIcon className="size-4" />
          {action.label}
        </button>
      )}
    </article>
  )
}
