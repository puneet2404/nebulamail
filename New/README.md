# NebulaMail

NebulaMail is a full-stack starter for a modern AI-powered mailbox: Next.js 14 + Tailwind + ShadCN UI front-end, Python Azure Functions back-end, ready for Azure AI Agent Service and Microsoft Graph integration.

## Architecture

- **web/**: Next.js 14 (TypeScript, Tailwind, ShadCN UI, MSAL auth)
- **api/**: Python Azure Functions (Graph, Agent Service)
- **Infra**: Azure Static Web Apps, Function App, Cosmos DB

![Architecture Diagram](docs/architecture.png) <!-- Replace with actual diagram -->

## Setup

```sh
pnpm i -g pnpm
pnpm i -g azure-functions-core-tools@4
pnpm create next-app web --ts --tailwind --eslint --import-alias "@/*"
pnpm dlx shadcn-ui@latest init -y
pnpm dlx shadcn-ui@latest add card badge button dialog sheet scroll-area
pnpm dlx func init api --worker-runtime python --python
pnpm dlx func new --template "HTTP trigger" --name listUnread
pnpm install
```

## Demo

![Demo GIF](docs/demo.gif) <!-- Replace with actual demo -->

## License

MIT
