# Dreykit

Free everyday tools that run in the browser: QR codes, passwords, calculator, timer (stopwatch and countdown), text tools, unit converter and notes.

Built with React, Vite and Tailwind CSS. Light and dark themes, hash routing, no backend.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Deploy

Netlify or Vercel: build command `npm run build`, publish directory `dist`.

## Add a tool

1. Create `src/tools/MyTool.jsx` with a default-exported component.
2. Add one entry to `src/tools/registry.js` (id, name, icon, description, grid span).

It shows up on the home page, in search and at `#my-id` automatically.
