## Brewify Coffee

**Coffee that knows you.** A minimal, editorial Next.js 14 experience for hyper-personalized coffee blends.

### Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Fonts**: Geist via `next/font`
- **AI**: OpenAI API (`gpt-4o` via `openai` SDK)

### Routes

- **`/`** – Landing page with full-screen hero and three concept pillars.
- **`/build`** – Multi-step Blend Builder that calls OpenAI to generate a unique blend profile and label preview.
- **`/dashboard`** – Mock archive of past blends with a small “Compare Blends” section.
- **`/api/generate-blend`** – API route that takes the builder inputs and returns a structured JSON blend profile.

### Setup

1. Install dependencies:

```bash
npm install
```

2. Configure OpenAI:

Create `.env.local` in the project root:

```bash
OPENAI_API_KEY=sk-...
```

3. Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000` to explore the app.

