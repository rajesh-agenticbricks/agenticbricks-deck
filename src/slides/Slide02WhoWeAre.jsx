import { motion } from 'framer-motion'
import { colors } from '../theme'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
}

const cards = [
  { title: 'Domain-first', color: colors.teal, text: 'Our first commit includes audit trail middleware and Part 11 controls. Most vendors learn what those words mean in month three of your engagement.' },
  { title: 'Build before pitch', color: colors.gold, text: 'Every pitch includes something that runs. If we can\'t show you a working system, we don\'t pitch.' },
  { title: 'Production, not pilots', color: colors.tealLt, text: 'Specialty pharma manufacturer: empty repository to cGMP production in 89 days. That is not typical.' },
]

const paragraphs = [
  'Most engagements in this space start with three to six months of discovery. The vendor is learning what GxP means, how batch records flow, what a deviation looks like. You fund the education.',
  "We've worked inside pharmaceutical and healthcare organizations. When a client describes a deviation workflow or a chargeback dispute, we already know what they mean. Architecture decisions happen in week one, not month four.",
  "We use Anthropic's Claude Code throughout the build: test generation, cross-file refactoring, documentation. The pace is faster than anything a traditional team delivers. The quality bar is identical.",
  'No staff augmentation. No AI strategy decks. Software that runs.',
]

export default function Slide02WhoWeAre() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full py-4">
      {/* Left column */}
      <div className="flex-1 flex flex-col justify-center">
        <motion.div
          className="rounded-xl p-8"
          style={{ backgroundColor: colors.bgCard }}
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: colors.white }}>
            We build where others consult.
          </h2>
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
              <motion.p key={i} custom={i + 1} variants={fadeUp} initial="hidden" animate="visible" className="text-sm leading-relaxed" style={{ color: colors.muted }}>
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right column */}
      <div className="lg:w-[380px] flex flex-col gap-4 justify-center">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i + 2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-lg p-5"
            style={{ backgroundColor: colors.bgCard, borderLeft: `3px solid ${card.color}` }}
          >
            <h3 className="text-sm font-bold mb-2" style={{ color: card.color }}>{card.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{card.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
