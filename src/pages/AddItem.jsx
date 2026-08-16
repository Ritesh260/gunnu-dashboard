import React, { useEffect, useState } from "react";
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
  // =========================
  // FORM
  // =========================

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    tag: "",
    rating: 5,

    fullPrice: "",
    halfPrice: "",

    type: "veg",
  });

  // =========================
  // IMAGE
  // =========================

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // =========================
  // LOADING
  // =========================

  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);

  // =========================
  // CATEGORIES FROM API
  // =========================

  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  // ==================================================
  // GET CATEGORIES FROM BACKEND
  // ==================================================

  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);

      const res = await axios.get(
  "https://gunnu-dashboard.onrender.com/api/categories"
);

      console.log("Categories API:", res.data);

      // Agar API direct array return karti hai
      if (Array.isArray(res.data)) {
        setCategories(res.data);
      }

      // Agar API { success:true, data:[] } return kare
      else if (Array.isArray(res.data.data)) {
        setCategories(res.data.data);
      }

      else {
        setCategories([]);
      }

    } catch (error) {
      console.log("Category Error:", error);

      toast.error("Failed to load categories");

      setCategories([]);

    } finally {
      setCategoryLoading(false);
    }
  };

  // ==================================================
  // LOAD CATEGORIES
  // ==================================================

  useEffect(() => {
    fetchCategories();
  }, []);

  // ==================================================
  // FILTER CATEGORIES ACCORDING TO FOOD TYPE
  // ==================================================

  const filteredCategories = categories.filter(
    (category) =>
      category.active !== false &&
      category.type === form.type
  );

  // ==================================================
  // HANDLE CHANGE
  // ==================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Food Type change
    if (name === "type") {
      setForm((prev) => ({
        ...prev,
        type: value,
        category: "",
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==================================================
  // HANDLE IMAGE
  // ==================================================

  const handleImage = (file) => {
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ==================================================
  // DRAG DROP
  // ==================================================

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    handleImage(file);
  };

  // ==================================================
  // SUBMIT
  // ==================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Category validation
    if (!form.category) {
      toast.error("Please select a category");
      return;
    }

    // Price validation
    // Price validation
if (!form.fullPrice) {
  toast.error("Please enter Full plate price");
  return;
}

    // Image validation
    if (!image) {
      toast.error("Please upload food image");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", form.name);
      data.append("category", form.category);
      data.append("description", form.description);
      data.append("tag", form.tag);
      data.append("rating", form.rating);

     data.append("fullPrice", form.fullPrice);

if (form.halfPrice) {
  data.append("halfPrice", form.halfPrice);
}

      data.append("type", form.type);

      data.append("image", image);

      console.log("Sending Menu Data:", {
        name: form.name,
        category: form.category,
        type: form.type,
        fullPrice: form.fullPrice,
        halfPrice: form.halfPrice,
      });

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

      toast.success("Item Added Successfully");

      // =========================
      // RESET FORM
      // =========================

      setForm({
        name: "",
        category: "",
        description: "",
        tag: "",
        rating: 5,

        fullPrice: "",
        halfPrice: "",

        type: "veg",
      });

      setImage(null);
      setPreview(null);

    } catch (error) {
      console.log("Add Item Error:", error);

      toast.error(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to Add Item"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white px-3 sm:px-5 lg:px-8 py-4 sm:py-6 overflow-x-hidden w-full">

      {/* ================= HEADER ================= */}

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


      {/* ================= MAIN CARD ================= */}

      <div className="w-full bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 w-full"
        >

          {/* ================= LEFT SIDE ================= */}

          <div className="space-y-5 sm:space-y-6 w-full">

            {/* ================= NAME ================= */}

            <div>

              <label className="block mb-2 text-sm font-medium">
                Item Name
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4">

                <FiCoffee className="text-gray-500 shrink-0" />

                <input
                  type="text"
                  name="name"
                  placeholder="Veg Manchurian Noodles"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent p-3 sm:p-4 outline-none"
                  required
                />

              </div>

            </div>


            {/* ================= FOOD TYPE ================= */}

            <div>

              <label className="block mb-2 text-sm font-medium">
                Food Type
              </label>

              <div className="relative">

                <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10" />

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >

                  <option value="veg">
                    🥗 Veg
                  </option>

                  <option value="non-veg">
                    🍗 Non Veg
                  </option>

                </select>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  ▼
                </div>

              </div>

            </div>


            {/* ================= CATEGORY FROM API ================= */}

            <div>

              <label className="block mb-2 text-sm font-medium">
                Category
              </label>

              <div className="relative">

                <FiGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10" />

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  disabled={categoryLoading}
                  required
                  className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-60"
                >

                  <option value="">
                    {categoryLoading
                      ? "Loading categories..."
                      : "Select Category"}
                  </option>

                  {filteredCategories.map((category) => (

                    <option
                      key={category._id}
                      value={category.name}
                    >
                      {category.name}
                    </option>

                  ))}

                </select>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  ▼
                </div>

              </div>

              {/* No category message */}

              {!categoryLoading &&
                filteredCategories.length === 0 && (

                  <p className="text-xs text-red-500 mt-2">
                    No categories available for{" "}
                    {form.type === "veg"
                      ? "Veg"
                      : "Non Veg"}
                  </p>

                )}

            </div>


            {/* ================= DESCRIPTION ================= */}

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


            {/* ================= TAG ================= */}

            <div>

              <label className="block mb-2 text-sm font-medium">
                Tag
              </label>

              <div className="relative">

                <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10" />

                <select
                  name="tag"
                  value={form.tag}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-2 focus:ring-orange-500"
                >

                  <option value="">
                    Select Tag
                  </option>

                  <option value="Popular">
                    🔥 Popular
                  </option>

                  <option value="Hot">
                    🌶 Hot
                  </option>

                  <option value="Best Seller">
                    ⭐ Best Seller
                  </option>

                  <option value="Chef Special">
                    👨‍🍳 Chef Special
                  </option>

                  <option value="Trending">
                    📈 Trending
                  </option>

                  <option value="New">
                    🆕 New
                  </option>

                </select>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  ▼
                </div>

              </div>

            </div>


            {/* ================= RATING ================= */}

            <div>

              <label className="block mb-2 text-sm font-medium">
                Rating
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4">

                <FiStar className="text-yellow-500 shrink-0" />

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


            {/* ================= PRICE ================= */}

            <div>

              <label className="block mb-3 text-sm font-medium">
                Plate Pricing
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* FULL */}

                <div>

                  <label className="block mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Full Plate Price
                  </label>

                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4">

                    <FaRupeeSign className="text-orange-500 shrink-0" />

                    <input
                      type="number"
                      name="fullPrice"
                      placeholder="220"
                      min="0"
                      value={form.fullPrice}
                      onChange={handleChange}
                      className="w-full bg-transparent p-3 sm:p-4 outline-none"
                      required
                    />

                  </div>

                </div>


                {/* HALF */}

                <div>

                  <label className="block mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
  Half Plate Price <span className="text-gray-400">(Optional)</span>
</label>

                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 sm:px-4">

                    <FaRupeeSign className="text-orange-500 shrink-0" />

                    <input
  type="number"
  name="halfPrice"
  placeholder="140"
  min="0"
  value={form.halfPrice}
  onChange={handleChange}
  className="w-full bg-transparent p-3 sm:p-4 outline-none"
/>

                  </div>

                </div>

              </div>

            </div>


            {/* ================= PRICE PREVIEW ================= */}

            {(form.fullPrice || form.halfPrice) && (

              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 rounded-2xl p-4">

                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  Price Preview
                </p>

                <div className="flex flex-wrap gap-4">

                  <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-xl">

                    <p className="text-xs text-gray-500">
                      Full Plate
                    </p>

                    <p className="text-lg font-bold text-orange-500">
                      ₹{form.fullPrice || 0}
                    </p>

                  </div>

                 {form.halfPrice && (
  <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-xl">

    <p className="text-xs text-gray-500">
      Half Plate
    </p>

    <p className="text-lg font-bold text-orange-500">
      ₹{form.halfPrice}
    </p>

  </div>
)}

                </div>

              </div>

            )}


            {/* ================= MOBILE BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="lg:hidden w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-3 rounded-xl font-semibold"
            >
              {loading ? "Adding..." : "Add Item"}
            </button>

          </div>


          {/* ================= RIGHT SIDE ================= */}

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


            {/* ================= DESKTOP BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="hidden lg:block w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-4 rounded-xl font-semibold"
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