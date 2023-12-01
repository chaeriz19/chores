import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
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

  async function toggleComplete() {
    try {
      const response = await axios.post(
        "https://chrisouboter.com/api/task/togglecomplete",
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
  }

  return (
    <div
    onClick={() => toggleComplete()}
      key={task.id}
      className={`p-4 shadow-xl hover:border-solid hover:opacity-75 hover:text-black  ${
        task.completed ? "bg-[#5cac61b2]" : "bg-[#cc5353ba]"
      } shadow-sm text-white mt-2 `}
    >
      <h1>
        <b>Titel: </b>
        {task.title} <br></br>
      </h1>
      <p>
        <b>Descriptie: </b>
        {task.description}
      </p>
      <p className="h-2">
        <b>Datum: </b>
        {task.due_date}
      </p>
      <div>
        <button
          onClick={(e) => deleteTask(e)}
          className="flex  animate-pulse flex-col hover:scale-110 hover:bg-[#0000002d] justify-center items-center ml-auto bg-[#00000012] pl-2 pr-2 rounded-xl justify-end h-14 w-14"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
