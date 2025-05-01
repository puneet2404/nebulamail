'use client';
import CosmosBG from '@/app/(marketing)/CosmosBG';

export default function LandingClient() {
  return (
    <>
      <CosmosBG />
      <section className="mt-32 text-center max-w-5xl mx-auto px-6">
        <h1 className="text-6xl md:text-7xl leading-tight font-semibold tracking-tight text-slate-100">
          Inbox{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-500 bg-clip-text text-transparent">
            Zen
          </span>
          <br />
          powered by autonomous agents
        </h1>
        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
          NebulaMail triages, drafts, and reminds — so you can focus on work that matters.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/inbox"
            className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium shadow-lg"
          >
            Live demo
          </a>
          <button className="px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 shadow-inner">
            Watch 90-sec video
          </button>
        </div>
      </section>
    </>
  );
}