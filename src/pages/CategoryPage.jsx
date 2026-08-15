import React, { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaGripVertical,
  FaLeaf,
  FaDrumstickBite,
  FaSearch,
  FaTimes,
  FaImage,
} from "react-icons/fa";

const initialCategories = [
  {
    id: 1,
    name: "Veg Starter",
    type: "veg",
    image: "",
    active: true,
    order: 1,
  },
  {
    id: 2,
    name: "Veg Rice",
    type: "veg",
    image: "",
    active: true,
    order: 2,
  },
  {
    id: 3,
    name: "Veg Noodles",
    type: "veg",
    image: "",
    active: true,
    order: 3,
  },
  {
    id: 4,
    name: "Veg Bhel",
    type: "veg",
    image: "",
    active: true,
    order: 4,
  },
  {
    id: 5,
    name: "Non Veg Starter",
    type: "nonveg",
    image: "",
    active: true,
    order: 5,
  },
  {
    id: 6,
    name: "Non Veg Rice",
    type: "nonveg",
    image: "",
    active: true,
    order: 6,
  },
];

function CategoryPage() {
  const [categories, setCategories] = useState(initialCategories);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "veg",
    image: "",
    active: true,
  });

  /* ================= FILTER ================= */

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || category.type === filter;

    return matchesSearch && matchesFilter;
  });

  /* ================= FORM ================= */

  const openAddForm = () => {
    setEditingCategory(null);

    setForm({
      name: "",
      type: "veg",
      image: "",
      active: true,
    });

    setShowForm(true);
  };

  const openEditForm = (category) => {
    setEditingCategory(category);

    setForm({
      name: category.name,
      type: category.type,
      image: category.image,
      active: category.active,
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  /* ================= IMAGE ================= */

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      image: imageUrl,
    }));
  };

  /* ================= SAVE ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter category name");
      return;
    }

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === editingCategory.id
            ? {
                ...category,
                name: form.name,
                type: form.type,
                image: form.image,
                active: form.active,
              }
            : category
        )
      );
    } else {
      const newCategory = {
        id: Date.now(),
        name: form.name,
        type: form.type,
        image: form.image,
        active: form.active,
        order: categories.length + 1,
      };

      setCategories((prev) => [...prev, newCategory]);
    }

    closeForm();
  };

  /* ================= DELETE ================= */

  const deleteCategory = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    setCategories((prev) =>
      prev.filter((category) => category.id !== id)
    );
  };

  /* ================= STATUS ================= */

  const toggleStatus = (id) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              active: !category.active,
            }
          : category
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white p-4 sm:p-6 lg:p-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Categories
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your restaurant menu categories
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg transition w-full sm:w-fit"
        >
          <FaPlus />
          Add Category
        </button>

      </div>

      {/* ================= CONTROLS ================= */}

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-4 sm:p-5 mb-6 shadow-sm">

        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

          {/* FILTER */}

          <div className="flex flex-wrap gap-2">

            {[
              { key: "all", label: "All" },
              { key: "veg", label: "Veg" },
              { key: "nonveg", label: "Non Veg" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition ${
                  filter === item.key
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700"
                }`}
              >
                {item.label}
              </button>
            ))}

          </div>

          {/* SEARCH */}

          <div className="relative w-full lg:w-80">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-orange-500 outline-none rounded-xl py-3 pl-11 pr-4 text-sm"
            />

          </div>

        </div>

      </div>

      {/* ================= CATEGORY LIST ================= */}

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[30px] shadow-sm overflow-hidden">

        {/* DESKTOP */}

        <div className="hidden lg:block overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-gray-100 dark:bg-gray-800">

              <tr>

                <th className="p-5 w-16">Order</th>

                <th className="p-5">Image</th>

                <th className="p-5">Category</th>

                <th className="p-5">Type</th>

                <th className="p-5">Status</th>

                <th className="p-5">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredCategories.map((category) => (

                <tr
                  key={category.id}
                  className="border-t border-gray-200 dark:border-gray-800 hover:bg-orange-50 dark:hover:bg-gray-800/40 transition"
                >

                  {/* DRAG HANDLE */}

                  <td className="p-5">

                    <button
                      className="text-gray-400 hover:text-orange-500 cursor-grab"
                      title="Drag to reorder"
                    >
                      <FaGripVertical />
                    </button>

                  </td>

                  {/* IMAGE */}

                  <td className="p-5">

                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-16 h-16 rounded-2xl object-cover shadow"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                        <FaImage size={22} />
                      </div>
                    )}

                  </td>

                  {/* NAME */}

                  <td className="p-5">

                    <h3 className="font-bold text-lg">
                      {category.name}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      Order #{category.order}
                    </p>

                  </td>

                  {/* TYPE */}

                  <td className="p-5">

                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                        category.type === "veg"
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >

                      {category.type === "veg" ? (
                        <FaLeaf />
                      ) : (
                        <FaDrumstickBite />
                      )}

                      {category.type === "veg"
                        ? "Veg"
                        : "Non Veg"}

                    </span>

                  </td>

                  {/* STATUS */}

                  <td className="p-5">

                    <button
                      onClick={() => toggleStatus(category.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                        category.active
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {category.active ? "Active" : "Inactive"}
                    </button>

                  </td>

                  {/* ACTIONS */}

                  <td className="p-5">

                    <div className="flex gap-2">

                      <button
                        onClick={() => openEditForm(category)}
                        className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl transition"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* ================= MOBILE ================= */}

        <div className="lg:hidden p-4 space-y-4">

          {filteredCategories.map((category) => (

            <div
              key={category.id}
              className="border border-gray-200 dark:border-gray-800 rounded-3xl p-4"
            >

              <div className="flex gap-4">

                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                    <FaImage size={24} />
                  </div>
                )}

                <div className="flex-1">

                  <div className="flex justify-between gap-3">

                    <h3 className="font-bold text-lg">
                      {category.name}
                    </h3>

                    <FaGripVertical className="text-gray-400 mt-1" />

                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        category.type === "veg"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {category.type === "veg"
                        ? "Veg"
                        : "Non Veg"}
                    </span>

                    <button
                      onClick={() => toggleStatus(category.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        category.active
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {category.active
                        ? "Active"
                        : "Inactive"}
                    </button>

                  </div>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">

                <button
                  onClick={() => openEditForm(category)}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
                >
                  <FaEdit />
                  Edit
                </button>

                <button
                  onClick={() => deleteCategory(category.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
                >
                  <FaTrash />
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

        {filteredCategories.length === 0 && (
          <div className="p-12 text-center">

            <FaTags className="mx-auto text-gray-300 dark:text-gray-700 text-4xl mb-4" />

            <h3 className="font-bold text-lg">
              No Categories Found
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Try another search or add a new category.
            </p>

          </div>
        )}

      </div>

      {/* ================= FORM MODAL ================= */}

      {showForm && (

        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-[30px] shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[95vh] overflow-y-auto">

            {/* FORM HEADER */}

            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">

              <div>

                <h2 className="text-xl sm:text-2xl font-bold">
                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Create a menu category for your restaurant
                </p>

              </div>

              <button
                onClick={closeForm}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white flex items-center justify-center transition"
              >
                <FaTimes />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* CATEGORY NAME */}

              <div>

                <label className="block text-sm font-semibold mb-2">
                  Category Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Veg Starter"
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-orange-500 outline-none"
                />

              </div>

              {/* TYPE */}

              <div>

                <label className="block text-sm font-semibold mb-2">
                  Food Type
                </label>

                <div className="grid grid-cols-2 gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        type: "veg",
                      })
                    }
                    className={`py-3 rounded-xl font-semibold flex items-center justify-center gap-2 border transition ${
                      form.type === "veg"
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-gray-100 dark:bg-gray-800 border-transparent"
                    }`}
                  >
                    <FaLeaf />
                    Veg
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        type: "nonveg",
                      })
                    }
                    className={`py-3 rounded-xl font-semibold flex items-center justify-center gap-2 border transition ${
                      form.type === "nonveg"
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-gray-100 dark:bg-gray-800 border-transparent"
                    }`}
                  >
                    <FaDrumstickBite />
                    Non Veg
                  </button>

                </div>

              </div>

              {/* IMAGE */}

              <div>

                <label className="block text-sm font-semibold mb-2">
                  Category Image
                </label>

                <label className="block cursor-pointer">

                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-5 text-center hover:border-orange-500 transition">

                    {form.image ? (
                      <img
                        src={form.image}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-xl"
                      />
                    ) : (
                      <>
                        <FaImage className="mx-auto text-gray-400 text-3xl mb-2" />

                        <p className="text-sm text-gray-500">
                          Click to upload category image
                        </p>
                      </>
                    )}

                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />

                </label>

              </div>

              {/* STATUS */}

              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">

                <div>

                  <p className="font-semibold">
                    Category Status
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Show this category on the menu
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      active: !form.active,
                    })
                  }
                  className={`w-14 h-8 rounded-full p-1 transition ${
                    form.active
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                >
                  <span
                    className={`block w-6 h-6 bg-white rounded-full transition ${
                      form.active
                        ? "translate-x-6"
                        : "translate-x-0"
                    }`}
                  />
                </button>

              </div>

              {/* BUTTONS */}

              <div className="grid grid-cols-2 gap-3 pt-2">

                <button
                  type="button"
                  onClick={closeForm}
                  className="py-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg"
                >
                  {editingCategory
                    ? "Update Category"
                    : "Create Category"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default CategoryPage;