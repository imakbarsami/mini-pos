import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiFilter, FiRefreshCw } from 'react-icons/fi';
import api from '../services/api';
import toast from 'react-hot-toast';
import Pagination from '../components/Pagination';
import ProductModal from '../components/ProductModal';
import Swal from 'sweetalert2';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        name: '',
        sku: '',
        min_price: '',
        max_price: '',
        start_date: '',
        end_date: ''
    });

    const fetchProducts = async () => {

        setLoading(true);
        try {

            const activeFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => v !== '')
            );

            const queryParams = new URLSearchParams({
                page: currentPage,
                ...activeFilters
            }).toString();

            const response = await api.get(`/products?${queryParams}`);

            if (response.data.status === 200) {
                setProducts(response.data.data.data);
                setTotalPages(response.data.data.last_page);
            }
        } catch (error) {
            toast.error('Failed to load products.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = () => {
        setCurrentPage(1);
        fetchProducts();
    };

    const clearFilters = async () => {
        setFilters({
            name: '',
            sku: '',
            min_price: '',
            max_price: '',
            start_date: '',
            end_date: ''
        });
        setCurrentPage(1);

        setLoading(true);
        try {
            const response = await api.get(`/products?page=1`);
            if (response.data.status === 200) {
                setProducts(response.data.data.data);
                setTotalPages(response.data.data.last_page);
            }
        } catch (error) {
            toast.error('Failed to clear filters.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async (id) => {

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await api.delete(`/products/${id}`);
                if (response.data.status === 200) {
                    toast.success(response.data.message || 'Product deleted successfully!');
                    setProducts(prev => prev.filter(product => product.id !== id));
                }
            } catch (error) {

                if (error.response && error.response.status === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Action Denied',
                        text: error.response.data.message
                    });
                } else {
                    toast.error('Failed to delete product.');
                }
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">

            {/* Top Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                    <p className="text-sm text-gray-500">Manage your store inventory</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                >
                    <FiPlus /> Add New Product
                </button>
            </div>

            {/* Filter Section */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4 text-gray-700 font-medium text-sm">
                    <FiFilter /> <span>Advanced Filters</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <input
                        type="text" name="name" value={filters.name} onChange={handleFilterChange}
                        placeholder="Product Name"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text" name="sku" value={filters.sku} onChange={handleFilterChange}
                        placeholder="SKU"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number" name="min_price" value={filters.min_price} onChange={handleFilterChange}
                        placeholder="Min Price (৳)"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number" name="max_price" value={filters.max_price} onChange={handleFilterChange}
                        placeholder="Max Price (৳)"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="date" name="start_date" value={filters.start_date} onChange={handleFilterChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 cursor-pointer"
                    />
                    <input
                        type="date" name="end_date" value={filters.end_date} onChange={handleFilterChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 cursor-pointer"
                    />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                        <FiRefreshCw size={14} /> Clear
                    </button>
                    <button
                        onClick={applyFilters}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer"
                    >
                        <FiSearch size={14} /> Search
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Image</th>
                                <th className="px-6 py-4">Product Info</th>
                                <th className="px-6 py-4 text-right">Price</th>
                                <th className="px-6 py-4 text-center">Stock</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading products...</td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No products found.</td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-3">
                                            {product.image ? (
                                                <img
                                                    src={`http://localhost:8000/${product.image}`}
                                                    alt={product.name}
                                                    className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs">
                                                    No Img
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="font-medium text-gray-800">{product.name}</div>
                                            <div className="text-xs text-gray-500">SKU: {product.sku}</div>
                                        </td>
                                        <td className="px-6 py-3 text-right font-semibold text-gray-800">
                                            ৳{parseFloat(product.price).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.stock_quantity < 10
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-emerald-100 text-emerald-700'
                                                }`}>
                                                {product.stock_quantity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => { setEditProduct(product); setIsModalOpen(true); }}
                                                    className="p-1.5 text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors cursor-pointer"
                                                    title="Edit"
                                                >
                                                    <FiEdit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-1.5 text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!loading && products.length > 0 && (
                    <div className="p-4 border-t border-gray-100">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>

            {/* Product Add/Edit Modal */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchProducts}
                productToEdit={editProduct}
            />

        </div>
    );
};

export default Products;