import type { WebsiteBlueprint, BlueprintSection, BlueprintPage, ColorPalette } from '@/lib/generation-types'
import type { GenerationError } from '@/lib/generation-types'

/* ── Response Parser ──
   Validates and parses the AI provider's response into a WebsiteBlueprint.
   Handles malformed JSON gracefully and returns structured errors. */

export type ParseResult =
  | { ok: true; blueprint: WebsiteBlueprint }
  | { ok: false; error: GenerationError }

export function parseBlueprintResponse(rawText: string): ParseResult {
  if (!rawText || rawText.trim().length === 0) {
    return {
      ok: false,
      error: { type: 'malformed_json', message: 'The AI returned an empty response.' },
    }
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(rawText)
  } catch {
    const extracted = extractJsonFromText(rawText)
    if (!extracted) {
      return {
        ok: false,
        error: {
          type: 'malformed_json',
          message: 'The AI response was not valid JSON and no JSON block could be extracted.',
        },
      }
    }
    try {
      parsed = JSON.parse(extracted)
    } catch {
      return {
        ok: false,
        error: {
          type: 'malformed_json',
          message: 'The AI response contained malformed JSON that could not be parsed.',
        },
      }
    }
  }

  return validateBlueprint(parsed)
}

function extractJsonFromText(text: string): string | null {
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (codeBlockMatch?.[1]) return codeBlockMatch[1].trim()

  const firstBrace = text.indexOf('{')
  const lastBrace = text.lastIndexOf('}')
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1)
  }
  return null
}

function validateBlueprint(data: unknown): ParseResult {
  if (typeof data !== 'object' || data === null) {
    return {
      ok: false,
      error: { type: 'malformed_json', message: 'The AI response is not a valid object.' },
    }
  }

  const obj = data as Record<string, unknown>

  const siteName = typeof obj.siteName === 'string' ? obj.siteName : ''
  const tagline = typeof obj.tagline === 'string' ? obj.tagline : ''

  if (!siteName) {
    return {
      ok: false,
      error: { type: 'malformed_json', message: 'The blueprint is missing the required "siteName" field.' },
    }
  }

  const sections = normalizeSections(obj.sections)
  const pages = normalizePages(obj.pages)
  const colorPalette = normalizeColorPalette(obj.colorPalette)
  const recommendedFonts = normalizeStringArray(obj.recommendedFonts)
  const designNotes = normalizeStringArray(obj.designNotes)

  return {
    ok: true,
    blueprint: {
      siteName,
      tagline,
      sections,
      pages,
      colorPalette,
      recommendedFonts,
      designNotes,
    },
  }
}

function normalizeSections(raw: unknown): BlueprintSection[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((item) => typeof item === 'object' && item !== null)
    .map((item) => {
      const s = item as Record<string, unknown>
      return {
        title: typeof s.title === 'string' ? s.title : '',
        description: typeof s.description === 'string' ? s.description : '',
      }
    })
    .filter((s) => s.title || s.description)
}

function normalizePages(raw: unknown): BlueprintPage[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((item) => typeof item === 'object' && item !== null)
    .map((item) => {
      const p = item as Record<string, unknown>
      return {
        name: typeof p.name === 'string' ? p.name : '',
        slug: typeof p.slug === 'string' ? p.slug : '',
        sections: normalizeSections(p.sections),
      }
    })
    .filter((p) => p.name)
}

function normalizeColorPalette(raw: unknown): ColorPalette {
  if (typeof raw !== 'object' || raw === null) return {}
  const cp = raw as Record<string, unknown>
  const result: ColorPalette = {}
  if (typeof cp.primary === 'string') result.primary = cp.primary
  if (typeof cp.secondary === 'string') result.secondary = cp.secondary
  if (typeof cp.accent === 'string') result.accent = cp.accent
  if (typeof cp.background === 'string') result.background = cp.background
  if (typeof cp.text === 'string') result.text = cp.text
  return result
}

function normalizeStringArray(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  return raw.filter((item): item is string => typeof item === 'string')
}
