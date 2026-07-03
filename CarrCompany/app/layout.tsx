import type { Metadata } from "next";
import { Anton, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

// Deliberate trio: Anton (industrial signage display) + Hanken Grotesk (warm humanist body)
// + Space Mono (technical utility face for spec-sheet labels & the section index).
const display = Anton({ weight: "400", variable: "--font-display", subsets: ["latin"] });
const sans = Hanken_Grotesk({ variable: "--font-sans", subsets: ["latin"] });
const mono = Space_Mono({ weight: ["400", "700"], variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carr Company — The Connections You Need",
  description:
    "Florida's leading manufacturers' representative for 80+ years. The connections you need, the experience you trust, the name you can count on.",
  openGraph: {
    title: "Carr Company",
    description: "The connections you need. The experience you trust. The name you can count on.",
    type: "website",
  },
};

// Applies the saved theme before first paint to avoid a flash. Light is the default —
// only an explicit "dark" opt-out turns it off.
const themeScript = `(function(){try{if(localStorage.getItem("theme")!=="dark")document.documentElement.classList.add("light");}catch(e){document.documentElement.classList.add("light");}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
