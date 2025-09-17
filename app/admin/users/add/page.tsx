"use client";
import React, { useState, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { userAPI } from "../../../utils/api";
import { useRouter } from "next/navigation";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateUsername(username: string) {
  return username.length >= 3;
}
function validatePassword(password: string) {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSpecialChar
  };
}
function validatePhone(phone: string) {
  return phone === "" || (/^\d{7,}$/.test(phone));
}

export default function AddUserPage() {
  const router = useRouter();
  const [avatar, setAvatar] = useState("/vercel.svg");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: false,
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumbers: false,
    hasSpecialChar: false
  });

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    // Update password validation in real-time
    const validation = validatePassword(newPassword);
    setPasswordValidation(validation);
    
    // Clear password error if password becomes valid
    if (validation.isValid && errors.password) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.password;
        return newErrors;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!validateEmail(email)) newErrors.email = "Please enter a valid email address.";
    if (!validateUsername(username)) newErrors.username = "Username must be at least 3 characters.";
    const passwordValidationResult = validatePassword(password);
    if (!passwordValidationResult.isValid) {
      const missingRequirements = [];
      if (!passwordValidationResult.minLength) missingRequirements.push("at least 8 characters");
      if (!passwordValidationResult.hasUpperCase) missingRequirements.push("uppercase letter");
      if (!passwordValidationResult.hasLowerCase) missingRequirements.push("lowercase letter");
      if (!passwordValidationResult.hasNumbers) missingRequirements.push("number");
      if (!passwordValidationResult.hasSpecialChar) missingRequirements.push("special character");
      
      newErrors.password = `Password must contain: ${missingRequirements.join(", ")}.`;
    }
    if (!validatePhone(phone)) newErrors.phone = "Phone number must be at least 7 digits.";
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        setIsSubmitting(true);
        setSubmitMessage(null);
        
        const response = await userAPI.createUser({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          username: username.trim(),
          password,
          phone: phone.trim() || undefined
        });
        
        if (response.success) {
          setSubmitMessage({
            type: 'success',
            text: 'User created successfully! Redirecting to users list...'
          });
          
          // Redirect to users list after 2 seconds
          setTimeout(() => {
            router.push('/admin/users');
          }, 2000);
        } else {
          setSubmitMessage({
            type: 'error',
            text: response.message || 'Failed to create user'
          });
        }
      } catch (err: any) {
        console.error('Error creating user:', err);
        setSubmitMessage({
          type: 'error',
          text: err.response?.data?.message || 'Failed to create user'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#081028]">
      <div className="mx-4 md:mx-8 pt-6 md:pt-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Users <span className="text-base md:text-lg font-normal text-gray-400 ml-4">Add Users</span></h1>
        
        <div className="bg-[#101936] rounded-2xl p-4 md:p-8 border-2 border-[#2B3A5B] max-w-2xl mx-auto">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-6 md:mb-8">
                  <div className="relative">
                    <img src={avatar} alt="avatar" className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-[#E100FF] object-cover" />
                    <button
                      className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-[#E100FF] text-white rounded-full p-1.5 md:p-2 hover:bg-[#c800d6]"
                      onClick={() => avatarInputRef.current?.click()}
                      type="button"
                    >
                      <FaEdit className="text-sm md:text-base" />
                    </button>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>
                  </div>

          {/* Submit Message */}
          {submitMessage && (
            <div className={`p-3 rounded-lg text-sm mb-4 ${
              submitMessage.type === 'success' 
                ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                : 'bg-red-500/20 border border-red-500/30 text-red-400'
            }`}>
              {submitMessage.text}
                </div>
          )}

          {/* Form */}
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                <label className="block text-gray-300 mb-1 text-sm md:text-base">First Name *</label>
                <input 
                  className={`w-full bg-transparent border ${errors.firstName ? 'border-pink-500' : 'border-[#232B43]'} rounded-lg px-3 md:px-4 py-2 text-white focus:outline-none text-sm md:text-base`} 
                  value={firstName} 
                  onChange={e => setFirstName(e.target.value)} 
                  disabled={isSubmitting}
                />
                {errors.firstName && <div className="text-pink-400 text-xs mt-1">{errors.firstName}</div>}
                    </div>
                    <div className="flex-1">
                <label className="block text-gray-300 mb-1 text-sm md:text-base">Last Name *</label>
                <input 
                  className={`w-full bg-transparent border ${errors.lastName ? 'border-pink-500' : 'border-[#232B43]'} rounded-lg px-3 md:px-4 py-2 text-white focus:outline-none text-sm md:text-base`} 
                  value={lastName} 
                  onChange={e => setLastName(e.target.value)} 
                  disabled={isSubmitting}
                />
                {errors.lastName && <div className="text-pink-400 text-xs mt-1">{errors.lastName}</div>}
                    </div>
                  </div>

                  <div>
              <label className="block text-gray-300 mb-1 text-sm md:text-base">Email *</label>
                    <input
                className={`w-full bg-transparent border ${errors.email ? 'border-pink-500' : 'border-[#232B43]'} rounded-lg px-3 md:px-4 py-2 text-white focus:outline-none text-sm md:text-base`} 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                disabled={isSubmitting}
              />
              {errors.email && <div className="text-pink-400 text-xs mt-1">{errors.email}</div>}
                </div>

                <div>
              <label className="block text-gray-300 mb-1 text-sm md:text-base">Username *</label>
                      <input
                className={`w-full bg-transparent border ${errors.username ? 'border-pink-500' : 'border-[#232B43]'} rounded-lg px-3 md:px-4 py-2 text-white focus:outline-none text-sm md:text-base`} 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                disabled={isSubmitting}
              />
              {errors.username && <div className="text-pink-400 text-xs mt-1">{errors.username}</div>}
                  </div>

            <div>
              <label className="block text-gray-300 mb-1 text-sm md:text-base">Phone Number</label>
                    <input
                className={`w-full bg-transparent border ${errors.phone ? 'border-pink-500' : 'border-[#232B43]'} rounded-lg px-3 md:px-4 py-2 text-white focus:outline-none text-sm md:text-base`} 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                placeholder="Enter phone number (optional)"
                disabled={isSubmitting}
              />
              {errors.phone && <div className="text-pink-400 text-xs mt-1">{errors.phone}</div>}
                  </div>

            <div>
              <label className="block text-gray-300 mb-1 text-sm md:text-base">Password *</label>
                  <input
                    type="password"
                className={`w-full bg-transparent border ${errors.password ? 'border-pink-500' : passwordValidation.isValid ? 'border-green-500' : 'border-[#232B43]'} rounded-lg px-3 md:px-4 py-2 text-white focus:outline-none text-sm md:text-base`} 
                value={password} 
                onChange={handlePasswordChange} 
                disabled={isSubmitting}
                placeholder="Enter a strong password"
              />
              
              {/* Password Requirements */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="text-xs text-gray-400 mb-2">Password requirements:</div>
                  <div className={`text-xs flex items-center gap-2 ${passwordValidation.minLength ? 'text-green-400' : 'text-gray-500'}`}>
                    <span className={passwordValidation.minLength ? 'text-green-400' : 'text-gray-500'}>
                      {passwordValidation.minLength ? '✓' : '○'}
                    </span>
                    At least 8 characters
                  </div>
                  <div className={`text-xs flex items-center gap-2 ${passwordValidation.hasUpperCase ? 'text-green-400' : 'text-gray-500'}`}>
                    <span className={passwordValidation.hasUpperCase ? 'text-green-400' : 'text-gray-500'}>
                      {passwordValidation.hasUpperCase ? '✓' : '○'}
                    </span>
                    One uppercase letter
                  </div>
                  <div className={`text-xs flex items-center gap-2 ${passwordValidation.hasLowerCase ? 'text-green-400' : 'text-gray-500'}`}>
                    <span className={passwordValidation.hasLowerCase ? 'text-green-400' : 'text-gray-500'}>
                      {passwordValidation.hasLowerCase ? '✓' : '○'}
                    </span>
                    One lowercase letter
                  </div>
                  <div className={`text-xs flex items-center gap-2 ${passwordValidation.hasNumbers ? 'text-green-400' : 'text-gray-500'}`}>
                    <span className={passwordValidation.hasNumbers ? 'text-green-400' : 'text-gray-500'}>
                      {passwordValidation.hasNumbers ? '✓' : '○'}
                    </span>
                    One number
                  </div>
                  <div className={`text-xs flex items-center gap-2 ${passwordValidation.hasSpecialChar ? 'text-green-400' : 'text-gray-500'}`}>
                    <span className={passwordValidation.hasSpecialChar ? 'text-green-400' : 'text-gray-500'}>
                      {passwordValidation.hasSpecialChar ? '✓' : '○'}
                    </span>
                    One special character (!@#$%^&*)
                  </div>
                </div>
              )}
              
              {errors.password && <div className="text-pink-400 text-xs mt-1">{errors.password}</div>}
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit" 
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-lg font-semibold transition text-sm md:text-base ${
                  isSubmitting 
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                    : 'bg-[#E100FF] text-white hover:bg-[#c800d6]'
                }`}
              >
                {isSubmitting ? 'Creating User...' : 'Add User'} <span className="text-base md:text-lg">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 