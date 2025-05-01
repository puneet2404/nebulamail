"use client";
import { useState, useEffect, useRef } from "react";
import { useMailbox, MailboxProvider, TRIAGE_AGENT_LOGS } from "@/hooks/useMailbox";
import MailboxBoard from "@/components/MailboxBoard";
import MailboxDrawer from "@/components/MailboxDrawer";
import EmailList from "@/components/EmailList";
import { AgentConsole } from "@/components/AgentConsole";
import { toast } from "@/components/Toast";
import CommitmentLedger from "@/components/CommitmentLedger";
import MindPalace from "@/components/MindPalace";
import SettingsTab from "@/components/SettingsTab";
import confetti from "canvas-confetti";
import Footer from "@/components/Footer";

function pickLane(card) {
  if (card.flags?.requiresNudge) return "Urgent";
  if (card.flags?.containsPII) return "Waiting";
  if (card.flags?.delegatedTo) return "Delegated";
  if (card.promises?.length) return "ThisWeek";
  return "Later";
}

function InboxPage() {
  const { cards, moveCard, agentLog, pushLog, setAgentLog } = useMailbox();
  const [selected, setSelected] = useState(null);
  const [kanban, setKanban] = useState(false);
  const [triaging, setTriaging] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Inbox");

  // Track previous urgent count to detect transition
  const prevUrgentCount = useRef<number>(0);
  useEffect(() => {
    const urgentCount = cards.filter(c => c.lane === "Urgent").length;
    if (prevUrgentCount.current > 0 && urgentCount === 0) {
      toast("Congratulations for flying with nebula, continue your streak");
      confetti({ spread: 120, particleCount: 100 });
    }
    prevUrgentCount.current = urgentCount;
  }, [cards]);

  async function runTriage() {
    setTriaging(true);
    setAgentLog([]);
    // Stream synthetic agent logs
    for (const log of TRIAGE_AGENT_LOGS) {
      pushLog(log);
      await new Promise(r => setTimeout(r, 650));
      // Simulate card moves at the right log steps
      if (log.includes("Moving 'Quarterly Report'")) moveCard(cards[0]?.id, "Urgent", { fromTriage: true });
      if (log.includes("Moving 'PII Request'")) moveCard(cards[1]?.id, "Waiting", { fromTriage: true });
      if (log.includes("Moving 'Team Sync'")) moveCard(cards[2]?.id, "ThisWeek", { fromTriage: true });
    }
    toast("🚦 Triage complete");
    await new Promise(r => setTimeout(r, 800));
    setKanban(true);
    setSelectedTab("Inbox"); // Select Inbox tab after triage
    setTriaging(false); // Only stop triaging, do not clear agent logs
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#181c2b] via-[#23244a] to-[#2e2257] bg-fixed overflow-auto flex flex-col">
      <div className={kanban ? "w-full h-[100dvh] flex flex-col flex-1" : "max-w-2xl mx-auto pt-10 pb-4 px-2 flex-1"}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {kanban && (
              <nav className="flex gap-1">
                {[
                  'Inbox',
                  'Mind Palace',
                  'Agent Control Center',
                  'Commitment Ledger',
                  'Settings',
                ].map(tab => (
                  <button
                    key={tab}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${selectedTab === tab ? 'bg-fuchsia-700/60 text-white' : 'text-white/80 hover:text-white hover:bg-fuchsia-700/40'}`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            )}
            {/* Removed Inbox label as requested */}
          </div>
          {!kanban && (
            <button
              className="btn-primary"
              onClick={runTriage}
              disabled={triaging}
            >
              {triaging ? "Triage running…" : "Run Nebula Triage → Kanban"}
            </button>
          )}
        </div>
        {kanban ? (
          <div className="flex-1 flex min-h-0">
            {selectedTab === "Inbox" && (
              <MailboxBoard cards={cards} onSelect={setSelected} moveCard={moveCard} />
            )}
            {selectedTab === "Mind Palace" && (
              <MindPalace />
            )}
            {selectedTab === "Agent Control Center" && (
              <div className="w-full flex items-center justify-center text-fuchsia-100 text-lg">Agent Control Center (Coming soon)</div>
            )}
            {selectedTab === "Commitment Ledger" && (
              <CommitmentLedger />
            )}
            {selectedTab === "Settings" && (
              <SettingsTab />
            )}
          </div>
        ) : (
          <EmailList cards={cards} onSelect={setSelected} />
        )}
      </div>
      <MailboxDrawer
        open={!!selected}
        card={selected}
        onOpenChange={() => setSelected(null)}
        moveCard={moveCard}
      />
      <AgentConsole />
      <Footer />
    </div>
  );
}

export default function InboxPageWrapper() {
  return (
    <MailboxProvider>
      <InboxPage />
    </MailboxProvider>
  );
}