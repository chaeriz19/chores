import { Pencil } from "lucide-react";

export default function TaskCard({ task }) {
  return (
    <div
      key={task.id}
      className={`p-2 shadow-xl hover:border-solid hover:border-4 hover:border-[#00000077] ${
        task.completed ? "bg-[#5cac61b2]" : "bg-[#ac5c5cba]"
      } shadow-sm text-white mt-2 `}
    >
      <h1 className="font-bold">{task.title}</h1>
      <div className="flex gap-2">
        <p>{task.description}</p>
      </div>
      <div className="flex gap-2 justify-center text-sm text-gray-700">
        <p className=" text-white">{task.due_date}</p>
      </div>
    </div>
  );
}
