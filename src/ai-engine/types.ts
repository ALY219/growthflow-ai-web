/* ───────────────────────────────────────────────────────────────
   AI Engine — Shared Types, Enums & Interfaces
   ─────────────────────────────────────────────────────────────── */

// ── AI Provider Identity ──
export type AIProviderId = 'gemini' | 'openai' | 'claude' | 'deepseek' | 'grok' | 'custom'

export const AI_PROVIDER_LABELS: Record<AIProviderId, string> = {
  gemini: 'Google Gemini',
  openai: 'OpenAI',
  claude: 'Anthropic Claude',
  deepseek: 'DeepSeek',
  grok: 'Grok',
  custom: 'Custom Provider',
}

export interface AIProviderMeta {
  id: AIProviderId
  label: string
  models: string[]
  supportsStreaming: boolean
  supportsVision: boolean
}

// ── Generation Lifecycle ──
export type GenerationStatus =
  | 'pending'
  | 'queued'
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled'

export const GENERATION_STATUS_LABELS: Record<GenerationStatus, string> = {
  pending: 'Pending',
  queued: 'Queued',
  running: 'Running',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
}

export const terminalStatuses: Set<GenerationStatus> = new Set([
  'completed',
  'failed',
  'cancelled',
])

export const activeStatuses: Set<GenerationStatus> = new Set([
  'pending',
  'queued',
  'running',
])

export function isTerminalStatus(s: GenerationStatus): boolean {
  return terminalStatuses.has(s)
}

export function isActiveStatus(s: GenerationStatus): boolean {
  return activeStatuses.has(s)
}

// ── Generation Output Types ──
export type GenerationOutputType =
  | 'website'
  | 'blueprint'
  | 'database'
  | 'api'
  | 'deployment'

export const GENERATION_OUTPUT_LABELS: Record<GenerationOutputType, string> = {
  website: 'Website',
  blueprint: 'Blueprint',
  database: 'Database',
  api: 'API',
  deployment: 'Deployment',
}

// ── Generation Error ──
export interface GenerationError {
  code: GenerationErrorCode
  message: string
  details?: Record<string, unknown>
  timestamp: string
}

export type GenerationErrorCode =
  | 'VALIDATION_FAILED'
  | 'PROVIDER_UNAVAILABLE'
  | 'PROVIDER_TIMEOUT'
  | 'PROVIDER_RATE_LIMITED'
  | 'PROVIDER_AUTH_FAILED'
  | 'PROVIDER_INTERNAL_ERROR'
  | 'RESPONSE_PARSE_FAILED'
  | 'OUTPUT_STORAGE_FAILED'
  | 'CANCELLED_BY_USER'
  | 'UNKNOWN_ERROR'

export const GENERATION_ERROR_LABELS: Record<GenerationErrorCode, string> = {
  VALIDATION_FAILED: 'Validation failed',
  PROVIDER_UNAVAILABLE: 'AI provider unavailable',
  PROVIDER_TIMEOUT: 'AI provider timeout',
  PROVIDER_RATE_LIMITED: 'Rate limited by provider',
  PROVIDER_AUTH_FAILED: 'Provider authentication failed',
  PROVIDER_INTERNAL_ERROR: 'Provider internal error',
  RESPONSE_PARSE_FAILED: 'Failed to parse AI response',
  OUTPUT_STORAGE_FAILED: 'Failed to save generation output',
  CANCELLED_BY_USER: 'Cancelled by user',
  UNKNOWN_ERROR: 'Unknown error',
}

// ── Generation Job ──
export interface GenerationJob {
  id: string
  projectId: string
  userId: string
  /** Which output type we are generating */
  outputType: GenerationOutputType
  /** AI provider being used */
  provider: AIProviderId
  /** Provider model identifier */
  model: string
  /** Current lifecycle status */
  status: GenerationStatus
  /** Normalized 0-100 progress */
  progress: number
  /** Current status message (e.g. "Optimizing layout…") */
  statusMessage: string
  /** ISO timestamp when the job entered its current status */
  statusChangedAt: string
  /** The validated prompt payload that was sent */
  promptSnapshot: Record<string, unknown>
  /** Version of the prompt template used */
  promptVersion: string
  /** Executed generation config ID */
  configId: string
  /** Number of retry attempts so far */
  retryCount: number
  /** Max retries allowed */
  maxRetries: number
  /** Error object if failed */
  error: GenerationError | null
  /** ISO timestamp */
  createdAt: string
  /** ISO timestamp */
  updatedAt: string
  /** ISO timestamp of when execution started */
  startedAt: string | null
  /** ISO timestamp of when execution completed */
  completedAt: string | null
  /** Duration in ms */
  executionDurationMs: number | null
}

// ── Generation Output ──
export interface GenerationOutput {
  id: string
  jobId: string
  projectId: string
  userId: string
  outputType: GenerationOutputType
  provider: AIProviderId
  /** The structured output payload (depends on outputType) */
  data: Record<string, unknown>
  /** Raw provider response for debugging */
  rawResponse: string | null
  /** Token usage if reported by provider */
  tokenUsage: TokenUsage | null
  createdAt: string
}

export interface TokenUsage {
  promptTokens: number
  completionTokens: number
  totalTokens: number
}

// ── Generation Metadata ──
export interface GenerationMetadata {
  jobId: string
  provider: AIProviderId
  model: string
  outputType: GenerationOutputType
  status: GenerationStatus
  promptVersion: string
  executionDurationMs: number | null
  retryCount: number
  error: GenerationError | null
  createdAt: string
}

// ── History Entry ──
export interface HistoryEntry {
  id: string
  jobId: string
  projectId: string
  userId: string
  outputType: GenerationOutputType
  provider: AIProviderId
  model: string
  /** Snapshot of status at this point in time */
  status: GenerationStatus
  message: string
  metadata: GenerationMetadata
  timestamp: string
}

// ── Prompt Payload ──
export interface PromptPayload {
  /** System-level instruction */
  system: string
  /** User-facing prompt */
  user: string
  /** Structured context (config, project data) */
  context: Record<string, unknown>
  /** Output schema/format instruction */
  outputFormat: string
  /** Examples for few-shot prompting */
  examples?: PromptExample[]
  /** Extra provider-specific params */
  options: PromptOptions
}

export interface PromptExample {
  input: string
  output: string
}

export interface PromptOptions {
  temperature?: number
  maxTokens?: number
  topP?: number
  frequencyPenalty?: number
  presencePenalty?: number
  stopSequences?: string[]
}

// ── Validation ──
export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}

// ── Provider Interface (abstract) ──
export interface AIProviderConfig {
  id: AIProviderId
  apiKey: string
  baseUrl?: string
  defaultModel: string
  models: string[]
}

export interface GenerationRequest {
  prompt: PromptPayload
  model: string
  signal?: AbortSignal
}

export interface GenerationResponse {
  text: string
  tokenUsage: TokenUsage | null
  model: string
  finishReason: string
}

export interface StreamingGenerationResponse {
  /** Async iterator-like interface for token-by-token streaming */
  [Symbol.asyncIterator](): AsyncIterator<string>
  /** Abort the stream */
  abort(): void
}

export interface AIProvider {
  readonly id: AIProviderId
  readonly config: AIProviderConfig

  /** Generate a complete response */
  generate(request: GenerationRequest): Promise<GenerationResponse>
  /** Stream a response token-by-token */
  stream(request: GenerationRequest): Promise<StreamingGenerationResponse>
  /** Health check */
  healthCheck(): Promise<boolean>
}

// ── Provider Registry ──
export interface ProviderRegistration {
  provider: AIProvider
  registeredAt: string
  isDefault: boolean
}

// ── Generation Queue ──
export interface QueueItem {
  job: GenerationJob
  priority: number
  enqueuedAt: string
}

// ── Generation Config (for prompt builder input) ──
export interface AIGenerationConfig {
  projectId: string
  outputType: GenerationOutputType
  provider: AIProviderId
  model?: string
  maxRetries?: number
  promptOptions?: PromptOptions
}

// ── Event Types (for reactive subscribers) ──
export type GenerationEvent =
  | { type: 'STATUS_CHANGED'; jobId: string; status: GenerationStatus; previousStatus: GenerationStatus }
  | { type: 'PROGRESS'; jobId: string; progress: number; message: string }
  | { type: 'ERROR'; jobId: string; error: GenerationError }
  | { type: 'COMPLETED'; jobId: string; output: GenerationOutput }
  | { type: 'CANCELLED'; jobId: string }
  | { type: 'STREAMING_TOKEN'; jobId: string; token: string }
  | { type: 'STREAMING_DONE'; jobId: string }

export type GenerationEventHandler = (event: GenerationEvent) => void

// ── Developer Panel ──
export interface DebugLogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warn' | 'error' | 'debug'
  jobId?: string
  provider?: AIProviderId
  message: string
  data?: Record<string, unknown>
}

export interface DeveloperPanelState {
  isOpen: boolean
  activeJobId: string | null
  logs: DebugLogEntry[]
  selectedProvider: AIProviderId | null
}
