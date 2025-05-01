"use client";
import React from "react";
import CosmosBG from "@/app/(marketing)/CosmosBG";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);

  // Run once in the browser after hydration
  React.useEffect(() => setMounted(true), []);

  // On the server (and first client pass) return an empty placeholder
  if (!mounted) {
    return <div suppressHydrationWarning />; // ensures no mismatch
  }

  // After mount, render the cosmic background + children
  return (
    <>
      <CosmosBG />
      {children}
    </>
  );
}
