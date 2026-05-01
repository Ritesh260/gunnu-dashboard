import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaPlus,
  FaStar,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function MenuList() {
  const [items, setItems] = useState([]);
  const [viewItem, setViewItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchItems();
  }, []);

  /* =========================
      FETCH ITEMS
  ========================= */
  const fetchItems = async () => {
    try {
      const res = await axios.get(
        "https://gunnu-dashboard.onrender.com/api/menu"
      );

      setItems(res.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to fetch menu");

    } finally {

      setLoading(false);

    }
  };

  /* =========================
      DELETE ITEM
  ========================= */
  const deleteItem = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this item?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://gunnu-dashboard.onrender.com/api/menu/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Item Deleted Successfully");

      fetchItems();

    } catch (error) {

      console.log(error);

      toast.error("Failed to delete item");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white p-4 sm:p-6 lg:p-8">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Menu List
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage all your food items
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

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="text-center mt-20 text-lg font-semibold">
          Loading...
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}
      {!loading && items.length === 0 && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-10 text-center shadow-sm">

          <h2 className="text-2xl font-bold mb-2">
            No Menu Items Found
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start by adding your first food item
          </p>

          <Link
            to="/menu/add"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            <FaPlus />
            Add Item
          </Link>

        </div>
      )}

      {/* ================= DESKTOP TABLE ================= */}
      {!loading && items.length > 0 && (
        <>
          <div className="hidden xl:block bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">

            <table className="w-full text-left">

              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>

                  <th className="p-5">Image</th>

                  <th className="p-5">Item</th>

                  <th className="p-5">Category</th>

                  <th className="p-5">Tag</th>

                  <th className="p-5">Rating</th>

                  <th className="p-5">Price</th>

                  <th className="p-5">Type</th>

                  <th className="p-5">Actions</th>

                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
                  >

                    {/* IMAGE */}
                    <td className="p-5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                    </td>

                    {/* NAME */}
                    <td className="p-5">
                      <div>
                        <h3 className="font-bold text-lg">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td className="p-5">
                      {item.category}
                    </td>

                    {/* TAG */}
                    <td className="p-5">
                      <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {item.tag || "Popular"}
                      </span>
                    </td>

                    {/* RATING */}
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-yellow-500 font-semibold">
                        <FaStar />
                        {item.rating || 5}
                      </div>
                    </td>

                    {/* PRICE */}
                    <td className="p-5 text-orange-500 font-bold text-lg">
                      ₹{item.price}
                    </td>

                    {/* TYPE */}
                    <td className="p-5">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.type === "veg"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {item.type === "veg"
                          ? "Veg"
                          : "Non Veg"}
                      </span>

                    </td>

                    {/* ACTIONS */}
                    <td className="p-5">
                      <div className="flex gap-2">

                        <button
                          onClick={() => setViewItem(item)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl"
                        >
                          <FaEye />
                        </button>

                        <Link
                          to={`/menu/edit/${item._id}`}
                          className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          onClick={() =>
                            deleteItem(item._id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
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

          {/* ================= MOBILE CARDS ================= */}
          <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-5">

            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm"
              >

                {/* IMAGE */}
                <div className="relative">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-52 object-cover"
                  />

                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                    ₹{item.price}
                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <h2 className="text-xl font-bold">
                        {item.name}
                      </h2>

                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {item.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                      <FaStar />
                      {item.rating || 5}
                    </div>

                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* TAG + TYPE */}
                  <div className="flex items-center gap-3 mt-5 flex-wrap">

                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {item.tag || "Popular"}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.type === "veg"
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {item.type === "veg"
                        ? "Veg"
                        : "Non Veg"}
                    </span>

                  </div>

                  {/* BUTTONS */}
                  <div className="grid grid-cols-3 gap-3 mt-6">

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

              </div>
            ))}

          </div>
        </>
      )}

      {/* ================= VIEW MODAL ================= */}
      {viewItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">

          <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">

            {/* IMAGE */}
            <div className="relative">

              <img
                src={viewItem.image}
                alt={viewItem.name}
                className="w-full h-72 object-cover"
              />

              {/* CLOSE */}
              <button
                onClick={() => setViewItem(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-red-500 text-white flex items-center justify-center transition"
              >
                <FaTimes />
              </button>

              {/* PRICE */}
              <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-5 py-2 rounded-xl font-bold text-lg shadow-lg">
                ₹{viewItem.price}
              </div>

            </div>

            {/* CONTENT */}
            <div className="p-6">

              {/* TITLE */}
              <div className="flex items-start justify-between gap-3 mb-4">

                <div>
                  <h2 className="text-3xl font-bold">
                    {viewItem.name}
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {viewItem.category}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-yellow-500 font-semibold text-lg">
                  <FaStar />
                  {viewItem.rating || 5}
                </div>

              </div>

              {/* BADGES */}
              <div className="flex flex-wrap gap-3 mb-5">

                <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-semibold">
                  {viewItem.tag || "Popular"}
                </span>

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

              {/* DESCRIPTION */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">
                  Description
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {viewItem.description}
                </p>
              </div>

              {/* INFO */}
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

                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
                  <span className="text-gray-500 dark:text-gray-400">
                    Rating
                  </span>

                  <span className="font-semibold">
                    ⭐ {viewItem.rating || 5}
                  </span>
                </div>

              </div>

              {/* BUTTONS */}
              <div className="grid grid-cols-2 gap-3 mt-7">

                <Link
                  to={`/menu/edit/${viewItem._id}`}
                  onClick={() =>
                    setViewItem(null)
                  }
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
                >
                  <FaEdit />
                  Edit
                </Link>

                <button
                  onClick={() =>
                    setViewItem(null)
                  }
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