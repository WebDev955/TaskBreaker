//IMPORTS - Components
//import GoalForm from '../oldCode/AddGoals/GoalForm'
//import DisplayGoalsList from './components/ListedGoals'
import ListGoals from './components/ListedGoals'


//IMPORTS - Styles 
import './App.css'

import { useState } from 'react'
import NewGoalForm from './components/NewAddGoals/NewGoalForm'

function App() {

  const [showAddGoalForm, setAddGoalForm] = useState(false)

  const displayAddGoal = ():void => {
    setAddGoalForm(true)
  }
    

  return (
    <>
      <h1>Task Breaker</h1>
      <p>Learn something new, break down one large goal into tasks and chunks and see the progress.</p>
      <hr/>
      <div>
        <h2 onClick ={displayAddGoal}>Add A Goal!</h2> 
          {showAddGoalForm &&
            <NewGoalForm/> 
          }
      </div>
      <hr/>
        <ListGoals/>
    </>
  )
}

export default App
