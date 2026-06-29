import './Header.css'

export default function Header({ activeCount }) {
  return (
    <header className="header">
      <div className="header__main">
        <span className="header__logo" aria-hidden="true">
          ✓
        </span>
        <h1 className="header__title">To-Do List</h1>
      </div>
      <span className="header__badge" aria-label={`${activeCount} active tasks`}>
        {activeCount} active
      </span>
    </header>
  )
}
