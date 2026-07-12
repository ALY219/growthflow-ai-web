/* ──────────────────────────────────────────────────────────────
   AI Engine — Shared Types, Enums & Interfaces
   GrowthFlow AI · Multi-provider architecture foundation.

   NEVER depends on a single LLM. Every provider plugs in here.
   ────────────────────────────────────────────────────────────── */

// ─── Generation Output Types ───
export type GenerationOutputType = 'website' | 'blueprint' | 'database' | 'api' | 'deployment'

// ─── Generation Status ───
export type GenerationStatus =
  | 'queued'
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'retrying'

// ─── Generation Event (for streaming / progress) ───
export interface GenerationEvent {
  id: string
  jobId: string
  type: 'status' | 'progress' | 'chunk' | 'error' | 'done'
  message: string
  progress?: number // 0-100
  timestamp: string
}

// ─── Prompt Version ───
export interface PromptVersion {
  id: string
  name: string
  template: string // template string with {{placeholders}}
  version: number
  createdAt: string
  outputType: GenerationOutputType
  variables: PromptVariable[]
}

export interface PromptVariable {
  key: string
  label: string
  type: 'string' | 'string[]' | 'object'
  required: boolean
  description?: string
}

// ─── AI Provider Interface ───
export type ProviderId = 'gemini' | 'openai' | 'claude' | 'deepseek' | 'grok' | 'custom'

export interface ProviderConfig {
  id: ProviderId
  name: string
  enabled: boolean
  apiKey: string
  baseUrl?: string
  model: string
  maxTokens: number
  temperature: number
  topP: number
  timeoutMs: number
  maxRetries: number
  headers?: Record<string, string>
}

// ─── AI Prompt Payload ───
export interface AIPromptPayload {
  /** The system-level instruction for the model */
  system: string
  /** The user-level prompt with compiled variables */
  user: string
  /** Optional conversation context / history */
  context?: AIConversationTurn[]
  /** Generation parameters */
  params: AIGenerationParams
  /** Metadata for tracing */
  metadata: PromptMetadata
}

export interface AIConversationTurn {
  role: 'user' | 'assistant'
  content: string
}

export interface AIGenerationParams {
  model: string
  maxTokens: number
  temperature: number
  topP: number
  responseFormat?: 'text' | 'json'
}

export interface PromptMetadata {
  promptVersionId: string
  promptVersion: number
  outputType: GenerationOutputType
  createdAt: string
}

// ─── AI Provider Response ───
export interface AIProviderResponse {
  /** Raw text output from the provider */
  raw: string
  /** Token usage breakdown */
  usage: AIUsage
  /** How long the provider took (ms) */
  latencyMs: number
  /** Provider-specific metadata */
  providerMeta?: Record<string, unknown>
}

export interface AIUsage {
  promptTokens: number
  completionTokens: number
  totalTokens: number
}

// ─── Generation Output Models ───
// Every provider maps its raw response into one of these models.

export interface WebsiteOutput {
  type: 'website'
  title: string
  description: string
  pages: WebsitePage[]
  styles: WebsiteStyles
  seo: SEOMetadata
  assets: AssetReference[]
}

export interface WebsitePage {
  id: string
  slug: string
  title: string
  sections: PageSection[]
}

export interface PageSection {
  type: string // e.g. 'hero', 'features', 'cta'
  content: string // HTML / markdown
  order: number
}

export interface WebsiteStyles {
  colorPalette: Record<string, string>
  fonts: { heading: string; body: string }
  radius: string
  spacing: string
}

export interface SEOMetadata {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
}

export interface AssetReference {
  type: 'image' | 'icon' | 'font'
  url: string
  alt?: string
}

export interface BlueprintOutput {
  type: 'blueprint'
  productName: string
  overview: string
  architecture: ArchitectureDiagram
  features: BlueprintFeature[]
  techStack: TechStackRecommendation
  roadmap: Milestone[]
  constraints: string[]
}

export interface ArchitectureDiagram {
  type: 'monolith' | 'microservices' | 'serverless' | 'hybrid'
  description: string
  components: ArchitectureComponent[]
}

export interface ArchitectureComponent {
  name: string
  type: 'frontend' | 'backend' | 'database' | 'cache' | 'queue' | 'storage' | 'cdn' | 'api-gateway'
  description: string
  dependencies: string[]
}

export interface BlueprintFeature {
  id: string
  name: string
  description: string
  priority: 'P0' | 'P1' | 'P2' | 'P3'
  effort: 'S' | 'M' | 'L' | 'XL'
  dependencies: string[]
}

export interface TechStackRecommendation {
  frontend: TechOption[]
  backend: TechOption[]
  database: TechOption[]
  infrastructure: TechOption[]
  rationale: string
}

export interface TechOption {
  name: string
  description: string
  pros: string[]
  cons: string[]
  recommended: boolean
}

export interface Milestone {
  phase: string
  title: string
  description: string
  estimate: string
  deliverables: string[]
}

export interface DatabaseOutput {
  type: 'database'
  tables: DBTable[]
  relationships: DBRelationship[]
  indexes: DBIndex[]
  migrations: DBMigration[]
}

export interface DBTable {
  name: string
  description: string
  columns: DBColumn[]
}

export interface DBColumn {
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
  unique: boolean
  defaultValue?: string
  references?: { table: string; column: string }
}

export interface DBRelationship {
  from: { table: string; column: string }
  to: { table: string; column: string }
  type: 'one-to-one' | 'one-to-many' | 'many-to-many'
}

export interface DBIndex {
  table: string
  columns: string[]
  unique: boolean
}

export interface DBMigration {
  version: number
  description: string
  sql: string
}

export interface APIOutput {
  type: 'api'
  title: string
  description: string
  baseUrl: string
  version: string
  endpoints: APIEndpoint[]
  auth: APIAuthConfig
  schemas: APISchema[]
}

export interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  description: string
  auth: boolean
  request?: APISchema
  response?: APISchema
}

export interface APIAuthConfig {
  type: 'bearer' | 'api-key' | 'oauth2' | 'session' | 'none'
  description: string
}

export interface APISchema {
  type: 'object' | 'array'
  properties?: Record<string, APISchemaProperty>
  items?: APISchema
  required?: string[]
}

export interface APISchemaProperty {
  type: string
  description?: string
  format?: string
  nullable?: boolean
  enum?: string[]
}

export interface DeploymentOutput {
  type: 'deployment'
  provider: string
  configuration: DeploymentConfig
  ciCdi: CICDIPipeline
  environmentVariables: EnvironmentVariable[]
  scaling: ScalingConfig
  monitoring: MonitoringConfig
}

export interface DeploymentConfig {
  region: string
  compute: string
  memory: string
  storage: string
  domains: string[]
}

export interface CICDIPipeline {
  provider: string
  buildCommand: string
  testCommand: string
  deployCommand: string
  branches: { name: string; environment: string }[]
}

export interface EnvironmentVariable {
  key: string
  description: string
  secret: boolean
  defaultValue?: string
}

export interface ScalingConfig {
  minInstances: number
  maxInstances: number
  targetCPU: number
  autoScale: boolean
}

export interface MonitoringConfig {
  provider: string
  metrics: string[]
  alerts: MonitoringAlert[]
}

export interface MonitoringAlert {
  name: string
  condition: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  channel: 'email' | 'slack' | 'webhook'
}

// ─── Generation Job ───
export interface GenerationJob {
  id: string
  projectId: string
  userId: string
  type: GenerationOutputType
  status: GenerationStatus
  provider: ProviderId
  promptPayload: AIPromptPayload | null
  response: AIProviderResponse | null
  output: GenerationOutput | null
  error: string | null
  executionTimeMs: number | null
  attempts: number
  maxAttempts: number
  events: GenerationEvent[]
  promptVersionId: string | null
  promptVersion: number | null
  createdAt: string
  updatedAt: string
  startedAt: string | null
  completedAt: string | null
}

export type GenerationOutput =
  | WebsiteOutput
  | BlueprintOutput
  | DatabaseOutput
  | APIOutput
  | DeploymentOutput

// ─── Generation Queue Item ───
export interface GenerationQueueItem {
  jobId: string
  projectId: string
  userId: string
  type: GenerationOutputType
  priority: number
  createdAt: string
}

// ─── Validation ───
export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}

export interface ValidationError {
  field: string
  message: string
  severity: 'error' | 'warning'
}

// ─── History ───
export interface GenerationHistoryEntry {
  id: string
  jobId: string
  projectId: string
  userId: string
  type: GenerationOutputType
  status: GenerationStatus
  provider: ProviderId
  promptVersionId: string | null
  executionTimeMs: number | null
  attemptNumber: number
  createdAt: string
}

// ─── Provider Registration ───
export interface ProviderRegistration {
  id: ProviderId
  name: string
  description: string
  models: string[]
  defaultModel: string
  enabled: boolean
}
