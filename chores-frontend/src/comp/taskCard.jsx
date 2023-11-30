import { Pencil } from "lucide-react";

export default function TaskCard({task}) {
     return (
          <div key={task.id} className={`p-4 shadow-xl hover:border-solid hover:border-4 hover:border-[#00000077] ${task.completed ? "bg-[#5cac61b2]" : "bg-[#ac5c5cba]"} shadow-sm text-white mt-2 `}>
                    <h1 className="font-bold">{task.title}</h1>
                    <div className="flex gap-2">
                         <p>{task.due_date}</p> <p>{task.description}</p>
                    </div>
          </div>
     )
}