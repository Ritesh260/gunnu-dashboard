function Navbar() {
  return (
    <div className="bg-gray-900 px-8 py-4 shadow-md flex justify-between items-center">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <button className="bg-orange-500 px-4 py-2 rounded-lg">
        Logout
      </button>
    </div>
  );
}

export default Navbar;