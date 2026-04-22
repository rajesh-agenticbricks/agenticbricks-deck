import { motion } from 'framer-motion'
import { colors } from '../theme'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

const modules = [
  { color: colors.teal, title: 'Gross-to-Net Waterfall', text: 'Full waterfall from WAC to net revenue. Configurable adjustment layers: chargebacks, rebates, returns, co-pay assistance. Every line is auditable.' },
  { color: colors.gold, title: 'Chargeback Processing', text: 'Chargeback validation against contract terms. Exceptions flagged automatically. Dispute workflow and distributor reconciliation built in. The manual review queue shrinks.' },
  { color: colors.tealLt, title: 'AMP & Best Price', text: 'Monthly AMP and quarterly Best Price pipelines. Audit trail on every input. Restatement workflow. CMS submission readiness check before you file.' },
  { color: colors.indigo, title: 'Medicaid Rebate Accruals', text: 'State-level Medicaid rebate accrual and liability forecasting. URA calculation with MDRP compliance checks. Tied directly to the government pricing chain.' },
  { color: colors.pink, title: '340B Compliance', text: '340B ceiling price calculation and compliance monitoring. Duplicate discount detection. Covered entity eligibility checked against HRSA data.' },
  { color: colors.amber, title: 'CPI Penalty & Forecasting', text: 'CPI penalty calculation and forward-looking accrual forecasting. Run price increase scenarios before you file to see penalty exposure.' },
]

export default function Slide06PharmaRevOps() {
  return (
    <div className="flex flex-col h-full py-2">
      <motion.span custom={0} variants={fadeUp} initial="hidden" animate="visible" className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: colors.gold }}>
        Pharma Revenue Operations
      </motion.span>
      <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="text-3xl md:text-5xl font-bold mt-2" style={{ fontFamily: "'Playfair Display', serif", color: colors.white }}>
        PharmaRevOps
      </motion.h1>
      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="w-12 h-px mt-3 mb-2" style={{ backgroundColor: colors.gold }} />
      <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible" className="text-sm italic mb-3" style={{ fontFamily: "'Playfair Display', serif", color: colors.teal }}>
        "Revenue management platform built for pharma. Designed to replace Model N."
      </motion.p>

      <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="rounded-lg p-4 mb-4 text-xs leading-relaxed" style={{ backgroundColor: colors.bgCard, color: colors.muted }}>
        Model N implementations routinely run 18 months and eight figures. The calculations are not the hard part: gross-to-net waterfall, chargeback validation, AMP, Best Price, Medicaid URAs. The hard part is there was no modern platform built specifically for them. PharmaRevOps is.
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
        {modules.map((m, i) => (
          <motion.div
            key={m.title}
            custom={i + 5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-lg overflow-hidden flex flex-col"
            style={{ backgroundColor: colors.bgCard }}
          >
            <div className="h-1" style={{ backgroundColor: m.color }} />
            <div className="p-4">
              <h3 className="text-sm font-bold mb-1.5" style={{ color: m.color }}>{m.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: colors.muted }}>{m.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div custom={11} variants={fadeUp} initial="hidden" animate="visible" className="mt-3">
        <a
          href="https://pharmarevops-ui-1063256373100.us-central1.run.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium hover:underline"
          style={{ color: colors.gold }}
        >
          Live: pharmarevops-ui-1063256373100.us-central1.run.app →
        </a>
      </motion.div>
    </div>
  )
}
