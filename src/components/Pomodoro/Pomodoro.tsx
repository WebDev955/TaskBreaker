import styles from "./Pomodoro.module.css"
import { usePomodoro } from "../contexts/PomodoroContext"

const Pomodoro: React.FC = () => {
  const {
    timerMode,
    timer,
    isTimerRunning,
    timerRunningHandler,
    timerModeHandler,
  } = usePomodoro()

  return (
    <div className={styles.pomodoroWrapper}>
      <section className={styles.pomodoroHeader}>
        <h1>Pomodoro</h1>
      </section>
      <section className={styles.sessionSection}>
        <div className={styles.modeToggle}>
          <button
            className={`${styles.modeButton} ${timerMode === "Work" ? styles.modeButtonActive : ""}`}
            onClick={() => timerModeHandler("Work")}
          >
            Work
          </button>
          <button
            className={`${styles.modeButton} ${timerMode === "Rest" ? styles.modeButtonActive : ""}`}
            onClick={() => timerModeHandler("Rest")}
          >
            Rest
          </button>
        </div>
        {timerMode === "Work" ? (
          <div className={styles.sessionDisplay}>
            <p className={styles.sessionTimer}>
              Work Session Timer: {Math.floor(timer / 60)}:{timer % 60} min
            </p>
            <button
              className={styles.actionButton}
              onClick={() => timerRunningHandler()}
            >
              {isTimerRunning ? "Pause" : "Start"}
            </button>
          </div>
        ) : (
          <div className={styles.sessionDisplay}>
            <p className={styles.sessionTimer}>
              Rest Session Timer: {Math.floor(timer / 60)}:{timer % 60} min
            </p>
            <button
              className={styles.actionButton}
              onClick={() => timerRunningHandler()}
            >
              {isTimerRunning ? "Pause" : "Start"}
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default Pomodoro
