import { GeminiProvider, type AIProvider } from '@/ai-engine/gemini-provider'
import { buildPrompt } from '@/ai-engine/prompt-builder'
import { parseBlueprintResponse, type ParseResult } from '@/ai-engine/response-parser'
import type { GenerationConfig, GenerationError, WebsiteBlueprint } from '@/lib/generation-types'

/* ── AI Service ──
   Orchestrates the AI generation pipeline:
   1. Build prompt from wizard config
   2. Call the active provider
   3. Parse and validate the response
   4. Return a structured blueprint or error

   Providers are swappable — register a new AIProvider implementation
   in the provider registry below. */

export type ProviderName = 'gemini'

const providers: Record<ProviderName, AIProvider> = {
  gemini: new GeminiProvider(),
}

let activeProvider: ProviderName = 'gemini'

export function setProvider(name: ProviderName) {
  activeProvider = name
}

export function getProviderName(): ProviderName {
  return activeProvider
}

export type GenerationResult =
  | { ok: true; blueprint: WebsiteBlueprint; rawText: string }
  | { ok: false; error: GenerationError }

export async function generateBlueprint(
  config: GenerationConfig,
): Promise<GenerationResult> {
  const provider = providers[activeProvider]
  const prompt = buildPrompt(config)

  const result = await provider.generate(prompt)

  if ('error' in result) {
    return { ok: false, error: result.error }
  }

  const parsed: ParseResult = parseBlueprintResponse(result.text)

  if (!parsed.ok) {
    return { ok: false, error: parsed.error }
  }

  return { ok: true, blueprint: parsed.blueprint, rawText: result.text }
}
