import { useState } from "react"
import styles from "./ChunksDisplay.module.css"
import type { Chunk } from "../AddNewGoal/types"
import AddSingleChunk from "./AddSingleChunk"

import CheckBoxChecked from "../../../public/CheckBoxChecked.png"
import CheckBoxEmpty from "../../../public/CheckBoxEmpty.png"

type ChunksDisplayProps = {
  chunks: Chunk[]
  taskId: string
  goalId: string
  taskName: string
}

const ChunksDisplay: React.FC<ChunksDisplayProps> = ({
  chunks,
  taskId,
  goalId,
}) => {
  const [openNewChunk, setOpenNewChunk] = useState(false)

  const [isChecked, setIsChecked] = useState<Set<string>>(() => new Set())

  if (!chunks || chunks.length === 0) {
    return <p>No chunks available</p>
  }

  const checkBoxHandler = (chunkId: string) => {
    setIsChecked((prev) => {
      const next = new Set(prev)

      if (next.has(chunkId)) {
        next.delete(chunkId)
      } else {
        next.add(chunkId)
      }
      return next
    })
  }

  return (
    <div className={styles.mainChunkDisplayWrapper}>
      <ul className={styles.chunksList}>
        <button
          className={styles.addChunkButton}
          onClick={(e) => {
            e.stopPropagation()
            setOpenNewChunk(true)
          }}
        >
          + Chunk
        </button>
        {openNewChunk && <AddSingleChunk taskId={taskId} goalId={goalId} />}
        {chunks.map((chunk) => (
          <li key={chunk.chunkId}>
            <img
              width="20px"
              src={
                isChecked.has(chunk.chunkId) ? CheckBoxChecked : CheckBoxEmpty
              }
              onClick={(e) => {
                e.stopPropagation()
                checkBoxHandler(chunk.chunkId)
              }}
            />
            <span className={styles.chunkText}>
              {chunk.chunkName} - {chunk.chunkTimeFrame}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ChunksDisplay
