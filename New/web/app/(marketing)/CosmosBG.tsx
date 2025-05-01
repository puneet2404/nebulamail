'use client';
import React from "react";

// ---------- deterministic star positions ------------
const STAR_COUNT = 45;
const stars = Array.from({ length: STAR_COUNT }).map(() => ({
  cx: Math.random() * 100,
  cy: Math.random() * 100,
  r: Math.random() * 0.06 + 0.02, // even smaller radius for subtle dots
  op: Math.random() * 0.5 + 0.5, // opacity between 0.5 and 1
}));
// ----------------------------------------------------

export default function CosmosBG() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#0a0820] via-[#1a1333] to-[#1e2746]">
      {/* breathing nebula blobs */}
      <div
        className="absolute -top-60 -left-64 h-[760px] w-[760px] rounded-full bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-500 blur-[180px] mix-blend-multiply animate-blob z-[-10]"
        style={{ opacity: 0.025 }}
      />
      <div
        className="absolute bottom-0 right-0 h-[540px] w-[540px] rounded-full bg-gradient-to-tr from-fuchsia-500 via-indigo-600 to-sky-500 blur-[160px] mix-blend-multiply animate-blob2 z-[-10]"
        style={{ opacity: 0.02 }}
      />

      {/* deterministic starfield */}
      <svg
        className="fixed inset-0 w-screen h-screen animate-drift pointer-events-none select-none z-[-10] mix-blend-screen opacity-30"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100vw"
        height="100vh"
        style={{ display: 'block' }}
      >
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="#fff"
            opacity={s.op}
          />
        ))}
      </svg>
    </div>
  );
}
