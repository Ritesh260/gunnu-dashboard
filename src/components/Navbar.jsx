import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [admin, setAdmin] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/settings/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setAdmin(res.data.admin);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 sm:px-8 py-4 shadow-md flex justify-between items-center relative">
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold">
        Dashboard
      </h2>

      {/* Profile Section */}
      <div className="relative">

        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 cursor-pointer"
        >

          {/* Avatar */}
          {admin?.image ? (
            <img
              src={admin.image}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
            />
          ) : (
            <FaUserCircle className="text-3xl text-gray-300" />
          )}

          {/* Name */}
          <span className="hidden sm:block font-medium">
            {admin?.name || "Admin"}
          </span>

        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-xl shadow-lg overflow-hidden z-50">

            <div className="px-4 py-3 border-b">
              <p className="font-semibold">
                {admin?.name}
              </p>
              <p className="text-sm text-gray-500">
                {admin?.email}
              </p>
            </div>

            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-100 text-red-500"
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Navbar;