import { useEffect, useState } from "react";

export default function Welcomer({user, tasks}) {

     const [msg, setMsg] = useState();
     const time = new Date().getHours()
     useEffect(() => {
          function message() {
               setMsg(time < 12 ? "Goedenmorgen," : time < 18 ? "Goedenmiddag," : "Avond,");
          }
          message();
     }, []);

     return (
          <div className="flex items-center flex-col">
               <h1 className="md:text-5xl text-2xl  text-white font-bold">{msg} {user}</h1>
               <p className="md:text-xl text-md text-[#e7e7e7]">Je hebt <b>{tasks}</b> taken klaarstaan | Het is nu <b>{time - 12}</b> uur</p>
          </div>
     )
     
}