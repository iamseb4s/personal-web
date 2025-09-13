import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono, Roboto, Noto_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hi, I am Sebas! 👾",
  description: "Check out my projects here!",
  icons: {
    icon: "/sebas_icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bebasNeue.variable} ${ibmPlexMono.variable} ${roboto.variable} ${notoSerif.variable} antialiased bg-background text-foreground transition-colors duration-500 ease-in-out`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
