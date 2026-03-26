//IMPORTS - Components
import NavBar from './components/NavBar'
//import ListGoals from './components/GoalList/ListedGoals'
import GoalsDisplay from './components/GoalList/GoalsDisplay'
import Notes from './components/Notes/Notes'
import ArchivedGoals from './components/ArchivedGoals/ArchivedGoals'
import Pomodoro from './components/Pomodoro/Pomodor'
import { GoalsProvider } from './components/contexts/GoalContext'

//IMPORTS - Styles 
import './App.css'

import { useState } from 'react'


function App() {
  const [renderContent, setRenderContent] = useState("displayGoals")

  const displayContent = (value: string) => {
    setRenderContent(value)
  }

  return (
    <>
      <GoalsProvider>
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
    </>
  )
}

export default App
