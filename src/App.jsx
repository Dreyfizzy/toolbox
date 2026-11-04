import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { ArrowLeft, Moon, Search, Sun, Wrench } from 'lucide-react'
import { TOOLS } from './tools/registry'
import { usePersisted } from './lib'

const subscribe = (cb) => { addEventListener('hashchange', cb); return () => removeEventListener('hashchange', cb) }
const useHash = () => useSyncExternalStore(subscribe, () => location.hash.slice(1))

export default function App() {
  const id = useHash()
  const tool = TOOLS.find((t) => t.id === id)
  const sys = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const [theme, setTheme] = usePersisted('dreykit-theme', sys)
  const [q, setQ] = useState('')

  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark') }, [theme])
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = tool ? `${tool.name} - Dreykit` : 'Dreykit: free everyday tools'
  }, [tool])

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return TOOLS.filter((t) => !s || `${t.name} ${t.desc} ${t.tags}`.toLowerCase().includes(s))
  }, [q])
  const Tool = tool?.Component

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-5">
      <header className="flex items-center justify-between py-6">
        <a href="#" className="flex items-center gap-2.5 font-display text-xl font-extrabold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-bg"><Wrench size={18} /></span>
          Dreykit
        </a>
        <button className="btn btn-ghost !p-2.5" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      {Tool ? (
        <main className="flex-1">
          <a href="#" className="inline-flex items-center gap-1.5 text-muted hover:text-ink"><ArrowLeft size={16} />All tools</a>
          <h1 className="mb-1 mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{tool.name}</h1>
          <p className="mb-7 text-muted">{tool.hint}</p>
          <div className="panel max-w-xl"><Tool key={tool.id} /></div>
        </main>
      ) : (
        <main className="flex-1">
          <section className="py-10 sm:py-16">
            <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[.95] tracking-tight sm:text-7xl">A toolkit for the small jobs.</h1>
            <p className="mt-6 max-w-xl text-lg text-muted">{TOOLS.length} free tools that run in your browser. Nothing to install, nothing sent to a server.</p>
            <label className="relative mt-8 block max-w-md">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input className="field !pl-10" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools" aria-label="Search tools" />
            </label>
          </section>
          <div className="grid gap-3 lg:grid-cols-6 sm:grid-cols-2">
            {list.map((t) => (
              <a key={t.id} href={'#' + t.id}
                className={`group flex min-h-40 flex-col justify-between rounded-2xl border border-line bg-surface p-5 transition-colors hover:bg-ink hover:text-bg ${t.span}`}>
                <t.icon size={28} className="text-accent" />
                <div>
                  <h2 className="font-display text-2xl font-extrabold">{t.name}</h2>
                  <p className="mt-1 text-muted group-hover:text-bg">{t.desc}</p>
                </div>
              </a>
            ))}
          </div>
          {!list.length && <p className="text-muted">No tool matches &ldquo;{q}&rdquo;. Clear the search to see all tools.</p>}
        </main>
      )}

      <footer className="flex flex-wrap justify-between gap-2 pb-8 pt-16 text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Dreykit. Built by Drey.</p>
        <a className="hover:text-ink" href="https://github.com/Dreyfizzy/toolbox" target="_blank" rel="noopener noreferrer">Source on GitHub</a>
      </footer>
    </div>
  )
}
