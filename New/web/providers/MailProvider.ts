import type { MailCard } from "@/types/mail";

export interface MailProvider {
  /** Return unread messages mapped to MailCard objects */
  getUnread(): Promise<MailCard[]>;
}
