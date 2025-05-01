import React from "react";
import type { MailCard } from "@/types/mail";

const laneColors: Record<string, string> = {
  Urgent: "bg-red-500",
  Waiting: "bg-amber-400",
  ThisWeek: "bg-indigo-500",
  Someday: "bg-green-400",
  Done: "bg-slate-400",
};

function formatTime(ts?: string | number | Date) {
  if (!ts) return "";
  const d = typeof ts === "string" || typeof ts === "number" ? new Date(ts) : ts;
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

interface EmailListProps {
  cards: MailCard[];
  onSelect: (mail: MailCard) => void;
}

export default function EmailList({ cards, onSelect }: EmailListProps) {
  return (
    <div className="bg-white rounded-lg shadow divide-y divide-slate-100 overflow-hidden">
      {cards
        .slice()
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
        .map((card) => (
          <div
            key={card.id}
            className="w-full flex items-center px-4 py-3 hover:bg-indigo-50 transition group text-left cursor-pointer"
            onClick={() => onSelect(card)}
          >
            <span className={`w-2 h-2 rounded-full mr-4 ${laneColors[card.lane] || "bg-slate-300"}`}></span>
            <span className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1">
              <span className={`font-medium ${card.lane === "Urgent" ? "text-black font-bold" : "text-slate-900"}`}>{card.subject}</span>
              <span className="text-slate-500 text-xs ml-2">{card.from}</span>
              <span className="text-slate-400 text-xs ml-2 truncate max-w-[180px]">{card.summary}</span>
            </span>
            <span className="ml-auto text-xs text-slate-400 font-mono">{formatTime(card.createdAt)}</span>
          </div>
        ))}
    </div>
  );
}
