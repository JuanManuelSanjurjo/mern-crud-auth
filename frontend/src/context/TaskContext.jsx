/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'
import {  getTasksRequest, createTaskRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from '../api/task.js'
import { useAuth } from './AuthContext.jsx'

const TaskContext = createContext()

export function useTask(){
    const context = useContext(TaskContext)
    if(!context) throw new Error("useTask must be used within an TaskProvider")
    return context
}

export function TaskProvider({children}) {
    const [tasks, setTasks] = useState([])
 
    async function createTask(task){
        try{
            task.date = new Date(task.date).toISOString()
            console.log(task)
            const res = await createTaskRequest(task)
            return res
        }catch(err){
            console.log(err)
        }
    }

    async function deleteTask(id){
        try{
            const res = await deleteTaskRequest(id)
            if(res.status === 200){
                setTasks(tasks.filter(task => task._id != id))
              }
            return res
        }catch(err){
            console.log(err)
        }
    }

    async function getTasks(){
        try{
            const res = await getTasksRequest()
           
            setTasks(res)
        }catch(e){
            console.log(e.message)
        }
    }

    async function getTask(id){
        try{
           const res = await getTaskRequest(id)
           return res
        }catch(e){
            console.log(e)
        }
    }
    async function updateTask(id, task){
        try{
            console.log(id, task)
            await updateTaskRequest(id, task)

        }catch(e){
            console.log(e)
        }
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            getTask,
            deleteTask,
            updateTask,
        }}>
            {children}  
        </TaskContext.Provider>
  )
}

