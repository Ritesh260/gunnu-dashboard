import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  FaTrash,
  FaCloudUploadAlt,
  FaFire,
} from "react-icons/fa";

function SpecialAdmin() {

  const [specials, setSpecials] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "veg",
    badge: "",
    desc: "",
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const [dragActive, setDragActive] = useState(false);

  const token = localStorage.getItem("token");

  /* FETCH */
  const fetchSpecials = async () => {
    try {

      const res = await axios.get(
        "https://gunnu-dashboard.onrender.com/api/special"
      );

      setSpecials(res.data.specials || []);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load specials");

    }
  };

  useEffect(() => {
    fetchSpecials();
  }, []);

  /* INPUT CHANGE */
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  /* FILE HANDLE */
  const handleFile = (file) => {

    if (!file) return;

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );

  };

  /* DRAG EVENTS */
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {

    e.preventDefault();

    setDragActive(false);

    const file = e.dataTransfer.files[0];

    handleFile(file);

  };

  /* ADD SPECIAL */
  const handleUpload = async () => {

    if (!image) {
      return toast.error("Select image");
    }

    try {

      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("type", formData.type);
      data.append("badge", formData.badge);
      data.append("desc", formData.desc);

      data.append("image", image);

      await axios.post(
        "https://gunnu-dashboard.onrender.com/api/special/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Special Added 🔥");

      setFormData({
        name: "",
        price: "",
        type: "veg",
        badge: "",
        desc: "",
      });

      setImage(null);

      setPreview(null);

      fetchSpecials();

    } catch (error) {

      console.log(error);

      toast.error("Upload Failed");

    } finally {

      setLoading(false);

    }
  };

  /* DELETE */
  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `https://gunnu-dashboard.onrender.com/api/special/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Deleted");

      fetchSpecials();

    } catch (error) {

      console.log(error);

      toast.error("Delete Failed");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white p-6">

      {/* TITLE */}
      <div className="flex items-center gap-3 mb-8">

        <FaFire className="text-orange-500 text-3xl" />

        <div>
          <h1 className="text-3xl font-bold">
            Today's Specials
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Manage special dishes
          </p>
        </div>

      </div>

      {/* FORM */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            name="name"
            placeholder="Dish Name"
            value={formData.name}
            onChange={handleChange}
            className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 outline-none"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 outline-none"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 outline-none"
          >
            <option value="veg">Veg</option>
            <option value="nonveg">Non Veg</option>
          </select>

          <input
            type="text"
            name="badge"
            placeholder="Badge (Popular, Hot Seller)"
            value={formData.badge}
            onChange={handleChange}
            className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 outline-none"
          />

        </div>

        {/* DESC */}
        <textarea
          name="desc"
          placeholder="Description"
          value={formData.desc}
          onChange={handleChange}
          rows="4"
          className="w-full mt-5 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 outline-none"
        />

        {/* DRAG DROP */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`mt-6 border-2 border-dashed rounded-3xl p-10 text-center transition-all ${
            dragActive
              ? "border-orange-500 bg-orange-100 dark:bg-orange-900/20"
              : "border-gray-300 dark:border-gray-700"
          }`}
        >

          <FaCloudUploadAlt className="mx-auto text-5xl text-orange-500 mb-4" />

          <h3 className="text-xl font-semibold">
            Drag & Drop Image Here
          </h3>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            or click below to choose file
          </p>

          <label className="inline-flex items-center gap-3 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-2xl mt-6 font-semibold">

            <FaCloudUploadAlt />

            Choose Image

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                handleFile(e.target.files[0]);
              }}
            />

          </label>

        </div>

        {/* PREVIEW */}
        {preview && (
          <div className="mt-6">

            <h3 className="font-semibold mb-3">
              Image Preview
            </h3>

            <img
              src={preview}
              alt="preview"
              className="w-60 h-60 object-cover rounded-3xl border border-gray-200 dark:border-gray-700"
            />

          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          {loading
            ? "Uploading..."
            : "Add Special"}
        </button>

      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

        {specials.map((item) => (

          <div
            key={item._id}
            className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg"
          >

            {/* IMAGE */}
            <div className="relative">

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-60 object-cover"
              />

              <span className="absolute top-4 left-4 bg-gradient-to-r from-red-800 to-yellow-500 text-white text-xs px-4 py-2 rounded-full font-semibold">
                {item.badge}
              </span>

            </div>

            {/* CONTENT */}
            <div className="p-5">

              <div className="flex justify-between items-center">

                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                <span className="text-orange-500 font-bold">
                  ₹{item.price}
                </span>

              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 line-clamp-2">
                {item.desc}
              </p>

              <div className="flex items-center justify-between mt-5">

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    item.type === "veg"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {item.type === "veg"
                    ? "Veg"
                    : "Non Veg"}
                </span>

                <button
                  onClick={() =>
                    handleDelete(item._id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
                >
                  <FaTrash />
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default SpecialAdmin;