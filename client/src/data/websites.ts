/**
 * Websites built and shipped. Shown on the home page ("Websites") and linked
 * to the live site. Screenshots live in /assets/images/websites; after adding
 * one, run `pnpm images` so it gets responsive sizes.
 */
export interface Website {
  name: string;
  url: string;
  industry: string;
  location: string;
  summary: string;
  highlights: string[];
  desktopShot: string;
  mobileShot?: string;
  /** "soon" = built but not live yet: shown with a "Launching soon" badge and no outbound link. */
  status?: "live" | "soon";
}

// To add Melborine & Gold before launch: save screenshots as
// /assets/images/websites/melborine-desktop.webp (1440x900 view) and
// melborine-mobile.webp, then add an entry here with status: "soon".
export const websites: Website[] = [
  {
    name: "Joyce J Charuvila & Associates",
    url: "https://www.cajoyce.com",
    industry: "Chartered Accountants",
    location: "Kerala, India & UAE",
    summary:
      "Website for a chartered-accountancy firm serving clients in India and the UAE: services split by country, an insights section, and WhatsApp consultation built into every page.",
    highlights: ["India & UAE service pages", "WhatsApp consultation CTA", "Local SEO for Pathanamthitta"],
    desktopShot: "/assets/images/websites/cajoyce-desktop.webp",
    mobileShot: "/assets/images/websites/cajoyce-mobile.webp",
  },
];

/** Recent creative for the scrolling strip under the home hero. */
export const creativeStrip: { src: string; alt: string }[][] = [
  [
    { src: "/assets/images/brands/Acero/Ad 01.webp", alt: "Acero steel doors ad creative" },
    { src: "/assets/images/brands/Beyond-Cars/Porsche 718 Cayman.webp", alt: "Beyond Cars Porsche 718 Cayman listing creative" },
    { src: "/assets/images/brands/Galaxy-Star/Galaxy 1.webp", alt: "Galaxy Star perfume ad, Where Nature Breathes Luxury" },
    { src: "/assets/images/brands/Food-Photography/Iced V60.webp", alt: "Iced V60 coffee product photo" },
    { src: "/assets/images/brands/Suncore/AD 2 - suncore.webp", alt: "Suncore solar energy ad creative" },
    { src: "/assets/images/portfolio-all/acero_warrior.webp", alt: "Acero Warriors campaign creative" },
    { src: "/assets/images/case-studies/steaburg/Steaburg.webp", alt: "Steaburg burgers on the grill" },
    { src: "/assets/images/brands/Knk/Artboard 1 copy 2.webp", alt: "KNK residential construction ad" },
  ],
  [
    { src: "/assets/images/brands/Food-Photography/Cheesecake.webp", alt: "Cheesecake food photography" },
    { src: "/assets/images/brands/Beyond-Cars/range rover-1.webp", alt: "Beyond Cars Range Rover Sport listing creative" },
    { src: "/assets/images/portfolio-all/Xmas_-_Galaxy.webp", alt: "Galaxy Star Christmas gift ad" },
    { src: "/assets/images/brands/Q4/Ad 9.webp", alt: "Q4 Clean Home product ad" },
    { src: "/assets/images/portfolio-all/Chocolate_Milk_Cookies.webp", alt: "Cookies under a glass cloche, food photography" },
    { src: "/assets/images/portfolio-all/jagp10.webp", alt: "Jaguar rear three-quarter car shot" },
    { src: "/assets/images/portfolio-all/xmas_2_tess.webp", alt: "TESS security camera Christmas ad" },
    { src: "/assets/images/portfolio-all/ginger_shot.webp", alt: "Ginger shot bottle product photo" },
  ],
];
