import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUtensils,
  FaLeaf,
  FaDrumstickBite,
  FaRupeeSign,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/menu"
      );
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const vegCount = items.filter(
    (item) => item.type === "veg"
  ).length;

  const nonVegCount = items.filter(
    (item) => item.type === "nonveg"
  ).length;

  const totalValue = items.reduce(
    (a, b) => a + Number(b.price || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white transition-all duration-300 px-3 sm:px-5 lg:px-8 py-4 sm:py-6 overflow-x-hidden">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">

        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            Dashboard Overview
          </h1>

          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, manage your restaurant smartly.
          </p>
        </div>

        {/* Theme Button */}
        {/* <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 w-fit"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          {darkMode
            ? "Light Mode"
            : "Dark Mode"}
        </button> */}

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">

        {/* Total */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Total Items
            </h3>

            <FaUtensils className="text-orange-500 text-lg" />
          </div>

          <p className="text-3xl sm:text-4xl font-bold mt-4">
            {items.length}
          </p>
        </div>

        {/* Veg */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Veg Items
            </h3>

            <FaLeaf className="text-green-500 text-lg" />
          </div>

          <p className="text-3xl sm:text-4xl font-bold mt-4">
            {vegCount}
          </p>
        </div>

        {/* Non Veg */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Non Veg
            </h3>

            <FaDrumstickBite className="text-red-500 text-lg" />
          </div>

          <p className="text-3xl sm:text-4xl font-bold mt-4">
            {nonVegCount}
          </p>
        </div>

        {/* Value */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Estimated Value
            </h3>

            <FaRupeeSign className="text-yellow-500 text-lg" />
          </div>

          <p className="text-3xl sm:text-4xl font-bold mt-4 break-all">
            ₹{totalValue}
          </p>
        </div>

      </div>

      {/* Recent Items */}
      <div className="mt-8 sm:mt-10 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 shadow-sm">

        <h2 className="text-lg sm:text-2xl font-semibold mb-5 sm:mb-6">
          Recently Added Items
        </h2>

        <div className="space-y-4">

          {items.length === 0 ? (
            <p className="text-gray-500">
              No items found.
            </p>
          ) : (
            items
              .slice(-5)
              .reverse()
              .map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl"
                >

                  {/* Left */}
                  <div className="flex items-center gap-3 min-w-0">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />

                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base truncate">
                        {item.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                        {item.category}
                      </p>
                    </div>

                  </div>

                  {/* Right */}
                  <div className="sm:text-right">
                    <p className="text-orange-500 font-bold text-sm sm:text-base">
                      ₹{item.price}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {item.type}
                    </p>
                  </div>

                </div>
              ))
          )}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;