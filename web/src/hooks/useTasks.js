import { useState, useEffect, useCallback, useMemo } from 'react'
import { api } from '../services/api'

export function useTasks(filter = 'active') {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      // Always fetch all tasks to compute counts locally
      const data = await api.getTasks('all')
      setTasks(data.tasks || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const counts = useMemo(() => {
    return {
      all: tasks.length,
      active: tasks.filter(t => !t.completed).length,
      done: tasks.filter(t => t.completed).length
    }
  }, [tasks])

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter(t => !t.completed)
    if (filter === 'done') return tasks.filter(t => t.completed)
    return tasks
  }, [tasks, filter])

  const addTask = async (title) => {
    try {
      await api.addTask(title)
      await fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  const toggleTask = async (id, completed) => {
    try {
      setTasks(current => current.map(t => t.id === id ? { ...t, completed } : t))
      await api.toggleTask(id, completed)
      await fetchTasks()
    } catch (err) {
      setError(err.message)
      await fetchTasks()
    }
  }

  const deleteTask = async (id) => {
    try {
      setTasks(current => current.filter(t => t.id !== id))
      await api.deleteTask(id)
    } catch (err) {
      setError(err.message)
      await fetchTasks()
    }
  }

  const clearAll = async () => {
    try {
      setTasks([])
      await api.clearAll()
    } catch (err) {
      setError(err.message)
      await fetchTasks()
    }
  }

  const clearCompleted = async () => {
    try {
      const completedTasks = tasks.filter(t => t.completed)
      const deletePromises = completedTasks.map(t => api.deleteTask(t.id))
      await Promise.all(deletePromises)
      await fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  return {
    tasks,
    filteredTasks,
    counts,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    clearAll,
    clearCompleted,
    refresh: fetchTasks
  }
}
