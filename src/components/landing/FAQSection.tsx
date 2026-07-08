import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    question: 'What exactly does GrowthFlow AI do?',
    answer: 'GrowthFlow AI helps you turn a startup idea into a real, production-ready product. Describe your idea, and our AI generates structured business plans, professional websites, complete SaaS scaffolds with auth and payments, and tailored growth strategies.',
  },
  {
    question: 'Do I need coding experience to use GrowthFlow?',
    answer: 'Not at all. GrowthFlow is designed for founders, entrepreneurs, and builders of any technical level. The AI generates real code and configurations, but you can customize everything through simple descriptions and a visual interface.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Absolutely. All plans are month-to-month with no long-term contracts. You can cancel anytime from your account settings, and you\'ll retain access until the end of your billing period.',
  },
  {
    question: 'Is my data and startup idea safe?',
    answer: 'Yes. We take privacy seriously. Your ideas, project data, and generated content are encrypted and never shared with third parties. You retain full ownership of everything you create on our platform.',
  },
  {
    question: 'How does the AI generate real websites and SaaS apps?',
    answer: 'Our AI uses advanced foundation models trained on modern web frameworks. It generates production-grade React, Next.js, and backend code — not just mockups. You can export, deploy, and iterate on the code as your own.',
  },
  {
    question: 'What\'s the difference between the plans?',
    answer: 'Launch Pad is great for students exploring ideas with up to 3 projects. Startup Engine is our most popular plan for freelancers and builders, offering advanced AI, 10 projects, and priority support. AI Founder Suite unlocks unlimited projects, premium AI models, team collaboration, and white-label exports.',
  },
]

export function FAQSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 sm:py-32 bg-card/30">
      <div className="mx-auto max-w-2xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about GrowthFlow AI.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl border border-border/50 bg-card/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-card/80 transition-colors"
                >
                  {faq.question}
                  <ChevronDown
                    className={`size-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
