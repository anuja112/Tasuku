<h1>
  <img src="./app/icon.svg" width="24" style="vertical-align: middle; margin-right: 8px;" />
  Tasuku
</h1>

Tasuku is an AI-powered study assistant that helps students summarize notes, generate quizzes, improve written answers, and understand difficult concepts — all in one simple, mode-based interface.

Built for the **ShadowFox AI Engineer Intern** project.

## Features

| Mode | What it does |
| --- | --- |
| **Summarize** | Turns long notes into clear key points and quick revision material. |
| **Generate Quiz** | Creates interactive multiple-choice questions from your study material. |
| **Improve Answer** | Refines draft answers for clarity, structure, and academic tone. |
| **Explain Topic** | Breaks down difficult concepts with simple explanations and analogies. |

## Tech Stack

- [Next.js 16](https://nextjs.org/) (React 19)
- [Google Gemini API](https://ai.google.dev/) (`@google/genai`) for AI generation
- Tailwind CSS 4 for styling
- react-markdown + remark-gfm for rendering formatted AI responses

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A [Gemini API key](https://ai.google.dev/gemini-api/docs/api-key)

### Installation

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

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the app in development mode |
| `npm run build` | Builds the app for production |
| `npm run start` | Runs the production build |
| `npm run lint` | Runs ESLint checks |

## Project Structure

```
Tasuku/
├── app/            # Next.js app router pages, layout, and API routes
├── components/     # UI components (mode switcher, result card, icons)
├── lib/            # Prompt templates for each study mode
└── public/          # Static assets
```

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

## License

This project currently has no license specified. Add a `LICENSE` file if you'd like to define usage terms.