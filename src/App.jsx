import { TaskProvider } from './context/TaskContext'
import Header from './components/Header'
import Board from './components/Board'
import styles from './App.module.css'

export default function App() {
  return (
    <TaskProvider>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <Board />
        </main>
      </div>
    </TaskProvider>
  )
}
