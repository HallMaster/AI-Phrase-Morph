import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const STYLE_PROMPTS = {
  haiku: `Transform the following text into a haiku (3 lines: 5 syllables, 7 syllables, 5 syllables). Preserve the core meaning or subject. Return only the haiku, nothing else.`,

  shakespearean: `Rewrite the following text in the style of William Shakespeare — use Early Modern English (thee, thou, doth, hath, 'tis, etc.), poetic flourishes, and dramatic expression. Preserve the original meaning. Return only the rewritten text, nothing else.`,

    rhyme: `Rewrite the following text so that it rhymes, while retaining the original meaning as closely as possible. Use a consistent rhyme scheme. Return only the rhyming version, nothing else.`,

  headline: `Transform the following text into a punchy, attention-grabbing news headline (or a very short set of headlines if the content warrants it). Use dramatic, journalistic language. Return only the headline(s), nothing else.`,

  eli5: `Rewrite the following text as if you're explaining it to a five-year-old child. Use very simple words, short sentences, and relatable comparisons. Keep it friendly and clear. Return only the simplified text, nothing else.`,
}

export async function POST(request) {
  try {
    const { text, style } = await request.json()

    if (!text || !style) {
      return NextResponse.json(
        { error: 'Missing text or style parameter.' },
        { status: 400 }
      )
    }

    const stylePrompt = STYLE_PROMPTS[style]
    if (!stylePrompt) {
      return NextResponse.json(
        { error: 'Invalid style selected.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured.' },
        { status: 500 }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `${stylePrompt}\n\nText to transform:\n${text}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const transformed = response.text()

    return NextResponse.json({ result: transformed.trim() })
  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json(
      { error: 'Failed to transform text. Please try again.' },
      { status: 500 }
    )
  }
}
