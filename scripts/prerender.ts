/**
 * Build step: writes one HTML file per public route with its own <head> tags
 * and a crawler-readable body (title, intro, key links), so crawlers and link
 * previews that don't run JavaScript see distinct pages instead of 16 copies
 * of the home page. React replaces the body when it boots.
 *
 * Also writes:
 * - dist/shell.html — untouched template used by api/seo-injector for dynamic routes.
 * - dist/404.html   — served by Vercel with HTTP 404 for unknown URLs.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { applyMeta, escapeHtml, NOT_FOUND_META } from "../server/_core/pageMeta";

type Link = [href: string, label: string];
type Route = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro?: string;
  links?: Link[];
  noindex?: boolean;
};

const MAIN_LINKS: Link[] = [
  ["/marketing", "Performance Marketing"],
  ["/video", "Video Production"],
  ["/photo", "Photography"],
  ["/results", "Case Studies"],
  ["/services", "Services"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

const CASE_STUDY_LINKS: Link[] = [
  ["/marketing/aqua-care-uae", "Aqua Care UAE — Meta Ads case study"],
  ["/marketing/prepmeal", "PrepMeal UAE — WhatsApp lead generation case study"],
  ["/marketing/steaburg-local-seo", "Steaburg Sharjah — Local SEO case study"],
  ["/marketing/aureum-asset-management", "Aureum Asset Management — B2B acquisition case study"],
];

const routes: Route[] = [
  {
    path: "/",
    title: "Gokul KP — Performance Marketer & Video Producer | Dubai, UAE",
    description:
      "Gokul KP combines Meta Ads, WhatsApp lead generation, and performance creative to help UAE and GCC brands turn paid traffic into measurable growth.",
    h1: "Gokul KP — Performance Marketer & Video Producer in Dubai, UAE",
    intro:
      "Performance-driven marketing campaigns, commercial video production, and Meta ad creatives for GCC brands. AED 166,000+ in managed Meta spend, 8,400+ WhatsApp conversations across UAE & Oman campaigns, and a best documented ROAS of 4.45x.",
    links: [...MAIN_LINKS, ...CASE_STUDY_LINKS],
  },
  {
    path: "/marketing",
    title: "Performance Marketing & Meta Ads in Dubai | Gokul KP",
    description:
      "Full-funnel Meta Ads, WhatsApp lead generation, creative testing, and conversion-focused campaign management for UAE and GCC brands.",
    h1: "Performance Marketing & Meta Ads",
    links: CASE_STUDY_LINKS,
  },
  {
    path: "/about",
    title: "About Gokul KP | Dubai Performance Marketer & Creative Director",
    description:
      "Meet Gokul KP, a Dubai-based performance marketer and creative director with experience across Meta Ads, WhatsApp funnels, video, and GCC brands.",
    h1: "About Gokul KP",
  },
  {
    path: "/results",
    title: "Performance Marketing Case Studies & Results | Gokul KP",
    description:
      "Review selected UAE and GCC campaign results across Meta Ads, WhatsApp lead generation, local SEO, e-commerce, and creative production.",
    h1: "Case Studies & Results",
    links: CASE_STUDY_LINKS,
  },
  {
    path: "/services",
    title: "Performance Marketing, Video & Creative Services | Gokul KP",
    description:
      "Explore Gokul KP’s performance marketing, paid-social creative, video production, photography, and growth-retainer services for UAE and GCC brands.",
    h1: "Services",
  },
  {
    path: "/contact",
    title: "Contact a Dubai Performance Marketer | Gokul KP",
    description:
      "Tell Gokul KP about your growth goal, campaign, or creative project. Contact by form, email, or WhatsApp for UAE, GCC, and remote work.",
    h1: "Contact Gokul KP",
  },
  {
    path: "/portfolio",
    title: "Creative Portfolio & Archive | Gokul KP",
    description:
      "Browse Gokul KP's commercial creative portfolio including performance ads, cinematic video projects, luxury photography, and B2C campaigns.",
    h1: "Creative Portfolio",
  },
  {
    path: "/video",
    title: "Commercial Video Production in Dubai | Gokul KP",
    description: "Cinematic brand films, high-retention social media reels, and commercial video production for UAE brands.",
    h1: "Commercial Video Production",
  },
  {
    path: "/photo",
    title: "Product & Brand Photography in Dubai | Gokul KP",
    description: "High-end food photography, commercial product shots, and brand visual systems in Dubai and UAE.",
    h1: "Product & Brand Photography",
  },
  {
    path: "/blogs",
    title: "Performance Marketing & Growth Insights | Gokul KP",
    description:
      "Insights, case studies, and strategies on performance marketing, video production, and scaling brands in the GCC.",
    h1: "Growth Insights",
    noindex: true,
  },
  {
    path: "/privacy",
    title: "Privacy Policy & Technical Disclosures | Gokul KP",
    description:
      "Technical privacy disclosures, data collection practices, Google Consent Mode architecture, and cookie management for gokulkp.com.",
    h1: "Privacy Policy",
  },
  {
    path: "/marketing/aqua-care-uae",
    title: "AquaCare Meta Ads Case Study | Performance Marketing — Gokul KP",
    description:
      "Meta Ads performance marketing case study for AquaCare UAE, covering campaign strategy, creative testing, audience testing, lead generation and messaging acquisition across 25 campaigns.",
    h1: "Aqua Care UAE: Multi-Product Meta Ads & Lead System",
    intro: "25 campaigns, 2,357 messaging conversations and 212 Meta leads across Aqua Care's water-filtration product line.",
  },
  {
    path: "/marketing/prepmeal",
    title: "PrepMeal UAE WhatsApp Lead Generation Case Study",
    description:
      "A UAE meal-prep case study covering Meta Ads, WhatsApp lead generation, creative production, AED 150K+ spend, 6,133 messaging conversations and campaign learnings.",
    h1: "PrepMeal: Performance Marketing & Scale",
  },
  {
    path: "/marketing/steaburg-local-seo",
    title: "Steaburg Sharjah Local SEO Case Study | Gokul KP",
    description:
      "How Google Business Profile optimization and a review system supported stronger local visibility and phone-call growth for Steaburg.",
    h1: "Steaburg Sharjah: Local SEO",
  },
  {
    path: "/marketing/aureum-asset-management",
    title: "Aureum Asset Management B2B Acquisition Case Study | Gokul KP",
    description:
      "Institutional B2B paid media strategy and lead acquisition system for built-to-suit logistics parks and industrial facilities in Dubai & Abu Dhabi.",
    h1: "Aureum Asset Management: B2B Paid Media & Lead Generation",
  },
];

function bodyFor(route: Route): string {
  const nav = MAIN_LINKS.map(([href, label]) => `<a href="${href}">${escapeHtml(label)}</a>`).join(" ");
  const links = (route.links ?? [])
    .filter(([href]) => href !== route.path)
    .map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`)
    .join("");
  return [
    `<header><nav><a href="/">Gokul KP</a> ${nav}</nav></header>`,
    "<main>",
    `<h1>${escapeHtml(route.h1)}</h1>`,
    `<p>${escapeHtml(route.intro ?? route.description)}</p>`,
    links ? `<ul>${links}</ul>` : "",
    "</main>",
  ].join("");
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const templatePath = path.join(distDir, "index.html");
if (!fs.existsSync(templatePath)) {
  console.error("dist/index.html not found, please build the project first.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf-8");
if (!template.includes("<!--fallback:start-->")) {
  console.error("index.html is missing the <!--fallback:start--> marker; refusing to prerender.");
  process.exit(1);
}

// The shell is also what /admin serves, so keep it out of search results.
fs.writeFileSync(
  path.join(distDir, "shell.html"),
  template.replace("</head>", () => '  <meta name="robots" content="noindex, nofollow" data-static-seo />\n</head>')
);
fs.writeFileSync(
  path.join(distDir, "404.html"),
  applyMeta(template, "/404", {
    ...NOT_FOUND_META,
    bodyHtml: `<main><h1>Page not found</h1><p>${escapeHtml(NOT_FOUND_META.description)}</p><p><a href="/">Go to the home page</a></p></main>`,
  })
);

for (const route of routes) {
  const html = applyMeta(template, route.path, {
    title: route.title,
    description: route.description,
    noindex: route.noindex,
    bodyHtml: bodyFor(route),
  });
  const file = route.path === "/" ? "index.html" : `${route.path.slice(1)}/index.html`;
  const fullPath = path.join(distDir, file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, html);
  console.log(`Prerendered ${route.path}`);
}
