/* ── Generation Wizard Types ── */

export type Industry =
  | 'technology'
  | 'healthcare'
  | 'finance'
  | 'education'
  | 'retail'
  | 'restaurant'
  | 'real-estate'
  | 'marketing'
  | 'consulting'
  | 'fitness'
  | 'beauty'
  | 'legal'
  | 'nonprofit'
  | 'other'

export const INDUSTRY_LABELS: Record<Industry, string> = {
  technology: 'Technology',
  healthcare: 'Healthcare',
  finance: 'Finance',
  education: 'Education',
  retail: 'Retail',
  restaurant: 'Restaurant',
  'real-estate': 'Real Estate',
  marketing: 'Marketing',
  consulting: 'Consulting',
  fitness: 'Fitness',
  beauty: 'Beauty',
  legal: 'Legal',
  nonprofit: 'Nonprofit',
  other: 'Other',
}

export type WebsiteGoal =
  | 'lead-generation'
  | 'online-sales'
  | 'brand-awareness'
  | 'informational'
  | 'booking'
  | 'portfolio'

export const WEBSITE_GOAL_LABELS: Record<WebsiteGoal, string> = {
  'lead-generation': 'Lead Generation',
  'online-sales': 'Online Sales',
  'brand-awareness': 'Brand Awareness',
  informational: 'Informational',
  booking: 'Booking / Appointments',
  portfolio: 'Portfolio',
}

export type CustomerType = 'b2b' | 'b2c' | 'both'

export const CUSTOMER_TYPE_LABELS: Record<CustomerType, string> = {
  b2b: 'B2B (Business to Business)',
  b2c: 'B2C (Business to Consumer)',
  both: 'Both B2B & B2C',
}

export type DesignStyle =
  | 'modern'
  | 'minimal'
  | 'luxury'
  | 'corporate'
  | 'startup'
  | 'creative'
  | 'dark'
  | 'light'

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

export type StandardPage =
  | 'home'
  | 'about'
  | 'services'
  | 'pricing'
  | 'portfolio'
  | 'blog'
  | 'faq'
  | 'contact'
  | 'privacy'
  | 'terms'

export const STANDARD_PAGE_LABELS: Record<StandardPage, string> = {
  home: 'Home',
  about: 'About',
  services: 'Services',
  pricing: 'Pricing',
  portfolio: 'Portfolio',
  blog: 'Blog',
  faq: 'FAQ',
  contact: 'Contact',
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
}

export type Feature =
  | 'contact-form'
  | 'newsletter'
  | 'booking'
  | 'testimonials'
  | 'gallery'
  | 'analytics'
  | 'live-chat'
  | 'auth'
  | 'dashboard'
  | 'cms'

export const FEATURE_LABELS: Record<Feature, string> = {
  'contact-form': 'Contact Form',
  newsletter: 'Newsletter Signup',
  booking: 'Booking System',
  testimonials: 'Testimonials',
  gallery: 'Image Gallery',
  analytics: 'Analytics',
  'live-chat': 'Live Chat',
  auth: 'User Authentication',
  dashboard: 'Dashboard',
  cms: 'CMS / Blog',
}

export interface CustomPage {
  id: string
  name: string
}

export interface BrandColors {
  primary: string
  secondary: string
  accent: string
}

export interface GenerationConfig {
  businessName: string
  tagline: string
  description: string
  industry: Industry
  country: string
  websiteGoal: WebsiteGoal
  primaryAudience: string
  customerType: CustomerType
  businessStage: string
  ageGroup: string
  targetCountries: string[]
  designStyle: DesignStyle
  brandColors: BrandColors
  selectedPages: StandardPage[]
  customPages: CustomPage[]
  selectedFeatures: Feature[]
}

export function createDefaultConfig(): GenerationConfig {
  return {
    businessName: '',
    tagline: '',
    description: '',
    industry: 'technology',
    country: 'United States',
    websiteGoal: 'lead-generation',
    primaryAudience: '',
    customerType: 'b2c',
    businessStage: 'startup',
    ageGroup: '25-34',
    targetCountries: ['United States'],
    designStyle: 'modern',
    brandColors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#f59e0b',
    },
    selectedPages: ['home', 'about', 'services', 'contact'],
    customPages: [],
    selectedFeatures: ['contact-form'],
  }
}

/* ── AI Blueprint Types ── */

export interface BlueprintSection {
  title: string
  description: string
}

export interface BlueprintPage {
  name: string
  slug: string
  sections: BlueprintSection[]
}

export interface ColorPalette {
  primary?: string
  secondary?: string
  accent?: string
  background?: string
  text?: string
}

export interface WebsiteBlueprint {
  siteName: string
  tagline: string
  sections: BlueprintSection[]
  pages: BlueprintPage[]
  colorPalette: ColorPalette
  recommendedFonts: string[]
  designNotes: string[]
}

/* ── Generation Job Status ── */

export type GenerationStatus = 'pending' | 'generating' | 'completed' | 'failed'

export type GenerationError = {
  type: 'invalid_api_key' | 'timeout' | 'network' | 'malformed_json' | 'rate_limit' | 'unknown'
  message: string
}
