import cors from 'cors'
import express from 'express'
import { TaskService } from '../src/services/taskService.js'
import { errorHandler } from './middleware/errorHandler.js'
import { createTaskRouter } from './routes/tasks.js'

const DEFAULT_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]

export function createApp(taskService = TaskService.create()) {
  const app = express()

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(',') ?? DEFAULT_ORIGINS,
    }),
  )
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.use('/api/tasks', createTaskRouter(taskService))
  app.use(errorHandler)

  return app
}

export function startServer({
  taskService = TaskService.create(),
  port = Number(process.env.PORT ?? 3001),
} = {}) {
  const app = createApp(taskService)

  return app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`)
  })
}
