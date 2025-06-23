import React from 'react';

const user = {
  name: 'John Carter',
  email: 'john.carter@gmail.com',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
};

const AdminNavbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-16 py-4 bg-[#081028] border-b border-[#232B43] shadow-sm">
      <div className="text-xl font-semibold text-white">Welcome back, {user.name}</div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="font-medium text-white">{user.name}</div>
          <div className="text-xs text-gray-400">{user.email}</div>
        </div>
        <img
          src={user.image}
          alt="User profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-[#E100FF]"
        />
      </div>
    </nav>
  );
};

export default AdminNavbar; 