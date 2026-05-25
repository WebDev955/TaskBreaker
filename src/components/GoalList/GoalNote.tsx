import { useEffect, useState } from "react"
import { useGoals } from "../contexts/GoalContext";
import styles from "../GoalList/GoalNote.module.css"


type GoalNoteProps ={
    goalId: string;
    openGoalNotes: string
    closeEditNote: (openGoalNotes: string) => void
}

const GoalNote:React.FC<GoalNoteProps> = ({goalId, closeEditNote}) => {
    const {getGoalNote, updateGoalNote} = useGoals();
     
    const [draft, setDraft] = useState<string>(getGoalNote(goalId));

    const saveNote = () => {
        updateGoalNote(goalId, draft);
        closeEditNote("")
  };
    return (
        <div className={styles.goalNoteWrapper}>
            <textarea
                value = {draft}
                onChange={(e) => setDraft(e.target.value)}
                />
            <button onClick={saveNote}>Save Notes</button>
        </div>
    )
}

export default GoalNote