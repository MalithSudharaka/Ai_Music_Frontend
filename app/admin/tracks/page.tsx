"use client";
import React, { useEffect, useState } from "react";
import { getTracks, Track } from "./data";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function TracksPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(tracks.length / pageSize);

  useEffect(() => {
    getTracks().then(setTracks);
  }, []);

  const paginatedTracks = tracks.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen p-8 rounded-xl bg-[#081028]">
      <h1 className="text-3xl font-bold text-white mb-8 ">Track Management <span className="text-lg font-normal text-gray-400 ml-4">All Tracks</span></h1>
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for..."
            className="w-64 px-4 py-2 rounded-lg bg-[#181F36] text-sm text-white placeholder-gray-400 focus:outline-none border border-[#232B43]"
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl shadow-xl bg-[#081028]">
        {/* Table for md+ screens */}
        <table className="min-w-full text-white hidden md:table">
          <thead>
            <tr className="bg-[#232B43] text-[#C7C7C7] text-left text-sm">
              <th className="px-6 py-4 font-semibold">Track Image</th>
              <th className="px-6 py-4 font-semibold">Track ID</th>
              <th className="px-6 py-4 font-semibold">Track Name</th>
              <th className="px-6 py-4 font-semibold">Musician</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Track Key</th>
              <th className="px-6 py-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTracks.map((track, idx) => (
              <tr
                key={track.id}
                className={
                  idx % 2 === 0
                    ? "bg-[#101936] hover:bg-[#232B43] transition-colors"
                    : "bg-[#081028] hover:bg-[#232B43] transition-colors"
                }
              >
                <td className="px-6 py-4">
                  <img src={track.trackImage} alt="Track" className="w-10 h-10 rounded-full border-2 border-[#E100FF] bg-white object-cover" />
                </td>
                <td className="px-6 py-4 font-mono">{track.trackId}</td>
                <td className="px-6 py-4">{track.trackName}</td>
                <td className="px-6 py-4 text-[#7ED7FF]">{track.musician}</td>
                <td className="px-6 py-4 text-[#E100FF] font-semibold">{track.price}</td>
                <td className="px-6 py-4">{track.trackKey}</td>
                <td className="px-6 py-4 flex gap-4 text-lg">
                  <button className="text-white hover:text-[#7ED7FF] transition-colors" title="View"><FaEye /></button>
                  <button className="text-white hover:text-[#E100FF] transition-colors" title="Edit"><FaEdit /></button>
                  <button className="text-white hover:text-red-500 transition-colors" title="Delete"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Cards for mobile screens */}
        <div className="md:hidden flex flex-col gap-4 p-2">
          {paginatedTracks.map((track, idx) => (
            <div key={track.id} className="bg-[#101936] rounded-2xl shadow-xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-4 mb-2">
                <img src={track.trackImage} alt="Track" className="w-14 h-14 rounded-full border-2 border-[#E100FF] bg-white object-cover" />
                <div>
                  <div className="font-bold text-white">{track.trackName}</div>
                  <div className="text-xs text-[#7ED7FF]">{track.musician}</div>
                </div>
              </div>
              <div className="text-sm text-gray-400">Track ID: <span className="text-white font-mono">{track.trackId}</span></div>
              <div className="text-sm text-gray-400">Price: <span className="text-[#E100FF] font-semibold">{track.price}</span></div>
              <div className="text-sm text-gray-400">Track Key: <span className="text-white">{track.trackKey}</span></div>
              <div className="flex gap-4 mt-2">
                <button className="text-white hover:text-[#7ED7FF] transition-colors" title="View"><FaEye /></button>
                <button className="text-white hover:text-[#E100FF] transition-colors" title="Edit"><FaEdit /></button>
                <button className="text-white hover:text-red-500 transition-colors" title="Delete"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 text-white">
        <span className="text-sm text-gray-400">
          Showing data {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, tracks.length)} of {tracks.length} entries
        </span>
        <div className="flex gap-2 items-center">
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center ${page === 1 ? 'bg-[#232B43] text-gray-500' : 'bg-[#232B43] hover:bg-[#E100FF] hover:text-white'} transition-colors`}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${page === i + 1 ? 'bg-[#E100FF] text-white' : 'bg-[#232B43] text-gray-300 hover:bg-[#E100FF] hover:text-white'} transition-colors`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
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