import { useId, useRef, useState } from 'react'
import './TaskForm.css'

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const inputId = useId()
  const errorId = useId()
  const inputRef = useRef(null)

  const trimmedTitle = title.trim()
  const canSubmit = trimmedTitle.length > 0

  function handleSubmit(event) {
    event.preventDefault()

    if (!canSubmit) {
      setError('Task title cannot be empty.')
      return
    }

    if (trimmedTitle.length > 200) {
      setError('Task title must be 200 characters or fewer.')
      return
    }

    onAdd(trimmedTitle)
    setTitle('')
    setError('')
    inputRef.current?.focus()
  }

  function handleChange(event) {
    setTitle(event.target.value)

    if (error) {
      setError('')
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form__field">
        <label className="visually-hidden" htmlFor={inputId}>
          New task
        </label>
        <input
          ref={inputRef}
          id={inputId}
          className={`task-form__input${error ? ' task-form__input--error' : ''}`}
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="What needs to be done?"
          maxLength={200}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
        />
        {error ? (
          <p id={errorId} className="task-form__error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
      <button
        className="task-form__button"
        type="submit"
        disabled={!canSubmit}
      >
        Add
      </button>
    </form>
  )
}
