"use client";
import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const mockUsers = [
  {
    id: 1,
    image: "/vercel.svg",
    name: "Lahiru Rathnayake",
    email: "Example@gmail.com",
    username: "apex1212",
    role: "Admin",
  },
  {
    id: 2,
    image: "/vercel.svg",
    name: "Lahiru Rathnayake",
    email: "Example@gmail.com",
    username: "apex1212",
    role: "User",
  },
  {
    id: 3,
    image: "/vercel.svg",
    name: "Lahiru Rathnayake",
    email: "Example@gmail.com",
    username: "apex1212",
    role: "User",
  },
  {
    id: 4,
    image: "/vercel.svg",
    name: "Lahiru Rathnayake",
    email: "Example@gmail.com",
    username: "apex1212",
    role: "User",
  },
  {
    id: 5,
    image: "/vercel.svg",
    name: "Lahiru Rathnayake",
    email: "Example@gmail.com",
    username: "apex1212",
    role: "User",
  },
  {
    id: 6,
    image: "/vercel.svg",
    name: "Lahiru Rathnayake",
    email: "Example@gmail.com",
    username: "apex1212",
    role: "User",
  },
  {
    id: 7,
    image: "/vercel.svg",
    name: "Lahiru Rathnayake",
    email: "Example@gmail.com",
    username: "apex1212",
    role: "User",
  },
  {
    id: 8,
    image: "/vercel.svg",
    name: "Lahiru Rathnayake",
    email: "Example@gmail.com",
    username: "apex1212",
    role: "User",
  },
  {
    id: 9,
    image: "/vercel.svg",
    name: "Lahiru Rathnayake",
    email: "Example@gmail.com",
    username: "apex1212",
    role: "User",
  },
  {
    id: 10,
    image: "/vercel.svg",
    name: "Lahiru Rathnayake",
    email: "Example@gmail.com",
    username: "apex1212",
    role: "User",
  },
];

export default function UsersPage() {
  const [users] = useState(mockUsers);
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(users.length / pageSize);
  const paginatedUsers = users.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen bg-[#081028]">
      <div className="mx-4 md:mx-8 pt-6 md:pt-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Users <span className="text-lg font-normal text-gray-400 ml-4">All Users</span></h1>
          <input
            type="text"
            placeholder="Search for..."
            className="w-64 px-4 py-2 rounded-lg bg-[#181F36] text-sm text-white placeholder-gray-400 focus:outline-none border border-[#232B43]"
          />
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto rounded-2xl shadow-xl bg-[#101936]">
          <table className="min-w-full text-white">
            <thead>
              <tr className="bg-[#19213A] text-[#C7C7C7] text-left text-sm">
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Username</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, idx) => (
                <tr
                  key={user.id + '-' + idx}
                  className={
                    idx % 2 === 0
                      ? "bg-[#181F36] hover:bg-[#232B43] transition-colors"
                      : "bg-[#081028] hover:bg-[#232B43] transition-colors"
                  }
                >
                  <td className="px-6 py-4">
                    <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                  </td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4 flex gap-4 text-lg">
                    <button className="hover:text-[#7ED7FF] transition-colors" title="View"><FaEye /></button>
                    <button className="hover:text-[#E100FF] transition-colors" title="Edit"><FaEdit /></button>
                    <button className="hover:text-red-500 transition-colors" title="Delete"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {paginatedUsers.map((user, idx) => (
            <div
              key={user.id + '-' + idx}
              className="bg-[#101936] rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h3 className="text-white font-semibold text-lg">{user.name}</h3>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-[#19213A] hover:bg-[#7ED7FF] hover:text-black transition-colors" title="View">
                    <FaEye className="text-white" />
                  </button>
                  <button className="p-2 rounded-lg bg-[#19213A] hover:bg-[#E100FF] hover:text-black transition-colors" title="Edit">
                    <FaEdit className="text-white" />
                  </button>
                  <button className="p-2 rounded-lg bg-[#19213A] hover:bg-red-500 hover:text-black transition-colors" title="Delete">
                    <FaTrash className="text-white" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Username:</span>
                  <p className="text-white font-medium">{user.username}</p>
                </div>
                <div>
                  <span className="text-gray-400">Role:</span>
                  <p className="text-white font-medium">{user.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 mb-6 md:mb-8 text-white gap-4">
          <span className="text-sm text-gray-400 text-center md:text-left">
            Showing data {users.length === 0 ? 0 : (page - 1) * pageSize + 1} to {Math.min(page * pageSize, users.length)} of {users.length} entries
          </span>
          <div className="flex gap-2 items-center justify-center">
            <button
              className={`w-8 h-8 rounded-full flex items-center justify-center ${page === 1 ? 'bg-[#232B43] text-gray-500' : 'bg-[#232B43] hover:bg-[#E100FF] hover:text-white'} transition-colors`}
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${page === num ? 'bg-[#E100FF] text-white' : 'bg-[#232B43] text-gray-300 hover:bg-[#E100FF] hover:text-white'} transition-colors`}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            ))}
            <button
              className={`w-8 h-8 rounded-full flex items-center justify-center ${page === totalPages ? 'bg-[#232B43] text-gray-500' : 'bg-[#232B43] hover:bg-[#E100FF] hover:text-white'} transition-colors`}
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 