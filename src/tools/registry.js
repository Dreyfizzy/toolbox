import { Calculator as CalcIcon, KeyRound, QrCode, Ruler, StickyNote, Timer as TimerIcon, Type } from 'lucide-react'
import Qr from './Qr'
import Password from './Password'
import Calculator from './Calculator'
import Timer from './Timer'
import TextTools from './TextTools'
import Units from './Units'
import Notes from './Notes'

// To add a tool: build a component in this folder, then add one entry here.
export const TOOLS = [
  { id: 'qr', name: 'QR codes', icon: QrCode, span: 'lg:col-span-3', Component: Qr, tags: 'link url scan',
    desc: 'Turn a link or text into a code you can scan and download.', hint: 'Made in your browser. Nothing is uploaded.' },
  { id: 'password', name: 'Passwords', icon: KeyRound, span: 'lg:col-span-3', Component: Password, tags: 'secure random generator',
    desc: 'Create strong passwords with your browser\u2019s secure random source.', hint: 'Passwords are never sent anywhere.' },
  { id: 'calculator', name: 'Calculator', icon: CalcIcon, span: 'lg:col-span-2', Component: Calculator, tags: 'math maths',
    desc: 'Brackets, powers and square roots. Works with your keyboard.', hint: 'Use the keys or type.' },
  { id: 'timer', name: 'Timer', icon: TimerIcon, span: 'lg:col-span-2', Component: Timer, tags: 'stopwatch countdown lap',
    desc: 'A stopwatch with laps and a countdown that beeps.', hint: 'Switch between stopwatch and countdown.' },
  { id: 'text', name: 'Text tools', icon: Type, span: 'lg:col-span-2', Component: TextTools, tags: 'word count case slug',
    desc: 'Count words and change case in one click.', hint: 'Paste text to get started.' },
  { id: 'units', name: 'Unit converter', icon: Ruler, span: 'lg:col-span-3', Component: Units, tags: 'length mass weight temperature',
    desc: 'Convert length, mass and temperature.', hint: 'Results update as you type.' },
  { id: 'notes', name: 'Notes', icon: StickyNote, span: 'lg:col-span-3', Component: Notes, tags: 'scratchpad memo',
    desc: 'Jot things down. Notes stay on this device.', hint: 'Saved in this browser only.' },
]
