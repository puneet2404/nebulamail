"use client";
import React, { useMemo } from "react";
import { callAssist } from '@/hooks/useAssist';
import { toast } from '@/components/Toast';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { DEMO_CARDS } from "@/types/demoCards";

export type MailLane = "Urgent" | "Waiting" | "ThisWeek" | "Someday" | "Done";
export interface MailCard {
  id: string;
  from: string;
  subject: string;
  summary: string;
  lane: MailLane;
  sentiment: number;
  threadCount?: number;
  body?: string;
}

const lanes: { lane: MailLane; title: string }[] = [
  { lane: "Urgent",   title: "🔥 Urgent"   },
  { lane: "Waiting",  title: "⏳ Waiting"  },
  { lane: "ThisWeek", title: "📅 This Week"},
  { lane: "Someday",  title: "🌱 Someday"  },
  { lane: "Done",     title: "✅ Done"     },
];

interface Props {
  cards: MailCard[];
  onSelect: (mail: MailCard) => void;
  moveCard: (id: string, toLane: string) => void;
}

export default function MailboxBoard({ cards, onSelect, moveCard }: Props) {
  // Assist handlers
  const handleDraftNudge = async (c: MailCard) => {
    const text = await callAssist('draftNudge', c.id);
    toast('Draft nudge ready!', text);
  };
  const handleWhyStalled = async (c: MailCard) => {
    const text = await callAssist('whyStalled', c.id);
    toast('Root cause', text);
  };
  const handleSummarisePromises = async (c: MailCard) => {
    const text = await callAssist('summarisePromises', c.id);
    toast('Your promises', text);
  };

  const grouped = useMemo(() => {
    return lanes.map(({ lane, title }) => ({
      lane,
      title,
      items: cards.filter(c => c.lane === lane),
    }));
  }, [cards]);

  return (
    <div
      className="w-full flex justify-center overflow-x-auto scrollbar-hide py-8 px-2"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className="flex flex-row gap-4 md:gap-6 lg:gap-8 max-w-full min-w-[340px]" style={{ width: '100%', justifyContent: 'center' }}>
        {grouped.map(({ lane, title, items }) => {
          return (
            <section
              key={lane}
              className="flex flex-col w-72 min-w-[16rem] max-w-xs rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl shadow-fuchsia-500/10 ring-1 ring-white/10 transition-all duration-200"
              style={{ boxShadow: '0 4px 32px 0 rgba(80,0,180,0.10), 0 1.5px 8px 0 rgba(255,255,255,0.10)' }}
            >
              <header className="sticky top-0 z-10 flex items-center justify-between gap-2 px-4 py-3 rounded-t-3xl bg-white/20 backdrop-blur-md border-b border-white/10">
                <span className="text-xl font-bold flex items-center gap-2">{title.split(' ')[0]} <span className="font-semibold text-base">{title.split(' ').slice(1).join(' ')}</span></span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-fuchsia-500/80 text-white font-semibold shadow shadow-fuchsia-400/20">{items.length}</span>
              </header>
              <div className="flex-1 overflow-y-auto space-y-4 p-3 md:p-4 max-h-[70vh] scrollbar-hide">
                {items.map(card => (
                  <motion.div layout key={card.id}>
                    <article
                      className="group relative bg-white/90 border border-white/30 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer"
                      onClick={() => onSelect(card)}
                    >
                      <div className="p-3 md:p-4">
                        <h3 className="font-bold text-base md:text-lg text-slate-900 truncate mb-1">{card.subject}</h3>
                        <p className="text-xs md:text-sm text-slate-700 leading-tight line-clamp-2 mb-1">{card.summary}</p>
                        <p className="text-xs md:text-sm text-slate-700 leading-tight line-clamp-2 mb-1">{card.preview}</p>
                        <p className="text-[11px] md:text-xs font-medium text-fuchsia-600 mt-1">{card.from}</p>
                        {/* Show delegate avatar/button only for Urgent cards */}
                        {card.lane === "Urgent" && (
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              type="button"
                              className="rounded-full bg-fuchsia-200 w-8 h-8 flex items-center justify-center text-fuchsia-700 font-bold shadow hover:bg-fuchsia-300 transition"
                              title="Delegate to Alex"
                              onClick={e => {
                                e.stopPropagation();
                                toast("Delegated to Alex");
                                moveCard(card.id, "Waiting");
                              }}
                            >
                              {/* Simple avatar: could be replaced with an actual image if available */}
                              A
                            </button>
                            <span className="text-xs text-fuchsia-700 font-medium">Delegate…</span>
                          </div>
                        )}
                      </div>
                      {/* Action buttons removed as per user instruction */}
                    </article>
                  </motion.div>
                ))}
                {items.length === 0 && (
                  <p className="text-fuchsia-300 italic text-center py-8 animate-fade-in">All clear ✨</p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
