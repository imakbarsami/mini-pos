import React, { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiSearch, FiCalendar, FiChevronLeft, FiChevronRight, FiCheck, FiEye } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Pagination from '../components/Pagination';
import Swal from 'sweetalert2';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // filter & pagination state
    const [search, setSearch] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);


    const fetchOrders = async () => {

        setLoading(true);
        try {

            const response = await api.get('/orders', {
                params: {
                    page: currentPage,
                    search,
                    date,
                    status,
                }
            });

            const responseData = response.data.data;
            setOrders(responseData.data);
            setTotalPages(responseData.last_page);
            setTotalItems(responseData.total);

        } catch (error) {
            toast.error('Failed to fetch orders.');
        } finally {
            setLoading(false);
        }
    };


    const handleCompleteOrder = async (orderId) => {

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to mark this order as Completed?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Complete it!',
            cancelButtonText: 'Cancel'
        });


        if (result.isConfirmed) {

            try {

                const response = await api.put(`/orders/${orderId}/complete`);

                if (response.data.status === 200) {
                    Swal.fire(
                        'Completed!',
                        response.data.message,
                        'success'
                    );
                    setOrders(prev =>
                        prev.map(order =>
                            order.id === orderId
                                ? { ...order, status: 'Completed' }
                                : order
                        )
                    );
                }
            } catch (error) {
                const errorMsg = error.response?.data?.message || 'Failed to complete order.';
                Swal.fire('Error!', errorMsg, 'error');
            }
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [search, date, status]);


    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            fetchOrders();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search, date, status, currentPage]);

    return (
        <div className="max-w-7xl mx-auto space-y-6">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">All Orders</h2>
                    <p className="text-sm text-gray-500">Manage and track your orders.</p>
                </div>

                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">

                    {/* Search Box */}
                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FiSearch />
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search order or customer..."
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none bg-gray-50 text-sm"
                        />
                    </div>

                    {/* Date Filter */}
                    <div className="relative w-full sm:w-48">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FiCalendar />
                        </div>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none bg-gray-50 text-sm"
                        />
                    </div>

                    {/* Status Filter  */}
                    <div className="relative w-full sm:w-40">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none bg-gray-50 text-sm appearance-none"
                        >
                            <option value="">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="overflow-x-auto min-h-[400px]">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-3xl" />
                        </div>
                    ) : (
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
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
                                        <td colSpan="6" className="px-6 py-16 text-center text-gray-400">
                                            No orders found matching your criteria.
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
                                            <td className="px-6 py-4 text-right font-semibold text-gray-800">৳{parseFloat(order.grand_total).toFixed(2)}</td>
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
                                                        onClick={() => handleCompleteOrder(order.id)}
                                                        className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors shadow-sm"
                                                        title="Complete Order"
                                                    >
                                                        <FiCheck size={14} /> Complete
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1.5 rounded hover:bg-gray-900 transition-colors shadow-sm"
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
                    )}
                </div>

                {/* Pagination Component */}
                {!loading && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>

        </div>
    );
};

export default Orders;