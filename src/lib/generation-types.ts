/* ─────────────────────────────────────────────
   Generation Configuration Types
   Shared types for AI website generation wizard.
   Extensible for future AI integrations.
   ───────────────────────────────────────────── */

// ── Step 1: Business Information ──
export type BusinessCategory =
  | 'technology'
  | 'ecommerce'
  | 'healthcare'
  | 'education'
  | 'finance'
  | 'portfolio'
  | 'restaurant'
  | 'agency'
  | 'other'

export type WebsiteGoal =
  | 'sell-products'
  | 'generate-leads'
  | 'portfolio'
  | 'landing-page'
  | 'business-website'
  | 'saas'

// ── Step 2: Brand Identity ──
export type ThemeMode = 'dark' | 'light' | 'auto'

export type PreferredStyle =
  | 'apple'
  | 'stripe'
  | 'notion'
  | 'linear'
  | 'modern-startup'
  | 'minimal'
  | 'bold'
  | 'elegant'

// ── Step 3: Website Structure ──
export type WebsiteSection =
  | 'hero'
  | 'features'
  | 'pricing'
  | 'testimonials'
  | 'about'
  | 'faq'
  | 'contact'
  | 'blog'
  | 'newsletter'
  | 'footer'

// ── Step 4: Target Audience ──
export type TargetAudience =
  | 'students'
  | 'businesses'
  | 'developers'
  | 'creators'
  | 'startups'
  | 'enterprise'
  | 'other'

export type Tone =
  | 'professional'
  | 'friendly'
  | 'luxury'
  | 'minimal'
  | 'playful'
  | 'corporate'

// ── Step 5: Advanced Options ──
export type AdvancedOption =
  | 'seo'
  | 'accessibility'
  | 'responsive-design'
  | 'dark-mode'
  | 'animations'
  | 'performance'
  | 'auth-ready'
  | 'database-ready'

// ── Full Generation Configuration ──
export interface GenerationConfig {
  // Step 1
  businessName: string
  businessDescription: string
  businessCategory: BusinessCategory | ''
  websiteGoal: WebsiteGoal | ''

  // Step 2
  theme: ThemeMode
  primaryColor: string
  accentColor: string
  preferredStyle: PreferredStyle | ''

  // Step 3
  sections: WebsiteSection[]

  // Step 4
  targetAudiences: TargetAudience[]
  tone: Tone | ''

  // Step 5
  advancedOptions: AdvancedOption[]
}

// ── Generation Job (saved to DB) ──
export interface GenerationJob {
  id: string
  projectId: string
  userId: string
  config: GenerationConfig
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  generationType: 'website'
  createdAt: string
  updatedAt: string
}

// ── Label maps for display ──
export const BUSINESS_CATEGORY_LABELS: Record<BusinessCategory, string> = {
  technology: 'Technology',
  ecommerce: 'Ecommerce',
  healthcare: 'Healthcare',
  education: 'Education',
  finance: 'Finance',
  portfolio: 'Portfolio',
  restaurant: 'Restaurant',
  agency: 'Agency',
  other: 'Other',
}

export const WEBSITE_GOAL_LABELS: Record<WebsiteGoal, string> = {
  'sell-products': 'Sell Products',
  'generate-leads': 'Generate Leads',
  portfolio: 'Portfolio',
  'landing-page': 'Landing Page',
  'business-website': 'Business Website',
  saas: 'SaaS',
}

export const PREFERRED_STYLE_LABELS: Record<PreferredStyle, string> = {
  apple: 'Apple',
  stripe: 'Stripe',
  notion: 'Notion',
  linear: 'Linear',
  'modern-startup': 'Modern Startup',
  minimal: 'Minimal',
  bold: 'Bold',
  elegant: 'Elegant',
}

export const WEBSITE_SECTION_LABELS: Record<WebsiteSection, string> = {
  hero: 'Hero',
  features: 'Features',
  pricing: 'Pricing',
  testimonials: 'Testimonials',
  about: 'About',
  faq: 'FAQ',
  contact: 'Contact',
  blog: 'Blog',
  newsletter: 'Newsletter',
  footer: 'Footer',
}

export const TARGET_AUDIENCE_LABELS: Record<TargetAudience, string> = {
  students: 'Students',
  businesses: 'Businesses',
  developers: 'Developers',
  creators: 'Creators',
  startups: 'Startups',
  enterprise: 'Enterprise',
  other: 'Other',
}

export const TONE_LABELS: Record<Tone, string> = {
  professional: 'Professional',
  friendly: 'Friendly',
  luxury: 'Luxury',
  minimal: 'Minimal',
  playful: 'Playful',
  corporate: 'Corporate',
}

export const ADVANCED_OPTION_LABELS: Record<AdvancedOption, string> = {
  seo: 'SEO Optimization',
  accessibility: 'Accessibility',
  'responsive-design': 'Responsive Design',
  'dark-mode': 'Dark Mode',
  animations: 'Animations',
  performance: 'Performance Optimization',
  'auth-ready': 'Authentication Ready',
  'database-ready': 'Database Ready',
}

// ── Default config ──
export function createDefaultConfig(): GenerationConfig {
  return {
    businessName: '',
    businessDescription: '',
    businessCategory: '',
    websiteGoal: '',

    theme: 'dark',
    primaryColor: '#3B82F6',
    accentColor: '#8B5CF6',
    preferredStyle: '',

    sections: [],

    targetAudiences: [],
    tone: '',

    advancedOptions: [],
  }
}

// ── Step definitions for the wizard ──
export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6 // 6 = review

export const STEP_LABELS: Record<WizardStep, string> = {
  1: 'Business Information',
  2: 'Brand Identity',
  3: 'Website Structure',
  4: 'Target Audience',
  5: 'Advanced Options',
  6: 'Review',
}

export const TOTAL_STEPS = 6
