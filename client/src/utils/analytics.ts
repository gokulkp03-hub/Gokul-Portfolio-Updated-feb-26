// Types for Umami global
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
    };
  }
}

export type EventName = 
  | 'form_start'
  | 'form_submit_success'
  | 'whatsapp_click'
  | 'email_click'
  | 'linkedin_click'
  | 'service_cta_click'
  | 'case_study_view';

/**
 * Safely track an event in Umami Analytics
 */
export const trackEvent = (eventName: EventName, eventData?: Record<string, string | number | boolean>) => {
  try {
    if (typeof window !== 'undefined' && window.umami && typeof window.umami.track === 'function') {
      window.umami.track(eventName, eventData);
    }
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
};
