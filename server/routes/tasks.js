import { Router } from 'express'
import { asyncHandler, parseFilter } from '../middleware/errorHandler.js'

export function createTaskRouter(taskService) {
  const router = Router()

  router.get(
    '/',
    asyncHandler((req, res) => {
      const filter = parseFilter(req.query.filter)
      const tasks = taskService.list(filter)
      res.json({ tasks })
    }),
  )

  router.post(
    '/',
    asyncHandler((req, res) => {
      const task = taskService.add(req.body?.title ?? '')
      res.status(201).json({ task })
    }),
  )

  router.delete(
    '/',
    asyncHandler((_req, res) => {
      taskService.clear()
      res.json({ success: true })
    }),
  )

  router.patch(
    '/:id',
    asyncHandler((req, res) => {
      const { completed } = req.body ?? {}

      if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'completed must be a boolean.' })
      }

      const task = completed
        ? taskService.complete(req.params.id)
        : taskService.uncomplete(req.params.id)

      res.json({ task })
    }),
  )

  router.delete(
    '/:id',
    asyncHandler((req, res) => {
      taskService.delete(req.params.id)
      res.json({ success: true })
    }),
  )

  return router
}
