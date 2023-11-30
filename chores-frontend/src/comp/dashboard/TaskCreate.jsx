import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TaskCreate() {
  const [username, setUsername] = useState("chris");
  const [title, setTitle] = useState("test");
  const [description, setDescription] = useState("test");
  const [duedate, setDuedate] = useState(new Date());
  let token = localStorage.getItem("token");

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
    } catch (error) {
      console.log("error creating: " + error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    createTask();
  }

  return (
    <div>
      <form className="md:w-1/4 w-full flex flex-col p-4">
        <label>Titel </label>
        <input></input>
        <label>Desc </label>
        <input></input>
        <label>Due date </label>
        <DatePicker
          className="w-full"
          selected={duedate}
          onChange={(date) => setDuedate(date)}
          dateFormat="dd/MM/yyyy"
        />
        <label>Username</label>
        <input></input>
        <button onClick={(e) => handleSubmit(e)} className="m-4 bg-blue-500">
          Maak task
        </button>
      </form>
    </div>
  );
}
