//import styles from "./addChunk.module.css"
import type {Chunk} from "../AddNewGoal/types"
import styles from "../AddNewGoal/addChunk.module.css"
//import { useGoals } from "../contexts/GoalContext"

type chunkProps = {
     chunk: Chunk,
     taskId: string,
     goalId: string,
     updateChunkName: (taskId: string, chunkId: string, value: string) => void,
     updateChunkTime: (taskId: string, chunkId: string, value: string) => void
}   

const AddAdditionalChunk:React.FC<chunkProps> = ({
    chunk, 
    taskId,
    updateChunkName, 
    updateChunkTime

}) => {


    console.log(chunk)

    return (
        <div className={styles.chunkWrapperDiv} key = {chunk.chunkId}>
            <h2>Chunk</h2>
            <label htmlFor="ChunkName">Chunk:</label>
                <input
                    id = {chunk.chunkId}
                    name = "ChunkName"
                    type ="text"
                    value = {chunk.chunkName}
                    onChange={(e) => updateChunkName(taskId, chunk.chunkId, e.target.value)}
                />
            <br/>
            <label htmlFor="ChunkTimeFrame">Time Frame:</label>
                <input
                    id = {chunk.chunkId}
                    name = "ChunkTimeFrame"
                    type = "text"
                    value = {chunk.chunkTimeFrame}
                    onChange={(e) => updateChunkTime(taskId, chunk.chunkId, e.target.value)}
                /> 
        </div>
    )
}
export default AddAdditionalChunk