import React, { useState, useEffect } from "react";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import userEvent from "@testing-library/user-event";
import { LockKeyhole, LogOut, Home as HomeLucide } from "lucide-react";
import TaskCard from "../comp/taskCard";

import { useNavigate } from "react-router-dom";
import SideBar from "../comp/sideBar";
import Welcomer from "../comp/Welcomer";
function Home() {
  let token = localStorage.getItem("token");
  // todo: tasks useState is currently holding
  // the number of tasks of a authenticated user
  const [tasks, setTasks] = useState();
  const [todays, setToday] = useState([]);
  const [futures, setFuture] = useState([]);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : false;

  const navigate = useNavigate();
  // todo: different pages / routing. simple login screen and accessing tasks
  // logout

  // Give number of tasks of a authenticated user
  useEffect(() => {
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
        const today = [];
        const future = [];
        const deletes = [];
        response.data.forEach((task) => {
          const taskDate = parseApiDate(task.due_date);
          const todayDate = new Date();
          todayDate.setHours(0, 0, 0, 0);
          taskDate.setHours(0, 0, 0, 0);

          const taskDateComponents = taskDate.toLocaleDateString();
          const todayDateComponents = todayDate.toLocaleDateString();

          if (taskDateComponents === todayDateComponents) {
            today.push(task);
          } else if (taskDate < todayDate) {
            deletes.push(task);
            console.log("DELETEIONSSS" + JSON.stringify(deletes));
          } else if (taskDate > todayDate) {
            future.push(task);
          }

          function is_same() {
            if (taskDateComponents === todayDateComponents) {
              return true;
            } else {
              return false;
            }
          }

          setToday(today);
          setFuture(future);
          console.log("date today = " + todayDateComponents);
          console.log("date task = " + taskDateComponents);
          console.log("is same?" + is_same());
        });
      } catch (error) {
        return error;
      }
    };

    const parseApiDate = (apiDate) => {
      const [year, month, day] = apiDate.split("-");
      return new Date(year, month - 1, day);
    };

    const fetch_count = async () => {
      try {
        const response = await axios.post(
          "https://chrisouboter.com/api/task/count",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data);
      } catch (error) {}
    };
    fetch_count();
    fetch_tasks();
  }, [token]);

  return (
    <div className="flex md:flex-row flex-col min-h-screen">
      <SideBar token={token} user={user}></SideBar>
      <main className="p-20 bg-gradient-to-r from-indigo-400 to-indigo-200 flex-1 p-4">
        {tasks && user ? (
          <div className="flex mt-24 flex-col align-left items-center  h-full m-4 rounded-xl">
            <Welcomer user={user.name} tasks={tasks.count} />

            <div className="flex md:flex-row flex-col w-full items-center mt-20 justify-center">
              {todays.length > 0 ? (
                <div className="bg-slate-200 h-96 lg:w-1/4 w-full p-4 m-4 rounded-xl">
                  <h2 className="text-xl text-center pb-4">Vandaag</h2>
                  {todays.slice(0, 3).map((task) => (
                    <TaskCard key={task.id} task={task}></TaskCard>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
              {futures.length > 0 ? (
                <div className="bg-slate-200 h-96 lg:w-1/4 w-full p-4 m-4 rounded-xl">
                  <h2 className="text-xl text-center pb-4">Toekomst</h2>
                  {futures.slice(0, 3).map((task) => (
                    <TaskCard key={task.id} task={task}></TaskCard>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <SyncLoader color="#ffffff" />
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
