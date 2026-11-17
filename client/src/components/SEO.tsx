import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noindex?: boolean;
}

export function SEO({ 
  title, 
  description, 
  image, 
  url,
  noindex = false
}: SEOProps) {
  const defaultTitle = "Gokul KP — Performance Marketer & Video Producer | Dubai, UAE";
  const defaultDescription = "Performance Marketer and Video Producer in Dubai, UAE. Scaled GCC brands with 8,400+ WhatsApp conversations, AED 166K+ managed Meta spend, and up to 4.45x ROAS.";
  // 1200x630 JPEG: the format/size every social network previews reliably.
  const defaultImage = "https://www.gokulkp.com/assets/images/og/gokul-kp-og.jpg";
  const baseUrl = "https://www.gokulkp.com";

  let metaTitle = defaultTitle;
  if (title) {
    metaTitle = title.includes("Gokul KP") ? title : `${title} | Gokul KP`;
  }

  const metaDescription = description || defaultDescription;
  const metaImage = !image ? defaultImage : image.startsWith("http") ? image : `${baseUrl}${encodeURI(image.startsWith("/") ? image : `/${image}`)}`;
  
  let canonicalPath = "";
  if (url) {
    canonicalPath = url.startsWith("http") ? url : `${baseUrl}${url}`;
  } else if (typeof window !== "undefined") {
    const pathname = window.location.pathname;
    canonicalPath = `${baseUrl}${pathname === "/" ? "" : pathname}`;
  } else {
    canonicalPath = baseUrl;
  }

  // The prerendered HTML ships its own head tags (marked data-static-seo) for
  // crawlers that don't run JS. Helmet adds new tags rather than replacing
  // those, so remove them once React has rendered its own set.
  useEffect(() => {
    document.head.querySelectorAll("[data-static-seo]").forEach(el => el.remove());
  }, []);

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />
      <link rel="canonical" href={canonicalPath} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalPath} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalPath} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />
    </Helmet>
  );
}
