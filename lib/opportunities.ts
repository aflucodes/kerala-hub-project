export type Category =
  | "all"
  | "events"
  | "grants"
  | "teamup"
  | "resources"

export type OpportunityType = "Event" | "Grant" | "Teamup" | "Resource"

export interface Opportunity {
  id: string
  type: OpportunityType
  category: Exclude<Category, "all">
  title: string
  description: string
  meta: { label: string; value: string }[]
  primaryAction: "apply" | "info" | "contact" | "download"
  location?: string
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All Opportunities" },
  { id: "events", label: "Hackathons & Events" },
  { id: "grants", label: "IEDC & KSUM Grants" },
  { id: "teamup", label: "Campus Projects Looking for Teammates" },
  { id: "resources", label: "Study Notes & Resources" },
]

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "ieee-hackathon-2026",
    type: "Event",
    category: "events",
    title: "IEEE State Hackathon 2026",
    description:
      "A 36-hour flagship hackathon bringing together student innovators from across Kerala. Build solutions for smart campuses, agri-tech, and public services. Prizes worth ₹1.5 Lakh.",
    meta: [
      { label: "Location", value: "Kochi" },
      { label: "Deadline", value: "Next Week" },
      { label: "Team Size", value: "2–4" },
    ],
    location: "Kochi",
    primaryAction: "apply",
  },
  {
    id: "ksum-idea-grant",
    type: "Grant",
    category: "grants",
    title: "KSUM Idea Grant ₹2 Lakh",
    description:
      "Kerala Startup Mission's Idea Grant provides up to ₹2 Lakh in early-stage funding for student founders to build a prototype and validate their idea.",
    meta: [
      { label: "Eligibility", value: "IEDC Students" },
      { label: "Amount", value: "₹2,00,000" },
      { label: "Mode", value: "Rolling" },
    ],
    primaryAction: "info",
  },
  {
    id: "campus-app-teamup",
    type: "Teamup",
    category: "teamup",
    title: "Looking for React & AI Dev for Campus App",
    description:
      "Building a campus attendance + events app for our college. Need a builder comfortable with React and basic AI/LLM integrations. Equity + KSUM incubation possible.",
    meta: [
      { label: "Role", value: "Builder" },
      { label: "Stack", value: "React · AI" },
      { label: "Commitment", value: "Part-time" },
    ],
    location: "Thrissur",
    primaryAction: "contact",
  },
  {
    id: "bca-study-notes",
    type: "Resource",
    category: "resources",
    title: "BCA First Year Exam Study Notes & Question Bank",
    description:
      "Complete first-year BCA study notes covering C programming, digital fundamentals, and mathematics — plus a solved previous-year question bank. Free PDF.",
    meta: [
      { label: "Format", value: "PDF" },
      { label: "Pages", value: "120+" },
      { label: "Course", value: "BCA Sem 1" },
    ],
    primaryAction: "download",
  },
]

export const QUICK_LINKS: { label: string; description: string }[] = [
  { label: "Find Your IEDC Chapter", description: "Directory of college chapters" },
  { label: "KSUM Grant Guidelines", description: "Eligibility & how to apply" },
  { label: "Kerala Event Calendar", description: "Upcoming hackathons & meetups" },
  { label: "Startup Incubation Hubs", description: "Kochi · Kozhikode · TVM" },
]
