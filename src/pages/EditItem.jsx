import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { FaSave, FaArrowLeft, FaRupeeSign, FaLeaf } from "react-icons/fa";
import { FiCoffee, FiGrid } from "react-icons/fi";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
const token = localStorage.getItem("token");
  // form data
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    type: "veg",
  });

  // image states
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchItem();
  }, []);

  // GET SINGLE ITEM
  const fetchItem = async () => {
  try {
    const res = await axios.get(
      `https://gunnu-dashboard.onrender.com/api/menu/${id}`
    );

    const data = res.data;

    if (!data) {
      alert("Item not found");
      navigate("/menu");
      return;
    }

    setForm({
      name: data.name || "",
      category: data.category || "",
      price: data.price || "",
      type: data.type || "veg",
    });

    setPreview(data.image || "");

    setLoading(false);
  } catch (error) {
    console.log(error);
    alert("Item not found");
    navigate("/menu");
  }
};

  // TEXT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // IMAGE CHANGE
 const handleImage = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setImage(file);

  // instant preview
  setPreview(URL.createObjectURL(file));
};

  // UPDATE ITEM
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("category", form.category);
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

    alert("Updated Successfully 🔥");
    navigate("/menu");
  } catch (error) {
    console.log(error);
    alert("Update Failed");
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white flex justify-center items-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white px-4 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-2xl font-bold">Edit Menu Item</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Update food details
          </p>
        </div>

        <button
          onClick={() => navigate("/menu")}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-3 rounded-xl"
        >
          <FaArrowLeft />
          Back
        </button>

      </div>

      {/* FORM */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-2xl shadow">

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* IMAGE PREVIEW */}
         {/* IMAGE UPLOADER */}
<div className="space-y-3">

  <label className="text-sm font-medium">
    Food Image
  </label>

  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-2xl p-6 cursor-pointer relative bg-gray-50 dark:bg-gray-800">

    {/* hidden file input */}
    <input
      type="file"
      accept="image/*"
      onChange={handleImage}
      className="absolute inset-0 opacity-0 cursor-pointer"
    />

    {/* preview */}
    {preview ? (
      <img
        src={preview}
        alt="preview"
        className="w-40 h-40 object-cover rounded-xl shadow-md"
      />
    ) : (
      <div className="text-center text-gray-500">
        <p className="font-semibold">Click or Drag Image Here</p>
        <p className="text-sm">PNG, JPG, JPEG</p>
      </div>
    )}

    {/* change button */}
    {preview && (
      <button
        type="button"
        onClick={() => {
          setImage(null);
          setPreview("");
        }}
        className="mt-3 text-sm text-red-500 hover:underline"
      >
        Remove Image
      </button>
    )}

  </div>
</div>

          {/* NAME */}
          <div>
            <label className="text-sm font-medium">Item Name</label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-xl">
              <FiCoffee className="mr-2" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm font-medium">Category</label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-xl">
              <FiGrid className="mr-2" />
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm font-medium">Price</label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-xl">
              <FaRupeeSign className="mr-2" />
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* TYPE */}
          <div>
            <label className="text-sm font-medium">Food Type</label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-xl">
              <FaLeaf className="mr-2 text-green-500" />
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              >
                <option value="veg">Veg</option>
                <option value="nonveg">Non Veg</option>
              </select>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-2 gap-4">

            <button
              type="submit"
              className="bg-orange-500 text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <FaSave />
              Update
            </button>

            <button
              type="button"
              onClick={() => navigate("/menu")}
              className="bg-gray-400 dark:bg-gray-700 py-3 rounded-xl"
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