import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaCog,
  FaStoreAlt
} from "react-icons/fa";

function Sidebar() {
  const navStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive
        ? "bg-orange-500 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-orange-400"
    }`;

  return (
    <div className="w-64 h-screen bg-gray-900 fixed left-0 top-0 p-5 border-r border-gray-800">

      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-orange-500">
          Gunnu Admin
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Restaurant Dashboard
        </p>
      </div>

      {/* Menu */}
      <ul className="space-y-4">

        <li>
          <NavLink to="/" className={navStyle}>
            <FaHome />
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/menu" className={navStyle}>
            <FaUtensils />
            Menu Items
          </NavLink>
        </li>

        <li>
          <NavLink to="/settings" className={navStyle}>
            <FaCog />
            Settings
          </NavLink>
        </li>

      </ul>

      {/* Bottom Card */}
      <div className="absolute bottom-6 left-5 right-5 bg-gray-800 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <FaStoreAlt className="text-orange-400" />
          <div>
            <h3 className="font-semibold text-sm">
              Live Store
            </h3>
            <p className="text-xs text-gray-400">
              Gunnu Chinese Corner
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;