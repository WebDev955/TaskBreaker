import { useState, useEffect } from 'react'
//IMPORTS - Components
import NavBar from './components/NavBar'
//import ListGoals from './components/GoalList/ListedGoals'
import GoalsDisplay from './components/GoalList/GoalsDisplay'
import Notes from './components/Notes/Notes'
import ArchivedGoals from './components/ArchivedGoals/ArchivedGoals'
import Pomodoro from './components/Pomodoro/Pomodoro'
import { GoalsProvider } from './components/contexts/GoalContext'
import { PomodoroProvider, usePomodoro} from './components/contexts/PomodoroContext'


//IMPORTS - Styles 
import './App.css'
import styles from "../src/components/Pomodoro/Pomodoro.module.css"
import SessionComplete from "../src/assets/SessionComplete.mp3"
function App() {
  const [renderContent, setRenderContent] = useState("displayGoals")

  const displayContent = (value: string) => {
    setRenderContent(value)
  }

 const ToastNofification = () =>{
    const {timerComplete} = usePomodoro()
    const playSound = () => {
      new Audio(SessionComplete).play();
    }

    useEffect(() => {
        if (timerComplete) {
            playSound()
        }
    }, [timerComplete])
    return (
        <div>
          {timerComplete && 
              <div className={styles.timerEndNotification}><p>{timerComplete}</p></div>
          }
        </div>
    )
  }

  return (
  <>
    <PomodoroProvider>
      <GoalsProvider>
        <ToastNofification/>
        <h1>Task Breaker</h1>
        {renderContent === "displayGoals" &&
         <p>Learn something new, break down one large goal into tasks and chunks and see the progress.</p>
        }
          {renderContent === "displayGoals" && <GoalsDisplay/>}
          {renderContent === "displayNotes" && <Notes/>}
          {renderContent === "displayArchive" && <ArchivedGoals/>}
          {renderContent === "displayPomo" && <Pomodoro/>}
          <NavBar displayContent = {displayContent}/>
        </GoalsProvider>
    </PomodoroProvider>
  </>
  )
}

export default App
