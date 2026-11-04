import { useEffect, useState } from 'react'
import { pad } from '../lib'

const fmt = (ms) => { const t = Math.floor(ms / 10); return `${pad(Math.floor(t / 6000))}:${pad(Math.floor(t / 100) % 60)}.${pad(t % 100)}` }
const beep = () => {
  try { const a = new AudioContext(), o = a.createOscillator(); o.connect(a.destination); o.frequency.value = 880; o.start(); o.stop(a.currentTime + 0.5) } catch { /* no audio */ }
}

function Stopwatch() {
  const [ms, setMs] = useState(0)
  const [run, setRun] = useState(false)
  const [laps, setLaps] = useState([])
  useEffect(() => {
    if (!run) return
    const from = performance.now() - ms
    const id = setInterval(() => setMs(performance.now() - from), 30)
    return () => clearInterval(id)
  }, [run]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <p className="mb-5 font-mono text-5xl">{fmt(ms)}</p>
      <div className="flex flex-wrap gap-2">
        <button className="btn btn-primary" onClick={() => setRun(!run)}>{run ? 'Stop' : ms ? 'Resume' : 'Start'}</button>
        <button className="btn btn-ghost" disabled={!run} onClick={() => setLaps([ms, ...laps])}>Lap</button>
        <button className="btn btn-ghost" onClick={() => { setRun(false); setMs(0); setLaps([]) }}>Reset</button>
      </div>
      {laps.length > 0 && (
        <ol className="mt-5 space-y-1 font-mono text-sm text-muted">
          {laps.map((l, i) => <li key={i}>Lap {laps.length - i}: {fmt(l)}</li>)}
        </ol>
      )}
    </div>
  )
}

function Countdown() {
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')
  const [left, setLeft] = useState(0)
  const [run, setRun] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!run) return
    const end = performance.now() + left
    const id = setInterval(() => {
      const l = end - performance.now()
      if (l <= 0) { setLeft(0); setRun(false); setDone(true); beep() } else setLeft(l)
    }, 200)
    return () => clearInterval(id)
  }, [run]) // eslint-disable-line react-hooks/exhaustive-deps

  const start = () => {
    let l = left
    if (l <= 0) { l = ((+min || 0) * 60 + (+sec || 0)) * 1000; if (l <= 0) return; setLeft(l) }
    setDone(false); setRun(true)
  }
  const s = Math.ceil(left / 1000)

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {[1, 5, 10].map((m) => (
          <button key={m} className="btn btn-ghost !py-1.5 text-sm" onClick={() => { setRun(false); setLeft(0); setMin(m); setSec('') }}>{m} min</button>
        ))}
      </div>
      <div className="mb-4 flex gap-3">
        <input className="field !w-28" type="number" min="0" placeholder="Minutes" aria-label="Minutes" value={min} onChange={(e) => setMin(e.target.value)} />
        <input className="field !w-28" type="number" min="0" max="59" placeholder="Seconds" aria-label="Seconds" value={sec} onChange={(e) => setSec(e.target.value)} />
      </div>
      <p role="timer" className={`mb-5 font-mono text-5xl ${done ? 'text-green-500' : ''}`}>{done ? 'Time\u2019s up' : `${pad(Math.floor(s / 60))}:${pad(s % 60)}`}</p>
      <div className="flex flex-wrap gap-2">
        <button className="btn btn-primary" onClick={run ? () => setRun(false) : start}>{run ? 'Pause' : 'Start'}</button>
        <button className="btn btn-ghost" onClick={() => { setRun(false); setLeft(0); setDone(false) }}>Reset</button>
      </div>
    </div>
  )
}

export default function Timer() {
  const [tab, setTab] = useState('sw')
  return (
    <div>
      <div role="tablist" className="mb-6 inline-flex rounded-xl border border-line bg-bg p-1">
        {[['sw', 'Stopwatch'], ['cd', 'Countdown']].map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
            className={`rounded-lg px-4 py-1.5 ${tab === id ? 'bg-surface font-semibold shadow-sm' : 'text-muted'}`}>{label}</button>
        ))}
      </div>
      {tab === 'sw' ? <Stopwatch /> : <Countdown />}
    </div>
  )
}
