import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import AddItem from "./pages/AddItem";
import MenuList from "./pages/MenuList";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex bg-gray-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <Routes>

          {/* Dashboard */}
          <Route
            path="/"
            element={<Dashboard />}
          />

          {/* Menu List */}
          <Route
            path="/menu"
            element={<MenuList />}
          />

          {/* Add Item */}
          <Route
            path="/menu/add"
            element={<AddItem />}
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={
              <div className="p-8 text-3xl font-bold">
                Settings Page
              </div>
            }
          />

        </Routes>
      </div>
    </div>
  );
}

export default App;