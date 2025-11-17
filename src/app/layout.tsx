import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { generateSEOMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = generateSEOMetadata({
  title: "Customer Service Directory - Compare AI-Powered Support Platforms 2025",
  description: "Compare top customer service platforms with AI automation. Find the perfect help desk, live chat, and ticketing solution. Expert reviews, pricing, and feature comparisons for enterprise teams.",
  path: "/",
  keywords: [
    "customer service software",
    "AI customer support",
    "help desk platform",
    "ticketing system",
    "live chat software",
    "customer service automation",
    "AI chatbot",
    "enterprise support platform",
    "omnichannel support",
    "customer experience platform",
    "contact center software",
    "service desk software",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
