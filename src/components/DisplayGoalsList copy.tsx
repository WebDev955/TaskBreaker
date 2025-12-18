import { useEffect, useState } from "react";
import styles from "./displayGoals.module.css"

const DisplayGoalsList:React.FC = () => {
    
    const [goals, setGoals] = useState<any[]>([])
    
    useEffect (()=> {
        const savedGoals = localStorage.getItem("Goals")
        if (savedGoals){
            const parsed = JSON.parse(savedGoals);
            setGoals(Array.isArray(parsed) ? parsed : [parsed])
        }
    },[])

    console.log(goals)
    
    return (
    <div className={styles.displayGoalsMainWrapper}>
        <h1>Goals Saved</h1>
        <hr/>
      {goals.map((goal) => (
        <div key={goal.goalName} className={styles.goalWrapper}>
          <h2>{goal.goalName} - {goal.goalTimeFrame}</h2>
          {goal.tasks.map((task: any) => (
            <div key={task.taskName} className={styles.taskWrapper}>
              <h3>{task.taskName} - {task.taskTimeFrame}</h3>
                <div className={styles.chunkWrapper}>
                  <ul>
                    {task.chunks.map((chunk: any, index: number) => (
                        <li key={index}>
                          <strong>{chunk.chunkName}</strong> — {chunk.chunkTimeFrame}
                        </li>
                    ))}
                  </ul>
                </div>
            </div>
          ))} 
        </div>
      ))}
    </div>
  );
};
  export default DisplayGoalsList
  
  
