
import styles from "../AddNewGoal/addChunk.module.css"
import { useState } from "react"
import { useGoals } from "../contexts/GoalContext"

type chunkProps = {
     taskId: string,
     goalId: string,
}   

const AddSingleChunk:React.FC<chunkProps> = ({taskId, goalId}) => {
const { addNewChunk } = useGoals()

 const [draftChunk, setDraftChunk] = useState({
    chunkId: crypto.randomUUID(),
    chunkName: "",
    chunkTimeFrame: ""
  })

  const updateChunkName = (value: string) => {
    setDraftChunk(prev => ({ ...prev, chunkName: value }))
  }

  const updateChunkTime = (value: string) => {
    setDraftChunk(prev => ({ ...prev, chunkTimeFrame: value }))
  }

  const saveChunkHandler = () => {
    addNewChunk(goalId, taskId, draftChunk)
  }
    return (
        <div className={styles.chunkWrapperDiv}
        onClick={(e) => e.stopPropagation()}
        >
            <h2>Chunk</h2>
            <label htmlFor="ChunkName">Chunk:</label>
                <input
                    name = "ChunkName"
                    type ="text"
                    value = {draftChunk.chunkName}
                    onChange={(e) => updateChunkName( e.target.value)}
                />
            <br/>
            <label htmlFor="ChunkTimeFrame">Time Frame:</label>
                <input
                    name = "ChunkTimeFrame"
                    type = "text"
                    value = {draftChunk.chunkTimeFrame}
                    onChange={(e) => updateChunkTime(e.target.value)}
                />
                 <p onClick = {saveChunkHandler}>Save New Chunk</p>
        </div>
    )
}
export default AddSingleChunk