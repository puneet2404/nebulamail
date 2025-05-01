"use client";
import { useEffect } from "react";

export function toast(msg: string, ms = 2500) {
  const el = document.createElement("div");
  el.className =
    "fixed bottom-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded shadow-lg z-[9999] animate-fade-in";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), ms);
}
