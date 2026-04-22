import { motion } from 'framer-motion'
import { colors } from '../theme'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
}

const links = [
  { color: colors.teal, title: 'See AgenticCLM live', url: 'https://agentic-clm-772467090794.us-west1.run.app' },
  { color: colors.gold, title: 'See PharmaRevOps live', url: 'https://pharmarevops-ui-1063256373100.us-central1.run.app' },
  { color: colors.tealLt, title: 'Explore our work', url: 'https://agenticbricks.com/work' },
]

export default function Slide11LetsTalk() {
  return (
    <div className="relative flex flex-col justify-center h-full py-8">
      {/* Decorative circle */}
      <div
        className="absolute -right-40 top-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: colors.teal, opacity: 0.08 }}
      />

      <motion.h1
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-5xl md:text-7xl font-bold"
        style={{ fontFamily: "'Playfair Display', serif", color: colors.white }}
      >
        Let's talk.
      </motion.h1>

      <motion.p custom={1} variants={fadeUp} initial="hidden" animate="visible" className="mt-4 text-base italic max-w-2xl" style={{ fontFamily: "'Playfair Display', serif", color: colors.gold }}>
        "Two pharma systems live right now. Click the URLs on slides 05 and 06 before we talk. If you have questions about what you see, we're ready."
      </motion.p>

      <div className="mt-10 flex flex-col lg:flex-row gap-8">
        {/* Contact card */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="rounded-xl p-6 lg:w-[340px]"
          style={{ backgroundColor: colors.bgCard, borderLeft: `3px solid ${colors.gold}` }}
        >
          <h3 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif", color: colors.white }}>Rajesh Brundala</h3>
          <p className="text-xs mt-1 mb-4" style={{ color: colors.muted }}>Co-founder, AgenticBricks</p>
          <div className="space-y-2">
            <a href="https://agenticbricks.com" target="_blank" rel="noopener noreferrer" className="block text-sm hover:underline" style={{ color: colors.teal }}>
              agenticbricks.com
            </a>
            <a href="https://linkedin.com/company/agenticbricks" target="_blank" rel="noopener noreferrer" className="block text-sm hover:underline" style={{ color: colors.muted }}>
              linkedin.com/company/agenticbricks
            </a>
          </div>
        </motion.div>

        {/* Action cards */}
        <div className="flex-1 flex flex-col gap-3">
          {links.map((link, i) => (
            <motion.a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              custom={i + 3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="rounded-lg p-4 flex items-center justify-between group transition-all hover:translate-x-1"
              style={{ backgroundColor: colors.bgCard, borderLeft: `3px solid ${link.color}` }}
            >
              <div>
                <h4 className="text-sm font-bold" style={{ color: link.color }}>{link.title}</h4>
                <span className="text-xs" style={{ color: colors.muted }}>{link.url.replace('https://', '')}</span>
              </div>
              <span className="text-lg transition-transform group-hover:translate-x-1" style={{ color: link.color }}>→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}
