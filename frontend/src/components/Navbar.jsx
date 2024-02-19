import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
function Navbar() {
    const {isAuthenticated, logOut, user} = useAuth()


  return (
    <nav className='bg-slate-700 w-full py-4 px-10 mt-1 flex justify-between items-center font-medium tracking-wider rounded-md '>
        <Link to={ isAuthenticated ? "/task" : "/"}  className="hover:text-sky-500">Task Manager</Link>
        <ul className="flex gap-4 items-center">
        { user && <h2 className=" italic text-sm">welcome, {user.username}!</h2>}
        { !isAuthenticated &&
            <>
                <li className="hover:text-sky-500 hover:bg-slate-600 bg-slate-800 p-2 rounded transition">
                    <Link to={"/login"}>Login</Link>
                </li>
                <li className="hover:text-sky-500 hover:bg-slate-600 bg-slate-800 p-2 rounded transition">
                    <Link to={"/register"}>Register</Link>
                </li>
            </>
        }   
        { isAuthenticated && 
            <>
                <li className="hover:text-sky-500 hover:bg-slate-600 bg-slate-800 p-2 rounded transition">
                    <Link to={"/add-task"}>Add Task</Link>
                </li>
                <li className="hover:text-sky-500 hover:bg-slate-600 bg-slate-800 p-2 rounded transition">
                    <Link to={"/task"}>Tasks</Link>
                </li>
                <li className="hover:text-sky-500 hover:bg-slate-600 bg-slate-800 p-2 rounded transition">
                    <Link to={"/login"} onClick={()=> logOut()}>Logout</Link>
                </li>
            </>
        }

        </ul>
    </nav>
  )
}

export default Navbar