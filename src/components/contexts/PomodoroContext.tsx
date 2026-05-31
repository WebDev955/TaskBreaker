import { createContext, useContext, useEffect, useState} from "react";

type PomodoroContextType = {
    timerMode: string,
    timer: number,
    isTimerRunning: boolean,

    timerRunningHandler: () => void,
    timerModeHandler : (value: string) => void,
}

export const PomodoroContext = createContext<PomodoroContextType | null>(null)

export const PomodoroProvider:React.FC <{children: React.ReactNode}> = ({children}) => {
    const [timerMode, setTimerMode] = useState("Work")
    const [timer, setTimer] = useState(10)
    const [isTimerRunning, setIsTimerRunning] = useState(false)

    const timerRunningHandler = () => { 
        if (Notification.permission === "granted") {
            setIsTimerRunning(!isTimerRunning)
        } else  Notification.requestPermission()
        
    }

    const timerModeHandler = (value:string) => {
        if (timerMode === value) return
            
        setIsTimerRunning(false)

            if (value === "Work") {
                setTimerMode(value)
                setTimer(10)
            }
            if (value === "Rest"){
                setTimerMode(value)
                setTimer(10)
            } 
    }

    useEffect (() => { 
        if (isTimerRunning === false) return
        const intervalId = setInterval(() => { 
            setTimer(prevTime => {
                if (prevTime === 1) {
                    clearInterval(intervalId)
                    return 0
                } 
                return prevTime -1
            })
        }, 1000);
        
        return() => {
            clearInterval(intervalId)
        }
    }, [isTimerRunning])

    useEffect(() => {
        if (timer === 0 && isTimerRunning) {
            if (timerMode === "Work"){
               new Notification("Work done! Resting Now!")
                setTimerMode("Rest")
                setIsTimerRunning(false)
                setTimer(10)  
            }
            if (timerMode === "Rest"){
                new Notification("Rest done! Working Now!")
                setTimerMode("Work")
                setIsTimerRunning(false)
                setTimer(15)
            }  
        }
}, [timer])
   
return (
        <PomodoroContext.Provider value ={{
            timer, timerMode, isTimerRunning, 
            timerRunningHandler, timerModeHandler
        }}>
            {children}
        </PomodoroContext.Provider>
    )
}

export const usePomodoro = () => {
    const ctx = useContext(PomodoroContext)
    if(!ctx) throw new Error ("usePomodoro must be used inside PomodoroProvider")
    return ctx;
};