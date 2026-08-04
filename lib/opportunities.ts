export type Category =
  | "all"
  | "events"
  | "grants"
  | "teamup"

export type OpportunityType = "Event" | "Grant" | "Teamup" | "Resource"

export interface Opportunity {
  id: string
  type: OpportunityType
  category: Exclude<Category, "all">
  title: string
  description: string
  meta: { label: string; value: string }[]
  badges?: { label: string; value: string }[]
  skillTags?: string[]
  projectTag?: string
  primaryAction: "apply" | "info" | "contact" | "download" | "whatsapp"
  actionUrl?: string
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "✨ All Hubs" },
  { id: "events", label: "🏆 Hackathons & Events" },
  { id: "grants", label: "💰 Innovation Grants" },
  { id: "teamup", label: "🏛️ IEDC Talent & Gigs" },
]

const createWhatsAppUrl = (title: string, skills: string[]) =>
  `https://wa.me/?text=${encodeURIComponent(
    `Hello, I am interested in ${title}. My name is [Your Name]. I have experience in ${skills.join(", ")}. Please let me know how I can contribute to this project.`,
  )}`

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "ieee-kerala-campus-hackathon",
    type: "Event",
    category: "events",
    title: "IEEE Kerala Student Sprints",
    description:
      "Explore campus-level innovation tracks for smart mobility, health, and public systems through IEEE Kerala student hackathons and mentorship.",
    meta: [
      { label: "Track", value: "Deep-Tech / Mobility" },
      { label: "Benefit", value: "Duty Leave + IEDC Mentorship" },
      { label: "Access", value: "IEEE Kerala Portal" },
    ],
    primaryAction: "apply",
    actionUrl: "https://ieeekerala.org",
  },
  {
    id: "ksum-campus-sprint",
    type: "Event",
    category: "events",
    title: "KSUM Campus Hackathons",
    description:
      "Join Kerala Startup Mission campus events focused on deep-tech and sustainability challenges, with support from local IEDC chapters.",
    meta: [
      { label: "Track", value: "Deep-Tech / Sustainability" },
      { label: "Benefit", value: "Startup Mentorship" },
      { label: "Access", value: "Startup Mission Hub" },
    ],
    primaryAction: "apply",
    actionUrl: "https://startupmission.kerala.gov.in",
  },
  {
    id: "ksum-idea-grant",
    type: "Grant",
    category: "grants",
    title: "KSUM Student Idea Grant",
    description:
      "Equity-free funding up to ₹2,00,000 for Kerala student founders to build MVPs and early prototypes under the Startup Mission support ecosystem.",
    meta: [
      { label: "Eligibility", value: "IEDC & KSUM Students" },
      { label: "Amount", value: "₹2,00,000" },
      { label: "Support", value: "Mentoring + Pitch Review" },
    ],
    primaryAction: "info",
    actionUrl: "https://startupmission.kerala.gov.in",
  },
  {
    id: "iedc-preseed-innovator-fund",
    type: "Grant",
    category: "grants",
    title: "IEDC Pre-Seed Innovator Fund",
    description:
      "Campus teams can access up to ₹50,000 for prototype development, workshops, and project validation through their college IEDC cell.",
    meta: [
      { label: "Amount", value: "Up to ₹50,000" },
      { label: "Eligibility", value: "College IEDC Teams" },
      { label: "Duration", value: "Short-term support" },
    ],
    primaryAction: "info",
    actionUrl: "https://startupmission.kerala.gov.in",
  },
  {
    id: "kdisc-yip-grant",
    type: "Grant",
    category: "grants",
    title: "K-DISC Young Innovators Programme Grant",
    description:
      "A student-focused grant stream through K-DISC supporting young innovators from Kerala with seed funding and mentor connections.",
    meta: [
      { label: "Amount", value: "₹30,000+" },
      { label: "Eligibility", value: "Student Innovators" },
      { label: "Application", value: "Open now" },
    ],
    primaryAction: "info",
    actionUrl: "https://startupmission.kerala.gov.in",
  },
  {
    id: "iedc-paid-ui-gig",
    type: "Teamup",
    category: "teamup",
    title: "Client Paid Gig: IEDC Chapter UI Builder",
    description:
      "Design the next generation of the college IEDC chapter portal and social pitch deck. Paid gig for a student UI/UX developer with Figma and Next.js experience.",
    projectTag: "Client Paid Gig",
    badges: [
      { label: "💰 Paid Gig", value: "Stipend Negotiable" },
      { label: "Mentor", value: "College IEDC Cell" },
    ],
    skillTags: ["Figma", "Next.js"],
    meta: [
      { label: "Role", value: "UI/UX Developer" },
      { label: "Work Mode", value: "Campus Hybrid" },
      { label: "Stage", value: "MVP Ready" },
    ],
    primaryAction: "whatsapp",
    actionUrl: createWhatsAppUrl("Client Paid Gig: IEDC Chapter UI Builder", ["Figma", "Next.js"]),
  },
  {
    id: "iedc-incubated-agritech",
    type: "Teamup",
    category: "teamup",
    title: "IEDC Incubated Project: AgriTech Marketplace MVP",
    description:
      "Join a college incubated AgriTech product team building a buyer-seller marketplace for Kerala farmers. Looking for React and Node.js developers with product focus.",
    projectTag: "IEDC Incubated Project",
    badges: [
      { label: "🏛️ IEDC Grant Funded", value: "Campus Product Team" },
      { label: "Mentor", value: "College IEDC Cell" },
    ],
    skillTags: ["React", "Node.js", "Python"],
    meta: [
      { label: "Role", value: "Full-stack Dev" },
      { label: "Work Mode", value: "Campus Hybrid" },
      { label: "Stage", value: "Concept Stage" },
    ],
    primaryAction: "whatsapp",
    actionUrl: createWhatsAppUrl("IEDC Incubated Project: AgriTech Marketplace MVP", ["React", "Node.js", "Python"]),
  },
  {
    id: "hackathon-teammate-iot",
    type: "Teamup",
    category: "teamup",
    title: "Hackathon Teammate Request: IoT Campus Safety Device",
    description:
      "Need an IoT or Flutter teammate to build a safety alert device for a Kerala campus hackathon. Reward share plus mentorship from the IEDC cell.",
    projectTag: "Hackathon Teammate Request",
    badges: [
      { label: "📜 Certificate", value: "KTU Activity Points" },
      { label: "Mentor", value: "College IEDC Cell" },
    ],
    skillTags: ["IoT", "Flutter"],
    meta: [
      { label: "Role", value: "Hardware + App Dev" },
      { label: "Work Mode", value: "Campus Hybrid" },
      { label: "Stage", value: "Concept Stage" },
    ],
    primaryAction: "whatsapp",
    actionUrl: createWhatsAppUrl("Hackathon Teammate Request: IoT Campus Safety Device", ["IoT", "Flutter"]),
  },
]

export const QUICK_LINKS: { label: string; description: string }[] = [
  { label: "Find Your IEDC Chapter", description: "Directory of college chapters" },
  { label: "KSUM Grant Guidelines", description: "Eligibility & how to apply" },
  { label: "Kerala Event Calendar", description: "Upcoming hackathons & meetups" },
  { label: "Startup Incubation Hubs", description: "Kochi · Kozhikode · TVM" },
]
