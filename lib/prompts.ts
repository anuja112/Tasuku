export const prompts = {
  summarize: (content: string) => `
You are an AI study assistant helping a college student.

Task: Summarize the study material below.

Requirements:
- Keep it concise
- Preserve important technical terms
- Remove repetition
- Use simple language
- Organize with bullet points
- Do NOT add information not present in the material

Study material:
${content}
`,

  quiz: (content: string) => `
You are an AI study assistant.

Task: Generate a short quiz based ONLY on the study material below.

Requirements:
- Generate 5 questions
- Mix conceptual and factual questions
- Each question has 4 options (A-D)
- Clearly state the correct answer
- Add a one-sentence explanation per answer
- Do NOT use information outside the material

Study material:
${content}
`,
};

export type Mode = keyof typeof prompts;