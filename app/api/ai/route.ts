import { Mode, prompts } from '@/lib/prompts';
import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, content } = body as { mode: Mode; content: string };

    // --- Validation ---
    if (!mode || !(mode in prompts)) {
      return NextResponse.json(
        { success: false, error: 'Invalid mode selected.' },
        { status: 400 }
      );
    }

    if (!content || !content.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please enter some content first.' },
        { status: 400 }
      );
    }

    if (content.trim().length < 20) {
      return NextResponse.json(
        { success: false, error: 'Please enter at least 20 characters.' },
        { status: 400 }
      );
    }

    if (content.length > 10000) {
      return NextResponse.json(
        { success: false, error: 'Content is too long (max 10,000 characters).' },
        { status: 400 }
      );
    }

    // --- Build prompt & call LLM ---
    const prompt = prompts[mode](content);
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Gemini API key is not configured.' },
        { status: 500 }
      );
    }

    const gemini = new GoogleGenAI({ apiKey });

    const response = await gemini.models.generateContent({
      model: 'gemini-3.1-flash-lite-preview',
      contents: prompt,
    });

    const result = response.text ?? '';

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error('AI route error:', err);
    return NextResponse.json(
      { success: false, error: 'Something went wrong while generating your response. Please try again.' },
      { status: 500 }
    );
  }
}