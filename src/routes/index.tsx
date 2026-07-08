import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/landing/HeroSection'
import { CapabilitiesSection } from '@/components/landing/CapabilitiesSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { FAQSection } from '@/components/landing/FAQSection'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'GrowthFlow AI — Turn Your Idea Into a Real Startup' },
      {
        name: 'description',
        content:
          'Generate startup blueprints, build professional websites, create SaaS foundations, and launch faster with AI — all in one platform.',
      },
    ],
  }),
  component: IndexPage,
})

function IndexPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CapabilitiesSection />
        <HowItWorksSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
