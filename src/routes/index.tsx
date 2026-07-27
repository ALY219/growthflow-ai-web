import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Zap, Globe, Palette, Code2 } from 'lucide-react'
import { Button } from '@blinkdotnew/ui'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'GrowthFlow AI — AI Website Generator' }] }),
  component: HomePage,
})

function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 mb-6">
              <Sparkles className="size-4 text-primary" />
              <span className="text-sm font-medium">Powered by Google Gemini AI</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">Generate Your Website with <span className="text-primary">AI</span></h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance">Describe your business, choose your style, and let AI create a complete website blueprint in seconds. No coding required.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sign-up"><Button size="lg" className="gap-2 w-full sm:w-auto">Start Generating<ArrowRight className="size-4" /></Button></Link>
              <Link to="/pricing"><Button variant="outline" size="lg" className="w-full sm:w-auto">View Pricing</Button></Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Zap, label: 'AI-Powered', desc: 'Gemini-driven generation' },
              { icon: Globe, label: 'Multi-Page', desc: 'Full website blueprints' },
              { icon: Palette, label: 'Custom Design', desc: 'Your brand colors' },
              { icon: Code2, label: 'No Coding', desc: 'Just describe your vision' },
            ].map((f) => (
              <div key={f.label} className="rounded-xl border border-border bg-card p-4 text-center">
                <f.icon className="size-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-semibold">{f.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { step: '01', title: 'Describe Your Business', desc: 'Enter your business name, industry, target audience, and goals.' },
            { step: '02', title: 'Choose Your Style', desc: 'Select design preferences, brand colors, pages, and features.' },
            { step: '03', title: 'Generate with AI', desc: 'Get a complete website blueprint with sections, pages, and design notes.' },
          ].map((s) => (
            <div key={s.step} className="rounded-xl border border-border bg-card p-6">
              <span className="text-3xl font-bold text-primary/30">{s.step}</span>
              <h3 className="text-lg font-semibold mt-4">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-2xl border border-border bg-gradient-to-r from-primary/10 to-accent/10 p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Website?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Join GrowthFlow AI and generate your first website blueprint in minutes.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/sign-up"><Button size="lg" className="gap-2">Get Started Free<ArrowRight className="size-4" /></Button></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
