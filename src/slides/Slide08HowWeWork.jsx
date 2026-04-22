import { motion } from 'framer-motion'
import { colors } from '../theme'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
}

const models = [
  {
    letter: 'A', color: colors.teal, title: 'Build together', sub: 'Joint delivery on a specific client problem',
    steps: [
      { label: 'You bring the client and the problem', body: 'The relationship and the domain context are yours.' },
      { label: 'We scope and build the system', body: 'Architecture, engineering, compliance controls — all handled.' },
      { label: 'Client gets a working product', body: 'Not a prototype. Production software they use.' },
      { label: 'Economics split', body: 'We share the engagement economics. Terms fit the deal.' },
    ],
  },
  {
    letter: 'B', color: colors.gold, title: 'Platform your AI team', sub: 'We accelerate what your incoming AI team builds',
    steps: [
      { label: 'Your team is onboarding now', body: 'New hires need patterns, infrastructure, and a codebase that works.' },
      { label: 'We provide the platform and the patterns', body: 'CI/CD, test harness, compliance scaffolding, working examples.' },
      { label: 'Delivery is 3x faster from day one', body: 'Your team ships immediately instead of building plumbing.' },
      { label: 'Your firm keeps full ownership', body: 'Code, IP, infrastructure — all yours. We hand off clean.' },
    ],
  },
  {
    letter: 'C', color: colors.tealLt, title: 'License a product', sub: 'Deploy AgenticCLM or PharmaRevOps into a client',
    steps: [
      { label: 'You have a client with the problem', body: 'CLM or revenue management — the product already exists.' },
      { label: 'We white-glove the deployment', body: 'Configuration, integration, validation, training.' },
      { label: 'Client is live in weeks, not months', body: 'The product is built. Deployment is the only variable.' },
      { label: 'Revenue shared', body: 'License or subscription. Terms structured per deployment.' },
    ],
  },
]

export default function Slide08HowWeWork() {
  return (
    <div className="flex flex-col h-full py-4">
      <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible" className="text-sm italic mb-5" style={{ fontFamily: "'Playfair Display', serif", color: colors.muted }}>
        "Three ways to structure an engagement. Most start with one and grow."
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-1">
        {models.map((m, i) => (
          <motion.div
            key={m.letter}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-xl p-6 flex flex-col"
            style={{ backgroundColor: colors.bgCard }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4"
              style={{ backgroundColor: `${m.color}20`, color: m.color, fontFamily: "'Playfair Display', serif" }}
            >
              {m.letter}
            </div>
            <h3 className="text-lg font-bold" style={{ color: colors.white }}>{m.title}</h3>
            <p className="text-xs italic mt-1 mb-5" style={{ color: colors.muted }}>{m.sub}</p>
            <div className="space-y-4 flex-1">
              {m.steps.map((step, j) => (
                <div key={j}>
                  <span className="text-xs font-bold block" style={{ color: m.color }}>{step.label}</span>
                  <p className="text-xs mt-0.5" style={{ color: colors.muted }}>{step.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
