import { motion } from 'framer-motion'
import { colors } from '../theme'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' } }),
}

export default function Slide01Cover() {
  return (
    <div className="relative flex flex-col justify-center h-full min-h-0 py-8">
      {/* Decorative circles */}
      <div
        className="absolute -top-20 -right-32 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: colors.teal, opacity: 0.1 }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: colors.gold, opacity: 0.07 }}
      />

      {/* Animated particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            backgroundColor: i % 2 === 0 ? colors.teal : colors.gold,
            opacity: 0.15 + Math.random() * 0.15,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
        <span
          className="text-xs font-medium tracking-[0.3em] uppercase"
          style={{ color: colors.gold }}
        >
          Capabilities Overview
        </span>
      </motion.div>

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-4 text-5xl md:text-7xl font-bold"
        style={{ fontFamily: "'Playfair Display', serif", color: colors.white }}
      >
        AgenticBricks
      </motion.h1>

      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="mt-5 flex flex-wrap gap-2 text-base md:text-lg">
        <span style={{ color: colors.teal }}>Enterprise App Modernization</span>
        <span style={{ color: colors.muted }}>·</span>
        <span style={{ color: colors.gold }}>AI-Assisted Engineering</span>
        <span style={{ color: colors.muted }}>·</span>
        <span style={{ color: colors.white }}>Custom SaaS</span>
      </motion.div>

      <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible" className="mt-2 text-sm" style={{ color: colors.muted }}>
        Healthcare · Pharma · Manufacturing · Supply Chain
      </motion.p>

      <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="mt-6 w-16 h-px" style={{ backgroundColor: colors.gold }} />

      <motion.p
        custom={5}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-6 text-base md:text-lg max-w-2xl italic"
        style={{ fontFamily: "'Playfair Display', serif", color: colors.off }}
      >
        "Three pharma systems in production. Two live today. One in UAT. All built in under three months each."
      </motion.p>

      <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible" className="mt-8 flex justify-between text-xs" style={{ color: colors.muted }}>
        <span>agenticbricks.com</span>
        <span>April 2026</span>
      </motion.div>
    </div>
  )
}
