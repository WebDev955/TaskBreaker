//IMPORT - COMPONENTS/TYPES
//import type {Task} from "./NewAddGoals/types"

//IMPORT - STYLES
//import styles from "./addTask.module.css"

/**************************************************/ 
/* Task Prop Definitions                       ****/
/************************************************/
//type taskProps = {}

const AddAdditionalTask: React.FC = () => {

    return (
        <>
        <div>
            <br/>
            <h2>Add New Task</h2> 
            <label htmlFor="TaskName">Task:</label>
                <input
                    //id = {task.taskId}
                    name = "TaskName" //"key" that is pulled into FormData
                    type ="text"
                   // value= {task.taskName}
                    //onChange = {(e) => updateTaskName(task.taskId, e.target.value)}

                />
            <label htmlFor="taskTimeFrame">Time Frame:</label>
                <input
                    //id = {task.taskId}
                    name = "taskTimeFrame"
                    type = "text"
                   // value = {task.taskTimeFrame}
                    //onChange={(e) => updateTaskTime(task.taskId, e.target.value)}
                /> 
                 <h2> + Chunk</h2>        
        </div>
        <div>
            {/*Map through newly addedchunks*/}
            <br/>
        </div>
      </>
    )
}

export default AddAdditionalTask