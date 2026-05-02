import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import AddItem from "./pages/AddItem";
import MenuList from "./pages/MenuList";
import EditItem from "./pages/EditItem";
import AdminOwner from "./pages/AdminOwner";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import GalleryAdmin from "./pages/GalleryAdmin";
import SpecialsAdmin from "./pages/SpecialAdmin"; 

import ProtectedRoute from "./components/ProtectedRoute";

import { Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white overflow-x-hidden">
        
        <Sidebar />

        <div className="flex-1 w-full lg:ml-64 min-h-screen">
          
          <Navbar />

          <main className="pt-16 lg:pt-0 w-full">
            <Outlet />
          </main>

        </div>
      </div>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <>
      {/* TOASTER */}
      <Toaster position="top-right" />

      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route path="/" element={<Layout />}>

          {/* DASHBOARD */}
          <Route index element={<Dashboard />} />

          {/* MENU */}
          <Route path="menu" element={<MenuList />} />
          <Route path="menu/add" element={<AddItem />} />
          <Route path="menu/edit/:id" element={<EditItem />} />

          {/* GALLERY */}
          <Route path="gallery" element={<GalleryAdmin />} />

          {/* SPECIALS 👇 */}
          <Route path="specials" element={<SpecialsAdmin />} />

          {/* OWNER */}
          <Route path="owner" element={<AdminOwner />} />

          {/* SETTINGS */}
          <Route path="settings" element={<Settings />} />

        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="p-10 text-red-500 text-3xl font-bold">
              404 Page Not Found
            </div>
          }
        />

      </Routes>
    </>
  );
}

export default App;