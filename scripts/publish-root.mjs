import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))
const sourceRoot = resolve(currentDir, '..')
const deployRoot = resolve(sourceRoot, '..')
const distRoot = resolve(sourceRoot, 'dist')

if (!existsSync(distRoot)) {
  console.error('Build output not found. Run "npm run build" first.')
  process.exit(1)
}

function copyEntry(sourcePath, targetPath) {
  const [entry] = readdirSync(sourcePath, { withFileTypes: true })
  if (!entry) {
    mkdirSync(targetPath, { recursive: true })
    return
  }

  if (entry.isDirectory() || entry.isFile()) {
    const entries = readdirSync(sourcePath, { withFileTypes: true })
    mkdirSync(targetPath, { recursive: true })

    for (const child of entries) {
      const childSource = resolve(sourcePath, child.name)
      const childTarget = resolve(targetPath, child.name)

      if (child.isDirectory()) {
        copyEntry(childSource, childTarget)
        continue
      }

      copyFileSync(childSource, childTarget)
    }

    return
  }
}

const preserveEntries = new Set(['.shisha-source'])

for (const entry of readdirSync(deployRoot, { withFileTypes: true })) {
  if (preserveEntries.has(entry.name)) continue

  rmSync(resolve(deployRoot, entry.name), {
    force: true,
    recursive: true,
  })
}

for (const entry of readdirSync(distRoot, { withFileTypes: true })) {
  const sourcePath = resolve(distRoot, entry.name)
  const targetPath = resolve(deployRoot, entry.name)

  if (entry.isDirectory()) {
    copyEntry(sourcePath, targetPath)
    continue
  }

  mkdirSync(deployRoot, { recursive: true })
  copyFileSync(sourcePath, targetPath)
}

console.log(`Published ${distRoot} to ${deployRoot}`)
