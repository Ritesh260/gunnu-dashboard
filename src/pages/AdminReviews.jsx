import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://gunnu-dashboard.onrender.com/api/reviews";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const res = await axios.get(`${API}/all`);
    setReviews(res.data);
  };

  const approveReview = async (id) => {
    await axios.put(`${API}/${id}/approve`);
    fetchReviews();
  };

  const deleteReview = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchReviews();
  };

  // 🔥 FILTER LOGIC
  const filteredReviews = reviews.filter((r) => {
    if (filter === "approved") return r.approved;
    if (filter === "pending") return !r.approved;
    return true;
  });

  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>

        {/* FILTER BUTTONS */}
        <div className="flex gap-2 mt-3 sm:mt-0">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              filter === "all"
                ? "bg-orange-500"
                : "bg-gray-700"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg ${
              filter === "pending"
                ? "bg-yellow-500 text-black"
                : "bg-gray-700"
            }`}
          >
            Pending
          </button>

          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 rounded-lg ${
              filter === "approved"
                ? "bg-green-500"
                : "bg-gray-700"
            }`}
          >
            Approved
          </button>
        </div>
      </div>

      {/* NO DATA */}
      {filteredReviews.length === 0 && (
        <p className="text-gray-400">No reviews found</p>
      )}

      {/* REVIEW CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((item) => (
          <div
            key={item._id}
            className="bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-md"
          >

            {/* USER */}
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                className="w-14 h-14 rounded-full object-cover border border-orange-500"
              />

              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.role}</p>
              </div>
            </div>

            {/* STATUS */}
            <div className="mt-3">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.approved
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {item.approved ? "Approved" : "Pending"}
              </span>
            </div>

            {/* REVIEW TEXT */}
            <p className="text-gray-300 mt-4 text-sm leading-relaxed">
              "{item.review}"
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-5">

              {!item.approved && (
                <button
                  onClick={() => approveReview(item._id)}
                  className="bg-green-500 px-4 py-2 rounded-lg text-sm"
                >
                  Approve
                </button>
              )}

              <button
                onClick={() => deleteReview(item._id)}
                className="bg-red-500 px-4 py-2 rounded-lg text-sm"
              >
                Delete
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReviews;