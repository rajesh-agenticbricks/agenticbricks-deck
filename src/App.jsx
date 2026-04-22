import { useEffect, useRef, useState } from 'react'
import systemPromptMd from './prompts/system-prompt.md?raw'
import suggestedPromptsMd from './prompts/suggested-prompts.md?raw'

/* ─── SVG Icons ─── */
const SunIcon = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="4" stroke="#C9A84C" strokeWidth="2"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/></svg>)
const MoonIcon = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17.5 10.5a7.5 7.5 0 01-10-7 7.5 7.5 0 1010 7z" stroke="#CBD5E1" strokeWidth="1.5" fill="rgba(203,213,225,0.1)"/></svg>)
const ShieldIcon = () => (<svg width="48" height="48" viewBox="0 0 40 40" fill="none"><path d="M20 4L6 10v10c0 9 6 16 14 18 8-2 14-9 14-18V10L20 4z" stroke="#0D9488" strokeWidth="2" fill="rgba(13,148,136,0.1)"/><path d="M16 20l3 3 6-6" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const RocketIcon = () => (<svg width="48" height="48" viewBox="0 0 40 40" fill="none"><path d="M20 6c-4 4-8 12-8 20h16c0-8-4-16-8-20z" stroke="#C9A84C" strokeWidth="2" fill="rgba(201,168,76,0.1)"/><circle cx="20" cy="20" r="3" fill="#C9A84C" opacity="0.5"/><path d="M12 26c-2 0-4 4-4 8h4V26zM28 26c2 0 4 4 4 8h-4V26z" fill="rgba(201,168,76,0.15)"/></svg>)
const AIIcon = () => (<svg width="48" height="48" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="#14B8A6" strokeWidth="2" fill="rgba(20,184,166,0.1)"/><circle cx="20" cy="20" r="5" fill="#14B8A6" opacity="0.3"/><path d="M20 6v4M20 30v4M6 20h4M30 20h4M10 10l3 3M27 27l3 3M10 30l3-3M27 13l3-3" stroke="#14B8A6" strokeWidth="1.5"/></svg>)
const ContractIcon = () => (<svg width="48" height="48" viewBox="0 0 40 40" fill="none"><rect x="8" y="4" width="24" height="32" rx="3" stroke="#0D9488" strokeWidth="2" fill="rgba(13,148,136,0.1)"/><path d="M14 14h12M14 20h8M14 26h10" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"/></svg>)
const ChartIcon = () => (<svg width="48" height="48" viewBox="0 0 40 40" fill="none"><rect x="6" y="6" width="28" height="28" rx="4" stroke="#C9A84C" strokeWidth="2" fill="rgba(201,168,76,0.1)"/><path d="M12 28V20M18 28V14M24 28V18M30 28V10" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round"/></svg>)
const FactoryIcon = () => (<svg width="48" height="48" viewBox="0 0 40 40" fill="none"><path d="M4 34V18l8-6v8l8-6v8l8-6v18H4z" stroke="#14B8A6" strokeWidth="2" fill="rgba(20,184,166,0.1)"/><rect x="10" y="26" width="4" height="8" fill="rgba(20,184,166,0.2)"/><rect x="18" y="26" width="4" height="8" fill="rgba(20,184,166,0.2)"/></svg>)
const PipelineIcon = () => (<svg width="48" height="48" viewBox="0 0 40 40" fill="none"><rect x="4" y="8" width="10" height="8" rx="2" stroke="#0D9488" strokeWidth="2" fill="rgba(13,148,136,0.1)"/><rect x="15" y="16" width="10" height="8" rx="2" stroke="#C9A84C" strokeWidth="2" fill="rgba(201,168,76,0.1)"/><rect x="26" y="24" width="10" height="8" rx="2" stroke="#14B8A6" strokeWidth="2" fill="rgba(20,184,166,0.1)"/><path d="M14 12h3M25 20h3" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/></svg>)

/* ─── Hooks ─── */
function useOnScreen(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ─── Shared Components ─── */
function Section({ children, className = '', id }) {
  const [ref, visible] = useOnScreen(0.1)
  return (
    <div className="slide" ref={ref}>
      <section id={id} className={`py-10 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
        <div className="max-w-6xl mx-auto">{children}</div>
      </section>
    </div>
  )
}

function SectionLabel({ children, color = 'teal' }) {
  const c = {
    teal: 'text-teal bg-teal/10 border-teal/20',
    gold: 'text-gold bg-gold/10 border-gold/20',
    'teal-lt': 'text-teal-lt bg-teal-lt/10 border-teal-lt/20',
    amber: 'text-amber bg-amber/10 border-amber/20',
    pink: 'text-pink bg-pink/10 border-pink/20',
    purple: 'text-purple bg-purple/10 border-purple/20',
    sky: 'text-sky bg-sky/10 border-sky/20',
    indigo: 'text-indigo bg-indigo/10 border-indigo/20',
    red: 'text-red bg-red/10 border-red/20',
  }
  return <span className={`inline-block px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-lg font-semibold tracking-widest uppercase rounded-full border mb-4 sm:mb-6 ${c[color]}`}>{children}</span>
}

function StatCard({ value, label, color }) {
  const c = { teal: '#0D9488', gold: '#C9A84C', 'teal-lt': '#14B8A6', amber: '#F59E0B', pink: '#EC4899' }
  return (
    <div className="card text-center p-4 sm:p-8 rounded-2xl">
      <div className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-2 sm:mb-3" style={{ color: c[color], fontFamily: "'Playfair Display', serif" }}>{value}</div>
      <div className="text-sm sm:text-base text-text-muted">{label}</div>
    </div>
  )
}

/* ─── Ask AI Panel ─── */
const SYSTEM_PROMPT = systemPromptMd

// Parse suggested prompts from markdown: lines starting with "- "
const SUGGESTED = suggestedPromptsMd
  .split('\n')
  .filter(line => line.startsWith('- '))
  .map(line => line.slice(2).trim())

function AskAI() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const scrollRef = useRef(null)
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, streaming])

  const sendMessage = async (text) => {
    if (!text.trim() || streaming) return
    const userMsg = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setStreaming(true)

    if (!apiKey) {
      setMessages([...newMessages, { role: 'assistant', content: 'API key not configured. Set VITE_ANTHROPIC_API_KEY to enable the AI assistant.' }])
      setStreaming(false)
      return
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 512, system: SYSTEM_PROMPT, stream: true, messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
      })
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        for (const line of decoder.decode(value).split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') break
          try {
            const parsed = JSON.parse(data)
            if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
              assistantText += parsed.delta.text
              setMessages(prev => { const u = [...prev]; u[u.length - 1] = { role: 'assistant', content: assistantText }; return u })
            }
          } catch {}
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    }
    setStreaming(false)
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} className="ask-ai-btn fixed bottom-8 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full cursor-pointer transition-transform hover:scale-105 shadow-lg" style={{ backgroundColor: '#0D9488', color: '#fff' }}>
        <span className="relative flex h-5 w-5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full" style={{ backgroundColor: '#14B8A6', animation: 'pulse-ring 2s ease-out infinite' }} />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" /></svg>
        </span>
        <span className="text-sm font-medium">Questions?</span>
      </button>

      {open && (
        <div className="fixed top-0 right-0 z-50 h-full w-full sm:w-[400px] flex flex-col shadow-2xl" style={{ backgroundColor: 'var(--color-bg-card)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#14B8A6' }} />
              <span className="font-medium text-sm text-heading">Ask AgenticBricks</span>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && <button onClick={() => setMessages([])} className="text-xs px-2 py-1 rounded cursor-pointer text-text-muted" style={{ backgroundColor: 'var(--color-bg)' }}>Clear</button>}
              <button onClick={() => setOpen(false)} className="text-lg cursor-pointer w-7 h-7 flex items-center justify-center rounded text-text-muted">×</button>
            </div>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-text-muted">We built this to answer any questions you might have about AgenticBricks, our products, or how our teams might work together.</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED.map(s => (
                    <button key={s} onClick={() => sendMessage(s)} className="text-xs px-3 py-1.5 rounded-full cursor-pointer text-teal-lt" style={{ backgroundColor: 'rgba(20,184,166,0.1)', border: '1px solid rgba(13,148,136,0.3)' }}>{s}</button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed" style={{ backgroundColor: m.role === 'user' ? '#0D9488' : 'var(--color-bg)', color: m.role === 'user' ? '#fff' : 'var(--color-text)' }}>{m.content}</div>
              </div>
            ))}
            {streaming && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex justify-start">
                <div className="px-3.5 py-2.5 rounded-xl text-sm" style={{ backgroundColor: 'var(--color-bg)' }}>
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#14B8A6', animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#14B8A6', animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#14B8A6', animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="px-4 py-3 border-t border-white/8">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage(input)} placeholder="Ask a question..." className="flex-1 px-3 py-2 rounded-lg text-sm outline-none" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-heading)', border: '1px solid rgba(255,255,255,0.08)' }} />
              <button onClick={() => sendMessage(input)} disabled={!input.trim() || streaming} className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-opacity disabled:opacity-40" style={{ backgroundColor: '#0D9488', color: '#fff' }}>Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── Nav ─── */
const NAV = [
  { href: '#who', label: 'Who We Are' },
  { href: '#services', label: 'Services' },
  { href: '#industries', label: 'Industries' },
  { href: '#clm', label: 'AgenticCLM' },
  { href: '#revops', label: 'PharmaRevOps' },
  { href: '#delivery', label: 'Delivery' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

/* ═══════════════════════════════════════════ */
export default function App() {
  const [theme, setTheme] = useState('dark')
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <div className="min-h-screen bg-bg" data-theme={theme}>
      <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* ═══ HERO ═══ */}
      <div className="slide" style={{ marginTop: '1.5rem' }}>
        <header id="hero" className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden mesh-gradient">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 -right-20 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-teal/5 blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-gold/5 blur-3xl" />
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-10">
              <span className="text-gold text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">Capabilities Overview</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-4 sm:mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="text-heading">Agentic</span><span className="text-gold">Bricks</span>
            </h1>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="pill px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium text-teal bg-teal/15 border-teal/25">Enterprise App Modernization</span>
              <span className="pill px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium text-gold bg-gold/15 border-gold/25">AI-Assisted Engineering</span>
              <span className="pill px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium text-teal-lt bg-teal-lt/15 border-teal-lt/25">Custom SaaS</span>
            </div>
            <p className="text-text-muted text-sm sm:text-base mb-4">Healthcare · Pharma · Manufacturing · Supply Chain</p>
            <div className="glow-line max-w-xs mx-auto mb-6" />
            <blockquote className="text-base sm:text-xl md:text-2xl text-text-muted italic max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
              &ldquo;Three enterprise systems in production. Two live today. One in UAT. Each built in under three months.&rdquo;
            </blockquote>
            <div className="flex justify-between text-text-dim text-sm mt-8 sm:mt-12 max-w-md mx-auto">
              <a href="https://agenticbricks.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">agenticbricks.com</a>
              <span>April 2026</span>
            </div>
            <div className="mt-10 sm:mt-14 animate-bounce">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mx-auto"><path d="M12 5v14M5 12l7 7 7-7" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </header>
      </div>

      {/* ═══ STICKY NAV ═══ */}
      <nav className="sticky-nav">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 gap-1">
          <div className="flex gap-0.5 sm:gap-1 md:gap-2 overflow-x-auto scrollbar-hide">
            {NAV.map(n => (
              <a key={n.href} href={n.href} className="text-text-muted hover:text-gold text-xs sm:text-sm md:text-base font-medium px-2 sm:px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors">{n.label}</a>
            ))}
          </div>
          <button onClick={toggleTheme} className="text-text-dim hover:text-heading text-xs px-2 py-1 rounded border border-white/10 ml-1 sm:ml-2 whitespace-nowrap transition-colors shrink-0">
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </nav>

      {/* ═══ WHO WE ARE ═══ */}
      <Section id="who">
        <SectionLabel color="teal">Who We Are</SectionLabel>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-heading mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
          We ship production software.
        </h2>
        <p className="text-text-muted text-base sm:text-xl max-w-4xl mb-4 leading-relaxed">
          Most engagements in this space start with three to six months of discovery. The vendor is learning your domain, your workflows, your compliance requirements. <span className="text-gold font-semibold">You fund the education.</span>
        </p>
        <p className="text-text-muted text-base sm:text-xl max-w-4xl mb-4 leading-relaxed">
          We&apos;ve worked inside regulated and complex organizations across pharma, healthcare, financial services, and manufacturing. When a client describes an industry-specific workflow or a compliance gap, we already know the context. <span className="text-teal font-semibold">Architecture decisions happen in week one, not month four.</span>
        </p>
        <p className="text-text-muted text-base sm:text-xl max-w-4xl mb-4 leading-relaxed">
          We use Anthropic&apos;s Claude Code throughout the build: test generation, cross-file refactoring, documentation. The pace is faster than anything a traditional team delivers. The quality bar is identical.
        </p>
        <p className="text-text-muted text-base sm:text-xl max-w-4xl mb-8 sm:mb-14 leading-relaxed font-semibold text-heading">
          No staff augmentation. No AI strategy decks. Software that runs.
        </p>

        <div className="grid md:grid-cols-3 gap-3 sm:gap-6">
          {[
            { title: 'Domain-first', color: '#0D9488', text: 'Our first commit includes the compliance controls and audit infrastructure your industry requires. Most vendors are still learning the terminology in month three.' },
            { title: 'Build before pitch', color: '#C9A84C', text: "Every pitch includes something that runs. If we can't show you a working system, we don't pitch." },
            { title: 'Production, not pilots', color: '#14B8A6', text: 'Specialty pharma manufacturer: empty repository to cGMP production in 89 days. That is not typical.' },
          ].map(card => (
            <div key={card.title} className="card p-5 sm:p-8 rounded-2xl">
              <div className="w-1.5 h-8 sm:h-10 rounded-full mb-3 sm:mb-5" style={{ background: card.color }} />
              <h3 className="text-base sm:text-xl font-bold text-heading mb-2 sm:mb-3">{card.title}</h3>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ THREE SERVICES ═══ */}
      <Section id="services">
        <SectionLabel color="gold">Our Services</SectionLabel>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-heading mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
          Three services that compound
        </h2>
        <p className="text-text-muted text-base sm:text-xl max-w-3xl mb-8 sm:mb-12 leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
          &ldquo;They work together or independently, depending on where you are.&rdquo;
        </p>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              num: '01', color: '#0D9488', title: 'Enterprise App Modernization',
              desc: 'Replace aging systems without breaking what\'s already working. Phased delivery. Nothing goes dark.',
              caps: ['EHR, LIMS, MES, ERP, WMS document management', 'Audit trail and Part 11 controls in the first commit', 'Nothing goes dark mid-implementation', '21 CFR Part 11, GxP, GAMP5, Annex 11 in the architecture'],
              proof: 'Large supply chain co: mapping 20+ years of mainframes, Lotus Notes, and offline systems. Active.',
            },
            {
              num: '02', color: '#C9A84C', title: 'AI-Assisted Engineering',
              desc: 'AI runs inside the build: generating tests, refactoring across files, writing documentation. Not a chatbot on top of your codebase.',
              caps: ['Codebase analysis, test generation, standards enforcement', 'Near-complete automated test coverage as standard', 'Iterates through failures automatically', 'Delivery speed 3x faster'],
              proof: 'Specialty pharma manufacturer: production in 89 days. Comparable projects: 12 to 18 months.',
            },
            {
              num: '03', color: '#14B8A6', title: 'Custom SaaS',
              desc: 'We build it, we run it, we keep improving it. You pay a monthly subscription and use it.',
              caps: ['No capital approval needed', 'We operate, monitor, and continuously improve', 'Built once, redeployable across clients or sites', 'Validation cost splits across every deployment'],
              proof: 'AgenticCLM: contract intake through executed agreement. Top 10 pharma company. In UAT.',
            },
          ].map(s => (
            <div key={s.num} className="card p-5 sm:p-10 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 sm:w-28 h-20 sm:h-28 rounded-bl-full" style={{ background: `${s.color}08` }} />
              <div className="text-4xl sm:text-5xl font-extrabold mb-3" style={{ color: s.color, fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
              <h3 className="text-lg sm:text-xl font-bold text-heading mb-2 sm:mb-3">{s.title}</h3>
              <p className="text-text-muted text-sm sm:text-base italic mb-4 sm:mb-6 leading-relaxed">{s.desc}</p>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {s.caps.map(c => (
                  <li key={c} className="text-text-muted text-sm sm:text-base flex items-start gap-3">
                    <span className="mt-1.5 shrink-0" style={{ color: s.color }}>&#8226;</span>{c}
                  </li>
                ))}
              </ul>
              <div className="p-3 sm:p-4 rounded-xl text-sm italic" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20`, color: s.color }}>
                {s.proof}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ INDUSTRIES ═══ */}
      <Section id="industries">
        <SectionLabel color="teal-lt">Industries We Serve</SectionLabel>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-heading mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
          Six verticals. Each with production work behind it.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mt-8 sm:mt-12">
          {[
            { name: 'Healthcare & Pharma', color: '#0D9488', tag: 'Commercial & Manufacturing', caps: 'GxP & 21 CFR Part 11 compliance · Revenue management: gross-to-net, chargeback, AMP, Best Price, Medicaid · Contract lifecycle management · cGMP manufacturing operations · Government pricing and 340B', proof: '3 systems in production or UAT. AgenticCLM, PharmaRevOps, Demand Forecasting & Inventory Management.' },
            { name: 'Manufacturing & Supply Chain', color: '#C9A84C', tag: 'Operations & Modernization', caps: 'Legacy system modernization · ERP, MES, WMS integration · Shop floor and warehouse visibility · Demand forecasting and inventory · Operational data pipelines', proof: 'Active engagement: 20+ year legacy landscape across mainframes, Lotus Notes, and Azure.' },
            { name: 'Financial Services', color: '#F59E0B', tag: 'Workflow & Compliance', caps: 'Document AI and extraction · Multi-agent review workflows · Automated client communications · Compliance and audit trail controls · Enterprise security requirements', proof: 'CPA firm: document AI, multi-agent review, automated client communications. Four weeks from kickoff to live.' },
            { name: 'Healthcare Research', color: '#EC4899', tag: 'Data Security & AI/ML', caps: 'HIPAA-compliant data architecture · Zero-egress Azure environments · PHI research infrastructure · Private endpoints and network isolation · AI/ML on sensitive health data', proof: 'Zero-egress PHI research enclave on Azure. Researchers run AI/ML workloads on sensitive data without moving it.' },
            { name: 'Education & Research', color: '#8B5CF6', tag: 'Adaptive Learning', caps: 'Knowledge graph architecture · Adaptive learning algorithms · Real-time proficiency modeling · AI-generated content at scale · Student performance analytics', proof: 'MathPractice.ai: knowledge graph curriculum, real-time proficiency tracking, AI-generated practice at scale.' },
            { name: 'Media & Content', color: '#0EA5E9', tag: 'Autonomous Pipelines', caps: 'Multi-modal AI orchestration · Autonomous content pipelines · Human-in-the-loop escalation · Text, audio, and image generation · End-to-end workflow automation', proof: 'Autonomous media pipeline: text, audio, art, metadata end-to-end. Multi-modal AI orchestration. Built in 8 weeks.' },
          ].map(ind => (
            <div key={ind.name} className="card p-5 sm:p-8 rounded-2xl">
              <div className="w-1.5 h-8 rounded-full mb-3 sm:mb-4" style={{ background: ind.color }} />
              <h3 className="text-base sm:text-lg font-bold mb-1" style={{ color: ind.color }}>{ind.name}</h3>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-text-dim block mb-3 sm:mb-4">{ind.tag}</span>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">{ind.caps}</p>
              <p className="text-sm italic font-semibold" style={{ color: ind.color }}>{ind.proof}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ AGENTICCLM ═══ */}
      <Section id="clm">
        <SectionLabel color="teal">Flagship Product</SectionLabel>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-heading mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>AgenticCLM</h2>
        <div className="glow-line max-w-xs mb-4" />
        <p className="text-text-muted text-base sm:text-xl max-w-4xl mb-8 sm:mb-12 leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
          &ldquo;Contract intake through executed agreement. Built for pharmaceutical compliance. Top 10 pharma company. In UAT.&rdquo;
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-8">
          {[
            { color: '#0D9488', title: 'AI-Assisted Redlining', text: 'Clause-level suggestions and risk flags on incoming drafts. Editing happens inside the system. No Word documents flying back and forth.' },
            { color: '#0D9488', title: 'Template & Clause Library', text: "Pre-approved clause language with deviation tracking. Legal fallback positions are in the system, not in someone's email." },
            { color: '#C9A84C', title: 'DocuSign E-Signature', text: '21 CFR Part 11 e-signature flow. Every version, comment, and approval is in the audit trail.' },
            { color: '#C9A84C', title: 'External Negotiation', text: 'External counterparties get a controlled portal to review and redline. Every exchange is tracked. Nothing happens outside the system.' },
            { color: '#14B8A6', title: 'Pipeline Dashboard', text: "Full portfolio view: every contract, what stage it's in, what's blocking it, what needs escalation." },
            { color: '#14B8A6', title: 'Pharma Compliance Architecture', text: 'SendGrid email, in-app notifications, Azure AD SAML 2.0. Passes enterprise pharma IT security review.' },
          ].map(f => (
            <div key={f.title} className="card p-5 sm:p-8 rounded-2xl">
              <div className="w-1.5 h-8 rounded-full mb-3 sm:mb-4" style={{ background: f.color }} />
              <h3 className="text-base sm:text-lg font-bold text-heading mb-2 sm:mb-3">{f.title}</h3>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="https://agentic-clm-772467090794.us-west1.run.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-semibold hover:opacity-90 transition-colors" style={{ backgroundColor: '#0D9488', color: '#fff' }}>
            See AgenticCLM Live
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </Section>

      {/* ═══ PHARMAREVOPS ═══ */}
      <Section id="revops">
        <SectionLabel color="gold">Pharma Revenue Operations</SectionLabel>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-heading mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>PharmaRevOps</h2>
        <div className="glow-line max-w-xs mb-4" />
        <p className="text-teal text-base sm:text-xl max-w-4xl mb-6 leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
          &ldquo;Revenue management platform built for pharma. Purpose-built for emerging and mid-size manufacturers.&rdquo;
        </p>

        <div className="card p-5 sm:p-8 rounded-2xl mb-8 sm:mb-12" style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)' }}>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed">
            Emerging and mid-size pharma manufacturers face the same compliance requirements as the Top 10 — gross-to-net waterfall, chargeback validation, AMP, Best Price, Medicaid URAs — but without the budget or timeline for enterprise-scale implementations. <span className="text-gold font-semibold">PharmaRevOps is a modern platform built specifically for them.</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-8">
          {[
            { color: '#0D9488', title: 'Gross-to-Net Waterfall', text: 'Full waterfall from WAC to net revenue. Configurable adjustment layers: chargebacks, rebates, returns, co-pay assistance. Every line is auditable.' },
            { color: '#C9A84C', title: 'Chargeback Processing', text: 'Chargeback validation against contract terms. Exceptions flagged automatically. Dispute workflow and distributor reconciliation built in.' },
            { color: '#14B8A6', title: 'AMP & Best Price', text: 'Monthly AMP and quarterly Best Price pipelines. Audit trail on every input. Restatement workflow. CMS submission readiness check before you file.' },
            { color: '#6366F1', title: 'Medicaid Rebate Accruals', text: 'State-level Medicaid rebate accrual and liability forecasting. URA calculation with MDRP compliance checks.' },
            { color: '#EC4899', title: '340B Compliance', text: '340B ceiling price calculation and compliance monitoring. Duplicate discount detection. Covered entity eligibility checked against HRSA data.' },
            { color: '#F59E0B', title: 'CPI Penalty & Forecasting', text: 'CPI penalty calculation and forward-looking accrual forecasting. Run price increase scenarios before you file to see penalty exposure.' },
          ].map(m => (
            <div key={m.title} className="card p-5 sm:p-8 rounded-2xl">
              <div className="w-1.5 h-8 rounded-full mb-3 sm:mb-4" style={{ background: m.color }} />
              <h3 className="text-base sm:text-lg font-bold text-heading mb-2 sm:mb-3">{m.title}</h3>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="https://pharmarevops-ui-1063256373100.us-central1.run.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-semibold hover:opacity-90 transition-colors" style={{ backgroundColor: '#C9A84C', color: '#fff' }}>
            See PharmaRevOps Live
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </Section>

      {/* ═══ DEMAND FORECASTING ═══ */}
      <Section id="demand">
        <SectionLabel color="teal-lt">Pharma Manufacturing Operations</SectionLabel>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-heading mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Demand Forecasting &amp; Inventory Management</h2>
        <div className="glow-line max-w-xs mb-4" />
        <p className="text-text-muted text-base sm:text-xl max-w-4xl mb-6 leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
          &ldquo;89 days from kickoff to production. cGMP facility. FDA Prior Approval. Existing SOPs unchanged.&rdquo;
        </p>

        <div className="card p-5 sm:p-8 rounded-2xl mb-8 sm:mb-12" style={{ background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.15)' }}>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed">
            A specialty generics manufacturer ran a 150,000 sq ft cGMP facility with inventory and production planning on paper. Digitizing meant a revalidation risk they couldn&apos;t take. We built a visibility layer that reads from their existing GMP documents via OCR. <span className="text-teal-lt font-semibold">Operators kept their current SOPs. The system learned their operation, not the other way.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <div className="card p-5 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <ChartIcon />
              <h3 className="text-lg sm:text-xl font-bold text-teal">Demand Forecasting</h3>
            </div>
            {[
              { label: 'Production Demand Modeling', text: 'Forecast production requirements against current inventory, open orders, and historical consumption.' },
              { label: 'Inventory Burn-Rate Intelligence', text: 'Track consumption velocity across raw materials and finished goods. Automated alerts when stock levels cross reorder thresholds.' },
              { label: 'Shortage Risk Detection', text: 'Identify at-risk materials before stockouts occur. Cross-reference supplier lead times, current burn rate, and open purchase orders.' },
            ].map(item => (
              <div key={item.label} className="mb-4 sm:mb-5">
                <div className="text-sm sm:text-base font-bold text-teal mb-1">{item.label}</div>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="card p-5 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <FactoryIcon />
              <h3 className="text-lg sm:text-xl font-bold text-gold">Inventory Management</h3>
            </div>
            {[
              { label: 'Real-Time Warehouse Visibility', text: 'Unified view of raw material and finished goods inventory across warehouse locations.' },
              { label: 'GMP-Compliant Audit Trail', text: 'Every inventory movement, adjustment, and status change recorded with timestamp, user, and reason. 21 CFR Part 11 controls built in.' },
              { label: 'OCR Integration Layer', text: 'Reads from existing GMP paper documents. Operators keep current SOPs. The system learns the operation, not the other way around.' },
            ].map(item => (
              <div key={item.label} className="mb-4 sm:mb-5">
                <div className="text-sm sm:text-base font-bold text-gold mb-1">{item.label}</div>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ HOW WE WORK TOGETHER ═══ */}
      <Section id="engage">
        <SectionLabel color="gold">Engagement Models</SectionLabel>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-heading mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
          How we work together
        </h2>
        <p className="text-text-muted text-base sm:text-xl max-w-3xl mb-8 sm:mb-12 leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
          &ldquo;Three ways to structure an engagement. Most start with one and grow.&rdquo;
        </p>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { letter: 'A', color: '#0D9488', title: 'Build together', sub: 'Joint delivery on a specific client problem', steps: [
              { label: 'You bring the client and the problem', body: 'The relationship and the domain context are yours.' },
              { label: 'We scope and build the system', body: 'Architecture, engineering, compliance controls — all handled.' },
              { label: 'Client gets a working product', body: 'Not a prototype. Production software they use.' },
              { label: 'Economics split', body: 'We share the engagement economics. Terms fit the deal.' },
            ]},
            { letter: 'B', color: '#C9A84C', title: 'Platform your AI team', sub: 'We accelerate what your incoming AI team builds', steps: [
              { label: 'Your team is onboarding now', body: 'New hires need patterns, infrastructure, and a codebase that works.' },
              { label: 'We provide the platform and the patterns', body: 'CI/CD, test harness, compliance scaffolding, working examples.' },
              { label: 'Delivery is 3x faster from day one', body: 'Your team ships immediately instead of building plumbing.' },
              { label: 'Your firm keeps full ownership', body: 'Code, IP, infrastructure — all yours. We hand off clean.' },
            ]},
            { letter: 'C', color: '#14B8A6', title: 'License a product', sub: 'Deploy AgenticCLM or PharmaRevOps into a client', steps: [
              { label: 'You have a client with the problem', body: 'CLM or revenue management — the product already exists.' },
              { label: 'We white-glove the deployment', body: 'Configuration, integration, validation, training.' },
              { label: 'Client is live in weeks, not months', body: 'The product is built. Deployment is the only variable.' },
              { label: 'Revenue shared', body: 'License or subscription. Terms structured per deployment.' },
            ]},
          ].map(m => (
            <div key={m.letter} className="card p-5 sm:p-10 rounded-2xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ background: `${m.color}15`, color: m.color, fontFamily: "'Playfair Display', serif" }}>{m.letter}</div>
              <h3 className="text-lg sm:text-xl font-bold text-heading mb-1">{m.title}</h3>
              <p className="text-sm text-text-muted italic mb-5 sm:mb-8">{m.sub}</p>
              {m.steps.map((s, j) => (
                <div key={j} className="mb-3 sm:mb-4">
                  <div className="text-sm sm:text-base font-bold" style={{ color: m.color }}>{s.label}</div>
                  <p className="text-sm text-text-muted mt-0.5">{s.body}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ THE DELIVERY DIFFERENCE ═══ */}
      <Section id="delivery">
        <SectionLabel color="teal">The Delivery Difference</SectionLabel>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-heading mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
          Three things that compound
        </h2>
        <p className="text-text-muted text-base sm:text-xl max-w-3xl mb-8 sm:mb-12 leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
          &ldquo;Take one away and the timeline stretches back to eighteen months.&rdquo;
        </p>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {[
            { icon: <ShieldIcon />, num: '1', color: '#0D9488', title: 'Domain Knowledge', text: "We've worked inside pharmaceutical and healthcare organizations. When a client describes a deviation workflow or a Part 11 control gap, we already know the context. Correct architecture in week one, not after three months of reading SOPs." },
            { icon: <RocketIcon />, num: '2', color: '#C9A84C', title: 'Engineering Rigor', text: "Speed in regulated software comes from making the right call early. Every module ships with near-complete automated test coverage. Architecture decisions that don't have to be rebuilt later." },
            { icon: <AIIcon />, num: '3', color: '#14B8A6', title: 'AI-Assisted Engineering', text: "Anthropic's Claude Code reads the full codebase and executes multi-step tasks: boilerplate, test generation, cross-file refactoring, documentation. Engineers review every line before it merges." },
          ].map(p => (
            <div key={p.num} className="card p-5 sm:p-8 rounded-2xl text-center">
              <div className="flex justify-center mb-4 sm:mb-5">{p.icon}</div>
              <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: p.color }}>{p.title}</h3>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <div className="card p-5 sm:p-8 rounded-2xl" style={{ borderLeft: '4px solid #EF4444' }}>
            <h3 className="text-lg sm:text-xl font-bold text-red mb-3 sm:mb-4">Traditional approach</h3>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4">
              3 to 6 months discovery. 6 to 12 months build. 3 to 6 months stabilization. <span className="text-red font-bold">12 to 18+ months</span> before anyone uses it.
            </p>
            <div className="h-3 rounded-full overflow-hidden mb-4" style={{ backgroundColor: 'rgba(239,68,68,0.15)' }}>
              <div className="h-full rounded-full bg-red" style={{ width: '100%' }} />
            </div>
            <p className="text-text-muted text-sm italic">The compliance learning curve runs alongside the build the whole time, creating rework at every stage.</p>
          </div>
          <div className="card p-5 sm:p-8 rounded-2xl" style={{ borderLeft: '4px solid #0D9488' }}>
            <h3 className="text-lg sm:text-xl font-bold text-teal mb-3 sm:mb-4">AgenticBricks</h3>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4">
              Week 1: architecture locked. Month 1: working software. <span className="text-teal font-bold">Month 3: production.</span>
            </p>
            <div className="h-3 rounded-full overflow-hidden mb-4" style={{ backgroundColor: 'rgba(13,148,136,0.15)' }}>
              <div className="h-full rounded-full bg-teal" style={{ width: '17%' }} />
            </div>
            <p className="text-text-muted text-sm italic">Demonstrated at a cGMP facility with FDA Prior Approval. Not a projection.</p>
          </div>
        </div>
      </Section>

      {/* ═══ THE TEAM ═══ */}
      <Section id="team">
        <SectionLabel color="gold">The Team</SectionLabel>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-heading mb-8 sm:mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
          Led by builders, not consultants
        </h2>
        <div className="grid md:grid-cols-2 gap-5 sm:gap-8">
          {[
            {
              initials: 'RB', name: 'Rajesh Brundala', title: 'Co-founder · AgenticBricks', color: '#C9A84C', gradient: 'from-gold to-teal',
              bio: 'Built PharmaRevOps covering gross-to-net waterfall, AMP, Best Price, Medicaid rebate accruals, and 340B compliance. Led AgenticCLM from spec to UAT at a top 10 pharma company. Architecture and client relationships both run through him.',
              domains: ['GxP / 21 CFR Part 11', 'Enterprise SaaS', 'Agentic AI systems', 'Pharma CLM', 'Government contracting'],
            },
            {
              initials: 'PK', name: 'Pavan Kanaparthy', title: 'Co-founder · AgenticBricks', color: '#0D9488', gradient: 'from-teal to-teal-lt',
              bio: 'Runs the engineering delivery model that took a cGMP pharma manufacturer from empty repository to production in 89 days. Built and operates production systems where a compliance failure means an FDA finding. Maintains near-complete automated test coverage across every engagement.',
              domains: ['Healthcare IT', 'AI-assisted delivery', 'Full-stack engineering', 'Regulated software', 'Custom SaaS operations'],
            },
          ].map(t => (
            <div key={t.initials} className="card p-5 sm:p-10 rounded-2xl">
              <div className="flex items-center gap-4 sm:gap-5 mb-5 sm:mb-8">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-lg sm:text-2xl font-bold shrink-0`} style={{ fontFamily: "'Playfair Display', serif" }}>{t.initials}</div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-heading">{t.name}</h3>
                  <p className="text-sm sm:text-base text-text-dim">{t.title}</p>
                </div>
              </div>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-5 sm:mb-8">{t.bio}</p>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-text-dim mb-3">Areas of depth</div>
              <div className="flex flex-wrap gap-2">
                {t.domains.map(d => (
                  <span key={d} className="text-xs sm:text-sm px-3 py-1 rounded-full" style={{ background: `${t.color}12`, color: t.color, border: `1px solid ${t.color}25` }}>{d}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ LET'S TALK (CTA) ═══ */}
      <div className="slide" id="contact">
        <section className="relative py-12 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-16 mesh-gradient overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/3 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-teal/5 blur-3xl" />
            <div className="absolute top-0 right-1/4 w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-gold/5 blur-3xl" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <SectionLabel color="gold">Let&apos;s Talk</SectionLabel>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-heading mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Let&apos;s talk.
            </h2>
            <p className="text-gold text-base sm:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              &ldquo;Two pharma systems live right now. Click the URLs below before we talk. If you have questions about what you see, we&apos;re ready.&rdquo;
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-2xl mx-auto mb-8 sm:mb-12">
              <div className="card p-4 sm:p-8 rounded-2xl">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-gold to-teal flex items-center justify-center text-white text-base sm:text-xl font-bold mx-auto mb-3 sm:mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>RB</div>
                <h3 className="text-base sm:text-lg font-bold text-heading">Rajesh Brundala</h3>
                <p className="text-text-dim text-xs sm:text-sm mb-2">Co-founder, AgenticBricks</p>
                <a href="https://agenticbricks.com" target="_blank" rel="noopener noreferrer" className="text-teal text-xs sm:text-base hover:underline block mt-1 sm:mt-2">agenticbricks.com</a>
                <a href="https://linkedin.com/company/agenticbricks" target="_blank" rel="noopener noreferrer" className="text-text-muted text-xs sm:text-sm hover:underline block mt-1">linkedin.com/company/agenticbricks</a>
              </div>
              <div className="card p-4 sm:p-8 rounded-2xl">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-teal to-teal-lt flex items-center justify-center text-white text-base sm:text-xl font-bold mx-auto mb-3 sm:mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>PK</div>
                <h3 className="text-base sm:text-lg font-bold text-heading">Pavan Kanaparthy</h3>
                <p className="text-text-dim text-xs sm:text-sm mb-2">Co-founder, AgenticBricks</p>
                <a href="https://agenticbricks.com" target="_blank" rel="noopener noreferrer" className="text-teal text-xs sm:text-base hover:underline block mt-1 sm:mt-2">agenticbricks.com</a>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
              <a href="https://agentic-clm-772467090794.us-west1.run.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-semibold hover:opacity-90 transition-colors" style={{ backgroundColor: '#0D9488', color: '#fff' }}>
                See AgenticCLM Live
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="https://pharmarevops-ui-1063256373100.us-central1.run.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-semibold hover:opacity-90 transition-colors" style={{ backgroundColor: '#C9A84C', color: '#fff' }}>
                See PharmaRevOps Live
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="https://agenticbricks.com/work" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-teal-lt/30 text-teal-lt text-sm sm:text-lg font-semibold hover:bg-teal-lt/5 transition-colors">
                Explore Our Work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        </section>
      </div>

      <footer className="py-8 text-center text-text-dim text-sm">
        &copy; 2026 AgenticBricks. All rights reserved.
      </footer>

      <AskAI />
    </div>
  )
}
