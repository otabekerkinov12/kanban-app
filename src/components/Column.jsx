import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'
import { MdAdd } from 'react-icons/md'
import styles from './Column.module.css'

export default function Column({ column, tasks }) {
  const [showModal, setShowModal] = useState(false)

  const { setNodeRef, isOver } = useDroppable({ id: column.id })

  return (
    <>
      <div className={styles.column + (isOver ? ' ' + styles.over : '')}>
        {/* Column Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.dot} style={{ background: column.color }} />
            <h2 className={styles.title}>{column.label}</h2>
            <span
              className={styles.count}
              style={{ color: column.color, background: column.bg, border: `1px solid ${column.border}` }}
            >
              {tasks.length}
            </span>
          </div>
          <button className={styles.addBtn} onClick={() => setShowModal(true)} title="Add task">
            <MdAdd size={16} />
          </button>
        </div>

        {/* Drop zone / task list */}
        <div
          ref={setNodeRef}
          className={styles.taskList + (isOver ? ' ' + styles.taskListOver : '')}
        >
          <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>

          {tasks.length === 0 && (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>○</span>
              <span>Drop tasks here</span>
            </div>
          )}
        </div>

        {/* Footer add button */}
        <button className={styles.footerAdd} onClick={() => setShowModal(true)}>
          <MdAdd size={14} />
          Add task
        </button>
      </div>

      {showModal && (
        <TaskModal defaultColumn={column.id} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
