import { LocalMock } from "./LocalMock";
import { GraphLive } from "./GraphLive";
import type { MailProvider } from "./MailProvider";

let mode = "mock";
if (typeof window !== "undefined") {
  const localPref = localStorage.getItem("mailMode");
  mode = localPref ?? process.env.NEXT_PUBLIC_MAIL_MODE ?? "mock";
} else if (typeof process !== "undefined") {
  mode = process.env.NEXT_PUBLIC_MAIL_MODE ?? "mock";
}

export const mailProvider: MailProvider = mode === "live" ? GraphLive : LocalMock;
