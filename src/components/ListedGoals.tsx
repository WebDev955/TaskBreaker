import { useEffect, useState } from "react";
import styles from "./ListedGoals.module.css"

import GoalsDisplay from "../UI/GoalsDisplay";

const ListedGoals:React.FC = () => {
    
    const [goals, setGoals] = useState<any[]>([])
    
    useEffect (()=> {
        const savedGoals = localStorage.getItem("Goals")
        if (savedGoals){
            const parsed = JSON.parse(savedGoals);
            setGoals(Array.isArray(parsed) ? parsed : [parsed])
        }
    },[])

    console.log(goals)
    
    return (
    <div className={styles.listedGoalsMainWrapper}>
      <GoalsDisplay/>
    </div>
  );
};
  export default ListedGoals
  
  
