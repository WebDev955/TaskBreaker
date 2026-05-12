import { useState, } from "react"
import { useGoals } from "../contexts/GoalContext"
import type { genNotes } from "../AddNewGoal/types"
import style from "../Notes/Notes.module.css"

type noteProp = {
    genNote: genNotes[],
    addGenNote: (noteDraft: string, noteTitle: string) => void;
}

const Notes: React.FC<noteProp> = () => {
    const {addGenNote, deleteGenNote, genNotes} = useGoals()

    const [noteDraft, setNoteDraft] = useState<string>("")
    const [noteTitle, setNoteTitle] = useState<string>("")
    const [openNote, setOpenNote] = useState<boolean>(false)
    const [displayNote, setDisplayNote] = useState<string>("")
    
    const openNoteHandler = () => {
        setOpenNote(!openNote)
    }
    
    const displayNoteHandler = (id: string) => {
        setDisplayNote(id)
        if (displayNote) {setDisplayNote("")}
    }

    const saveNote = (noteDraft: string, noteTitle: string) => {
        addGenNote(noteTitle, noteDraft)
        setOpenNote(false)
    }

    const delNoteHandler = (noteId:string) => {
        deleteGenNote(noteId)
    }

    return(
    <>
        <div className = {style.mainNotesWrapper}>
            <div className = {style.noteBookHeader}>
                <h1>NoteBook</h1>
                <p>Got an idea that popped into your head? <br/> Take note of it.</p>
                <button onClick={openNoteHandler}>
                    {openNote === true ? "Close" : "Write Note"}
                </button>
                {openNote === true && (
                    <div className = {style.newNoteDiv}> 
                        <button onClick={() => saveNote(noteDraft, noteTitle)}>Save Notes</button>
                        <input 
                            type="text" 
                            defaultValue="Note Title"
                            onChange={(e) => setNoteTitle(e.target.value)}
                        />
                        <textarea  
                            onChange={(e) => setNoteDraft(e.target.value)}
                        />
                    </div>
                )}   
            </div>
                
            <div className = {style.noteListWrapper}>
                    {genNotes.map((note) => (
                        <div key={note.noteId} className={style.noteDiv}> 
                            <h2 onClick={() => displayNoteHandler(note.noteId)}>{note.noteName}</h2>
                            {displayNote === note.noteId && (
                                <>
                                    <p className={style.note}>{note.noteText}</p>
                                    <button onClick = {() => delNoteHandler (note.noteId)}>Delete Note</button>
                                </>
                            )}
                        </div>
                    )
                )} 
            </div>
        </div>   
    </>
    )
}
export default Notes