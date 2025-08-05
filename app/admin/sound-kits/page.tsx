"use client";
import React, { useEffect, useState } from "react";
import { getSoundKits, SoundKit } from "./data";
import { FaEye, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

export default function SoundKitsPage() {
  const [soundKits, setSoundKits] = useState<SoundKit[]>([]);
  const [page, setPage] = useState(1);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSoundKit, setSelectedSoundKit] = useState<SoundKit | null>(null);
  const [editSoundKit, setEditSoundKit] = useState({ soundKitName: '', musician: '', price: '' });
  const pageSize = 8;

  useEffect(() => {
    getSoundKits().then(setSoundKits);
  }, []);

  const totalPages = Math.ceil(soundKits.length / pageSize);
  const paginatedKits = soundKits.slice((page - 1) * pageSize, page * pageSize);

  function handleViewSoundKit(soundKit: SoundKit) {
    setSelectedSoundKit(soundKit);
    setShowViewModal(true);
  }

  function handleCloseViewModal() {
    setShowViewModal(false);
    setSelectedSoundKit(null);
  }

  function handleEditSoundKit(soundKit: SoundKit) {
    setSelectedSoundKit(soundKit);
    setEditSoundKit({ 
      soundKitName: soundKit.soundKitName, 
      musician: soundKit.musician, 
      price: soundKit.price 
    });
    setShowEditModal(true);
  }

  function handleSaveEditSoundKit() {
    // Here you would typically update to your backend
    console.log('Updating sound kit:', selectedSoundKit?.id, editSoundKit);
    // Update the sound kit in the local state (simulate backend update)
    setSoundKits(soundKits.map(kit => 
      kit.id === selectedSoundKit?.id 
        ? { ...kit, soundKitName: editSoundKit.soundKitName, musician: editSoundKit.musician, price: editSoundKit.price }
        : kit
    ));
    setShowEditModal(false);
    setSelectedSoundKit(null);
    setEditSoundKit({ soundKitName: '', musician: '', price: '' });
  }

  function handleCloseEditModal() {
    setShowEditModal(false);
    setSelectedSoundKit(null);
    setEditSoundKit({ soundKitName: '', musician: '', price: '' });
  }

  function handleDeleteSoundKit(soundKit: SoundKit) {
    setSelectedSoundKit(soundKit);
    setShowDeleteModal(true);
  }

  function handleConfirmDelete() {
    if (selectedSoundKit) {
      // Here you would typically delete from your backend
      console.log('Deleting sound kit:', selectedSoundKit.id);
      // Remove the sound kit from the local state (simulate backend deletion)
      setSoundKits(soundKits.filter(kit => kit.id !== selectedSoundKit.id));
      setShowDeleteModal(false);
      setSelectedSoundKit(null);
    }
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false);
    setSelectedSoundKit(null);
  }

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
                  <button 
                    className="text-white hover:text-[#7ED7FF] transition-colors" 
                    title="View"
                    onClick={() => handleViewSoundKit(kit)}
                  >
                    <FaEye />
                  </button>
                  <button 
                    className="text-white hover:text-[#E100FF] transition-colors" 
                    title="Edit"
                    onClick={() => handleEditSoundKit(kit)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="text-white hover:text-red-500 transition-colors" 
                    title="Delete"
                    onClick={() => handleDeleteSoundKit(kit)}
                  >
                    <FaTrash />
                  </button>
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
              <button 
                className="text-white hover:text-[#7ED7FF] transition-colors p-1" 
                title="View"
                onClick={() => handleViewSoundKit(kit)}
              >
                <FaEye />
              </button>
              <button 
                className="text-white hover:text-[#E100FF] transition-colors p-1" 
                title="Edit"
                onClick={() => handleEditSoundKit(kit)}
              >
                <FaEdit />
              </button>
              <button 
                className="text-white hover:text-red-500 transition-colors p-1" 
                title="Delete"
                onClick={() => handleDeleteSoundKit(kit)}
              >
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

      {/* View Sound Kit Modal */}
      {showViewModal && selectedSoundKit && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-[#00000020] flex items-center justify-center z-50 p-4">
          <div className="bg-[#101936] rounded-2xl p-6 sm:p-8 shadow-xl w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">View Sound Kit Details</h2>
              <button
                onClick={handleCloseViewModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={selectedSoundKit.image} 
                  alt={selectedSoundKit.soundKitName} 
                  className="w-20 h-20 rounded-xl object-cover border border-[#232B43]" 
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedSoundKit.soundKitName}</h3>
                  <p className="text-[#7ED7FF] text-sm">{selectedSoundKit.musician}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Sound Kit ID</label>
                  <div className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 border border-[#232B43]">
                    {selectedSoundKit.soundKitId}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Price</label>
                  <div className="w-full bg-[#181F36] text-[#E100FF] font-semibold rounded-lg px-4 py-2 border border-[#232B43]">
                    {selectedSoundKit.price}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Sound Kit Name</label>
                <div className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 border border-[#232B43]">
                  {selectedSoundKit.soundKitName}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Musician</label>
                <div className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 border border-[#232B43]">
                  {selectedSoundKit.musician}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseViewModal}
                className="py-2 px-6 rounded-lg bg-[#232B43] text-white font-semibold hover:bg-[#181F36] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Sound Kit Modal */}
      {showEditModal && selectedSoundKit && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-[#00000020] flex items-center justify-center z-50 p-4">
          <div className="bg-[#101936] rounded-2xl p-6 sm:p-8 shadow-xl w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Edit Sound Kit</h2>
              <button
                onClick={handleCloseEditModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={selectedSoundKit.image} 
                  alt={selectedSoundKit.soundKitName} 
                  className="w-20 h-20 rounded-xl object-cover border border-[#232B43]" 
                />
                <div>
                  <p className="text-gray-300 text-sm font-semibold">Sound Kit ID</p>
                  <p className="text-white">{selectedSoundKit.soundKitId}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Sound Kit Name</label>
                <input
                  type="text"
                  value={editSoundKit.soundKitName}
                  onChange={(e) => setEditSoundKit({ ...editSoundKit, soundKitName: e.target.value })}
                  className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none border border-[#232B43] focus:border-[#E100FF]"
                  placeholder="Enter sound kit name..."
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Musician</label>
                <input
                  type="text"
                  value={editSoundKit.musician}
                  onChange={(e) => setEditSoundKit({ ...editSoundKit, musician: e.target.value })}
                  className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none border border-[#232B43] focus:border-[#E100FF]"
                  placeholder="Enter musician name..."
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Price</label>
                <input
                  type="text"
                  value={editSoundKit.price}
                  onChange={(e) => setEditSoundKit({ ...editSoundKit, price: e.target.value })}
                  className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none border border-[#232B43] focus:border-[#E100FF]"
                  placeholder="Enter price..."
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleCloseEditModal}
                className="flex-1 py-2 rounded-lg bg-[#232B43] text-white font-semibold hover:bg-[#181F36] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditSoundKit}
                className="flex-1 py-2 rounded-lg bg-[#E100FF] text-white font-semibold hover:bg-[#c800d6] transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Sound Kit Modal */}
      {showDeleteModal && selectedSoundKit && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-[#00000020] flex items-center justify-center z-50 p-4">
          <div className="bg-[#101936] rounded-2xl p-6 sm:p-8 shadow-xl w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Delete Sound Kit</h2>
              <button
                onClick={handleCloseDeleteModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-red-500 text-6xl mb-4 flex justify-center">
                  <FaTrash />
                </div>
                <p className="text-gray-300 mb-4">
                  Are you sure you want to delete this sound kit?
                </p>
              </div>
              
              
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleCloseDeleteModal}
                className="flex-1 py-2 rounded-lg bg-[#232B43] text-white font-semibold hover:bg-[#181F36] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 