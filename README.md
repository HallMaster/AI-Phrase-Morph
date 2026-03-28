# AI Phrase Morph

This application along with this description were built with the assistance of Claude AI.

The application can be viewed here: https://ai-phrase-morph.vercel.app/

A web app that rewrites your text in different styles using Google's Gemini AI. It is hosted via Vercel.

## Styles

- **Haiku** — condenses your text into a 5-7-5 haiku
- **Shakespearean** — rewrites it in Early Modern English
- **Rhyme** — turns it into a rhyming version
- **News Headline** — punchy, journalistic headline
- **Like I'm Five** — simplifies it for easy understanding

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [Google Gemini AI](https://ai.google.dev/) via `@google/generative-ai`

## How it works

The frontend sends your text and chosen style to a Next.js API route (`/api/transform`), which calls the Gemini 2.0 Flash model and returns the transformed result. Your API key is never exposed to the browser.
