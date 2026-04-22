import { AnimatePresence, motion } from 'framer-motion'
import { useSlideNavigation } from './hooks/useSlideNavigation'
import SlideLayout from './components/SlideLayout'
import NavigationDots from './components/NavigationDots'
import AskAI from './components/AskAI'

import Slide01Cover from './slides/Slide01Cover'
import Slide02WhoWeAre from './slides/Slide02WhoWeAre'
import Slide03Services from './slides/Slide03Services'
import Slide04Industries from './slides/Slide04Industries'
import Slide05AgenticCLM from './slides/Slide05AgenticCLM'
import Slide06PharmaRevOps from './slides/Slide06PharmaRevOps'
import Slide07DemandForecasting from './slides/Slide07DemandForecasting'
import Slide08HowWeWork from './slides/Slide08HowWeWork'
import Slide09DeliveryDifference from './slides/Slide09DeliveryDifference'
import Slide10Team from './slides/Slide10Team'
import Slide11LetsTalk from './slides/Slide11LetsTalk'

const slides = [
  Slide01Cover,
  Slide02WhoWeAre,
  Slide03Services,
  Slide04Industries,
  Slide05AgenticCLM,
  Slide06PharmaRevOps,
  Slide07DemandForecasting,
  Slide08HowWeWork,
  Slide09DeliveryDifference,
  Slide10Team,
  Slide11LetsTalk,
]

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
}

export default function App() {
  const { current, direction, next, prev, goTo } = useSlideNavigation(slides.length)
  const SlideComponent = slides[current]

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <SlideLayout
            slideNumber={current + 1}
            total={slides.length}
            onPrev={prev}
            onNext={next}
          >
            <SlideComponent />
          </SlideLayout>
        </motion.div>
      </AnimatePresence>

      <NavigationDots total={slides.length} current={current} goTo={goTo} />
      <AskAI />
    </div>
  )
}
