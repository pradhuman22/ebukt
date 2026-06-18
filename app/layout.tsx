import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Event Bucket",
  description: "Platform to sale and purchase event ticket.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased font-sans", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
