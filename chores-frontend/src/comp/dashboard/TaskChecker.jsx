import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import TaskCard from "../taskCard";
import TaskCardAdmin from "../taskCardAdmin";

export default function TaskChecker() {
     
     let token = localStorage.getItem("token");
     const [tasks, setTasks] = useState();

     useEffect( () => {
          const fetch_tasks = async () => {
               try {
                    const response = await axios.post(
                         "https://chrisouboter.com/api/task/get",
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
          <div className="w-2/4">
               { tasks ? 
                    (<div>{tasks.map((task) => (<TaskCardAdmin key={task.id} task={task}></TaskCardAdmin>))}</div>) 
                    : 
                    (<SyncLoader color="#ffffff" />)
               }
          </div>
     )
}