import './TaskItem.css'

function TrashIcon() {
  return (
    <svg
      className="task-item__delete-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

export default function TaskItem({ task, onToggleRequest, onDeleteRequest }) {
  const titleClass = task.completed
    ? 'task-item__title task-item__title--completed'
    : 'task-item__title'

  return (
    <li className="task-item">
      <label className="task-item__checkbox-label">
        <input
          className="task-item__checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleRequest(task)}
          aria-label={
            task.completed
              ? `Mark "${task.title}" as active again`
              : `Mark "${task.title}" as done`
          }
        />
        <span className="task-item__checkbox-visual" aria-hidden="true" />
        <span className={titleClass}>{task.title}</span>
      </label>
      <button
        type="button"
        className="task-item__delete"
        onClick={() => onDeleteRequest(task)}
        aria-label={`Delete task: ${task.title}`}
      >
        <TrashIcon />
      </button>
    </li>
  )
}
