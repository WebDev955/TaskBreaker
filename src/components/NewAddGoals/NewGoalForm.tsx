import NewAddGoal from "./NewAddGoal";
import NewAddTask from "./NewAddTask";

import type { Task} from "./types";
import { useState } from "react"

//TypeScript Definitions
//type updateTaskName = (event: string) => void

const NewGoalForm: React.FC = () => {

    /**************************************************/ 
    /*Default Goal and Task States                ****/
    /************************************************/
    const [goal, setGoal] = useState({
        goalId: crypto.randomUUID(),
        goalName: "",
        goalTimeFrame: "",
        tasks: []
    })

    const [tasks, setTasks] = useState<Task[]>([{
        taskId: crypto.randomUUID(),
        taskName:"",
        taskTimeFrame:"",
        chunks: [{
            chunkId:crypto.randomUUID(),
            chunkName:"",
            chunkTimeFrame:""
        }]
    }])
console.log(tasks)
    /**************************************************/ 
    /*UPDATING FUNCTIONS (add new Task and Chunk)****/
    /************************************************/

    //Create a new Task, add to Task array upon button press
    const addNewTask = ():void => {
        setTasks((prev) => [
            ...prev,
            {   
                taskId: crypto.randomUUID(),
                taskName:"",
                taskTimeFrame:"",    
                    chunks: [{
                        chunkId:crypto.randomUUID(),
                        chunkName:"",
                        chunkTimeFrame:""
                    }]
            }
        
        ])
    }

    //Create a new Chunk, add to Task > Chunk [] upon button press inside newAddTask
    const addChunkToTask = (taskId: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.taskId === taskId
                ? {
                    ...task,
                    chunks: [
                        ...task.chunks,
                        {
                        chunkId: crypto.randomUUID(),
                        chunkName: "",
                        chunkTimeFrame: "",
                        },
                    ],
                    }
                : task
            )
        );
  };
    /******************************************************/ 
    /*UPDATING FUNCTIONS (update Properties via inputs)****/
    /******************************************************/
    
    //update Goal properties
    const updateGoalName = (value:string):void => {
        setGoal((prev) => ({
            ...prev,
            goalName: value,
        }));
        
}
    const updateGoalTime = (value:string):void => {
        setGoal((prev) => ({
            ...prev,
            goalTimeFrame: value,
        }));
        
}


    //Update Task properties
    const updateTaskName = (taskId: string, value: string):void => {
        setTasks((prev)=>
            prev.map((task) =>
                task.taskId === taskId
                ? {...task, taskName: value}
                : task
            )
        );
    };

    const updateTaskTime = (taskId: string, value: string):void => {
        setTasks((prev)=>
            prev.map((task) =>
                task.taskId === taskId
                ? {...task, taskTimeFrame: value}
                : task
            )
        );
    };
    //update Chunk Properties
    const updateChunkName = (taskId: string, chunkId: string, value: string):void => {
        setTasks ((prev) =>
            prev.map((task) =>
                task.taskId === taskId
                    ? {
                        ...task, 
                        chunks: task.chunks.map((chunk) =>
                            chunk.chunkId === chunkId
                            ? {...chunk, chunkName: value}
                            : chunk
                        ),
                    }

                     : task
            )
        )
    };

    const updateChunkTime = (taskId: string, chunkId: string, value: string):void => {
        setTasks ((prev) => 
            prev.map((task) =>
                    task.taskId === taskId
                    ? {
                        ...task,
                        chunks: task.chunks.map((chunk) =>
                            chunk.chunkId === chunkId
                                ? {...chunk, chunkTimeFrame: value}
                                : chunk
                        ),
                    }
                    : task
                )
            )
        };

    /**************************************************/ 
    /* SUBMIT FUNCTION                            ****/
    /************************************************/

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData (event.target)
        const goalName = formData.get("goalName")
        const goalTimeFrame = formData.get("goalTimeFrame")
        const goalId = goal.goalId

        const taskList = tasks

        const newGoal = {
            goalId,
            goalName,
            goalTimeFrame,
            tasks: taskList
        }
        
        const currentGoalList = localStorage.getItem("Goals")
        const existingGoals = currentGoalList
            ? JSON.parse(currentGoalList)
            : []

        const updatedGoals = [...existingGoals, newGoal]

        localStorage.setItem("Goals", JSON.stringify(updatedGoals));
        alert("Goal Added!")

        console.log("Saved goal:", newGoal);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/*Display simple add goalComponent*/}
                <NewAddGoal
                    goal = {goal}
                    updateGoalName = {updateGoalName}
                    updateGoalTime = {updateGoalTime}
                />
                
                {/*display and update list of addTask Components, push needed Props*/}
                <div>
                    {tasks.map((task)=> (
                        <NewAddTask
                            key = {task.taskId}
                            task = {task}                        
                            updateTaskName = {updateTaskName}
                            updateTaskTime = {updateTaskTime}
                            addChunk = {addChunkToTask}
                            updateChunkName = {updateChunkName}
                            updateChunkTime = {updateChunkTime}
                        />
                    ))}
                </div>
                <h2 onClick={() => addNewTask()}> + Task</h2>  
                <div>
                    <hr/>
                    <button type="submit">Save Goal!</button>
                </div>
            </form>
        </div>
    )
}

export default NewGoalForm

