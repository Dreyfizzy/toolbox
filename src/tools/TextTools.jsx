import { useState } from 'react'
import { CopyButton } from '../ui'

const ACTIONS = {
  UPPERCASE: (t) => t.toUpperCase(),
  lowercase: (t) => t.toLowerCase(),
  'Title Case': (t) => t.toLowerCase().replace(/(^|\s)\p{L}/gu, (m) => m.toUpperCase()),
  'Sentence case': (t) => t.toLowerCase().replace(/(^\s*|[.!?]\s+)(\p{L})/gu, (_, a, b) => a + b.toUpperCase()),
  'Clean spaces': (t) => t.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim(),
  'slug-case': (t) => t.toLowerCase().trim().replace(/[^\p{L}\d]+/gu, '-').replace(/^-|-$/g, ''),
}

export default function TextTools() {
  const [text, setText] = useState('')
  const words = (text.match(/\S+/g) || []).length
  const stats = [
    ['Characters', text.length],
    ['Words', words],
    ['Sentences', (text.match(/[.!?]+(\s|$)/g) || []).length],
    ['Reading time', words ? `${Math.max(1, Math.ceil(words / 200))} min` : '0 min'],
  ]
  return (
    <div className="space-y-4">
      <textarea className="field min-h-40" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste or type your text" aria-label="Text" />
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(([k, v]) => (
          <div key={k} className="rounded-lg border border-line bg-bg px-3 py-2">
            <dt className="text-xs text-muted">{k}</dt><dd className="font-display text-xl font-extrabold">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-2">
        {Object.entries(ACTIONS).map(([name, fn]) => (
          <button key={name} className="btn btn-ghost !py-1.5 text-sm" onClick={() => setText(fn(text))}>{name}</button>
        ))}
      </div>
      <CopyButton text={text} label="Copy text" />
    </div>
  )
}
