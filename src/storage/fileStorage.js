import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PROJECT_ROOT = join(__dirname, '../..')
const DEFAULT_DATA_PATH = join(PROJECT_ROOT, 'data', 'tasks.json')

export class StorageError extends Error {
  constructor(message) {
    super(message)
    this.name = 'StorageError'
  }
}

export function resolveDataPath() {
  return process.env.TODO_DATA_PATH ?? DEFAULT_DATA_PATH
}

export class FileStorage {
  #filePath

  constructor(filePath = resolveDataPath()) {
    this.#filePath = filePath
  }

  get filePath() {
    return this.#filePath
  }

  loadTasks() {
    this.#ensureDirectory()

    if (!existsSync(this.#filePath)) {
      this.saveTasks([])
      return []
    }

    try {
      const raw = readFileSync(this.#filePath, 'utf8')
      const data = JSON.parse(raw)

      if (!data || !Array.isArray(data.tasks)) {
        throw new Error('Invalid tasks file format.')
      }

      return data.tasks
    } catch (error) {
      this.#handleCorruptFile(error)
      this.saveTasks([])
      return []
    }
  }

  saveTasks(tasks) {
    this.#ensureDirectory()

    try {
      const payload = { tasks }
      writeFileSync(this.#filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
    } catch {
      throw new StorageError(
        'Failed to save tasks. Check file permissions.',
      )
    }
  }

  #ensureDirectory() {
    mkdirSync(dirname(this.#filePath), { recursive: true })
  }

  #handleCorruptFile(error) {
    const message =
      error instanceof SyntaxError
        ? 'Tasks file contains invalid JSON.'
        : error.message || 'Tasks file could not be read.'

    process.stderr.write(`Warning: ${message} Starting with an empty list.\n`)

    if (!existsSync(this.#filePath)) {
      return
    }

    const backupPath = `${this.#filePath}.bak`

    try {
      if (existsSync(backupPath)) {
        writeFileSync(backupPath, readFileSync(this.#filePath))
      } else {
        renameSync(this.#filePath, backupPath)
      }
    } catch {
      process.stderr.write(
        `Warning: Could not back up corrupt tasks file at ${this.#filePath}.\n`,
      )
    }
  }
}
