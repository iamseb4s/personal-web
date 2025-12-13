import React from "react";
import { ThemeProvider } from "./[lang]/providers";
import { bebasNeue, ibmPlexMono, roboto, notoSerif } from './[lang]/layout';
import { AnalyticsScript } from "@/components/common/AnalyticsScript";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${bebasNeue.variable} ${ibmPlexMono.variable} ${roboto.variable} ${notoSerif.variable} antialiased bg-background text-foreground transition-colors duration-500 ease-in-out`}
      >
        <AnalyticsScript />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
