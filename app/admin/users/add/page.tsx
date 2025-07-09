"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";

const locations = ["Colombo", "London", "New York", "Berlin"];

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateUsername(username: string) {
  return username.length >= 3;
}
function validatePassword(password: string) {
  return password.length >= 6;
}
function validatePhone(phone: string) {
  return phone === "" || (/^\d{7,}$/.test(phone));
}

const countryData = [
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+7', name: 'Russia', flag: '🇷🇺' },
  // ...add more as needed, or use a full list for production...
];

export default function AddUserPage() {
  const [tab, setTab] = useState("profile");
  const [avatar, setAvatar] = useState("/vercel.svg");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [twoFactor, setTwoFactor] = useState("");
  const [twoFactorType, setTwoFactorType] = useState<"none" | "sms">("none");
  const [hasPhone, setHasPhone] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [modal, setModal] = useState<null | "email" | "username" | "password" | "phone" | "2fa" | "changePhone">(null);
  const [modalValue, setModalValue] = useState("");
  const [passwordModal, setPasswordModal] = useState({ current: "", new: "", confirm: "" });
  const [passwordModalErrors, setPasswordModalErrors] = useState<{ [key: string]: string }>({});
  const [changePhoneModal, setChangePhoneModal] = useState({ country: '', phone: '', password: '' });
  const [changePhoneModalErrors, setChangePhoneModalErrors] = useState<{ [key: string]: string }>({});
  const [role, setRole] = useState("");
  const roleOptions = ["User", "Admin", "Moderator"];
  const [emailModal, setEmailModal] = useState({ email: "", password: "" });
  const [emailModalErrors, setEmailModalErrors] = useState<{ [key: string]: string }>({});
  const [usernameModal, setUsernameModal] = useState({ username: "", password: "" });
  const [usernameModalErrors, setUsernameModalErrors] = useState<{ [key: string]: string }>({});
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countryCodes = [
    '+1', '+7', '+20', '+27', '+30', '+31', '+32', '+33', '+34', '+36', '+39', '+40', '+41', '+43', '+44', '+45', '+46', '+47', '+48', '+49',
    '+51', '+52', '+53', '+54', '+55', '+56', '+57', '+58', '+60', '+61', '+62', '+63', '+64', '+65', '+66', '+81', '+82', '+84', '+86',
    '+90', '+91', '+92', '+93', '+94', '+95', '+98', '+211', '+212', '+213', '+216', '+218', '+220', '+221', '+222', '+223', '+224',
    '+225', '+226', '+227', '+228', '+229', '+230', '+231', '+232', '+233', '+234', '+235', '+236', '+237', '+238', '+239', '+240',
    '+241', '+242', '+243', '+244', '+245', '+246', '+248', '+249', '+250', '+251', '+252', '+253', '+254', '+255', '+256', '+257',
    '+258', '+260', '+261', '+262', '+263', '+264', '+265', '+266', '+267', '+268', '+269', '+290', '+291', '+297', '+298', '+299',
    '+350', '+351', '+352', '+353', '+354', '+355', '+356', '+357', '+358', '+359', '+370', '+371', '+372', '+373', '+374', '+375',
    '+376', '+377', '+378', '+380', '+381', '+382', '+383', '+385', '+386', '+387', '+389', '+420', '+421', '+423', '+500', '+501',
    '+502', '+503', '+504', '+505', '+506', '+507', '+508', '+509', '+590', '+591', '+592', '+593', '+594', '+595', '+596', '+597',
    '+598', '+599', '+670', '+672', '+673', '+674', '+675', '+676', '+677', '+678', '+679', '+680', '+681', '+682', '+683', '+685',
    '+686', '+687', '+688', '+689', '+690', '+691', '+692', '+850', '+852', '+853', '+855', '+856', '+870', '+871', '+872', '+873',
    '+874', '+878', '+880', '+881', '+882', '+883', '+886', '+888', '+960', '+961', '+962', '+963', '+964', '+965', '+966', '+967',
    '+968', '+970', '+971', '+972', '+973', '+974', '+975', '+976', '+977', '+992', '+993', '+994', '+995', '+996', '+998', '+1242',
    '+1246', '+1264', '+1268', '+1284', '+1340', '+1345', '+1441', '+1473', '+1649', '+1664', '+1670', '+1671', '+1684', '+1758',
    '+1767', '+1784', '+1787', '+1809', '+1868', '+1869', '+1876', '+1939'
  ];

  useEffect(() => {
    // Simulate fetching existing user data
    setPhone("0775443213");
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) {
        setCountryDropdownOpen(false);
      }
    }
    if (countryDropdownOpen) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [countryDropdownOpen]);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  }

  function handleCredentialSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!validateEmail(email)) newErrors.email = "Please enter a valid email address.";
    if (!validateUsername(username)) newErrors.username = "Username must be at least 3 characters.";
    if (!validatePassword(password)) newErrors.password = "Password must be at least 6 characters.";
    if (!validatePhone(phone)) newErrors.phone = "Phone number must be at least 7 digits.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Submit logic here
    }
  }

  function openModal(type: typeof modal) {
    setModal(type);
    setModalValue("");
    if (type === "password") {
      setPasswordModal({ current: "", new: "", confirm: "" });
      setPasswordModalErrors({});
    }
    if (type === "phone" || type === "changePhone") {
      setChangePhoneModal({ country: '', phone: '', password: '' });
      setChangePhoneModalErrors({});
    }
    if (type === "email") {
      setEmailModal({ email: "", password: "" });
      setEmailModalErrors({});
    }
    if (type === "username") {
      setUsernameModal({ username: "", password: "" });
      setUsernameModalErrors({});
    }
  }
  function closeModal() {
    setModal(null);
    setModalValue("");
    setPasswordModal({ current: "", new: "", confirm: "" });
    setPasswordModalErrors({});
    setChangePhoneModal({ country: '', phone: '', password: '' });
    setChangePhoneModalErrors({});
    setEmailModal({ email: "", password: "" });
    setEmailModalErrors({});
    setUsernameModal({ username: "", password: "" });
    setUsernameModalErrors({});
  }
  function handleModalSave() {
    if (modal === "password") {
      const errors: { [key: string]: string } = {};
      if (!passwordModal.current) errors.current = "Current password is required.";
      if (!passwordModal.new || passwordModal.new.length < 6) errors.new = "New password must be at least 6 characters.";
      if (passwordModal.new !== passwordModal.confirm) errors.confirm = "Passwords do not match.";
      setPasswordModalErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }
    if (modal === "changePhone") {
      const errors: { [key: string]: string } = {};
      if (!changePhoneModal.country) errors.country = "Country code is required.";
      if (!changePhoneModal.phone || !/^\d{7,}$/.test(changePhoneModal.phone)) errors.phone = "Phone number must be at least 7 digits.";
      if (!changePhoneModal.password) errors.password = "Password is required.";
      setChangePhoneModalErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }
    if (modal === "phone") {
      // legacy, do nothing
    }
    if (modal === "email") {
      const errors: { [key: string]: string } = {};
      if (!emailModal.password) errors.password = "Password is required.";
      setEmailModalErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }
    if (modal === "username") {
      const errors: { [key: string]: string } = {};
      if (!usernameModal.password) errors.password = "Password is required.";
      setUsernameModalErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }
    // Save logic here (update state, call API, etc.)
    closeModal();
  }

  return (
    <div className="min-h-screen bg-[#081028]">
      <div className="mx-4 md:mx-8 pt-6 md:pt-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Users <span className="text-base md:text-lg font-normal text-gray-400 ml-4">Add Users</span></h1>
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Left: Account Settings Nav */}
          <div className="w-full lg:w-72 bg-[#101936] rounded-2xl p-4 md:p-6 flex flex-col gap-2 border border-[#1B2A4B]">
            <div className="text-white text-lg font-semibold mb-4">Account Settings</div>
            <button
              className={`text-left px-4 py-2 rounded-lg font-medium ${tab === "profile" ? "bg-[#E100FF] text-white" : "text-gray-300 hover:bg-[#232B43]"}`}
              onClick={() => setTab("profile")}
            >
              Profile
            </button>
            <button
              className={`text-left px-4 py-2 rounded-lg font-medium ${tab === "credential" ? "bg-[#E100FF] text-white" : "text-gray-300 hover:bg-[#232B43]"}`}
              onClick={() => setTab("credential")}
            >
              Credential
            </button>
          </div>
          {/* Right: Tab Content */}
          <div className="flex-1 bg-[#101936] rounded-2xl p-4 md:p-8 border-2 border-[#2B3A5B] flex flex-col items-center">
            {tab === "profile" ? (
              <>
                <div className="flex flex-col items-center mb-6 md:mb-8 w-full">
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
                  <div className="mt-3 md:mt-4 text-center">
                    <div className="text-lg md:text-xl font-bold text-white">Lahiru Rathnayke</div>
                    <div className="text-sm md:text-md text-gray-400">ApeXaliya</div>
                  </div>
                </div>
                <form className="w-full max-w-xl mx-auto flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-300 mb-1 text-sm md:text-base">First Name</label>
                      <input className="w-full bg-transparent border border-[#232B43] rounded-lg px-3 md:px-4 py-2 text-white focus:outline-none text-sm md:text-base" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-300 mb-1 text-sm md:text-base">Last Name</label>
                      <input className="w-full bg-transparent border border-[#232B43] rounded-lg px-3 md:px-4 py-2 text-white focus:outline-none text-sm md:text-base" value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1 text-sm md:text-base">Display Name</label>
                    <input className="w-full bg-transparent border border-[#232B43] rounded-lg px-3 md:px-4 py-2 text-white focus:outline-none text-sm md:text-base" value={displayName} onChange={e => setDisplayName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1 text-sm md:text-base">Location</label>
                    <input className="w-full bg-transparent border border-[#232B43] rounded-lg px-3 md:px-4 py-2 text-white focus:outline-none text-sm md:text-base" value={location} onChange={e => setLocation(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1 text-sm md:text-base">Biography</label>
                    <textarea className="w-full bg-transparent border border-[#232B43] rounded-lg px-3 md:px-4 py-2 text-white focus:outline-none min-h-[80px] md:min-h-[100px] text-sm md:text-base" value={bio} onChange={e => setBio(e.target.value)} />
                  </div>
                  <div className="flex justify-end mt-4">
                    <button type="submit" className="flex items-center gap-2 px-4 md:px-6 py-2 rounded-lg bg-[#E100FF] text-white font-semibold hover:bg-[#c800d6] transition text-sm md:text-base">
                      Save Changes <span className="text-base md:text-lg">→</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <form className="w-full max-w-xl mx-auto flex flex-col gap-4" onSubmit={handleCredentialSubmit}>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="block text-gray-300 mb-1 flex-1 text-sm md:text-base">Email</label>
                  <span className="text-[#E100FF] text-xs md:text-sm cursor-pointer" onClick={() => openModal("email")}>Change e-mail address</span>
                </div>
                <input className={`w-full bg-transparent border ${errors.email ? 'border-pink-500' : 'border-[#232B43]'} rounded-lg px-3 md:px-4 py-2 text-white focus:outline-none text-sm md:text-base`} value={email} onChange={e => setEmail(e.target.value)} />
                {errors.email && <div className="text-pink-400 text-xs mb-2">{errors.email}</div>}
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="block text-gray-300 mb-1 flex-1 text-sm md:text-base">Username</label>
                  <span className="text-[#E100FF] text-xs md:text-sm cursor-pointer" onClick={() => openModal("username")}>Change username</span>
                </div>
                <input className={`w-full bg-transparent border ${errors.username ? 'border-pink-500' : 'border-[#232B43]'} rounded-lg px-3 md:px-4 py-2 text-white focus:outline-none text-sm md:text-base`} value={username} onChange={e => setUsername(e.target.value)} />
                {errors.username && <div className="text-pink-400 text-xs mb-2">{errors.username}</div>}
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="block text-gray-300 mb-1 flex-1 text-sm md:text-base">Password</label>
                  <span className="text-[#E100FF] text-xs md:text-sm cursor-pointer" onClick={() => openModal("password")}>Change password</span>
                </div>
                <div className="w-full bg-transparent border border-[#232B43] rounded-lg px-3 md:px-4 py-2 text-white flex items-center">
                  <span className="tracking-widest select-none text-sm md:text-base">••••••••</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="block text-gray-300 mb-1 flex-1 text-sm md:text-base">Phone number</label>
                  <span className="text-[#E100FF] text-xs md:text-sm cursor-pointer" onClick={() => openModal("changePhone")}>Change phone number</span>
                </div>
                <div className="w-full bg-transparent border border-[#232B43] rounded-lg px-3 md:px-4 py-2 text-white flex items-center mb-4">
                  <span className="tracking-widest select-none text-sm md:text-base">{phone ? phone.replace(/(\d{2})\d{5}(\d{3})/, '$1*****$2') : "Not set"}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="block text-gray-300 mb-1 flex-1 text-sm md:text-base">2-factor authentication</label>
                  <span className="text-[#E100FF] text-xs md:text-sm cursor-pointer" onClick={() => openModal("2fa")}>Change security method</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="twofa"
                      value="none"
                      checked={twoFactorType === "none"}
                      onChange={() => setTwoFactorType("none")}
                      className="accent-[#E100FF] w-4 h-4 md:w-5 md:h-5"
                    />
                    <span className="text-white text-base md:text-lg">None</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="twofa"
                      value="sms"
                      checked={twoFactorType === "sms"}
                      onChange={() => setTwoFactorType("sms")}
                      className="accent-[#E100FF] w-4 h-4 md:w-5 md:h-5"
                    />
                    <span className="text-white text-base md:text-lg">Text Message (sms)</span>
                  </label>
                </div>
                {twoFactorType === "sms" && !hasPhone && (
                  <div className="mt-6">
                    <div className="text-lg md:text-xl text-white font-semibold mb-2">Please add a phone number</div>
                    <div className="text-gray-400 mb-2 text-sm md:text-base">To be able to activates SMS security, you first need to associate a phone number to your account</div>
                    <button type="button" className="text-[#E100FF] font-medium hover:underline text-sm md:text-base" onClick={() => { closeModal(); openModal("phone"); }}>Add phone number</button>
                  </div>
                )}
                <div className="flex justify-end mt-4">
                  <button type="submit" className="flex items-center gap-2 px-4 md:px-6 py-2 rounded-lg bg-[#E100FF] text-white font-semibold hover:bg-[#c800d6] transition text-sm md:text-base">
                    Save Changes <span className="text-base md:text-lg">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      {/* Modals for credential actions */}
      {modal && (
        <div className="fixed inset-0 bg-[#0008] flex items-center justify-center z-50 p-4">
          <div className="bg-[#101936] rounded-2xl p-4 md:p-8 shadow-xl w-full max-w-md mx-4 relative">
            <button onClick={closeModal} className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-white"><FaTimes className="text-lg md:text-xl" /></button>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
              {modal === "email" && "Change E-mail Address"}
              {modal === "username" && "Change Username"}
              {modal === "password" && "Change Password"}
              {modal === "phone" && "Add Phone Number"}
              {modal === "2fa" && "Change Security Method"}
              {modal === "changePhone" && "Change Phone Number"}
            </h2>
            <div className="space-y-3 md:space-y-4">
              {(modal === "email" || modal === "username" || modal === "phone" || modal === "changePhone") && (
                <input
                  type="text"
                  className="w-full bg-[#181F36] text-white rounded-lg px-3 md:px-4 py-2 focus:outline-none border border-[#232B43] focus:border-[#E100FF] text-sm md:text-base"
                  placeholder={
                    modal === "email" ? "Enter new e-mail address..." :
                    modal === "username" ? "Enter new username..." :
                    modal === "phone" ? "Enter phone number..." :
                    "Enter new phone number..."
                  }
                  value={modalValue}
                  onChange={e => setModalValue(e.target.value)}
                />
              )}
              {modal === "password" && (
                <>
                  <input
                    type="password"
                    className={`w-full bg-[#181F36] text-white rounded-lg px-3 md:px-4 py-2 focus:outline-none border ${passwordModalErrors.current ? 'border-pink-500' : 'border-[#232B43]'} focus:border-[#E100FF] text-sm md:text-base`}
                    placeholder="Current password"
                    value={passwordModal.current}
                    onChange={e => setPasswordModal({ ...passwordModal, current: e.target.value })}
                  />
                  {passwordModalErrors.current && <div className="text-pink-400 text-xs mb-2">{passwordModalErrors.current}</div>}
                  <input
                    type="password"
                    className={`w-full bg-[#181F36] text-white rounded-lg px-3 md:px-4 py-2 focus:outline-none border ${passwordModalErrors.new ? 'border-pink-500' : 'border-[#232B43]'} focus:border-[#E100FF] text-sm md:text-base`}
                    placeholder="New password"
                    value={passwordModal.new}
                    onChange={e => setPasswordModal({ ...passwordModal, new: e.target.value })}
                  />
                  {passwordModalErrors.new && <div className="text-pink-400 text-xs mb-2">{passwordModalErrors.new}</div>}
                  <input
                    type="password"
                    className={`w-full bg-[#181F36] text-white rounded-lg px-3 md:px-4 py-2 focus:outline-none border ${passwordModalErrors.confirm ? 'border-pink-500' : 'border-[#232B43]'} focus:border-[#E100FF] text-sm md:text-base`}
                    placeholder="Confirm new password"
                    value={passwordModal.confirm}
                    onChange={e => setPasswordModal({ ...passwordModal, confirm: e.target.value })}
                  />
                  {passwordModalErrors.confirm && <div className="text-pink-400 text-xs mb-2">{passwordModalErrors.confirm}</div>}
                </>
              )}
              {modal === "phone" && (
                <>
                  <input
                    type="password"
                    className={`w-full bg-[#181F36] text-white rounded-lg px-3 md:px-4 py-2 focus:outline-none border ${changePhoneModalErrors.password ? 'border-pink-500' : 'border-[#232B43]'} focus:border-[#E100FF] text-sm md:text-base`}
                    placeholder="Enter your password..."
                    value={changePhoneModal.password}
                    onChange={e => setChangePhoneModal({ ...changePhoneModal, password: e.target.value })}
                  />
                  {changePhoneModalErrors.password && <div className="text-pink-400 text-xs mb-2">{changePhoneModalErrors.password}</div>}
                </>
              )}
              {modal === "email" && (
                <>
                  <input
                    type="password"
                    className={`w-full bg-[#181F36] text-white rounded-lg px-3 md:px-4 py-2 focus:outline-none border ${emailModalErrors.password ? 'border-pink-500' : 'border-[#232B43]'} focus:border-[#E100FF] text-sm md:text-base`}
                    placeholder="Enter your password..."
                    value={emailModal.password}
                    onChange={e => setEmailModal({ ...emailModal, password: e.target.value })}
                  />
                  {emailModalErrors.password && <div className="text-pink-400 text-xs mb-2">{emailModalErrors.password}</div>}
                </>
              )}
              {modal === "username" && (
                <>
                  <input
                    type="password"
                    className={`w-full bg-[#181F36] text-white rounded-lg px-3 md:px-4 py-2 focus:outline-none border ${usernameModalErrors.password ? 'border-pink-500' : 'border-[#232B43]'} focus:border-[#E100FF] text-sm md:text-base`}
                    placeholder="Enter your password..."
                    value={usernameModal.password}
                    onChange={e => setUsernameModal({ ...usernameModal, password: e.target.value })}
                  />
                  {usernameModalErrors.password && <div className="text-pink-400 text-xs mb-2">{usernameModalErrors.password}</div>}
                </>
              )}
              {modal === "2fa" && (
                <div>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="twofa"
                        value="none"
                        checked={twoFactorType === "none"}
                        onChange={() => setTwoFactorType("none")}
                        className="accent-[#E100FF] w-4 h-4 md:w-5 md:h-5"
                      />
                      <span className="text-white text-base md:text-lg">None</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="twofa"
                        value="sms"
                        checked={twoFactorType === "sms"}
                        onChange={() => setTwoFactorType("sms")}
                        className="accent-[#E100FF] w-4 h-4 md:w-5 md:h-5"
                      />
                      <span className="text-white text-base md:text-lg">Text Message (sms)</span>
                    </label>
                  </div>
                  {twoFactorType === "sms" && !hasPhone && (
                    <div className="mt-6">
                      <div className="text-lg md:text-xl text-white font-semibold mb-2">Please add a phone number</div>
                      <div className="text-gray-400 mb-2 text-sm md:text-base">To be able to activates SMS security, you first need to associate a phone number to your account</div>
                      <button type="button" className="text-[#E100FF] font-medium hover:underline text-sm md:text-base" onClick={() => { closeModal(); openModal("phone"); }}>Add phone number</button>
                    </div>
                  )}
                </div>
              )}
              {modal === "changePhone" && (
                <>
                  <div className="flex flex-col md:flex-row gap-2 mb-2 items-center">
                    <div className="relative w-full md:w-48" ref={countryDropdownRef}>
                      <button
                        type="button"
                        className={`w-full flex items-center justify-between bg-[#181F36] text-white rounded-lg px-3 md:px-4 py-2 border ${changePhoneModalErrors.country ? 'border-pink-500' : 'border-[#232B43]'} focus:border-[#E100FF] focus:outline-none text-sm md:text-base`}
                        onClick={() => setCountryDropdownOpen((open) => !open)}
                      >
                        {changePhoneModal.country ? (
                          <span className="flex items-center gap-2">
                            {countryData.find(c => c.code === changePhoneModal.country)?.flag}
                            <span className="text-white text-sm md:text-base">{countryData.find(c => c.code === changePhoneModal.country)?.name}</span>
                            <span className="text-gray-400 text-sm md:text-base">({changePhoneModal.country})</span>
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm md:text-base">Select country code</span>
                        )}
                        <span className="ml-2 text-base md:text-lg">▼</span>
                      </button>
                      {countryDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-2 bg-[#181F36] border border-[#232B43] rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                          {countryData.map((country) => (
                            <button
                              type="button"
                              key={country.code}
                              className={`w-full flex items-center gap-2 px-3 md:px-4 py-2 hover:bg-[#232B43] ${changePhoneModal.country === country.code ? 'bg-[#232B43]' : ''} text-sm md:text-base`}
                              onClick={() => {
                                setChangePhoneModal({ ...changePhoneModal, country: country.code });
                                setCountryDropdownOpen(false);
                              }}
                            >
                              <span>{country.flag}</span>
                              <span className="text-white">{country.name}</span>
                              <span className="ml-auto text-gray-400">{country.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      className={`flex-1 bg-[#181F36] text-white rounded-lg px-3 md:px-4 py-2 focus:outline-none border ${changePhoneModalErrors.phone ? 'border-pink-500' : 'border-[#232B43]'} focus:border-[#E100FF] text-sm md:text-base`}
                      placeholder="Enter phone number..."
                      value={changePhoneModal.phone}
                      onChange={e => setChangePhoneModal({ ...changePhoneModal, phone: e.target.value })}
                    />
                  </div>
                  {changePhoneModalErrors.country && <div className="text-pink-400 text-xs mb-2">{changePhoneModalErrors.country}</div>}
                  {changePhoneModalErrors.phone && <div className="text-pink-400 text-xs mb-2">{changePhoneModalErrors.phone}</div>}
                  <input
                    type="password"
                    className={`w-full bg-[#181F36] text-white rounded-lg px-3 md:px-4 py-2 focus:outline-none border ${changePhoneModalErrors.password ? 'border-pink-500' : 'border-[#232B43]'} focus:border-[#E100FF] text-sm md:text-base`}
                    placeholder="Enter your password..."
                    value={changePhoneModal.password}
                    onChange={e => setChangePhoneModal({ ...changePhoneModal, password: e.target.value })}
                  />
                  {changePhoneModalErrors.password && <div className="text-pink-400 text-xs mb-2">{changePhoneModalErrors.password}</div>}
                </>
              )}
            </div>
            <div className="flex gap-3 md:gap-4 mt-4 md:mt-6">
              <button
                onClick={closeModal}
                className="flex-1 py-2 rounded-lg bg-[#232B43] text-white font-semibold hover:bg-[#181F36] transition-colors text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                className="flex-1 py-2 rounded-lg bg-[#E100FF] text-white font-semibold hover:bg-[#c800d6] transition-colors text-sm md:text-base"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 