import { motion } from 'framer-motion'
import { colors } from '../theme'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
}

const services = [
  {
    num: '01',
    color: colors.teal,
    title: 'Enterprise App Modernization',
    desc: 'Replace aging systems without breaking what\'s already working. Phased delivery. Nothing goes dark.',
    caps: [
      'EHR, LIMS, MES, ERP, WMS document management',
      'Audit trail and Part 11 controls in the first commit',
      'Nothing goes dark mid-implementation',
      '21 CFR Part 11, GxP, GAMP5, Annex 11 in the architecture',
    ],
    proof: 'Large supply chain co: mapping 20+ years of mainframes, Lotus Notes, and offline systems. Active.',
  },
  {
    num: '02',
    color: colors.gold,
    title: 'AI-Assisted Engineering',
    desc: 'AI runs inside the build: generating tests, refactoring across files, writing documentation. Not a chatbot on top of your codebase.',
    caps: [
      'Codebase analysis, test generation, standards enforcement',
      'Near-complete automated test coverage as standard',
      'Iterates through failures automatically',
      'Delivery speed 3x faster',
    ],
    proof: 'Specialty pharma manufacturer: production in 89 days. Comparable projects: 12 to 18 months.',
  },
  {
    num: '03',
    color: colors.tealLt,
    title: 'Custom SaaS',
    desc: 'We build it, we run it, we keep improving it. You pay a monthly subscription and use it.',
    caps: [
      'No capital approval needed',
      'We operate, monitor, and continuously improve',
      'Built once, redeployable across clients or sites',
      'Validation cost splits across every deployment',
    ],
    proof: 'AgenticCLM: contract intake through executed agreement. Top 10 pharma company. In UAT.',
  },
]

export default function Slide03Services() {
  return (
    <div className="flex flex-col h-full py-4">
      <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible" className="text-sm italic mb-6" style={{ fontFamily: "'Playfair Display', serif", color: colors.muted }}>
        "They work together or independently, depending on where you are."
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-1">
        {services.map((s, i) => (
          <motion.div
            key={s.num}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-xl p-6 flex flex-col"
            style={{ backgroundColor: colors.bgCard }}
          >
            <span className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: s.color }}>{s.num}</span>
            <h3 className="text-lg font-bold mt-2 mb-1" style={{ color: colors.white }}>{s.title}</h3>
            <p className="text-xs italic mb-4" style={{ color: colors.muted }}>{s.desc}</p>
            <ul className="space-y-2 flex-1">
              {s.caps.map((c, j) => (
                <li key={j} className="flex items-start gap-2 text-xs" style={{ color: colors.off }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 rounded-lg text-xs italic" style={{ backgroundColor: colors.bgLight, color: s.color }}>
              {s.proof}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
