import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import TaskCard from "../taskCard";
import TaskCardAdmin from "../taskCardAdmin";

export default function TaskChecker() {
  let token = localStorage.getItem("token");
  const [tasks, setTasks] = useState();

  useEffect(() => {
    const fetch_tasks = async () => {
      try {
        const response = await axios.post(
          "https://chrisouboter.com/api/task/getall",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data);
      } catch (error) {
        return error;
      }
    };
    fetch_tasks();
  }, []);

  return (
    <div className="md:w-full w-full">
      {tasks ? (
        <div className="shadow-xl bg-slate-200 pb-2 mt-2 pl-2 pr-2  rounded-xl">
          <h1 className="text-2xl">Alle taken</h1>
          {tasks.map((task) => (
            <TaskCardAdmin
              key={task.id}
              task={task}
              id={task.id}
            ></TaskCardAdmin>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center pt-12">
          <SyncLoader color="#ffffff" />
        </div>
      )}
    </div>
  );
}
