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

export interface MailCard {
  id: string;
  subject: string;
  preview: string;
  body: string;
  sender: string;
  lane: string;
  flags: MailFlags;
  promises: MailPromise[];
  timeline: MailTimeline[];
  createdAt: string;
}
