import { useMailbox } from "@/hooks/useMailbox";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function AgentConsole() {
  const { agentLog } = useMailbox();
  const [minimized, setMinimized] = useState(false);

  // Auto-minimize after triage effect
  useEffect(() => {
    if (agentLog.length > 0 && agentLog[agentLog.length - 1]?.includes("Triage complete")) {
      const timer = setTimeout(() => setMinimized(true), 1800);
      return () => clearTimeout(timer);
    }
  }, [agentLog]);

  const visible = agentLog.length > 0 && agentLog.join("").trim() !== "";

  // Always show AgentConsole if minimized or maximized, even if no logs
  // Remove the early return
  // if (!visible && !minimized) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 transition-all duration-500 ${minimized ? "h-10" : "h-[220px]"} ${visible && !minimized ? "translate-y-0 opacity-100" : "opacity-80"}`}
      style={{
        background: minimized
          ? 'linear-gradient(0deg, #181c2b 90%, transparent)'
          : 'linear-gradient(0deg, #181c2b 90%, transparent)',
        boxShadow: '0 -4px 32px 0 rgba(0,0,0,0.28)',
        borderTop: '1.5px solid #23244a',
      }}
    >
      <div className={`h-full w-full flex flex-col p-2 ${minimized ? "justify-center" : "p-4"}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-slate-400 uppercase tracking-widest">Agent Terminal</span>
          <div className="ml-auto">
            {minimized ? (
              <Button size="sm" variant="ghost" onClick={() => setMinimized(false)} className="text-xs px-2 py-0.5">
                Maximize
              </Button>
            ) : (
              <Button size="sm" variant="ghost" onClick={() => setMinimized(true)} className="text-xs px-2 py-0.5">
                Minimize
              </Button>
            )}
          </div>
        </div>
        {!minimized && (
          <div className="flex-1 overflow-y-auto bg-black/60 rounded-md p-3 border border-slate-800 text-xs font-mono text-green-200 whitespace-pre leading-relaxed shadow-inner">
            {agentLog.length > 0 ? (
              agentLog.map((line, i) => (
                <div key={i}>{line}</div>
              ))
            ) : (
              <div className="text-green-400/60 italic">Agent ready.</div>
            )}
          </div>
        )}
        {minimized && (
          <div className="truncate text-xs text-green-200 font-mono px-2">
            {agentLog[agentLog.length - 1] || "Agent ready."}
          </div>
        )}
      </div>
    </div>
  );
}
