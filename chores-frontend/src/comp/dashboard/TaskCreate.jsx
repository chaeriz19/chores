import { useState } from "react"

export default function TaskCreate() {



     const [user, setUser ] = useState();


     return (
          <div>
               <form className="flex flex-col w-1/4">
                    <label>Titel </label><input></input>
                    <label>Desc </label><input></input>
                    <label>Due date </label><input></input>
                    <label>Username</label><input></input>
                    <button className="m-4 bg-blue-500">Maak task</button>
               </form>
          </div>
     )
}