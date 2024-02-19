import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext.jsx"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function LoginPage() {
  const { register, handleSubmit, formState: {errors}} = useForm()
  const { signIn, user, isAuthenticated, errors: signInErrors} = useAuth()
  const navigate = useNavigate()

  const handleSub =  values => {
    const signed = signIn(values)

  } 

  useEffect(()=> {
    if(isAuthenticated) {
        navigate("/task")
    }
},[isAuthenticated])


  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-slate-800 p-10 rounded-md w-2/4">
        <h1 className="font-bold text-2xl my-4">Login</h1>

          {signInErrors.map((err, i) => (
            <div className="bg-red-500 p-2 w-4/5 mx-auto my-3" key={i}>
              {err}
            </div>
          ))}

        <form
          onSubmit={handleSubmit(handleSub)}
          className="flex flex-col gap-4  "
        >
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-4/5 m-auto h-8 rounded-md px-4 bg-slate-600"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 m-auto">Email is required</p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-4/5 m-auto h-8 rounded-md px-4 bg-slate-600"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 m-auto">Password is required</p>
          )}

          <button
            type="submit"
            className="bg-gray-300 max-w-fit px-2 py-1 m-auto rounded-md text-slate-700 hover:bg-blue-500 hover:text-white transition"
          >
            Login
          </button>
        </form>

        <p className="text-center pt-6 text-blue-300">You dont have an account yet!. Register <Link to="/register" className="text-blue-500 underline decoration-2">here</Link></p>
      </div>
    </div>
  );
}

export default LoginPage