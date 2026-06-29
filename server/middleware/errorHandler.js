import {
  TaskNotFoundError,
  ValidationError,
} from '../../src/models/task.js'
import { StorageError } from '../../src/storage/fileStorage.js'

const VALID_FILTERS = new Set(['active', 'done', 'all'])

export function errorHandler(error, _req, res, _next) {
  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.message })
  }

  if (error instanceof TaskNotFoundError) {
    return res.status(404).json({ error: error.message })
  }

  if (error instanceof StorageError) {
    return res.status(500).json({ error: error.message })
  }

  console.error(error)
  return res.status(500).json({ error: 'Internal server error.' })
}

export function asyncHandler(handler) {
  return (req, res, next) => {
    try {
      const result = handler(req, res, next)
      Promise.resolve(result).catch(next)
    } catch (error) {
      next(error)
    }
  }
}

export function parseFilter(value) {
  const filter = value ?? 'active'

  if (!VALID_FILTERS.has(filter)) {
    throw new ValidationError('Invalid filter. Use active, done, or all.')
  }

  return filter
}
