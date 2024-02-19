import {useForm} from "react-hook-form"
import { useTask } from "../context/TaskContext"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

function TaskFormPage() {
  const { register, handleSubmit, setValue} = useForm()
  const { createTask, getTask, updateTask} = useTask()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(()=> {
    async function loadUpdatableTask(){
    if(params.id){
        const task = await getTask(params.id)
        setValue("title", task.title)
        setValue("description", task.description)
        const parsedDate = new Date(task.date).toISOString().split('T')[0]
        setValue("date", parsedDate)
      }
    }
    loadUpdatableTask()
  },[])


  function onSubmit(values){
    if(params.id){
      updateTask(params.id, values)
    }else{
      createTask(values)
    }
    navigate("/task")
  }


  return (
    <div className=" m-auto h-[calc(100vh-100px)] flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-11/12 md:w-2/4 bg-slate-800 p-1 md:p-10 rounded-md justify-center gap-4 items-center">
        <h1 className="font-bold text-2xl my-4">New Task</h1>
        <label htmlFor="title"></label>
        <input autoFocus type="text" placeholder="Title" {...register("title", {required: true}) } 
           className="w-4/5  h-8 rounded-md px-4 bg-slate-600"
        />
        <label htmlFor="description"></label>
        <textarea placeholder="Description" {...register("description", {required: true})}
         className="w-4/5 pt-2 min-h-24 h-8 rounded-md px-4 bg-slate-600">
        </textarea>
        <label htmlFor="date"></label>
        <input type="date" {...register("date", {value: new Date().toISOString().split('T')[0]})}
          className="w-4/5  h-8 rounded-md px-4 bg-slate-600"
        />

        <button  className=" bg-gray-300 max-w-fit px-2 py-1  rounded-md text-slate-700 hover:bg-blue-500 hover:text-white transition">
          Save
        </button>
      </form>
    
    </div>
  )
}

export default TaskFormPage