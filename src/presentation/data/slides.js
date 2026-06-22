import sliderLogo from "@/assets/img/slider-logo.png";
import mohanBuilding from "@/assets/img/mohan.jpg";
import { pppTheme } from "./theme.js";

export const presentationMeta = {
  title: "Mohan Group of Companies",
  subtitle: "plastprintpack Ethiopia 2026",
  tagline: "Your Premier Partner for Plastic Raw Materials in Ethiopia",
  footer: pppTheme.footer,
};

export const slides = [
  {
    id: "title",
    type: "ppp-title",
    section: "intro",
    logo: sliderLogo,
    texture: "/presentation/ppt/image1.jpg",
    title: "MOHAN GROUP OF COMPANIES",
    tagline: "Your Premier Partner for Plastic Raw Materials in Ethiopia",
    event: "plastprintpack Ethiopia 2026 · 25–27 June · AICC Addis Ababa",
  },
  {
    id: "ethiopia-growth",
    type: "stat-grid",
    section: "intro",
    title: "Ethiopia — Africa's Growth Story",
    body: "IMF projects Ethiopia as Africa's fastest-growing economy in 2026, with a young, rapidly urbanising population driving demand across every sector.",
    source: "Sources: IMF 2026 | United Nations | plastprintpack Ethiopia",
    stats: [
      { value: "9.2%", label: "GDP Growth Forecast", sub: "(IMF 2026)" },
      { value: "130M", label: "Population (2025)" },
      { value: "200M", label: "Projected Population", sub: "by 2050 (UN)" },
      { value: "7–9%", label: "Annual GDP Growth", sub: "2023–2027" },
      {
        value: "#1",
        label: "Fastest Growing Economy",
        sub: "in East & Central Africa",
      },
      { value: "2nd", label: "Most Populous Nation", sub: "in Africa" },
    ],
  },
  {
    id: "imports-growth",
    type: "ppp-chart-kpi",
    section: "intro",
    title: "Ethiopia's Plastics Imports — 584% Growth",
    source: "Source: EUROMAP 2025",
    footnote:
      "Ethiopia is East & Central Africa's 2nd largest importer of plastics · 100% demand met through imports",
    kpis: [
      { value: "584%", label: "Import Growth", sub: "2007–2024" },
      { value: "12%", label: "Avg Annual Growth Rate" },
      { value: "294 kt", label: "Raw Materials Imported (2024)" },
    ],
    lineChart: {
      title: "Imports (kt)",
      labels: [
        "2007",
        "2009",
        "2011",
        "2013",
        "2015",
        "2017",
        "2019",
        "2021",
        "2023",
        "2024",
      ],
      series: [
        {
          label: "Imports (kt)",
          values: [43, 55, 70, 88, 110, 140, 175, 210, 260, 294],
          color: "#C8A020",
        },
      ],
    },
  },
  {
    id: "consumption",
    type: "ppp-dual-chart",
    section: "intro",
    title: "Consumption — Strong & Steady Growth",
    source: "Source: EUROMAP 2025",
    note: "* 2029 EUROMAP forecast | 11.5% avg annual growth in total consumption | Per capita: 0.6 kg (2007) to 3.2 kg by 2029",
    highlight:
      "11.5% avg annual growth · 9% per capita growth · 370 kt forecast by 2029",
    vBars: {
      title: "Total Consumption (kt)",
      labels: ["2007", "2010", "2013", "2016", "2019", "2022", "2024", "2029*"],
      items: [
        { label: "2007", value: 44, color: "#C8A020" },
        { label: "2010", value: 62, color: "#C8A020" },
        { label: "2013", value: 87, color: "#C8A020" },
        { label: "2016", value: 120, color: "#C8A020" },
        { label: "2019", value: 168, color: "#C8A020" },
        { label: "2022", value: 225, color: "#C8A020" },
        { label: "2024", value: 281, color: "#C8A020" },
        { label: "2029*", value: 370, color: "#F0D060" },
      ],
    },
    lineChart: {
      title: "Per Capita Consumption (kg)",
      labels: ["2007", "2010", "2013", "2016", "2019", "2022", "2024", "2029*"],
      series: [
        {
          label: "Per Capita (kg)",
          values: [0.6, 0.8, 1.1, 1.4, 1.8, 2.2, 2.6, 3.2],
          color: "#F0D060",
        },
      ],
    },
  },
  {
    id: "plastics-use",
    type: "ppp-dual-pie",
    section: "intro",
    title: "How Ethiopia Uses Plastics — 2024",
    source: "Source: EUROMAP 2025",
    footnote:
      "Packaging = 54% of all plastics consumption — driven by FMCG, beverage and agro-industry sectors",
    donuts: [
      {
        title: "By End-Use Application",
        segments: [
          { label: "Packaging", value: 54, color: "#C8A020" },
          { label: "Construction", value: 16, color: "#F0D060" },
          { label: "Automotive", value: 6, color: "#8A6D10" },
          { label: "Electrical & Telecom", value: 3, color: "#CCCCCC" },
          { label: "Other", value: 21, color: "#444000" },
        ],
      },
      {
        title: "By Processing Method",
        segments: [
          { label: "Extrusion", value: 49, color: "#C8A020" },
          { label: "Injection Moulding", value: 24, color: "#F0D060" },
          { label: "PET / Stretch Blow", value: 13, color: "#8A6D10" },
          { label: "Blow Moulding", value: 7, color: "#CCCCCC" },
          { label: "Other", value: 7, color: "#444000" },
        ],
      },
    ],
  },
  {
    id: "our-story",
    type: "story-split",
    section: "intro",
    title: "Mohan Group — Our Story",
    image: "/CEO_Mohan.jpg",
    name: "Mr. Mayur Kothari",
    role: "Founder & Chairman",
    company: "Mohan Group of Companies",
    paragraphs: [
      'Founded in Addis Ababa, the Mohan Group was established in memory of the late Mr. Suryakant "Mohan" Kothari.',
      "Starting as a small trading firm, the Group has grown into Ethiopia's most trusted name in polymer raw materials, footwear, and packaging.",
      "Today, 7+ manufacturing units and a state-of-the-art Dire Dawa Free Trade Zone hub serve customers across all regions of Ethiopia.",
    ],
  },
  {
    id: "presence",
    type: "presence",
    section: "products",
    title: "Our Presence in Ethiopia",
    image: mohanBuilding,
    stats: [
      { value: "30+", label: "Years Operating in Ethiopia" },
      { value: "7+", label: "Manufacturing Units" },
      { value: "#1", label: "Trusted Polymer Partner in Ethiopia" },
    ],
    portfolio: [
      "HDPE",
      "LDPE",
      "LLDPE",
      "PP",
      "PVC",
      "PET",
      "EVA",
      "PS",
      "ABS",
      "Masterbatch",
      "Additives",
      "Fillers",
    ],
  },
  {
    id: "ddftz-hub",
    type: "feature-split",
    section: "ddftz",
    title: "Dire Dawa Free Trade Zone — Our Strategic Hub",
    image: "/ddftz/ddftz-gateway-overview.png",
    features: [
      {
        title: "Bonded Warehouse Facility",
        detail: "100% duty-free storage for imported raw materials",
      },
      {
        title: "Rail + Road Connectivity",
        detail: "Linked to Djibouti Port via Addis–Djibouti Railway",
      },
      {
        title: "Container Handling Operations",
        detail: "Heavy-duty reach stackers & forklifts on-site",
      },
      {
        title: "Strategic Supply Point",
        detail: "Serving all regions of Ethiopia from a central hub",
      },
      {
        title: "Free Trade Zone Benefits",
        detail: "Customs & tax advantages for manufacturers & traders",
      },
    ],
  },
  {
    id: "ddftz-warehouses",
    type: "photo-duo",
    section: "ddftz",
    largePhotos: true,
    title: "Bonded Warehouse Facilities",
    subtitle:
      "Modern warehouses with stone-and-steel construction inside Dire Dawa Free Trade Zone",
    images: [
      {
        src: "/ddftz/ddftz-warehouse-exterior-yard.png",
        caption: "Warehouse exterior — bonded storage buildings",
        objectPosition: "center center",
      },
      {
        src: "/ddftz/ddftz-warehouse-interior-stacks.png",
        caption: "High-capacity warehouse interior — palletised resin stocks",
        objectPosition: "center center",
        static: true,
      },
    ],
  },
  {
    id: "ddftz-storage",
    type: "photo-duo",
    section: "ddftz",
    largePhotos: true,
    title: "Outdoor Storage & Yard Operations",
    subtitle: "Bulk materials, resin drums and sack storage in the DDFTZ yard",
    images: [
      {
        src: "/ddftz/ddftz-yard-drums-mountains.png",
        caption: "Outdoor storage — resin drums & bulk sacks",
        objectPosition: "center center",
      },
      {
        src: "/ddftz/ddftz-forklift-warehouse.png",
        caption: "Warehouse loading — HELI forklift operations",
        objectPosition: "center center",
        static: true,
      },
    ],
  },
  {
    id: "ddftz-ops",
    type: "photo-duo",
    section: "ddftz",
    largePhotos: true,
    staticPhotos: true,
    title: "Operations & Logistics at DDFTZ",
    subtitle:
      "Reach stackers for container operations · HELI forklifts for warehouse management · Ethiopian carrier partnerships",
    images: [
      {
        src: "/ddftz/ddftz-reachstacker-container.png",
        caption: "Reach stacker — Ethiopian Shipping Lines container handling",
      },
      {
        src: "/ddftz/ddftz-forklift-container.png",
        caption: "HELI forklift — container loading operations",
      },
    ],
  },
  {
    id: "resin-portfolio",
    type: "resin-grid",
    section: "products",
    title: "Our Plastic Raw Material Portfolio",
    background: "/ddftz/granules-bg.png",
    footnote:
      "100% import-dependent · Sourced from Middle East, Asia & Europe · Supplied direct from our DDFTZ bonded warehouse",
    resins: [
      {
        code: "HDPE",
        name: "High Density PE",
        uses: "Drums, crates, pipes, jerrycans",
        image: "/products/HDPE.png",
        objectPosition: "center 55%",
      },
      {
        code: "LDPE",
        name: "Low Density PE",
        uses: "Films, bags, shrink wrap, coatings",
        image: "/products/ldpe.png",
        objectPosition: "center center",
      },
      {
        code: "LLDPE",
        name: "Linear LDPE",
        uses: "Stretch films, packaging films",
        image: "/products/molding.png",
      },
      {
        code: "PP",
        name: "Polypropylene",
        uses: "Injection moulding, woven bags, fibres",
        image: "/products/PP.png",
        objectPosition: "center center",
      },
      {
        code: "PVC",
        name: "Polyvinyl Chloride",
        uses: "Cables, pipes, profiles, flooring",
        image: "/pvc-2.png",
        objectPosition: "center center",
      },
      {
        code: "PET",
        name: "Polyethylene Terephthalate",
        uses: "Bottles, preforms, packaging",
        image: "/products/pet.png",
        objectPosition: "center center",
      },
      {
        code: "EVA",
        name: "Ethylene Vinyl Acetate",
        uses: "Footwear soles, foam products",
        image: "/products/eva1.png",
        objectPosition: "center center",
      },
      {
        code: "Masterbatch",
        name: "Color & Additive Compounds",
        uses: "All standard colors & special grades",
        image: "/products/masterbatch.png",
        objectPosition: "center center",
        contain: true,
      },
    ],
  },
  {
    id: "masterbatch",
    type: "masterbatch-colors",
    section: "products",
    title: "Color Masterbatches",
    subtitle:
      "Enhancing your products with vibrant, consistent color solutions",
    image: "/ddftz/granules-1.png",
    colors: ["YELLOW", "RED", "GREEN", "BLUE", "WHITE"],
    colorHex: {
      YELLOW: "#FFC000",
      RED: "#ED7D31",
      GREEN: "#70AD47",
      BLUE: "#4472C4",
      WHITE: "#E7E6E6",
    },
    note: "Also available: Black, Orange, Brown, Purple, custom shades & functional additive masterbatches",
  },
  {
    id: "industries",
    type: "industry-grid",
    section: "products",
    title: "Plastics Powering Ethiopia's Industries",
    items: [
      {
        title: "Plastic Chairs",
        detail: "Household & commercial seating",
        image: "/presentation/plastic-chairs.png",
      },
      {
        title: "Storage Drums",
        detail: "200L HDPE drums & containers",
        image: "/products/storagedrums.png",
      },
      {
        title: "Jerrycans",
        detail: "Water & fuel containers",
        image: "/products/HDPE.png",
      },
      {
        title: "FMCG Packaging",
        detail: "Bottles, tubs & sachets",
        image: "/products/bottles.png",
      },
      {
        title: "Shrink Packaging",
        detail: "Film wrapping for beverages",
        image: "/products/ldpe.png",
      },
      {
        title: "Milk Packaging",
        detail: "HDPE / PP bottles & pouches",
        image: "/products/milkbottle.png",
      },
      {
        title: "Beverage Crates",
        detail: "PP injection-moulded crates",
        image: "/products/molding.png",
      },
      {
        title: "PVC Cables",
        detail: "PVC-coated electrical cables",
        image: "/products/pvccables.png",
      },
      {
        title: "EVA & PVC Footwear",
        detail: "Soles, slippers & sandals",
        image: "/pvc-2.png",
      },
    ],
  },
  {
    id: "thank-you",
    type: "ppp-thankyou",
    section: "intro",
    logo: sliderLogo,
    title: "THANK YOU",
    subtitle: "Connect with us at plastprintpack Ethiopia 2026",
    tagline: "Your Premier Partner for Plastic Raw Materials in Ethiopia",
    contacts: [
      {
        label: "Website",
        value: "www.highlandershoe.com",
        href: "https://www.highlandershoe.com",
      },
      {
        label: "Email",
        value: "info@mohanplc.com",
        href: "mailto:info@mohanplc.com",
      },
      {
        label: "Exhibition",
        value: "plastprintpack Ethiopia 2026 · 25–27 June 2026",
      },
      { label: "Location", value: "Dire Dawa Free Trade Zone, Ethiopia" },
    ],
    qr: "/presentation/qr-code.png",
  },
];
