import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { usePersisted } from '../lib'
import { CopyButton } from '../ui'

export default function Notes() {
  const [notes, setNotes] = usePersisted('dreykit-notes', [])
  const [draft, setDraft] = useState('')

  const add = () => {
    const text = draft.trim()
    if (!text) return
    setNotes([{ id: Date.now(), text }, ...notes])
    setDraft('')
  }

  return (
    <div className="space-y-4">
      <textarea className="field min-h-28" value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="New note"
        onKeyDown={(e) => (e.ctrlKey || e.metaKey) && e.key === 'Enter' && add()} placeholder="Write a note (Ctrl+Enter to save)" />
      <button className="btn btn-primary" onClick={add}>Save note</button>
      {notes.length === 0 && <p className="text-muted">No notes yet. Write one above and it will stay on this device.</p>}
      <ul className="space-y-3">
        {notes.map((n) => (
          <li key={n.id} className="rounded-lg border border-line bg-bg p-3">
            <p className="whitespace-pre-wrap break-words">{n.text}</p>
            <div className="mt-2 flex gap-2">
              <CopyButton text={n.text} />
              <button className="btn btn-ghost inline-flex items-center gap-2 text-red-500" onClick={() => setNotes(notes.filter((x) => x.id !== n.id))}>
                <Trash2 size={16} />Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
