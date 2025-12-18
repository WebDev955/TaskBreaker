import styles from "./addChunk.module.css"

type chunkProps = {
    goalId: string,
    taskId: string,
    chunkId: string
}   

const AddChunk:React.FC<chunkProps> = ({goalId, taskId, chunkId}) =>{
    return (
        <div className={styles.chunkWrapperDiv}>
             <h2>Chunk</h2>
            <label htmlFor={`chunkName-${goalId}-${taskId}-${chunkId}`}>Chunk:</label>
                <input
                    id = {`chunkName-${goalId}-${taskId}-${chunkId}`}
                    name = {`chunkName_${goalId}_${taskId}_${chunkId}`}
                    type ="text"
                />
            <br/>
            <label htmlFor={`chunkTimeFrame${goalId}-${taskId}-${chunkId}`}>Time Frame:</label>
                <input
                    id = {`chunkTimeFrame-${goalId}-${taskId}-${chunkId}`}
                    name = {`chunkTimeFrame_${goalId}_${taskId}_${chunkId}`}
                    type = "text"
                />       
        </div>
    )
}
export default AddChunk