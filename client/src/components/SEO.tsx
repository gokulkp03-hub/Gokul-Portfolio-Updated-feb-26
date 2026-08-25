import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEO({ 
  title, 
  description, 
  keywords, 
  image, 
  url 
}: SEOProps) {
  const defaultTitle = "Gokul KP — Performance Marketer & Video Producer | Dubai, UAE";
  const defaultDescription = "Performance Marketer and Video Producer in Dubai, UAE. Scaled GCC brands with 7,300+ WhatsApp leads, AED 166K+ managed spend, and up to 4.45x ROAS.";
  const defaultKeywords = "Gokul, Gokul Dubai, Gokul kp, best digital marketer in dubai, Video editor in dubai, Videographer, Videographer in uae, Performance Marketer Dubai, Performance Marketer UAE, Digital Marketer Dubai, Meta Ads Specialist UAE, B2C Lead Generation UAE, B2B Lead Generation Dubai, WhatsApp Automation GCC, Video Production Dubai, Growth Strategist Dubai";
  const defaultImage = "https://www.gokulkp.com/assets/images/profile/gokul-kp-performance-marketer-dubai.webp";
  const baseUrl = "https://www.gokulkp.com";

  const metaTitle = title ? `${title} | Gokul KP` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaImage = image || defaultImage;
  const metaUrl = url ? `${baseUrl}${url}` : baseUrl;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={metaUrl} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />
    </Helmet>
  );
}
