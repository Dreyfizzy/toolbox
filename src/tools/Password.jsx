import { useEffect, useState } from 'react'
import { CopyButton } from '../ui'

const SETS = {
  Lowercase: 'abcdefghijklmnopqrstuvwxyz', Uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  Numbers: '0123456789', Symbols: '!@#$%^&*()-_=+[]{};:,.?',
}
const rate = (b) => b < 50 ? ['Weak', '#ef4444'] : b < 70 ? ['Fair', '#e0a93b'] : b < 100 ? ['Strong', '#aa8f76'] : ['Excellent', '#3fb982']

export default function Password() {
  const [len, setLen] = useState(16)
  const [on, setOn] = useState({ Lowercase: true, Uppercase: true, Numbers: true, Symbols: true })
  const [pw, setPw] = useState('')
  const pool = Object.keys(SETS).filter((k) => on[k]).map((k) => SETS[k]).join('')

  const gen = () => setPw(pool ? [...crypto.getRandomValues(new Uint32Array(len))].map((x) => pool[x % pool.length]).join('') : '')
  useEffect(() => { gen() }, [len, on]) // eslint-disable-line react-hooks/exhaustive-deps

  const bits = pool ? len * Math.log2(pool.length) : 0
  const [label, color] = rate(bits)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-bg px-4 py-3">
        <span className="break-all font-mono text-lg" aria-live="polite">{pw || 'Pick at least one set'}</span>
        <CopyButton text={pw} />
      </div>
      <div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line">
          <div className="h-full transition-all" style={{ width: Math.min(100, bits / 1.3) + '%', background: color }} />
        </div>
        {pool && <p className="mt-1.5 text-sm text-muted">{label} (about {Math.round(bits)} bits)</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Object.keys(SETS).map((k) => (
          <label key={k} className="flex items-center gap-2">
            <input type="checkbox" className="accent-[#aa8f76]" checked={on[k]} onChange={() => setOn({ ...on, [k]: !on[k] })} />{k}
          </label>
        ))}
      </div>
      <label className="flex items-center gap-4">
        <span className="whitespace-nowrap">Length <b>{len}</b></span>
        <input type="range" min="8" max="64" value={len} onChange={(e) => setLen(+e.target.value)} className="flex-1 accent-[#aa8f76]" />
      </label>
      <button className="btn btn-primary" onClick={gen}>Generate password</button>
    </div>
  )
}
