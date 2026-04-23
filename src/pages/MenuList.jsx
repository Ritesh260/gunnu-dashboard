import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function MenuList() {
  const [items, setItems] = useState([]);
  const [viewItem, setViewItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/menu"
      );

      setItems(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this item?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/menu/${id}`
      );

      fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Menu List
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            All food items available in store
          </p>
        </div>

        <Link
          to="/menu/add"
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 w-fit"
        >
          <FaPlus />
          Add Item
        </Link>

      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">

        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Type</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item._id}
                className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                </td>

                <td className="p-4 font-semibold">
                  {item.name}
                </td>

                <td className="p-4">
                  {item.category}
                </td>

                <td className="p-4 text-orange-500 font-bold">
                  ₹{item.price}
                </td>

                <td className="p-4 capitalize">
                  {item.type}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        setViewItem(item)
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                    >
                      <FaEye />
                    </button>

                    <Link
                      to={`/menu/edit/${item._id}`}
                      className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      onClick={() =>
                        deleteItem(item._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                    >
                      <FaTrash />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">

        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm"
          >

            <div className="flex gap-4">

              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover"
              />

              <div className="flex-1 min-w-0">

                <h3 className="font-bold text-lg truncate">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.category}
                </p>

                <p className="text-orange-500 font-bold mt-1">
                  ₹{item.price}
                </p>

                <p className="text-sm capitalize mt-1">
                  {item.type}
                </p>

              </div>

            </div>

            {/* Buttons */}
            <div className="grid grid-cols-3 gap-3 mt-4">

              <button
                onClick={() =>
                  setViewItem(item)
                }
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl flex justify-center"
              >
                <FaEye />
              </button>

              <Link
                to={`/menu/edit/${item._id}`}
                className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl flex justify-center"
              >
                <FaEdit />
              </Link>

              <button
                onClick={() =>
                  deleteItem(item._id)
                }
                className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex justify-center"
              >
                <FaTrash />
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* Empty State */}
      {!loading && items.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No menu items found.
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center mt-10 text-lg font-semibold">
          Loading...
        </div>
      )}

      {/* View Modal */}
     {/* Premium View Modal */}
{viewItem && (
  <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">

    {/* Modal Box */}
    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 animate-[popup_.25s_ease]">

      {/* Image Section */}
      <div className="relative">

        <img
          src={viewItem.image}
          alt={viewItem.name}
          className="w-full h-64 object-cover"
        />

        {/* Close */}
        <button
          onClick={() => setViewItem(null)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-red-500 transition"
        >
          <FaTimes />
        </button>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
          ₹{viewItem.price}
        </div>

      </div>

      {/* Content */}
      <div className="p-6">

        {/* Title */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold leading-tight">
            {viewItem.name}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {viewItem.category}
          </p>
        </div>

        {/* Type Badge */}
        <div className="mb-5">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              viewItem.type === "veg"
                ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {viewItem.type === "veg"
              ? "Veg Item"
              : "Non Veg Item"}
          </span>
        </div>

        {/* Info */}
        <div className="space-y-4">

          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
            <span className="text-gray-500 dark:text-gray-400">
              Category
            </span>

            <span className="font-semibold">
              {viewItem.category}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
            <span className="text-gray-500 dark:text-gray-400">
              Price
            </span>

            <span className="font-bold text-orange-500">
              ₹{viewItem.price}
            </span>
          </div>

          <div className="flex justify-between items-start gap-3">
            <span className="text-gray-500 dark:text-gray-400">
              Item ID
            </span>

            <span className="text-xs text-right break-all max-w-[180px]">
              {viewItem._id}
            </span>
          </div>

        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">

          <Link
            to={`/menu/edit/${viewItem._id}`}
            onClick={() => setViewItem(null)}
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
          >
            <FaEdit />
            Edit
          </Link>

          <button
            onClick={() => setViewItem(null)}
            className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 py-3 rounded-xl font-semibold"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default MenuList;