import type { MailCard } from "@/types/mail";
import type { MailProvider } from "./MailProvider";

const DEMO_CARDS: MailCard[] = [
  {
    id: "1",
    subject: "Welcome to NebulaMail",
    from: "Azure",
    bodyPreview: "This is a demo card. Replace with your mailbox UI.",
  },
  {
    id: "2",
    subject: "AI Agent Service",
    from: "Azure AI",
    bodyPreview: "Integrate Azure AI Agent Service here.",
  },
];

export const LocalMock: MailProvider = {
  async getUnread() {
    await new Promise((r) => setTimeout(r, 300));
    return DEMO_CARDS;
  },
};
