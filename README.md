<h1>
  <img src="./app/icon.png" width="24" style="vertical-align: middle; margin-right: 8px;" />
  Tasuku
</h1>

A focused study companion that turns raw notes into something you can actually use — a clear summary, a quick quiz, a stronger answer, or a simple explanation, all generated on demand from a single text box.

Built for the **ShadowFox AI Engineer Internship** (Beginner Level — AI-powered student utility app).

## What it does

Paste in your notes or a question, pick a mode, and Tasuku sends it to an LLM with a purpose-built prompt for that task:

| Mode               | What it does                                                            |
| ------------------ | ----------------------------------------------------------------------- |
| **Summarize**      | Turns long notes into clear key points and quick revision material.     |
| **Generate Quiz**  | Creates interactive multiple-choice questions from your study material. |
| **Improve Answer** | Refines draft answers for clarity, structure, and academic tone.        |
| **Explain Topic**  | Breaks down difficult concepts with simple explanations and analogies.  |

## Tech Stack

- [Next.js 16](https://nextjs.org/) (React 19)
- [Google Gemini API](https://ai.google.dev/) (`@google/genai`) for AI generation
- Tailwind CSS 4 for styling
- react-markdown + remark-gfm for rendering formatted AI responses

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/anuja112/Tasuku.git
   cd Tasuku
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root:

   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Starts the app in development mode |
| `npm run build` | Builds the app for production      |
| `npm run start` | Runs the production build          |
| `npm run lint`  | Runs ESLint checks                 |

## Project Structure

```
Tasuku/
├── app/            # Next.js app router pages, layout, and API routes
├── components/     # UI components (mode switcher, result card, icons)
├── lib/            # Prompt templates for each study mode
└── public/         # Static assets
```

## Author

Made by [Anuja Ghosal](https://github.com/anuja112).
