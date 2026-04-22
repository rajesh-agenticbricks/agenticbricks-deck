import { motion } from 'framer-motion'
import { colors } from '../theme'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

const features = [
  { color: colors.teal, title: 'AI-Assisted Redlining', text: 'Clause-level suggestions and risk flags on incoming drafts. Editing happens inside the system. No Word documents flying back and forth.' },
  { color: colors.teal, title: 'Template & Clause Library', text: "Pre-approved clause language with deviation tracking. Legal fallback positions are in the system, not in someone's email." },
  { color: colors.gold, title: 'DocuSign E-Signature', text: '21 CFR Part 11 e-signature flow. Every version, comment, and approval is in the audit trail.' },
  { color: colors.gold, title: 'External Negotiation', text: 'External counterparties get a controlled portal to review and redline. Every exchange is tracked. Nothing happens outside the system.' },
  { color: colors.tealLt, title: 'Pipeline Dashboard', text: "Full portfolio view: every contract, what stage it's in, what's blocking it, what needs escalation." },
  { color: colors.tealLt, title: 'Pharma Compliance Architecture', text: 'SendGrid email, in-app notifications, Azure AD SAML 2.0. Passes enterprise pharma IT security review.' },
]

export default function Slide05AgenticCLM() {
  return (
    <div className="flex flex-col h-full py-2">
      <motion.span custom={0} variants={fadeUp} initial="hidden" animate="visible" className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: colors.teal }}>
        Flagship Product
      </motion.span>
      <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="text-3xl md:text-5xl font-bold mt-2" style={{ fontFamily: "'Playfair Display', serif", color: colors.white }}>
        AgenticCLM
      </motion.h1>
      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="w-12 h-px mt-3 mb-3" style={{ backgroundColor: colors.gold }} />
      <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible" className="text-sm italic mb-5 max-w-3xl" style={{ fontFamily: "'Playfair Display', serif", color: colors.muted }}>
        "Contract intake through executed agreement. Built for pharmaceutical compliance. Top 10 pharma company. In UAT."
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            custom={i + 4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-lg p-4"
            style={{ backgroundColor: colors.bgCard, borderLeft: `3px solid ${f.color}` }}
          >
            <h3 className="text-sm font-bold mb-2" style={{ color: f.color }}>{f.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: colors.muted }}>{f.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div custom={10} variants={fadeUp} initial="hidden" animate="visible" className="mt-4">
        <a
          href="https://agentic-clm-772467090794.us-west1.run.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium hover:underline"
          style={{ color: colors.teal }}
        >
          Live: agentic-clm-772467090794.us-west1.run.app →
        </a>
      </motion.div>
    </div>
  )
}
