import { Pencil } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function TaskCardAdmin({task}) {

     return (
          <div key={task.id} className={`p-4 shadow-xl hover:border-solid hover:border-4 hover:border-[#00000077] ${task.completed ? "bg-[#5cac61b2]" : "bg-[#ac5c5cba]"} shadow-sm text-white mt-2 `}>
                    <h1 className="font-bold">{task.title}</h1>
                    <div className="flex gap-2 items-center">
                         <p>{task.due_date}</p><p>{task.description}</p>
                         <button className="flex flex-col justify-center items-center ml-auto bg-[#00000033] pl-2 pr-2 rounded-xl justify-end h-14 w-14"><Pencil size={20} /></button>
                    </div>
          </div>
     )
}