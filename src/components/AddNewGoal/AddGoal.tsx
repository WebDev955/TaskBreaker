import type { Goal } from "./types"
import style from "./AddGoal.module.css"

type goalProps = {
    goal: Goal
    updateGoalName: (value:string) => void,
    updateGoalTime: (value:string) => void,
}

const NewAddGoal:React.FC<goalProps> = ({
    goal,
    updateGoalTime,
    updateGoalName
}) => {

    return (
        <div key = {goal.goalId} className= {style.addGoalWrapper}>
            <section className={style.goalHeader}>
                <h2>Add Goal</h2>
                <p>Provide a goal name and general time frame you wish to complete it.</p>
            </section>
            <label htmlFor="goalName">Goal:</label>
                <input
                    name="goalName"
                    type="text"
                    value = {goal.goalName}
                    onChange={(e) => updateGoalName(e.target.value)}
                />
            <br/>
            <label htmlFor="goalTimeFrame">Time Frame:</label>
                <input
                    name="goalTimeFrame"
                    type="text"
                    value = {goal.goalTimeFrame ?? ""}
                    onChange={(e) => updateGoalTime(e.target.value)}
                />
        </div>
    )
}

export default NewAddGoal