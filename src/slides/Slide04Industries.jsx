import { motion } from 'framer-motion'
import { colors } from '../theme'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

const industries = [
  {
    name: 'Healthcare & Pharma', color: colors.teal, tag: 'COMMERCIAL & MANUFACTURING',
    caps: ['GxP & 21 CFR Part 11 compliance', 'Revenue management: gross-to-net, chargeback, AMP, Best Price, Medicaid', 'Contract lifecycle management', 'cGMP manufacturing operations', 'Government pricing and 340B'],
    proof: '3 systems in production or UAT. AgenticCLM, PharmaRevOps, Demand Forecasting & Inventory Management.',
  },
  {
    name: 'Manufacturing & Supply Chain', color: colors.gold, tag: 'OPERATIONS & MODERNIZATION',
    caps: ['Legacy system modernization', 'ERP, MES, WMS integration', 'Shop floor and warehouse visibility', 'Demand forecasting and inventory', 'Operational data pipelines'],
    proof: 'Active engagement: 20+ year legacy landscape across mainframes, Lotus Notes, and Azure.',
  },
  {
    name: 'Financial Services', color: colors.amber, tag: 'WORKFLOW & COMPLIANCE',
    caps: ['Document AI and extraction', 'Multi-agent review workflows', 'Automated client communications', 'Compliance and audit trail controls', 'Enterprise security requirements'],
    proof: 'CPA firm: document AI, multi-agent review, automated client communications. Four weeks from kickoff to live.',
  },
  {
    name: 'Healthcare Research', color: colors.pink, tag: 'DATA SECURITY & AI/ML',
    caps: ['HIPAA-compliant data architecture', 'Zero-egress Azure environments', 'PHI research infrastructure', 'Private endpoints and network isolation', 'AI/ML on sensitive health data'],
    proof: 'Zero-egress PHI research enclave on Azure. Researchers run AI/ML workloads on sensitive data without moving it.',
  },
  {
    name: 'Education & Research', color: colors.purple, tag: 'ADAPTIVE LEARNING',
    caps: ['Knowledge graph architecture', 'Adaptive learning algorithms', 'Real-time proficiency modeling', 'AI-generated content at scale', 'Student performance analytics'],
    proof: 'MathPractice.ai: knowledge graph curriculum, real-time proficiency tracking, AI-generated practice at scale.',
  },
  {
    name: 'Media & Content', color: colors.sky, tag: 'AUTONOMOUS PIPELINES',
    caps: ['Multi-modal AI orchestration', 'Autonomous content pipelines', 'Human-in-the-loop escalation', 'Text, audio, and image generation', 'End-to-end workflow automation'],
    proof: 'Autonomous media pipeline: text, audio, art, metadata end-to-end. Multi-modal AI orchestration. Built in 8 weeks.',
  },
]

export default function Slide04Industries() {
  return (
    <div className="flex flex-col h-full py-2">
      <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible" className="text-sm italic mb-4" style={{ fontFamily: "'Playfair Display', serif", color: colors.muted }}>
        "Six verticals. Each with production work behind it."
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
        {industries.map((ind, i) => (
          <motion.div
            key={ind.name}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-lg overflow-hidden flex flex-col"
            style={{ backgroundColor: colors.bgCard }}
          >
            <div className="h-1" style={{ backgroundColor: ind.color }} />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-sm font-bold" style={{ color: ind.color }}>{ind.name}</h3>
              <span className="text-[10px] tracking-wider uppercase mt-0.5 mb-3" style={{ color: colors.muted }}>{ind.tag}</span>
              <div className="text-xs space-y-1 flex-1" style={{ color: colors.off }}>
                {ind.caps.map((c, j) => (
                  <span key={j} className="block">{j > 0 && <span style={{ color: colors.muted }}> · </span>}{c}</span>
                ))}
              </div>
              <p className="mt-3 text-xs italic" style={{ color: ind.color }}>{ind.proof}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
