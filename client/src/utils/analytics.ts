/**
 * Conversion tracking through Google tag (gtag.js), which is loaded in index.html.
 *
 * - GA4 (G-JB54FDS086) receives these events directly.
 * - GTM sees the same calls in the dataLayer, so you can build triggers on the
 *   event names below without sending anything twice.
 * - Consent Mode decides whether GA4 stores cookies; events are still sent
 *   cookieless (modelled) when consent is denied.
 *
 * In GA4 → Admin → Events, mark `generate_lead` and `whatsapp_click` as key events.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type EventName =
  | 'form_start'
  | 'form_submit_success'
  | 'whatsapp_click'
  | 'email_click'
  | 'phone_click'
  | 'linkedin_click'
  | 'service_cta_click'
  | 'case_study_view';

type EventParams = Record<string, string | number | boolean>;

/** GA4 recommended names where one exists. */
const GA4_NAMES: Partial<Record<EventName, string>> = {
  form_submit_success: 'generate_lead',
};

// The same click can be reported by a component handler and the global link
// listener; drop exact repeats within a second.
let lastEvent = { key: '', at: 0 };

export const trackEvent = (eventName: EventName, eventData?: EventParams) => {
  try {
    if (typeof window === 'undefined') return;
    const key = `${eventName}:${JSON.stringify(eventData ?? {})}`;
    const now = Date.now();
    if (key === lastEvent.key && now - lastEvent.at < 1000) return;
    lastEvent = { key, at: now };

    const params: EventParams = { ...eventData, page_path: window.location.pathname };
    const name = GA4_NAMES[eventName] ?? eventName;
    if (name !== eventName) params.source_event = eventName;

    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    } else {
      (window.dataLayer = window.dataLayer || []).push({ event: name, ...params });
    }
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
};

function eventForHref(href: string): EventName | null {
  const lower = href.toLowerCase();
  if (lower.startsWith('mailto:')) return 'email_click';
  if (lower.startsWith('tel:')) return 'phone_click';
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com)\//.test(lower)) return 'whatsapp_click';
  if (/^https?:\/\/([a-z]+\.)?linkedin\.com\//.test(lower)) return 'linkedin_click';
  return null;
}

/**
 * Tracks every WhatsApp, email, phone and LinkedIn link on the site, including
 * ones added later, so no CTA is missed. Returns a cleanup function.
 */
export function installContactLinkTracking(): () => void {
  const onClick = (event: MouseEvent) => {
    const target = event.target as Element | null;
    const link = target?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!link) return;
    const name = eventForHref(link.getAttribute('href') || '');
    if (name) trackEvent(name);
  };
  document.addEventListener('click', onClick, { capture: true });
  return () => document.removeEventListener('click', onClick, { capture: true });
}
