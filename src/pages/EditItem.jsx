import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  FaSave,
  FaArrowLeft,
  FaRupeeSign,
  FaLeaf,
} from "react-icons/fa";

import {
  FiCoffee,
  FiGrid,
} from "react-icons/fi";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    type: "veg",
  });

  useEffect(() => {
    fetchItem();
  }, []);

 const fetchItem = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/menu/${id}`
    );

    setForm({
      name: res.data.name || "",
      category: res.data.category || "",
      price: res.data.price || "",
      type: res.data.type || "veg",
      image: res.data.image || "",   // ✅ ADD THIS
    });

    setPreview(res.data.image || ""); // ✅ IMPORTANT
    setLoading(false);
  } catch (error) {
    console.log(error);
    alert("Item not found");
    navigate("/menu");
  }
};

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/menu/${id}`,
        form
      );

      alert(
        "Updated Successfully 🔥"
      );

      navigate("/menu");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white flex justify-center items-center px-4">
        <div className="text-lg sm:text-xl font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white px-3 sm:px-5 lg:px-8 py-4 sm:py-6 overflow-x-hidden">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">

        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            Edit Menu Item
          </h1>

          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
            Update your food item
            details
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/menu")
          }
          className="flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-3 rounded-xl hover:bg-gray-700 w-full sm:w-fit"
        >
          <FaArrowLeft />
          Back
        </button>

      </div>

      {/* Form Card */}
      <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-800 shadow-lg p-4 sm:p-6 lg:p-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-5 sm:space-y-6"
        >

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Item Name
            </label>

            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4">
              <FiCoffee className="text-gray-500 shrink-0" />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={
                  handleChange
                }
                placeholder="Chicken Fried Rice"
                className="w-full p-3 sm:p-4 bg-transparent outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Category
            </label>

            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4">
              <FiGrid className="text-gray-500 shrink-0" />

              <input
                type="text"
                name="category"
                value={
                  form.category
                }
                onChange={
                  handleChange
                }
                placeholder="Chinese / Indian"
                className="w-full p-3 sm:p-4 bg-transparent outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Price
            </label>

            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4">
              <FaRupeeSign className="text-gray-500 shrink-0" />

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={
                  handleChange
                }
                placeholder="220"
                className="w-full p-3 sm:p-4 bg-transparent outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Food Type
            </label>

            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4">
              <FaLeaf className="text-green-500 shrink-0" />

              <select
                name="type"
                value={form.type}
                onChange={
                  handleChange
                }
                className="w-full p-3 sm:p-4 bg-transparent outline-none text-sm sm:text-base"
              >
                <option value="veg">
                  Veg
                </option>

                <option value="nonveg">
                  Non Veg
                </option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 sm:py-4 rounded-xl font-semibold w-full"
            >
              <FaSave />
              Update Item
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/menu")
              }
              className="bg-gray-300 dark:bg-gray-700 px-6 py-3 sm:py-4 rounded-xl font-semibold w-full"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditItem;