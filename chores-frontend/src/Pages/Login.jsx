import working from "../img/working.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const [notification, setNotification] = useState();
  const navigate = useNavigate();

  const fetch = async (request) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://chrisouboter.com/api/login",
        request
      );
      console.log(response.data.status);
      if (response.data.status == "401") {
        setNotification("Verkeerde inlog gegevens");
        setLoading(false);
        return false;
      }

      localStorage.clear();
      // save data in localstorage like token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      await navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  function handleLogin(e) {
    e.preventDefault();
    if (username == "" || password == "") {
      setNotification("Vul alles in pls");
      return false;
    }
    const request = {
      name: username,
      password: password,
    };
    fetch(request);
  }

  return (
    <section className="bg-gradient-to-r from-indigo-500 to-indigo-300 min-h-screen flex items-center justify-center">
      <div className="bg-[#ffffff] min-w- rounded-xl flex p-5 max-w-3xl shadow-xl">
        <div className="sm:w-1/2 p-5">
          <div className="font-bold text-2xl">Huishoudelijk Online</div>
          <p className="text-sm mt-4 w-60">
            Visualiseer al je huishoud taken op een plek waar papa het niet
            kapot kan maken!
          </p>

          <form className="flex flex-col mt-10 gap-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 mt-8 border text-lg border-[#c4c4c4] rounded-xl"
              type="text"
              placeholder="Gebruikersnaam"
              autoComplete="false"
            ></input>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 text-lg rounded-xl border border-[#c4c4c4]"
              type="password"
              placeholder="Wachtwoord"
            ></input>
            <button
              onClick={(e) => handleLogin(e)}
              className="bg-[#3c6dcf] hover:bg-[#2754ae] rounded-xl text-white py-3"
            >
              <div className="flex gap-4 justify-center items-center">
                {loading ? <SyncLoader color="#ffffff" size={10} /> : ""}
                <p className="font-bold">Login</p>
              </div>
            </button>
          </form>
          <p className="text-md  pt-4 text-[#d80909]">
            {notification ? notification : ""}
          </p>
        </div>
        <div className=" w-1/2 flex items-center justify-center">
          <div className="flex items-center justify-center">
            <img
              className="sm:block hidden object-cover p-0.25 h-96 w-96 rounded-xl"
              src={working}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
