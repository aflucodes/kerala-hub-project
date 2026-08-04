"use client"

import { ArrowRight, Download, Mail, CheckCircle2 } from "lucide-react"
import { Modal } from "@/components/modal"
import type { Opportunity } from "@/lib/opportunities"

interface DetailModalProps {
  opportunity: Opportunity | null
  onClose: () => void
}

const CTA: Record<
  Opportunity["primaryAction"],
  { label: string; icon: typeof ArrowRight; note: string }
> = {
  apply: { label: "Confirm Application", icon: ArrowRight, note: "You'll be redirected to the registration form." },
  info: { label: "Visit Grant Portal", icon: ArrowRight, note: "Applications are reviewed on a rolling basis." },
  contact: { label: "Send a Message", icon: Mail, note: "The project owner will reach out over email." },
  download: { label: "Download PDF", icon: Download, note: "Free · No sign-up required." },
  whatsapp: { label: "Send WhatsApp Message", icon: Mail, note: "A pre-filled WhatsApp pitch will open in a new tab." },
}

export function DetailModal({ opportunity, onClose }: DetailModalProps) {
  if (!opportunity) return null
  const cta = CTA[opportunity.primaryAction]
  const CtaIcon = cta.icon

  return (
    <Modal
      open={!!opportunity}
      onClose={onClose}
      title={opportunity.title}
      description={opportunity.description}
    >
      <div className="flex flex-col gap-4">
        <dl className="grid grid-cols-2 gap-3">
          {opportunity.meta.map((m) => (
            <div key={m.label} className="rounded-lg border border-border bg-background/40 p-3">
              <dt className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">{m.label}</dt>
              <dd className="mt-0.5 text-sm font-semibold text-foreground">{m.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="flex flex-col gap-2 rounded-lg border border-primary/20 bg-primary/5 p-4">
          {["Open to all Kerala college students", "Backed by IEDC & KSUM network", "Free to participate"].map(
            (item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle2 className="size-4 shrink-0 text-primary" />
                {item}
              </li>
            ),
          )}
        </ul>

        <div className="flex flex-col gap-2">
          <button
            onClick={onClose}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <CtaIcon className="size-4" />
            {cta.label}
          </button>
          <p className="text-center text-xs text-muted-foreground">{cta.note}</p>
        </div>
      </div>
    </Modal>
  )
}
