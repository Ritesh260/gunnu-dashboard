// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FaEye,
//   FaEdit,
//   FaTrash,
//   FaTimes,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";

// function MenuList() {
//   const [items, setItems] = useState([]);
//   const [viewItem, setViewItem] = useState(null);

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/menu"
//       );

//       setItems(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteItem = async (id) => {
//     const confirmDelete = window.confirm(
//       "Delete this item?"
//     );

//     if (!confirmDelete) return;

//     await axios.delete(
//       `http://localhost:5000/api/menu/${id}`
//     );

//     fetchItems();
//   };

//   return (
//     <div className="p-8">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold">
//             Menu List
//           </h1>

//           <p className="text-gray-400 mt-2">
//             All food items available in store
//           </p>
//         </div>

//         <Link
//           to="/menu/add"
//           className="bg-orange-500 px-5 py-3 rounded-xl hover:bg-orange-600"
//         >
//           + Add Item
//         </Link>
//       </div>

//       {/* Table */}
//       <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">

//         <table className="w-full text-left">
//           <thead className="bg-gray-800 text-gray-300">
//             <tr>
//               <th className="p-4">Image</th>
//               <th className="p-4">Name</th>
//               <th className="p-4">Category</th>
//               <th className="p-4">Price</th>
//               <th className="p-4">Type</th>
//               <th className="p-4">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {items.map((item) => (
//               <tr
//                 key={item._id}
//                 className="border-t border-gray-800 hover:bg-gray-800/50"
//               >
//                 <td className="p-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-14 h-14 rounded-xl object-cover"
//                   />
//                 </td>

//                 <td className="p-4 font-medium">
//                   {item.name}
//                 </td>

//                 <td className="p-4">
//                   {item.category}
//                 </td>

//                 <td className="p-4">
//                   ₹{item.price}
//                 </td>

//                 <td className="p-4 capitalize">
//                   {item.type}
//                 </td>

//                 <td className="p-4">
//                   <div className="flex gap-3">

//                     {/* View */}
//                     <button
//                       onClick={() =>
//                         setViewItem(item)
//                       }
//                       className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600"
//                     >
//                       <FaEye />
//                     </button>

//                     {/* Edit */}
//                     <Link
//                       to={`/menu/edit/${item._id}`}
//                       className="bg-orange-500 p-2 rounded-lg hover:bg-orange-600"
//                     >
//                       <FaEdit />
//                     </Link>

//                     {/* Delete */}
//                     <button
//                       onClick={() =>
//                         deleteItem(item._id)
//                       }
//                       className="bg-red-500 p-2 rounded-lg hover:bg-red-600"
//                     >
//                       <FaTrash />
//                     </button>

//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//       </div>

//       {/* VIEW MODAL */}
//       {viewItem && (
//         <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

//           <div className="bg-gray-900 w-[420px] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">

//             {/* Top Image */}
//             <img
//               src={viewItem.image}
//               alt={viewItem.name}
//               className="w-full h-60 object-cover"
//             />

//             {/* Body */}
//             <div className="p-6">

//               <div className="flex justify-between items-start">
//                 <div>
//                   <h2 className="text-2xl font-bold">
//                     {viewItem.name}
//                   </h2>

//                   <p className="text-gray-400 mt-1">
//                     {viewItem.category}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() =>
//                     setViewItem(null)
//                   }
//                   className="text-gray-400 hover:text-white"
//                 >
//                   <FaTimes size={20} />
//                 </button>
//               </div>

//               <div className="mt-6 space-y-3">

//                 <div className="flex justify-between">
//                   <span className="text-gray-400">
//                     Price
//                   </span>

//                   <span className="font-semibold">
//                     ₹{viewItem.price}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-400">
//                     Food Type
//                   </span>

//                   <span className="capitalize font-semibold">
//                     {viewItem.type}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-400">
//                     ID
//                   </span>

//                   <span className="text-xs text-gray-500">
//                     {viewItem._id}
//                   </span>
//                 </div>

//               </div>

//               <button
//                 onClick={() =>
//                   setViewItem(null)
//                 }
//                 className="w-full mt-6 bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold"
//               >
//                 Close
//               </button>

//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MenuList;