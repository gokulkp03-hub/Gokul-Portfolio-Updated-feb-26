export interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export const setSEO = ({ title, description, image, url }: SEOProps) => {
    // Update Title
    if (title) {
        document.title = title;
    }

    // Helper to set meta tag content
    const setMeta = (selector: string, content: string) => {
        const element = document.querySelector(selector);
        if (element) {
            element.setAttribute("content", content);
        } else {
            // Create if not exists (optional, mostly for specific pages adding new tags)
            const newMeta = document.createElement("meta");
            // This is a simplified creation, assuming selector is like 'meta[name="..."]'
            // Use regex or basic parsing if dynamic creation is strictly needed.
            // For now, we update existing tags from index.html
        }
    };

    if (description) {
        setMeta('meta[name="description"]', description);
        setMeta('meta[property="og:description"]', description);
        setMeta('meta[property="twitter:description"]', description);
    }

    if (title) {
        setMeta('meta[name="title"]', title);
        setMeta('meta[property="og:title"]', title);
        setMeta('meta[property="twitter:title"]', title);
    }

    if (image) {
        setMeta('meta[property="og:image"]', image);
        setMeta('meta[property="twitter:image"]', image);
    }

    if (url) {
        setMeta('meta[property="og:url"]', url);
        setMeta('meta[property="twitter:url"]', url);
    }

    // Dynamic Canonical URL Injection
    const canonicalUrl = url || `https://www.gokulkp.com${window.location.pathname}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
};
