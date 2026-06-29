import './FooterActions.css'

export default function FooterActions({
  completedCount,
  totalCount,
  onClearCompleted,
  onClearAll,
}) {
  const hasCompleted = completedCount > 0
  const hasTasks = totalCount > 0

  if (!hasTasks) {
    return null
  }

  return (
    <div className="footer-actions">
      <button
        type="button"
        className="footer-actions__button"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
      <button
        type="button"
        className="footer-actions__button footer-actions__button--danger"
        onClick={onClearAll}
      >
        Clear all tasks
      </button>
    </div>
  )
}
