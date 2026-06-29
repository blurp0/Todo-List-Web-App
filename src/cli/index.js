import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'
import { Command } from 'commander'
import { ValidationError } from '../models/task.js'
import { TaskService } from '../services/taskService.js'
import { formatTaskAdded, formatTaskList } from './formatters.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pkg = JSON.parse(
  readFileSync(join(__dirname, '../../package.json'), 'utf8'),
)

const taskService = new TaskService()

function handleError(error) {
  const message =
    error instanceof ValidationError
      ? error.message
      : error.message || 'Something went wrong.'

  console.error(chalk.red(`Error: ${message}`))
  process.exit(1)
}

function resolveListFilter(options) {
  if (options.all) return 'all'
  if (options.done) return 'done'
  if (options.active) return 'active'
  return 'active'
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
        console.log(formatTaskList(tasks))
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

  program.parse(argv)
}
