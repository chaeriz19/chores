import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

const checkAuthentication = () => {
  let user = localStorage.getItem("user");
  if (user == null) {
    return 0;
  }
  user = JSON.parse(user);
  return user.is_admin;
};

const checkLogin = () => {
  return localStorage.getItem("token");
};

const ProtectedRoute = ({ element, path }) => {
  return checkLogin() ? (
    element
  ) : (
    <Navigate to="/" replace state={{ from: path }}></Navigate>
  );
};

const AdminRoute = ({ element, path }) => {
  return checkAuthentication() ? (
    element
  ) : (
    <Navigate to="/" replace state={{ from: path }}></Navigate>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Login />} />

        <Route path="home" element={<ProtectedRoute element={<Home />} />} />

        <Route
          path="dashboard"
          element={<AdminRoute element={<Dashboard />} />}
        />

        {/* <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard /> } /> */}
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
