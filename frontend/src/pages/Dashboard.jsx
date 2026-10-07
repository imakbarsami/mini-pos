import React, { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import {
  FiTrendingUp,
  FiDollarSign,
  FiPieChart,
  FiShoppingCart,
  FiClock,
  FiCheckCircle,
  FiEye,
  FiCheck
} from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Dashboard = () => {

  const [summary, setSummary] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {

    try {

      const [dashboardRes, ordersRes] = await Promise.all([
        api.get('/dashboard'),
        api.get('/orders?limit=5')
      ]);

      setSummary(dashboardRes.data.data);
      setOrders(ordersRes.data.data.data);

    } catch (error) {
      toast.error('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-4xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Accounting Summary Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Accounting Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Sales Revenue Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-4 bg-green-50 rounded-xl text-green-600">
              <FiTrendingUp size={24} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Sales Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800">৳{summary?.accounting_summary.sales_revenue || '0.00'}</h3>
            </div>

          </div>

          {/* Accounts Receivable Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-4 bg-blue-50 rounded-xl text-blue-600">
              <FiDollarSign size={24} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Accounts Receivable</p>
              <h3 className="text-2xl font-bold text-gray-800">৳{summary?.accounting_summary.accounts_receivable || '0.00'}</h3>
            </div>

          </div>

          {/* Tax Payable Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-4 bg-red-50 rounded-xl text-red-500">
              <FiPieChart size={24} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Tax Payable</p>
              <h3 className="text-2xl font-bold text-gray-800">৳{summary?.accounting_summary.tax_payable || '0.00'}</h3>
            </div>

          </div>
        </div>
      </div>

      {/* Orders Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-gray-50 rounded-xl text-gray-600">
            <FiShoppingCart size={24} />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <h3 className="text-xl font-bold text-gray-800">{summary?.orders_summary.total_orders || 0}</h3>
          </div>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-orange-50 rounded-xl text-orange-500">
            <FiClock size={24} />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Pending Orders</p>
            <h3 className="text-xl font-bold text-gray-800">{summary?.orders_summary.pending_orders || 0}</h3>
          </div>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-emerald-50 rounded-xl text-emerald-500">
            <FiCheckCircle size={24} />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Completed Orders</p>
            <h3 className="text-xl font-bold text-gray-800">{summary?.orders_summary.completed_orders || 0}</h3>
          </div>

        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4">Order No</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Grand Total</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{order.order_number}</td>
                    <td className="px-6 py-4">{order.customer?.name}</td>
                    <td className="px-6 py-4">
                      {new Date(order.created_at).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">৳{parseFloat(order.grand_total).toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-orange-100 text-orange-700'
                        }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                      {order.status === 'Pending' ? (
                        <button
                          className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors"
                          title="Complete Order"
                        >
                          <FiCheck size={14} /> Complete
                        </button>
                      ) : (
                        <button
                          className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1.5 rounded hover:bg-gray-900 transition-colors"
                          title="View Invoice"
                        >
                          <FiEye size={14} /> Invoice
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;