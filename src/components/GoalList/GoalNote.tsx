import { useEffect, useState } from "react"
import { useGoals } from "../contexts/GoalContext";


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
        <div>
            <>
                <textarea
                    value = {draft}
                    onChange={(e) => setDraft(e.target.value)}
                    />
                <p onClick={saveNote}>Save Notes</p>
            </>
        </div>
    )
}

export default GoalNote