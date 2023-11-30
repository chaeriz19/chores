import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export default function TaskCreate() {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duedate, setDuedate] = useState(new Date());
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function createTask() {
    console.log(duedate);
    try {
      const response = await axios.post(
        "https://chrisouboter.com/api/task/create",
        {
          title: title,
          user_name: username,
          due_date: duedate.toLocaleDateString("en-GB"),
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await navigate(0);
    } catch (error) {
      console.log("error creating: " + error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    createTask();
  }

  return (
    <div className="shadow-xl bg-slate-200">
      <form className="md:w-1/4 w-full flex flex-col p-4">
        <label>Titel </label>
        <input
          className="p-2"
          placeholder="Titel van het klusje"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>Desc </label>
        <input
          className="p-2"
          placeholder="Hoe moet het klusje gebeuren?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <label>Due date </label>
        <DatePicker
          className="w-full p-2"
          selected={duedate}
          onChange={(date) => setDuedate(date)}
          dateFormat="dd/MM/yyyy"
        />
        <label>Username</label>
        <select value={username} onChange={(e) => setUsername(e.target.value)}>
          {" "}
          <option>Selecteer wie het moet doen</option>
          <option value="chiel">Chiel</option>
          <option value="bram">Bram</option>
          <option value="chris">Chris</option>
        </select>
        <button
          onClick={(e) => handleSubmit(e)}
          className="mt-4 animate-pulse text-white bg-blue-500 p-2 w-full"
        >
          Maak task
        </button>
      </form>
    </div>
  );
}
