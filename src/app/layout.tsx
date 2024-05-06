import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import { validateRequest } from "@/lib/utils.server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LitQuest",
  description:
    "Book tracker web app built with TypeScript, Next.js, and PostgreSQL.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await validateRequest();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar authed={session ? true : false} />
          <main className="bg-gray-100 min-h-screen p-6 lg:px-16 lg:py-12">
            {children}
          </main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
