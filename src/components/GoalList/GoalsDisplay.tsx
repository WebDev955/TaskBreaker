import {useState} from "react";
import TasksDisplay from "./TasksDisplay";
import GoalNote from "./GoalNote";
import GoalForm from "../AddNewGoal/GoalForm";
import styles from "./GoalsDisplay.module.css"
import GoalModal from "../../UI/GoalModal";

import { useGoals } from "../contexts/GoalContext";


const GoalsDisplay:React.FC = () => {
    const {goals, archiveGoal, getGoalNote} = useGoals()

    const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null)
    const [showAddGoalForm, setAddGoalForm] = useState(false)
    const [openGoalNotes, setOpenGoalNotes] = useState("")
    
    const displayAddGoal = ():void => {
      setAddGoalForm(true)
    }

    const displayTasks = (goalId: string) => {
      setSelectedGoalId((prev) => (prev === goalId ? null: goalId));
    }

    const goalStatus = (goalId: string, status: string) => {
      archiveGoal(goalId, status)
      alert("Goal archived!")
    }

    const editNoteHandler = (goalId: string) => {
      setOpenGoalNotes(goalId)
    }
    return (
      <div className={styles.mainWrapper}>
          <div className={styles.addGoalWrapper}>
              <GoalModal/>
              {showAddGoalForm && 
                <GoalForm/> 
              } 
          <div className={styles.sortmenu}>
            <h3>Sort Goals:</h3>
            <p>Name</p>
            <p>Length</p>
          </div>
        </div>
        {goals.map((goal) => {
          if (goal.goalStatus !== "Active") return null;
          const totalTasks = goal.tasks.length;
          const completedTasks = goal.tasks.filter(task => task.isTaskComplete).length;
          const progressPercentage = totalTasks === 0
              ? 0
              : (completedTasks / totalTasks) * 100;
{/*GOAL DISPLAY*/}
          return (
            <div key={goal.goalId} className={styles.goalWrapper}>
              <div className={styles.goalHeader}>
                <h2 onClick={() => displayTasks(goal.goalId)}>
                  Goal: {goal.goalName} - {goal.goalTimeFrame}
                </h2> 
              </div>
{/*GOAL COMPLETE STATUS DIV*/}
              <div className = {styles.progressBar}> 
                <div
                  className= {styles.progressFill}
                  style = {{width: `${progressPercentage}%`}}
                />
              </div>
{/*GOAL OPTIONS MENU DIV*/}
              {getGoalNote(goal.goalId)}
                {openGoalNotes === goal.goalId &&
                  <GoalNote
                    goalId= {goal.goalId}
                    openGoalNotes = {openGoalNotes}
                    closeEditNote = {editNoteHandler}
                  />
                }
              <div className = {styles.goalOptionsMenu}>              
                <button onClick = {() => editNoteHandler(goal.goalId)}>Edit Note</button> 
                <button  onClick = {() => goalStatus(goal.goalId, "Archive")}>Archive Goal</button >
              </div>
              {selectedGoalId === goal.goalId && (
                  <TasksDisplay
                    goalId = {goal.goalId}
                    tasks = {goal.tasks}
                  />
                )}
            </div> 
            
          );
      })}
      </div>
    )
};
  export default GoalsDisplay
  
  
