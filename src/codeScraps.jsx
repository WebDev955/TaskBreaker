//Data Structure of Goal
const Goal = {
            goalName: goalName,
            goalTime: goalTimeFrame,
            tasks: [
                {   
                    taskName: task,
                    taskTime: taskTimeFrame,
                    chunks: [
                        {chunkName: chunk, chunkTime: chunkTimeFrame}
                        
                    ]
                }
            ]
        }        
    } 




//GoalNotes - 1/10/26

import { useEffect, useState } from "react"
import { useGoals } from "../../GoalContext";


type GoalNoteProps ={
    goalId: string;
}

const GoalNote:React.FC<GoalNoteProps> = ({goalId}) => {
    const {getGoalNote, updateGoalNote} = useGoals();
    
    const [openNotes, setOpenNotes] = useState<string | null>(null);  
    const [noteDraft, setNoteDraft] = useState<string>("");
    const [currentNote, setCurrentNote] = useState<string>("")


    useEffect(() => {
        const stored = localStorage.getItem("Goals")
            if (!stored) return;

        const savedGoals = JSON.parse(stored)

        const foundGoal = savedGoals.find(
            (goal:{goalId: string}) => goal.goalId === goalId
        )
        setCurrentNote (foundGoal?.goalNote ?? "")  
    }, [goalId])

    console.log("currentNote:", currentNote)
    

    const displayGoalNotes = (goalId:string) => {
      setOpenNotes(goalId)
      setNoteDraft(currentNote);
    }

    const saveGoalNotes = (noteDraft:string):void => {
        const stored = localStorage.getItem("Goals")

        if (stored){
         localStorage.setItem('goalNotes', noteDraft )
        }

        setOpenNotes(null)
    }

    const updateNotes = (value:string) => {
        setNoteDraft(value)
    }

    
    return(
        <div>
            { openNotes === goalId 
                ? <p onClick={() => saveGoalNotes(noteDraft)}>Save Notes</p>
                : <p onClick={() => displayGoalNotes(goalId)}>Make Note</p>
            }
            {openNotes === goalId && 
                <div> 
                    <h3>Goal Note</h3>
                    <textarea
                        value = {noteDraft ?? currentNote}
                        onChange={(e) => updateNotes(e.target.value)}
                    />
                </div>
            }
        </div>
    )
}

export default GoalNote

//List goals 1/10/26 9.25pm

import { useEffect, useState } from "react";
import styles from "./ListedGoals.module.css"

import GoalsDisplay from "./GoalsDisplay"
import GoalForm from "../AddNewGoal/GoalForm"

const ListedGoals:React.FC = () => {
    
    const [showAddGoalForm, setAddGoalForm] = useState(false)
    
    
    const displayAddGoal = ():void => {
      setAddGoalForm(true)
    }

    useEffect (()=> {
        const savedGoals = localStorage.getItem("Goals")
        if (savedGoals){
            const parsed = JSON.parse(savedGoals);
            setGoals(Array.isArray(parsed) ? parsed : [parsed])
        }
    },[])

  
    
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
  
  
//Goals Display 1/10/26 

import { useEffect, useState} from "react";
import TasksDisplay from "./TasksDisplay";
import GoalNote from "./GoalNote";
import styles from "./GoalsDisplay.module.css"
import type { Goal } from "../components/AddNewGoal/types";

import { useGoals } from "../../GoalContext";


const GoalsDisplay:React.FC = () => {

    const {goals} = useGoa
    
    const [goals, setGoals] = useState<Goal[]>([])
    const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null)

    
    useEffect (()=> {
        const savedGoals = localStorage.getItem("Goals")
        if (savedGoals){
            const parsed = JSON.parse(savedGoals);
            setGoals(Array.isArray(parsed) ? parsed : [parsed])
        }
    },[])

  
    
    const displayTasks = (goalId: string) => {
      setSelectedGoalId(prev =>
          prev === goalId 
            ? null 
            : goalId
      );
    }

    //const archiveGoal = (goalId: string) => {
      //const goalId = localStorage.getItem("Goals")
      //1. Check for goal id of locally stored Goal
      //2. if it exists, move Goal (and tasks, chunks) to new area

    //}

    return (
      <div>
        {goals.map((goal) => (
          <div key={goal.goalId} className={styles.goalWrapper}>
            <h2 onClick={() => displayTasks(goal.goalId)}>
              Goal: {goal.goalName} - {goal.goalTimeFrame}
            </h2>
            <div>
              <GoalNote goalId = {goal.id} />
            </div>
              <p>Archive Goal</p>
              {selectedGoalId === goal.goalId && (
                <TasksDisplay
                  tasks = {goal.tasks}
                />
              )}
          </div>
        ))}
      </div>
    )
};
  export default GoalsDisplay
  
  
//Goal Form -1/10/26

import { useGoals } from "../../GoalContext";
import GoalNote from "../GoalList/GoalNote";
import NewAddGoal from "./AddGoal";
import NewAddTask from "./AddTask";

import type { Task} from "./types";
import { useState } from "react"

//TypeScript Definitions
//type updateTaskName = (event: string) => void

const GoalForm: React.FC = () => {

    /**************************************************/ 
    /*Default Goal and Task States                ****/
    /************************************************/
    const [goal, setGoal] = useState({
        goalId: crypto.randomUUID(),
        goalName: "",
        goalNote: "",
        goalTimeFrame: "",
        tasks: []
    })

    const [tasks, setTasks] = useState<Task[]>([{
        taskId: crypto.randomUUID(),
        taskName:"",
        taskTimeFrame:"",
        chunks: [{
            chunkId:crypto.randomUUID(),
            chunkName:"",
            chunkTimeFrame:""
        }]
    }])
console.log(tasks)
    /**************************************************/ 
    /*UPDATING FUNCTIONS (add new Task and Chunk)****/
    /************************************************/

    //Create a new Task, add to Task array upon button press
    const addNewTask = ():void => {
        setTasks((prev) => [
            ...prev,
            {   
                taskId: crypto.randomUUID(),
                taskName:"",
                taskTimeFrame:"",    
                    chunks: [{
                        chunkId:crypto.randomUUID(),
                        chunkName:"",
                        chunkTimeFrame:""
                    }]
            }
        
        ])
    }

    //Create a new Chunk, add to Task > Chunk [] upon button press inside newAddTask
    const addChunkToTask = (taskId: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.taskId === taskId
                ? {
                    ...task,
                    chunks: [
                        ...task.chunks,
                        {
                        chunkId: crypto.randomUUID(),
                        chunkName: "",
                        chunkTimeFrame: "",
                        },
                    ],
                    }
                : task
            )
        );
  };
    /******************************************************/ 
    /*UPDATING FUNCTIONS (update Properties via inputs)****/
    /******************************************************/
    
    //update Goal properties
    const updateGoalName = (value:string):void => {
        setGoal((prev) => ({
            ...prev,
            goalName: value,
        }));
        
}
    const updateGoalTime = (value:string):void => {
        setGoal((prev) => ({
            ...prev,
            goalTimeFrame: value,
        }));
        
}


    //Update Task properties
    const updateTaskName = (taskId: string, value: string):void => {
        setTasks((prev)=>
            prev.map((task) =>
                task.taskId === taskId
                ? {...task, taskName: value}
                : task
            )
        );
    };

    const updateTaskTime = (taskId: string, value: string):void => {
        setTasks((prev)=>
            prev.map((task) =>
                task.taskId === taskId
                ? {...task, taskTimeFrame: value}
                : task
            )
        );
    };
    //update Chunk Properties
    const updateChunkName = (taskId: string, chunkId: string, value: string):void => {
        setTasks ((prev) =>
            prev.map((task) =>
                task.taskId === taskId
                    ? {
                        ...task, 
                        chunks: task.chunks.map((chunk) =>
                            chunk.chunkId === chunkId
                            ? {...chunk, chunkName: value}
                            : chunk
                        ),
                    }

                     : task
            )
        )
    };

    const updateChunkTime = (taskId: string, chunkId: string, value: string):void => {
        setTasks ((prev) => 
            prev.map((task) =>
                    task.taskId === taskId
                    ? {
                        ...task,
                        chunks: task.chunks.map((chunk) =>
                            chunk.chunkId === chunkId
                                ? {...chunk, chunkTimeFrame: value}
                                : chunk
                        ),
                    }
                    : task
                )
            )
        };

    /**************************************************/ 
    /* SUBMIT FUNCTION                            ****/
    /************************************************/

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const {addGoal} = useGoals()

        const formData = new FormData (event.target)
        const goalName = formData.get("goalName")
        const goalTimeFrame = formData.get("goalTimeFrame")
        const goalId = goal.goalId
        const goalNote = goal.goalNote

        const taskList = tasks

        const newGoal = {
            goalId,
            goalName,    
            goalNote,
            goalTimeFrame,
            tasks: taskList
        }
        
        const currentGoalList = localStorage.getItem("Goals")
        const existingGoals = currentGoalList
            ? JSON.parse(currentGoalList)
            : []

        const updatedGoals = [...existingGoals, newGoal]

        localStorage.setItem("Goals", JSON.stringify(updatedGoals));
        alert("Goal Added!")

        console.log("Saved goal:", newGoal);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/*Display simple add goalComponent*/}
                <NewAddGoal
                    goal = {goal}
                    updateGoalName = {updateGoalName}
                    updateGoalTime = {updateGoalTime}
                />
                
                {/*display and update list of addTask Components, push needed Props*/}
                <div>
                    {tasks.map((task)=> (
                        <NewAddTask
                            key = {task.taskId}
                            task = {task}                        
                            updateTaskName = {updateTaskName}
                            updateTaskTime = {updateTaskTime}
                            addChunk = {addChunkToTask}
                            updateChunkName = {updateChunkName}
                            updateChunkTime = {updateChunkTime}
                        />
                    ))}
                </div>
                <h2 onClick={() => addNewTask()}> + Task</h2>  
                <div>
                    <hr/>
                    <button type="submit">Save Goal!</button>
                </div>
            </form>
        </div>
    )
}

export default GoalForm

//Old UseEffec in Context
    const [goals, setGoals] = useState<Goal[]>([])
    const [genNotes, setGenNotes] = useState<genNotes[]>([])
    const [hydrated, setHydrated] = useState(false);

  // 1) Load once
  useEffect(() => {
    const raw = localStorage.getItem("Goals");
  
    if (!raw || raw === "undefined") {
      setGoals([]);
      setHydrated(true);
      return;
    }

    try {
      const parsed = JSON.parse(raw);
        setGoals(Array.isArray(parsed) ? parsed : []);
    } catch {
      localStorage.removeItem("Goals");
        setGoals([]);
    } finally {
        setHydrated(true);
    }
  }, []);

  // 2) Save only AFTER hydration
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("Goals", JSON.stringify(goals));
  }, [goals, hydrated]);
