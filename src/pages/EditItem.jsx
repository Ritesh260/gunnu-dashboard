import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

import {
  FaSave,
  FaArrowLeft,
  FaRupeeSign,
  FaLeaf,
  FaCheckCircle,
} from "react-icons/fa";

import {
  FiCoffee,
  FiGrid,
  FiTag,
  FiFileText,
  FiStar,
  FiUploadCloud,
} from "react-icons/fi";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  /* =========================
      FORM DATA
  ========================= */

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    tag: "",
    rating: 5,

    // FULL REQUIRED
    // HALF OPTIONAL
    fullPrice: "",
    halfPrice: "",

    type: "veg",
  });

  /* =========================
      IMAGE
  ========================= */

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  /* =========================
      FETCH ITEM
  ========================= */

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://gunnu-dashboard.onrender.com/api/menu/${id}`
      );

      const data = res.data?.data || res.data;

      if (!data) {
        toast.error("Item not found");
        navigate("/menu");
        return;
      }

      setForm({
        name: data.name || "",
        category: data.category || "",
        description: data.description || "",
        tag: data.tag || "Popular",
        rating: data.rating ?? 5,

        // NEW PRICE FORMAT
        // OLD FORMAT FALLBACK
        fullPrice:
          data.price?.full !== undefined
            ? data.price.full
            : data.fullPrice ?? "",

        halfPrice:
          data.price?.half !== undefined
            ? data.price.half
            : data.halfPrice ?? "",

        type: data.type || "veg",
      });

      setPreview(data.image || "");
    } catch (error) {
      console.log("FETCH ITEM ERROR:", error);

      toast.error("Failed to fetch item");
      navigate("/menu");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
      HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
      HANDLE IMAGE
  ========================= */

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* =========================
      UPDATE ITEM
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* =========================
        PRICE VALIDATION
    ========================= */

    // FULL PRICE REQUIRED
    if (
      form.fullPrice === "" ||
      form.fullPrice === null ||
      form.fullPrice === undefined
    ) {
      toast.error("Please enter Full plate price");
      return;
    }

    try {
      setUpdating(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("tag", form.tag);
      formData.append("rating", form.rating);

      /* =========================
          PRICE

          FULL = REQUIRED
          HALF = OPTIONAL
      ========================= */

      formData.append("fullPrice", form.fullPrice);

      // IMPORTANT:
      // Always send halfPrice.
      //
      // If user removes half price,
      // empty string will be sent.
      //
      // Backend must then remove/unset old half price.
      formData.append("halfPrice", form.halfPrice || "");

      formData.append("type", form.type);

      /* =========================
          IMAGE
      ========================= */

      if (image) {
        formData.append("image", image);
      }

      console.log("UPDATE PRICE:", {
        fullPrice: form.fullPrice,
        halfPrice: form.halfPrice,
      });

      await axios.put(
        `https://gunnu-dashboard.onrender.com/api/menu/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Item Updated Successfully 🔥");

      navigate("/menu");
    } catch (error) {
      console.log("UPDATE ITEM ERROR:", error);

      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Update Failed"
      );
    } finally {
      setUpdating(false);
    }
  };

  /* =========================
      LOADING
  ========================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

          <p className="text-lg font-semibold">Loading Item...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white px-3 sm:px-5 lg:px-8 py-5 sm:py-6">
      {/* ================= HEADER ================= */}

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Edit Menu Item
          </h1>

          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
            Update your food item details
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/menu")}
          className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          <FaArrowLeft />
          Back to Menu
        </button>
      </div>

      {/* ================= MAIN CARD ================= */}

      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-10 p-4 sm:p-6 lg:p-8"
        >
          {/* =====================================================
              LEFT SIDE
          ====================================================== */}

          <div className="space-y-5">
            {/* ================= ITEM NAME ================= */}

            <div>
              <label className="block mb-2 text-sm font-semibold">
                Item Name
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4">
                <FiCoffee className="text-gray-500 shrink-0" />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Chicken Fried Rice"
                  className="w-full bg-transparent p-4 outline-none"
                  required
                />
              </div>
            </div>

            {/* ================= CATEGORY ================= */}

            <div>
              <label className="block mb-2 text-sm font-semibold">
                Category
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4">
                <FiGrid className="text-gray-500 shrink-0" />

                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Chinese"
                  className="w-full bg-transparent p-4 outline-none"
                  required
                />
              </div>
            </div>

            {/* ================= DESCRIPTION ================= */}

            <div>
              <label className="block mb-2 text-sm font-semibold">
                Description
              </label>

              <div className="flex items-start bg-gray-100 dark:bg-gray-800 rounded-xl px-4">
                <FiFileText className="text-gray-500 mt-4 shrink-0" />

                <textarea
                  rows="4"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Fresh ingredients, premium sauces and perfect flavor..."
                  className="w-full bg-transparent p-4 outline-none resize-none"
                  required
                />
              </div>
            </div>

            {/* ================= TAG ================= */}

            <div>
              <label className="block mb-2 text-sm font-semibold">
                Tag
              </label>

              <div className="relative">
                <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10" />

                <select
                  name="tag"
                  value={form.tag}
                  onChange={handleChange}
                  className="
                    w-full
                    appearance-none
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700
                    text-gray-800 dark:text-white
                    rounded-xl
                    pl-12 pr-12
                    py-4
                    outline-none
                    focus:ring-2
                    focus:ring-orange-500
                    focus:border-orange-500
                  "
                >
                  <option value="">Select Tag</option>

                  <option value="Popular">🔥 Popular</option>

                  <option value="Hot">🌶 Hot</option>

                  <option value="Best Seller">⭐ Best Seller</option>

                  <option value="Chef Special">👨‍🍳 Chef Special</option>

                  <option value="Trending">📈 Trending</option>

                  <option value="New">🆕 New</option>
                </select>

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  ▼
                </span>
              </div>
            </div>

            {/* ================= RATING ================= */}

            <div>
              <label className="block mb-2 text-sm font-semibold">
                Rating
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4">
                <FiStar className="text-yellow-500 shrink-0" />

                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none"
                />
              </div>
            </div>

            {/* =====================================================
                FULL + HALF PLATE PRICING
            ====================================================== */}

            <div>
              <label className="block mb-2 text-sm font-semibold">
                Plate Pricing
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* FULL PLATE */}

                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/40 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-orange-500 text-white flex items-center justify-center">
                      <FaRupeeSign />
                    </div>

                    <div>
                      <p className="font-bold">Full Plate</p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Full serving price
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl px-3">
                    <FaRupeeSign className="text-orange-500" />

                    <input
                      type="number"
                      name="fullPrice"
                      value={form.fullPrice}
                      onChange={handleChange}
                      placeholder="220"
                      min="0"
                      className="w-full bg-transparent p-3 outline-none"
                      required
                    />
                  </div>
                </div>

                {/* HALF PLATE */}

                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/40 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-orange-500 text-white flex items-center justify-center">
                      <FaRupeeSign />
                    </div>

                    <div>
                      <p className="font-bold">Half Plate</p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Half serving price
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl px-3">
                    <FaRupeeSign className="text-orange-500" />

                    <input
                      type="number"
                      name="halfPrice"
                      value={form.halfPrice}
                      onChange={handleChange}
                      placeholder="120"
                      min="0"
                      className="w-full bg-transparent p-3 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ================= PRICE PREVIEW ================= */}

            <div
              className={`grid gap-3 ${
                form.halfPrice ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {form.halfPrice && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Half Plate Price
                  </p>

                  <p className="text-xl font-bold text-orange-500 mt-1">
                    ₹{form.halfPrice}
                  </p>
                </div>
              )}

              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Full Plate Price
                </p>

                <p className="text-xl font-bold text-orange-500 mt-1">
                  ₹{form.fullPrice || "0"}
                </p>
              </div>
            </div>

            {/* ================= FOOD TYPE ================= */}

            <div>
              <label className="block mb-2 text-sm font-semibold">
                Food Type
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4">
                <FaLeaf className="text-green-500 shrink-0" />

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none"
                >
                  <option value="veg">🥗 Veg</option>

                  <option value="nonveg">🍗 Non Veg</option>
                </select>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}

          <div>
            {/* ================= IMAGE ================= */}

            <label className="block mb-2 text-sm font-semibold">
              Upload Food Image
            </label>

            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();

                const file = e.dataTransfer.files?.[0];

                if (file) {
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="
                w-full
                border-2
                border-dashed
                border-gray-300
                dark:border-gray-700
                rounded-2xl
                min-h-[300px]
                sm:min-h-[360px]
                flex
                flex-col
                justify-center
                items-center
                text-center
                cursor-pointer
                hover:border-orange-500
                transition
                overflow-hidden
                bg-gray-50
                dark:bg-gray-800
                p-4
              "
            >
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
              />

              {preview ? (
                <img
                  src={preview}
                  alt={form.name}
                  className="w-full h-[300px] sm:h-[360px] object-cover rounded-xl"
                />
              ) : (
                <>
                  <FiUploadCloud
                    size={55}
                    className="text-orange-500 mb-4"
                  />

                  <p className="text-lg font-semibold">
                    Upload Food Image
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    Tap here or drag & drop image
                  </p>
                </>
              )}
            </label>

            {/* ================= IMAGE NAME ================= */}

            {image && (
              <div className="mt-4 flex items-center gap-2 text-green-500 text-sm break-all">
                <FaCheckCircle />

                {image.name}
              </div>
            )}

            {/* ================= CURRENT PRICE SUMMARY ================= */}

            <div className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-2xl p-5">
              <h3 className="font-bold text-lg mb-4">
                Menu Preview
              </h3>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">
                    {form.name || "Food Item"}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {form.category || "Category"}
                  </p>
                </div>

                <div className="text-right">
                  {form.halfPrice && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Half ₹{form.halfPrice}
                    </p>
                  )}

                  <p className="font-bold text-orange-500">
                    Full ₹{form.fullPrice || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* ================= BUTTONS ================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <button
                type="submit"
                disabled={updating}
                className="
                  bg-orange-500
                  hover:bg-orange-600
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  text-white
                  py-4
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-2
                  font-semibold
                  transition
                "
              >
                <FaSave />

                {updating ? "Updating..." : "Update Item"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/menu")}
                className="
                  bg-gray-200
                  dark:bg-gray-800
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                  py-4
                  rounded-xl
                  font-semibold
                  transition
                "
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItem;