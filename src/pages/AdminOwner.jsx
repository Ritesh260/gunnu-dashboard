// AdminOwner.jsx

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  FaUserTie,
  FaSave,
  FaWhatsapp,
  FaAlignLeft,
  FaImage,
  FaCloudUploadAlt,
  FaTrash,
  FaCheckCircle,
  FaArrowLeft
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminOwner() {
  const fileRef = useRef();

  const [form, setForm] = useState({
    _id: "",
    name: "",
    smallTitle: "",
    heading1: "",
    heading2: "",
    description: "",
    feature1: "",
    feature2: "",
    feature3: "",
    whatsapp: "",
    experience: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchOwnerData();
  }, []);

const fetchOwnerData = async () => {
  try {
    const res = await axios.get(
      "https://gunnu-dashboard.onrender.com/api/owner"
    );

    if (res.data) {
      setForm(res.data);

      if (res.data.image) {
        setPreview(
          `https://gunnu-dashboard.onrender.com/uploads/${res.data.image}`
        );
      }
    }

    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image allowed");
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

 const updateData = async () => {
  try {
    setSaving(true);
    setSuccess("");

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      if (key !== "image") {
        data.append(key, form[key]);
      }
    });

    if (imageFile) {
      data.append("image", imageFile);
    }

    await axios.put(
      `https://gunnu-dashboard.onrender.com/api/owner/update/${form._id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setSuccess("Owner Section Updated Successfully");
    setSaving(false);

    fetchOwnerData();
  } catch (error) {
    console.log(error);
    alert("Update Failed");
    setSaving(false);
  }
};

  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 sm:p-6 lg:p-8">

      {/* Header */}
     {/* Header */}
<div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

  <div>
    <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 dark:text-white">
      <FaUserTie className="text-orange-500" />
      Admin Owner Panel
    </h1>

    <p className="text-gray-500 dark:text-gray-400 mt-2">
      Manage Owner Section Content, Image & Details
    </p>
  </div>

  <button
    onClick={() => navigate(-1)}
    className="px-5 py-3 bg-gray-800 hover:bg-black text-white rounded-xl font-semibold flex items-center gap-2 w-fit"
  >
    <FaArrowLeft />
    Back
  </button>

</div>

      {/* Card */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8">

        {/* Success */}
        {success && (
          <div className="mb-6 bg-green-100 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <FaCheckCircle />
            {success}
          </div>
        )}

        {/* Upload */}
        <div className="mb-10">
          <label className="font-semibold dark:text-white flex items-center gap-2 mb-4">
            <FaImage />
            Owner Image
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Preview */}
            <div className="border-2 border-dashed border-orange-300 rounded-2xl p-4 flex justify-center items-center min-h-[240px] bg-gray-50 dark:bg-gray-800">
              <img
                src={preview || "/Images/owner.jpeg"}
                alt="preview"
                className="w-52 h-52 object-cover rounded-2xl"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-col justify-center gap-4">

              <button
                type="button"
                onClick={() => fileRef.current.click()}
                className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold flex items-center justify-center gap-3"
              >
                <FaCloudUploadAlt />
                Upload Image
              </button>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImage}
                hidden
              />

              <button
                type="button"
                onClick={removeImage}
                className="px-5 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold flex items-center justify-center gap-3"
              >
                <FaTrash />
                Remove Image
              </button>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Recommended: Square image, JPG/PNG
              </p>

            </div>

          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Owner Name"
            className="inputStyle"
          />

          <input
            type="text"
            name="smallTitle"
            value={form.smallTitle}
            onChange={handleChange}
            placeholder="Small Title"
            className="inputStyle"
          />

          <input
            type="text"
            name="heading1"
            value={form.heading1}
            onChange={handleChange}
            placeholder="Heading 1"
            className="inputStyle"
          />

          <input
            type="text"
            name="heading2"
            value={form.heading2}
            onChange={handleChange}
            placeholder="Heading 2"
            className="inputStyle"
          />

          <input
            type="text"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="Experience"
            className="inputStyle"
          />

          <input
            type="text"
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
            placeholder="WhatsApp Number"
            className="inputStyle"
          />

        </div>

        {/* Description */}
        <div className="mt-5">
          <textarea
            rows="5"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="inputStyle w-full"
          />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">

          <input
            type="text"
            name="feature1"
            value={form.feature1}
            onChange={handleChange}
            placeholder="Feature 1"
            className="inputStyle"
          />

          <input
            type="text"
            name="feature2"
            value={form.feature2}
            onChange={handleChange}
            placeholder="Feature 2"
            className="inputStyle"
          />

          <input
            type="text"
            name="feature3"
            value={form.feature3}
            onChange={handleChange}
            placeholder="Feature 3"
            className="inputStyle"
          />

        </div>

        {/* Save */}
        <div className="mt-8">
          <button
            onClick={updateData}
            disabled={saving}
            className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold flex items-center justify-center gap-3"
          >
            <FaSave />
            {saving ? "Saving..." : "Update Owner Section"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdminOwner;