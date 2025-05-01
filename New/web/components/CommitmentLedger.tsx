import { DEMO_CARDS } from "@/types/demoCards";
import { Card } from "@/components/ui/card";
import { format, isBefore, parseISO } from "date-fns";

interface Commitment {
  who: string;
  what: string;
  due: string;
  subject: string;
}

const commitments: Commitment[] = [
  ...DEMO_CARDS.flatMap(card =>
    card.promises.map(p => ({
      who: p.who,
      what: p.what,
      due: p.due,
      subject: card.subject,
    }))
  ),
  { who: "You", what: "Prepare Q3 hiring plan", due: "2025-05-15", subject: "HR: Q3 hiring plan needed" },
  { who: "Alex", what: "Draft onboarding doc", due: "2025-05-12", subject: "Onboarding: Documentation update" },
  { who: "You", what: "Review security policy", due: "2025-05-08", subject: "Security: Policy review" }
];

// Helper: parse due date (handles 'Today', 'Tomorrow', or ISO)
function parseDue(due: string): Date {
  if (due === "Today") return new Date(2025, 4, 1); // May 1, 2025
  if (due === "Tomorrow") return new Date(2025, 4, 2);
  if (/^\d{4}-\d{2}-\d{2}$/.test(due)) return parseISO(due);
  return new Date(due);
}

const today = new Date(2025, 4, 1);
const soonThreshold = new Date(2025, 4, 8); // 1 week from 'today'

const quadrants = [
  {
    title: "Your Commitments (Due Soon)",
    filter: (c: Commitment) => c.who === "You" && isBefore(parseDue(c.due), soonThreshold),
  },
  {
    title: "Your Commitments (Due Later)",
    filter: (c: Commitment) => c.who === "You" && !isBefore(parseDue(c.due), soonThreshold),
  },
  {
    title: "Others' Commitments (Due Soon)",
    filter: (c: Commitment) => c.who !== "You" && isBefore(parseDue(c.due), soonThreshold),
  },
  {
    title: "Others' Commitments (Due Later)",
    filter: (c: Commitment) => c.who !== "You" && !isBefore(parseDue(c.due), soonThreshold),
  },
];

export default function CommitmentLedger() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {quadrants.map((q, idx) => (
        <Card key={q.title} className="p-6 min-h-[320px] flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-fuchsia-200">{q.title}</h3>
          <ul className="space-y-3 flex-1">
            {commitments.filter(q.filter).length === 0 ? (
              <li className="text-fuchsia-400/60 italic">No commitments</li>
            ) : (
              commitments.filter(q.filter).map((c, i) => (
                <li key={i} className="bg-fuchsia-900/10 rounded-lg px-4 py-3 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-fuchsia-100">{c.what}</span>
                    <span className="text-xs text-fuchsia-300">{format(parseDue(c.due), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="text-xs text-fuchsia-300">Related: {c.subject}</div>
                </li>
              ))
            )}
          </ul>
        </Card>
      ))}
    </div>
  );
}
