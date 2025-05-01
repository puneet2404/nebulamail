import type { MailCard } from "@/types/mail";
import type { MailProvider } from "./MailProvider";

export const GraphLive: MailProvider = {
  async getUnread(): Promise<MailCard[]> {
    // TODO later: token + fetch /listUnread API
    console.warn("GraphLive not wired yet — returning []");
    return [];
  },
};
