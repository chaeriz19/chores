import axios from "axios";
import { LockKeyhole, LogOut, Home as HomeLucide } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SideBar({ token, user }) {
  const location = useLocation();
  const navigate = useNavigate();

  const route = (route) => {
    navigate(`/${route}`);
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        "https://chrisouboter.com/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.clear();
      navigate("/");
    } catch (error) {}
  };

  return (
    <aside
      className="sticky gap-4 block p-4 w-16 h-full flex md:flex-col flex-row items-center"
      style={{ minWidth: "60px" }}
    >
      <button onClick={() => route("home")}>
        <HomeLucide
          size={35}
          color={location.pathname === "/home" ? "blue" : "black"}
        />
      </button>
      {user.is_admin ? (
        <button onClick={() => route("dashboard")}>
          <LockKeyhole
            color={location.pathname === "/dashboard" ? "blue" : "black"}
            size={35}
          />
        </button>
      ) : (
        ""
      )}

      <button onClick={() => logout()}>
        <LogOut size={35} />
      </button>
    </aside>
  );
}
