import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";

function App() {
  // todo: hardcoded token
  let token = "4|ledt1MBrHQwh11YNIF8JuVku8qe2hR0ml19kYMjf71878115";
  // todo: tasks useState is currently holding
  // the number of tasks of a authenticated user
  const [tasks, setTasks] = useState();

  // Give number of tasks of a authenticated user
  useEffect(() => {
    const fetch_count = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/task/count",
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
      <h1>
        Er staan {tasks ? tasks.count : <BeatLoader color="#000000" />} task(s)
        voor je klaar
      </h1>
    </div>
  );
}

export default App;
