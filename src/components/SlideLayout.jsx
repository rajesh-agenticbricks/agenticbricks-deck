import { colors } from '../theme'

export default function SlideLayout({ slideNumber, total, children, onPrev, onNext }) {
  return (
    <div
      className="relative w-screen h-screen flex overflow-hidden"
      style={{ backgroundColor: colors.bg }}
    >
      {/* Left gold bar */}
      <div className="w-1.5 h-full flex-shrink-0" style={{ backgroundColor: colors.gold }} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-5 pb-2 flex-shrink-0">
          <a
            href="https://agenticbricks.com"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity"
            style={{ fontFamily: "'Playfair Display', serif", color: colors.gold, fontSize: '18px', fontWeight: 700, textDecoration: 'none' }}
          >
            AgenticBricks
          </a>
          <span className="text-sm" style={{ color: colors.muted }}>
            {String(slideNumber).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Slide content */}
        <div className="flex-1 overflow-y-auto px-8 md:px-12 pb-12">
          {children}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 pb-4 pt-2 flex-shrink-0">
          <span className="text-xs" style={{ color: colors.muted }}>
            AgenticBricks · agenticbricks.com
          </span>
          <div className="flex gap-3">
            <button
              onClick={onPrev}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              style={{ backgroundColor: colors.bgCard, color: colors.muted }}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              onClick={onNext}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              style={{ backgroundColor: colors.bgCard, color: colors.muted }}
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
