import {useForm} from "react-hook-form"
import { useAuth } from "../context/AuthContext.jsx"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


function RegisterPage() {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const { signUp, user, isAuthenticated, errors: registerErrors} = useAuth()
    const navigate = useNavigate()


    useEffect(()=> {
        if(isAuthenticated) {
            navigate("/task")
        }
    },[isAuthenticated])

    const handleSub = handleSubmit( async (values) => {
        signUp(values)
    })



  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="bg-slate-800 p-10 rounded-md w-2/4">
            <h1 className="font-bold text-2xl mx-auto my-4">Register</h1>
                {
                    registerErrors.map((err, i) => (
                        <div className="bg-red-500 p-2 w-4/5 mx-auto my-3" key={i}>{err}</div>
                    ))
                }    
            <form onSubmit={handleSub}
                className="flex flex-col gap-4 ">
                <input type="text" { ...register("username", {required: true})}
                    className="w-4/5 m-auto  h-8 rounded-md px-4 bg-slate-600"
                    placeholder="Username"
                />
                    {errors.username && <p className="text-red-500 m-auto">Username is required</p>}

                <input type="email" { ...register("email", {required: true})}
                    className="w-4/5 m-auto h-8 rounded-md px-4 bg-slate-600"
                    placeholder="Email"
                />
                    {errors.email && <p className="text-red-500 m-auto">Email is required</p>}

                <input type="password" { ...register("password", {required: true})}
                    className="w-4/5 m-auto h-8 rounded-md px-4 bg-slate-600"
                    placeholder="Password"

                />
                    {errors.password && <p className="text-red-500 m-auto">Password is required</p>}

                <button type="submit" className="bg-gray-300 max-w-fit px-2 py-1 m-auto rounded-md text-slate-700 hover:bg-blue-500 hover:text-white transition">Register</button>

            </form>
            <p className="text-center pt-6 text-blue-300">If you already have an account login <Link to="/login" className="text-blue-500 underline decoration-2">here</Link></p>

        </div>
    </div>
  )
}

export default RegisterPage