import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUtensils,
  FaLeaf,
  FaDrumstickBite,
  FaRupeeSign,
} from "react-icons/fa";

function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/menu");
    setItems(res.data);
  };

  const vegCount = items.filter((item) => item.type === "veg").length;
  const nonVegCount = items.filter((item) => item.type === "nonveg").length;

  return (
    <div className="p-8 bg-gray-950 min-h-screen text-white">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-400 mt-2">
          Welcome back, manage your restaurant smartly.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-400">Total Items</h3>
            <FaUtensils className="text-orange-400" />
          </div>

          <p className="text-4xl font-bold mt-4">
            {items.length}
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-400">Veg Items</h3>
            <FaLeaf className="text-green-400" />
          </div>

          <p className="text-4xl font-bold mt-4">
            {vegCount}
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-400">Non Veg</h3>
            <FaDrumstickBite className="text-red-400" />
          </div>

          <p className="text-4xl font-bold mt-4">
            {nonVegCount}
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-400">Estimated Value</h3>
            <FaRupeeSign className="text-yellow-400" />
          </div>

          <p className="text-4xl font-bold mt-4">
            {items.reduce((a, b) => a + Number(b.price), 0)}
          </p>
        </div>

      </div>

      {/* Recent Items */}
      <div className="mt-10 bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Recently Added Items
        </h2>

        <div className="space-y-4">
          {items.slice(-5).reverse().map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />

                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-400">
                    {item.category}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-orange-400 font-bold">
                  ₹{item.price}
                </p>
                <p className="text-sm text-gray-400 capitalize">
                  {item.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;