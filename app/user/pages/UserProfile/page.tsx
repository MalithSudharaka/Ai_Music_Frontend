'use client'
import React, { useState, useRef, useEffect } from 'react'
import { profileAPI } from '../../../utils/api'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { 
  RiCameraLine, 
  RiEditLine, 
  RiSaveLine, 
  RiUserLine, 
  RiMapPinLine, 
  RiFileTextLine,
  RiLink,
  RiFacebookBoxLine,
  RiTwitterLine,
  RiInstagramLine,
  RiYoutubeLine,
  RiLinkedinBoxLine,
  RiGlobeLine
} from 'react-icons/ri'

function UserProfile() {
  const [isEditing, setIsEditing] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('edit') === 'true';
    }
    return false;
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    location: '',
    country: '',
    biography: 'Music enthusiast and creator. Love exploring new sounds and connecting with fellow musicians.',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      linkedin: '',
      website: ''
    }
  });

  // Load user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setFormData(prev => ({
          ...prev,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          displayName: user.displayName || (user.firstName?.toLowerCase() + user.lastName?.toLowerCase()) || '',
          email: user.email || '',
          location: user.location || '',
          country: user.country || '',
          biography: user.biography || 'Music enthusiast and creator. Love exploring new sounds and connecting with fellow musicians.',
          socialLinks: user.socialLinks || {
            facebook: '',
            twitter: '',
            instagram: '',
            youtube: '',
            linkedin: '',
            website: ''
          }
        }));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'Japan', 'India', 'Brazil', 'Mexico'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);
    
    try {
      // Get current user data from localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        
        // Save to backend
        const response = await profileAPI.updateProfile(user.id, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          displayName: formData.displayName,
          location: formData.location,
          country: formData.country,
          biography: formData.biography,
          socialLinks: formData.socialLinks
        });
        
        if (response.success) {
          // Update localStorage with new data
          const updatedUser = {
            ...user,
            ...response.user
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          setSaveMessage({
            type: 'success',
            text: 'Profile updated successfully!'
          });
          
          setIsEditing(false);
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            setSaveMessage(null);
          }, 3000);
        }
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setSaveMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update profile. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen ">
        <Navbar />

      <div className="container mx-auto px-4 py-8 pt-34 sm:pt-28 md:pt-32 lg:pt-50 xl:pt-50">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              disabled={isSaving}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {isEditing ? (
                <>
                  <RiSaveLine size={20} />
                  <span>Save Changes</span>
                </>
              ) : (
                <>
                  <RiEditLine size={20} />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>

          {/* Save Message */}
          {saveMessage && (
            <div className={`p-4 rounded-lg mb-6 ${
              saveMessage.type === 'success' 
                ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                : 'bg-red-500/20 border border-red-500/30 text-red-400'
            }`}>
              {saveMessage.text}
            </div>
          )}

          {/* Profile Image Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <RiUserLine size={48} className="text-white/50" />
                  )}
                </div>
                
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <RiCameraLine size={16} />
                    )}
                  </button>
                )}
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-gray-400 mb-4">@{formData.displayName}</p>
                {formData.location && (
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
                    <RiMapPinLine size={16} />
                    <span>{formData.location}, {formData.country}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                <RiUserLine size={24} />
                <span>Personal Information</span>
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={true}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="City"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      <option value="">Select Country</option>
                      {countries.map(country => (
                        <option key={country} value={country} className="bg-gray-800">{country}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                <RiFileTextLine size={24} />
                <span>Biography</span>
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">About You</label>
                <textarea
                  name="biography"
                  value={formData.biography}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={8}
                  placeholder="Tell us about yourself..."
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <RiLink size={24} />
              <span>Social Media Links</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <RiFacebookBoxLine size={24} className="text-primary" />
                </div>
                <input
                  type="url"
                  name="socialLinks.facebook"
                  value={formData.socialLinks.facebook}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Facebook URL"
                  className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none disabled:opacity-50"
                />
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <RiTwitterLine size={24} className="text-primary" />
                </div>
                <input
                  type="url"
                  name="socialLinks.twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Twitter URL"
                  className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none disabled:opacity-50"
                />
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <RiInstagramLine size={24} className="text-primary" />
                </div>
                <input
                  type="url"
                  name="socialLinks.instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Instagram URL"
                  className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none disabled:opacity-50"
                />
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <RiYoutubeLine size={24} className="text-primary" />
                </div>
                <input
                  type="url"
                  name="socialLinks.youtube"
                  value={formData.socialLinks.youtube}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="YouTube URL"
                  className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none disabled:opacity-50"
                />
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <RiLinkedinBoxLine size={24} className="text-primary" />
                </div>
                <input
                  type="url"
                  name="socialLinks.linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="LinkedIn URL"
                  className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none disabled:opacity-50"
                />
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <RiGlobeLine size={24} className="text-primary" />
                </div>
                <input
                  type="url"
                  name="socialLinks.website"
                  value={formData.socialLinks.website}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Website URL"
                  className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="mt-8 text-center">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto ${
                  isSaving 
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <RiSaveLine size={20} />
                    <span>Save Profile</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
        </div>

        <Footer />
    </div>
  )
}

export default UserProfile