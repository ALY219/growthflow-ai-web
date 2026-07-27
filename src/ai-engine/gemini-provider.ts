import type { GenerationError } from '@/lib/generation-types'

/* ── AI Provider Interface ──
   Modular provider architecture. Each provider implements this interface.
   To add a new provider (OpenAI, Claude, DeepSeek), create a new file that
   exports a class implementing AIProvider and register it in ai-service.ts. */

export interface AIProvider {
  readonly name: string
  generate(prompt: string): Promise<{ text: string } | { error: GenerationError }>
}

/* ── Gemini Provider ──
   Calls Google's Gemini API via a Supabase Edge Function proxy.
   The edge function holds the API key securely server-side.
   The frontend never sees or sends the API key. */

const EDGE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gemini-generate`
const TIMEOUT_MS = 60_000

export class GeminiProvider implements AIProvider {
  readonly name = 'gemini'

  async generate(prompt: string): Promise<{ text: string } | { error: GenerationError }> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

    try {
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        return { error: classifyHttpError(response.status, await safeReadError(response)) }
      }

      const data = await response.json()
      if (!data || typeof data.text !== 'string') {
        return {
          error: {
            type: 'malformed_json',
            message: 'The edge function returned an unexpected response format.',
          },
        }
      }

      return { text: data.text }
    } catch (err) {
      clearTimeout(timeoutId)
      if (err instanceof DOMException && err.name === 'AbortError') {
        return {
          error: {
            type: 'timeout',
            message: 'The request timed out. The AI provider took too long to respond.',
          },
        }
      }
      if (err instanceof TypeError && err.message.includes('fetch')) {
        return {
          error: {
            type: 'network',
            message: 'Network error. Please check your internet connection and try again.',
          },
        }
      }
      return {
        error: {
          type: 'unknown',
          message: err instanceof Error ? err.message : 'An unexpected error occurred.',
        },
      }
    }
  }
}

function classifyHttpError(status: number, errorBody: string): GenerationError {
  if (status === 401 || status === 403) {
    return {
      type: 'invalid_api_key',
      message: 'The Gemini API key is invalid or not configured. Please contact support.',
    }
  }
  if (status === 429) {
    return {
      type: 'rate_limit',
      message: 'The AI provider rate limit has been reached. Please wait a moment and try again.',
    }
  }
  if (status >= 500) {
    return {
      type: 'unknown',
      message: `The AI provider returned a server error (${status}). ${errorBody}`,
    }
  }
  return {
    type: 'unknown',
    message: `Request failed with status ${status}. ${errorBody}`,
  }
}

async function safeReadError(response: Response): Promise<string> {
  try {
    const body = await response.json()
    return body?.error ?? body?.message ?? JSON.stringify(body)
  } catch {
    return response.statusText
  }
}
