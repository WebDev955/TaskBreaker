import { useState } from "react"
import AddTask from "./addTask"


//TypeScript Definitions
type goalProps = {
    goalId: string
}

type Task = {
        taskId: string
        taskName: string,
        timeFrame: string
};

const AddGoal:React.FC<goalProps> = ({goalId}) => {
    const [tasks, setTasks] = useState<Task[]>([])
  
    const addNewTask = ():void => {
        const newTask: Task = {
            taskId: crypto.randomUUID(),
            taskName: "",
            timeFrame:""
        } 
        setTasks((prev) => [...prev,  newTask])
    }
    return (
        <div>
            <label htmlFor="goalName">Goal:</label>
                <input
                    id ="goalName"
                    name="goalName"
                    type="text"
                />
            <br/>
            <label htmlFor="goalTimeFrame">Time Frame:</label>
                <input
                    id ="goalTimeFrame"
                    name="goalTimeFrame"
                    type="text"
                />
      
            {tasks.map((task) => (
                <div key={task.taskId}>
                    <AddTask taskId = {task.taskId} goalId = {goalId}/> 
                </div>
            ))}
            <div>
             <button type = "button" onClick = {addNewTask}>Add Tasks</button>  
            </div> 
        </div>
    )
}

export default AddGoal