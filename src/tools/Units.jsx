import { useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'

const UNITS = {
  Length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254 },
  Mass: { kg: 1, g: 0.001, lb: 0.45359237, oz: 0.028349523 },
  Temperature: { C: 1, F: 1, K: 1 },
}

function convert(cat, from, to, v) {
  if (cat === 'Temperature') {
    const c = from === 'C' ? v : from === 'F' ? ((v - 32) * 5) / 9 : v - 273.15
    return to === 'C' ? c : to === 'F' ? (c * 9) / 5 + 32 : c + 273.15
  }
  return (v * UNITS[cat][from]) / UNITS[cat][to]
}

export default function Units() {
  const [cat, setCat] = useState('Length')
  const [from, setFrom] = useState('km')
  const [to, setTo] = useState('mi')
  const [val, setVal] = useState('1')

  const pick = (c) => { const [a, b] = Object.keys(UNITS[c]); setCat(c); setFrom(a); setTo(b) }
  const n = parseFloat(val)
  const out = Number.isFinite(n) ? Number(convert(cat, from, to, n).toPrecision(8)).toString() : ''
  const opts = Object.keys(UNITS[cat]).map((u) => <option key={u}>{u}</option>)

  return (
    <div className="space-y-4">
      <select className="field" value={cat} onChange={(e) => pick(e.target.value)} aria-label="Category">
        {Object.keys(UNITS).map((c) => <option key={c}>{c}</option>)}
      </select>
      <div className="flex items-center gap-2">
        <input className="field flex-1" type="number" value={val} onChange={(e) => setVal(e.target.value)} aria-label="Value" />
        <select className="field !w-24" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From unit">{opts}</select>
      </div>
      <button className="btn btn-ghost inline-flex items-center gap-2" onClick={() => { setFrom(to); setTo(from) }}>
        <ArrowLeftRight size={16} />Swap
      </button>
      <div className="flex items-center gap-2">
        <output className="field flex-1 font-mono">{out || '-'}</output>
        <select className="field !w-24" value={to} onChange={(e) => setTo(e.target.value)} aria-label="To unit">{opts}</select>
      </div>
    </div>
  )
}
