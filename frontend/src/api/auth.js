/* eslint-disable no-unused-vars */

const API = "http://localhost:3000/api"

export async function registerRequest(user){
    try{
        const response = await fetch(`${API}/register`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
       })
       
       const data = await response.json()
       if(!response.ok) {
            throw new Error(data.message || data)
        }
        
       return data
    }catch(err){
        console.error(err)
        throw err
    }
}

export async function loginRequest(user){
    try{
        const response = await fetch(`${API}/login`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
       })
       
       const data = await response.json()
       if(!response.ok) {
           throw new Error(data.message || data)
        }
        
       return data
    }catch(err){
        console.error(err)
        throw err
    }
}

export async function verifyTokenRequest(token){
    try{
        const response = await fetch(`${API}/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token })
       })

       const data = await response.json()

       if(!response.ok) {
           throw new Error(data.message || data)
        }
        
       return data
    }catch(err){
        console.error(err)
        throw err
    }
}
