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
        sub2: "and the 1st operator in DDFTZ",
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
    hidden: true,
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
          { label: "Construction", value: 16, color: "#3B82F6" },
          { label: "Automotive", value: 6, color: "#F97316" },
          { label: "Electrical & Telecom", value: 3, color: "#FFFFFF" },
          { label: "Other", value: 21, color: "#22C55E" },
        ],
      },
      {
        title: "By Processing Method",
        segments: [
          { label: "Extrusion", value: 49, color: "#C8A020" },
          { label: "Injection Moulding", value: 24, color: "#3B82F6" },
          { label: "PET / Stretch Blow", value: 13, color: "#F97316" },
          { label: "Blow Moulding", value: 7, color: "#FFFFFF" },
          { label: "Other", value: 7, color: "#22C55E" },
        ],
      },
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
      "PVC Compound",
      "PVC",
      "PET",
      "EVA Compound",
      "Color Masterbatch",
      "PS",
      "ABS",
      "Masterbatch",
      "Additives",
      "Filler Compound",
      "Fillers",
    ],
  },
  {
    id: "ddftz-hub",
    type: "feature-split",
    section: "ddftz",
    panelTextScale: 1.18,
    title: "Dire Dawa Free Trade Zone — Our Strategic Hub",
    image: "/ddftz/ddftz-gateway-overview.png",
    features: [
      {
        title: "Warehouse Facility",
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
    captionTextScale: 1.2,
    title: "Warehouse Facilities",
    subtitle: "Modern warehouses constructed inside Dire Dawa Free Trade Zone",
    images: [
      {
        src: "/ddftz/ddftz-warehouse-exterior-yard.png",
        caption: "Warehouse exterior — storage buildings",
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
    captionTextScale: 1.2,
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
        caption: "Warehouse loading forklift operations",
        objectPosition: "center center",
        static: true,
      },
    ],
  },
  {
    id: "ddftz-ops",
    type: "photo-grid",
    section: "ddftz",
    largePhotos: true,
    staticPhotos: true,
    threeCols: true,
    captionTextScale: 1.2,
    title: "Operations & Logistics at DDFTZ",
    subtitle: "Container handling and warehouse loading operations at DDFTZ",
    images: [
      {
        src: "/ddftz/ddftz-reachstacker-container.png",
        caption: "Reach stacker — Ethiopian Shipping Lines container handling",
        objectPosition: "center center",
      },
      {
        src: "/ddftz/ddftz-forklift-container.png",
        caption: "Forklift container loading operations",
        objectPosition: "center center",
      },
      {
        src: "/ddftz/ddftz-reachstacker-msc-lift.png",
        caption: "Reach stacker — MSC container lift operations",
        objectPosition: "center 35%",
      },
    ],
  },
  {
    id: "portfolio-industries",
    type: "application-categories-4x4",
    section: "products",
    title: "Applications for Raw Materials We Supply",
    background: "/ddftz/granules-bg.png",
    categories: [
      {
        heading: "HDPE",
        items: [
          {
            title: "Jerry Cans",
            detail: "Durable liquid storage containers",
            image: "/products/HDPE.png",
          },
          {
            title: "Drums",
            detail: "Heavy-duty bulk storage drums",
            image: "/products/storagedrums.png",
          },
          {
            title: "Crates",
            detail: "Stackable transport and handling crates",
            image: "/products/molding.png",
          },
          {
            title: "Shampoo Bottles",
            detail: "Personal care bottle packaging",
            image: "/products/shampoo.png",
          },
        ],
      },
      {
        heading: "PP",
        items: [
          {
            title: "Chairs",
            detail: "Moulded seating for home and office",
            image: "/presentation/plastic-chairs.png",
          },
          {
            title: "PP Woven Sacks",
            detail: "Strong sacks for grains and cement",
            image: "/products/PP.png",
          },
          {
            title: "PP Non-Woven Sacks",
            detail: "Lightweight reusable carry bags",
            image: "/products/nonwoven.png",
          },
          {
            title: "Buckets",
            detail: "Injection moulded utility buckets",
            image: "/products/Buckets.png",
          },
        ],
      },
      {
        heading: "LDPE / LLDPE / Exceed",
        items: [
          {
            title: "Blown Films",
            detail: "Film wraps for multipack products",
            image: "/products/ldpe.png",
          },
          {
            title: "Milk Pouch",
            detail: "Flexible dairy packaging pouches",
            image: "/products/Milk.png",
          },
          {
            title: "Ziplock Bags",
            detail: "Resealable storage bag applications",
            image: "/products/Ziplock.png",
          },
          {
            title: "Shrink Pacs",
            detail: "Shrink film wraps for multipack products",
            image: "/products/shrinkpacks.png",
          },
        ],
      },
      {
        heading: "PET",
        items: [
          {
            title: "Water Bottle",
            detail: "Food-grade beverage bottle packaging",
            image: "/products/bottles.png",
          },
          {
            title: "Water Jar",
            detail: "Large-capacity drinking water jars",
            image: "/products/waterjar.png",
          },
          {
            title: "Honey Jar",
            detail: "Clear packaging jars for viscous foods",
            image: "/products/honeyjar.png",
          },
          {
            title: "Hand Sanitizer",
            detail: "Hygiene product bottle containers",
            image: "/products/sanitizer.png",
          },
        ],
      },
    ],
  },
  {
    id: "eva-compound",
    type: "feature-split",
    section: "products",
    panelTextScale: 1.18,
    title: "We Produce: EVA Compounds",
    images: [
      {
        src: "/products/eva1.png",
        caption: "EVA compound material",
        objectPosition: "center center",
      },
      {
        src: "/products/eva2.png",
        caption: "EVA compound granules",
        objectPosition: "center center",
      },
      {
        src: "/vina-3.png",
        caption: "EVA footwear — injection moulded sandals",
        objectPosition: "center center",
      },
      {
        src: "/products/crocs.png",
        caption: "EVA footwear — moulded clogs and slippers",
        objectPosition: "center center",
      },
    ],
    features: [
      {
        title: "Footwear Industry Focus",
        detail:
          "High-quality foamed injection-moulded slippers, sandals, midsoles, boots, and footwear components across Ethiopia.",
      },
      {
        title: "Expandable & Cross-Linkable",
        detail:
          "Modified with rubber, thermoplastic elastomers, and impact modifiers for enhanced mechanical and processing qualities.",
      },
      {
        title: "Premium Raw Materials",
        detail:
          "Internationally sourced inputs from well-known suppliers to ensure the highest quality standards.",
      },
      {
        title: "Custom Grades & Support",
        detail:
          "Tailored formulations and technical support so customers achieve the best results from our compounds.",
      },
      {
        title: "Beyond Footwear",
        detail:
          "Also suitable for automobile components, toys, foam products, and specialty industrial applications.",
      },
    ],
  },
  {
    id: "pvc-compound",
    type: "feature-split",
    section: "products",
    panelTextScale: 1.18,
    title: "We Produce: PVC Compounds",
    pentImageFit: true,
    images: [
      {
        src: "/products/transparent-pvc-granules.png",
        caption: "Transparent PVC granules",
        objectPosition: "center center",
      },
      {
        src: "/products/blue-pvc-granules.png",
        caption: "Blue PVC granules",
        objectPosition: "center center",
      },
      {
        src: "/pvc-2.png",
        caption: "PVC boots and footwear",
        objectPosition: "center center",
      },
      {
        src: "/products/pvccables.png",
        caption: "PVC cable insulation",
        objectPosition: "center center",
      },
      {
        src: "/products/hose.png",
        caption: "PVC hoses and seals",
        objectPosition: "center center",
      },
    ],
    features: [
      {
        title: "Injection & Extrusion Grades",
        detail:
          "High-quality PVC compounds for injection and extrusion applications.",
      },
      {
        title: "Footwear and Soles",
        detail: "Compounds for moulded footwear and sole production.",
      },
      {
        title: "Cables and Pipes",
        detail: "Materials for cable insulation and pipe extrusion.",
      },
      {
        title: "Seals and Hoses",
        detail: "Flexible PVC grades for seals, gaskets, and hoses.",
      },
      {
        title: "Automotive Parts",
        detail: "Durable compounds for interior and under-hood components.",
      },
      {
        title: "Decorative Products",
        detail: "Surface-finish grades for profiles and decorative mouldings.",
      },
    ],
  },
  {
    id: "rubber-compound",
    type: "feature-split",
    section: "products",
    panelTextScale: 1.18,
    title: "We Produce: Rubber Compound | Endure | TPR Compounds",
    image: "/products/rubbercompound.png",
    features: [
      {
        title: "Industrial & Specialty Grades",
        detail:
          "Durable rubber compounds for industrial and sensitive applications.",
      },
      {
        title: "Automotive Parts",
        detail: "Compounds for vibration control and under-body components.",
      },
      {
        title: "Engine Mounts",
        detail: "High-performance grades for load-bearing mount applications.",
      },
      {
        title: "Seals and Closures",
        detail: "Reliable sealing compounds for closures and gaskets.",
      },
      {
        title: "Rubber Sheets and Mats",
        detail: "Formulations for sheet goods and industrial matting.",
      },
      {
        title: "Construction Seals and Strips",
        detail: "Weather-resistant compounds for building seal systems.",
      },
      {
        title: "Shoe Soles",
        detail: "Rubber compounds for footwear sole manufacturing.",
      },
    ],
  },
  {
    id: "filler-masterbatch",
    type: "feature-split",
    section: "products",
    panelTextScale: 1.18,
    title: "We Produce: Filler Masterbatches",
    quadImageFit: true,
    images: [
      {
        src: "/presentation/plastic-chair-green.png",
        caption: "Injection furniture products",
        objectPosition: "center center",
      },
      {
        src: "/products/PP.png",
        caption: "PP strips and woven sacks",
        objectPosition: "center center",
      },
      {
        src: "/products/filler.png",
        caption: "Blown film extrusion",
        objectPosition: "center center",
      },
      {
        src: "/products/whitegranules.png",
        caption: "Filler masterbatch granules",
        objectPosition: "center center",
      },
    ],
    features: [
      {
        title: "Cost-Effective Formulations",
        detail:
          "Quality filler masterbatches for packaging, furniture, and pipe industries.",
      },
      {
        title: "PP Strips",
        detail: "Filler concentrates for polypropylene strip extrusion.",
      },
      {
        title: "HDPE Pipes",
        detail: "Masterbatches for HDPE pipe and conduit production.",
      },
      {
        title: "Injection Furniture Products",
        detail: "Fillers for moulded furniture and household items.",
      },
      {
        title: "Blown Film Extrusion",
        detail: "Grades for film lines requiring balanced processability.",
      },
      {
        title: "PP Woven Sacks",
        detail: "Filler systems for woven sack and packaging applications.",
      },
      {
        title: "Household Products",
        detail: "Compounds for everyday plastic household goods.",
      },
    ],
  },
  {
    id: "masterbatch",
    type: "masterbatch-colors",
    section: "products",
    title: "We Produce: Color Masterbatches",
    subtitle: "A variety of colors, options, and shades are available.",
    images: [
      {
        src: "/ddftz/granules-1.png",
        alt: "Color masterbatch granules",
      },
      {
        src: "/products/colorful-display.png",
        alt: "Color masterbatch display",
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
