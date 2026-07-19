#!/usr/bin/env node
// Detects drift between the vendored design-system files and their upstream
// originals. Vendoring is a copy, so upstream changes are otherwise invisible:
// nothing breaks, nothing warns, the app just quietly renders last month's
// design system.
//
//   npm run check:ds            fail on drift (use in CI)
//   npm run check:ds -- --fix   re-copy the changed files and restamp the manifest
//
// Point at a non-default checkout with DS_ROOT=/path/to/my-design-system-react.
//
// LIMITS — this checks file identity only. It will not tell you that a token
// was renamed, that a component's props changed, or that a Figma variable moved
// without the CSS being regenerated. It answers one question: "is what we
// copied still what they have?"

import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs'
import { dirname, resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const MANIFEST_PATH = resolve(PROJECT_ROOT, 'src/vendor.manifest.json')
const FIX = process.argv.includes('--fix')

const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
const dsRoot = resolve(PROJECT_ROOT, process.env.DS_ROOT ?? manifest.sourceRoot)

const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex')

if (!existsSync(dsRoot)) {
  // Not a failure: contributors without the sibling checkout still need to build.
  console.warn(`⚠ ${manifest.sourceRepo} not found at ${dsRoot} — skipping sync check.`)
  console.warn('  Set DS_ROOT to check against a different location.')
  process.exit(0)
}

const drifted = []
const missing = []

for (const entry of manifest.files) {
  const sourcePath = resolve(dsRoot, entry.source)

  if (!existsSync(sourcePath)) {
    missing.push(entry)
    continue
  }

  const actual = sha256(sourcePath)
  if (actual !== entry.sourceSha256) {
    drifted.push({ ...entry, sourcePath, actual })
  }
}

for (const entry of missing) {
  console.error(`✗ upstream file is gone: ${entry.source}`)
  console.error(`  ${entry.local} is now orphaned — it may have been moved or deleted upstream.`)
}

for (const entry of drifted) {
  console.error(`✗ upstream changed: ${entry.source}`)
  console.error(`    vendored: ${entry.sourceSha256.slice(0, 12)}`)
  console.error(`    upstream: ${entry.actual.slice(0, 12)}`)
  if (entry.localEdits) {
    // Re-copying would silently discard these, so --fix must not touch the file.
    console.error(`    ⚠ local edits will be lost on re-copy: ${entry.localEdits}`)
  }
}

if (!drifted.length && !missing.length) {
  console.log(`✓ ${manifest.files.length} vendored files match ${manifest.sourceRepo}`)
  process.exit(0)
}

if (!FIX) {
  console.error(`\n${drifted.length} drifted, ${missing.length} missing.`)
  console.error('Re-vendor with: npm run check:ds -- --fix')
  process.exit(1)
}

if (missing.length) {
  console.error('\nCannot --fix: some upstream files no longer exist. Resolve by hand.')
  process.exit(1)
}

// Files carrying local edits are reported but never overwritten — the whole
// point of recording `localEdits` is that a blind copy would destroy them.
const safe = drifted.filter((entry) => !entry.localEdits)
const manual = drifted.filter((entry) => entry.localEdits)

for (const entry of safe) {
  copyFileSync(entry.sourcePath, resolve(PROJECT_ROOT, entry.local))
  const record = manifest.files.find((f) => f.source === entry.source)
  record.sourceSha256 = entry.actual
  console.log(`↻ re-vendored ${entry.local}`)
}

if (safe.length) {
  manifest.vendoredAt = new Date().toISOString().slice(0, 10)
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`)
}

if (manual.length) {
  console.error(`\n${manual.length} file(s) need a manual merge (they carry local edits):`)
  for (const entry of manual) {
    console.error(`  diff ${relative(PROJECT_ROOT, entry.sourcePath)} ${entry.local}`)
  }
  process.exit(1)
}

console.log('\nRe-vendored. Review the diff, then rebuild to confirm nothing broke.')
