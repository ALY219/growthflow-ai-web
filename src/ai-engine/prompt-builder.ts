import {
  type GenerationConfig,
  INDUSTRY_LABELS,
  WEBSITE_GOAL_LABELS,
  CUSTOMER_TYPE_LABELS,
  DESIGN_STYLE_LABELS,
  STANDARD_PAGE_LABELS,
  FEATURE_LABELS,
} from '@/lib/generation-types'

/* ── Prompt Builder ──
   Converts wizard data into a professional prompt for the AI provider.
   Instructs the AI to return structured JSON only. */

export function buildPrompt(config: GenerationConfig): string {
  const selectedPagesList = config.selectedPages
    .map((p) => STANDARD_PAGE_LABELS[p])
    .join(', ')

  const customPagesList =
    config.customPages.length > 0
      ? config.customPages.map((p) => p.name).join(', ')
      : 'None'

  const featuresList =
    config.selectedFeatures.length > 0
      ? config.selectedFeatures.map((f) => FEATURE_LABELS[f]).join(', ')
      : 'None'

  const targetCountriesList =
    config.targetCountries.length > 0 ? config.targetCountries.join(', ') : 'Not specified'

  return `You are an expert web designer and brand strategist. Your task is to generate a comprehensive website blueprint based on the business information below.

## Business Information
- **Business Name:** ${config.businessName || 'Not specified'}
- **Tagline:** ${config.tagline || 'Not specified'}
- **Description:** ${config.description || 'Not specified'}
- **Industry:** ${INDUSTRY_LABELS[config.industry] || config.industry}
- **Country:** ${config.country || 'Not specified'}
- **Website Goal:** ${WEBSITE_GOAL_LABELS[config.websiteGoal] || config.websiteGoal}

## Target Audience
- **Primary Audience:** ${config.primaryAudience || 'Not specified'}
- **Customer Type:** ${CUSTOMER_TYPE_LABELS[config.customerType] || config.customerType}
- **Business Stage:** ${config.businessStage || 'Not specified'}
- **Age Group:** ${config.ageGroup || 'Not specified'}
- **Target Countries:** ${targetCountriesList}

## Design Preferences
- **Design Style:** ${DESIGN_STYLE_LABELS[config.designStyle] || config.designStyle}
- **Brand Colors:**
  - Primary: ${config.brandColors.primary}
  - Secondary: ${config.brandColors.secondary}
  - Accent: ${config.brandColors.accent}

## Website Structure
- **Selected Pages:** ${selectedPagesList || 'None'}
- **Custom Pages:** ${customPagesList}
- **Selected Features:** ${featuresList}

## Instructions

Based on the information above, generate a complete website blueprint. The blueprint should include:

1. **siteName**: A compelling site name (can be the business name or a refined version).
2. **tagline**: A memorable tagline that captures the brand's value proposition.
3. **sections**: An array of 5-8 key sections for the homepage. Each section should have a title and a brief description of its content and purpose.
4. **pages**: An array of page objects based on the selected pages and custom pages. Each page should have a name, a slug (URL-friendly), and an array of sections with title and description.
5. **colorPalette**: A refined color palette object with primary, secondary, accent, background, and text colors. Use the brand colors as a starting point but refine them for optimal web design.
6. **recommendedFonts**: An array of 2-3 font recommendations that match the design style. Use Google Fonts names.
7. **designNotes**: An array of 3-5 design notes with specific recommendations for layout, typography, imagery, and user experience.

## Output Format

Return ONLY a valid JSON object. Do not include any text before or after the JSON. Do not use markdown code blocks. The JSON must match this exact structure:

{
  "siteName": "string",
  "tagline": "string",
  "sections": [
    {
      "title": "string",
      "description": "string"
    }
  ],
  "pages": [
    {
      "name": "string",
      "slug": "string",
      "sections": [
        {
          "title": "string",
          "description": "string"
        }
      ]
    }
  ],
  "colorPalette": {
    "primary": "string",
    "secondary": "string",
    "accent": "string",
    "background": "string",
    "text": "string"
  },
  "recommendedFonts": ["string"],
  "designNotes": ["string"]
}`
}
