import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SRC = '.vite-out/client'
const DEST = 'dist'

if (!existsSync(SRC)) {
  console.error(`[finalize] build output missing: ${SRC} — did "vite build" run?`)
  process.exit(1)
}

mkdirSync(DEST, { recursive: true })

for (const entry of readdirSync(SRC)) {
  try {
    cpSync(join(SRC, entry), join(DEST, entry), { recursive: true, force: true })
  } catch (e) {
    if (entry === '_redirects') {
      console.warn(`[finalize] skip ${entry}: ${e.code || e.message} (pre-injected, identical content)`)
    } else {
      console.error(`[finalize] FAILED copying ${entry} into dist/: ${e.code || e.message} — aborting`)
      process.exit(1)
    }
  }
}

rmSync('.vite-out', { recursive: true, force: true })

if (!existsSync(join(DEST, 'index.html'))) {
  console.error('[finalize] dist/index.html missing after flatten — build is not publishable')
  process.exit(1)
}

// Inject CSS link tags into prerendered HTML (TanStack Start prerender strips <head>)
const htmlPath = join(DEST, 'index.html')
let html = readFileSync(htmlPath, 'utf-8')

const cssMatches = [...html.matchAll(/css:\$R\[\d+\]=\[([^\]]*)\]/g)]
const cssFiles = []
for (const m of cssMatches) {
  const urls = m[1].match(/"([^"]*\.css)"/g) || []
  for (const u of urls) {
    cssFiles.push(u.replace(/"/g, ''))
  }
}

if (cssFiles.length > 0) {
  const links = cssFiles.map(f => `<link rel="stylesheet" href="${f}">`).join('')
  // Wrap prerendered body content in a proper HTML document with dark mode
  html = `<!DOCTYPE html><html lang="en" class="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>GrowthFlow AI — AI Website Generator</title><meta name="description" content="Generate beautiful, conversion-ready websites with AI. GrowthFlow AI turns your business vision into a complete website blueprint in seconds."><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">${links}</head><body><div id="root">${html}</div></body></html>`
  writeFileSync(htmlPath, html, 'utf-8')
  console.log(`[finalize] injected ${cssFiles.length} CSS link tag(s) into index.html`)
}

console.log('[finalize] static build flattened to dist/ (dist/index.html ready)')
