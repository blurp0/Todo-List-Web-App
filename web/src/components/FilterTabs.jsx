import './FilterTabs.css'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'done', label: 'Done' },
]

export default function FilterTabs({ activeFilter, counts, onChange }) {
  return (
    <div className="filter-tabs" role="tablist" aria-label="Filter tasks">
      {FILTERS.map(({ id, label }) => {
        const isActive = activeFilter === id

        return (
          <button
            key={id}
            type="button"
            role="tab"
            id={`tab-${id}`}
            className={`filter-tabs__tab${isActive ? ' filter-tabs__tab--active' : ''}`}
            aria-selected={isActive}
            aria-controls="task-list-panel"
            onClick={() => onChange(id)}
          >
            {label} ({counts[id]})
          </button>
        )
      })}
    </div>
  )
}
