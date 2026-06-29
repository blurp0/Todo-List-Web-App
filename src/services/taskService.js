import { createTask, validateTitle } from '../models/task.js'
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
}
