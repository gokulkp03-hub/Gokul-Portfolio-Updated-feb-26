import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  {
    path: '/',
    title: 'Gokul KP — Performance Marketer & Video Producer | Dubai, UAE',
    description: 'Gokul KP combines Meta Ads, WhatsApp lead generation, and performance creative to help UAE and GCC brands turn paid traffic into measurable growth.'
  },
  {
    path: '/marketing',
    title: 'Performance Marketing & Meta Ads in Dubai | Gokul KP',
    description: 'Full-funnel Meta Ads, WhatsApp lead generation, creative testing, and conversion-focused campaign management for UAE and GCC brands.'
  },
  {
    path: '/about',
    title: 'About Gokul KP | Dubai Performance Marketer & Creative Director',
    description: 'Meet Gokul KP, a Dubai-based performance marketer and creative director with experience across Meta Ads, WhatsApp funnels, video, and GCC brands.'
  },
  {
    path: '/results',
    title: 'Performance Marketing Case Studies & Results | Gokul KP',
    description: 'Review selected UAE and GCC campaign results across Meta Ads, WhatsApp lead generation, local SEO, e-commerce, and creative production.'
  },
  {
    path: '/services',
    title: 'Performance Marketing, Video & Creative Services | Gokul KP',
    description: 'Explore Gokul KP’s performance marketing, paid-social creative, video production, photography, and growth-retainer services for UAE and GCC brands.'
  },
  {
    path: '/contact',
    title: 'Contact a Dubai Performance Marketer | Gokul KP',
    description: 'Tell Gokul KP about your growth goal, campaign, or creative project. Contact by form, email, or WhatsApp for UAE, GCC, and remote work.'
  },
  {
    path: '/portfolio',
    title: 'Creative Portfolio & Archive | Gokul KP',
    description: 'Browse Gokul KP\'s commercial creative portfolio including performance ads, cinematic video projects, luxury photography, and B2C campaigns.'
  },
  {
    path: '/portfolio/video',
    title: 'Commercial Video Production in Dubai | Gokul KP',
    description: 'Cinematic brand films, high-retention social media reels, and commercial video production for UAE brands.'
  },
  {
    path: '/portfolio/photo',
    title: 'Product & Brand Photography in Dubai | Gokul KP',
    description: 'High-end food photography, commercial product shots, and brand visual systems in Dubai and UAE.'
  },
  {
    path: '/video',
    title: 'Commercial Video Production in Dubai | Gokul KP',
    description: 'Cinematic brand films, high-retention social media reels, and commercial video production for UAE brands.'
  },
  {
    path: '/photo',
    title: 'Product & Brand Photography in Dubai | Gokul KP',
    description: 'High-end food photography, commercial product shots, and brand visual systems in Dubai and UAE.'
  },
  {
    path: '/blogs',
    title: 'Performance Marketing & Growth Insights | Gokul KP',
    description: 'Insights, case studies, and strategies on performance marketing, video production, and scaling brands in the GCC.'
  },
  {
    path: '/privacy',
    title: 'Privacy Policy & Technical Disclosures | Gokul KP',
    description: 'Technical privacy disclosures, data collection practices, Google Consent Mode architecture, and cookie management for gokulkp.com.'
  },
  {
    path: '/marketing/aqua-care-uae',
    title: 'AquaCare Meta Ads Case Study | Performance Marketing — Gokul KP',
    description: 'Meta Ads performance marketing case study for AquaCare UAE, covering campaign strategy, creative testing, audience testing, lead generation and messaging acquisition across 25 campaigns.'
  },
  {
    path: '/marketing/prepmeal',
    title: 'PrepMeal UAE WhatsApp Lead Generation Case Study',
    description: 'A UAE meal-prep case study covering Meta Ads, WhatsApp lead generation, creative production, spend, impressions, and campaign learning.'
  },
  {
    path: '/marketing/prepmeal-launch',
    title: 'PrepMeal UAE WhatsApp Lead Generation Case Study',
    description: 'A UAE meal-prep case study covering Meta Ads, WhatsApp lead generation, creative production, spend, impressions, and campaign learning.'
  },
  {
    path: '/marketing/steaburg-local-seo',
    title: 'Steaburg Sharjah Local SEO Case Study | Gokul KP',
    description: 'How Google Business Profile optimization and a review system supported stronger local visibility and phone-call growth for Steaburg.'
  }
];

const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  console.error("dist directory not found, please build the project first.");
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
let template = fs.readFileSync(templatePath, 'utf-8');

// Remove injected analytics placeholder if present
template = template.replace(/<script[^>]*%VITE_ANALYTICS_ENDPOINT%[^>]*><\/script>/, '');

routes.forEach(route => {
  let html = template;
  
  // Replace Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
  html = html.replace(/<meta name="title" content=".*?"\s*\/>/, `<meta name="title" content="${route.title}" />`);
  html = html.replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${route.title}" />`);
  html = html.replace(/<meta property="twitter:title" content=".*?"\s*\/>/, `<meta property="twitter:title" content="${route.title}" />`);
  
  // Replace Description
  html = html.replace(/<meta name="description"\s*content=".*?"\s*\/>/s, `<meta name="description" content="${route.description}" />`);
  html = html.replace(/<meta property="og:description"\s*content=".*?"\s*\/>/s, `<meta property="og:description" content="${route.description}" />`);
  html = html.replace(/<meta property="twitter:description"\s*content=".*?"\s*\/>/s, `<meta property="twitter:description" content="${route.description}" />`);
  
  // Inject exactly ONE Canonical link
  const canonicalUrl = `https://www.gokulkp.com${route.path === '/' ? '' : route.path}`;
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical"[^>]*\/?>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  } else {
    html = html.replace(/<\/head>/, `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }
  
  html = html.replace(/<meta property="og:url" content=".*?"\s*\/>/, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta property="twitter:url" content=".*?"\s*\/>/, `<meta property="twitter:url" content="${canonicalUrl}" />`);
  
  const routePath = route.path === '/' ? 'index.html' : `${route.path.slice(1)}/index.html`;
  const fullPath = path.join(distDir, routePath);
  
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, html);
  console.log(`Prerendered ${route.path}`);
});
