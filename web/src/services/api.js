const API_BASE = '/api/tasks'

export const api = {
  async getTasks(filter = 'active') {
    const response = await fetch(`${API_BASE}?filter=${filter}`)
    if (!response.ok) throw new Error('Failed to fetch tasks')
    return response.json()
  },

  async addTask(title) {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    if (!response.ok) throw new Error('Failed to add task')
    return response.json()
  },

  async toggleTask(id, completed) {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    })
    if (!response.ok) throw new Error('Failed to toggle task')
    return response.json()
  },

  async deleteTask(id) {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete task')
    return response.json()
  },

  async clearAll() {
    const response = await fetch(API_BASE, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to clear tasks')
    return response.json()
  },
}
