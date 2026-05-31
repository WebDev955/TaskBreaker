import styles from "./Pomodoro.module.css"
import { usePomodoro } from "../contexts/PomodoroContext";


const Pomodoro:React.FC = () => {
const { timerMode, timer, isTimerRunning, 
        timerRunningHandler, timerModeHandler
    }= usePomodoro()

    return (
        <div>
            <h1>Timer for a Pomodoro</h1>
            <section>
                <div>
                    <button onClick = {() => timerModeHandler("Work")}>Work</button> 
                    <button onClick = {() => timerModeHandler("Rest")}>Rest</button>
                </div>
                {timerMode === "Work"
                   ? <div>
                       <p className={styles.sessionTimer}>Work Session Timer: {Math.floor(timer/60)}:{(timer % 60)} min</p>
                       <button onClick={() => timerRunningHandler()}>{isTimerRunning? "Pause" : "Start"}</button>
                    </div>
                    : <div>
                       <p>Rest Session Timer: {Math.floor(timer/60)}:{(timer % 60)} min</p>
                       <button onClick={() => timerRunningHandler()}>{isTimerRunning? "Pause" : "Start"}</button>
                    </div>
                }
            </section>
        </div>
    )
}

export default Pomodoro