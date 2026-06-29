import { useMemo, useState } from 'react'
import ConfirmModal from './components/ConfirmModal'
import FilterTabs from './components/FilterTabs'
import FooterActions from './components/FooterActions'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import {
  filterTasks,
  getTaskCounts,
  MOCK_TASKS,
} from './data/mockTasks'
import './App.css'

function createTask(title) {
  const now = new Date().toISOString()

  return {
    id: crypto.randomUUID().slice(0, 8),
    title,
    completed: false,
    createdAt: now,
    updatedAt: now,
  }
}

function getConfirmDialog(confirmAction, handlers) {
  if (!confirmAction) {
    return null
  }

  switch (confirmAction.type) {
    case 'toggle': {
      const { task } = confirmAction
      const markingDone = !task.completed

      return {
        title: markingDone ? 'Mark as done?' : 'Mark as active again?',
        message: markingDone
          ? `Mark "${task.title}" as completed?`
          : `Move "${task.title}" back to your active list?`,
        confirmLabel: markingDone ? 'Mark done' : 'Mark active',
        isDanger: false,
        onConfirm: () => handlers.toggle(task.id),
      }
    }
    case 'delete':
      return {
        title: 'Delete task?',
        message: `Delete "${confirmAction.task.title}"? This cannot be undone.`,
        confirmLabel: 'Delete',
        isDanger: true,
        onConfirm: () => handlers.delete(confirmAction.task.id),
      }
    case 'clear-completed':
      return {
        title: 'Clear completed tasks?',
        message: 'This will permanently remove all completed tasks.',
        confirmLabel: 'Clear completed',
        isDanger: true,
        onConfirm: handlers.clearCompleted,
      }
    case 'clear-all':
      return {
        title: 'Delete all tasks?',
        message: 'This cannot be undone. All tasks will be permanently removed.',
        confirmLabel: 'Delete all',
        isDanger: true,
        onConfirm: handlers.clearAll,
      }
    default:
      return null
  }
}

export default function App() {
  const [tasks, setTasks] = useState(MOCK_TASKS)
  const [filter, setFilter] = useState('active')
  const [confirmAction, setConfirmAction] = useState(null)

  const counts = useMemo(() => getTaskCounts(tasks), [tasks])
  const filteredTasks = useMemo(
    () => filterTasks(tasks, filter),
    [tasks, filter],
  )

  function closeConfirm() {
    setConfirmAction(null)
  }

  function handleAdd(title) {
    setTasks((current) => [createTask(title), ...current])
  }

  function handleToggle(id) {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== id) {
          return task
        }

        return {
          ...task,
          completed: !task.completed,
          updatedAt: new Date().toISOString(),
        }
      }),
    )
    closeConfirm()
  }

  function handleDelete(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
    closeConfirm()
  }

  function handleClearCompleted() {
    setTasks((current) => current.filter((task) => !task.completed))
    closeConfirm()
  }

  function handleClearAll() {
    setTasks([])
    closeConfirm()
  }

  const confirmDialog = getConfirmDialog(confirmAction, {
    toggle: handleToggle,
    delete: handleDelete,
    clearCompleted: handleClearCompleted,
    clearAll: handleClearAll,
  })

  return (
    <div className="app">
      <div className="app__container">
        <Header activeCount={counts.active} />

        <main className="app__main">
          <section className="app__section" aria-label="Add task">
            <TaskForm onAdd={handleAdd} />
          </section>

          <section className="app__section" aria-label="Filter tasks">
            <FilterTabs
              activeFilter={filter}
              counts={counts}
              onChange={setFilter}
            />
          </section>

          <section className="app__section app__section--list" aria-label="Task list">
            <TaskList
              tasks={filteredTasks}
              filter={filter}
              onToggleRequest={(task) =>
                setConfirmAction({ type: 'toggle', task })
              }
              onDeleteRequest={(task) =>
                setConfirmAction({ type: 'delete', task })
              }
            />
          </section>
        </main>

        <footer className="app__footer">
          <FooterActions
            completedCount={counts.done}
            totalCount={counts.all}
            onClearCompleted={() =>
              setConfirmAction({ type: 'clear-completed' })
            }
            onClearAll={() => setConfirmAction({ type: 'clear-all' })}
          />
        </footer>
      </div>

      {confirmDialog ? (
        <ConfirmModal
          isOpen
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmLabel={confirmDialog.confirmLabel}
          isDanger={confirmDialog.isDanger}
          onConfirm={confirmDialog.onConfirm}
          onCancel={closeConfirm}
        />
      ) : null}
    </div>
  )
}
