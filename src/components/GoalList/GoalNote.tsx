import { useEffect, useState } from "react"
import { useGoals } from "../contexts/GoalContext";


type GoalNoteProps ={
    goalId: string;
}

const GoalNote:React.FC<GoalNoteProps> = ({goalId}) => {
    const {getGoalNote, updateGoalNote} = useGoals();
    
    const [openNotes, setOpenNotes] = useState<boolean>(false);  
    const [draft, setDraft] = useState<string>(getGoalNote(goalId));


    const saveNote = () => {
        updateGoalNote(goalId, draft);
        setOpenNotes(false);
  };

    return (
        <div>
            {openNotes ? (
                    <>
                        <textarea
                            value = {draft}
                            onChange={(e) => setDraft(e.target.value)}
                        />
                        <p onClick={saveNote}>Save Notes</p>
                    </>
            ) : (
                <>
                    <p>{getGoalNote(goalId)}</p>
                    <p onClick={() => setOpenNotes(true)}>Edit Note</p>
                </>
            )
        }
        </div>
    )
}

export default GoalNote