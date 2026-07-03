import { withBasePath } from "@/lib/basePath";

export const brands = [
  {
    name: "American Bath Group",
    logo: withBasePath("/logos/american-bath-group.jpg"),
    areas: "AL, FL Panhandle, TN",
    blurb:
      "A broad portfolio of recognized brands — WHB represents Aquatic, Bootz, Swan, Praxis, and Hamilton.",
  },
  {
    name: "Axiom",
    logo: withBasePath("/logos/axiom.jpg"),
    areas: "AR, KY, TN",
    blurb:
      "Condensate neutralizers, system feeders, chemical treatment, and demineralizers for boiler systems.",
  },
  {
    name: "Monster",
    logo: withBasePath("/logos/monster.png"),
    areas: "TN",
    blurb:
      "Blue Monster thread sealants and tapes, engineered for easy, reliable use on the job.",
  },
  {
    name: "BWC Water Heaters",
    logo: withBasePath("/logos/bwc-water-heaters.jpg"),
    areas: "AL, AR, FL Panhandle, KY, LA, MS, TN",
    blurb:
      "Bradford White water heating and space heating systems, advancing the trade since 1881.",
  },
  {
    name: "EPC Fittings",
    logo: withBasePath("/logos/epc-fittings.png"),
    areas: "AR, TN (excludes East TN)",
    blurb:
      "Screw machine and specialty plumbing fittings out of Elkhart, Indiana, since 1940.",
  },
  {
    name: "Fernco",
    logo: withBasePath("/logos/fernco.jpg"),
    areas: "AL, FL Panhandle",
    blurb:
      "Flexible pipe couplings born from a Master Plumber's patented 'Donut,' since 1964.",
  },
  {
    name: "General Pipe Cleaners",
    logo: withBasePath("/logos/general-pipe-cleaners.gif"),
    areas: "AL, FL Panhandle",
    blurb:
      "Family-owned drain cleaning equipment for plumbing contractors, in business since 1930.",
  },
  {
    name: "Ideal Tridon",
    logo: withBasePath("/logos/ideal-tridon.png"),
    areas: "AL, KY, FL Panhandle",
    blurb:
      "Stainless steel worm gear and specialty clamps for plumbing, industrial, and marine use.",
  },
  {
    name: "IMCOA",
    logo: withBasePath("/logos/imcoa.jpg"),
    areas: "Southeast territory",
    blurb: "Insulation and plumbing accessories for finished installs.",
  },
  {
    name: "JS",
    logo: withBasePath("/logos/js.jpg"),
    areas: "AL, AR, KY, MS, TN, FL Panhandle",
    blurb: "Jones Stephens specialty products for plumbing, HVAC, and MRO.",
  },
  {
    name: "Lasco Fittings",
    logo: withBasePath("/logos/lasco-fittings.png"),
    areas: "AR",
    blurb:
      "Schedule 40/80, CTS, DWV, and irrigation fittings built to strict industry standards.",
  },
  {
    name: "Leonard",
    logo: withBasePath("/logos/leonard.jpg"),
    areas: "Southeast territory",
    blurb: "Water temperature controls and mixing valves for safe, precise delivery.",
  },
  {
    name: "Liberty Pumps",
    logo: withBasePath("/logos/liberty-pumps.jpg"),
    areas: "TN, North MS",
    blurb:
      "670+ models of sewage, sump, and grinder pumps, control panels, and pump systems.",
  },
  {
    name: "Mansfield",
    logo: withBasePath("/logos/mansfield.jpg"),
    areas: "AL, AR, KY, MS, TN, FL Panhandle",
    blurb:
      "Well-styled plumbing fixtures backed by extensive warranties and short lead times.",
  },
  {
    name: "MIFAB",
    logo: withBasePath("/logos/mifab.jpg"),
    areas: "Southeast territory",
    blurb: "Commercial drainage products and specialty plumbing fixtures.",
  },
  {
    name: "Moen",
    logo: withBasePath("/logos/moen.jpg"),
    areas: "AL, AR, West TN",
    blurb:
      "Faucets and fixtures that keep style in focus without losing sight of real life.",
  },
  {
    name: "MrCool",
    logo: withBasePath("/logos/mrcool.jpg"),
    areas: "AL, AR, KY, MS, TN, FL Panhandle",
    blurb:
      "Ductless mini-split air conditioners and heat pumps for flexible, modern installs.",
  },
  {
    name: "PHD",
    logo: withBasePath("/logos/phd.png"),
    areas: "AL, AR, FL Panhandle, KY, LA, MS, TN",
    blurb:
      "Commercial and industrial plumbing, mechanical, and fire protection pipe products.",
  },
  {
    name: "RWV",
    logo: withBasePath("/logos/rwv.jpg"),
    areas: "AR, KY, TN",
    blurb:
      "Red-White Valve — valves for plumbing, commercial, and industrial markets for 40+ years.",
  },
  {
    name: "Taco",
    logo: withBasePath("/logos/taco.jpg"),
    areas: "Western KY, TN",
    blurb:
      "Taco Comfort Solutions circulator pumps and hydronic components, family-run since 1920.",
  },
  {
    name: "Vortens",
    logo: withBasePath("/logos/vortens.png"),
    areas: "AL, AR, KY, MS, TN, FL Panhandle",
    blurb: "Ceramic sanitaryware — toilets and fixtures built to last.",
  },
  {
    name: "Woodford / Watco / MAPA",
    logo: withBasePath("/logos/woodford-watco-mapa.jpg"),
    areas: "TN",
    blurb:
      "Woodford outdoor faucets, Watco bath drains, and MAPA specialty plumbing components.",
  },
  {
    name: "Zurn Industries",
    logo: withBasePath("/logos/zurn-industries.jpg"),
    areas: "TN",
    blurb:
      "PEX pipe fittings and accessories certified for the industry's highest UV and chlorine resistance.",
  },
] as const;

export const territory = [
  "Alabama",
  "Arkansas",
  "Florida Panhandle",
  "Kentucky",
  "Louisiana",
  "Mississippi",
  "Tennessee",
] as const;

export const capabilities = [
  {
    label: "Plumbing",
    description:
      "Fittings, fixtures, and pumps from the brands contractors already trust — stocked and ready to move.",
    stat: "6+ product lines",
  },
  {
    label: "HVAC",
    description:
      "Water heaters and climate equipment backed by manufacturer relationships built over decades in the field.",
    stat: "2 major heater brands",
  },
  {
    label: "Building Supply",
    description:
      "The connective layer between manufacturers and distributors across seven Southeastern states.",
    stat: "7 states covered",
  },
] as const;

export const stats = [
  { value: "23", label: "Manufacturer brands represented" },
  { value: "7", label: "Southeastern states covered" },
  { value: "8", label: "Outside salesmen in the field" },
] as const;

export const associations = [
  {
    abbr: "AIM/R",
    name: "Association of Independent Manufacturers' Representatives",
    blurb:
      "Board service, sponsorship, and active member involvement in the trade association for independent reps.",
  },
  {
    abbr: "ASA",
    name: "American Supply Association",
    blurb:
      "One of the first rep-level sustaining partners, with a standing board role and event participation.",
  },
  {
    abbr: "SWA",
    name: "Specialty Wholesale Association",
    blurb:
      "Present at the annual conference and engaged in board and industry meetings year-round.",
  },
] as const;
