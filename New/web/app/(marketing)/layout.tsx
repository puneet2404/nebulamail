import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import ClientShell from "@/app/(marketing)/ClientShell";

export const metadata: Metadata = {
  title: "NebulaMail – Inbox Zen",
  description: "Autonomous-agent email companion",
  icons: ["/assets/nebula.png"],
  other: {
    link:[{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"}]
  }
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    // everything that might be random lives in ClientShell
    <ClientShell>{children}</ClientShell>
  );
}
