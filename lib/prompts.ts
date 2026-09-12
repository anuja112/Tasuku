export const prompts = {
  summarize: (content: string) => `
You are an AI study assistant helping a college student.

Task: Summarize the study material below into a structured format.

Requirements:
- Provide a brief overview (2-3 sentences)
- List 3-5 key points as bullet points
- Highlight 2-3 important concepts
- Add a quick revision note
- Keep it concise and preserve technical terms
- Use simple language
- Do NOT add information not present in the material

Return your response as valid JSON in this exact format:
{
  "overview": "Brief 2-3 sentence summary",
  "keyPoints": ["Point 1", "Point 2", "Point 3"],
  "importantConcepts": ["Concept 1", "Concept 2"],
  "quickRevision": "One key takeaway for quick revision"
}

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

Return this exact JSON structure:

{
  "questions": [
    {
      "question": "Question text",
      "options": {
        "A": "Option A",
        "B": "Option B",
        "C": "Option C",
        "D": "Option D"
      },
      "correctAnswer": "B",
      "explanation": "Why B is correct."
    }
  ]
}

IMPORTANT:
Return ONLY valid JSON.
Do not use markdown.
Do not wrap the JSON in code fences.
Do not include any introductory or concluding text.

Study material:
${content}
`,

  improve: (content: string) => `
You are an AI study assistant helping students improve their answers.

Task: Analyze the student's answer and provide an improved version.

Requirements:
- Keep the core ideas from the original
- Improve clarity, structure, and academic tone
- Add relevant details where appropriate
- Fix any errors or unclear statements
- Highlight what specifically improved (2-4 points)
- Keep it concise and student-appropriate

Return your response as valid JSON in this exact format:
{
  "original": "Repeat the original answer here",
  "improved": "The improved version of the answer",
  "improvements": ["What improved 1", "What improved 2", "What improved 3"]
}

Student's answer:
${content}
`,

  explain: (content: string) => `
You are an AI study assistant explaining topics to college students.

Task: Explain the topic in a clear, structured way.

Requirements:
- Start with a simple explanation (2-3 sentences)
- Provide a relatable analogy or example in a "Think of it like this" section
- End with a key definition or takeaway
- Use simple, clear language
- Make it memorable and easy to understand

Return your response as valid JSON in this exact format:
{
  "simpleExplanation": "Clear 2-3 sentence explanation of the topic",
  "analogy": "A relatable real-world example or analogy",
  "keyTakeaway": "One sentence definition or key point to remember"
}

Topic to explain:
${content}
`,
};

export type Mode = keyof typeof prompts;