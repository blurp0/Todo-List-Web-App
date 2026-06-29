import chalk from 'chalk'

export function formatTaskAdded(task) {
  return chalk.green(`Task added: [${task.id}] ${task.title}`)
}

export function formatTaskList(tasks) {
  if (tasks.length === 0) {
    return chalk.yellow('No tasks found. Add one with: todo add "<title>"')
  }

  return tasks
    .map((task, index) => {
      const status = task.completed ? chalk.green('[x]') : chalk.gray('[ ]')
      const title = task.completed ? chalk.strikethrough(task.title) : task.title

      return `${index + 1}. ${status} ${title}  ${chalk.dim(`(${task.id})`)}`
    })
    .join('\n')
}
