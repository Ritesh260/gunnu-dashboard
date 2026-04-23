// AdminOwner.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserTie,
  FaSave,
  FaWhatsapp,
  FaAlignLeft,
  FaImage,
} from "react-icons/fa";

function AdminOwner() {
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* FETCH */
  useEffect(() => {
    fetchOwnerData();
  }, []);

  const fetchOwnerData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/owner");

      if (res.data) {
        setForm(res.data);

        if (res.data.image) {
          setPreview(
            `http://localhost:5000/uploads/${res.data.image}`
          );
        }
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /* TEXT INPUT */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* IMAGE INPUT */
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /* UPDATE */
  const updateData = async () => {
    try {
      setSaving(true);

      const data = new FormData();

      data.append("name", form.name);
      data.append("smallTitle", form.smallTitle);
      data.append("heading1", form.heading1);
      data.append("heading2", form.heading2);
      data.append("description", form.description);
      data.append("feature1", form.feature1);
      data.append("feature2", form.feature2);
      data.append("feature3", form.feature3);
      data.append("whatsapp", form.whatsapp);
      data.append("experience", form.experience);

      if (imageFile) {
        data.append("image", imageFile);
      }

      await axios.put(
        `http://localhost:5000/api/owner/update/${form._id}`,
        data
      );

      alert("Updated Successfully");
      setSaving(false);
    } catch (error) {
      console.log(error);
      alert("Update Failed");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 dark:bg-gray-950 min-h-screen">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 dark:text-white">
          <FaUserTie className="text-orange-500" />
          Admin Owner Panel
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Update Owner Section Content + Image
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 sm:p-6">

        {/* IMAGE */}
        <div className="mb-8">

          <label className="font-medium dark:text-white flex items-center gap-2">
            <FaImage />
            Owner Image
          </label>

          <div className="mt-4 flex flex-col sm:flex-row gap-5 items-start sm:items-center">

            <img
              src={preview || "/Images/owner.jpeg"}
              alt="Preview"
              className="w-32 h-32 rounded-2xl object-cover border"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full text-sm dark:text-white"
            />

          </div>

        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Owner Name"
            className="px-4 py-3 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

          <input
            type="text"
            name="smallTitle"
            value={form.smallTitle}
            onChange={handleChange}
            placeholder="Small Title"
            className="px-4 py-3 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

          <input
            type="text"
            name="heading1"
            value={form.heading1}
            onChange={handleChange}
            placeholder="Heading 1"
            className="px-4 py-3 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

          <input
            type="text"
            name="heading2"
            value={form.heading2}
            onChange={handleChange}
            placeholder="Heading 2"
            className="px-4 py-3 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

          <input
            type="text"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="Experience"
            className="px-4 py-3 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

          <input
            type="text"
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
            placeholder="WhatsApp Number"
            className="px-4 py-3 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

        </div>

        {/* DESCRIPTION */}
        <textarea
          rows="5"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mt-5 px-4 py-3 rounded-xl border dark:bg-gray-800 dark:text-white"
        />

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">

          <input
            type="text"
            name="feature1"
            value={form.feature1}
            onChange={handleChange}
            placeholder="Feature 1"
            className="px-4 py-3 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

          <input
            type="text"
            name="feature2"
            value={form.feature2}
            onChange={handleChange}
            placeholder="Feature 2"
            className="px-4 py-3 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

          <input
            type="text"
            name="feature3"
            value={form.feature3}
            onChange={handleChange}
            placeholder="Feature 3"
            className="px-4 py-3 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={updateData}
          disabled={saving}
          className="mt-8 w-full sm:w-auto px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold flex items-center justify-center gap-3"
        >
          <FaSave />
          {saving ? "Saving..." : "Update Owner Section"}
        </button>

      </div>
    </div>
  );
}

export default AdminOwner;