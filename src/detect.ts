// src/detect.ts
export interface SiteProfile {
  isJsHeavy: boolean;
  requiresAuth: boolean;
}

export function detectSiteProfile(url: string): SiteProfile {
  // Simple heuristic: can expand to check robots.txt or specific patterns
  return {
    isJsHeavy: true, // Defaulting to true for webpull's use case
    requiresAuth: false,
  };
}
