import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BeatLoader, PacmanLoader, SyncLoader } from "react-spinners";

function App() {
  // todo: hardcoded token
  let token = "6|aYBFNRVUH0DkcKE2OEjOKhwyY18QdH5mHotgw4pMf1fa2c3b";
  // todo: tasks useState is currently holding
  // the number of tasks of a authenticated user
  const [tasks, setTasks] = useState();

  // todo: different pages / routing. simple login screen and accessing tasks

  // Give number of tasks of a authenticated user
  useEffect(() => {
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
  }, [token]);

  return (
    <div className="App">
      {tasks ? (
        <h1>Er staan {tasks.count} taken voor je klaar</h1>
      ) : (
        <div className="loading-spinner">
          <SyncLoader color="#111111" />
        </div>
      )}
    </div>
  );
}

export default App;
