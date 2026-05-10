import { isPast, parseISO, format, isToday, isTomorrow } from 'date-fns'

export function isOverdue(deadline, column) {
  if (!deadline || column === 'done') return false
  return isPast(parseISO(deadline + 'T23:59:59'))
}

export function formatDeadline(deadline) {
  if (!deadline) return null
  const date = parseISO(deadline)
  if (isToday(date)) return 'Today'
  if (isTomorrow(date)) return 'Tomorrow'
  return format(date, 'MMM d')
}
