import React, { useEffect, useState } from 'react';
import { FiX, FiUploadCloud } from 'react-icons/fi';
import api from '../services/api';
import toast from 'react-hot-toast';

const ProductModal = ({ isOpen, onClose, onSuccess, productToEdit }) => {

    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        price: '',
        stock_quantity: '',
        image: null
    });



    useEffect(() => {

        if (productToEdit && isOpen) {

            setFormData({
                name: productToEdit.name,
                sku: productToEdit.sku,
                price: productToEdit.price,
                stock_quantity: productToEdit.stock_quantity,
                image: null
            });

            setImagePreview(productToEdit.image ? `http://localhost:8000/${productToEdit.image}` : null);
        } else if (isOpen) {
            setFormData({ name: '', sku: '', price: '', stock_quantity: '', image: null });
            setImagePreview(null);
        }
    }, [productToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        if (name === 'image') {
            const file = files[0];
            setFormData({ ...formData, image: file });
            setImagePreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const toastId = toast.loading('Saving product...');

        try {

            const data = new FormData();
            data.append('name', formData.name);
            data.append('sku', formData.sku);
            data.append('price', formData.price);
            data.append('stock_quantity', formData.stock_quantity);
            
            if (formData.image) {
                data.append('image', formData.image);
            }

            const url = productToEdit ? `/products/${productToEdit.id}` : '/products';

            const response = await api.post(url, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.status === 201) {
                toast.success(response.data.message, { id: toastId });

                setFormData({ name: '', sku: '', price: '', stock_quantity: '', image: null });
                setImagePreview(null);

                onSuccess();
                onClose();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save product.', { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">
                        {productToEdit ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer">
                        <FiX size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" placeholder="e.g. Wireless Mouse" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                                <input type="text" name="sku" required value={formData.sku} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" placeholder="PRD-001" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                                <input type="number" name="stock_quantity" required min="0" value={formData.stock_quantity} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" placeholder="50" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price (৳) *</label>
                            <input type="number" name="price" required min="0" step="0.01" value={formData.price} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" placeholder="1200.00" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                            <div className="flex items-center gap-4">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
                                ) : (
                                    <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400">
                                        <FiUploadCloud size={24} />
                                    </div>
                                )}
                                <input type="file" name="image" accept="image/*" onChange={handleChange} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100" />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">Cancel</button>
                            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 cursor-pointer">
                                {/* {loading ? 'Saving...' : 'Save Product'} */}

                                {loading ? 'Saving...' : (productToEdit ? 'Update Product' : 'Add Product')}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;