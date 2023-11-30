
import React, { useState, useEffect } from "react";
import { LockKeyhole, LogOut, Home as HomeLucide} from 'lucide-react';


import { useNavigate} from 'react-router-dom';
import axios from "axios";
import { SyncLoader } from "react-spinners";
import SideBar from "../comp/sideBar";
import TaskCreate from "../comp/dashboard/TaskCreate";
import TaskChecker from "../comp/dashboard/TaskChecker";
function Dashboard() {


     const storedUser = localStorage.getItem("user");
     const user = storedUser ? JSON.parse(storedUser) : false;
     let token = localStorage.getItem("token");


     return (
          <div className="flex md:flex-row flex-col min-h-screen">
               <SideBar token={token} user={user}></SideBar>
               <main className="p-20 bg-gradient-to-r from-indigo-400 to-indigo-200 flex-1 p-4">
                    <TaskCreate></TaskCreate>
                    <TaskChecker></TaskChecker>
               </main>
          </div>
     
  );
}

export default Dashboard;
