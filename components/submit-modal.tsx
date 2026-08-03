"use client"

import { useState } from "react"
import { CheckCircle2, Send } from "lucide-react"
import { Modal } from "@/components/modal"

interface SubmitModalProps {
  open: boolean
  onClose: () => void
}

const TYPES = ["Hackathon / Event", "IEDC / KSUM Grant", "Campus Project (Team-up)", "Study Resource"]

export function SubmitModal({ open, onClose }: SubmitModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [type, setType] = useState(TYPES[0])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  function handleClose() {
    onClose()
    // reset after close animation
    setTimeout(() => setSubmitted(false), 200)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Submit an Event or Project"
      description="Share an opportunity with the Kerala campus community. It's free."
    >
      {submitted ? (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary glow-emerald">
            <CheckCircle2 className="size-7" />
          </div>
          <div>
            <p className="font-heading text-lg font-semibold text-foreground">Submission received!</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Our team will review your listing and publish it shortly.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Title
            </label>
            <input
              id="title"
              required
              placeholder="e.g. TinkerHub Hackathon 2026"
              className="h-11 rounded-lg border border-input bg-background/50 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="type" className="text-sm font-medium text-foreground">
              Category
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-11 rounded-lg border border-input bg-background/50 px-3 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="location" className="text-sm font-medium text-foreground">
                Location
              </label>
              <input
                id="location"
                placeholder="e.g. Kochi"
                className="h-11 rounded-lg border border-input bg-background/50 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="deadline" className="text-sm font-medium text-foreground">
                Deadline
              </label>
              <input
                id="deadline"
                type="date"
                className="h-11 rounded-lg border border-input bg-background/50 px-3 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="desc" className="text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              id="desc"
              required
              rows={3}
              placeholder="Tell students what this is about..."
              className="resize-none rounded-lg border border-input bg-background/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Send className="size-4" />
            Submit Listing
          </button>
        </form>
      )}
    </Modal>
  )
}
