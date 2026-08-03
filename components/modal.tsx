"use client"

import { useEffect, type ReactNode } from "react"
import { X } from "lucide-react"

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
}

export function Modal({ open, onClose, title, description, children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="glass glow-emerald relative z-10 w-full max-w-lg rounded-t-2xl border border-primary/20 p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 sm:rounded-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 id="modal-title" className="font-heading text-xl font-bold text-balance text-foreground">
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
            ) : null}
          </div>
          <button
            onClick={onClose}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close dialog"
          >
            <X className="size-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
