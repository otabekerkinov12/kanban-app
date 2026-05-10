import { useState, useEffect } from 'react'
import { useTasks } from '../context/TaskContext'
import { PRIORITIES } from '../data/seedData'
import styles from './TaskModal.module.css'

export default function TaskModal({ task, defaultColumn = 'todo', onClose }) {
  const { addTask, updateTask } = useTasks()
  const isEdit = !!task

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    deadline: '',
    column: defaultColumn,
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (task) setForm({ title: task.title, description: task.description || '', priority: task.priority, deadline: task.deadline || '', column: task.column })
  }, [task])

  function validate() {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (form.title.trim().length > 100) e.title = 'Max 100 characters'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    if (isEdit) updateTask({ ...task, ...form })
    else addTask(form)
    onClose()
  }

  function set(field, val) {
    setForm(f => ({ ...f, [field]: val }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: null }))
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal + ' slide-in'}>
        <div className={styles.header}>
          <h2 className={styles.title}>{isEdit ? 'Edit Task' : 'New Task'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Title <span className={styles.req}>*</span></label>
            <input
              className={styles.input + (errors.title ? ' ' + styles.error : '')}
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
            />
            {errors.title && <span className={styles.errorMsg}>{errors.title}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Add more details (optional)"
              rows={3}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Priority</label>
              <select className={styles.select} value={form.priority} onChange={e => set('priority', e.target.value)}>
                {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Deadline</label>
              <input
                type="date"
                className={styles.input}
                value={form.deadline}
                onChange={e => set('deadline', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Column</label>
            <div className={styles.colPicker}>
              {['todo', 'inprogress', 'done'].map(col => (
                <button
                  key={col}
                  type="button"
                  className={styles.colBtn + (form.column === col ? ' ' + styles.colActive : '')}
                  data-col={col}
                  onClick={() => set('column', col)}
                >
                  {col === 'todo' ? 'To Do' : col === 'inprogress' ? 'In Progress' : 'Done'}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.submitBtn}>{isEdit ? 'Save Changes' : 'Add Task'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
