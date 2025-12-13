// Define custom types for Umami
interface UmamiTracker {
  track: (eventName: string, eventData?: Record<string, string | number>) => void;
}

declare global {
  interface Window {
    umami?: UmamiTracker;
  }
}

// Event names based on agreed strategy
export type EventName = 'navigation' | 'project_action';

// Generic navigation event data
export interface NavigationEventData {
  type: 'anchor' | 'external';
  location: 'header' | 'hero' | 'footer' | 'project_page';
  target?: string; // e.g., '#projects', 'github' (for internal/symbolic targets)
  url?: string; // e.g., 'https://github.com/...' (for actual URLs)
  label: string; // Button text or identifier
  [key: string]: string | number | undefined; // Allow loose props if needed
}

// Project specific action data
export interface ProjectActionEventData {
  type: 'live_demo' | 'repo';
  project_slug?: string;
  url: string;
  location: 'project_card' | 'project_page';
  [key: string]: string | number | undefined;
}

/**
 * Tracks an event to Umami Analytics safely.
 * Checks if window.umami exists before calling.
 */
export const trackEvent = (
  eventName: EventName,
  data: NavigationEventData | ProjectActionEventData
) => {
  if (typeof window !== 'undefined' && window.umami) {
    // Umami expects a flat object of strings/numbers
    window.umami.track(eventName, data as unknown as Record<string, string | number>);
  }
};
