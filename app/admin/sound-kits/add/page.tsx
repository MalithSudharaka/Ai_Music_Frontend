"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaCloudUploadAlt, FaFileAudio, FaPlus } from "react-icons/fa";
import { soundKitAPI, soundKitCategoryAPI, soundKitTagAPI, imageAPI } from "../../../utils/api";
import { useRouter, useSearchParams } from "next/navigation";


const musicianOptions = ["Waytoolost", "ProducerX", "DJ Sample"];
const publishOptions = ["Private", "Public"];

export default function AddSoundKitPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('mode') === 'edit';
  
  const [publish, setPublish] = useState("Private");
  const [musician, setMusician] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [imageFileId, setImageFileId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [kitFile, setKitFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoKeyword, setSeoKeyword] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const [tagOptions, setTagOptions] = useState<any[]>([]);
  
  // Add new item states
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddTag, setShowAddTag] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [newTagDescription, setNewTagDescription] = useState('');
  
  // Loading states for add operations
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);
  
  // Search states
  const [categorySearch, setCategorySearch] = useState('');
  const [tagSearch, setTagSearch] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    kitName: '',
    kitId: '',
    price: '',
    kitType: '',
    bpm: '',
    key: ''
  });
  
  // Loading and message states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [editingSoundKitId, setEditingSoundKitId] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    // Load sound kit data if in edit mode
    if (isEditMode) {
      const editSoundKitData = localStorage.getItem('editSoundKitData');
      if (editSoundKitData) {
        try {
          const soundKitData = JSON.parse(editSoundKitData);
          
          // Populate form data
          setFormData({
            kitName: soundKitData.kitName || '',
            kitId: soundKitData.kitId || '',
            price: soundKitData.price?.toString() || '',
            kitType: soundKitData.kitType || '',
            bpm: soundKitData.bpm?.toString() || '',
            key: soundKitData.key || ''
          });

          // Set other form fields
          setPublish(soundKitData.publish || 'Private');
          setMusician(soundKitData.musician || '');
          setDescription(soundKitData.description || '');
          setSeoTitle(soundKitData.seoTitle || '');
          setSeoKeyword(soundKitData.seoKeyword || '');
          setSeoDescription(soundKitData.seoDescription || '');

          // Set sound kit image if available
          if (soundKitData.kitImage) {
            setImage(soundKitData.kitImage);
            // If it's a GridFS file ID, set it
            if (soundKitData.kitImage.startsWith('http://localhost:3001/api/image/')) {
              const fileId = soundKitData.kitImage.split('/').pop();
              if (fileId) {
                setImageFileId(fileId);
              }
            }
          }

          // Set selected categories and tags
          if (soundKitData.categories && Array.isArray(soundKitData.categories)) {
            setCategories(soundKitData.categories);
          }
          if (soundKitData.tags && Array.isArray(soundKitData.tags)) {
            setTags(soundKitData.tags);
          }

          // Store the sound kit ID for updating
          setEditingSoundKitId(soundKitData._id);

          // Clear the localStorage after loading
          localStorage.removeItem('editSoundKitData');
        } catch (error) {
          console.error('Error parsing sound kit data:', error);
        }
      }
    }

    const loadCategoriesAndTags = async () => {
      try {
        // Load categories from MongoDB
        const categoriesResponse = await soundKitCategoryAPI.getCategories();
        if (categoriesResponse.success) {
          setCategoryOptions(categoriesResponse.categories);
        }
        
        // Load tags from MongoDB
        const tagsResponse = await soundKitTagAPI.getTags();
        if (tagsResponse.success) {
          setTagOptions(tagsResponse.tags);
        }
      } catch (error) {
        console.error('Error loading categories and tags:', error);
      }
    };

    loadCategoriesAndTags();
  }, [isEditMode]);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setSubmitMessage('Please select a valid image file');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setSubmitMessage('Image file size must be less than 10MB');
      return;
    }

    setIsUploadingImage(true);
    setSubmitMessage('');

    try {
      // Show preview immediately
      setImage(URL.createObjectURL(file));
      setImageFile(file);

      // Upload to GridFS
      const response = await imageAPI.uploadImage(file);
      
      if (response.success) {
        setImageFileId(response.fileId);
        setSubmitMessage('Image uploaded successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSubmitMessage('');
        }, 3000);
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      setSubmitMessage(error.response?.data?.message || 'Failed to upload image');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    } finally {
      setIsUploadingImage(false);
    }
  }
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setKitFile(file);
  }
  // Handle multi-select with checkboxes
  const handleCategoryToggle = (categoryId: string) => {
    setCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleTagToggle = (tagId: string) => {
    setTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Filtered data based on search
  const filteredCategories = categoryOptions.filter(category =>
    category.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
    category.description.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredTags = tagOptions.filter(tag =>
    tag.name.toLowerCase().includes(tagSearch.toLowerCase()) ||
    tag.description.toLowerCase().includes(tagSearch.toLowerCase())
  );

  // Add new item functions
  const handleAddCategory = async () => {
    if (!newCategoryName.trim() || isAddingCategory) return;
    
    setIsAddingCategory(true);
    try {
      const response = await soundKitCategoryAPI.createCategory({
        name: newCategoryName.trim(),
        description: newCategoryDescription.trim()
      });
      
      if (response.success) {
        // Add the new category to the list and select it
        const newCategory = response.category;
        console.log('New category created:', newCategory);
        
        setCategoryOptions(prev => {
          // Check if category already exists to avoid duplicates
          const exists = prev.find(c => c._id === newCategory.id);
          if (exists) {
            console.log('Category already exists in state:', exists);
            return prev;
          }
          return [...prev, {
            _id: newCategory.id,
            name: newCategory.name,
            description: newCategory.description,
            color: newCategory.color,
            isActive: newCategory.isActive
          }];
        });
        
        // Ensure we're using the correct ID field
        const categoryId = newCategory._id || (newCategory as any).id;
        
        setCategories(prev => {
          // Check if already selected to avoid duplicates
          if (prev.includes(categoryId)) {
            return prev;
          }
          return [...prev, categoryId];
        });
        
        // Reset form
        setNewCategoryName('');
        setNewCategoryDescription('');
        setShowAddCategory(false);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setIsAddingCategory(false);
    }
  };

  const handleAddTag = async () => {
    if (!newTagName.trim() || isAddingTag) return;
    
    setIsAddingTag(true);
    try {
      const response = await soundKitTagAPI.createTag({
        name: newTagName.trim(),
        description: newTagDescription.trim()
      });
      
      if (response.success) {
        // Add the new tag to the list and select it
        const newTag = response.tag;
        console.log('New tag created:', newTag);
        
        setTagOptions(prev => {
          // Check if tag already exists to avoid duplicates
          const exists = prev.find(t => t._id === newTag.id);
          if (exists) {
            console.log('Tag already exists in state:', exists);
            return prev;
          }
          return [...prev, {
            _id: newTag.id,
            name: newTag.name,
            description: newTag.description,
            color: newTag.color,
            isActive: newTag.isActive
          }];
        });
        
        // Ensure we're using the correct ID field
        const tagId = newTag._id || (newTag as any).id;
        
        setTags(prev => {
          // Check if already selected to avoid duplicates
          if (prev.includes(tagId)) {
            return prev;
          }
          return [...prev, tagId];
        });
        
        // Reset form
        setNewTagName('');
        setNewTagDescription('');
        setShowAddTag(false);
      }
    } catch (error) {
      console.error('Error adding tag:', error);
    } finally {
      setIsAddingTag(false);
    }
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Validate required fields
      if (!formData.kitName || !formData.kitId) {
        setSubmitMessage('Please fill in all required fields (Kit Name and Kit ID)');
        setIsSubmitting(false);
        return;
      }

      // Use GridFS image URL if available, otherwise use the image state
      const imageUrl = imageFileId ? imageAPI.getImage(imageFileId) : image || '';

      const soundKitData = {
        ...formData,
        description: description,
        category: categories.join(', '),
        price: formData.price ? parseFloat(formData.price) : 0,
        producer: musician,
        bpm: formData.bpm ? parseInt(formData.bpm) : undefined,
        kitImage: imageUrl,
        kitFile: kitFile ? kitFile.name : '',
        tags: tags,
        publish: publish,
        seoTitle: seoTitle,
        metaKeyword: seoKeyword,
        metaDescription: seoDescription
      };

      console.log('Sending sound kit data:', soundKitData);

      let response;
      if (isEditMode && editingSoundKitId) {
        // Update existing sound kit
        response = await soundKitAPI.updateSoundKit(editingSoundKitId, soundKitData);
      } else {
        // Create new sound kit
        response = await soundKitAPI.createSoundKit(soundKitData);
      }
      
      if (response.success) {
        const message = isEditMode ? 'Sound kit updated successfully!' : 'Sound kit created successfully!';
        setSubmitMessage(message);
        
        if (!isEditMode) {
          // Reset form only for new sound kits
        setFormData({
          kitName: '',
          kitId: '',
          price: '',
          kitType: '',
          bpm: '',
          key: ''
        });
        setDescription('');
        setMusician('');
                  setCategories([]);
          setTags([]);
          setImage(null);
          setImageFileId(null);
          setImageFile(null);
          setKitFile(null);
        setPublish('Private');
        setSeoTitle('');
        setSeoKeyword('');
        setSeoDescription('');
        }
        
        // Redirect back to sound kits list after successful operation
        setTimeout(() => {
          router.push('/admin/sound-kits');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error creating sound kit:', error);
      console.error('Error response:', error.response?.data);
      setSubmitMessage(
        error.response?.data?.details || 
        error.response?.data?.message || 
        'Failed to create sound kit. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen p-8 bg-[#081028]">
              <h1 className="text-3xl font-bold text-white mb-8">Sound Kits <span className="text-lg font-normal text-gray-400 ml-4">{isEditMode ? 'Edit Sound Kit' : 'Add Sound Kits'}</span></h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Main Form */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#101936] rounded-2xl p-8 shadow-xl">
            <div>
              <label className="block text-gray-300 mb-2">Sound Name *</label>
              <input 
                name="kitName"
                value={formData.kitName}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" 
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Sound ID *</label>
              <input 
                name="kitId"
                value={formData.kitId}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" 
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Sound Kit Price</label>
              <input 
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" 
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Kit Type</label>
              <input 
                name="kitType"
                value={formData.kitType}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" 
                placeholder="e.g., Drum Kit, Bass Kit, etc."
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">BPM</label>
              <input 
                name="bpm"
                type="number"
                value={formData.bpm}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" 
                placeholder="Beats per minute"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Key</label>
              <input 
                name="key"
                value={formData.key}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" 
                placeholder="e.g., C, Am, etc."
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Musician</label>
              <select className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm" value={musician} onChange={e => setMusician(e.target.value)}>
                <option value="">Select musician</option>
                {musicianOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
            {/* Sound Kit Image Upload */}
            <div>
              <label className="block text-gray-300 mb-2">Sound Kit Image</label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#232B43] rounded-xl bg-[#181F36] p-4 cursor-pointer hover:border-[#E100FF] transition" onClick={() => !isUploadingImage && imageInputRef.current?.click()}>
                {isUploadingImage ? (
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-2 border-[#E100FF] border-t-transparent rounded-full animate-spin mb-2"></div>
                    <span className="text-xs text-gray-400">Uploading to GridFS...</span>
                  </div>
                ) : image ? (
                  <img src={image} alt="Sound Kit" className="w-20 h-20 object-cover rounded-lg mb-2" />
                ) : (
                  <FaCloudUploadAlt className="text-4xl text-[#7ED7FF] mb-2" />
                )}
                <span className="text-xs text-gray-400">
                  {isUploadingImage ? 'Uploading...' : 'Click or drag to upload image'}
                </span>
                <input 
                  ref={imageInputRef} 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                  disabled={isUploadingImage}
                />
              </div>
            </div>
            {/* Sound Kit Upload */}
            <div>
              <label className="block text-gray-300 mb-2">Sound Kit Upload</label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#232B43] rounded-xl bg-[#181F36] p-4 cursor-pointer hover:border-[#E100FF] transition" onClick={() => fileInputRef.current?.click()}>
                <FaFileAudio className="text-4xl text-[#E100FF] mb-2" />
                <span className="text-xs text-gray-400">Click or drag to upload sound kit</span>
                <input ref={fileInputRef} type="file" accept="audio/*" className="hidden" onChange={handleFileChange} />
              </div>
            </div>
            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none min-h-[120px]" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
          </div>
        </div>
        {/* Right: Side Panel */}
        <div className="flex flex-col gap-8">
          {/* Publish Section */}
          <div className="bg-[#101936] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <label className="block text-gray-300 mb-2">Publish</label>
            <div className="relative">
              <select value={publish} onChange={e => setPublish(e.target.value)} className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm">
                <option>Private</option>
                <option>Public</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-3 text-gray-400 text-lg">▼</span>
            </div>
            {submitMessage && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${
                submitMessage.includes('successfully') 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {submitMessage}
              </div>
            )}
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`mt-4 w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                isSubmitting 
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                  : 'bg-[#E100FF] text-white hover:bg-[#c800d6]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Adding Sound Kit...</span>
                </>
              ) : (
                <>
                  {isEditMode ? 'Update Sound Kit' : 'Add Sound Kit'} <span className="ml-2">→</span>
                </>
              )}
            </button>
          </div>
          {/* Sound Kit Category */}
          <div className="bg-[#101936] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
            <label className="block text-gray-300 mb-2">Sound Kit Category</label>
              <button
                type="button"
                onClick={() => setShowAddCategory(!showAddCategory)}
                className="text-[#E100FF] text-sm hover:text-[#c800d6] transition-colors"
              >
                {showAddCategory ? 'Cancel' : '+ Add New'}
              </button>
            </div>
            
            {/* Add New Category Form */}
            {showAddCategory && (
              <div className="bg-[#232B43] rounded-lg p-4 mb-4 border border-[#E100FF]/30">
                <h4 className="text-white text-sm font-medium mb-3">Add New Category</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full bg-[#181F36] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E100FF]"
                  />
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={newCategoryDescription}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                    className="w-full bg-[#181F36] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E100FF]"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      disabled={!newCategoryName.trim() || isAddingCategory}
                      className="flex-1 bg-[#E100FF] text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-[#c800d6] transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isAddingCategory ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Adding...</span>
                        </>
                      ) : (
                        'Add Category'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddCategory(false);
                        setNewCategoryName('');
                        setNewCategoryDescription('');
                      }}
                      className="px-3 py-2 text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <input 
              type="text"
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-[#E100FF]" 
              placeholder="Search categories..." 
            />
            <label className="block text-gray-400 text-xs mb-2">All categories</label>
            
            <div className="max-h-48 overflow-y-auto bg-[#181F36] rounded-lg border border-[#232B43] p-2">
              {filteredCategories.length === 0 ? (
                <div className="text-gray-400 text-sm text-center py-4">
                  {categorySearch ? 'No categories found matching your search' : 'No categories available'}
                </div>
              ) : (
                filteredCategories.map(category => (
                <div key={category._id} className="flex items-center gap-3 p-2 hover:bg-[#232B43] rounded cursor-pointer">
                  <input
                    type="checkbox"
                    id={`category-${category._id}`}
                    checked={categories.includes(category._id)}
                    onChange={() => handleCategoryToggle(category._id)}
                    className="w-4 h-4 text-[#E100FF] bg-[#232B43] border-[#232B43] rounded focus:ring-[#E100FF] focus:ring-2"
                  />
                  <label htmlFor={`category-${category._id}`} className="text-white text-sm cursor-pointer flex-1">
                    {category.name}
                  </label>
                </div>
                ))
              )}
            </div>
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map(categoryId => {
                  const category = categoryOptions.find(c => c._id === categoryId);
                  return category ? (
                    <span key={categoryId} className="bg-[#E100FF]/20 text-[#E100FF] px-2 py-1 rounded-full text-xs">
                      {category.name}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
          {/* Sound Kit Tags */}
          <div className="bg-[#101936] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
            <label className="block text-gray-300 mb-2">Sound Kit Tags</label>
              <button
                type="button"
                onClick={() => setShowAddTag(!showAddTag)}
                className="text-[#E100FF] text-sm hover:text-[#c800d6] transition-colors"
              >
                {showAddTag ? 'Cancel' : '+ Add New'}
              </button>
            </div>
            
            {/* Add New Tag Form */}
            {showAddTag && (
              <div className="bg-[#232B43] rounded-lg p-4 mb-4 border border-[#E100FF]/30">
                <h4 className="text-white text-sm font-medium mb-3">Add New Tag</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Tag Name"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    className="w-full bg-[#181F36] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E100FF]"
                  />
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={newTagDescription}
                    onChange={(e) => setNewTagDescription(e.target.value)}
                    className="w-full bg-[#181F36] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E100FF]"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAddTag}
                      disabled={!newTagName.trim() || isAddingTag}
                      className="flex-1 bg-[#E100FF] text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-[#c800d6] transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isAddingTag ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Adding...</span>
                        </>
                      ) : (
                        'Add Tag'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddTag(false);
                        setNewTagName('');
                        setNewTagDescription('');
                      }}
                      className="px-3 py-2 text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <input 
              type="text"
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
              className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-[#E100FF]" 
              placeholder="Search tags..." 
            />
            <label className="block text-gray-400 text-xs mb-2">All tags</label>
            
            <div className="max-h-48 overflow-y-auto bg-[#181F36] rounded-lg border border-[#232B43] p-2">
              {filteredTags.length === 0 ? (
                <div className="text-gray-400 text-sm text-center py-4">
                  {tagSearch ? 'No tags found matching your search' : 'No tags available'}
                </div>
              ) : (
                filteredTags.map(tag => (
                <div key={tag._id} className="flex items-center gap-3 p-2 hover:bg-[#232B43] rounded cursor-pointer">
                  <input
                    type="checkbox"
                    id={`tag-${tag._id}`}
                    checked={tags.includes(tag._id)}
                    onChange={() => handleTagToggle(tag._id)}
                    className="w-4 h-4 text-[#E100FF] bg-[#232B43] border-[#232B43] rounded focus:ring-[#E100FF] focus:ring-2"
                  />
                  <label htmlFor={`tag-${tag._id}`} className="text-white text-sm cursor-pointer flex-1">
                    {tag.name}
                  </label>
                </div>
                ))
              )}
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tagId => {
                  const tag = tagOptions.find(t => t._id === tagId);
                  return tag ? (
                    <span key={tagId} className="bg-[#E100FF]/20 text-[#E100FF] px-2 py-1 rounded-full text-xs">
                      {tag.name}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
          {/* SEO Settings */}
          <div className="bg-[#101936] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <label className="block text-gray-300 mb-2">Seo Setting</label>
            <input className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" placeholder="Seo Title" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} />
            <input className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" placeholder="Meta keyword" value={seoKeyword} onChange={e => setSeoKeyword(e.target.value)} />
            <input className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" placeholder="Meta description" value={seoDescription} onChange={e => setSeoDescription(e.target.value)} />
          </div>
        </div>
      </form>
    </div>
  );
} 