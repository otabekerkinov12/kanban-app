export const COLUMNS = [
  { id: 'todo', label: 'To Do', color: 'var(--todo)', bg: 'var(--todo-bg)', border: 'var(--todo-border)' },
  { id: 'inprogress', label: 'In Progress', color: 'var(--inprogress)', bg: 'var(--inprogress-bg)', border: 'var(--inprogress-border)' },
  { id: 'done', label: 'Done', color: 'var(--done)', bg: 'var(--done-bg)', border: 'var(--done-border)' },
]

export const PRIORITIES = ['High', 'Medium', 'Low']

export const SEED_TASKS = [
  {
    id: 'task-1',
    title: 'Design landing page wireframes',
    description: 'Create initial wireframes for the new marketing landing page using Figma.',
    priority: 'High',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    column: 'todo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment.',
    priority: 'Medium',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    column: 'todo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-3',
    title: 'Refactor authentication module',
    description: 'Clean up the auth logic and add proper error handling and token refresh.',
    priority: 'High',
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    column: 'inprogress',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-4',
    title: 'Write unit tests for API layer',
    description: 'Add Jest tests for all API utility functions with at least 80% coverage.',
    priority: 'Medium',
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    column: 'inprogress',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-5',
    title: 'Update project documentation',
    description: 'Update README and API docs to reflect recent changes.',
    priority: 'Low',
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    column: 'done',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-6',
    title: 'Fix mobile navigation bug',
    description: 'The hamburger menu does not close after selecting a nav item on iOS.',
    priority: 'High',
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    column: 'done',
    createdAt: new Date().toISOString(),
  },
]
