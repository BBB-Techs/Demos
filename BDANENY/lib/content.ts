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
  site: "https://bdaneny.org",
  facebook: "https://www.facebook.com/BDANENY",
  instagram: "https://www.instagram.com/bdaneny",
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Programs & Events", href: "/programs-events" },
  { label: "About", href: "/about" },
  { label: "Advocacy", href: "/advocacy" },
  { label: "Get Help", href: "/get-help" },
  { label: "Resources", href: "/resources" },
  { label: "Support", href: "/support" },
  { label: "Español", href: "/espanol" },
];

export const HERO = {
  kicker: `Est. ${ORG.foundedYear} · Northeastern New York`,
  title: ["For every family,", "a lifeline."],
  lead: "We stand with the bleeding disorders community — turning education, advocacy, and direct support into a better quality of life for the people who count on us.",
  primary: { label: "Get help now", href: "/get-help" },
  secondary: {
    label: "Donate",
    href: "https://crm.bloomerang.co/HostedDonation?ApiKey=pub_270bf66a-a934-11e7-afbe-024e165d44b3&WidgetId=1665024",
  },
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

// Photos shown one after another in the event card (taken from the BDANENY website).
export const PHOTOS: { src: string; alt: string }[] = [
  { src: "/photos/site-annual-meeting-2023-wide.jpeg", alt: "2023 Annual Meeting at Dave and Busters, Crossgates Mall" },
  { src: "/photos/site-pavilion-group.jpeg", alt: "Three BDANENY community members smiling under a pavilion" },
  { src: "/photos/site-brads-barnyard.jpeg", alt: "Brad's Barnyard fall display with scarecrows and pumpkins" },
  { src: "/photos/site-kids-swing.jpeg", alt: "Two kids playing on a large swing" },
  { src: "/photos/site-community-is-strength.png", alt: "Billboard reading Community is Strength" },
  { src: "/photos/site-presentation-dinner.jpeg", alt: "A presenter speaking to a dinner meeting" },
];

export type EventItem = {
  id: string;
  start: string; // ISO date (YYYY-MM-DD). Events whose start is before today are hidden.
  badge: string;
  title: string;
  date: string;
  location: string;
  body: readonly string[];
  cta: { label: string; href: string };
  card: { month: string; day: string; title: string; location: string };
};

export const EVENTS: EventItem[] = [
  {
    id: "annual-meeting",
    start: "2026-11-15",
    badge: "Upcoming event",
    title: "Annual Meeting",
    date: "Sunday, November 15, 2026",
    location: "Apex Entertainment (Crossgates Mall, Albany)",
    body: [
      "Join us for a day of education and fun!",
      "Check in with our vendors and be in a drawing to win a prize.",
      "Enjoy a delicious lunch and meet the new ED.",
      "Then it's off to bumper cars, bowling or the arcade.",
      "The fun starts at 11:00 am.",
    ],
    cta: { label: "Register Here", href: "https://www.eventbrite.com/e/bdaneny-annual-meeting-tickets-2003820840074?aff=oddtdtcreator" },
    card: {
      month: "11",
      day: "15",
      title: "Annual Meeting",
      location: "Apex Entertainment · Crossgates Mall, Albany",
    },
  },
  {
    id: "virtual-education",
    start: "2026-12-03",
    badge: "Upcoming event",
    title: "Virtual Education Event",
    date: "Thursday, December 3, 2026 · 6:30 pm",
    location: "Virtual (online webinar)",
    body: [
      "A webinar on rebalancing agents, described as the latest breakthrough in hemophilia treatment.",
      "Sponsored by Pfizer.",
    ],
    cta: { label: "Register Here", href: "https://www.eventbrite.com/e/hympavzi-webinar-tickets-2004246354800?aff=oddtdtcreator" },
    card: {
      month: "12",
      day: "03",
      title: "Virtual Education Event",
      location: "Online · 6:30 pm",
    },
  },
];

// Events that have not happened yet, based on today's local date.
export function upcomingEvents(today: Date = new Date()): EventItem[] {
  const pad = (n: number) => String(n).padStart(2, "0");
  const todayKey = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  return EVENTS.filter((ev) => ev.start >= todayKey).sort((a, b) => a.start.localeCompare(b.start));
}

export const ADVOCACY = {
  kicker: "Advocacy",
  title: "Fighting for access to health care for the Bleeding Disorders Community",
  body: "BDANENY and NYSBDC advocate for issues important to the bleeding disorder and chronic care communities.",
  items: [
    {
      title: "Local Issues",
      body: "Prior Authorization Reform and other state-level issues.",
    },
    {
      title: "Federal Issues",
      body: "Accumulator Adjuster Programs and other federal issues.",
    },
  ],
  cta: { label: "Go to our Advocacy Page", href: "/advocacy" },
};

export const HELP = {
  kicker: "Get Help",
  title: "We can help!",
  body: "Get help by recieving Scholarships, Emergency assistance and more.",
  programs: [
    { title: "Scholarships", body: "Educational scholarships for members of our community pursuing their goals.", href: "/get-help/scholarships" },
    { title: "Emergency Assistance", body: "Help covering urgent needs when a crisis hits unexpectedly.", href: "/get-help/emergency-assistance-form" },
    { title: "BDA Cares Grant", body: "Grants that ease the everyday financial weight of managing a bleeding disorder.", href: "/get-help/bda-cares-grant" },
    { title: "Camperships", body: "Sending kids to camp — connection, confidence, and a summer to be a kid.", href: "/get-help/camperships" },
  ],
  cta: { label: "Talk to us", href: `tel:+15187293577` },
};

export const INVOLVE = {
  kicker: "Get Involved",
  title: "Help us Help our Community - Volunteer!",
  body: "Take a look at some of our upcoming events!",
  cards: [
    { title: "Donate", body: "You can help by making a donation, volunteering or even attending events with us!", cta: "Give today", href: "https://crm.bloomerang.co/HostedDonation?ApiKey=pub_270bf66a-a934-11e7-afbe-024e165d44b3&WidgetId=1665024" },
    { title: "Volunteer", body: "We are currently not taking volunteers at this time.", cta: "Sign up", href: "/support/volunteer" },
    { title: "Advertise", body: "BDANENY 2022 Newsletter Sponsorship Opportunities.", cta: "Learn more", href: "/support/advertise" },
  ],
};
