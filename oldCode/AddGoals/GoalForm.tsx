//import AddChunk from "./addChunk"
//import AddTask from "./addTask"
import AddGoal from "./addGoal"
import { useState } from "react"

//TypeScript Definitions
type AddGoalFormProps = {
  goalId: string;
};

type ParsedTask = {
  taskId: string,  
  taskName: string;
  taskTimeFrame: string;
  chunks: Record<
    string,
    {
      chunkId: string,
      chunkName: string;
      chunkTimeFrame: string;
    }
  >;
};

const GoalForm:React.FC<AddGoalFormProps> = ({goalId}) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const goalName = formData.get('goalName') as string;
        const goalTimeFrame = formData.get('goalTimeFrame') as string
    
        //Define  tasks:
        const tasks: Record<string, ParsedTask> = {};

        console.log("Tasks Object Created:",tasks)    
            for (const [key, value] of formData.entries()){
                const keyStr = key.toString();
                const valStr = value.toString();

                //Match with input (name attribute) Tasks
                if (keyStr.startsWith("taskName_")){
                    const  [, ,taskId] = keyStr.split("_");

                    tasks[taskId] ??= { 
                        taskId: taskId,
                        taskName: "", 
                        taskTimeFrame: "", 
                        chunks: {}
                    };
                    tasks[taskId].taskName = valStr;
                }

                // TASK TIME FRAME
                if (keyStr.startsWith("taskTimeFrame_")) {
                    const [, , taskId] = keyStr.split("_");

                    tasks[taskId] ??= {
                        taskId: taskId,
                        taskName: "",
                        taskTimeFrame: "",
                        chunks: {}
                    };

                    tasks[taskId].taskTimeFrame = valStr;
                }

                // CHUNK NAME
                if (keyStr.startsWith("chunkName_")) {
                    const [, , taskId, chunkId] = keyStr.split("_");

                    tasks[taskId] ??= {
                        taskId: taskId,
                        taskName: "",
                        taskTimeFrame: "",
                        chunks: {}
                    };

                    tasks[taskId].chunks[chunkId] ??= {
                        chunkId: chunkId,
                        chunkName: "",
                        chunkTimeFrame: ""
                    };

                    tasks[taskId].chunks[chunkId].chunkName = valStr;
                }

                // CHUNK TIME FRAME
                if (keyStr.startsWith("chunkTimeFrame_")) {
                    const [, , taskId, chunkId] = keyStr.split("_");

                    tasks[taskId] ??= {
                        taskId:taskId,
                        taskName: "",
                        taskTimeFrame: "",
                        chunks: {}
                    };

                    tasks[taskId].chunks[chunkId] ??= {
                        chunkId: chunkId,
                        chunkName: "",
                        chunkTimeFrame: ""
                    };

                    tasks[taskId].chunks[chunkId].chunkTimeFrame = valStr;
                }
                }
            // Convert tasks record into array
                const goalData = {
                    goalId,
                    goalName,
                    goalTimeFrame,
                    tasks: Object.values(tasks).map(task => ({
                        taskId: task.taskId,
                        taskName: task.taskName,
                        taskTimeFrame: task.taskTimeFrame,
                        chunks: Object.values(task.chunks)
                    }))
                };

            const raw = localStorage.getItem("Goals");
            let existing: any[] = [];

            try {
            existing = raw ? JSON.parse(raw) : [];

            if (!Array.isArray(existing)) {
                existing = [];
            }

            } catch {
            existing = [];
            }

            const updated = [...existing, goalData];
            localStorage.setItem("Goals", JSON.stringify(updated));

            console.log("Saved goal:", goalData);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <AddGoal goalId = {goalId}/>
                <hr/>
                <div>
                    <button type="submit">Save Goal!</button>
                </div>
            </form>
        </div>
    )
}

export default GoalForm

