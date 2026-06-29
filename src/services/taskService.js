import {
  createTask,
  TaskNotFoundError,
  validateTitle,
} from '../models/task.js'
import { generateId } from '../utils/id.js'

export class TaskService {
  #tasks

  constructor(tasks = []) {
    this.#tasks = tasks
  }

  add(title) {
    const trimmedTitle = validateTitle(title)
    const task = createTask({ id: generateId(), title: trimmedTitle })
    this.#tasks.push(task)
    return task
  }

  list(filter = 'active') {
    switch (filter) {
      case 'done':
        return this.#tasks.filter((task) => task.completed)
      case 'all':
        return [...this.#tasks]
      case 'active':
      default:
        return this.#tasks.filter((task) => !task.completed)
    }
  }

  complete(id) {
    const task = this.#findTask(id)

    if (!task.completed) {
      task.completed = true
      task.updatedAt = new Date().toISOString()
    }

    return task
  }

  uncomplete(id) {
    const task = this.#findTask(id)

    if (task.completed) {
      task.completed = false
      task.updatedAt = new Date().toISOString()
    }

    return task
  }

  delete(id) {
    const index = this.#findTaskIndex(id)
    const [task] = this.#tasks.splice(index, 1)
    return task
  }

  clear() {
    const count = this.#tasks.length
    this.#tasks.length = 0
    return count
  }

  #findTaskIndex(id) {
    const index = this.#tasks.findIndex((task) => task.id === id)

    if (index === -1) {
      throw new TaskNotFoundError(id)
    }

    return index
  }

  #findTask(id) {
    return this.#tasks[this.#findTaskIndex(id)]
  }
}
