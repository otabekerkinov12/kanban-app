import { useTasks } from '../context/TaskContext'
import { isOverdue } from '../utils/dateUtils'
import styles from './Header.module.css'

export default function Header() {
  const { tasks } = useTasks()

  const total = tasks.length
  const completed = tasks.filter(t => t.column === 'done').length
  const overdue = tasks.filter(t => isOverdue(t.deadline, t.column)).length
  const inProgress = tasks.filter(t => t.column === 'inprogress').length

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⬡</span>
        </div>
        <div>
          <h1 className={styles.title}>TaskFlow</h1>
          <p className={styles.subtitle}>Project Management Board</p>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNum}>{total}</span>
          <span className={styles.statLabel}>Total</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statNum} style={{ color: 'var(--inprogress)' }}>{inProgress}</span>
          <span className={styles.statLabel}>Active</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statNum} style={{ color: 'var(--done)' }}>{completed}</span>
          <span className={styles.statLabel}>Done</span>
        </div>
        {overdue > 0 && (
          <>
            <div className={styles.divider} />
            <div className={styles.stat}>
              <span className={styles.statNum} style={{ color: 'var(--high)' }}>{overdue}</span>
              <span className={styles.statLabel}>Overdue</span>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
