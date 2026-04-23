// App.jsx

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import AddItem from "./pages/AddItem";
import MenuList from "./pages/MenuList";
import EditItem from "./pages/EditItem";
// import OwnerSettings from "./pages/OwnerSettings";

import { Routes, Route } from "react-router-dom";
import AdminOwner from "./pages/AdminOwner";

function App() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white overflow-x-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Layout */}
      <div className="flex-1 w-full lg:ml-64 min-h-screen">

        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="pt-16 lg:pt-0 w-full">

          <Routes>

            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Menu */}
            <Route path="/menu" element={<MenuList />} />
            <Route path="/menu/add" element={<AddItem />} />
            <Route path="/menu/edit/:id" element={<EditItem />} />

            {/* OWNER SETTINGS NEW PAGE */}
            <Route
              path="/owner"
              element={<AdminOwner />}
            />

            {/* Settings */}
            <Route
              path="/settings"
              element={
                <div className="p-4 sm:p-6 lg:p-8">
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    Settings Page
                  </h1>

                  <p className="text-gray-500 dark:text-gray-400 mt-3">
                    Manage your admin settings here.
                  </p>
                </div>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="p-4 sm:p-6 lg:p-8">
                  <h1 className="text-4xl font-bold text-red-500">
                    404
                  </h1>

                  <p className="text-gray-500 dark:text-gray-400 mt-3">
                    Page Not Found
                  </p>
                </div>
              }
            />

          </Routes>

        </main>
      </div>
    </div>
  );
}

export default App;