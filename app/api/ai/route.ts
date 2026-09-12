import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { prompts, type Mode } from '@/lib/prompts';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, content } = body as { mode: Mode; content: string };

    // Validation
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

    //Build prompt & call Gemini 
    const prompt = prompts[mode](content);

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
    });

    const result = response.text ?? '';

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'The AI did not return a response. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error('AI route error:', err);
    return NextResponse.json(
      { success: false, error: 'Something went wrong while generating your response. Please try again.' },
      { status: 500 }
    );
  }
}
