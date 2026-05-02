import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
    FaTrash,
    FaTimes,
    FaCloudUploadAlt,
} from "react-icons/fa";

function GalleryAdmin() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [images, setImages] = useState([]);
    const [modal, setModal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const token = localStorage.getItem("token");

    /* FETCH */
    const fetchImages = async () => {
        try {
            const res = await axios.get(
                "https://gunnu-dashboard.onrender.com/api/gallery"
            );
            setImages(res.data.images || []);
        } catch (err) {
            console.log(err);
            toast.error("Failed to load images");
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    /* UPLOAD */
    const handleUpload = async () => {
        if (!image) return toast.error("Select image first");

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("image", image);

            await axios.post(
                "https://gunnu-dashboard.onrender.com/api/gallery/add",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Uploaded successfully 🔥");
            setImage(null);
            setPreview(null);
            fetchImages();
        } catch (err) {
            console.log(err);
            toast.error("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    /* DELETE */
    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `https://gunnu-dashboard.onrender.com/api/gallery/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success("Deleted");
            fetchImages();
        } catch (err) {
            console.log(err);
            toast.error("Delete failed");
        }
    };

    /* DRAG EVENTS */
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files[0];
        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    /* ESC MODAL */
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setModal(null);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-950 text-black dark:text-white">

            {/* TITLE */}
            <h1 className="text-3xl font-bold mb-6 text-orange-500">
                Gallery Manager
            </h1>

            {/* UPLOAD BOX */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border-2 transition
        ${dragActive ? "border-orange-500 bg-orange-50 dark:bg-gray-800" : "border-dashed border-gray-300 dark:border-gray-700"}`}
            >

                <div className="text-center">

                    <FaCloudUploadAlt className="mx-auto text-4xl text-orange-500 mb-3" />

                    <p className="text-lg font-semibold">
                        Drag & Drop your image here
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        or click below to select file
                    </p>

                    {/* INPUT */}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="fileUpload"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;

                            setImage(file);
                            setPreview(URL.createObjectURL(file));
                        }}
                    />

                    <label
                        htmlFor="fileUpload"
                        className="inline-block mt-4 px-5 py-2 bg-gray-800 text-white rounded-xl cursor-pointer hover:bg-black transition"
                    >
                        Choose File
                    </label>

                    {/* UPLOAD BTN */}
                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="ml-3 px-5 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:scale-105 transition disabled:opacity-50"
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                </div>

                {/* PREVIEW */}
                {preview && (
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500 mb-2">Preview</p>
                        <img
                            src={preview}
                            className="w-56 h-56 mx-auto object-cover rounded-2xl shadow-lg"
                        />
                    </div>
                )}
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">

                {images.map((img) => (
                    <div
                        key={img._id}
                        className="relative group rounded-2xl overflow-hidden shadow-lg"
                    >

                        <img
                            src={img.image}
                            className="w-full h-48 object-cover cursor-pointer group-hover:scale-110 transition duration-300"
                            onClick={() => setModal(img.image)}
                        />

                        {/* DELETE */}
                        <button
                            onClick={() => handleDelete(img._id)}
                            className="
    absolute top-3 right-3
    bg-red-500 p-2 rounded-full
    opacity-100 md:opacity-0
    md:group-hover:opacity-100
    transition
  "
                        >
                            <FaTrash />
                        </button>

                    </div>
                ))}

            </div>

            {/* MODAL */}
            {modal && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

                    <button
                        onClick={() => setModal(null)}
                        className="absolute top-5 right-5 text-white hover:text-red-400"
                    >
                        <FaTimes size={32} />
                    </button>

                    <img
                        src={modal}
                        className="max-w-[90%] max-h-[90%] rounded-2xl shadow-2xl"
                    />

                </div>
            )}

        </div>
    );
}

export default GalleryAdmin;