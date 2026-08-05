import { useState } from "react"
import TasksDisplay from "./TasksDisplay"
import GoalNote from "./GoalNote"
import styles from "./GoalsDisplay.module.css"
import GoalModal from "../../UI/GoalModal"

import { useGoals } from "../contexts/GoalContext"

const GoalsDisplay: React.FC = () => {
  const { goals, archiveGoal, getGoalNote } = useGoals()

  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null)
  const [openGoalNotes, setOpenGoalNotes] = useState("")
  const [viewNotes, setViewNotes] = useState("")

  console.log(goals)

  const displayTasks = (goalId: string) => {
    setSelectedGoalId((prev) => (prev === goalId ? null : goalId))
  }

  const viewNoteHandler = (goalId: string) => {
    setViewNotes((prev) => (prev === goalId ? "" : goalId))
  }

  const goalStatus = (goalId: string, status: string) => {
    archiveGoal(goalId, status)
    alert("Goal archived!")
  }

  const editNoteHandler = (goalId: string) => {
    setOpenGoalNotes(goalId)
    if (openGoalNotes) {
      setOpenGoalNotes("")
    }
  }
  return (
    <div className={styles.mainWrapper}>
      <header className="appTitle">
        <div>
          <h1>Task Breaker</h1>
          <p>
            Learn something new, break down one large goal into tasks and chunks
            and see the progress.
          </p>
        </div>
      </header>
      <div className={styles.newGoalSection}>
        <h2>Start a New Goal</h2>
        <GoalModal />
      </div>
      <section className={styles.goalListSection}>
        {goals.length > 0 && (
          <div className={styles.sortMenu}>
            <h3>Sort Goals:</h3>
            <p>Name</p>
            <p>Length</p>
          </div>
        )}
        {goals.map((goal) => {
          if (goals.length < 0) {
            ;<p>Add A goal!</p>
          }
          if (goal.goalStatus !== "Active") return null
          const totalTasks = goal.tasks.length
          const completedTasks = goal.tasks.filter(
            (task) => task.isTaskComplete,
          ).length
          const progressPercentage =
            totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100
          {
            /*GOAL DISPLAY*/
          }
          return (
            <div key={goal.goalId} className={styles.goalWrapper}>
              <div className={styles.goalHeader}>
                <h2>
                  {goal.goalName} - {goal.goalTimeFrame}
                </h2>
              </div>
              {/*GOAL COMPLETE STATUS DIV*/}
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <button className={styles.focusGoal}>Focus Goal</button>
              {/*GOAL OPTIONS MENU DIV*/}
              <div className={styles.goalOptionsMenu}>
                <button onClick={() => editNoteHandler(goal.goalId)}>
                  {openGoalNotes ? "Close" : "Edit Note"}
                </button>
                <button onClick={() => viewNoteHandler(goal.goalId)}>
                  {viewNotes ? "Close Note" : "View Note"}
                </button>
                <button onClick={() => displayTasks(goal.goalId)}>
                  {selectedGoalId === goal.goalId
                    ? "Close Tasks"
                    : "View Tasks"}
                </button>
                <button
                  className={styles.archiveButton}
                  onClick={() => goalStatus(goal.goalId, "Archive")}
                >
                  Archive Goal
                </button>
              </div>
              {viewNotes === goal.goalId && (
                <div className={styles.goalNote}>
                  <p>{getGoalNote(goal.goalId)}</p>
                </div>
              )}
              {openGoalNotes === goal.goalId && (
                <GoalNote
                  goalId={goal.goalId}
                  openGoalNotes={openGoalNotes}
                  closeEditNote={editNoteHandler}
                />
              )}
              {selectedGoalId === goal.goalId && (
                <TasksDisplay goalId={goal.goalId} tasks={goal.tasks} />
              )}
            </div>
          )
        })}
      </section>
    </div>
  )
}
export default GoalsDisplay
