"use client";
import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

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
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [editUser, setEditUser] = useState({
    name: '',
    email: '',
    username: '',
    role: ''
  });
  const pageSize = 8;
  const totalPages = Math.ceil(users.length / pageSize);
  const paginatedUsers = users.slice((page - 1) * pageSize, page * pageSize);

  function handleViewUser(user: typeof mockUsers[0]) {
    setSelectedUser(user);
    setShowViewModal(true);
  }

  function handleCloseViewModal() {
    setShowViewModal(false);
    setSelectedUser(null);
  }

  function handleEditUser(user: typeof mockUsers[0]) {
    setSelectedUser(user);
    setEditUser({
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role
    });
    setShowEditModal(true);
  }

  function handleSaveEditUser() {
    if (!selectedUser) return;
    
    console.log('Updating user:', selectedUser.id, editUser);
    
    // Update the user in the local state (simulate backend update)
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id 
        ? { 
            ...user, 
            name: editUser.name,
            email: editUser.email,
            username: editUser.username,
            role: editUser.role
          }
        : user
    );
    
    paginatedUsers.forEach((user, idx) => {
      if (user.id === selectedUser.id) {
        paginatedUsers[idx] = {
          ...user,
          name: editUser.name,
          email: editUser.email,
          username: editUser.username,
          role: editUser.role
        };
      }
    });
    
    setShowEditModal(false);
    setSelectedUser(null);
    setEditUser({ name: '', email: '', username: '', role: '' });
  }

  function handleCloseEditModal() {
    setShowEditModal(false);
    setSelectedUser(null);
    setEditUser({ name: '', email: '', username: '', role: '' });
  }

  function handleDeleteUser(user: typeof mockUsers[0]) {
    setSelectedUser(user);
    setShowDeleteModal(true);
  }

  function handleConfirmDelete() {
    if (!selectedUser) return;
    
    console.log('Deleting user:', selectedUser.id);
    
    const filteredUsers = users.filter(user => user.id !== selectedUser.id);
    
    const updatedPage = page;
    
    setShowDeleteModal(false);
    setSelectedUser(null);
    
    if (paginatedUsers.length === 1 && page > 1) {
      setPage(page - 1);
    }
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false);
    setSelectedUser(null);
  }

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
                    <button 
                      className="hover:text-[#7ED7FF] transition-colors" 
                      title="View"
                      onClick={() => handleViewUser(user)}
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="hover:text-[#E100FF] transition-colors" 
                      title="Edit"
                      onClick={() => handleEditUser(user)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="hover:text-red-500 transition-colors" 
                      title="Delete"
                      onClick={() => handleDeleteUser(user)}
                    >
                      <FaTrash />
                    </button>
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
                  <button 
                    className="p-2 rounded-lg bg-[#19213A] hover:bg-[#7ED7FF] hover:text-black transition-colors" 
                    title="View"
                    onClick={() => handleViewUser(user)}
                  >
                    <FaEye className="text-white" />
                  </button>
                  <button 
                    className="p-2 rounded-lg bg-[#19213A] hover:bg-[#E100FF] hover:text-black transition-colors" 
                    title="Edit"
                    onClick={() => handleEditUser(user)}
                  >
                    <FaEdit className="text-white" />
                  </button>
                  <button 
                    className="p-2 rounded-lg bg-[#19213A] hover:bg-red-500 hover:text-black transition-colors" 
                    title="Delete"
                    onClick={() => handleDeleteUser(user)}
                  >
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

      {/* View User Modal */}
      {showViewModal && selectedUser && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-[#00000020] flex items-center justify-center z-50 p-4">
          <div className="bg-[#101936] rounded-2xl p-6 sm:p-8 shadow-xl w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">View User Details</h2>
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
                  src={selectedUser.image} 
                  alt={selectedUser.name} 
                  className="w-20 h-20 rounded-xl object-cover border border-[#232B43]" 
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedUser.name}</h3>
                  <p className="text-[#7ED7FF] text-sm">{selectedUser.username}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Email</label>
                  <div className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 border border-[#232B43]">
                    {selectedUser.email}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Role</label>
                  <div className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 border border-[#232B43]">
                    {selectedUser.role}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Username</label>
                <div className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 border border-[#232B43]">
                  {selectedUser.username}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">ID</label>
                <div className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 border border-[#232B43]">
                  {selectedUser.id}
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

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-[#00000020] flex items-center justify-center z-50 p-4">
          <div className="bg-[#101936] rounded-2xl p-6 sm:p-8 shadow-xl w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Edit User</h2>
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
                  src={selectedUser.image} 
                  alt={selectedUser.name} 
                  className="w-20 h-20 rounded-xl object-cover border border-[#232B43]" 
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedUser.id}</h3>
                  <p className="text-[#7ED7FF] text-sm">User ID</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Name</label>
                  <input
                    type="text"
                    value={editUser.name}
                    onChange={(e) => setEditUser({...editUser, name: e.target.value})}
                    className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 border border-[#232B43] focus:outline-none focus:border-[#7ED7FF]"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Email</label>
                  <input
                    type="email"
                    value={editUser.email}
                    onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                    className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 border border-[#232B43] focus:outline-none focus:border-[#7ED7FF]"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Username</label>
                  <input
                    type="text"
                    value={editUser.username}
                    onChange={(e) => setEditUser({...editUser, username: e.target.value})}
                    className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 border border-[#232B43] focus:outline-none focus:border-[#7ED7FF]"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Role</label>
                  <select
                    value={editUser.role}
                    onChange={(e) => setEditUser({...editUser, role: e.target.value})}
                    className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 border border-[#232B43] focus:outline-none focus:border-[#7ED7FF]"
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCloseEditModal}
                className="py-2 px-6 rounded-lg bg-[#232B43] text-white font-semibold hover:bg-[#181F36] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditUser}
                className="py-2 px-6 rounded-lg bg-[#E100FF] text-white font-semibold hover:bg-opacity-90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-[#00000020] flex items-center justify-center z-50 p-4">
          <div className="bg-[#101936] rounded-2xl p-6 sm:p-8 shadow-xl w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Delete User</h2>
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
                  Are you sure you want to delete this user? 
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