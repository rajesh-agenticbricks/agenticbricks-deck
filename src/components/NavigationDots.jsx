import { colors } from '../theme'

export default function NavigationDots({ total, current, goTo }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          className="w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-125"
          style={{
            backgroundColor: i === current ? colors.gold : colors.muted,
            opacity: i === current ? 1 : 0.4,
            transform: i === current ? 'scale(1.2)' : 'scale(1)',
          }}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  )
}
