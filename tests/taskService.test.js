import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { TaskService } from '../src/services/taskService.js'

class MockStorage {
  saveTasks(tasks) {
    this.tasks = tasks
  }
  loadTasks() {
    return this.tasks || []
  }
}

describe('TaskService', () => {
  it('should add a task and persist it', () => {
    const storage = new MockStorage()
    const service = new TaskService({ storage })
    
    const task = service.add('Buy milk')
    
    assert.equal(task.title, 'Buy milk')
    assert.equal(task.completed, false)
    assert.ok(task.id)
    assert.equal(storage.tasks.length, 1)
    assert.equal(storage.tasks[0].title, 'Buy milk')
  })

  it('should list tasks with filters', () => {
    const service = new TaskService({ tasks: [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true },
      { id: '3', title: 'Task 3', completed: false },
    ] })

    const active = service.list('active')
    assert.equal(active.length, 2)
    
    const done = service.list('done')
    assert.equal(done.length, 1)
    assert.equal(done[0].id, '2')
    
    const all = service.list('all')
    assert.equal(all.length, 3)
  })

  it('should mark a task as completed', () => {
    const service = new TaskService({ tasks: [
      { id: '1', title: 'Task 1', completed: false }
    ], storage: new MockStorage() })

    const task = service.complete('1')
    assert.equal(task.completed, true)
    
    const all = service.list('all')
    assert.equal(all[0].completed, true)
  })

  it('should uncomplete a task', () => {
    const service = new TaskService({ tasks: [
      { id: '1', title: 'Task 1', completed: true }
    ], storage: new MockStorage() })

    const task = service.uncomplete('1')
    assert.equal(task.completed, false)
  })

  it('should delete a task', () => {
    const service = new TaskService({ tasks: [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: false }
    ], storage: new MockStorage() })

    const task = service.delete('1')
    assert.equal(task.id, '1')
    
    const all = service.list('all')
    assert.equal(all.length, 1)
    assert.equal(all[0].id, '2')
  })

  it('should throw when finding a non-existent task', () => {
    const service = new TaskService({ tasks: [] })
    
    assert.throws(() => service.complete('invalid-id'), {
      name: 'TaskNotFoundError'
    })
  })

  it('should clear all tasks', () => {
    const service = new TaskService({ tasks: [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: false }
    ], storage: new MockStorage() })

    const count = service.clear()
    assert.equal(count, 2)
    assert.equal(service.list('all').length, 0)
  })
})
