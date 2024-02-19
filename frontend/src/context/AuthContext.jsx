/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react"
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js"
import { useCookies } from 'react-cookie';



export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [ errors, setErrors] = useState([])
    const [ loading, setLoading] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    // Para leer la cookie
    // console.log('Token:', cookies.token);
    function logOut(){
        removeCookie("token")
        setIsAuthenticated(false)
        setUser(null)
        
    }

    useEffect(()=> {
        if(errors.length> 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000);
            return () => clearTimeout(timer)
        }
    },[errors])

    useEffect(()=> {
       async function checklogin(){
            if(!cookies.token){
                setIsAuthenticated(false)
                setLoading(false)
                setUser(null)
                return 
            }
            try{
                // console.log('Token:', cookies.token || "No cookie");
                const res = await verifyTokenRequest(cookies.token)
                if(!res.username || res.message){
                    setIsAuthenticated(false)
                    setLoading(false)
                    return 
                }
                setIsAuthenticated(true)
                setUser(res)
                setLoading(false)
            }catch(err){
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
       checklogin()
    },[])

    async function signUp(user){
        try{
            const res = await registerRequest(user)
            setUser(res)
            setIsAuthenticated(true)     
        }catch(err){
            console.log(err)
            setErrors(prevErrors => [...prevErrors, err.message]);
        }
    }

    async function signIn(user){
        try{
            const res = await loginRequest(user)

            setUser(res)
            setIsAuthenticated(true)                   
        }catch(err){
            setErrors(prevErrors => [...prevErrors, err.message]);
        }
    }


    return (
    <AuthContext.Provider value={{
            signUp,
            signIn,
            logOut,
            user,
            isAuthenticated,
            errors,
            loading
        }}>
        {children}
    </AuthContext.Provider>
  )
}

