import { existsSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))
const distRoot = resolve(currentDir, '..', 'dist')

if (existsSync(distRoot)) {
  rmSync(distRoot, {
    force: true,
    recursive: true,
  })
}
