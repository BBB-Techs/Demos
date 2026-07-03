// Single source of truth for all site copy + data.
// Edit here; every section reads from this file.

export const ORG = {
  name: "BDANENY",
  fullName: "Bleeding Disorders Association of Northeastern New York",
  foundedYear: 1968,
  address: "333 Broadway #210, Troy, NY 12180",
  phone: "(518) 729-3577",
  phoneHref: "tel:+15187293577",
  email: "info@bdaneny.org",
  facebook: "https://www.facebook.com/BDANENY",
  instagram: "https://www.instagram.com/bdaneny",
};

export const NAV = [
  { label: "What We Do", href: "#pillars" },
  { label: "Events", href: "#event" },
  { label: "Advocacy", href: "#advocacy" },
  { label: "Get Help", href: "#help" },
  { label: "Get Involved", href: "#involve" },
];

export const HERO = {
  kicker: `Est. ${ORG.foundedYear} · Northeastern New York`,
  title: ["For every family,", "a lifeline."],
  lead: "We stand with the bleeding disorders community — turning education, advocacy, and direct support into a better quality of life for the people who count on us.",
  primary: { label: "Get help now", href: "#help" },
  secondary: { label: "Donate", href: "#involve" },
  trust: "A 501(c)(3) nonprofit serving families since 1968.",
};

export const STATS = [
  { value: 1968, label: "Founded as the Upper Hudson Valley Chapter", format: "year" },
  { value: 58, suffix: "", label: "Years standing with our community", format: "int" },
  { value: 4, label: "Direct-support programs for families", format: "int" },
  { value: 100, suffix: "%", label: "Community-driven and donor-powered", format: "int" },
] as const;

export const PILLARS = [
  {
    key: "education",
    accent: "brand",
    title: "Education",
    body: "Clear, trustworthy information about living well with a bleeding disorder — for those newly diagnosed, seasoned families, and everyone caring for them.",
  },
  {
    key: "advocacy",
    accent: "coral",
    title: "Advocacy",
    body: "We carry our community's voice to Albany and Washington, protecting access to care, coverage, and the treatments families depend on.",
  },
  {
    key: "community",
    accent: "green",
    title: "Community",
    body: "Camps, events, and connections that remind every family they are not walking this road alone — across all of Northeastern New York.",
  },
  {
    key: "support",
    accent: "orange",
    title: "Direct Support",
    body: "Scholarships, emergency assistance, and grants that meet real needs at the moments they matter most.",
  },
] as const;

export const EVENT = {
  badge: "Upcoming event",
  title: "2026 Cornhole Tournament",
  date: "Sunday, July 12, 2026",
  location: "Fort Orange Brewing Company · Albany, NY",
  body: "Bring a partner, a team, or just yourself. Every board tossed helps fund the programs that support our families. Good beer, better company, all for a cause.",
  cta: { label: "Save your spot", href: "#involve" },
};

export const ADVOCACY = {
  kicker: "Advocacy",
  title: "Your story changes policy.",
  body: "From coverage decisions in Albany to federal legislation in Washington, we make sure lawmakers hear directly from the people bleeding disorders affect.",
  items: [
    {
      title: "Local Issues",
      body: "State-level coverage, Medicaid protections, and access to specialty care across New York.",
    },
    {
      title: "Federal Issues",
      body: "National legislation, research funding, and the policies that shape treatment nationwide.",
    },
  ],
  cta: { label: "Add your voice", href: "#involve" },
};

export const HELP = {
  kicker: "Get Help",
  title: "Support, when you need it.",
  body: "If your family is facing a bleeding disorder, you don't have to navigate it alone. These programs exist for you — reach out.",
  programs: [
    { title: "Scholarships", body: "Educational scholarships for members of our community pursuing their goals." },
    { title: "Emergency Assistance", body: "Help covering urgent needs when a crisis hits unexpectedly." },
    { title: "BDA Cares Grant", body: "Grants that ease the everyday financial weight of managing a bleeding disorder." },
    { title: "Camperships", body: "Sending kids to camp — connection, confidence, and a summer to be a kid." },
  ],
  cta: { label: "Talk to us", href: `tel:+15187293577` },
};

export const INVOLVE = {
  kicker: "Get Involved",
  title: "It takes all of us.",
  body: "Every donation, hour, and signature ripples out to a family who needs it. Here's where you come in.",
  cards: [
    { title: "Donate", body: "Fuel scholarships, emergency aid, and camp for families across the region.", cta: "Give today" },
    { title: "Volunteer", body: "Lend your time and talent to events, advocacy, and community programs.", cta: "Sign up" },
    { title: "Stay in touch", body: "Get our newsletter for events, research, and recall alerts that matter.", cta: "Subscribe" },
  ],
};
