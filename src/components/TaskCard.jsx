import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useTasks } from '../context/TaskContext'
import { isOverdue, formatDeadline } from '../utils/dateUtils'
import { MdEdit, MdDelete, MdDragIndicator, MdAccessTime, MdFlag } from 'react-icons/md'
import TaskModal from './TaskModal'
import styles from './TaskCard.module.css'

const PRIORITY_CONFIG = {
  High:   { color: 'var(--high)',   bg: 'var(--high-bg)',   label: 'High' },
  Medium: { color: 'var(--medium)', bg: 'var(--medium-bg)', label: 'Med' },
  Low:    { color: 'var(--low)',     bg: 'var(--low-bg)',    label: 'Low' },
}

export default function TaskCard({ task }) {
  const { deleteTask } = useTasks()
  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const overdue = isOverdue(task.deadline, task.column)
  const deadlineLabel = formatDeadline(task.deadline)
  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.Medium

  const {
    attributes, listeners, setNodeRef, transform, transition, isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={styles.card + (overdue ? ' ' + styles.overdue : '') + (isDragging ? ' ' + styles.dragging : '') + ' animate-in'}
      >
        {/* Drag handle */}
        <div className={styles.dragHandle} {...attributes} {...listeners} title="Drag to move">
          <MdDragIndicator />
        </div>

        <div className={styles.body}>
          <div className={styles.topRow}>
            <span
              className={styles.priority}
              style={{ color: priority.color, background: priority.bg }}
            >
              <MdFlag size={10} />
              {priority.label}
            </span>
            {overdue && <span className={styles.overdueTag}>Overdue</span>}
          </div>

          <h3 className={styles.title}>{task.title}</h3>
          {task.description && <p className={styles.desc}>{task.description}</p>}

          <div className={styles.footer}>
            {deadlineLabel && (
              <span className={styles.deadline + (overdue ? ' ' + styles.deadlineOverdue : '')}>
                <MdAccessTime size={11} />
                {deadlineLabel}
              </span>
            )}
            <div className={styles.actions}>
              <button className={styles.actionBtn} onClick={() => setEditing(true)} title="Edit task">
                <MdEdit size={14} />
              </button>
              <button
                className={styles.actionBtn + ' ' + styles.deleteBtn}
                onClick={() => setConfirmDelete(true)}
                title="Delete task"
              >
                <MdDelete size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Confirm delete inline */}
        {confirmDelete && (
          <div className={styles.confirmOverlay}>
            <p>Delete this task?</p>
            <div className={styles.confirmBtns}>
              <button className={styles.cancelConfirm} onClick={() => setConfirmDelete(false)}>Cancel</button>
              <button className={styles.confirmDelete} onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        )}
      </div>

      {editing && <TaskModal task={task} onClose={() => setEditing(false)} />}
    </>
  )
}
