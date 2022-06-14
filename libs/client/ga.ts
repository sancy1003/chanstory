declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

export function pageview(url: string) {
  window.gtag("config", process.env.GOOGLE_ANALYTICS_ID!, {
    page_path: url,
  });
}
