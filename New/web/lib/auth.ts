import { PublicClientApplication } from "@azure/msal-browser";

export const msal = new PublicClientApplication({
  auth: {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_TENANT_ID}`,
  },
  cache: { cacheLocation: "localStorage" },
});

export const loginScopes = [
  "User.Read",
  "Mail.Read",
  "Mail.ReadWrite",
  "Mail.Send",
];
