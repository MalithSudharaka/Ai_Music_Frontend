"use client";
import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaPlus, FaTimes, FaTags } from 'react-icons/fa';
import { soundKitTagAPI } from '../../../utils/api';

interface SoundKitTag {
  _id: string;
  name: string;
  description?: string;
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function SoundKitTagsPage() {
  const [tags, setTags] = useState<SoundKitTag[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTag, setEditingTag] = useState<SoundKitTag | null>(null);
  const [newTag, setNewTag] = useState({
    name: '',
    description: '',
    color: '#FF6B35'
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      setLoading(true);
      const response = await soundKitTagAPI.getTags();
      if (response.success) {
        setTags(response.tags);
        setPagination(prev => ({
          ...prev,
          totalItems: response.tags.length
        }));
      }
    } catch (error) {
      console.error('Error loading tags:', error);
      setMessage('Failed to load tags');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTag = async () => {
    if (!newTag.name.trim()) {
      setMessage('Tag name is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage('');

      const response = await soundKitTagAPI.createTag(newTag);
      
      if (response.success) {
        setMessage('Tag created successfully!');
        setNewTag({ name: '', description: '', color: '#FF6B35' });
        setShowModal(false);
        loadTags();
      }
    } catch (error: any) {
      console.error('Error creating tag:', error);
      setMessage(error.response?.data?.message || 'Failed to create tag');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTag = async () => {
    if (!editingTag || !editingTag.name.trim()) {
      setMessage('Tag name is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage('');

      const response = await soundKitTagAPI.updateTag(editingTag._id, {
        name: editingTag.name,
        description: editingTag.description,
        color: editingTag.color
      });
      
      if (response.success) {
        setMessage('Tag updated successfully!');
        setEditingTag(null);
        setShowModal(false);
        loadTags();
      }
    } catch (error: any) {
      console.error('Error updating tag:', error);
      setMessage(error.response?.data?.message || 'Failed to update tag');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTag = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tag?')) {
      return;
    }

    try {
      const response = await soundKitTagAPI.deleteTag(id);
      if (response.success) {
        setMessage('Tag deleted successfully!');
        loadTags();
      }
    } catch (error: any) {
      console.error('Error deleting tag:', error);
      setMessage(error.response?.data?.message || 'Failed to delete tag');
    }
  };

  const handleEditTag = (tag: SoundKitTag) => {
    setEditingTag(tag);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTag(null);
    setNewTag({ name: '', description: '', color: '#FF6B35' });
    setMessage('');
  };

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tag.description && tag.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const paginatedTags = filteredTags.slice(
    (pagination.currentPage - 1) * pagination.itemsPerPage,
    pagination.currentPage * pagination.itemsPerPage
  );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            Sound Kit Tags
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#E55A2B] transition-colors"
          >
            <FaPlus />
            Add Tag
          </button>
        </div>

        {/* Search and Message */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#101936] text-white rounded-lg px-4 py-2 border border-[#232B43] focus:border-[#FF6B35] focus:outline-none"
            />
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('successfully') 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {message}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
          </div>
        )}

        {/* Desktop Table View */}
        {!loading && (
          <div className="hidden lg:block bg-[#101936] rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#181F36]">
                  <tr>
                                         <th className="px-6 py-4 text-left text-gray-300 font-semibold">Tag Name</th>
                     <th className="px-6 py-4 text-left text-gray-300 font-semibold">Description</th>
                     <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                     <th className="px-6 py-4 text-left text-gray-300 font-semibold">Created</th>
                     <th className="px-6 py-4 text-center text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#232B43]">
                  {paginatedTags.map((tag) => (
                    <tr key={tag._id} className="hover:bg-[#181F36]/50 transition-colors">
                                             <td className="px-6 py-4 text-white font-medium">{tag.name}</td>
                       <td className="px-6 py-4 text-gray-300 max-w-xs truncate">
                         {tag.description || 'No description'}
                       </td>
                       <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tag.isActive 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {tag.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm">
                        {new Date(tag.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditTag(tag)}
                            className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteTag(tag._id)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
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
          </div>
        )}

        {/* Mobile Card View */}
        {!loading && (
          <div className="lg:hidden space-y-4">
            {paginatedTags.map((tag) => (
              <div key={tag._id} className="bg-[#101936] rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">{tag.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditTag(tag)}
                      className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteTag(tag._id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  {tag.description || 'No description'}
                </p>
                                 <div className="flex items-center justify-end">
                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                     tag.isActive 
                       ? 'bg-green-500/20 text-green-400' 
                       : 'bg-red-500/20 text-red-400'
                   }`}>
                     {tag.isActive ? 'Active' : 'Inactive'}
                   </span>
                 </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredTags.length > pagination.itemsPerPage && (
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                disabled={pagination.currentPage === 1}
                className="px-4 py-2 bg-[#101936] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#181F36] transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-[#101936] text-white rounded-lg">
                Page {pagination.currentPage} of {Math.ceil(filteredTags.length / pagination.itemsPerPage)}
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                disabled={pagination.currentPage >= Math.ceil(filteredTags.length / pagination.itemsPerPage)}
                className="px-4 py-2 bg-[#101936] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#181F36] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#101936] rounded-2xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {editingTag ? 'Edit Tag' : 'Add Tag'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Tag Name *</label>
                  <input
                    type="text"
                    value={editingTag ? editingTag.name : newTag.name}
                    onChange={(e) => {
                      if (editingTag) {
                        setEditingTag({ ...editingTag, name: e.target.value });
                      } else {
                        setNewTag({ ...newTag, name: e.target.value });
                      }
                    }}
                    className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 border border-[#232B43] focus:border-[#FF6B35] focus:outline-none"
                    placeholder="Enter tag name"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Description</label>
                  <textarea
                    value={editingTag ? editingTag.description || '' : newTag.description}
                    onChange={(e) => {
                      if (editingTag) {
                        setEditingTag({ ...editingTag, description: e.target.value });
                      } else {
                        setNewTag({ ...newTag, description: e.target.value });
                      }
                    }}
                    className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 border border-[#232B43] focus:border-[#FF6B35] focus:outline-none"
                    placeholder="Enter description"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={editingTag ? editingTag.color : newTag.color}
                      onChange={(e) => {
                        if (editingTag) {
                          setEditingTag({ ...editingTag, color: e.target.value });
                        } else {
                          setNewTag({ ...newTag, color: e.target.value });
                        }
                      }}
                      className="w-12 h-10 rounded-lg border border-[#232B43] cursor-pointer"
                    />
                    <input
                      type="text"
                      value={editingTag ? editingTag.color : newTag.color}
                      onChange={(e) => {
                        if (editingTag) {
                          setEditingTag({ ...editingTag, color: e.target.value });
                        } else {
                          setNewTag({ ...newTag, color: e.target.value });
                        }
                      }}
                      className="flex-1 bg-[#181F36] text-white rounded-lg px-4 py-2 border border-[#232B43] focus:border-[#FF6B35] focus:outline-none"
                      placeholder="#FF6B35"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={editingTag ? handleUpdateTag : handleSaveTag}
                    disabled={isSubmitting}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                      isSubmitting
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        : 'bg-[#FF6B35] text-white hover:bg-[#E55A2B]'
                    }`}
                  >
                    {isSubmitting ? 'Saving...' : (editingTag ? 'Update' : 'Save')}
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 py-2 rounded-lg bg-[#181F36] text-white font-semibold hover:bg-[#232B43] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 