/**
 * Export web presentation slides to PowerPoint (.pptx)
 * Run: npm run export:pptx
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const PptxGenJS = require("pptxgenjs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(
  ROOT,
  "public",
  "presentation",
  "Mohan_Group_PPP_Ethiopia_2026.pptx",
);

const BG = "080600";
const PANEL = "100D00";
const GOLD = "C8A020";
const GOLD_LIGHT = "F0D060";
const PIE_COLORS = ["C8A020", "3B82F6", "F97316", "FFFFFF", "22C55E"];
const CAPTION = "CCCCCC";
const MUTED = "888888";
const FOOTER =
  "MOHAN GROUP OF COMPANIES · www.highlandershoe.com · Dire Dawa Free Trade Zone, Ethiopia";

const pub = (rel) => path.join(ROOT, "public", rel.replace(/^\//, ""));
const asset = (rel) => path.join(ROOT, rel.replace(/^@\//, "src/"));

function img(rel) {
  const p = rel.startsWith("@/") ? asset(rel) : pub(rel);
  if (!fs.existsSync(p)) {
    console.warn(`  [warn] missing image: ${p}`);
    return null;
  }
  return p;
}

function addFooter(slide) {
  slide.addShape("rect", {
    x: 0.4,
    y: 7.05,
    w: 12.5,
    h: 0.01,
    line: { color: GOLD, width: 0.5 },
    fill: { color: BG },
  });
  slide.addText(FOOTER, {
    x: 0.4,
    y: 7.1,
    w: 12.5,
    h: 0.35,
    fontSize: 8,
    color: MUTED,
    align: "center",
    fontFace: "Calibri",
  });
}

function addHeadline(slide, title, y = 0.35) {
  slide.addText(title, {
    x: 0.5,
    y,
    w: 12.3,
    h: 0.55,
    fontSize: 22,
    bold: true,
    color: GOLD,
    fontFace: "Calibri",
  });
}

function slideBg(slide) {
  slide.background = { color: BG };
}

function addTitleSlide(pptx) {
  const slide = pptx.addSlide();
  slideBg(slide);
  const texture = img("/presentation/ppt/image1.jpg");
  if (texture) {
    slide.addImage({
      path: texture,
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      sizing: { type: "cover", w: 13.333, h: 7.5 },
    });
    slide.addShape("rect", {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: BG, transparency: 55 },
    });
  }
  const logo = img("@/assets/img/slider-logo.png");
  if (logo) slide.addImage({ path: logo, x: 5.4, y: 1.2, w: 2.5, h: 1.1 });
  slide.addText("MOHAN GROUP OF COMPANIES", {
    x: 0.5,
    y: 2.6,
    w: 12.3,
    h: 0.7,
    fontSize: 32,
    bold: true,
    color: GOLD,
    align: "center",
    fontFace: "Calibri",
  });
  slide.addText("Your Premier Partner for Plastic Raw Materials in Ethiopia", {
    x: 1,
    y: 3.35,
    w: 11.3,
    h: 0.45,
    fontSize: 14,
    color: CAPTION,
    align: "center",
    fontFace: "Calibri",
  });
  slide.addShape("rect", {
    x: 5.9,
    y: 3.95,
    w: 1.5,
    h: 0.04,
    fill: { color: GOLD },
  });
  slide.addText(
    "plastprintpack Ethiopia 2026 · 25–27 June · AICC Addis Ababa",
    {
      x: 1,
      y: 4.15,
      w: 11.3,
      h: 0.4,
      fontSize: 12,
      color: GOLD_LIGHT,
      align: "center",
      fontFace: "Calibri",
    },
  );
  addFooter(slide);
}

function addStatGridSlide(pptx) {
  const slide = pptx.addSlide();
  slideBg(slide);
  addHeadline(slide, "Ethiopia — Africa's Growth Story");
  slide.addText(
    "IMF projects Ethiopia as Africa's fastest-growing economy in 2026, with a young, rapidly urbanising population driving demand across every sector.",
    {
      x: 0.5,
      y: 0.95,
      w: 12.3,
      h: 0.55,
      fontSize: 11,
      color: CAPTION,
      fontFace: "Calibri",
    },
  );
  const stats = [
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
  ];
  stats.forEach((s, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.55 + col * 4.15;
    const y = 1.75 + row * 2.1;
    slide.addShape("roundRect", {
      x,
      y,
      w: 3.85,
      h: 1.85,
      fill: { color: PANEL },
      line: { color: GOLD, width: 0.75 },
      rectRadius: 0.08,
    });
    slide.addText(s.value, {
      x,
      y: y + 0.2,
      w: 3.85,
      h: 0.55,
      fontSize: 28,
      bold: true,
      color: GOLD,
      align: "center",
      fontFace: "Calibri",
    });
    slide.addText(s.label, {
      x,
      y: y + 0.75,
      w: 3.85,
      h: 0.35,
      fontSize: 10,
      color: CAPTION,
      align: "center",
      fontFace: "Calibri",
    });
    if (s.sub)
      slide.addText(s.sub, {
        x,
        y: y + 1.1,
        w: 3.85,
        h: 0.3,
        fontSize: 8,
        color: MUTED,
        align: "center",
        fontFace: "Calibri",
      });
  });
  slide.addText(
    "Sources: IMF 2026 | United Nations | plastprintpack Ethiopia",
    {
      x: 0.5,
      y: 6.55,
      w: 12.3,
      h: 0.3,
      fontSize: 8,
      color: MUTED,
      fontFace: "Calibri",
    },
  );
  addFooter(slide);
}

function addChartKpiSlide(pptx) {
  const slide = pptx.addSlide();
  slideBg(slide);
  addHeadline(slide, "Ethiopia's Plastics Imports — 584% Growth");
  slide.addText("Source: EUROMAP 2025", {
    x: 0.5,
    y: 0.88,
    w: 4,
    h: 0.25,
    fontSize: 9,
    color: MUTED,
    fontFace: "Calibri",
  });
  const kpis = [
    { value: "584%", label: "Import Growth", sub: "2007–2024" },
    { value: "12%", label: "Avg Annual Growth Rate" },
    { value: "294 kt", label: "Raw Materials Imported (2024)" },
  ];
  kpis.forEach((k, i) => {
    const x = 0.55 + i * 2.1;
    slide.addShape("roundRect", {
      x,
      y: 1.2,
      w: 1.9,
      h: 1.1,
      fill: { color: PANEL },
      line: { color: GOLD, width: 0.5 },
      rectRadius: 0.06,
    });
    slide.addText(k.value, {
      x,
      y: 1.3,
      w: 1.9,
      h: 0.45,
      fontSize: 20,
      bold: true,
      color: GOLD,
      align: "center",
      fontFace: "Calibri",
    });
    slide.addText(k.label, {
      x,
      y: 1.75,
      w: 1.9,
      h: 0.35,
      fontSize: 8,
      color: CAPTION,
      align: "center",
      fontFace: "Calibri",
    });
    if (k.sub)
      slide.addText(k.sub, {
        x,
        y: 2.05,
        w: 1.9,
        h: 0.2,
        fontSize: 7,
        color: MUTED,
        align: "center",
        fontFace: "Calibri",
      });
  });
  slide.addChart(
    pptx.charts.LINE,
    [
      {
        name: "Imports (kt)",
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
        values: [43, 55, 70, 88, 110, 140, 175, 210, 260, 294],
      },
    ],
    {
      x: 0.5,
      y: 2.5,
      w: 12.3,
      h: 4.2,
      showLegend: false,
      chartColors: [GOLD],
      catAxisLabelColor: CAPTION,
      valAxisLabelColor: CAPTION,
      catGridLine: { style: "none" },
      valGridLine: { color: "2A2200" },
      lineDataSymbol: "circle",
      lineSize: 2,
    },
  );
  slide.addText(
    "Ethiopia is East & Central Africa's 2nd largest importer of plastics · 100% demand met through imports",
    {
      x: 0.5,
      y: 6.65,
      w: 12.3,
      h: 0.3,
      fontSize: 9,
      color: CAPTION,
      fontFace: "Calibri",
    },
  );
  addFooter(slide);
}

function addDualChartSlide(pptx) {
  const slide = pptx.addSlide();
  slideBg(slide);
  addHeadline(slide, "Consumption — Strong & Steady Growth");
  slide.addText("Source: EUROMAP 2025", {
    x: 0.5,
    y: 0.88,
    w: 4,
    h: 0.25,
    fontSize: 9,
    color: MUTED,
    fontFace: "Calibri",
  });
  slide.addChart(
    pptx.charts.BAR,
    [
      {
        name: "Total Consumption (kt)",
        labels: [
          "2007",
          "2010",
          "2013",
          "2016",
          "2019",
          "2022",
          "2024",
          "2029*",
        ],
        values: [44, 62, 87, 120, 168, 225, 281, 370],
      },
    ],
    {
      x: 0.4,
      y: 1.25,
      w: 6.1,
      h: 4.8,
      showLegend: false,
      chartColors: [GOLD, GOLD, GOLD, GOLD, GOLD, GOLD, GOLD, GOLD_LIGHT],
      catAxisLabelColor: CAPTION,
      valAxisLabelColor: CAPTION,
      barDir: "col",
    },
  );
  slide.addChart(
    pptx.charts.LINE,
    [
      {
        name: "Per Capita (kg)",
        labels: [
          "2007",
          "2010",
          "2013",
          "2016",
          "2019",
          "2022",
          "2024",
          "2029*",
        ],
        values: [0.6, 0.8, 1.1, 1.4, 1.8, 2.2, 2.6, 3.2],
      },
    ],
    {
      x: 6.7,
      y: 1.25,
      w: 6.2,
      h: 4.8,
      showLegend: false,
      chartColors: [GOLD_LIGHT],
      catAxisLabelColor: CAPTION,
      valAxisLabelColor: CAPTION,
    },
  );
  slide.addText(
    "11.5% avg annual growth · 9% per capita growth · 370 kt forecast by 2029",
    {
      x: 0.5,
      y: 6.2,
      w: 12.3,
      h: 0.3,
      fontSize: 10,
      bold: true,
      color: GOLD_LIGHT,
      fontFace: "Calibri",
    },
  );
  addFooter(slide);
}

function addDualPieSlide(pptx) {
  const slide = pptx.addSlide();
  slideBg(slide);
  addHeadline(slide, "How Ethiopia Uses Plastics — 2024");
  slide.addText("Source: EUROMAP 2025", {
    x: 0.5,
    y: 0.88,
    w: 4,
    h: 0.25,
    fontSize: 9,
    color: MUTED,
    fontFace: "Calibri",
  });
  slide.addText("By End-Use Application", {
    x: 0.6,
    y: 1.15,
    w: 5.5,
    h: 0.3,
    fontSize: 10,
    bold: true,
    color: CAPTION,
    fontFace: "Calibri",
  });
  slide.addText("By Processing Method", {
    x: 7.1,
    y: 1.15,
    w: 5.5,
    h: 0.3,
    fontSize: 10,
    bold: true,
    color: CAPTION,
    fontFace: "Calibri",
  });
  slide.addChart(
    pptx.charts.DOUGHNUT,
    [
      {
        name: "End Use",
        labels: [
          "Packaging",
          "Construction",
          "Automotive",
          "Electrical & Telecom",
          "Other",
        ],
        values: [54, 16, 6, 3, 21],
      },
    ],
    {
      x: 0.4,
      y: 1.45,
      w: 6.1,
      h: 4.5,
      showPercent: true,
      showLegend: true,
      legendPos: "b",
      chartColors: PIE_COLORS,
      dataLabelColor: "FFFFFF",
      dataLabelFontSize: 9,
    },
  );
  slide.addChart(
    pptx.charts.DOUGHNUT,
    [
      {
        name: "Processing",
        labels: [
          "Extrusion",
          "Injection Moulding",
          "PET / Stretch Blow",
          "Blow Moulding",
          "Other",
        ],
        values: [49, 24, 13, 7, 7],
      },
    ],
    {
      x: 6.8,
      y: 1.45,
      w: 6.1,
      h: 4.5,
      showPercent: true,
      showLegend: true,
      legendPos: "b",
      chartColors: PIE_COLORS,
      dataLabelColor: "FFFFFF",
      dataLabelFontSize: 9,
    },
  );
  slide.addText(
    "Packaging = 54% of all plastics consumption — driven by FMCG, beverage and agro-industry sectors",
    {
      x: 0.5,
      y: 6.55,
      w: 12.3,
      h: 0.35,
      fontSize: 9,
      color: CAPTION,
      fontFace: "Calibri",
    },
  );
  addFooter(slide);
}

function addStorySlide(pptx) {
  const slide = pptx.addSlide();
  slideBg(slide);
  addHeadline(slide, "Mohan Group — Our Story");
  const photo = img("/CEO_Mohan.jpg");
  if (photo)
    slide.addImage({
      path: photo,
      x: 0.5,
      y: 1.1,
      w: 5.5,
      h: 5.5,
      sizing: { type: "cover", w: 5.5, h: 5.5 },
    });
  slide.addShape("roundRect", {
    x: 0.5,
    y: 1.1,
    w: 5.5,
    h: 5.5,
    line: { color: GOLD, width: 1 },
    rectRadius: 0.1,
  });
  slide.addText("Mr. Mayur Kothari", {
    x: 6.3,
    y: 1.2,
    w: 6.5,
    h: 0.45,
    fontSize: 18,
    bold: true,
    color: GOLD,
    fontFace: "Calibri",
  });
  slide.addText("Founder & Chairman", {
    x: 6.3,
    y: 1.65,
    w: 6.5,
    h: 0.3,
    fontSize: 11,
    color: GOLD_LIGHT,
    fontFace: "Calibri",
  });
  slide.addText("Mohan Group of Companies", {
    x: 6.3,
    y: 1.95,
    w: 6.5,
    h: 0.3,
    fontSize: 10,
    color: MUTED,
    fontFace: "Calibri",
  });
  const paras = [
    'Founded in Addis Ababa, the Mohan Group was established in memory of the late Mr. Suryakant "Mohan" Kothari.',
    "Starting as a small trading firm, the Group has grown into Ethiopia's most trusted name in polymer raw materials, footwear, and packaging.",
    "Today, 7+ manufacturing units and a state-of-the-art Dire Dawa Free Trade Zone hub serve customers across all regions of Ethiopia.",
  ];
  slide.addText(
    paras.map((p) => ({
      text: p,
      options: { breakLine: true, paraSpaceAfter: 8 },
    })),
    {
      x: 6.3,
      y: 2.4,
      w: 6.5,
      h: 4,
      fontSize: 11,
      color: CAPTION,
      fontFace: "Calibri",
      valign: "top",
    },
  );
  addFooter(slide);
}

function addPresenceSlide(pptx) {
  const slide = pptx.addSlide();
  slideBg(slide);
  addHeadline(slide, "Our Presence in Ethiopia");
  const photo = img("@/assets/img/mohan.jpg");
  if (photo)
    slide.addImage({
      path: photo,
      x: 0.5,
      y: 1.1,
      w: 5.8,
      h: 5.5,
      sizing: { type: "cover", w: 5.8, h: 5.5 },
    });
  const stats = [
    { value: "30+", label: "Years Operating in Ethiopia" },
    { value: "7+", label: "Manufacturing Units" },
    { value: "#1", label: "Trusted Polymer Partner in Ethiopia" },
  ];
  stats.forEach((s, i) => {
    const y = 1.2 + i * 1.15;
    slide.addShape("roundRect", {
      x: 6.6,
      y,
      w: 6.2,
      h: 0.95,
      fill: { color: PANEL },
      line: { color: GOLD, width: 0.5 },
      rectRadius: 0.06,
    });
    slide.addText(s.value, {
      x: 6.7,
      y: y + 0.1,
      w: 1.5,
      h: 0.75,
      fontSize: 22,
      bold: true,
      color: GOLD,
      fontFace: "Calibri",
    });
    slide.addText(s.label, {
      x: 8.2,
      y: y + 0.25,
      w: 4.4,
      h: 0.45,
      fontSize: 11,
      color: CAPTION,
      fontFace: "Calibri",
      valign: "middle",
    });
  });
  slide.addText("Product Portfolio:", {
    x: 6.6,
    y: 4.75,
    w: 6.2,
    h: 0.3,
    fontSize: 9,
    bold: true,
    color: GOLD,
    fontFace: "Calibri",
  });
  const portfolio = [
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
  ];
  slide.addText(portfolio.join("  ·  "), {
    x: 6.6,
    y: 5.05,
    w: 6.2,
    h: 1.2,
    fontSize: 9,
    color: CAPTION,
    fontFace: "Calibri",
    valign: "top",
  });
  addFooter(slide);
}

function addFeatureSlide(pptx, title, imagePath, features) {
  const slide = pptx.addSlide();
  slideBg(slide);
  addHeadline(slide, title);
  const photo = img(imagePath);
  if (photo)
    slide.addImage({
      path: photo,
      x: 0.5,
      y: 1.05,
      w: 5.8,
      h: 5.6,
      sizing: { type: "cover", w: 5.8, h: 5.6 },
    });
  features.forEach((f, i) => {
    const y = 1.15 + i * 1.05;
    slide.addShape("rect", {
      x: 6.55,
      y,
      w: 0.06,
      h: 0.85,
      fill: { color: GOLD },
    });
    slide.addText(f.title, {
      x: 6.75,
      y,
      w: 6,
      h: 0.35,
      fontSize: 11,
      bold: true,
      color: GOLD,
      fontFace: "Calibri",
    });
    slide.addText(f.detail, {
      x: 6.75,
      y: y + 0.35,
      w: 6,
      h: 0.45,
      fontSize: 9,
      color: CAPTION,
      fontFace: "Calibri",
    });
  });
  addFooter(slide);
}

function addPhotoDuoSlide(pptx, title, subtitle, images) {
  const slide = pptx.addSlide();
  slideBg(slide);
  addHeadline(slide, title);
  if (subtitle)
    slide.addText(subtitle, {
      x: 0.5,
      y: 0.9,
      w: 12.3,
      h: 0.4,
      fontSize: 10,
      color: CAPTION,
      fontFace: "Calibri",
    });
  images.forEach((im, i) => {
    const x = 0.5 + i * 6.35;
    const p = img(im.src);
    if (p)
      slide.addImage({
        path: p,
        x,
        y: 1.4,
        w: 6.1,
        h: 4.8,
        sizing: { type: "cover", w: 6.1, h: 4.8 },
      });
    slide.addShape("roundRect", {
      x,
      y: 1.4,
      w: 6.1,
      h: 4.8,
      line: { color: GOLD, width: 0.75 },
      rectRadius: 0.08,
    });
    slide.addText(im.caption, {
      x,
      y: 6.25,
      w: 6.1,
      h: 0.45,
      fontSize: 9,
      color: CAPTION,
      align: "center",
      fontFace: "Calibri",
    });
  });
  addFooter(slide);
}

function addPortfolioIndustriesSlide(pptx) {
  const slide = pptx.addSlide();
  slideBg(slide);
  const bg = img("/ddftz/granules-bg.png");
  if (bg) {
    slide.addImage({
      path: bg,
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      sizing: { type: "cover", w: 13.333, h: 7.5 },
    });
    slide.addShape("rect", {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: BG, transparency: 35 },
    });
  }
  addHeadline(slide, "Our Plastic Raw Material Portfolio", 0.3);
  slide.addText("Plastic Raw Material Portfolio", {
    x: 0.5,
    y: 0.82,
    w: 12.3,
    h: 0.22,
    fontSize: 8,
    bold: true,
    color: GOLD,
    fontFace: "Calibri",
  });
  const resins = [
    { code: "HDPE", uses: "Drums, crates, pipes", image: "/products/HDPE.png" },
    {
      code: "LDPE",
      uses: "Films, bags, shrink wrap",
      image: "/products/ldpe.png",
    },
    { code: "LLDPE", uses: "Stretch films", image: "/products/molding.png" },
    {
      code: "PP",
      uses: "Injection moulding, fibres",
      image: "/products/PP.png",
    },
    { code: "PVC", uses: "Cables, pipes, profiles", image: "/pvc-2.png" },
    { code: "PET", uses: "Bottles, preforms", image: "/products/pet.png" },
  ];
  resins.forEach((r, i) => {
    const x = 0.4 + i * 2.12;
    const y = 1.05;
    slide.addShape("roundRect", {
      x,
      y,
      w: 2,
      h: 1.55,
      fill: { color: PANEL },
      line: { color: GOLD, width: 0.5 },
      rectRadius: 0.05,
    });
    const p = img(r.image);
    if (p)
      slide.addImage({
        path: p,
        x: x + 0.12,
        y: y + 0.08,
        w: 1.76,
        h: 0.75,
        sizing: { type: "contain", w: 1.76, h: 0.75 },
      });
    slide.addText(r.code, {
      x,
      y: y + 0.88,
      w: 2,
      h: 0.22,
      fontSize: 9,
      bold: true,
      color: GOLD,
      align: "center",
      fontFace: "Calibri",
    });
    slide.addText(r.uses, {
      x: x + 0.05,
      y: y + 1.08,
      w: 1.9,
      h: 0.4,
      fontSize: 6.5,
      color: CAPTION,
      align: "center",
      fontFace: "Calibri",
    });
  });
  slide.addText("Plastics Powering Ethiopia's Industries", {
    x: 0.5,
    y: 2.75,
    w: 12.3,
    h: 0.22,
    fontSize: 8,
    bold: true,
    color: GOLD,
    fontFace: "Calibri",
  });
  const items = [
    {
      title: "Plastic Chairs",
      detail: "Household & commercial seating",
      image: "/presentation/plastic-chairs.png",
    },
    {
      title: "Storage Drums",
      detail: "200L HDPE drums",
      image: "/products/storagedrums.png",
    },
    {
      title: "FMCG Packaging",
      detail: "Bottles, tubs & sachets",
      image: "/products/bottles.png",
    },
    {
      title: "Milk Packaging",
      detail: "HDPE / PP bottles & pouches",
      image: "/products/milkbottle.png",
    },
    {
      title: "PVC Cables",
      detail: "PVC-coated electrical cables",
      image: "/products/pvccables.png",
    },
  ];
  items.forEach((item, i) => {
    const x = 0.4 + i * 2.55;
    const y = 3.05;
    slide.addShape("roundRect", {
      x,
      y,
      w: 4,
      h: 1.2,
      fill: { color: PANEL },
      line: { color: GOLD, width: 0.5 },
      rectRadius: 0.05,
    });
    const p = img(item.image);
    if (p)
      slide.addImage({
        path: p,
        x: x + 0.1,
        y: y + 0.1,
        w: 0.55,
        h: 0.55,
        sizing: { type: "contain", w: 0.55, h: 0.55 },
      });
    slide.addText(item.title, {
      x: x + 0.75,
      y: y + 0.12,
      w: 3.1,
      h: 0.28,
      fontSize: 8,
      bold: true,
      color: GOLD,
      fontFace: "Calibri",
    });
    slide.addText(item.detail, {
      x: x + 0.75,
      y: y + 0.4,
      w: 3.1,
      h: 0.65,
      fontSize: 7,
      color: CAPTION,
      fontFace: "Calibri",
      valign: "top",
    });
  });
  slide.addText(
    "100% import-dependent · Sourced from Middle East, Asia & Europe · Supplied direct from our DDFTZ warehouse",
    {
      x: 0.5,
      y: 6.55,
      w: 12.3,
      h: 0.35,
      fontSize: 7.5,
      color: CAPTION,
      fontFace: "Calibri",
    },
  );
  addFooter(slide);
}

function addMasterbatchSlide(pptx) {
  const slide = pptx.addSlide();
  slideBg(slide);
  addHeadline(slide, "Color Masterbatches");
  slide.addText(
    "Enhancing your products with vibrant, consistent color solutions",
    {
      x: 0.5,
      y: 0.9,
      w: 12.3,
      h: 0.35,
      fontSize: 11,
      color: CAPTION,
      fontFace: "Calibri",
    },
  );
  const photo = img("/ddftz/granules-1.png");
  if (photo)
    slide.addImage({
      path: photo,
      x: 0.5,
      y: 1.35,
      w: 5.5,
      h: 5.2,
      sizing: { type: "cover", w: 5.5, h: 5.2 },
    });
  const colors = [
    { name: "YELLOW", hex: "FFC000" },
    { name: "RED", hex: "ED7D31" },
    { name: "GREEN", hex: "70AD47" },
    { name: "BLUE", hex: "4472C4" },
    { name: "WHITE", hex: "E7E6E6" },
  ];
  colors.forEach((c, i) => {
    const y = 1.5 + i * 0.95;
    slide.addShape("ellipse", {
      x: 6.5,
      y,
      w: 0.45,
      h: 0.45,
      fill: { color: c.hex },
      line: { color: CAPTION, width: 0.5 },
    });
    slide.addText(c.name, {
      x: 7.1,
      y,
      w: 5.5,
      h: 0.45,
      fontSize: 14,
      bold: true,
      color: CAPTION,
      fontFace: "Calibri",
      valign: "middle",
    });
  });
  slide.addText(
    "Also available: Black, Orange, Brown, Purple, custom shades & functional additive masterbatches",
    {
      x: 6.5,
      y: 6.2,
      w: 6.3,
      h: 0.5,
      fontSize: 9,
      color: MUTED,
      fontFace: "Calibri",
    },
  );
  addFooter(slide);
}

function addThankYouSlide(pptx) {
  const slide = pptx.addSlide();
  slideBg(slide);
  const logo = img("@/assets/img/slider-logo.png");
  if (logo) slide.addImage({ path: logo, x: 5.9, y: 0.8, w: 1.5, h: 0.7 });
  slide.addText("THANK YOU", {
    x: 0.5,
    y: 1.65,
    w: 12.3,
    h: 0.7,
    fontSize: 36,
    bold: true,
    color: GOLD,
    align: "center",
    fontFace: "Calibri",
  });
  slide.addText("Connect with us at plastprintpack Ethiopia 2026", {
    x: 0.5,
    y: 2.35,
    w: 12.3,
    h: 0.4,
    fontSize: 13,
    color: CAPTION,
    align: "center",
    fontFace: "Calibri",
  });
  slide.addShape("roundRect", {
    x: 3.2,
    y: 2.95,
    w: 6.9,
    h: 2.8,
    fill: { color: PANEL },
    line: { color: GOLD, width: 0.75 },
    rectRadius: 0.1,
  });
  const qr = img("/presentation/qr-code.png");
  if (qr)
    slide.addImage({
      path: qr,
      x: 3.5,
      y: 3.15,
      w: 1.6,
      h: 1.6,
      sizing: { type: "contain", w: 1.6, h: 1.6 },
    });
  const contacts = [
    "Website: www.highlandershoe.com",
    "Email: info@mohanplc.com",
    "Exhibition: plastprintpack Ethiopia 2026 · 25–27 June 2026",
    "Location: Dire Dawa Free Trade Zone, Ethiopia",
  ];
  slide.addText(contacts.join("\n"), {
    x: 5.3,
    y: 3.1,
    w: 4.6,
    h: 2.4,
    fontSize: 10,
    color: CAPTION,
    fontFace: "Calibri",
    valign: "middle",
  });
  slide.addText("Your Premier Partner for Plastic Raw Materials in Ethiopia", {
    x: 0.5,
    y: 6.15,
    w: 12.3,
    h: 0.35,
    fontSize: 11,
    bold: true,
    color: GOLD_LIGHT,
    align: "center",
    fontFace: "Calibri",
  });
  addFooter(slide);
}

async function main() {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Mohan Group of Companies";
  pptx.title = "Mohan Group – Ethiopia Plastics Market 2026";
  pptx.subject = "plastprintpack Ethiopia 2026";

  addTitleSlide(pptx);
  addStatGridSlide(pptx);
  addChartKpiSlide(pptx);
  addDualChartSlide(pptx);
  addDualPieSlide(pptx);
  addStorySlide(pptx);
  addPresenceSlide(pptx);
  addFeatureSlide(
    pptx,
    "Dire Dawa Free Trade Zone — Our Strategic Hub",
    "/ddftz/ddftz-gateway-overview.png",
    [
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
  );
  addPhotoDuoSlide(
    pptx,
    "Warehouse Facilities",
    "Modern warehouses constructed inside Dire Dawa Free Trade Zone",
    [
      {
        src: "/ddftz/ddftz-warehouse-exterior-yard.png",
        caption: "Warehouse exterior — storage buildings",
      },
      {
        src: "/ddftz/ddftz-warehouse-interior-stacks.png",
        caption: "High-capacity warehouse interior — palletised resin stocks",
      },
    ],
  );
  addPhotoDuoSlide(
    pptx,
    "Outdoor Storage & Yard Operations",
    "Bulk materials, resin drums and sack storage in the DDFTZ yard",
    [
      {
        src: "/ddftz/ddftz-yard-drums-mountains.png",
        caption: "Outdoor storage — resin drums & bulk sacks",
      },
      {
        src: "/ddftz/ddftz-forklift-warehouse.png",
        caption: "Warehouse loading forklift operations",
      },
    ],
  );
  addPhotoDuoSlide(
    pptx,
    "Operations & Logistics at DDFTZ",
    "Reach stackers for container placement, lifting and yard operations",
    [
      {
        src: "/ddftz/ddftz-reachstacker-eslu-ground.png",
        caption: "Reach stacker — container placement on DDFTZ yard",
      },
      {
        src: "/ddftz/ddftz-reachstacker-msc-lift.png",
        caption: "Reach stacker — MSC container lift operations",
      },
    ],
  );
  addPortfolioIndustriesSlide(pptx);
  addFeatureSlide(pptx, "EVA Compounds", "/eva-1.jpg", [
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
  ]);
  addMasterbatchSlide(pptx);
  addThankYouSlide(pptx);

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  await pptx.writeFile({ fileName: OUT });
  console.log(`\nExported ${pptx.slides.length} slides →\n  ${OUT}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
