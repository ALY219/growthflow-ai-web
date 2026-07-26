/* ─────────────────────────────────────────────
   Generation Configuration Types
   Shared types for the Website Generator Wizard.
   Extensible for future AI integrations (Gemini, OpenAI, Claude, etc.).
   ───────────────────────────────────────────── */

// ── Step 1: Business Information ──
export type Industry =
  | 'technology'
  | 'ecommerce'
  | 'healthcare'
  | 'education'
  | 'finance'
  | 'portfolio'
  | 'restaurant'
  | 'agency'
  | 'fitness'
  | 'ai'
  | 'other'

export type WebsiteGoal =
  | 'sell-products'
  | 'generate-leads'
  | 'portfolio'
  | 'landing-page'
  | 'business-website'
  | 'saas'

// ── Step 2: Target Audience ──
export type CustomerType = 'b2b' | 'b2c' | 'both'

export type BusinessStage =
  | 'idea'
  | 'pre-seed'
  | 'seed'
  | 'series-a'
  | 'growth'
  | 'established'

export type AgeGroup =
  | 'under-18'
  | '18-24'
  | '25-34'
  | '35-44'
  | '45-54'
  | '55-64'
  | '65-plus'

// ── Step 3: Website Style ──
export type DesignStyle =
  | 'modern'
  | 'minimal'
  | 'luxury'
  | 'corporate'
  | 'startup'
  | 'creative'
  | 'dark'
  | 'light'

// ── Step 4: Website Structure ──
export type StandardPage =
  | 'home'
  | 'about'
  | 'services'
  | 'pricing'
  | 'portfolio'
  | 'blog'
  | 'faq'
  | 'contact'
  | 'privacy-policy'
  | 'terms'

export interface CustomPage {
  id: string
  name: string
}

// ── Step 5: Features ──
export type WebsiteFeature =
  | 'contact-form'
  | 'newsletter'
  | 'booking'
  | 'testimonials'
  | 'gallery'
  | 'analytics'
  | 'live-chat'
  | 'authentication'
  | 'dashboard'
  | 'cms-ready'

// ── Full Generation Configuration ──
export interface GenerationConfig {
  // Step 1 — Business Information
  businessName: string
  tagline: string
  businessDescription: string
  industry: Industry | ''
  country: string
  websiteGoal: WebsiteGoal | ''

  // Step 2 — Target Audience
  primaryAudience: string
  customerType: CustomerType | ''
  businessStage: BusinessStage | ''
  targetAgeGroup: AgeGroup | ''
  targetCountries: string

  // Step 3 — Website Style
  designStyle: DesignStyle | ''
  primaryColor: string
  secondaryColor: string
  accentColor: string

  // Step 4 — Website Structure
  pages: StandardPage[]
  customPages: CustomPage[]

  // Step 5 — Features
  features: WebsiteFeature[]
}

// ── Label maps for display ──
export const INDUSTRY_LABELS: Record<Industry, string> = {
  technology: 'Technology',
  ecommerce: 'Ecommerce',
  healthcare: 'Healthcare',
  education: 'Education',
  finance: 'Finance',
  portfolio: 'Portfolio',
  restaurant: 'Restaurant',
  agency: 'Agency',
  fitness: 'Fitness',
  ai: 'AI',
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

export const CUSTOMER_TYPE_LABELS: Record<CustomerType, string> = {
  b2b: 'B2B',
  b2c: 'B2C',
  both: 'Both',
}

export const BUSINESS_STAGE_LABELS: Record<BusinessStage, string> = {
  idea: 'Idea',
  'pre-seed': 'Pre-Seed',
  seed: 'Seed',
  'series-a': 'Series A',
  growth: 'Growth',
  established: 'Established',
}

export const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  'under-18': 'Under 18',
  '18-24': '18–24',
  '25-34': '25–34',
  '35-44': '35–44',
  '45-54': '45–54',
  '55-64': '55–64',
  '65-plus': '65+',
}

export const DESIGN_STYLE_LABELS: Record<DesignStyle, string> = {
  modern: 'Modern',
  minimal: 'Minimal',
  luxury: 'Luxury',
  corporate: 'Corporate',
  startup: 'Startup',
  creative: 'Creative',
  dark: 'Dark',
  light: 'Light',
}

export const STANDARD_PAGE_LABELS: Record<StandardPage, string> = {
  home: 'Home',
  about: 'About',
  services: 'Services',
  pricing: 'Pricing',
  portfolio: 'Portfolio',
  blog: 'Blog',
  faq: 'FAQ',
  contact: 'Contact',
  'privacy-policy': 'Privacy Policy',
  terms: 'Terms',
}

export const FEATURE_LABELS: Record<WebsiteFeature, string> = {
  'contact-form': 'Contact Form',
  newsletter: 'Newsletter',
  booking: 'Booking',
  testimonials: 'Testimonials',
  gallery: 'Gallery',
  analytics: 'Analytics',
  'live-chat': 'Live Chat',
  authentication: 'Authentication',
  dashboard: 'Dashboard',
  'cms-ready': 'CMS Ready',
}

// ── Default config ──
export function createDefaultConfig(): GenerationConfig {
  return {
    businessName: '',
    tagline: '',
    businessDescription: '',
    industry: '',
    country: '',
    websiteGoal: '',

    primaryAudience: '',
    customerType: '',
    businessStage: '',
    targetAgeGroup: '',
    targetCountries: '',

    designStyle: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#EC4899',

    pages: [],
    customPages: [],

    features: [],
  }
}

// ── Step definitions for the wizard ──
export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6 // 6 = review

export const STEP_LABELS: Record<WizardStep, string> = {
  1: 'Business Information',
  2: 'Target Audience',
  3: 'Website Style',
  4: 'Website Structure',
  5: 'Features',
  6: 'Review',
}

export const TOTAL_STEPS = 6
