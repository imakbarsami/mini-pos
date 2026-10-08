import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import api from '../services/api';
import toast from 'react-hot-toast';

const CustomerModal = ({ isOpen, onClose, onSuccess, customerToEdit }) => {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    });

    useEffect(() => {

        if (customerToEdit && isOpen) {

            setFormData({
                name: customerToEdit.name,
                phone: customerToEdit.phone,
                email: customerToEdit.email || '',
                address: customerToEdit.address || ''
            });

        } else if (isOpen) {
            setFormData({ name: '', phone: '', email: '', address: '' });
        }
    }, [customerToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const toastId = toast.loading('Saving customer...');

        try {

            const url = customerToEdit ? `/customers/${customerToEdit.id}` : '/customers';
            const method = customerToEdit ? 'put' : 'post';

            const response = await api[method](url, formData);

            if (response.data.status === 201 || response.data.status === 200) {

                toast.success(response.data.message, { id: toastId });
                setFormData({ name: '', phone: '', email: '', address: '' });

                onSuccess();
                onClose();
            }

        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save customer.', { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">

                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">
                        {customerToEdit ? 'Edit Customer' : 'Add New Customer'}
                    </h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer">
                        <FiX size={20} />
                    </button>
                </div>

                <div className="p-6">
                    
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" placeholder="e.g. John Doe" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                                <input type="number" name="phone" required value={formData.phone} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" placeholder="01XXXXXXXXX" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" placeholder="Optional" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea name="address" rows="3" value={formData.address} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" placeholder="Optional address details..."></textarea>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">Cancel</button>
                            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 cursor-pointer">
                                {loading ? 'Saving...' : (customerToEdit ? 'Update Customer' : 'Save Customer')}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerModal;