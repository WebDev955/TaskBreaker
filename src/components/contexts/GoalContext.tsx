import { createContext, useEffect, useState, useContext, use } from "react";

import type { Goal, Task, genNotes, tasksComplete } from "../AddNewGoal/types";

type GoalsContextType = {
    goals: Goal [];
    tasks: Task [];
    isTaskComplete: boolean;
    genNotes: genNotes [];

    addGoal: (goal: Goal) => void;
    deleteGoal: (goalId: string) => void;
    addNewTask: (goalId: string, task: Task) => void;
    checkTask: (goalId: string, taskId: string) => void;
    
    addGenNote: (noteDraft: string, noteTitle: string) => void;
    deleteGenNote: (noteId: string) => void
    getGoalNote: (goalId: string) => string;
    updateGoalNote: (goalId: string, note: string) => void;
    
    archiveGoal: (goalId: string, status:string) => void;
    unArchive: (goalId: string, status:string) => void;

}   

const GoalsContext = createContext<GoalsContextType | null>(null)

/****CONTEXT PROVIDER*******/
//Only in Provider is where you create/use functions and estbalish/change state

export const GoalsProvider:React.FC<{children: React.ReactNode}> = ({children}) => {
    const [goals, setGoals] = useState<Goal[]>(() => {
      const saved = localStorage.getItem("Goals");
      return saved ? JSON.parse(saved) : [];
  });
    const [genNotes, setGenNotes] = useState<genNotes[]>(() => {
      const saved = localStorage.getItem("GenNotes");
      return saved ? JSON.parse(saved) : [];
  })

  // 1) Load once
  useEffect(() => {
    const savedGoals = localStorage.getItem("Goals");
      if (savedGoals) {
        setGoals(JSON.parse(savedGoals))
      } 
    
    const savedNotes = localStorage.getItem("GenNotes");
      if (savedNotes) {
        setGenNotes(JSON.parse(savedNotes));
      } 
  }, []);

  // 2) Save only AFTER hydration
  useEffect(() => {
    localStorage.setItem("Goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("GenNotes", JSON.stringify(genNotes));
  }, [genNotes]);


    //Adding a New Goal
    const addGoal = (newGoal: Goal) => {
        setGoals((prev) => [...prev, newGoal]);
    };

    //Archive Goal
    const archiveGoal = (goalId:string, status:string) => {
        setGoals(prev => 
            prev.map(goal => 
                goal.goalId === goalId
                    ?  {...goal, goalStatus: status} 
                    : goal
            )
        )
    }

    //Un-Archive
    const unArchive = (goalId: string, status:string) => {
        setGoals(prev => 
            prev.map(goal =>
                goal.goalId === goalId
                    ? {...goal, goalStatus: status}
                    : goal
            )
        )
    }

    const checkTask = (goalId:string, taskId:string) => {
      setGoals(prevGoals =>
        prevGoals.map(goal => {
          if (goal.goalId !== goalId) 
            return goal;
         
          return {
            ...goal,
            tasks: goal.tasks.map(task => 
              task.taskId === taskId
                ? {...task, isTaskComplete: !task.isTaskComplete}
                : task
            )
          }
        })
      )
      alert ("Task Checked!")
    }

    //Read helpers
    const getGoalNote = (goalId: string) => {
        return goals.find(goal => goal.goalId === goalId)?.goalNote ?? "";
    };

            
    const deleteGoal = (goalId: string) => {
        const updatedGoals = goals.filter((goal) => goal.goalId !== goalId)
        setGoals(updatedGoals)
        alert("goal deleted")
    }

  //Update helpers
    const updateGoalNote = (goalId: string, note: string) => {
        setGoals(prev =>
            prev.map(goal => goal.goalId === goalId ? { ...goal, goalNote: note } : goal
            )
        );
    };

    //update GenNote
    const addGenNote = (title: string, noteDraft: string) => {
      setGenNotes(prev => [
        ...prev,
        {
          noteId: crypto.randomUUID(),
          noteName: title,
          noteText: noteDraft
        }
      ])
  }

  const deleteGenNote = (noteId:string) => {
    const updatedGenNotes = genNotes.filter((note) => note.noteId !== noteId)
    setGenNotes(updatedGenNotes)
    alert("Note Deleted")
  }
  //Update Goal (with new Task)
  const addNewTask = (goalId: string, newTask: Task) => {
    setGoals(prevGoals => 
        prevGoals.map(goal => goal.goalId === goalId 
          ? { 
              ...goal, 
              tasks: [...goal.tasks, newTask]  //create a NEW TASKS ARRAY, spread old tasks
            }
          : goal
        )
      )
    }


    return (
        <GoalsContext.Provider value ={{goals, deleteGoal, genNotes, addGoal, addNewTask, getGoalNote, updateGoalNote, addGenNote, deleteGenNote, archiveGoal, unArchive, checkTask}}>
            {children}
        </GoalsContext.Provider>
    )
}

export const useGoals = () =>{
    const ctx = useContext(GoalsContext);
    if (!ctx) throw new Error("useGoals must br used inside GoalsProvider")
    return ctx;
};


