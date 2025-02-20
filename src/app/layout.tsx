import "@/styles/globals.css";
import { type Metadata, type Viewport } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

export const viewport: Viewport[] = [
  { themeColor: "(prefers-color-scheme: light)", colorScheme: "light" },
  { themeColor: "(prefers-color-scheme: dark)", colorScheme: "dark" },
];

export const metadata: Metadata = {
  title: "InCheck",
  description:
    "Vote on how countries are doing in regards to fundamental values.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("text-neutral-80 p-4 font-sans", inter.variable)}>
        {children}
      </body>
    </html>
  );
}
