import { useAuth } from "../context/AuthContext"

function ProfilePage() {

  const {user} = useAuth()
  return (
    <div className="flex justify-center items-center h-[60vh] w-full ">
      <h1 className="font-bold text-2xl md:text-6xl text-sky-600 text-center"> <span className="text-white opacity-80">Welcome to the <br></br> Task Manager!</span> 
      <br></br> 
        <span className="uppercase tracking-wide">{user.username}</span></h1>
    </div>
  )
}

export default ProfilePage