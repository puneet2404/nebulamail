"use client";
import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CosmosBG from "@/app/(marketing)/CosmosBG";

const features=[
 ["✨ Self-healing lanes","Cards auto-move when threads resolve."],
 ["📜 Commitment ledger","Nebula remembers every promise you make."],
 ["⚡ One-tap TL;DR","Instant summaries with audio playback."],
 ["🚦 Privacy guard","Flags PII leaks before you press send."],
 ["🤝 Smart delegation","Drag to teammate → tracked until closed."],
 ["🏆 Gamified streak","Confetti when Urgent lane hits zero."]
];

export default function MarketingPage() {
  return (
    <>
      <CosmosBG />
      {/* Logo and NebulaMail title in top-left */}
      <header className="fixed top-0 left-0 w-full z-30 backdrop-blur bg-white/5 border-b border-white/10 flex items-center px-6 py-2 gap-2">
        <div className="flex items-center gap-2">
          <Image src="/nebula.png" alt="NebulaMail Logo" width={32} height={32} className="h-8 w-auto translate-y-[2px]" />
          <span className="text-xl font-semibold bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">NebulaMail</span>
        </div>
      </header>
      <div className="h-8" />
      {/* Main headline section with reduced gap */}
      <section className="text-center mt-10 max-w-5xl mx-auto space-y-2">
        <h1 className="text-5xl xs:text-6xl sm:text-7xl font-extrabold leading-tight">
          Inbox <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">Zen</span>
        </h1>
        <p className="text-3xl font-medium text-slate-200">powered by autonomous agents</p>
        <p className="max-w-3xl mx-auto text-lg text-slate-400 leading-relaxed">
          NebulaMail triages, drafts, and reminds — so you can focus on work that matters.
        </p>
        <div style={{ marginTop: '6rem' }} />
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
          <a href="/inbox"
             className="h-12 px-6 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium shadow-md hover:shadow-xl flex items-center transition-shadow">
            Live demo
          </a>
          <a href="#video"
             className="h-12 px-6 rounded-lg bg-white/10 border border-white/60 hover:border-white/80 text-white font-medium flex items-center transition-colors hover:shadow-[0_0_16px_0_rgba(255,255,255,0.2)]">
            90-sec video
          </a>
        </div>
        <div style={{ marginTop: '6rem' }} />
      </section>

      {/* Hero screenshot */}
      {/* <Image src="/hero-board.png" alt="NebulaMail screenshot"
             width={1200} height={720}
             className="mx-auto mt-16 rounded-2xl shadow-2xl ring-1 ring-white/5" /> */}

      {/* Emoji feature tiles as interactive circle carousel */}
      <section className="mt-10 mb-2 text-2xl sm:text-3xl font-semibold text-center text-slate-100 relative">
        <span className="text-2xl sm:text-3xl font-semibold">Agentic Superpowers you’ll actually use!</span>
        <div className="mx-auto mt-2 mb-0 w-8 h-[3px] bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 rounded-full" />
      </section>
      <section className="relative w-full max-w-full px-0 flex flex-col items-center mb-24">
        <div
          id="feature-carousel"
          className="flex flex-row flex-wrap gap-6 items-center md:justify-center justify-start overflow-x-auto snap-x snap-mandatory px-4 scrollbar-hide scroll-smooth w-full mt-0 mb-12"
          style={{ scrollBehavior: 'smooth', scrollPadding: '0px 24px' }}
        >
          {features.map(([title], i) => {
            // Split emoji and label
            const [emoji, ...labelParts] = title.split(/ (.+)/);
            let label = labelParts.join('');
            // Insert <br> after first word for two-line label
            const labelWords = label.split(' ');
            const labelLine = labelWords.length > 1 ? `${labelWords[0]}<br>${labelWords.slice(1).join(' ')}` : label;
            return (
              <div
                key={title}
                className="group flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 via-fuchsia-700 to-sky-700 border-4 shadow-xl shadow-inner transition-all duration-200 cursor-pointer snap-center mx-1 inner-shadow relative hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  borderRadius: '50%',
                  width: '9rem',
                  height: '9rem',
                  minWidth: '9rem',
                  minHeight: '9rem',
                  zIndex: 10 - i,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: 'rgba(255,255,255,0.4)'
                }}
              >
                {/* Faint white inner ring */}
                <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: '0 0 0 4px rgba(255,255,255,0.40) inset' }} />
                <div className="flex flex-col items-center justify-center w-full h-full transition-all duration-200" style={{ borderRadius: '50%' }}>
                  <span className="text-2xl sm:text-3xl mb-1 leading-tight">{emoji}</span>
                  <span className="text-base sm:text-lg font-semibold text-white drop-shadow text-center leading-tight" dangerouslySetInnerHTML={{__html: labelLine}} />
                </div>
              </div>
            );
          })}
        </div>
        {/* Add breathing room before bullet panel */}
        <div className="mt-12" />
        {/* Background bleed for contrast under description list */}
        <div className="relative w-full flex justify-center">
          <div className="absolute inset-0 w-full h-full bg-neutral-900/60 rounded-3xl backdrop-blur-md shadow-2xl border border-white/10 pointer-events-none z-0" style={{ maxWidth: '40rem', margin: '0 auto' }} />
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-2xl mx-auto py-6 px-6 md:px-12">
            {features.map(([title, desc]) => (
              <div key={title} className="flex flex-col">
                <span className="font-semibold text-white leading-tight">{title}</span>
                <span className="text-slate-400 leading-relaxed">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA gradient banner */}
      <section className="mt-40 py-20 px-6 text-center bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white">
        <h2 className="text-4xl font-semibold">Ready to experience zero-inbox bliss?</h2>
        <p className="mt-4 text-lg">Sign in with Microsoft 365 and let agents take over.</p>
        <a href="/inbox"
           className="inline-block mt-8 px-8 py-3 rounded-lg bg-white text-indigo-600 font-medium hover:bg-slate-100">
           Try NebulaMail free
        </a>
      </section>
    </>
  );
}