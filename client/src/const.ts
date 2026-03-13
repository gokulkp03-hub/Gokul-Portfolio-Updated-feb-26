export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = "Gokul KP - Portfolio";

export const APP_LOGO = "/gokul-logo.png";

// Portfolio owner information
export const OWNER_NAME = "Gokul KP";
export const OWNER_HEADLINE = "Digital Marketer & Motion-Graphics Creator";
export const OWNER_TAGLINE = "I help UAE-based brands grow using high-converting content, scroll-stopping videos, and data-driven Meta Ads";
export const OWNER_INSTAGRAM = "https://www.instagram.com/__agotime";
export const OWNER_LINKEDIN = "https://www.linkedin.com/in/gokul-kp03";
export const OWNER_EMAIL = "gokulkp03@gmail.com";
export const OWNER_PHONE = "+971545264632";
export const OWNER_LOCATION = "Deira, Dubai";
export const OWNER_BEHANCE = "https://www.behance.net/gallery/223042577/Gokul-Portfolio";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const backendUrl = import.meta.env.VITE_API_URL || window.location.origin;
  const redirectUri = `${backendUrl}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};

// Portfolio sections
export const PORTFOLIO_SECTIONS = {
  VIDEO: "video-editing",
  GRAPHIC: "graphic-design",
  MARKETING: "marketing-growth",
};

// Video categories with professional names
export const VIDEO_CATEGORIES = [
  { id: "ads", label: "Commercial Ads", description: "High-impact promotional videos" },
  { id: "motion", label: "Motion Graphics", description: "Dynamic animated content" },
  { id: "inauguration", label: "Event Coverage", description: "Professional event documentation" },
  { id: "reels", label: "Social Media Reels", description: "Short-form viral content" },
  { id: "branding", label: "Brand Videos", description: "Storytelling & brand narratives" },
];

// Graphic design categories
export const GRAPHIC_CATEGORIES = [
  { id: "social", label: "Social Media Graphics", description: "Posts, stories, and covers" },
  { id: "branding", label: "Brand Identity", description: "Logos, guidelines, and assets" },
  { id: "photoshoot", label: "Photography", description: "Professional photo editing" },
  { id: "product", label: "Product Design", description: "Packaging and product visuals" },
];

// Services with detailed descriptions
export const SERVICES = [
  {
    id: "video-production",
    title: "Video Production & Editing",
    description: "Professional video creation from concept to final delivery",
    features: [
      "4K/8K video editing",
      "Color grading & correction",
      "Motion graphics & VFX",
      "Sound design & mixing",
      "Multi-camera editing",
      "Fast turnaround time"
    ],
    price: "Starting from AED 2,500"
  },
  {
    id: "graphic-design",
    title: "Graphic Design Services",
    description: "Custom design solutions for all your branding needs",
    features: [
      "Logo & brand identity",
      "Social media templates",
      "Print materials",
      "Web design assets",
      "Packaging design",
      "Unlimited revisions"
    ],
    price: "Starting from AED 1,500"
  },
  {
    id: "social-marketing",
    title: "Social Media Marketing",
    description: "Data-driven strategies to grow your brand online",
    features: [
      "Content calendar planning",
      "Paid ad management",
      "Community engagement",
      "Analytics & reporting",
      "Influencer outreach",
      "Lead generation"
    ],
    price: "Starting from AED 3,000/month"
  }
];

// Case studies/projects
export const CASE_STUDIES = [
  {
    id: 1,
    title: "E-commerce Brand Growth Campaign",
    category: "Social Marketing",
    client: "Fashion Retail Brand",
    results: {
      reach: "2.5M",
      engagement: "12.5%",
      sales: "+340%",
      roi: "4.5x"
    },
    description: "Problem: Struggling with low brand awareness and stagnant sales. Solution: Developed comprehensive social media strategy with targeted paid ads and engaging content. Result: 340% sales growth and 2.5M reach in 6 months.",
    services: ["Content Creation", "Paid Ads", "Community Management"]
  },
  {
    id: 2,
    title: "Corporate Video Series",
    category: "Video Production",
    client: "Tech Startup",
    results: {
      views: "850K",
      engagement: "8.2%",
      conversions: "2,340",
      roi: "3.8x"
    },
    description: "Problem: Need for professional video content to establish thought leadership. Solution: Created high-quality corporate video series with motion graphics and professional editing. Result: 850K views, 2,340 conversions, and 3.8x ROI.",
    services: ["Video Editing", "Motion Graphics", "Color Grading"]
  },
  {
    id: 3,
    title: "Brand Identity Redesign",
    category: "Graphic Design",
    client: "Luxury Restaurant",
    results: {
      recognition: "89%",
      engagement: "+156%",
      followers: "+45K",
      roi: "2.9x"
    },
    description: "Problem: Outdated brand identity not reflecting premium positioning. Solution: Complete brand overhaul with new logo, guidelines, and marketing materials. Result: 89% brand recognition increase, 156% engagement boost, and 45K new followers.",
    services: ["Logo Design", "Brand Guidelines", "Marketing Materials"]
  }
];

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Ahmed Al Mansouri",
    company: "Mansouri Trading LLC",
    role: "Marketing Director",
    content: "Gokul transformed our social media presence completely. His strategic approach and creative execution resulted in 340% sales growth in just 6 months.",
    rating: 5
  },
  {
    id: 2,
    name: "Fatima Al Zahra",
    company: "Luxury Goods Co.",
    role: "Brand Manager",
    content: "The video content Gokul created for our brand was exceptional. Professional, creative, and perfectly aligned with our vision. Highly recommended!",
    rating: 5
  },
  {
    id: 3,
    name: "Mohammed Hassan",
    company: "Tech Innovation Hub",
    role: "CEO",
    content: "Working with Gokul was a game-changer. His expertise in both creative design and data-driven marketing is rare. Outstanding results!",
    rating: 5
  }
];

// Statistics
export const STATISTICS = [
  { label: "Projects Completed", value: "150+", description: "Successful campaigns" },
  { label: "Average ROAS", value: "4.5x", description: "Return on ad spend" },
  { label: "Clients Served", value: "25+", description: "Trusted by 25+ satisfied clients" },
  { label: "Years Experience", value: "3.5+", description: "In digital marketing" }
];

// Skills & Tools
export const DESIGN_TOOLS = [
  { name: "Adobe Photoshop", category: "Design" },
  { name: "Adobe Illustrator", category: "Design" },
  { name: "Canva Pro", category: "Design" },
  { name: "Adobe Lightroom", category: "Photography" },
  { name: "Figma", category: "UI/UX" },
  { name: "Adobe XD", category: "UI/UX" }
];

export const VIDEO_TOOLS = [
  { name: "Adobe Premiere Pro", category: "Editing" },
  { name: "After Effects", category: "Motion Graphics" },
  { name: "DaVinci Resolve", category: "Color Grading" },
  { name: "CapCut Pro", category: "Mobile Editing" },
  { name: "Cinema 4D", category: "3D Animation" },
  { name: "Adobe Audition", category: "Audio" }
];

export const MARKETING_TOOLS = [
  { name: "Meta Business Suite", category: "Advertising" },
  { name: "Google Ads", category: "Advertising" },
  { name: "Google Analytics", category: "Analytics" },
  { name: "Hootsuite", category: "Social Management" },
  { name: "Canva Analytics", category: "Content Planning" },
  { name: "SEMrush", category: "SEO Tools" }
];

// FAQ
export const FAQ = [
  {
    id: 1,
    question: "What is your typical project turnaround time?",
    answer: "Turnaround time varies based on project scope. Simple graphics: 2-3 days. Video editing: 5-7 days. Social media campaigns: 2-4 weeks. Rush services available upon request."
  },
  {
    id: 2,
    question: "Do you offer unlimited revisions?",
    answer: "Yes, we offer unlimited revisions until you're completely satisfied with the final product. Your satisfaction is our priority."
  },
  {
    id: 3,
    question: "What are your payment terms?",
    answer: "We typically require 50% upfront and 50% upon completion. For ongoing services, monthly invoicing is available. Custom payment plans can be arranged."
  },
  {
    id: 4,
    question: "Can you work with my existing brand guidelines?",
    answer: "Absolutely! We can work with your existing brand guidelines or help you develop new ones. We ensure consistency across all deliverables."
  },
  {
    id: 5,
    question: "Do you provide source files?",
    answer: "Yes, all source files (PSD, AE, PRPROJ, etc.) are provided with every project for future editing and modifications."
  },
  {
    id: 6,
    question: "What's your experience with different industries?",
    answer: "We've worked across diverse industries including e-commerce, tech, real estate, F&B, fashion, and more. We adapt our approach to each industry's unique needs."
  }
];

// Navigation menu items
export const NAV_ITEMS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "services", label: "Services", href: "#services" },
  { id: "portfolio", label: "Portfolio", href: "#portfolio" },
  { id: "case-studies", label: "Case Studies", href: "#case-studies" },
  { id: "testimonials", label: "Testimonials", href: "#testimonials" },
  { id: "contact", label: "Contact", href: "#contact" }
];
