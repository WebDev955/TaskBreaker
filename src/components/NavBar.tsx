import styles from "../components/NavBar.module.css"

import ArchiveIcon from "../../public/Archive.svg"
import GoalsIcon from "../../public/GoalsIcon.svg"
import NotesIcon from "../../public/NotesIcon.svg"
import TimerIcon from "../../public/TimerIcon.svg"


/**************************************************/ 
/* NavBar Prop Definitions                       ****/
/************************************************/

type navBarProps = {
    displayContent: (value: string) => void,
}

const NavBar:React.FC<navBarProps> = ({displayContent}) => {

    return(
        <nav className={styles.navbar}>
            <ul>
                <li onClick = {() => displayContent("displayGoals")}>
                    <img src = {GoalsIcon} width="18"/> 
              
                </li>
                <li onClick = {() => displayContent("displayNotes")}>
                    <img src = {NotesIcon} width="18"/> 
                 
                    </li>
                <li onClick = {() => displayContent("displayPomo")}>
                    <img src = {TimerIcon} width="18"/> 
                 
                    </li>
                <li onClick = {() => displayContent("displayArchive")}>
                    <img src = {ArchiveIcon} width="18"/> 
               
                </li>
            </ul>
        </nav>
    )
}
export default NavBar