//IMPORT - COMPONENTS/TYPES
//import type {Task} from "../AddNewGoal/types"
import AddAdditionalChunk from "../GoalList/AddAdditionalChunk"
import { useGoals } from "../contexts/GoalContext"
import { useState } from "react"

//IMPORT - STYLES
import styles from "../GoalList/AddAdditionalTask.module.css"

/**************************************************/
/* Task Prop Definitions                      ****/
/************************************************/
type AddNewTaskProps = {
  goalId: string
  newTaskHandler: () => { boolean: void }
}

const AddAdditionalTask: React.FC<AddNewTaskProps> = ({
  goalId,
  newTaskHandler,
}) => {
  const { addNewTask } = useGoals()
  //const [openNewChunk, setOpenNewChunk] = useState<boolean>(false)

  //const openNewChunkHandler = () => {
  //setOpenNewChunk(true)
  //}

  const [draftTask, setDraftTask] = useState({
    taskId: crypto.randomUUID(),
    taskName: "",
    taskTimeFrame: "",
    chunks: [
      {
        chunkId: crypto.randomUUID(),
        chunkName: "",
        chunkTimeFrame: "",
      },
    ],
  })

  const updateTaskName = (taskName: string) => {
    setDraftTask((prev) => ({
      ...prev,
      taskName: taskName,
    }))
  }

  const updateTaskTime = (taskTime: string) => {
    setDraftTask((prev) => ({
      ...prev,
      taskTimeFrame: taskTime,
    }))
  }

  const addNewChunk = () => {
    const newChunk = {
      chunkId: crypto.randomUUID(),
      chunkName: "",
      chunkTimeFrame: "",
    }
    setDraftTask((prev) => ({
      ...prev,
      chunks: [...prev.chunks, newChunk],
    }))
  }

  const updateChunkName = (taskId: string, chunkId: string, value: string) => {
    setDraftTask((prev) => ({
      ...prev,
      chunks: prev.chunks.map((chunk) =>
        chunk.chunkId === chunkId ? { ...chunk, chunkName: value } : chunk,
      ),
    }))
  }

  const updateChunkTime = (taskId: string, chunkId: string, value: string) => {
    setDraftTask((prev) => ({
      ...prev,
      chunks: prev.chunks.map((chunk) =>
        chunk.chunkId === chunkId ? { ...chunk, chunkTimeFrame: value } : chunk,
      ),
    }))
  }

  const updateGoalTaskHandlder = (goalId: string, draftTask) => {
    addNewTask(goalId, draftTask)
  }

  return (
    <div className={styles.taskWrapperDiv}>
      <div className={styles.taskHeaderRow}>
        <h3>Add New Task</h3>
        <button
          className={styles.cancelButton}
          onClick={() => newTaskHandler()}
        >
          Cancel
        </button>
      </div>
      <label htmlFor="TaskName">Task:</label>
      <input
        name="TaskName"
        type="text"
        value={draftTask.taskName}
        onChange={(e) => updateTaskName(e.target.value)}
      />
      <label htmlFor="taskTimeFrame">Time Frame:</label>
      <input
        name="taskTimeFrame"
        type="text"
        value={draftTask.taskTimeFrame}
        onChange={(e) => updateTaskTime(e.target.value)}
      />
      <button className={styles.addChunkButton} onClick={addNewChunk}>
        + Chunk
      </button>
      {draftTask.chunks.map((chunk) => (
        <AddAdditionalChunk
          key={chunk.chunkId}
          chunk={chunk}
          goalId={goalId}
          taskId={draftTask.taskId}
          updateChunkName={updateChunkName}
          updateChunkTime={updateChunkTime}
        />
      ))}
      <button
        className={styles.saveButton}
        onClick={() => updateGoalTaskHandlder(goalId, draftTask)}
      >
        Save New Task
      </button>
    </div>
  )
}

export default AddAdditionalTask
