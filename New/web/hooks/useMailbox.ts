import React, { createContext, useContext, useState } from "react";
import confetti from "canvas-confetti";
import { DEMO_CARDS } from "@/types/demoCards";
import { toast } from "@/components/Toast";
import type { MailCard } from "@/types/mail";

type MailboxContextType = {
  cards: MailCard[];
  setCards: React.Dispatch<React.SetStateAction<MailCard[]>>;
  moveCard: (id: string, toLane: string, opts?: { fromTriage?: boolean }) => void;
  agentLog: string[];
  pushLog: (msg: string) => void;
  setAgentLog: React.Dispatch<React.SetStateAction<string[]>>;
};

const MailboxContext = createContext<MailboxContextType | undefined>(undefined);

export function MailboxProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState(DEMO_CARDS);
  const [agentLog, setAgentLog] = useState<string[]>([]);

  function pushLog(msg: string) {
    setAgentLog(prev => {
      if (!msg) return [];
      const next = [...prev, msg];
      return next.length > 10 ? next.slice(-10) : next;
    });
  }

  function moveCard(id: string, toLane: string, opts?: { fromTriage?: boolean }) {
    setCards(prev => {
      const prevCard = prev.find(c => c.id === id);
      const updated = prev.map(c => (c.id === id ? { ...c, lane: toLane } : c));
      if (
        prevCard &&
        prevCard.lane !== toLane &&
        toLane === "Waiting" &&
        !opts?.fromTriage
      ) {
        setTimeout(() => {
          toast("Thread closed: Nebula replied ✨");
          moveCard(id, "Done", opts);
        }, 8000);
      }
      return updated;
    });
    if (toLane === "Done") {
      confetti({ spread: 120, particleCount: 80 });
    }
  }

  return (
    <MailboxContext.Provider value={{ cards, setCards, moveCard, agentLog, pushLog, setAgentLog }}>
      {children}
    </MailboxContext.Provider>
  );
}

export function useMailbox() {
  const ctx = useContext(MailboxContext);
  if (!ctx) throw new Error("useMailbox must be used within a MailboxProvider");
  return ctx;
}
