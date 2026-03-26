//IMPORT - COMPONENTS/TYPES
import AddChunk from "./AddChunk"
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

const AddTask: React.FC<taskProps> = ({
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
            <p>Privde a single task to meet your goal and how long it might take to finish. </p>
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
                    
        </div>
        <div>
            {task.chunks.map((chunk) => (
                <AddChunk
                    key = {chunk.chunkId}
                    taskId= {task.taskId}
                    chunk = {chunk}
                    updateChunkName = {updateChunkName}
                    updateChunkTime = {updateChunkTime}
                />
            ))}
            <h2 onClick={() => addChunk(task.taskId)}> + Chunk</h2> 
                <p>Sometimes a task consists of subtasks. Break them down into chunks to better see and organize completing your overal goal.</p>
            <hr/>    
            <br/>
        </div>
      </>
    )
}

export default AddTask