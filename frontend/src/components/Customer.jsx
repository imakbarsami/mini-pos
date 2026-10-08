import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiRefreshCw, FiUsers } from 'react-icons/fi';
import api from '../services/api';
import toast from 'react-hot-toast';
import Pagination from '../components/Pagination';
import CustomerModal from './CustomerModal';
import Swal from 'sweetalert2';

const Customers = () => {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery, setSearchQuery] = useState('');

  const fetchCustomers = async (page = currentPage, search = searchQuery) => {

    setLoading(true);

    try {

      let url = `/customers?page=${page}`;
      if (search) {
        url += `&search=${search}`;
      }

      const response = await api.get(url);

      if (response.data.status === 200) {
        setCustomers(response.data.data.data);
        setTotalPages(response.data.data.last_page);
      }

    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(currentPage, searchQuery);
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchCustomers(1, searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
    fetchCustomers(1, '');
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
        const response = await api.delete(`/customers/${id}`);
        if (response.data.status === 200) {
          toast.success(response.data.message || 'Customer deleted successfully!');
          setCustomers(prevCustomers =>
            prevCustomers.filter(customer => customer.id !== id)
          );
        }

      } catch (error) {
        if (error.response && error.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Action Denied',
            text: error.response.data.message
          });
        } else {
          toast.error('Failed to delete customer.');
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
          <p className="text-sm text-gray-500">Manage your customer database</p>
        </div>
        <button
          onClick={() => { setEditCustomer(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
        >
          <FiPlus /> Add New Customer
        </button>
      </div>

      {/* Global Search Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-3 items-center">
        <div className="relative w-full md:w-2/3 lg:w-1/2">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search by name, phone, email or address..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={handleSearch}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-colors w-full md:w-auto cursor-pointer"
          >
            Search
          </button>
          <button
            onClick={clearSearch}
            className="flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full md:w-auto cursor-pointer"
          >
            <FiRefreshCw size={14} /> Clear
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Loading customers...</td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No customers found.</td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-800">{customer.phone}</div>
                      <div className="text-xs text-gray-500">{customer.email || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600 line-clamp-1">{customer.address || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => { setEditCustomer(customer); setIsModalOpen(true); }}
                          className="p-1.5 text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          onClick={()=>handleDelete(customer.id)}
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
        {!loading && customers.length > 0 && (
          <div className="p-4 border-t border-gray-100">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Customer Add/Edit Modal */}
      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => fetchCustomers(1, '')}
        customerToEdit={editCustomer}
      />
    </div>
  );
};

export default Customers;