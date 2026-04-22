import { motion } from 'framer-motion'
import { colors } from '../theme'
import { useCountUp } from '../hooks/useCountUp'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
}

const pillars = [
  {
    num: '1', color: colors.teal, title: 'Domain Knowledge',
    text: "We've worked inside pharmaceutical and healthcare organizations. When a client describes a deviation workflow or a Part 11 control gap, we already know the context. Correct architecture in week one, not after three months of reading SOPs.",
  },
  {
    num: '2', color: colors.gold, title: 'Engineering Rigor',
    text: "Speed in regulated software comes from making the right call early. Every module ships with near-complete automated test coverage. Architecture decisions that don't have to be rebuilt later. Fewer false starts means a shorter overall timeline.",
  },
  {
    num: '3', color: colors.tealLt, title: 'AI-Assisted Engineering',
    text: "Anthropic's Claude Code reads the full codebase and executes multi-step tasks: boilerplate, test generation, cross-file refactoring, documentation. Engineers review every line before it merges. The pace is faster. The quality bar is the same.",
  },
]

export default function Slide09DeliveryDifference() {
  const traditionalMonths = useCountUp(18, 1200)
  const abMonths = useCountUp(3, 1200)

  return (
    <div className="flex flex-col h-full py-2">
      <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible" className="text-sm italic mb-4" style={{ fontFamily: "'Playfair Display', serif", color: colors.muted }}>
        "Three things that compound. Take one away and the timeline stretches back to eighteen months."
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        {pillars.map((p, i) => (
          <motion.div
            key={p.num}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-xl p-5"
            style={{ backgroundColor: colors.bgCard }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mb-3"
              style={{ backgroundColor: `${p.color}20`, color: p.color }}
            >
              {p.num}
            </div>
            <h3 className="text-sm font-bold mb-2" style={{ color: p.color }}>{p.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: colors.muted }}>{p.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="rounded-xl p-5" style={{ backgroundColor: colors.bgCard, borderLeft: `3px solid ${colors.red}` }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: colors.red }}>Traditional approach</h3>
          <p className="text-xs leading-relaxed mb-4" style={{ color: colors.muted }}>
            3 to 6 months discovery. 6 to 12 months build. 3 to 6 months stabilization. 12 to 18+ months before anyone uses it.
          </p>
          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1" style={{ color: colors.red }}>
              <span>Timeline</span>
              <span>{traditionalMonths}+ months</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: colors.bgLight }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: colors.red }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </div>
          </div>
          <p className="text-xs italic" style={{ color: colors.muted }}>
            The compliance learning curve runs alongside the build the whole time, creating rework at every stage.
          </p>
        </motion.div>

        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="rounded-xl p-5" style={{ backgroundColor: colors.bgCard, borderLeft: `3px solid ${colors.teal}` }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: colors.teal }}>AgenticBricks</h3>
          <p className="text-xs leading-relaxed mb-4" style={{ color: colors.muted }}>
            Week 1: architecture locked. Month 1: working software. Month 3: production.
          </p>
          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1" style={{ color: colors.teal }}>
              <span>Timeline</span>
              <span>{abMonths} months</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: colors.bgLight }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: colors.teal }}
                initial={{ width: 0 }}
                animate={{ width: '16.7%' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </div>
          </div>
          <p className="text-xs italic" style={{ color: colors.muted }}>
            Demonstrated at a cGMP facility with FDA Prior Approval. Not a projection.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
