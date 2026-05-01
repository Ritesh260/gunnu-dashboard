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

  // FORM DATA
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    tag: "",
    rating: 5,
    price: "",
    type: "veg",
  });

  // IMAGE
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchItem();
  }, []);

  /* =========================
      FETCH ITEM
  ========================= */
  const fetchItem = async () => {
    try {
      const res = await axios.get(
        `https://gunnu-dashboard.onrender.com/api/menu/${id}`
      );

      const data = res.data;

      if (!data) {
        toast.error("Item not found");
        navigate("/menu");
        return;
      }

      setForm({
        name: data.name || "",
        category: data.category || "",
        description: data.description || "",
        tag: data.tag || "",
        rating: data.rating || 5,
        price: data.price || "",
        type: data.type || "veg",
      });

      setPreview(data.image || "");
    } catch (error) {
      console.log(error);

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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
      HANDLE IMAGE
  ========================= */
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    // PREVIEW
    setPreview(URL.createObjectURL(file));
  };

  /* =========================
      UPDATE ITEM
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("tag", form.tag);
      formData.append("rating", form.rating);
      formData.append("price", form.price);
      formData.append("type", form.type);

      if (image) {
        formData.append("image", image);
      }

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
      console.log(error);

      toast.error("Update Failed");
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
        <div className="text-xl font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white px-4 py-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Edit Menu Item
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Update your food details
          </p>
        </div>

        <button
          onClick={() => navigate("/menu")}
          className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-xl"
        >
          <FaArrowLeft />
          Back
        </button>

      </div>

      {/* MAIN CARD */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-5 sm:p-8"
        >

          {/* LEFT SIDE */}
          <div className="space-y-5">

            {/* NAME */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Item Name
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4">
                <FiCoffee className="text-gray-500" />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none"
                  required
                />
              </div>
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Category
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4">
                <FiGrid className="text-gray-500" />

                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none"
                  required
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Description
              </label>

              <div className="flex items-start bg-gray-100 dark:bg-gray-800 rounded-xl px-4">
                <FiFileText className="text-gray-500 mt-4" />

                <textarea
                  rows="4"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none resize-none"
                  required
                />
              </div>
            </div>

            {/* TAG */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Tag
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4">
                <FiTag className="text-gray-500" />

                <input
                  type="text"
                  name="tag"
                  value={form.tag}
                  onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none"
                />
              </div>
            </div>

            {/* RATING */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Rating
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4">
                <FiStar className="text-gray-500" />

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

            {/* PRICE */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Price
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4">
                <FaRupeeSign className="text-gray-500" />

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none"
                  required
                />
              </div>
            </div>

            {/* TYPE */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Food Type
              </label>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4">
                <FaLeaf className="text-green-500" />

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none"
                >
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non Veg</option>
                </select>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div>

            <label className="block mb-2 text-sm font-medium">
              Upload Food Image
            </label>

            <label className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl min-h-[320px] flex flex-col justify-center items-center text-center cursor-pointer hover:border-orange-500 transition overflow-hidden bg-gray-50 dark:bg-gray-800 p-4 relative">

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
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

                  <p className="text-lg font-semibold">
                    Upload Food Image
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    Tap here to upload image
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

            {/* BUTTONS */}
            <div className="grid grid-cols-2 gap-4 mt-6">

              <button
                type="submit"
                disabled={updating}
                className="bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-semibold"
              >
                <FaSave />

                {updating
                  ? "Updating..."
                  : "Update Item"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/menu")}
                className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 py-4 rounded-xl font-semibold"
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