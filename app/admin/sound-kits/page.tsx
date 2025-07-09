"use client";
import React, { useEffect, useState } from "react";
import { getSoundKits, SoundKit } from "./data";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function SoundKitsPage() {
  const [soundKits, setSoundKits] = useState<SoundKit[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    getSoundKits().then(setSoundKits);
  }, []);

  const totalPages = Math.ceil(soundKits.length / pageSize);
  const paginatedKits = soundKits.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-[#081028]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Sound Kits <span className="text-lg font-normal text-gray-400 ml-4">All Sound Kits</span></h1>
        <input
          type="text"
          placeholder="Search for..."
          className="w-full sm:w-64 px-4 py-2 rounded-lg bg-[#181F36] text-sm text-white placeholder-gray-400 focus:outline-none border border-[#232B43]"
        />
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow-xl bg-[#101936]">
        <table className="min-w-full text-white">
          <thead>
            <tr className="bg-[#232B43] text-[#C7C7C7] text-left text-sm">
              <th className="px-6 py-4 font-semibold">Image</th>
              <th className="px-6 py-4 font-semibold">Sound ID</th>
              <th className="px-6 py-4 font-semibold">Sound Name</th>
              <th className="px-6 py-4 font-semibold">Musician</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedKits.map((kit, idx) => (
              <tr
                key={kit.id + '-' + idx}
                className={
                  idx % 2 === 0
                    ? "bg-[#181F36] hover:bg-[#232B43] transition-colors"
                    : "bg-[#081028] hover:bg-[#232B43] transition-colors"
                }
              >
                <td className="px-6 py-4">
                  <img src={kit.image} alt={kit.soundKitName} className="w-10 h-10 rounded-full object-cover" />
                </td>
                <td className="px-6 py-4">{kit.soundKitId}</td>
                <td className="px-6 py-4">{kit.soundKitName}</td>
                <td className="px-6 py-4">{kit.musician}</td>
                <td className="px-6 py-4">{kit.price}</td>
                <td className="px-6 py-4 flex gap-4 text-lg">
                  <button className="text-white hover:text-[#7ED7FF] transition-colors" title="View"><FaEye /></button>
                  <button className="text-white hover:text-[#E100FF] transition-colors" title="Edit"><FaEdit /></button>
                  <button className="text-white hover:text-red-500 transition-colors" title="Delete"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View */}
      <div className="md:hidden space-y-4">
        {paginatedKits.map((kit, idx) => (
          <div
            key={kit.id + '-' + idx}
            className="bg-[#101936] rounded-xl p-4 shadow-lg border border-[#232B43]"
          >
            <div className="flex items-start gap-4 mb-3">
              <img 
                src={kit.image} 
                alt={kit.soundKitName} 
                className="w-16 h-16 rounded-full object-cover flex-shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-1 truncate">{kit.soundKitName}</h3>
                <p className="text-[#7ED7FF] text-sm mb-1">{kit.musician}</p>
                <p className="text-gray-400 text-sm">ID: {kit.soundKitId}</p>
                <p className="text-[#E100FF] font-semibold text-sm">{kit.price}</p>
              </div>
            </div>
            <div className="flex gap-3 text-lg justify-end">
              <button className="text-white hover:text-[#7ED7FF] transition-colors p-1" title="View">
                <FaEye />
              </button>
              <button className="text-white hover:text-[#E100FF] transition-colors p-1" title="Edit">
                <FaEdit />
              </button>
              <button className="text-white hover:text-red-500 transition-colors p-1" title="Delete">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 text-white gap-4">
        <span className="text-sm text-gray-400 text-center sm:text-left">
          Showing data {soundKits.length === 0 ? 0 : (page - 1) * pageSize + 1} to {Math.min(page * pageSize, soundKits.length)} of {soundKits.length} entries
        </span>
        <div className="flex gap-2 items-center">
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
  );
} 