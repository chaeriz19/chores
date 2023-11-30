import axios from "axios";
import { Pencil } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function TaskCardAdmin({ task, id }) {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  async function deleteTask(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://chrisouboter.com/api/task/delete",
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await navigate(0);
    } catch (error) {}

    return true;
  }

  return (
    <div
      key={task.id}
      className={`p-4 shadow-xl hover:border-solid hover:border-4 hover:border-[#00000077] ${
        task.completed ? "bg-[#5cac61b2]" : "bg-[#cc5353ba]"
      } shadow-sm text-white mt-2 `}
    >
      <h1 className="font-bold">
        {task.title} <br></br>
        {task.user_id}
      </h1>
      <div className="flex gap-2 items-center">
        <p className="h-2 ">{task.due_date}</p>
        <p>{task.description}</p>
      </div>
      <button
        onClick={(e) => deleteTask(e)}
        className="flex m-2 flex-col hover:scale-110 justify-center items-center ml-auto bg-[#00000033] pl-2 pr-2 rounded-xl justify-end h-14 w-14"
      >
        Delete
      </button>
      <button className="flex m-2 flex-col  hover:scale-110 justify-center items-center ml-auto bg-[#00000033] pl-2 pr-2 rounded-xl justify-end h-14 w-14">
        <Pencil size={20} />
      </button>
    </div>
  );
}
