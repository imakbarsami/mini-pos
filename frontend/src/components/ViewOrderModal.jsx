import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import api from '../services/api';
import toast from 'react-hot-toast';

const ViewOrderModal = ({ isOpen, onClose, orderId }) => {

    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (isOpen && orderId) {
            fetchOrderDetails();
        } else {
            setOrderData(null);
        }
    }, [isOpen, orderId]);

    const fetchOrderDetails = async () => {

        setLoading(true);

        try {

            const response = await api.get(`/orders/${orderId}`);

            if (response.data.status === 200) {
                setOrderData(response.data.data);
            }

        } catch (error) {
            toast.error('Failed to load order details.');
            onClose();
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen)
        return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">

            {/* Modal Container */}
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-800">
                        Order Details {orderData && <span className="text-blue-600">#{orderData.order_info.order_number}</span>}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* Content Body */}
                <div className="p-6 overflow-y-auto">
                    {loading || !orderData ? (
                        <div className="flex justify-center items-center h-40">
                            <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-3xl" />
                        </div>
                    ) : (
                        <div className="space-y-6">

                            {/* Customer & Info Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Customer Info</h3>
                                    <p className="font-semibold text-gray-800">{orderData.customer_info.name}</p>
                                    <p className="text-sm text-gray-600">{orderData.customer_info.phone}</p>
                                </div>
                                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Order Info</h3>
                                    
                                    <p className="text-sm text-gray-600">Order Date: <span className="font-medium text-gray-800">
                                        {new Date(orderData.order_info.order_date).toLocaleString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </span></p>


                                    {
                                        orderData?.order_info.status==='Completed' && <p className="text-sm text-gray-600">Paid Date: <span className="font-medium text-gray-800">
                                        {new Date(orderData.order_info.order_complete_date).toLocaleString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </span></p>
                                    }

                                    <p className="text-sm text-gray-600 mt-2">Status:
                                        <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${orderData.order_info.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {orderData.order_info.status}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Items Table */}
                            <div className="border border-gray-100 rounded-xl overflow-hidden">
                                <table className="w-full text-sm text-left text-gray-600">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-4 py-3">Item</th>
                                            <th className="px-4 py-3 text-center">Qty</th>
                                            <th className="px-4 py-3 text-right">Price</th>
                                            <th className="px-4 py-3 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {orderData.items.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-3 font-medium text-gray-700">{item.product_name}</td>
                                                <td className="px-4 py-3 text-center">{item.quantity}</td>
                                                <td className="px-4 py-3 text-right">৳{parseFloat(item.unit_price).toFixed(2)}</td>
                                                <td className="px-4 py-3 font-semibold text-gray-800 text-right">৳{parseFloat(item.line_total).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Summary */}
                            <div className="flex justify-end pt-2">
                                <div className="w-full md:w-1/2 space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal:</span>
                                        <span className="font-medium">৳{parseFloat(orderData.order_info.sub_total).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax:</span>
                                        <span className="font-medium">৳{parseFloat(orderData.order_info.tax_amount).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-gray-800 border-t border-gray-100 pt-2 mt-2">
                                        <span>Total:</span>
                                        <span className="text-blue-600">৳{parseFloat(orderData.order_info.grand_total).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default ViewOrderModal;