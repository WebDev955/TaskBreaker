//IMPORT - COMPONENTS/TYPES
import NewAddChunk from "./NewAddChunk"
import type {Task} from "./types"

//IMPORT - STYLES
import styles from "./addTask.module.css"

/**************************************************/ 
/* Task Prop Definitions                       ****/
/************************************************/
type taskProps = {
     task: Task,
     addChunk: (taskId:string) => void,
     updateTaskName: (taskId: string, value: string) => void,
     updateTaskTime: (taskId: string, value: string) => void,
     updateChunkName: (taskId: string, chunkId: string, value: string) => void,
     updateChunkTime: (taskId: string, chunkId: string, value: string) => void
}

const NewAddTask: React.FC<taskProps> = ({
    task, 
    addChunk,
    updateTaskTime, 
    updateTaskName,
    updateChunkName,
    updateChunkTime

}) => {

    return (
        <>
        <div className={styles.taskWrapperDiv} key = {task.taskId}>
            <br/>
            <h2>Task</h2> 
        
            <label htmlFor="TaskName">Task:</label>
                <input
                    id = {task.taskId}
                    name = "TaskName" //"key" that is pulled into FormData
                    type ="text"
                    value= {task.taskName}
                    onChange = {(e) => updateTaskName(task.taskId, e.target.value)}

                />
            <label htmlFor="taskTimeFrame">Time Frame:</label>
                <input
                    id = {task.taskId}
                    name = "taskTimeFrame"
                    type = "text"
                    value = {task.taskTimeFrame}
                    onChange={(e) => updateTaskTime(task.taskId, e.target.value)}
                /> 
                 <h2 onClick={() => addChunk(task.taskId)}> + Chunk</h2>        
        </div>
        <div>
            {task.chunks.map((chunk) => (
                <NewAddChunk
                    key = {chunk.chunkId}
                    taskId= {task.taskId}
                    chunk = {chunk}
                    updateChunkName = {updateChunkName}
                    updateChunkTime = {updateChunkTime}
                />
            ))}
            <br/>
        </div>
      </>
    )
}

export default NewAddTask