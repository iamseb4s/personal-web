"use client";

import Script from "next/script";

export const AnalyticsScript = () => {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;

  // Only render the script if configuration is present
  if (!websiteId || !scriptUrl) {
    console.warn("There are missing analytics configuration values.");
    return null;
  }

  const fullScriptUrl = `${scriptUrl}/script.js`;

  return (
    <Script
      src={fullScriptUrl}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
};
