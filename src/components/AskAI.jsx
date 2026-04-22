import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors } from '../theme'

const SYSTEM_PROMPT = `You are the AgenticBricks AI assistant embedded in their capabilities deck.
You help viewers understand AgenticBricks' work, products, and how they might work together.
You know AgenticBricks deeply: they build production software for pharma, manufacturing,
financial services, healthcare research, education, and media. Their pharma products are
AgenticCLM (contract lifecycle management, live URL: agentic-clm-772467090794.us-west1.run.app)
and PharmaRevOps (revenue management replacing Model N, live URL: pharmarevops-ui-1063256373100.us-central1.run.app).
They delivered a cGMP pharma manufacturer from empty repository to production in 89 days.
Three engagement models: Build together, Platform your AI team, License a product.
Founders: Rajesh Brundala (pharma revenue management + CLM) and Pavan Kanaparthy (engineering delivery).
Contact: agenticbricks.com
Keep answers concise (3-5 sentences max). Be direct, specific, no marketing fluff.
If someone asks about pricing or timelines, say those are discussed in a working session
and offer to help them get in touch via agenticbricks.com/contact.
Never fabricate case study details beyond what you know.`

const SUGGESTED = [
  'What is PharmaRevOps?',
  'How quickly can you deliver?',
  'What would working together look like?',
]

export default function AskAI() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const scrollRef = useRef(null)
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
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
      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }))
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 512,
          system: SYSTEM_PROMPT,
          stream: true,
          messages: apiMessages,
        }),
      })

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''

      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') break
            try {
              const parsed = JSON.parse(data)
              if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                assistantText += parsed.delta.text
                setMessages(prev => {
                  const updated = [...prev]
                  updated[updated.length - 1] = { role: 'assistant', content: assistantText }
                  return updated
                })
              }
            } catch {}
          }
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    }
    setStreaming(false)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-16 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full cursor-pointer transition-transform hover:scale-105"
        style={{ backgroundColor: colors.teal, color: colors.white }}
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-60"
            style={{ backgroundColor: colors.tealLt, animation: 'pulse-ring 2s ease-out infinite' }}
          />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
          </svg>
        </span>
        <span className="text-sm font-medium">Ask AI</span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[380px] flex flex-col shadow-2xl"
            style={{ backgroundColor: colors.bgCard, borderLeft: `1px solid ${colors.bgLight}` }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: colors.bgLight }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.tealLt }} />
                <span className="font-medium text-sm" style={{ color: colors.white }}>Ask AgenticBricks</span>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={() => setMessages([])}
                    className="text-xs px-2 py-1 rounded cursor-pointer transition-colors"
                    style={{ color: colors.muted, backgroundColor: colors.bgLight }}
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="text-lg cursor-pointer w-7 h-7 flex items-center justify-center rounded transition-colors"
                  style={{ color: colors.muted }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm" style={{ color: colors.muted }}>
                    Ask anything about AgenticBricks, our products, or how we might work together.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-xs px-3 py-1.5 rounded-full cursor-pointer transition-colors"
                        style={{ backgroundColor: colors.bgLight, color: colors.tealLt, border: `1px solid ${colors.teal}40` }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed"
                    style={{
                      backgroundColor: m.role === 'user' ? colors.teal : colors.bgLight,
                      color: m.role === 'user' ? colors.white : colors.off,
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {streaming && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="flex justify-start">
                  <div className="px-3.5 py-2.5 rounded-xl text-sm" style={{ backgroundColor: colors.bgLight, color: colors.muted }}>
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: colors.tealLt, animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: colors.tealLt, animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: colors.tealLt, animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t" style={{ borderColor: colors.bgLight }}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                  placeholder="Ask a question..."
                  className="flex-1 px-3 py-2 rounded-lg text-sm outline-none placeholder:text-muted"
                  style={{ backgroundColor: colors.bgLight, color: colors.white, border: `1px solid ${colors.bgLight}` }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || streaming}
                  className="px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-opacity disabled:opacity-40"
                  style={{ backgroundColor: colors.teal, color: colors.white }}
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
