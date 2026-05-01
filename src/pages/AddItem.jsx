import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  FiUploadCloud,
  FiTag,
  FiGrid,
  FiCoffee,
  FiFileText,
  FiStar,
} from "react-icons/fi";

import {
  FaRupeeSign,
  FaCheckCircle,
} from "react-icons/fa";

function AddItem() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    tag: "",
    rating: 5,
    price: "",
    type: "veg",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  /* =========================
      HANDLE CHANGE
  ========================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
      HANDLE IMAGE
  ========================= */
  const handleImage = (file) => {
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* =========================
      DRAG DROP
  ========================= */
  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    handleImage(file);
  };

  /* =========================
      SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", form.name);
      data.append("category", form.category);
      data.append("description", form.description);
      data.append("tag", form.tag);
      data.append("rating", form.rating);
      data.append("price", form.price);
      data.append("type", form.type);

      if (image) {
        data.append("image", image);
      }

      await axios.post(
        "https://gunnu-dashboard.onrender.com/api/menu/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Item Added Successfully 🔥");

      setForm({
        name: "",
        category: "",
        description: "",
        tag: "",
        rating: 5,
        price: "",
        type: "veg",
      });

      setImage(null);
      setPreview(null);

    } catch (error) {
      console.log(error);

      toast.error("Failed to Add Item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white px-3 sm:px-5 lg:px-8 py-4 sm:py-6 overflow-x-hidden w-full">

      {/* Header */}
      <div className="w-full mb-6 sm:mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="w-full">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            Add Menu Item
          </h1>

          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
            Add new food items to your store
          </p>
        </div>

        <div className="w-full sm:w-fit bg-orange-500 text-white px-4 py-3 rounded-xl font-semibold text-center">
          Admin Panel
        </div>

      </div>

      {/* Main Card */}
      <div className="w-full bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 w-full"
        >

          {/* LEFT SIDE */}
          <div className="space-y-5 sm:space-y-6 w-full">

            {/* NAME */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Item Name
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4">
                <FiCoffee className="text-gray-500 shrink-0" />

                <input
                  type="text"
                  name="name"
                  placeholder="Chicken Fried Rice"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent p-3 sm:p-4 outline-none"
                  required
                />
              </div>
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Category
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4">
                <FiGrid className="text-gray-500 shrink-0" />

                <input
                  type="text"
                  name="category"
                  placeholder="Chinese"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-transparent p-3 sm:p-4 outline-none"
                  required
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Description
              </label>

              <div className="flex items-start bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4">
                <FiFileText className="text-gray-500 shrink-0 mt-4" />

                <textarea
                  name="description"
                  rows="4"
                  placeholder="Fresh ingredients, premium sauces and perfect flavor in every bite."
                  value={form.description}
                  onChange={handleChange}
                  className="w-full bg-transparent p-3 sm:p-4 outline-none resize-none"
                  required
                />
              </div>
            </div>

            {/* TAG */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Tag
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4">
                <FiTag className="text-gray-500 shrink-0" />

                <input
                  type="text"
                  name="tag"
                  placeholder="Best Seller"
                  value={form.tag}
                  onChange={handleChange}
                  className="w-full bg-transparent p-3 sm:p-4 outline-none"
                  required
                />
              </div>
            </div>

            {/* RATING */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Rating
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4">
                <FiStar className="text-gray-500 shrink-0" />

                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={handleChange}
                  className="w-full bg-transparent p-3 sm:p-4 outline-none"
                />
              </div>
            </div>

            {/* PRICE */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Price
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4">
                <FaRupeeSign className="text-gray-500 shrink-0" />

                <input
                  type="number"
                  name="price"
                  placeholder="220"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full bg-transparent p-3 sm:p-4 outline-none"
                  required
                />
              </div>
            </div>

            {/* FOOD TYPE */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Food Type
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4">
                <FiTag className="text-gray-500 shrink-0" />

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full bg-transparent p-3 sm:p-4 outline-none"
                >
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non Veg</option>
                </select>
              </div>
            </div>

            {/* MOBILE BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="lg:hidden w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
            >
              {loading ? "Adding..." : "Add Item"}
            </button>

          </div>

          {/* RIGHT SIDE */}
          <div className="w-full">

            <label className="block mb-2 text-sm font-medium">
              Upload Food Image
            </label>

            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl min-h-[250px] sm:min-h-[320px] flex flex-col justify-center items-center text-center cursor-pointer hover:border-orange-500 transition overflow-hidden bg-gray-50 dark:bg-gray-800 p-4"
            >

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  handleImage(e.target.files[0])
                }
              />

              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <>
                  <FiUploadCloud
                    size={50}
                    className="text-orange-500 mb-4"
                  />

                  <p className="text-base sm:text-lg font-semibold">
                    Upload Food Image
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    Tap here or drag image
                  </p>
                </>
              )}

            </label>

            {image && (
              <div className="mt-4 flex items-center gap-2 text-green-500 text-sm break-all">
                <FaCheckCircle />
                {image.name}
              </div>
            )}

            {/* DESKTOP BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="hidden lg:block w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold"
            >
              {loading ? "Adding..." : "Add Item"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AddItem;