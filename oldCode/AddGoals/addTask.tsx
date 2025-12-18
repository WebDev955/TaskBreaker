//IMPORT - Styles
import { useState } from "react"
import AddChunk from "./addChunk"

import styles from "./addTask.module.css"

type taskProps = {
    goalId: string,
    taskId: string
}   

type Chunk = {
        chunkId: string,
        chunkName: string,
        chunkTimeFrame: string
    }

const AddTask:React.FC<taskProps> = ({taskId, goalId}) => {
    const [chunks, setChunks] = useState<Chunk[]>([])

    const addNewChunk = ():void =>{
        const newChunk: Chunk = {
            chunkId: crypto.randomUUID(),
            chunkName: "",
            chunkTimeFrame: ""
        }
        setChunks((prev) => [...prev, newChunk])
    }

    return (
        <div className={styles.taskWrapperDiv}>
            <h2>Task</h2>
            <label htmlFor={`taskName_${goalId}_${taskId}`}>Task:</label>
                <input
                    id = {`taskName_${goalId}_${taskId}`}
                    name ={`taskName_${goalId}_${taskId}`} //"key" that is pulled into FormData
                    type ="text"
                />
            <br/>
            <label htmlFor={`taskTimeFrame_${goalId}_${taskId}`}>Time Frame:</label>
                <input
                    id = {`taskTimeFrame_${goalId}_${taskId}`}
                    name = {`taskTimeFrame_${goalId}_${taskId}`}
                    type = "text"
                />              
                    {chunks.map((chunk) => (
                        <div key = {chunk.chunkId}>
                            <AddChunk 
                                goalId = {goalId}
                                taskId = {taskId}
                                chunkId = {chunk.chunkId}/> 
                        </div>
                    ))}
                <div>
                   <button type = "button" onClick = {addNewChunk}>Add Chunk</button>  
                </div>
        </div>
    )
}

export default AddTask