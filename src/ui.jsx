import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function CopyButton({ text, label = 'Copy' }) {
  const [ok, setOk] = useState(false)
  const go = async () => {
    try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500) } catch { /* blocked */ }
  }
  return (
    <button className="btn btn-ghost inline-flex items-center gap-2" onClick={go} disabled={!text}>
      {ok ? <Check size={16} /> : <Copy size={16} />}{ok ? 'Copied' : label}
    </button>
  )
}
