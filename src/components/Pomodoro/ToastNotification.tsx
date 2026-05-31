  import { usePomodoro } from "../contexts/PomodoroContext"
  import styles from "./Pomodoro.module.css"
  
  export const ToastNofification = () =>{
    const {timerComplete} = usePomodoro()

    return (
        <div>
        {timerComplete &&
                <div className={styles.timerEndNotification}><p>{timerComplete}</p></div>
        }
        </div>
    )
  }

