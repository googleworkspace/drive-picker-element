# Next.js Example

This example demonstrates using `@googleworkspace/drive-picker-react` with Next.js

## Setup

1. Copy `.env.sample` to `.env.local` and set your credentials:

```bash
cp .env.sample .env.local
```

Fill in your Google Cloud credentials:

- `NEXT_PUBLIC_APP_ID`: Your Google Cloud Project Number (numeric, e.g. `123456789012`).
- `NEXT_PUBLIC_CLIENT_ID`: Your OAuth 2.0 Web Client ID.
- `NEXT_PUBLIC_DEVELOPER_KEY`: Your Google API key (with Drive and Picker APIs enabled).

2. Make sure your local URL (e.g. `http://localhost:3000`) is registered under **Authorized JavaScript origins** for your OAuth 2.0 Client ID in Google Cloud Console.

## Running the Example

From the repository root:

```bash
pnpm --filter nextjs-example dev
```

Or run all dev servers:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
