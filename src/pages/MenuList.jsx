import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function MenuList() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/menu"
      );
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this item?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/menu/${id}`
      );

      fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-gray-950 min-h-screen text-white">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Menu Management
          </h1>

          <p className="text-gray-400 mt-2">
            Manage all food items
          </p>
        </div>

        <button
          onClick={() => navigate("/menu/add")}
          className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-xl flex items-center gap-2 font-semibold"
        >
          <FiPlus />
          Add Item
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-800 text-left">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Type</th>
                <th className="p-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-800 hover:bg-gray-800/40"
                >
                  {/* Image */}
                  <td className="p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>

                  {/* Name */}
                  <td className="p-4 font-medium">
                    {item.name}
                  </td>

                  {/* Category */}
                  <td className="p-4 text-gray-300">
                    {item.category}
                  </td>

                  {/* Price */}
                  <td className="p-4">
                    ₹{item.price}
                  </td>

                  {/* Type */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.type === "veg"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">

                      {/* View */}
                      <button
                        className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                      >
                        <FiEye size={18} />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() =>
                          navigate(`/menu/edit/${item._id}`)
                        }
                        className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                      >
                        <FiEdit size={18} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          deleteItem(item._id)
                        }
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      >
                        <FiTrash2 size={18} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-8 text-gray-400"
                  >
                    No menu items found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}

export default MenuList;