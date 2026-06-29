import chalk from 'chalk'

const EMPTY_MESSAGES = {
  all: 'No tasks found. Add one with: todo add "<title>"',
  active: 'No active tasks. You are all caught up!',
  done: 'No completed tasks yet.',
}

export function formatTaskAdded(task) {
  return chalk.green(`Task added: [${task.id}] ${task.title}`)
}

export function formatTaskCompleted(task) {
  return chalk.green(`Task marked as done: ${task.title}`)
}

export function formatTaskUncompleted(task) {
  return chalk.blue(`Task marked as active: ${task.title}`)
}

export function formatTaskDeleted(task) {
  return chalk.yellow(`Task deleted: ${task.title}`)
}

export function formatTasksCleared(count) {
  if (count === 0) {
    return chalk.yellow('No tasks to clear.')
  }

  return chalk.yellow(`All tasks cleared. (${count} removed)`)
}

export function formatClearCancelled() {
  return chalk.yellow('Clear cancelled.')
}

export function formatTaskList(tasks, filter = 'active') {
  if (tasks.length === 0) {
    return chalk.yellow(EMPTY_MESSAGES[filter] ?? EMPTY_MESSAGES.all)
  }

  return tasks
    .map((task, index) => {
      const status = task.completed ? chalk.green('[x]') : chalk.gray('[ ]')
      const title = task.completed ? chalk.strikethrough(task.title) : task.title

      return `${index + 1}. ${status} ${title}  ${chalk.dim(`(${task.id})`)}`
    })
    .join('\n')
}
