import './EmptyState.css'

const MESSAGES = {
  all: {
    title: 'No tasks yet',
    description: 'Add one above to get started.',
  },
  active: {
    title: 'All caught up!',
    description: 'No active tasks.',
  },
  done: {
    title: 'No completed tasks yet',
    description: 'Complete a task to see it here.',
  },
}

export default function EmptyState({ filter }) {
  const { title, description } = MESSAGES[filter] ?? MESSAGES.all

  return (
    <div className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">
        ◻
      </div>
      <p className="empty-state__title">{title}</p>
      <p className="empty-state__description">{description}</p>
    </div>
  )
}
