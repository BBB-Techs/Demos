import type { Metadata } from "next";
import { Montserrat, Abel } from "next/font/google";
import { withBasePath } from "@/lib/basePath";
import "./globals.css";

// Existing brand pairing: Montserrat for display, Abel for body.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const abel = Abel({
  variable: "--font-abel",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bdaneny.org"),
  title: {
    default: "BDANENY — Bleeding Disorders Association of Northeastern New York",
    template: "%s · BDANENY",
  },
  description:
    "Since 1968, BDANENY has stood with families in the bleeding disorders community across Northeastern New York — education, advocacy, and direct support that enhances quality of life.",
  icons: {
    icon: withBasePath("/brand/favicon.png"),
    apple: withBasePath("/brand/favicon.png"),
  },
  openGraph: {
    title: "BDANENY — For every family, a lifeline",
    description:
      "Education, advocacy, and direct support for the bleeding disorders community of Northeastern New York since 1968.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${abel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
