 import { useEffect } from "react"
import { useTask } from "../context/TaskContext"
import { useAuth } from "../context/AuthContext"
import { Link} from "react-router-dom"

function TasksPage() {
const {getTasks, tasks, deleteTask} = useTask()
const {user} = useAuth()

  useEffect(()=> {
    getTasks()
  },[])

  async function handleDelete(id){
    deleteTask(id)
  }
  

  return (
    <div className="w-full flex-col h-min-[calc(100vh-100px)] flex justify-center items-center">
    <h1 className="font-bold text-2xl md:text-4xl my-6 p-4 break-words"><span className="text-blue-600 uppercase">{user.username}&apos;s</span> Tasks</h1>
    <div className="flex flex-col bg-slate-800 w-full p-2 md:p-10 rounded-md justify-center gap-4 items-center">
    {(tasks && tasks.length) > 0  &&
      tasks?.map((task,i)=> (
        <div key={i} className="flex justify-between bg-slate-900 w-full p-4 gap-2 md:p-10 rounded-md justify-centeritems-center">
          <div>
            <h3 className="font-bold md:text-2xl">{task.title} <span className="text-sm font-thin tracking-wider opacity-90 ml-4 italic">{task.date.split("T")[0].replaceAll("-"," / ")}</span></h3>
            <p className="mt-2 opacity-80">{task.description}</p>
          </div>
          <div className="flex flex-col gap-4">
            <Link to={`${task._id}`} className="bg-sky-800 rounded-md p-2 hover:opacity-80 text-center">Edit</Link>
            <button onClick={() => handleDelete(task._id)} className="bg-rose-800 rounded-md p-2 hover:opacity-80 text-center" >Delete</button>
          </div>
        </div>
      ))
    }</div>
    </div>
  )
}

export default TasksPage