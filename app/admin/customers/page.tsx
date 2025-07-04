"use client";
import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { getCustomers, Customer } from "./customer";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(customers.length / pageSize));
  const paginatedCustomers = customers.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    async function fetchCustomers() {
      setLoading(true);
      // Simulate async fetch
      const data = await Promise.resolve(getCustomers());
      setCustomers(data);
      setLoading(false);
    }
    fetchCustomers();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-[#081028]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-4">
          Customers <span className="text-lg font-normal text-gray-400">All Customers</span>
        </h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search for..."
              className="w-full px-4 py-2 rounded-full bg-[#101936] text-sm text-white placeholder-gray-400 focus:outline-none border border-[#232F4B]"
            />
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow-xl bg-[#101936]">
        <table className="min-w-full text-white">
          <thead>
            <tr className="bg-[#19213A] text-[#C7C7C7] text-left text-sm">
              <th className="px-6 py-4 font-semibold">Image</th>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Display Name</th>
              <th className="px-6 py-4 font-semibold">Phone</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">Loading...</td>
              </tr>
            ) : paginatedCustomers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">No customers found.</td>
              </tr>
            ) : (
              paginatedCustomers.map((customer, idx) => (
                <tr
                  key={customer.id + '-' + idx}
                  className={
                    idx % 2 === 0
                      ? "bg-[#181F36] hover:bg-[#232B43] transition-colors"
                      : "bg-[#081028] hover:bg-[#232B43] transition-colors"
                  }
                >
                  <td className="px-6 py-4">
                    <img src={customer.image} alt={customer.name} className="w-10 h-10 rounded-full object-cover" />
                  </td>
                  <td className="px-6 py-4">{customer.name}</td>
                  <td className="px-6 py-4">{customer.displayName}</td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4 flex gap-4 text-lg">
                    <button className="text-white hover:text-[#7ED7FF] transition-colors" title="View"><FaEye /></button>
                    <button className="text-white hover:text-[#E100FF] transition-colors" title="Edit"><FaEdit /></button>
                    <button className="text-white hover:text-red-500 transition-colors" title="Delete"><FaTrash /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View */}
      <div className="md:hidden space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading...</div>
        ) : paginatedCustomers.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No customers found.</div>
        ) : (
          paginatedCustomers.map((customer, idx) => (
            <div
              key={customer.id + '-' + idx}
              className="bg-[#101936] rounded-xl p-4 shadow-lg border border-[#232B43]"
            >
              <div className="flex items-start gap-4 mb-3">
                <img 
                  src={customer.image} 
                  alt={customer.name} 
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1 truncate">{customer.name}</h3>
                  <p className="text-[#7ED7FF] text-sm mb-1">{customer.displayName}</p>
                  <p className="text-gray-400 text-sm mb-1">{customer.phone}</p>
                  <p className="text-gray-400 text-sm truncate">{customer.email}</p>
                </div>
              </div>
              <div className="flex gap-3 text-lg justify-end">
                <button className="text-white hover:text-[#7ED7FF] transition-colors p-1" title="View">
                  <FaEye />
                </button>
                <button className="text-white hover:text-[#E100FF] transition-colors p-1" title="Edit">
                  <FaEdit />
                </button>
                <button className="text-white hover:text-red-500 transition-colors p-1" title="Delete">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 text-white gap-4">
        <span className="text-sm text-gray-400 text-center sm:text-left">
          Showing data {customers.length === 0 ? 0 : (page - 1) * pageSize + 1} to {Math.min(page * pageSize, customers.length)} of {customers.length} entries
        </span>
        <div className="flex gap-2 items-center">
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center ${page === 1 ? 'bg-[#232B43] text-gray-500' : 'bg-[#232B43] hover:bg-[#E100FF] hover:text-white'} transition-colors`}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            {'<'}
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
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
} 