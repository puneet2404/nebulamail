import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MindPalace() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [azureApiKey, setAzureApiKey] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("azure_openai_api_key") || "";
    setAzureApiKey(stored);
  }, []);

  const demoMemories = [
    {
      id: 1,
      title: "Q2 Compliance Report",
      content: "Feedback and review required for Q2 compliance report. Deadline: May 1, 2025.",
      timestamp: "2025-04-15T10:23:00Z",
      ttft: 320,
      tokensPerSecond: 38.5
    },
    {
      id: 2,
      title: "AI Onboarding Research",
      content: "Long-term research on AI-powered onboarding for new hires. No immediate action.",
      timestamp: "2025-03-28T14:05:00Z",
      ttft: 290,
      tokensPerSecond: 41.2
    },
    {
      id: 3,
      title: "Security Policy Review",
      content: "Review security policy and check for PII leaks. Due: May 8, 2025.",
      timestamp: "2025-04-20T09:12:00Z",
      ttft: 350,
      tokensPerSecond: 36.7
    },
    {
      id: 4,
      title: "Project Roadmap Update",
      content: "Update project roadmap with Q3 milestones and new feature rollout.",
      timestamp: "2025-04-10T16:40:00Z",
      ttft: 305,
      tokensPerSecond: 39.9
    },
    // Synthetic Q&A pairs
    {
      id: 5,
      title: "Q: How do I delegate a task in NebulaMail?",
      content: "A: Open the email, click 'Delegate', and assign it to a team member. The delegated task will appear in their inbox and your Commitment Ledger.",
      timestamp: "2025-04-30T11:00:00Z",
      ttft: 410,
      tokensPerSecond: 35.2
    },
    {
      id: 6,
      title: "Q: What does the 'Urgent' lane mean?",
      content: "A: The 'Urgent' lane is for emails or tasks that require immediate attention, such as compliance deadlines or client escalations.",
      timestamp: "2025-04-29T13:45:00Z",
      ttft: 370,
      tokensPerSecond: 37.8
    },
    {
      id: 7,
      title: "Q: Can I use AI to summarise my inbox?",
      content: "A: Yes! Use the 'Run Nebula Triage' button to let the AI summarise, categorise, and prioritise your emails automatically.",
      timestamp: "2025-04-28T08:30:00Z",
      ttft: 330,
      tokensPerSecond: 40.1
    },
    {
      id: 8,
      title: "Q: How do I add a new memory to the Mind Palace?",
      content: "A: Click the 'Add Memory' button (coming soon) or ask a question. The system will learn and store useful Q&A for future reference.",
      timestamp: "2025-04-27T15:10:00Z",
      ttft: 360,
      tokensPerSecond: 38.0
    },
    {
      id: 9,
      title: "Q: What is the Commitment Ledger?",
      content: "A: The Commitment Ledger tracks all promises, tasks, and follow-ups—both yours and those delegated to others—so nothing falls through the cracks.",
      timestamp: "2025-04-26T17:55:00Z",
      ttft: 340,
      tokensPerSecond: 39.2
    },
    {
      id: 10,
      title: "Q: How do I connect my Outlook or Gmail?",
      content: "A: Go to Settings, select 'Connect Account', and follow the prompts to securely link your email provider using Microsoft or Google authentication.",
      timestamp: "2025-04-25T12:20:00Z",
      ttft: 315,
      tokensPerSecond: 41.0
    }
  ];

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const res = await fetch("/api/mindpalaceSearch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, azureApiKey, model: "gpt-4o" }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setResults(demoMemories); // fallback to demo
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <Card className="p-6 mb-6 space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col gap-3">
          <Input
            placeholder="Your Azure OpenAI API Key (required)"
            value={azureApiKey}
            onChange={e => setAzureApiKey(e.target.value)}
            className="flex-1"
            type="password"
            required
          />
          <div className="flex gap-2">
            <Input
              placeholder="Search your Mind Palace..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading || !azureApiKey}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>
      </Card>
      {error && <Card className="p-4 text-red-400 mb-4">{error}</Card>}
      <div className="grid gap-4">
        {(!hasSearched && !loading && !error) ? (
          demoMemories.map((m) => (
            <Card key={m.id} className="p-4">
              <div className="font-semibold text-fuchsia-200 mb-1">{m.title}</div>
              <div className="text-fuchsia-100 text-sm mb-2">{m.content}</div>
              <div className="text-xs text-fuchsia-400 flex flex-wrap gap-4">
                <span>Timestamp: {m.timestamp}</span>
                <span>TTFT: {m.ttft} ms</span>
                <span>Tokens/sec: {m.tokensPerSecond}</span>
              </div>
            </Card>
          ))
        ) : results.length === 0 && !loading && !error ? (
          <Card className="p-4 text-fuchsia-300 italic">No results found.</Card>
        ) : (
          results.map((m) => (
            <Card key={m.id} className="p-4">
              <div className="font-semibold text-fuchsia-200 mb-1">{m.title}</div>
              <div className="text-fuchsia-100 text-sm mb-2">{m.content}</div>
              <div className="text-xs text-fuchsia-400 flex flex-wrap gap-4">
                <span>Timestamp: {m.timestamp}</span>
                <span>TTFT: {m.ttft} ms</span>
                <span>Tokens/sec: {m.tokensPerSecond}</span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
