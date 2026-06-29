import { stdin as input, stdout as output } from 'node:process'
import { createInterface } from 'node:readline/promises'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'
import { Command } from 'commander'
import { TaskNotFoundError, ValidationError } from '../models/task.js'
import { TaskService } from '../services/taskService.js'
import {
  formatClearCancelled,
  formatTaskAdded,
  formatTaskCompleted,
  formatTaskDeleted,
  formatTaskList,
  formatTasksCleared,
  formatTaskUncompleted,
} from './formatters.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pkg = JSON.parse(
  readFileSync(join(__dirname, '../../package.json'), 'utf8'),
)

const taskService = new TaskService()

function handleError(error) {
  const message =
    error instanceof ValidationError || error instanceof TaskNotFoundError
      ? error.message
      : error.message || 'Something went wrong.'

  console.error(chalk.red(`Error: ${message}`))
  process.exit(1)
}

function resolveListFilter(options) {
  const selected = [
    options.all && 'all',
    options.active && 'active',
    options.done && 'done',
  ].filter(Boolean)

  if (selected.length > 1) {
    throw new ValidationError(
      'Use only one filter: --all, --active, or --done.',
    )
  }

  return selected[0] ?? 'active'
}

async function confirmClear() {
  const rl = createInterface({ input, output })

  try {
    const answer = await rl.question(
      'Are you sure you want to delete all tasks? (y/N) ',
    )
    return answer.trim().toLowerCase() === 'y'
  } finally {
    rl.close()
  }
}

export function run(argv) {
  const program = new Command()

  program
    .name('todo')
    .description('Manage your tasks efficiently from the terminal')
    .version(pkg.version)

  program
    .command('add')
    .description('Add a new task')
    .argument('<title>', 'Task title')
    .action((title) => {
      try {
        const task = taskService.add(title)
        console.log(formatTaskAdded(task))
      } catch (error) {
        handleError(error)
      }
    })

  program
    .command('list')
    .description('List tasks')
    .option('--all', 'Show all tasks')
    .option('--active', 'Show active tasks only')
    .option('--done', 'Show completed tasks only')
    .action((options) => {
      try {
        const filter = resolveListFilter(options)
        const tasks = taskService.list(filter)
        console.log(formatTaskList(tasks, filter))
      } catch (error) {
        handleError(error)
      }
    })

  program
    .command('done')
    .description('Mark a task as completed')
    .argument('<id>', 'Task ID')
    .action((id) => {
      try {
        const task = taskService.complete(id)
        console.log(formatTaskCompleted(task))
      } catch (error) {
        handleError(error)
      }
    })

  program
    .command('undo')
    .description('Mark a task as active again')
    .argument('<id>', 'Task ID')
    .action((id) => {
      try {
        const task = taskService.uncomplete(id)
        console.log(formatTaskUncompleted(task))
      } catch (error) {
        handleError(error)
      }
    })

  program
    .command('delete')
    .description('Delete a task')
    .argument('<id>', 'Task ID')
    .action((id) => {
      try {
        const task = taskService.delete(id)
        console.log(formatTaskDeleted(task))
      } catch (error) {
        handleError(error)
      }
    })

  program
    .command('clear')
    .description('Delete all tasks')
    .option('--force', 'Skip confirmation prompt')
    .action(async (options) => {
      try {
        if (!options.force) {
          const confirmed = await confirmClear()

          if (!confirmed) {
            console.log(formatClearCancelled())
            return
          }
        }

        const count = taskService.clear()
        console.log(formatTasksCleared(count))
      } catch (error) {
        handleError(error)
      }
    })

  program
    .command('help')
    .description('Show usage information')
    .action(() => {
      program.outputHelp()
    })

  return program.parseAsync(argv)
}
