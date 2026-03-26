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
    

    const openNoteHandler = () => {
        setOpenNote(true)
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
            <div className = {style.mainDiv}>
                <h1>NoteBook</h1>
                <p>Write general notes.</p>
                <p onClick={openNoteHandler}>Write Note</p>
                    {openNote === true && (
                        <div className = {style.newNoteDiv}>
                            <input 
                                type="text" 
                                defaultValue="title"
                                onChange={(e) => setNoteTitle(e.target.value)}
                            />
                            <textarea  
                                onChange={(e) => setNoteDraft(e.target.value)}
                            />
                            <p onClick={() => saveNote(noteDraft, noteTitle)}>Save Notes</p>
                        </div>
                    )}
            </div>
            <div className = {style.noteListDiv}>
                <h2>Note List</h2>
                    {genNotes.map((note) => (
                        <div key={note.noteId} > 
                            <h2>{note.noteName}</h2>
                            <p className={style.note}>{note.noteText}</p>
                            <p onClick = {() => delNoteHandler (note.noteId)}>Delete Note</p>
                        </div>
                    )
                )} 
            </div>
        </>
    )
}

export default Notes