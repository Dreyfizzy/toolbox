import { useEffect, useState } from 'react'

const KEYS = ['C', '(', ')', '⌫', '7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', '.', '^', '+', '√', '=']

// Only digits and operators are allowed through, so nothing else can run.
function evaluate(exp) {
  if (!/^[\d+\-−×÷*/().^√\s]+$/.test(exp)) throw new Error('bad input')
  const js = exp.replace(/√/g, 'Math.sqrt').replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-').replace(/\^/g, '**')
  const r = Function(`"use strict"; return (${js})`)()
  if (!Number.isFinite(r)) throw new Error('not finite')
  return String(+r.toFixed(10))
}

export default function Calculator() {
  const [s, setS] = useState({ exp: '', fresh: false, err: false })

  const press = (k) => setS(({ exp, fresh }) => {
    if (k === 'C') return { exp: '', fresh: false }
    if (k === '⌫') return { exp: exp.slice(0, -1), fresh: false }
    if (k === '=') {
      if (!exp) return { exp, fresh }
      try { return { exp: evaluate(exp), fresh: true } } catch { return { exp: '', fresh: false, err: true } }
    }
    const base = fresh && /[\d.√(]/.test(k) ? '' : exp
    return { exp: base + (k === '√' ? '√(' : k), fresh: false }
  })

  useEffect(() => {
    const map = { '/': '÷', '*': '×', '-': '−' }
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || ['BUTTON', 'INPUT'].includes(e.target.tagName)) return
      const k = e.key
      if (k === 'Enter' || k === '=') { e.preventDefault(); press('=') }
      else if (k === 'Backspace') press('⌫')
      else if (k === 'Escape' || k.toLowerCase() === 'c') press('C')
      else if (/^[\d.()+^]$/.test(k)) press(k)
      else if (map[k]) { e.preventDefault(); press(map[k]) }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  return (
    <div>
      <div role="status" className="mb-3 min-h-[4.5rem] overflow-x-auto whitespace-nowrap rounded-lg border border-line bg-bg px-4 py-3 text-right font-mono text-3xl">
        {s.err ? 'Error' : s.exp || '0'}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {KEYS.map((k) => (
          <button key={k} onClick={(e) => { press(k); if (e.detail) e.currentTarget.blur() }}
            className={`rounded-lg border border-line py-3.5 font-mono text-lg transition-colors hover:bg-ink hover:text-bg ${
              k === '=' ? '!border-transparent !bg-accent font-bold !text-on-accent col-span-3 hover:brightness-110'
              : 'C⌫'.includes(k) ? 'text-red-500' : '÷×−^+√'.includes(k) ? 'font-bold text-accent' : 'bg-bg'}`}>
            {k}
          </button>
        ))}
      </div>
    </div>
  )
}
