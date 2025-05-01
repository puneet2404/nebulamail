"use client";
import { Fragment, useState, useRef } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { toast } from "@/components/Toast";
import { useMailbox } from "@/hooks/useMailbox";

export interface Mail {
  id: string;
  subject: string;
  preview: string;
  sender: string;
  body: string;
}

export default function MailboxDrawer({ open, card, onOpenChange, moveCard }: {
  open: boolean;
  card: Mail | null;
  onOpenChange: (o: boolean) => void;
  moveCard: (id: string, toLane: string) => void;
}) {
  const { agentLog } = useMailbox();
  // fake ledger + timeline for the demo
  const ledger = [
    { who: "You", what: "Send timeline", due: "Fri" },
    { who: "Alex", what: "Share draft", due: "Mon" },
  ];
  const timeline = [
    "🔍 Planner → lane: Urgent",
    "🤖 Nudge drafted",
    "📤 Mail sent",
    "➡️ Auto-moved → Waiting",
  ];

  // AI Draft dialog state
  const [draftDialogOpen, setDraftDialogOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function openDraftDialog() {
    setDraftDialogOpen(true);
    setDraft((card as any)?.draftReply || ""); // Show draft immediately
    setStreaming(false);
    // Skipping API call for demo purposes:
    // try {
    //   const resp = await fetch(`/api/draftNudge?id=${card.id}`);
    //   const reader = resp.body?.getReader();
    //   const decoder = new TextDecoder();
    //   if (reader) {
    //     let streamed = "";
    //     while (true) {
    //       const { value, done } = await reader.read();
    //       if (done) break;
    //       streamed += decoder.decode(value);
    //       setDraft(streamed);
    //     }
    //   }
    // } catch {
    //   toast("AI draft unavailable, using suggested reply.");
    // } finally {
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
    // }
  }

  function closeDraftDialog() {
    setDraftDialogOpen(false);
    setDraft("");
    setStreaming(false);
  }

  return (
    <>
      <Transition show={open && !!card} as={Fragment}>
        <Dialog onClose={onOpenChange} className="fixed inset-0 z-50">
          {card && (
            <Dialog.Panel className="fixed right-0 top-0 h-full w-full max-w-md bg-[#101020] shadow-xl p-6 overflow-y-auto z-[60] border-l-4 border-indigo-500">
              <div>
                <h3 className="text-lg font-semibold">{card.subject}</h3>
                <p className="text-xs text-slate-500 uppercase tracking-wide">{card.sender}</p>
              </div>
              <div className="mt-4">
                <Tab.Group>
                  <Tab.List className="flex gap-2 border-b border-slate-700 mb-4">
                    <Tab className={({ selected }) => `px-3 py-1 text-sm font-medium ${selected ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-300'}`}>Mail</Tab>
                    <Tab className={({ selected }) => `px-3 py-1 text-sm font-medium ${selected ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-300'}`}>Kanban View</Tab>
                    <Tab className={({ selected }) => `px-3 py-1 text-sm font-medium ${selected ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-300'}`}>Commitment Ledger</Tab>
                    <Tab className={({ selected }) => `px-3 py-1 text-sm font-medium ${selected ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-300'}`}>Mail Mind Palace</Tab>
                    <Tab className={({ selected }) => `px-3 py-1 text-sm font-medium ${selected ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-300'}`}>Agent Control Center</Tab>
                    <Tab className={({ selected }) => `px-3 py-1 text-sm font-medium ${selected ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-300'}`}>Settings</Tab>
                  </Tab.List>
                  <Tab.Panels>
                    {/* Mail */}
                    <Tab.Panel>
                      <div className="mt-4 space-y-4 max-h-72 overflow-y-auto">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">{card?.body || "No thread content – demo placeholder."}</p>
                      </div>
                    </Tab.Panel>
                    {/* Kanban View */}
                    <Tab.Panel>
                      <div className="mt-4 grid gap-3">
                        {card?.flags?.requiresNudge && (
                          <button
                            className="btn-primary"
                            onClick={openDraftDialog}
                          >
                            Draft polite nudge
                          </button>
                        )}
                        {card?.flags?.delegatedTo && (
                          <button
                            className="btn-primary/outline"
                            onClick={() => {
                              toast(`Delegated to ${card.flags.delegatedTo}`);
                              moveCard(card.id, "Waiting");
                              onOpenChange(false);
                            }}
                          >
                            Ping {card.flags.delegatedTo}
                          </button>
                        )}
                        {card?.flags?.containsPII && (
                          <div className="bg-red-600 text-white px-3 py-2 rounded mb-2 font-semibold">
                            PII detected ⚠️
                          </div>
                        )}
                        <button className="btn-primary/outline">One-tap TL;DR</button>
                        <button className="btn-primary/outline">Delegate…</button>
                      </div>
                    </Tab.Panel>
                    {/* Commitment Ledger */}
                    <Tab.Panel>
                      <div className="mt-4">
                        <ul className="space-y-2 text-sm">
                          {card?.promises?.length ? card.promises.map((p, i) => (
                            <li key={i}>
                              <span className="font-medium text-slate-100">{p.who}</span>{" "}
                              — {p.what} <span className="text-slate-400">({p.due})</span>
                            </li>
                          )) : <li className="text-slate-400">No promises</li>}
                        </ul>
                      </div>
                    </Tab.Panel>
                    {/* Mail Mind Palace */}
                    <Tab.Panel>
                      <div className="mt-4">
                        <ul className="space-y-2 text-sm text-slate-300">
                          {card?.timeline?.length ? card.timeline.map((t, i) => (
                            <li key={i}>{t.event} <span className="text-xs text-slate-400">{t.at}</span></li>
                          )) : <li className="text-slate-400">No timeline events</li>}
                        </ul>
                      </div>
                    </Tab.Panel>
                    {/* Agent Control Center */}
                    <Tab.Panel>
                      <div className="mt-4 text-slate-300 text-sm">
                        <p>Agent log and controls coming soon.</p>
                        {agentLog.length > 0 && (
                          <div className="bg-black/80 text-white font-mono text-xs p-2 mt-2 rounded whitespace-pre">
                            {agentLog.slice(-5).map((line, i) => (
                              <div key={i}>{line}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Tab.Panel>
                    {/* Settings */}
                    <Tab.Panel>
                      <div className="mt-4 text-slate-300 text-sm">
                        <p>Settings panel coming soon.</p>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
              {/* Show agent log if triage is running */}
              {agentLog.length > 0 && (
                <div className="bg-black/80 text-white font-mono text-xs p-2 mt-2 rounded whitespace-pre">
                  {agentLog.slice(-5).map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )}
            </Dialog.Panel>
          )}
          <div className="fixed inset-0 bg-black/60 z-40" aria-hidden="true" />
        </Dialog>
      </Transition>

      {/* AI Draft Dialog */}
      <Transition show={draftDialogOpen} as={Fragment}>
        <Dialog onClose={closeDraftDialog} className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/60 z-40" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <Dialog.Panel className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto">
              <Dialog.Title className="text-lg font-bold mb-2">AI Draft</Dialog.Title>
              <div className="mb-2">
                <textarea
                  ref={textareaRef}
                  className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-200 text-slate-800 min-h-[120px]"
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  autoFocus
                  placeholder="AI is drafting a polite nudge..."
                  disabled={streaming}
                />
                {streaming && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded">Generating…</span>
                )}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="btn-secondary"
                  onClick={closeDraftDialog}
                  disabled={streaming}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  disabled={streaming || !draft.trim()}
                  onClick={() => {
                    if (!card) return;
                    moveCard(card.id, "Waiting");
                    toast("Nudge sent");
                    closeDraftDialog();
                  }}
                >
                  Send &amp; move to Waiting
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
