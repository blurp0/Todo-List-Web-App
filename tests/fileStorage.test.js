import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { FileStorage, StorageError } from '../src/storage/fileStorage.js'
import { writeFileSync, unlinkSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TEST_FILE_PATH = join(__dirname, 'test-data', 'tasks.json')
const BACKUP_FILE_PATH = `${TEST_FILE_PATH}.bak`

function cleanup() {
  if (existsSync(TEST_FILE_PATH)) unlinkSync(TEST_FILE_PATH)
  if (existsSync(BACKUP_FILE_PATH)) unlinkSync(BACKUP_FILE_PATH)
}

describe('FileStorage', () => {
  before(() => cleanup())
  after(() => cleanup())

  it('should return an empty array if file does not exist', () => {
    cleanup()
    const storage = new FileStorage(TEST_FILE_PATH)
    const tasks = storage.loadTasks()
    assert.deepEqual(tasks, [])
    assert.equal(existsSync(TEST_FILE_PATH), true, 'File should be created')
  })

  it('should save and load tasks correctly', () => {
    const storage = new FileStorage(TEST_FILE_PATH)
    const mockTasks = [{ id: '1', title: 'Test Task' }]
    
    storage.saveTasks(mockTasks)
    
    const loaded = storage.loadTasks()
    assert.deepEqual(loaded, mockTasks)
  })

  it('should recover from a corrupt JSON file by creating a backup', () => {
    // Write invalid JSON
    writeFileSync(TEST_FILE_PATH, '{ invalid json }', 'utf8')
    
    const storage = new FileStorage(TEST_FILE_PATH)
    
    // Suppress stderr temporarily to keep test output clean
    const originalWrite = process.stderr.write
    process.stderr.write = () => {}
    
    const loaded = storage.loadTasks()
    
    process.stderr.write = originalWrite
    
    assert.deepEqual(loaded, [], 'Should return empty array on corrupt file')
    assert.equal(existsSync(BACKUP_FILE_PATH), true, 'Should create a backup of the corrupt file')
  })
})
