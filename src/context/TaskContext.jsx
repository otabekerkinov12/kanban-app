import { createContext, useContext, useReducer, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { saveTasks, loadTasks } from '../utils/storage'
import { SEED_TASKS } from '../data/seedData'

const TaskContext = createContext(null)

function taskReducer(state, action) {
  let newState
  switch (action.type) {
    case 'ADD_TASK':
      newState = [...state, { ...action.payload, id: uuidv4(), createdAt: new Date().toISOString() }]
      break
    case 'UPDATE_TASK':
      newState = state.map(t => t.id === action.payload.id ? { ...t, ...action.payload } : t)
      break
    case 'DELETE_TASK':
      newState = state.filter(t => t.id !== action.id)
      break
    case 'MOVE_TASK':
      newState = state.map(t => t.id === action.taskId ? { ...t, column: action.column } : t)
      break
    case 'REORDER_TASKS':
      newState = action.tasks
      break
    default:
      return state
  }
  saveTasks(newState)
  return newState
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const saved = loadTasks()
    return saved ?? SEED_TASKS
  })

  const addTask = (task) => dispatch({ type: 'ADD_TASK', payload: task })
  const updateTask = (task) => dispatch({ type: 'UPDATE_TASK', payload: task })
  const deleteTask = (id) => dispatch({ type: 'DELETE_TASK', id })
  const moveTask = (taskId, column) => dispatch({ type: 'MOVE_TASK', taskId, column })
  const reorderTasks = (tasks) => dispatch({ type: 'REORDER_TASKS', tasks })

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, moveTask, reorderTasks }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used within TaskProvider')
  return ctx
}
