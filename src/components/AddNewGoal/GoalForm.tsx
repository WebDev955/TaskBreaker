import { useGoals } from "../contexts/GoalContext";
import NewAddGoal from "./AddGoal";
import NewAddTask from "./AddTask";
import GoalFormUI from "../../UI/GoalFormUI" 
import style from "./GoalForm.module.css"

import type { Goal, Task} from "./types";
import { useState } from "react"
 
type AddNewGoalProps = {
    closeModal: () => void,
}

const GoalForm: React.FC<AddNewGoalProps> = ({closeModal}) => {
    
    const {addGoal} = useGoals()

    /**************************************************/ 
    /*Default Goal and Task States                ****/
    /************************************************/
    const [goal, setGoal] = useState({
        goalId: crypto.randomUUID(),
        goalName: "",
        goalNote: "",
        goalTimeFrame: "",
        goalStatus: "Active",
        tasks: []
    })

    const [tasks, setTasks] = useState<Task[]>([{
        taskId: crypto.randomUUID(),
        taskName:"",
        taskTimeFrame:"",
        isTaskComplete: false,
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
                isTaskComplete: false,    
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
        const goalName = String(formData.get("goalName") ?? "")
        const goalTimeFrame = String(formData.get("goalTimeFrame") ?? "")
        const goalId = goal.goalId
        const goalNote = goal.goalNote
        const goalStatus = goal.goalStatus

        const taskList = tasks

        const newGoal = {
            goalId,
            goalName,    
            goalNote,
            goalTimeFrame,
            goalStatus,
            tasks: taskList
        }
        
        addGoal(newGoal as Goal)

        alert("Goal Added!")
        closeModal()
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
                <p>Privde a single task to meet your goal and how long it might take to finish.</p>
                <div>
                    <hr/>
                    <button type="submit">Save Goal!</button>
                </div>
            </form>
        </div>
    )
}

export default GoalForm

