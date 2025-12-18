import { useState } from "react";
import ChunksDisplay from "./ChunksDisplay";
import AddAdditionalTask from "../components/AddAdditionalTask";

import styles from "./TasksDisplay.module.css"
import type { Task } from "../components/NewAddGoals/types";


type TasksDisplayProps = {
  tasks: Task[];
}; 

const TasksDisplay:React.FC<TasksDisplayProps> = ({tasks}) => {
    
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
    const [isChecked, setIsChecked] = useState<Set<string>>(
      () => new Set
    )

    const [newTask, setNewTask] = useState<boolean>(false)

    const newTaskHandler = () =>{
      setNewTask(true)
    }

    const displayChunks = (taskId: string) => {
       setSelectedTaskId(prev =>
          prev === taskId 
            ? null 
            : taskId
        );
    }

    const checkBoxHandler = (taskId:string) =>{
      setIsChecked(prev => {
        const next = new Set(prev)

        if (next.has(taskId)) {
          next.delete(taskId);
        } else {
          next.add(taskId)
        }
        return next;
      }); 
    };
    
      console.log(tasks)
    return (
      <div className={styles.mainTaskDisplayWrapper}>
        <h3>Tasks to Complete:</h3>
        <ul className= {styles.taskList}>
          <button onClick={() => newTaskHandler()}>+ Additional Task</button>
          {newTask &&
            <AddAdditionalTask/>
          }
          {tasks.map(task => (
            <li 
              key={task.taskId} 
              onClick = {() => displayChunks(task.taskId)}
            > 
            <div className={styles.task}>
                
                <img  
                  width="20px" 
                  src = { 
                     isChecked.has(task.taskId)
                      ? "/CheckBoxChecked.png"
                      : "/CheckBoxEmpty.png"
                  }
                  onClick = {(e) => {
                    e.stopPropagation(); 
                    checkBoxHandler(task.taskId);
                  }}
                />
                <span className={styles.taskText}>{
                  task.taskName} - {task.taskTimeFrame}
                </span>
                  <img
                    className= {styles.downArrow}
                    width="20"
                    src = "/DownArrow.png"
                  /> 
                </div>
              <div>
                {selectedTaskId === task.taskId && (
                  <ChunksDisplay chunks = {task.chunks} taskName = {task.taskName}/>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
};
  export default TasksDisplay
  
  
