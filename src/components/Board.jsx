import { useState } from 'react'
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useTasks } from '../context/TaskContext'
import { COLUMNS } from '../data/seedData'
import Column from './Column'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'
import { MdAdd } from 'react-icons/md'
import styles from './Board.module.css'

export default function Board() {
  const { tasks, moveTask, reorderTasks } = useTasks()
  const [activeTask, setActiveTask] = useState(null)
  const [showGlobalModal, setShowGlobalModal] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  function handleDragStart({ active }) {
    setActiveTask(tasks.find(t => t.id === active.id) || null)
  }

  function handleDragEnd({ active, over }) {
    setActiveTask(null)
    if (!over) return

    const activeTask = tasks.find(t => t.id === active.id)
    if (!activeTask) return

    // Dropped on a column
    const targetColumn = COLUMNS.find(c => c.id === over.id)
    if (targetColumn) {
      if (activeTask.column !== targetColumn.id) moveTask(active.id, targetColumn.id)
      return
    }

    // Dropped on a task
    const overTask = tasks.find(t => t.id === over.id)
    if (!overTask) return

    if (activeTask.column !== overTask.column) {
      // Move to new column and reorder
      const updated = tasks.map(t => t.id === active.id ? { ...t, column: overTask.column } : t)
      const colTasks = updated.filter(t => t.column === overTask.column)
      const oldIdx = colTasks.findIndex(t => t.id === active.id)
      const newIdx = colTasks.findIndex(t => t.id === over.id)
      const reordered = arrayMove(colTasks, oldIdx, newIdx)
      const otherTasks = updated.filter(t => t.column !== overTask.column)
      reorderTasks([...otherTasks, ...reordered])
    } else {
      const colTasks = tasks.filter(t => t.column === activeTask.column)
      const oldIdx = colTasks.findIndex(t => t.id === active.id)
      const newIdx = colTasks.findIndex(t => t.id === over.id)
      if (oldIdx !== newIdx) {
        const reordered = arrayMove(colTasks, oldIdx, newIdx)
        const otherTasks = tasks.filter(t => t.column !== activeTask.column)
        reorderTasks([...otherTasks, ...reordered])
      }
    }
  }

  // Stats bar
  const total = tasks.length
  const completed = tasks.filter(t => t.column === 'done').length
  const completedPct = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className={styles.boardWrapper}>
      {/* Summary bar */}
      <div className={styles.summaryBar}>
        <div className={styles.summaryLeft}>
          <span className={styles.summaryText}>
            <strong>{completed}</strong> of <strong>{total}</strong> tasks completed
          </span>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${completedPct}%` }} />
          </div>
          <span className={styles.pct}>{completedPct}%</span>
        </div>
        <button className={styles.newTaskBtn} onClick={() => setShowGlobalModal(true)}>
          <MdAdd size={16} />
          New Task
        </button>
      </div>

      {/* Kanban board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.board}>
          {COLUMNS.map(col => (
            <Column
              key={col.id}
              column={col}
              tasks={tasks.filter(t => t.column === col.id)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div style={{ transform: 'rotate(2deg)', opacity: 0.9 }}>
              <TaskCard task={activeTask} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {showGlobalModal && (
        <TaskModal onClose={() => setShowGlobalModal(false)} />
      )}
    </div>
  )
}
