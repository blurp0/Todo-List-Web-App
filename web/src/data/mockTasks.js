export const MOCK_TASKS = [
  {
    id: 'a1b2c3d4',
    title: 'Buy groceries',
    completed: false,
    createdAt: '2026-06-29T08:00:00.000Z',
    updatedAt: '2026-06-29T08:00:00.000Z',
  },
  {
    id: 'e5f6g7h8',
    title: 'Walk the dog',
    completed: false,
    createdAt: '2026-06-29T09:15:00.000Z',
    updatedAt: '2026-06-29T09:15:00.000Z',
  },
  {
    id: 'i9j0k1l2',
    title: 'Read a book',
    completed: true,
    createdAt: '2026-06-28T18:30:00.000Z',
    updatedAt: '2026-06-29T07:45:00.000Z',
  },
  {
    id: 'm3n4o5p6',
    title: 'Prepare presentation',
    completed: false,
    createdAt: '2026-06-29T10:00:00.000Z',
    updatedAt: '2026-06-29T10:00:00.000Z',
  },
  {
    id: 'q7r8s9t0',
    title: 'Reply to emails',
    completed: true,
    createdAt: '2026-06-28T14:00:00.000Z',
    updatedAt: '2026-06-29T06:00:00.000Z',
  },
]

export function filterTasks(tasks, filter) {
  switch (filter) {
    case 'done':
      return tasks.filter((task) => task.completed)
    case 'all':
      return tasks
    case 'active':
    default:
      return tasks.filter((task) => !task.completed)
  }
}

export function getTaskCounts(tasks) {
  const done = tasks.filter((task) => task.completed).length

  return {
    all: tasks.length,
    active: tasks.length - done,
    done,
  }
}
