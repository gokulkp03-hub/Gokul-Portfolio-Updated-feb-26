import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  {
    path: '/',
    title: 'Gokul KP — Performance Marketer & Video Producer in Dubai, UAE',
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
    path: '/marketing/aqua-care-uae',
    title: 'Aqua Care UAE Meta Ads Case Study | 4.45x ROAS',
    description: 'How Gokul KP used a full-funnel Meta Ads system to generate AED 31,743 revenue from AED 7,131 spend for Aqua Care UAE.'
  },
  {
    path: '/marketing/prepmeal',
    title: 'PrepMeal UAE WhatsApp Lead Generation Case Study',
    description: 'A UAE meal-prep case study covering Meta Ads, WhatsApp lead generation, creative production, spend, impressions, and campaign learning.'
  },
  {
    path: '/portfolio/video',
    title: 'Commercial Video Production in Dubai | Gokul KP',
    description: 'Cinematic brand films, high-retention social media reels, and commercial video production for UAE brands.'
  },
  {
    path: '/portfolio/photo',
    title: 'Product & Brand Photography in Dubai | Gokul KP',
    description: 'High-end food photography, commercial product shots, and brand visual systems.'
  }
];

const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  console.error("dist directory not found, please build the project first.");
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
let template = fs.readFileSync(templatePath, 'utf-8');

// Remove injected analytics placeholder from vite-plugin-manus-runtime
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
  
  // Inject Canonical
  const canonicalUrl = `https://www.gokulkp.com${route.path === '/' ? '' : route.path}`;
  html = html.replace(/<\/head>/, `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  html = html.replace(/<meta property="og:url" content=".*?"\s*\/>/, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta property="twitter:url" content=".*?"\s*\/>/, `<meta property="twitter:url" content="${canonicalUrl}" />`);
  
  const routePath = route.path === '/' ? 'index.html' : `${route.path.slice(1)}/index.html`;
  const fullPath = path.join(distDir, routePath);
  
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, html);
  console.log(`Prerendered ${route.path}`);
});
