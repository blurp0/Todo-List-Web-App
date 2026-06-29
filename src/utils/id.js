import { randomBytes } from 'node:crypto'

export function generateId() {
  return randomBytes(4).toString('hex')
}
