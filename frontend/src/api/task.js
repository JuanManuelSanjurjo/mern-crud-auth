 
const API = "http://localhost:3000/api"

 export async function getTasksRequest(){
    try{
        const response = await fetch(`${API}/task`,{
            method: "GET",
            credentials: 'include' 
        })
        const data = await response.json()
       if(!response.ok) {
           throw new Error(data.message || data)
        }
        
       return data
    }catch(e){
        console.log(e.message)
        throw e
    }
 }

 export async function getTaskRequest(id){
    try{
        const response = await fetch(`${API}/task/${id}`,{
            method: "GET",
            credentials: 'include',
           })
        const data = await response.json()
        if(!response.ok) {
           throw new Error(data.message || data)
        }
        
       return data
    }catch(e){
        throw new Error("Error getting task")
    }
 }


 export async function createTaskRequest(task){
   try{
       const response = await fetch(`${API}/task`,{
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
           })
        const data = await response.json()
        if(!response.ok) {
            throw new Error(data.message || data)
        }
        
       return data
   }catch(e){
        throw new Error(e.message)
    }
 }


 export async function updateTaskRequest(id, task){
    try{
        const response = await fetch(`${API}/task/${id}`,{
            method: "PUT",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
           })
           const data = await response.json()
        if(!response.ok) {
            throw new Error(data.message || data)
        }
            
           return data   
    }catch(e){
        console.log(e)
    }
 }

 export async function deleteTaskRequest(id){
    try{
        const response = await fetch(`${API}/task/${id}`,{
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
           })
        if(!response.ok) {
           const data = await response.json()
           throw new Error(data.message || data)
        }
        
       return response
    }catch(e){
        console.log(e)
    }
 }

