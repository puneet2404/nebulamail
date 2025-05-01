import type { MailCard } from "./mail";

export interface MailFlags {
  requiresNudge?: boolean;
  containsPII?: boolean;
  delegatedTo?: string;
}

export interface MailPromise {
  who: string;
  what: string;
  due: string;
}

export interface MailTimeline {
  event: string;
  at: string; // ISO timestamp or relative
}

export interface RichMailCard extends MailCard {
  preview: string;
  body: string;
  sender: string;
  lane: string;
  flags: MailFlags;
  promises: MailPromise[];
  timeline: MailTimeline[];
  createdAt: string;
  draftReply?: string;
}

export const DEMO_CARDS: RichMailCard[] = [
  // Urgent nudge
  {
    id: "m1",
    subject: "Action required: Quarterly compliance report",
    preview: "Hi, we need your input on the Q2 compliance report. Please review and send your feedback by EOD.",
    body: `Hi,

We need your input on the Q2 compliance report. Please review the attached document and send your feedback by end of day. Let me know if you have any questions.

Thanks,
Finance Team`,
    sender: "Finance Team",
    lane: "Urgent",
    flags: { requiresNudge: true },
    promises: [
      { who: "You", what: "Send feedback", due: "Today" }
    ],
    timeline: [
      { event: "🔍 Planner → lane: Urgent", at: "2025-05-01T08:00:00Z" }
    ],
    createdAt: "2025-05-01T07:45:00Z",
    draftReply: "Hi, just checking in to see if you had a chance to review the Q2 compliance report. Let me know if you have any questions or need more time. Thanks!"
  },
  // Waiting → auto-resolve
  {
    id: "m2",
    subject: "Partner X: Awaiting contract signature",
    preview: "We’re waiting for your signature on the new partnership contract. Please sign at your earliest convenience.",
    body: `Hello,

We’re waiting for your signature on the new partnership contract. Please sign at your earliest convenience. If you have any questions, let us know.

Best,
Partner X Team`,
    sender: "Partner X",
    lane: "Waiting",
    flags: {},
    promises: [
      { who: "You", what: "Sign contract", due: "Tomorrow" }
    ],
    timeline: [
      { event: "📤 Mail sent", at: "2025-04-30T16:00:00Z" }
    ],
    createdAt: "2025-04-30T15:55:00Z",
    draftReply: "Hello, just a friendly reminder to sign the partnership contract when you have a moment. Please let us know if you have any questions. Thank you!"
  },
  // This Week reminder
  {
    id: "m3",
    subject: "Reminder: Update project roadmap (TODO)",
    preview: "Don’t forget to update the project roadmap. There’s a TODO for the new feature rollout.",
    body: `Hi,

Don’t forget to update the project roadmap. There’s a TODO for the new feature rollout. Please complete by Friday.

TODO: Add Q3 milestones to roadmap.

Thanks,
Product Team`,
    sender: "Product Team",
    lane: "ThisWeek",
    flags: {},
    promises: [
      { who: "You", what: "Update roadmap", due: "2025-05-04" }
    ],
    timeline: [
      { event: "📝 TODO detected", at: "2025-05-01T09:00:00Z" }
    ],
    createdAt: "2025-05-01T08:50:00Z",
    draftReply: "Hi, just a reminder to update the project roadmap with the new feature rollout by Friday. Let me know if you need any help."
  },
  // Someday research thread
  {
    id: "m4",
    subject: "Research: AI-powered onboarding (long-term)",
    preview: "We’re exploring AI-powered onboarding solutions. No immediate action required, but keep this on your radar.",
    body: `Hi,

We’re exploring AI-powered onboarding solutions for new hires. No immediate action required, but keep this on your radar for future planning. We’ll share updates as we progress.

Best,
HR Team`,
    sender: "HR Team",
    lane: "Someday",
    flags: {},
    promises: [],
    timeline: [
      { event: "💡 Research thread created", at: "2025-04-28T10:00:00Z" }
    ],
    createdAt: "2025-04-28T09:55:00Z",
    draftReply: "Hi, thanks for sharing the update on AI-powered onboarding. I’ll keep this in mind for future planning. Looking forward to more details as they become available."
  },
  // Delegated card
  {
    id: "m5",
    subject: "Client follow-up: Q2 deliverables delegated",
    preview: "Alex is now handling the Q2 deliverables for this client. Please check in if you need updates.",
    body: `Hi,

Alex is now handling the Q2 deliverables for this client. Please check in with Alex if you need updates or have questions.

Thanks,
Project Manager`,
    sender: "Project Manager",
    lane: "Waiting",
    flags: { delegatedTo: "Alex" },
    promises: [
      { who: "Alex", what: "Deliver Q2 items", due: "2025-05-10" }
    ],
    timeline: [
      { event: "➡ delegated to Alex", at: "2025-04-29T14:00:00Z" }
    ],
    createdAt: "2025-04-29T13:55:00Z",
    draftReply: "Hi Alex, just checking in regarding the Q2 deliverables for the client. Let me know if you need any support or have updates to share. Thanks!"
  },
  // PII leak test
  {
    id: "m6",
    subject: "Security alert: PII detected in thread",
    preview: "Please review the attached message. It may contain sensitive information.",
    body: `Hi,

Please review the attached message. It may contain sensitive information.

password: 123

Let us know if you need to take action.

Security Team`,
    sender: "Security Team",
    lane: "Urgent",
    flags: { containsPII: true },
    promises: [
      { who: "You", what: "Review for PII", due: "Today" }
    ],
    timeline: [
      { event: "🚨 PII detected", at: "2025-05-01T10:00:00Z" }
    ],
    createdAt: "2025-05-01T09:50:00Z",
    draftReply: "Hi, I’ve reviewed the message and noticed it may contain sensitive information. Please let me know if any further action is required."
  },
  // TL;DR demo
  {
    id: "m7",
    subject: "Weekly digest: Engineering updates (long)",
    preview: "This week’s engineering digest covers several updates, including infrastructure, deployments, and bug fixes.",
    body: `Hi team,

This week’s engineering digest covers several updates:

1. Infrastructure improvements: We’ve upgraded our CI/CD pipeline for faster deployments.
2. New feature rollout: The new dashboard is now live for all users.
3. Bug fixes: Addressed several user-reported issues in the mobile app.
4. Upcoming work: Planning for Q3 initiatives is underway.

Let me know if you have questions or need more details.

Best,
Engineering Team`,
    sender: "Engineering Team",
    lane: "ThisWeek",
    flags: {},
    promises: [
      { who: "You", what: "Review digest", due: "2025-05-03" }
    ],
    timeline: [
      { event: "📜 Digest sent", at: "2025-05-01T11:00:00Z" }
    ],
    createdAt: "2025-05-01T10:55:00Z",
    draftReply: "Hi team, thanks for the detailed engineering update. Let me know if there’s anything that needs my attention or follow-up."
  },
  // Already Done
  {
    id: "m8",
    subject: "✅ Project X: All deliverables completed",
    preview: "Congratulations! All deliverables for Project X are now complete. No further action required.",
    body: `Hi,

Congratulations! All deliverables for Project X are now complete. No further action required. Thanks for your hard work!

Best,
Project X Team`,
    sender: "Project X Team",
    lane: "Done",
    flags: {},
    promises: [],
    timeline: [
      { event: "✅ resolved", at: "2025-04-27T17:00:00Z" }
    ],
    createdAt: "2025-04-27T16:55:00Z",
    draftReply: "Hi, thanks for the update and congratulations to everyone involved in Project X! No further action needed."
  },
  {
    id: "m9",
    subject: "Client ETA confirmation needed (time-sensitive)",
    preview:
      "Hi, could you confirm the delivery ETA for the new build? The client is asking…",
    body: `Hi Team,

The client is pushing for an updated delivery ETA on the latest build.
Could you confirm the exact date we can ship so I can reply to them
this afternoon?

Thanks a lot!
— Jordan, Account Manager`,
    sender: "Jordan • Accounts",
    lane: "Urgent",
    flags: { requiresNudge: true },
    promises: [
      { who: "You", what: "Confirm ETA", due: "Today" }
    ],
    timeline: [
      { event: "🔍 Planner → lane: Urgent", at: "2025-05-01T11:30:00Z" }
    ],
    createdAt: "2025-05-01T11:25:00Z",
    draftReply: "Hi Jordan, the team is confirming the delivery ETA and will get back to you as soon as possible. Thanks for your patience!"
  }
];
