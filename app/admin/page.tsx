import React from 'react'
import { FaUsers, FaMusic, FaDollarSign, FaHeadphones, FaRegChartBar } from 'react-icons/fa'

const mockData = {
  totalUsers: 1240,
  activeSubscriptions: 320,
  totalSoundKits: 58,
  totalTracks: 210,
  revenueMonth: 4200,
  userGrowth: [100, 120, 140, 180, 200, 220, 250, 300, 350, 400, 420, 500],
  topSoundKits: [
    { name: 'Trap Essentials', sales: 120, revenue: 900, image: '/vercel.svg' },
    { name: 'Lo-Fi Dreams', sales: 95, revenue: 700, image: '/globe.svg' },
    { name: '808 Bass Pack', sales: 80, revenue: 600, image: '/globe.svg' },
  ],
  recentOrders: [
    { customer: 'Lahiru Rathnayake', item: 'Trap Essentials', amount: 29, date: '2024-06-10', status: 'Completed' },
    { customer: 'Kavinda Manohara', item: 'Lo-Fi Dreams', amount: 19, date: '2024-06-09', status: 'Completed' },
    { customer: 'Nipun Perera', item: '808 Bass Pack', amount: 15, date: '2024-06-08', status: 'Pending' },
  ],
}

type DashboardKpiCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

function DashboardKpiCard({ title, value, icon }: DashboardKpiCardProps) {
  return (
    <div className="flex items-center gap-3 md:gap-4 bg-[#101936] rounded-2xl p-4 md:p-6 shadow-xl">
      <div className="text-2xl md:text-3xl text-[#E100FF] bg-[#232B43] rounded-xl p-2 md:p-3">{icon}</div>
      <div>
        <div className="text-lg md:text-2xl font-bold text-white">{value}</div>
        <div className="text-gray-400 text-xs md:text-sm mt-1">{title}</div>
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <main className="flex-1 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Dashboard</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-8 md:mb-10">
        <div className="col-span-2 lg:col-span-1">
          <DashboardKpiCard title="Total Users" value={mockData.totalUsers} icon={<FaUsers />} />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <DashboardKpiCard title="Active Subs" value={mockData.activeSubscriptions} icon={<FaRegChartBar />} />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <DashboardKpiCard title="Sound Kits" value={mockData.totalSoundKits} icon={<FaHeadphones />} />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <DashboardKpiCard title="Tracks" value={mockData.totalTracks} icon={<FaMusic />} />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <DashboardKpiCard title="Revenue" value={`$${mockData.revenueMonth}`} icon={<FaDollarSign />} />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10">
        {/* User Growth Chart (Mock) */}
        <div className="bg-[#101936] rounded-2xl p-4 md:p-6 shadow-xl lg:col-span-2 flex flex-col">
          <div className="text-base md:text-lg font-semibold text-white mb-4">User Growth (Last 12 Months)</div>
          <div className="flex-1 flex items-end gap-1 md:gap-2 h-32 md:h-40">
            {mockData.userGrowth.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-3 md:w-6 rounded-t-lg bg-gradient-to-t from-[#E100FF] to-[#7ED7FF]"
                  style={{ height: `${val / 6}px`, minHeight: '8px' }}
                ></div>
                <div className="text-xs text-gray-500 mt-1 md:mt-2">{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Sound Kits */}
        <div className="bg-[#101936] rounded-2xl p-4 md:p-6 shadow-xl flex flex-col">
          <div className="text-base md:text-lg font-semibold text-white mb-4">Top Sound Kits</div>
          <ul className="divide-y divide-[#232B43]">
            {mockData.topSoundKits.map((kit, i) => (
              <li key={i} className="flex items-center gap-3 md:gap-4 py-3">
                <img src={kit.image} alt={kit.name} className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-cover border-2 border-[#E100FF] bg-white" />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm md:text-base truncate">{kit.name}</div>
                  <div className="text-gray-400 text-xs">Sales: {kit.sales} | Revenue: ${kit.revenue}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-[#101936] rounded-2xl p-4 md:p-6 shadow-xl">
        <div className="text-base md:text-lg font-semibold text-white mb-4">Recent Orders</div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto rounded-2xl shadow-xl bg-[#0A1428]">
          <table className="min-w-full text-white">
            <thead>
              <tr className="bg-[#19213A] text-[#C7C7C7] text-left text-sm">
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Item</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockData.recentOrders.map((order, idx) => (
                <tr
                  key={order.customer + order.item + idx}
                  className={
                    idx % 2 === 0
                      ? "bg-[#181F36] hover:bg-[#232B43] transition-colors"
                      : "bg-[#0A1428] hover:bg-[#232B43] transition-colors"
                  }
                >
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.item}</td>
                  <td className="px-6 py-4">${order.amount}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {mockData.recentOrders.map((order, idx) => (
            <div
              key={order.customer + order.item + idx}
              className="bg-[#0A1428] rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold text-lg">{order.customer}</h3>
                  <p className="text-gray-400 text-sm">{order.item}</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-lg">${order.amount}</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Completed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="text-gray-400 text-sm">
                Date: {order.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Dashboard
