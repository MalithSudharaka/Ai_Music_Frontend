"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaCloudUploadAlt, FaFileAudio, FaPlus } from "react-icons/fa";
import { getSoundKitCategories, SoundKitCategory } from "../category/categorydata";
import { getSoundKitTags, SoundKitTag } from "../tags/tag";
import { soundKitAPI } from "../../../utils/api";


const musicianOptions = ["Waytoolost", "ProducerX", "DJ Sample"];
const publishOptions = ["Private", "Public"];

export default function AddSoundKitPage() {
  const [publish, setPublish] = useState("Private");
  const [musician, setMusician] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [kitFile, setKitFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoKeyword, setSeoKeyword] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categoryOptions, setCategoryOptions] = useState<SoundKitCategory[]>([]);
  const [tagOptions, setTagOptions] = useState<SoundKitTag[]>([]);
  
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

  useEffect(() => {
    getSoundKitCategories().then(setCategoryOptions);
    getSoundKitTags().then(setTagOptions);
  }, []);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  }
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setKitFile(file);
  }
  function handleCategoryChange(option: string) {
    setCategories((prev) => prev.includes(option) ? prev.filter(c => c !== option) : [...prev, option]);
  }
  function handleTagChange(option: string) {
    setTags((prev) => prev.includes(option) ? prev.filter(t => t !== option) : [...prev, option]);
  }

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

      const soundKitData = {
        ...formData,
        description: description,
        category: categories.join(', '),
        price: formData.price ? parseFloat(formData.price) : 0,
        producer: musician,
        bpm: formData.bpm ? parseInt(formData.bpm) : undefined,
        kitImage: image || '',
        kitFile: kitFile ? kitFile.name : '',
        tags: tags,
        publish: publish,
        seoTitle: seoTitle,
        metaKeyword: seoKeyword,
        metaDescription: seoDescription
      };

      console.log('Sending sound kit data:', soundKitData);

      const response = await soundKitAPI.createSoundKit(soundKitData);
      
      if (response.success) {
        setSubmitMessage('Sound kit created successfully!');
        // Reset form
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
        setKitFile(null);
        setPublish('Private');
        setSeoTitle('');
        setSeoKeyword('');
        setSeoDescription('');
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
      <h1 className="text-3xl font-bold text-white mb-8">Sound Kits <span className="text-lg font-normal text-gray-400 ml-4">Add Sound Kits</span></h1>
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
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#232B43] rounded-xl bg-[#181F36] p-4 cursor-pointer hover:border-[#E100FF] transition" onClick={() => imageInputRef.current?.click()}>
                {image ? (
                  <img src={image} alt="Sound Kit" className="w-20 h-20 object-cover rounded-lg mb-2" />
                ) : (
                  <FaCloudUploadAlt className="text-4xl text-[#7ED7FF] mb-2" />
                )}
                <span className="text-xs text-gray-400">Click or drag to upload image</span>
                <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
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
                  Add Sound Kit <span className="ml-2">→</span>
                </>
              )}
            </button>
          </div>
          {/* Sound Kit Category */}
          <div className="bg-[#101936] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <label className="block text-gray-300 mb-2">Sound Kit Category</label>
            <input className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none mb-2" placeholder="Enter Category..." />
            <div className="max-h-32 overflow-y-auto border border-[#232B43] rounded-lg bg-[#181F36]">
              {categoryOptions.map(opt => (
                <div key={opt.id} className="flex items-center px-3 py-2">
                  <input type="checkbox" checked={categories.includes(opt.name)} onChange={() => handleCategoryChange(opt.name)} className="accent-[#E100FF] mr-2" />
                  <span className="text-white text-sm">{opt.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Sound Kit Tags */}
          <div className="bg-[#101936] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <label className="block text-gray-300 mb-2">Sound Kit Tags</label>
            <input className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none mb-2" placeholder="Enter Tag..." />
            <div className="max-h-32 overflow-y-auto border border-[#232B43] rounded-lg bg-[#181F36]">
              {tagOptions.map(opt => (
                <div key={opt.id} className="flex items-center px-3 py-2">
                  <input type="checkbox" checked={tags.includes(opt.name)} onChange={() => handleTagChange(opt.name)} className="accent-[#E100FF] mr-2" />
                  <span className="text-white text-sm">{opt.name}</span>
                </div>
              ))}
            </div>
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