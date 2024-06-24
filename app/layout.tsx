import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Steam library analyser",
  description: "For your enjoyment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <main className="max-w-4xl mx-auto p-8 grid gap-8">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              Steam Library Analyser
            </h1>
            {children}
          </main>
        </body>
      </html>
    </Providers>
  );
}
