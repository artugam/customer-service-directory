import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Customer Service Platform Directory",
  description: "Compare features, pricing, and find the perfect customer service solution for your business. Browse help desks, live chat, chatbots, and ticketing systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
