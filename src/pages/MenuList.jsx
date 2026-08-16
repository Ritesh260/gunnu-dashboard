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
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function MenuList() {
  const [items, setItems] = useState([]);
  const [viewItem, setViewItem] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= PAGINATION ================= */

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const currentItems = items.slice(startIndex, endIndex);

  const token = localStorage.getItem("token");

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchItems();
  }, []);

 const fetchItems = async () => {
  try {
    setLoading(true);

    const res = await axios.get(
      "https://gunnu-dashboard.onrender.com/api/menu"
    );

    console.log("Menu API Response:", res.data);

    if (Array.isArray(res.data)) {
      setItems(res.data);
    } else if (Array.isArray(res.data.data)) {
      setItems(res.data.data);
    } else {
      setItems([]);
    }

  } catch (error) {
    console.log("Menu Fetch Error:", error);

    toast.error("Failed to fetch menu");
    setItems([]);

  } finally {
    setLoading(false);
  }
};

  /* ================= DELETE ================= */

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
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

      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      fetchItems();
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete item");
    }
  };

  

/* ================= PRICE HELPERS ================= */

const getFullPrice = (item) => {
  // New backend format
  if (item?.price && typeof item.price === "object") {
    if (
      item.price.full !== undefined &&
      item.price.full !== null &&
      item.price.full !== ""
    ) {
      return item.price.full;
    }
  }

  // Old format
  if (
    item?.fullPrice !== undefined &&
    item?.fullPrice !== null &&
    item.fullPrice !== ""
  ) {
    return item.fullPrice;
  }

  // Old price number/string format
  if (
    typeof item?.price === "number" ||
    (typeof item?.price === "string" && item.price !== "")
  ) {
    return item.price;
  }

  return null;
};

const getHalfPrice = (item) => {
  // New backend format
  if (item?.price && typeof item.price === "object") {
    if (
      item.price.half !== undefined &&
      item.price.half !== null &&
      item.price.half !== ""
    ) {
      return item.price.half;
    }
  }

  // Old format
  if (
    item?.halfPrice !== undefined &&
    item?.halfPrice !== null &&
    item.halfPrice !== ""
  ) {
    return item.halfPrice;
  }

  return null;
};





  /* ================= TYPE ================= */

  const getTypeClass = (type) => {
    return type === "veg"
      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
      : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
  };

  const getTypeName = (type) => {
    return type === "veg" ? "Veg" : "Non Veg";
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
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-2xl font-semibold flex items-center gap-2 w-fit shadow-lg transition"
        >
          <FaPlus />
          Add Item
        </Link>

      </div>

      {/* ================= LOADING ================= */}

      {loading && (
        <div className="flex justify-center items-center h-[50vh]">

          <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

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
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-semibold"
          >
            <FaPlus />
            Add Item
          </Link>

        </div>
      )}

      {/* ================= CONTENT ================= */}

      {!loading && items.length > 0 && (
        <>

          {/* ================= DESKTOP TABLE ================= */}

          <div className="hidden xl:block bg-white dark:bg-gray-900 rounded-[30px] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="bg-gray-100 dark:bg-gray-800">

                  <tr>

                    <th className="p-5">
                      Image
                    </th>

                    <th className="p-5">
                      Item
                    </th>

                    <th className="p-5">
                      Category
                    </th>

                    <th className="p-5">
                      Tag
                    </th>

                    <th className="p-5">
                      Rating
                    </th>

                    <th className="p-5">
                      Pricing
                    </th>

                    <th className="p-5">
                      Type
                    </th>

                    <th className="p-5">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {currentItems.map((item) => (

                    <tr
                      key={item._id}
                      className="border-t border-gray-200 dark:border-gray-800 hover:bg-orange-50 dark:hover:bg-gray-800/40 transition"
                    >

                      {/* IMAGE */}

                      <td className="p-5">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-2xl object-cover shadow-md"
                        />

                      </td>

                      {/* ITEM */}

                      <td className="p-5">

                        <div>

                          <h3 className="font-bold text-lg">
                            {item.name}
                          </h3>

                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1 max-w-[250px]">
                            {item.description || "No description added"}
                          </p>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td className="p-5">

                        <span className="font-medium">
                          {item.category || "Uncategorized"}
                        </span>

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

                      {/* ================= PRICING ================= */}


<td className="p-5">

  <div className="space-y-2 min-w-[130px]">

    {/* FULL PRICE */}
    {getFullPrice(item) !== null && (
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Full
        </span>

        <span className="font-bold text-orange-500">
          ₹{getFullPrice(item)}
        </span>
      </div>
    )}

    {/* HALF PRICE */}
    {getHalfPrice(item) !== null && (
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Half
        </span>

        <span className="font-bold text-orange-500">
          ₹{getHalfPrice(item)}
        </span>
      </div>
    )}

    {/* NO PRICE */}
    {getFullPrice(item) === null &&
      getHalfPrice(item) === null && (
        <span className="text-gray-400 text-sm">
          No pricing
        </span>
      )}

  </div>

</td>

                      {/* TYPE */}

                      <td className="p-5">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeClass(
                            item.type
                          )}`}
                        >
                          {getTypeName(item.type)}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="p-5">

                        <div className="flex gap-2">

                          {/* VIEW */}

                          <button
                            onClick={() => setViewItem(item)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition"
                            title="View"
                          >
                            <FaEye />
                          </button>

                          {/* EDIT */}

                          <Link
                            to={`/menu/edit/${item._id}`}
                            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl transition"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>

                          {/* DELETE */}

                          <button
                            onClick={() => deleteItem(item._id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition"
                            title="Delete"
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

          </div>

          {/* ================= MOBILE / TABLET CARDS ================= */}

          <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-5">

            {currentItems.map((item) => (

              <div
                key={item._id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition"
              >

                {/* IMAGE */}

                <div className="relative">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                  />

                  {/* TAG */}

                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-2xl font-bold shadow-lg">
                    {item.tag || "Popular"}
                  </div>

                  {/* TYPE */}

                  <div
                    className={`absolute top-4 right-4 px-3 py-2 rounded-2xl font-semibold text-sm shadow-lg ${
                      item.type === "veg"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {getTypeName(item.type)}
                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-5">

                  {/* TITLE */}

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <h2 className="text-xl font-bold">
                        {item.name}
                      </h2>

                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {item.category || "Uncategorized"}
                      </p>

                    </div>

                    <div className="flex items-center gap-1 text-yellow-500 font-semibold">

                      <FaStar />

                      {item.rating || 5}

                    </div>

                  </div>

                  {/* DESCRIPTION */}

                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 line-clamp-2">
                    {item.description || "No description added"}
                  </p>

                  {/* ================= PRICING ================= */}

           

<div className="mt-5 bg-gray-50 dark:bg-gray-800/70 rounded-2xl p-4">

  <h3 className="text-sm font-bold mb-3">
    Pricing
  </h3>

  <div
    className={`grid gap-3 ${
      getFullPrice(item) !== null &&
      getHalfPrice(item) !== null
        ? "grid-cols-2"
        : "grid-cols-1"
    }`}
  >

    {/* FULL */}
    {getFullPrice(item) !== null && (
      <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-200 dark:border-gray-700">

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Full Plate
        </p>

        <p className="text-lg font-bold text-orange-500 mt-1">
          ₹{getFullPrice(item)}
        </p>

      </div>
    )}

    {/* HALF */}
    {getHalfPrice(item) !== null && (
      <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-200 dark:border-gray-700">

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Half Plate
        </p>

        <p className="text-lg font-bold text-orange-500 mt-1">
          ₹{getHalfPrice(item)}
        </p>

      </div>
    )}

  </div>

  {/* NO PRICING */}
  {getFullPrice(item) === null &&
    getHalfPrice(item) === null && (
      <p className="text-sm text-gray-400">
        No pricing added
      </p>
    )}

</div>

                  {/* BUTTONS */}

                  <div className="grid grid-cols-3 gap-3 mt-6">

                    <button
                      onClick={() => setViewItem(item)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl flex justify-center transition"
                    >
                      <FaEye />
                    </button>

                    <Link
                      to={`/menu/edit/${item._id}`}
                      className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl flex justify-center transition"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      onClick={() => deleteItem(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl flex justify-center transition"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* ================= PAGINATION ================= */}

          {totalPages > 1 && (

            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

              {/* PREVIOUS */}

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold transition ${
                  currentPage === 1
                    ? "bg-gray-200 dark:bg-gray-800 opacity-50 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
                }`}
              >
                <FaChevronLeft />
                Prev
              </button>

              {/* PAGE NUMBERS */}

              {[...Array(totalPages)].map((_, index) => {

                const page = index + 1;

                return (

                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-12 h-12 rounded-2xl font-bold transition ${
                      currentPage === page
                        ? "bg-orange-500 text-white shadow-lg scale-105"
                        : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-orange-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {page}
                  </button>

                );

              })}

              {/* NEXT */}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold transition ${
                  currentPage === totalPages
                    ? "bg-gray-200 dark:bg-gray-800 opacity-50 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
                }`}
              >
                Next
                <FaChevronRight />
              </button>

            </div>

          )}

        </>

      )}

      {/* ================= VIEW MODAL ================= */}

      {viewItem && (

        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">

          <div className="relative w-full max-w-md sm:max-w-xl lg:max-w-2xl bg-white dark:bg-gray-900 rounded-[28px] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[95vh] overflow-y-auto">

            {/* CLOSE */}

            <button
              onClick={() => setViewItem(null)}
              className="absolute top-4 right-4 z-20 w-11 h-11 rounded-2xl bg-black/50 hover:bg-red-500 text-white flex items-center justify-center transition"
            >
              <FaTimes />
            </button>

            {/* IMAGE */}

            <div className="relative">

              <img
                src={viewItem.image}
                alt={viewItem.name}
                className="w-full h-56 sm:h-72 lg:h-80 object-cover"
              />

              <div className="absolute top-4 left-4">

                <span
                  className={`px-4 py-2 rounded-2xl font-bold text-sm ${
                    viewItem.type === "veg"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {getTypeName(viewItem.type)}
                </span>

              </div>

            </div>

            {/* CONTENT */}

            <div className="p-5 sm:p-7">

              {/* TITLE */}

              <div className="flex items-start justify-between gap-3">

                <div>

                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                    {viewItem.name}
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {viewItem.category || "Uncategorized"}
                  </p>

                </div>

                {/* RATING */}

                <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-3 py-2 rounded-xl font-semibold whitespace-nowrap">

                  <FaStar />

                  {viewItem.rating || 5}

                </div>

              </div>

              {/* BADGES */}

              <div className="flex flex-wrap gap-3 mt-5">

                <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-semibold">
                  {viewItem.tag || "Popular"}
                </span>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getTypeClass(
                    viewItem.type
                  )}`}
                >
                  {getTypeName(viewItem.type)} Item
                </span>

              </div>

              {/* DESCRIPTION */}

              <div className="mt-6">

                <h3 className="text-lg font-semibold mb-3">
                  Description
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  {viewItem.description || "No description added."}
                </p>

              </div>

              {/* ================= PRICING ================= */}

              <div className="mt-7">

                <h3 className="text-lg font-semibold mb-4">
                  Pricing
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {getFullPrice(viewItem) !== null && (

                    <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 rounded-2xl p-4">

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Full Plate
                      </p>

                      <p className="text-2xl font-bold text-orange-500 mt-1">
                        ₹{getFullPrice(viewItem)}
                      </p>

                    </div>

                  )}

                  {getHalfPrice(viewItem) !== null && (

                    <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 rounded-2xl p-4">

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Half Plate
                      </p>

                      <p className="text-2xl font-bold text-orange-500 mt-1">
                        ₹{getHalfPrice(viewItem)}
                      </p>

                    </div>

                  )}

                </div>

              </div>

              {/* INFO */}

              <div className="mt-7 space-y-4">

                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">

                  <span className="text-gray-500 dark:text-gray-400">
                    Category
                  </span>

                  <span className="font-semibold">
                    {viewItem.category || "Uncategorized"}
                  </span>

                </div>

                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">

                  <span className="text-gray-500 dark:text-gray-400">
                    Rating
                  </span>

                  <span className="font-semibold">
                    ⭐ {viewItem.rating || 5}
                  </span>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="grid grid-cols-2 gap-3 mt-8">

                <Link
                  to={`/menu/edit/${viewItem._id}`}
                  onClick={() => setViewItem(null)}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 sm:py-4 rounded-2xl font-semibold flex justify-center items-center gap-2 transition"
                >
                  <FaEdit />
                  Edit
                </Link>

                <button
                  onClick={() => setViewItem(null)}
                  className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 py-3 sm:py-4 rounded-2xl font-semibold transition"
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