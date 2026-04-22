import React, { useState } from "react";
import axios from "axios";
import {
  FiUploadCloud,
  FiTag,
  FiDollarSign,
  FiGrid,
  FiCoffee,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
function AddItem() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    type: "veg",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (file) => {
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("category", form.category);
    data.append("price", form.price);
    data.append("type", form.type);
    data.append("image", image);

    await axios.post("http://localhost:5000/api/menu/add", data);

    alert("Item Added Successfully 🔥");

    setForm({
      name: "",
      category: "",
      price: "",
      type: "veg",
    });

    setImage(null);
    setPreview(null);
  };

  return (
    <div className="p-8 bg-gray-950 min-h-screen text-white">
      <div className="max-w-5xl mx-auto bg-gray-900 rounded-3xl shadow-2xl border border-gray-800 overflow-hidden">

        {/* Header */}
        <div className="p-8 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Add Menu Item</h1>
            <p className="text-gray-400 mt-2">
              Add new food items to Gunnu Chinese Shop
            </p>
          </div>

          <div className="bg-orange-500/20 text-orange-400 px-4 py-2 rounded-xl">
            Admin Panel
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-8 p-8"
        >
          {/* Left Side */}
          <div className="space-y-6">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Item Name
              </label>

              <div className="flex items-center bg-gray-800 rounded-xl px-4">
                <FiCoffee className="text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Chicken Fried Rice"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Category
              </label>

              <div className="flex items-center bg-gray-800 rounded-xl px-4">
                <FiGrid className="text-gray-400" />
                <input
                  type="text"
                  name="category"
                  placeholder="Chinese / Indian"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none"
                />
              </div>
            </div>

            {/* Price */}
          <div>
  <label className="text-sm text-gray-400 mb-2 block">
    Price
  </label>

  <div className="flex items-center bg-gray-800 rounded-xl px-4">
    <FaRupeeSign className="text-gray-400 mr-2" />

    <input
      type="number"
      name="price"
      placeholder="220"
      value={form.price}
      onChange={handleChange}
      className="w-full bg-transparent p-4 outline-none"
    />
  </div>
</div>
            {/* Type */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Food Type
              </label>

              <div className="flex items-center bg-gray-800 rounded-xl px-4">
                <FiTag className="text-gray-400" />

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full bg-transparent p-4 outline-none"
                >
                  <option value="veg" className="bg-gray-900">
                    Veg
                  </option>

                  <option value="nonveg" className="bg-gray-900">
                    Non Veg
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Side Upload */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Upload Food Image
            </label>

            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-700 rounded-2xl h-80 flex flex-col justify-center items-center text-center cursor-pointer hover:border-orange-500 transition"
            >
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImage(e.target.files[0])}
              />

              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <>
                  <FiUploadCloud size={50} className="text-orange-400 mb-4" />
                  <p className="text-lg font-semibold">
                    Drag & Drop Image Here
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    or click to upload file
                  </p>
                </>
              )}
            </label>

            <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 transition py-4 rounded-xl font-semibold text-lg">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;