import { useEffect, useState} from "react";
import TasksDisplay from "./TasksDisplay";
import styles from "./GoalsDisplay.module.css"
import type { Goal } from "../components/NewAddGoals/types";




const GoalsDisplay:React.FC = () => {
    
    const [goals, setGoals] = useState<Goal[]>([])
    const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null)
 
    
    useEffect (()=> {
        const savedGoals = localStorage.getItem("Goals")
        if (savedGoals){
            const parsed = JSON.parse(savedGoals);
            setGoals(Array.isArray(parsed) ? parsed : [parsed])
        }
    },[])


    console.log(goals)
    
    const displayTasks = (goalId: string) => {
      setSelectedGoalId(prev =>
          prev === goalId 
            ? null 
            : goalId
      );
    }

    return (
      <div>
        {goals.map((goal) => (
          <div key={goal.goalId} className={styles.goalWrapper}>
            <h2 onClick={() => displayTasks(goal.goalId)}>
              Goal: {goal.goalName} - {goal.goalTimeFrame}
            </h2>
            <textarea/><br/>
              <button>Delete Goal</button> |
              <button>Add Notes</button>
              {selectedGoalId === goal.goalId && (
                <TasksDisplay
                  tasks = {goal.tasks}
                />
              )}
          </div>
        ))}
      </div>
    )
};
  export default GoalsDisplay
  
  
