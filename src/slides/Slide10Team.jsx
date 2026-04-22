import { motion } from 'framer-motion'
import { colors } from '../theme'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
}

const team = [
  {
    initials: 'RB', name: 'Rajesh Brundala', title: 'Co-founder · AgenticBricks', color: colors.gold,
    bio: 'Built PharmaRevOps covering gross-to-net waterfall, AMP, Best Price, Medicaid rebate accruals, and 340B compliance. Led AgenticCLM from spec to UAT at a top 10 pharma company. Architecture and client relationships both run through him.',
    domains: ['GxP / 21 CFR Part 11', 'Enterprise SaaS', 'Agentic AI systems', 'Pharma CLM', 'Government contracting'],
  },
  {
    initials: 'PK', name: 'Pavan Kanaparthy', title: 'Co-founder · AgenticBricks', color: colors.teal,
    bio: 'Runs the engineering delivery model that took a cGMP pharma manufacturer from empty repository to production in 89 days. Built and operates production systems where a compliance failure means an FDA finding. Maintains near-complete automated test coverage across every engagement.',
    domains: ['Healthcare IT', 'AI-assisted delivery', 'Full-stack engineering', 'Regulated software', 'Custom SaaS operations'],
  },
]

export default function Slide10Team() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full py-4 items-stretch">
      {team.map((t, i) => (
        <motion.div
          key={t.initials}
          custom={i}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex-1 rounded-xl p-8 flex flex-col items-center text-center"
          style={{ backgroundColor: colors.bgCard }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-5"
            style={{ backgroundColor: `${t.color}20`, color: t.color, fontFamily: "'Playfair Display', serif" }}
          >
            {t.initials}
          </div>
          <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: colors.white }}>{t.name}</h3>
          <p className="text-xs mt-1 mb-5" style={{ color: colors.muted }}>{t.title}</p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: colors.muted }}>{t.bio}</p>
          <div className="mt-auto">
            <span className="text-xs font-medium tracking-wider uppercase block mb-3" style={{ color: colors.off }}>Areas of depth</span>
            <div className="flex flex-wrap justify-center gap-2">
              {t.domains.map((d) => (
                <span
                  key={d}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${t.color}15`, color: t.color, border: `1px solid ${t.color}30` }}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
