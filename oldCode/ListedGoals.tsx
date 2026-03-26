import { useEffect, useState } from "react";
import styles from "./ListedGoals.module.css"

import GoalsDisplay from "../src/components/GoalList/GoalsDisplay"
import GoalForm from "../src/components/AddNewGoal/GoalForm"

const ListedGoals:React.FC = () => {
    
    const [showAddGoalForm, setAddGoalForm] = useState(false)
    
    
    const displayAddGoal = ():void => {
      setAddGoalForm(true)
    }

    return (    
    <>
      <div>
        <hr/>
          <div>
            <h2 onClick ={displayAddGoal}>Add A Goal!</h2> 
              {showAddGoalForm &&
                <GoalForm/> 
              }
          </div>
        <hr/>
      </div>
      <div className={styles.listedGoalsMainWrapper}>
        <GoalsDisplay/>
      </div>
    </> 
  );
};
  export default ListedGoals
  
  
