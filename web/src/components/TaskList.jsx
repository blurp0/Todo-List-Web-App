import EmptyState from './EmptyState'
import TaskItem from './TaskItem'
import './TaskList.css'

export default function TaskList({
  tasks,
  filter,
  onToggleRequest,
  onDeleteRequest,
}) {
  if (tasks.length === 0) {
    return (
      <div
        id="task-list-panel"
        role="tabpanel"
        aria-labelledby={`tab-${filter}`}
        className="task-list task-list--empty"
      >
        <EmptyState filter={filter} />
      </div>
    )
  }

  return (
    <div
      id="task-list-panel"
      role="tabpanel"
      aria-labelledby={`tab-${filter}`}
      className="task-list"
    >
      <ul className="task-list__items">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleRequest={onToggleRequest}
            onDeleteRequest={onDeleteRequest}
          />
        ))}
      </ul>
    </div>
  )
}
