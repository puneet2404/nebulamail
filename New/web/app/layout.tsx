import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "NebulaMail" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-['Poppins'] text-slate-200">
        {/* Removed global logo and title header */}
        <main className="max-w-[1480px] mx-auto px-6 py-8">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
