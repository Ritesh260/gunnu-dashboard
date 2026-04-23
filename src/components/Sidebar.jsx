// Sidebar.jsx

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaUtensils,
  FaCog,
  FaStoreAlt,
  FaListUl,
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaUserTie,
} from "react-icons/fa";

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  /* DARK MODE */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const navStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
      isActive
        ? "bg-orange-500 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500"
    }`;

  const subNavStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 ml-6 rounded-xl text-sm transition-all ${
      isActive
        ? "bg-orange-100 dark:bg-gray-800 text-orange-500"
        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500"
    }`;

  return (
    <>
      {/* MOBILE TOPBAR */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 flex items-center justify-between">

        <h1 className="text-lg font-bold text-orange-500">
          Gunnu Admin
        </h1>

        <div className="flex items-center gap-4">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-orange-500 text-lg"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-orange-500 text-lg"
          >
            <FaBars />
          </button>

        </div>
      </header>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 lg:w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-5 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-2xl font-bold text-orange-500">
              Gunnu Admin
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Restaurant Dashboard
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-orange-500"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-orange-500 text-lg"
            >
              <FaTimes />
            </button>

          </div>
        </div>

        {/* MENU */}
        <ul className="space-y-3">

          {/* Dashboard */}
          <li>
            <NavLink
              to="/"
              className={navStyle}
              onClick={() => setSidebarOpen(false)}
            >
              <FaHome />
              Dashboard
            </NavLink>
          </li>

          {/* MENU ITEMS */}
          <li>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="flex items-center gap-3">
                <FaUtensils />
                Menu Items
              </div>

              {menuOpen ? (
                <FaChevronUp size={12} />
              ) : (
                <FaChevronDown size={12} />
              )}
            </button>

            {menuOpen && (
              <div className="mt-2 space-y-2">

                <NavLink
                  to="/menu"
                  end
                  className={subNavStyle}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaListUl />
                  Menu List
                </NavLink>

              </div>
            )}

          </li>

          {/* ADMIN OWNER PAGE */}
          <li>
            <NavLink
              to="/owner"
              className={navStyle}
              onClick={() => setSidebarOpen(false)}
            >
              <FaUserTie />
              Admin Owner
            </NavLink>
          </li>

          {/* SETTINGS */}
          <li>
            <NavLink
              to="/settings"
              className={navStyle}
              onClick={() => setSidebarOpen(false)}
            >
              <FaCog />
              Settings
            </NavLink>
          </li>

        </ul>

        {/* FOOTER */}
        <div className="absolute bottom-5 left-5 right-5 bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">

          <div className="flex items-center gap-3">

            <FaStoreAlt className="text-orange-500" />

            <div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                Live Store
              </h3>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Gunnu Chinese Corner
              </p>
            </div>

          </div>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;