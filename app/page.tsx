"use client"

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { Hero } from "@/components/hero"
import { CategoryTabs } from "@/components/category-tabs"
import { OpportunityCard } from "@/components/opportunity-card"
import { DetailModal } from "@/components/detail-modal"
import { OPPORTUNITIES, CATEGORIES, type Category, type Opportunity } from "@/lib/opportunities"

function SectionReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  )
}

export default function Page() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const [selected, setSelected] = useState<Opportunity | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<string>("")
  const [activeFaq, setActiveFaq] = useState<string | null>(null)

  const normalizedQuery = query.trim().toLowerCase()

  const searchMatches = useMemo(
    () =>
      OPPORTUNITIES.filter((o) => {
        const matchesQuery =
          !normalizedQuery ||
          o.title.toLowerCase().includes(normalizedQuery) ||
          o.description.toLowerCase().includes(normalizedQuery) ||
          o.type.toLowerCase().includes(normalizedQuery)

        const matchesSkill =
          !selectedSkill || o.skillTags?.some((skill) => skill.toLowerCase() === selectedSkill.toLowerCase())

        return matchesQuery && matchesSkill
      }),
    [normalizedQuery, selectedSkill],
  )

  const faqItems = [
    {
      id: "ktu-duty-leave",
      question: "How do I claim KTU duty leave for attending hackathons or pitching my startup?",
      answer:
        "Request a recommendation letter from your college IEDC cell. The faculty mentor or principal confirms the event as an approved activity and submits the duty leave request to KTU.",
    },
    {
      id: "preseed-vs-idea-grant",
      question: "What is the difference between the IEDC Pre-Seed fund and the KSUM Idea Grant?",
      answer:
        "IEDC Pre-Seed supports campus-level project development with up to ₹50,000. KSUM Idea Grant is statewide support for student founders with MVPs, offering up to ₹2,00,000 plus mentoring.",
    },
    {
      id: "iedc-client-projects",
      question: "How can our college IEDC cell connect student builders with local client projects?",
      answer:
        "The IEDC cell collects client briefs, matches them with student skill profiles, and coordinates mentor reviews so teams can deliver client-ready solutions.",
    },
  ]

  const counts = useMemo(() => {
    const base = { all: searchMatches.length } as Record<Category, number>
    for (const cat of CATEGORIES) {
      if (cat.id === "all") continue
      base[cat.id] = searchMatches.filter((o) => o.category === cat.id).length
    }
    return base
  }, [searchMatches])

  const SECTION_ANCHORS: Record<Category, string> = {
    all: "#top",
    events: "#hackathons",
    grants: "#grants",
    teamup: "#projects",
  }

  const cardsByCategory = useMemo(
    () => ({
      events: searchMatches.filter((o) => o.category === "events"),
      grants: searchMatches.filter((o) => o.category === "grants"),
      teamup: searchMatches.filter((o) => o.category === "teamup"),
    }),
    [searchMatches],
  )

  useEffect(() => {
    const anchor = SECTION_ANCHORS[activeCategory]
    const element = document.querySelector(anchor)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: activeCategory === "all" ? "start" : "center" })
    }
  }, [activeCategory])

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category)
  }

  const isAll = activeCategory === "all"
  const totalMatches = searchMatches.length

  return (
    <main id="top" className="min-h-screen w-full scroll-smooth">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero searchQuery={query} setSearchQuery={setQuery}  /> 
      </div>

      {/* Homepage intro cards removed — content moved to dedicated pages */}

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <main className="space-y-12 min-w-0 w-full">
          <CategoryTabs active={activeCategory} onChange={handleCategoryChange} />

          {selectedSkill ? (
            <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-500/5 px-4 py-3 text-sm text-foreground shadow-sm">
              <span className="font-medium text-foreground">Filtered by skill:</span>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 font-semibold text-emerald-500">{selectedSkill}</span>
              <button
                type="button"
                onClick={() => setSelectedSkill("")}
                className="ml-2 rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold text-foreground transition hover:bg-foreground/10"
              >
                Clear filter
              </button>
            </div>
          ) : null}

          {totalMatches === 0 && (
              <div className="glass mx-auto mt-8 max-w-xl rounded-2xl border border-border p-8 text-center">
                <p className="font-heading text-xl font-bold text-foreground">No matching opportunities found</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Try searching for different keywords or clear your search.
                </p>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Clear Search
                </button>
              </div>
            ) }
            {totalMatches > 0 && (
             <> 
            {(isAll || activeCategory === "events") && cardsByCategory.events.length > 0 && (
              <SectionReveal>
                <div id="hackathons" className="space-y-6 min-w-0 w-full max-w-5xl mx-auto border-b border-border/50 py-10 sm:py-14">
                  <div className="mb-6 flex flex-col gap-3 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-12 rounded-full bg-emerald-400/80 shadow-[0_0_30px_rgba(16,185,129,0.25)]"></span>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Hackathons & Events</p>
                    </div>
                    <h2 className="font-heading text-3xl font-bold text-foreground break-words">Kerala student hackathons, sprints and community events</h2>
                  </div>

                  <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                    {cardsByCategory.events.map((o) => (
                      <div key={o.id} className={cardsByCategory.events.length === 1 ? "md:col-span-2" : ""}>
                        <OpportunityCard opportunity={o} onAction={setSelected} onSkillTagClick={setSelectedSkill} />
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            )}

            {(isAll || activeCategory === "grants") && (
              <SectionReveal>
                <div id="grants" className="space-y-6 min-w-0 w-full max-w-5xl mx-auto border-b border-border/50 py-10 sm:py-14">
                  <div className="mb-6 flex flex-col gap-3 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-12 rounded-full bg-indigo-400/80 shadow-[0_0_30px_rgba(99,102,241,0.25)]"></span>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">IEDC & KSUM Grants</p>
                    </div>
                    <h2 className="font-heading text-3xl font-bold text-foreground break-words">💰 Campus Innovation & Idea Grants</h2>
                  </div>

                  <div className="glass rounded-3xl border border-border/40 bg-card/70 p-8 shadow-xl shadow-black/5 backdrop-blur-xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Grant support for Kerala student founders</p>
                    <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
                      <p className="font-semibold text-foreground">IEDC Pre-Seed Fund:</p>
                      <p>Up to ₹50,000 for early campus prototype and hardware development.</p>
                      <p className="font-semibold text-foreground">KSUM Student Idea Grant:</p>
                      <p>Up to ₹2 Lakhs equity-free MVP funding for Kerala student founders.</p>
                      <p className="font-semibold text-foreground">K-DISC YIP Grant:</p>
                      <p>Statewide innovation grant for student research and scalable product ideas.</p>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      <a
                        href="https://startupmission.kerala.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[3rem] w-full items-center justify-center rounded-2xl bg-slate-900 px-6 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
                      >
                        🚀 Apply on KSUM Portal
                      </a>
                      <a
                        href="https://forms.gle/bk6j92xjfmHwLj2Y6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[3rem] w-full items-center justify-center rounded-2xl border border-white/10 bg-slate-950/60 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-900/80"
                      >
                        📋 Get IEDC Pitch Deck Support
                      </a>
                    </div>

                    <p className="mt-6 text-sm text-muted-foreground">Managed & reviewed weekly by College IEDC Team.</p>
                  </div>
                </div>
              </SectionReveal>
            )}

            {(isAll || activeCategory === "teamup") && (
              <SectionReveal>
                <div id="projects" className="space-y-6 min-w-0 w-full max-w-5xl mx-auto border-b border-border/50 py-10 sm:py-14">
                  <div className="mb-6 flex flex-col gap-3 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-12 rounded-full bg-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.25)]"></span>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">IEDC Matchmaking</p>
                    </div>
                    <h2 className="font-heading text-3xl font-bold text-foreground break-words">🏛️ College IEDC Project & Talent Network</h2>
                  </div>

                  <div className="glass rounded-3xl border border-border/40 bg-card/70 p-8 shadow-xl shadow-black/5 backdrop-blur-xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Verified project connections</p>
                    <p className="mt-4 text-2xl font-bold text-foreground">Build real products with campus talent or post paid client briefs through your local IEDC cell.</p>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      Have a project that needs building, or want to earn while building real products? Our IEDC cell connects verified client briefs with skilled campus developers and designers.
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      <a
                        href="https://forms.gle/bk6j92xjfmHwLj2Y6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[3rem] w-full items-center justify-center rounded-2xl bg-emerald-500 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-500/90"
                      >
                        💼 Post a Project / Paid Gig
                      </a>
                      <a
                        href="https://forms.gle/bk6j92xjfmHwLj2Y6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[3rem] w-full items-center justify-center rounded-2xl border border-white/10 bg-background/80 px-6 text-sm font-semibold text-foreground shadow-sm transition hover:bg-background/90"
                      >
                        💻 Join Student Talent Roster
                      </a>
                    </div>

                    <p className="mt-6 text-sm text-muted-foreground">Managed & reviewed weekly by College IEDC Team.</p>
                  </div>
                </div>
              </SectionReveal>
            )}

            <section className="space-y-8 rounded-3xl bg-card/70 border border-border/60 p-8 shadow-2xl shadow-black/5 backdrop-blur-xl">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="glass rounded-3xl border border-border/40 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">KSUM Milestones</p>
                  <h3 className="mt-4 text-2xl font-bold text-foreground">₹120+ Crore in support for Kerala student startups</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Kerala Startup Mission funding and IEDC-backed programs have accelerated student teams with equity-free grants, campus incubation, and founder mentorship.
                  </p>
                </div>
                <div className="glass rounded-3xl border border-border/40 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Maker Village Access</p>
                  <h3 className="mt-4 text-2xl font-bold text-foreground">Incubation pathways for campus product teams</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Maker Village connects Kerala student founders with seed support, prototyping labs, and local market pilots for deep-tech and B2B solutions.
                  </p>
                </div>
                <div className="glass rounded-3xl border border-border/40 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">IEDC Network</p>
                  <h3 className="mt-4 text-2xl font-bold text-foreground">Campus chapters, mentors, and project pipelines</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Every college IEDC cell acts as a bridge between student builders, local clients, and KSUM grant programs for faster project validation.
                  </p>
                </div>
              </div>
            </section>
            </> 
            )}
          </main>
        </div>

      <SectionReveal>
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="space-y-6 rounded-3xl bg-card/70 border border-border/60 p-8 shadow-2xl shadow-black/5 backdrop-blur-xl">
            <div className="space-y-2 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Frequently Asked Questions</p>
              <h2 className="font-heading text-3xl font-bold text-foreground">Kerala student founder queries, answered</h2>
              <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground">
                Click a question to reveal concise, ecosystem-specific answers from the IEDC / KSUM startup journey.
              </p>
            </div>

            <div className="grid gap-4">
            {faqItems.map((item) => {
              const isOpen = activeFaq === item.id
              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-3xl border border-border/40 bg-background/60 shadow-sm transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-foreground">{item.question}</span>
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full border transition ${
                        isOpen ? "border-primary bg-primary/10 text-primary" : "border-border/40 text-muted-foreground"
                      }`}
                    >
                      <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden px-6 transition-[max-height,opacity] duration-300 ${
                      isOpen ? "max-h-52 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="pb-6 text-sm leading-6 text-muted-foreground">{item.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      </SectionReveal>

      <footer className="border-t border-border py-8">
        <div className="w-full max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          Kerala Campus Hub — connecting students, IEDC chapters & the KSUM ecosystem.
        </div>
      </footer>

      <DetailModal opportunity={selected} onClose={() => setSelected(null)} />
    </main>
  )
}
