import { useGoals } from "../contexts/GoalContext"
import { Button, Modal } from "antd"
import { useState } from "react"
import Unarchive from "../../../public/Archive.svg"
import Delete from "../../../public/Delete.svg"
import TaskProgressBar from "../../UI/TaskProgressBar"

import styles from "../ArchivedGoals/ArchivedGoals.module.css"


const ArchivedGoals:React.FC = () =>{
    const {goals, deleteGoal, unArchive} = useGoals()
    const [open, setOpen] = useState(false)
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = (goalId:string) => {
        deleteGoal(goalId)
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return(
        <div className = {styles.mainDiv}>
            <div className = {styles.archiveHeader}>
                <h1>Archived Goals</h1>
                <p> When you don't have the time to commit to a goal, don't delete it, archive it. Come
                    back to it when you have the time to dedicate to it. Dont't give up on it.
                </p>
            </div>
            <div>
            {goals.map((goal) => (
                goal.goalStatus === "Archive" 
                    ? <div key = {goal.goalId} className = {styles.goalCard}>
                        <div>
                            <strong>{goal.goalName}</strong> 
                            <p>Tasks Completed: {goal.tasks.filter(task => task.isTaskComplete).length}/{goal.tasks.length}</p>
                        </div>
                        <div className = {styles.goalOptions}>
                            <img width = "28px" src={Unarchive}onClick={() => unArchive(goal.goalId, "Active")}/>
                            <img width = "28px"src={Delete} onClick = {() => showModal()}/>
                        </div>
                            <Modal  
                                open={open}
                                onCancel={handleCancel}
                                footer={[
                                    <Button
                                        key="back"
                                        onClick={handleCancel}
                                        style= {{backgroundColor: "var(--mint-leaf)", color: "black", border: "1.5px solid black", fontSize: "13px"}}
                                    >
                                        Keep Goal!
                                    </Button>,
                                    <Button
                                        key="submit"
                                        type="primary"
                                        onClick={()=> handleOk(goal.goalId)}
                                        style= {{backgroundColor: "var(--crimson-violet)", color: "var(--alabaster-grey)", border: "1.5px solid black", fontSize: "13px"}}
                                        >
                                        Delete Goal
                                    </Button>
                                ]}>
                                <p style= {{fontSize: "13px"}}>Are you sure you want to delete <strong>{goal.goalName || "GOAL"}</strong> for good?</p>
                            </Modal>
                      </div>
                    
                    : null
                )
            )}
            </div>
        </div>
    )
}

export default ArchivedGoals