export const MAX_TITLE_LENGTH = 200

export class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

export function validateTitle(title) {
  const trimmed = title?.trim()

  if (!trimmed) {
    throw new ValidationError('Task title cannot be empty.')
  }

  if (trimmed.length > MAX_TITLE_LENGTH) {
    throw new ValidationError('Task title must be 200 characters or fewer.')
  }

  return trimmed
}

export function createTask({ id, title }) {
  const now = new Date().toISOString()

  return {
    id,
    title,
    completed: false,
    createdAt: now,
    updatedAt: now,
  }
}
