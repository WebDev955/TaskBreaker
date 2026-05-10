//Imports - hooks/Types
import { useState } from "react";
import type { Task } from "../AddNewGoal/types"
import { useGoals } from "../contexts/GoalContext";
//Imports - Components
import ChunksDisplay from "./ChunksDisplay";
import AddAdditionalTask from "./AddAdditionalTask";
//Imports - styles, images
import styles from "./TasksDisplay.module.css"
import CheckBoxChecked from "../../../public/CheckBoxChecked.png"
import CheckBoxEmpty from "../../../public/CheckBoxEmpty.png"
import DownArrow from "../../../public/DownArrow.png"


type TasksDisplayProps = {
  tasks: Task[];
  goalId: string;
}; 

const TasksDisplay:React.FC<TasksDisplayProps> = ({tasks, goalId}) => {
    
    const {checkTask} = useGoals()
  
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
    const [openNewTask, setOpenNewTask] = useState<boolean>(false)
    
    const checkBoxHandler = (goalId: string, taskId:string) =>{
      checkTask(goalId, taskId)
    };
    
    const newTaskHandler = () =>{
      setOpenNewTask(true)
    }

    const displayChunks = (taskId: string) => {
       setSelectedTaskId(prev =>
          prev === taskId 
            ? null 
            : taskId
        );
    }


    
    /**************************************************/ 
    /*Submit New Task                             ****/
    /************************************************/
    //const addNewTaskHandler = () =>{
      //function to update 
    //}




    return (
      <div className={styles.mainTaskDisplayWrapper}>
        <h3>Tasks to Complete:</h3>
        <p>Tasks Completed: {tasks.filter(task => task.isTaskComplete).length}/{tasks.length}</p>
        <ul className= {styles.taskList}>
          <button onClick={() => newTaskHandler()}>+ Additional Task</button>
          {openNewTask && (
            <AddAdditionalTask
              goalId = {goalId}
            />
          )}
          {tasks.map(task => (
            <li 
              key={task.taskId} 
              onClick = {() => displayChunks(task.taskId)}
            > 
            <div className={styles.task}>
                <img  
                  width="20px" 
                  src = { 
                      task.isTaskComplete
                     ? CheckBoxChecked
                     : CheckBoxEmpty
                  }
                  onClick = {(e) => {
                    e.stopPropagation(); 
                    checkBoxHandler(goalId, task.taskId);
                  }}
                />
                <span className={styles.taskText}>{
                  task.taskName} - {task.taskTimeFrame}
                </span>
                  <img
                    className= {styles.downArrow}
                    width="20"
                    src = {DownArrow}
                  /> 
                </div>
              <div>
                {selectedTaskId === task.taskId && (
                  <ChunksDisplay 
                    chunks = {task.chunks} 
                    taskId = {task.taskId}
                    goalId = {goalId}
                    taskName = {task.taskName}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
};
  export default TasksDisplay
  
  
