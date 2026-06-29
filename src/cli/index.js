import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Command } from 'commander'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pkg = JSON.parse(
  readFileSync(join(__dirname, '../../package.json'), 'utf8'),
)

export function run(argv) {
  const program = new Command()

  program
    .name('todo')
    .description('Manage your tasks efficiently from the terminal')
    .version(pkg.version)

  program
    .command('help')
    .description('Show usage information')
    .action(() => {
      program.outputHelp()
    })

  program.parse(argv)
}
