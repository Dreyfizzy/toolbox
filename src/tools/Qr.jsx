import { useState } from 'react'
import QRCode from 'qrcode'
import { Download } from 'lucide-react'

export default function Qr() {
  const [text, setText] = useState('')
  const [src, setSrc] = useState('')
  const [err, setErr] = useState('')

  const make = async () => {
    const t = text.trim()
    if (!t) return setErr('Enter some text or a link first.')
    try { setSrc(await QRCode.toDataURL(t, { width: 512, margin: 2 })); setErr('') }
    catch { setErr('That text is too long for a QR code.') }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <input className="field flex-1 basis-56" value={text} autoFocus aria-label="Text or link"
          onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && make()}
          placeholder="https://example.com or any text" />
        <button className="btn btn-primary" onClick={make}>Generate QR code</button>
      </div>
      {err && <p role="alert" className="mt-3 text-red-500">{err}</p>}
      {src && (
        <div className="mt-6 text-center">
          <img src={src} alt="Generated QR code" className="mx-auto w-56 rounded-xl bg-white p-3" />
          <a href={src} download="qrcode.png" className="btn btn-ghost mt-4 inline-flex items-center gap-2"><Download size={16} />Download PNG</a>
        </div>
      )}
    </div>
  )
}
