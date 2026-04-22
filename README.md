# AgenticBricks — Capabilities Deck

Interactive slide deck presentation built with React, Vite, Tailwind CSS, and Framer Motion. Includes a Claude-powered AI assistant.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Environment Variables

Copy `.env.example` to `.env` and add your Anthropic API key:

```bash
cp .env.example .env
```

```
VITE_ANTHROPIC_API_KEY=your_key_here
```

The deck works without the API key — the AI panel will show a graceful message.

## Navigation

- **Arrow keys**: Left/Right to navigate slides
- **Click**: Arrow buttons in the footer
- **Swipe**: Touch left/right on mobile
- **F key**: Toggle fullscreen
- **Dots**: Click bottom indicator dots

## Deploy to Vercel

1. Push to a Git repository
2. Import the project in [Vercel](https://vercel.com)
3. Add `VITE_ANTHROPIC_API_KEY` as an environment variable
4. Deploy — Vercel auto-detects Vite via `vercel.json`

## Tech Stack

- React 18 + Vite
- Tailwind CSS v4
- Framer Motion
- Claude API (claude-sonnet-4-20250514)
