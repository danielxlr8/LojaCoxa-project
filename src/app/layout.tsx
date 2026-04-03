import type { Metadata } from "next";
import { Saira, Saira_Condensed } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
});

const sairaCondensed = Saira_Condensed({
  variable: "--font-saira-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Coxa Store | E-commerce Premium",
  description: "A paixão do torcedor no e-commerce mais moderno.",
};

import { CartDrawer } from "@/components/ui/CartDrawer";
import { FavoritesDrawer } from "@/components/ui/FavoritesDrawer";
import { FloatingCart } from "@/components/ui/FloatingCart";
import { AIGuide } from "@/components/ui/AIGuide";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${saira.variable} ${sairaCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScrollProvider>
          {children}
          <CartDrawer />
          <FavoritesDrawer />
          <FloatingCart />
          <AIGuide />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
