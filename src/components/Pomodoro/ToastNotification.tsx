import { usePomodoro } from "../contexts/PomodoroContext"
import styles from "./Pomodoro.module.css"

export const ToastNofification = () => {
  const { timerCompleteToast } = usePomodoro()

  return (
    <div>
      {timerCompleteToast && (
        <div className={styles.timerEndNotification}>
          <p>{timerCompleteToast}</p>
        </div>
      )}
    </div>
  )
}
