import { motion } from 'framer-motion'
import { colors } from '../theme'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
}

const forecastItems = [
  { label: 'Production Demand Modeling', text: 'Forecast production requirements against current inventory, open orders, and historical consumption. Surface shortfalls before they reach the floor.' },
  { label: 'Inventory Burn-Rate Intelligence', text: 'Track consumption velocity across raw materials and finished goods. Automated alerts when stock levels cross reorder thresholds.' },
  { label: 'Shortage Risk Detection', text: 'Identify at-risk materials before stockouts occur. Cross-reference supplier lead times, current burn rate, and open purchase orders.' },
]

const inventoryItems = [
  { label: 'Real-Time Warehouse Visibility', text: 'Unified view of raw material and finished goods inventory across warehouse locations. No more manual spreadsheet reconciliation.' },
  { label: 'GMP-Compliant Audit Trail', text: 'Every inventory movement, adjustment, and status change recorded with timestamp, user, and reason. 21 CFR Part 11 controls built in.' },
  { label: 'OCR Integration Layer', text: 'Reads from existing GMP paper documents. Operators keep current SOPs. The system learns the operation, not the other way around.' },
]

export default function Slide07DemandForecasting() {
  return (
    <div className="flex flex-col h-full py-2">
      <motion.span custom={0} variants={fadeUp} initial="hidden" animate="visible" className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: colors.teal }}>
        Pharma Manufacturing Operations
      </motion.span>
      <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="text-2xl md:text-4xl font-bold mt-2" style={{ fontFamily: "'Playfair Display', serif", color: colors.white }}>
        Demand Forecasting &<br />Inventory Management
      </motion.h1>
      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="w-12 h-px mt-3 mb-2" style={{ backgroundColor: colors.gold }} />
      <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible" className="text-sm italic mb-3" style={{ fontFamily: "'Playfair Display', serif", color: colors.muted }}>
        "89 days from kickoff to production. cGMP facility. FDA Prior Approval. Existing SOPs unchanged."
      </motion.p>

      <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="rounded-lg p-4 mb-5 text-xs leading-relaxed" style={{ backgroundColor: colors.bgCard, color: colors.muted }}>
        A specialty generics manufacturer ran a 150,000 sq ft cGMP facility with inventory and production planning on paper. Digitizing meant a revalidation risk they couldn't take. We built a visibility layer that reads from their existing GMP documents via OCR. Operators kept their current SOPs. The system learned their operation, not the other way.
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1">
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="rounded-xl p-5" style={{ backgroundColor: colors.bgCard, borderLeft: `3px solid ${colors.teal}` }}>
          <h3 className="text-base font-bold mb-4" style={{ color: colors.teal }}>Demand Forecasting</h3>
          <div className="space-y-4">
            {forecastItems.map((item) => (
              <div key={item.label}>
                <span className="text-xs font-bold block mb-1" style={{ color: colors.teal }}>{item.label}</span>
                <p className="text-xs leading-relaxed" style={{ color: colors.muted }}>{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible" className="rounded-xl p-5" style={{ backgroundColor: colors.bgCard, borderLeft: `3px solid ${colors.gold}` }}>
          <h3 className="text-base font-bold mb-4" style={{ color: colors.gold }}>Inventory Management</h3>
          <div className="space-y-4">
            {inventoryItems.map((item) => (
              <div key={item.label}>
                <span className="text-xs font-bold block mb-1" style={{ color: colors.gold }}>{item.label}</span>
                <p className="text-xs leading-relaxed" style={{ color: colors.muted }}>{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
