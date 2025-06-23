import React from 'react'
import AdminSidebar from './components/AdminSidebar'

function page() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
        <p className="text-gray-700">This is the admin page where you can manage your application.</p>
        <ul className="list-disc pl-5 mt-4">
            <li>Manage users</li>
            <li>View analytics</li>
            <li>Configure settings</li>
        </ul>
        <p className="mt-4">Use the navigation menu to access different sections of the admin panel.</p>
      </main>
    </div>
  )
}

export default page
