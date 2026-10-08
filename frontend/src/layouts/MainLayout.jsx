import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import {
  MdDashboard,
  MdPointOfSale,
  MdLogout,
  MdList,
  MdMenu,
  MdChevronLeft
} from 'react-icons/md';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiInbox, FiUsers } from 'react-icons/fi';

const MainLayout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const pageTitles = {
      '/': 'Dashboard',
      '/pos': 'Create Order',
      '/orders': 'Orders List',
      '/products': 'Products List',
      '/customers': 'Customers List',
  };

  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {

    try {
      
      const res = await api.post('/logout');
      toast.success(res.data.message);
    }
    catch (error) {
      console.log(error);
    }

    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar Wrapper */}
      <div
        className={`
          ${sidebarCollapsed ? 'w-24' : 'w-64'}
          flex
          shrink-0
          transition-all
          duration-300
          ease-in-out
        `}
      >

        {/* Sidebar */}
        <div
          className={`
            ${sidebarCollapsed ? 'w-16' : 'w-56'}
            bg-gray-900
            text-white
            flex
            flex-col
            transition-all
            duration-300
            ease-in-out
            overflow-hidden
          `}
        >

          {/* Sidebar Header */}
          <div
            className={`
              h-16
              border-b border-gray-800
              flex items-center
              shrink-0
              ${sidebarCollapsed ? 'justify-center' : 'justify-center'}
            `}
          >

            {sidebarCollapsed ? (
              <span className="text-xl font-bold">
                MP
              </span>
            ) : (
              <span className="text-2xl font-bold whitespace-nowrap">
                MINI POS
              </span>
            )}

          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">

            {/* Dashboard */}
            <Link
              to="/"
              title={sidebarCollapsed ? 'Dashboard' : ''}
              className={`
                flex items-center
                h-12
                rounded-lg
                transition-colors
                ${sidebarCollapsed
                  ? 'justify-center px-0'
                  : 'gap-3 px-4'
                }
                ${location.pathname === '/'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-800'
                }
              `}
            >
              <MdDashboard size={21} />

              {!sidebarCollapsed && (
                <span className="whitespace-nowrap">
                  Dashboard
                </span>
              )}
            </Link>

            {/* Point of Sale */}
            <Link
              to="/pos"
              title={sidebarCollapsed ? 'Point of Sale' : ''}
              className={`
                flex items-center
                h-12
                rounded-lg
                transition-colors
                ${sidebarCollapsed
                  ? 'justify-center px-0'
                  : 'gap-3 px-4'
                }
                ${location.pathname === '/pos'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-800'
                }
              `}
            >
              <MdPointOfSale size={21} />

              {!sidebarCollapsed && (
                <span className="whitespace-nowrap">
                  Point of Sale
                </span>
              )}
            </Link>

            {/* All Orders */}
            <Link
              to="/orders"
              title={sidebarCollapsed ? 'All Orders' : ''}
              className={`
                flex items-center
                h-12
                rounded-lg
                transition-colors
                ${sidebarCollapsed
                  ? 'justify-center px-0'
                  : 'gap-3 px-4'
                }
                ${location.pathname === '/orders'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-800'
                }
              `}
            >
              <MdList size={21} />

              {!sidebarCollapsed && (
                <span className="whitespace-nowrap">
                  All Orders
                </span>
              )}
            </Link>

            {/* Products */}
            <Link
              to="/products"
              title={sidebarCollapsed ? 'Products' : ''}
              className={`
                flex items-center
                h-12
                rounded-lg
                transition-colors
                ${sidebarCollapsed
                  ? 'justify-center px-0'
                  : 'gap-3 px-4'
                }
                ${location.pathname === '/products'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-800'
                }
              `}
            >
              <FiInbox size={21} />

              {!sidebarCollapsed && (
                <span className="whitespace-nowrap">
                  Products
                </span>
              )}
            </Link>

            {/* Customers */}
            <Link
              to="/customers"
              title={sidebarCollapsed ? 'Customers' : ''}
              className={`
                flex items-center
                h-12
                rounded-lg
                transition-colors
                ${sidebarCollapsed
                  ? 'justify-center px-0'
                  : 'gap-3 px-4'
                }
                ${location.pathname === '/customers'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-800'
                }
              `}
            >
              <FiUsers size={21} />

              {!sidebarCollapsed && (
                <span className="whitespace-nowrap">
                  Customers
                </span>
              )}
            </Link>

          </nav>

        </div>

        {/* Collapse / Expand Button */}
        <div
          className="
            w-8
            h-16
            shrink-0
            bg-white
            border-b
            border-r
            border-gray-200
            flex
            items-center
            justify-center
          "
        >
          <button
            onClick={() =>
              setSidebarCollapsed(!sidebarCollapsed)
            }
            className="
              w-full
              h-full
              flex
              items-center
              justify-center
              text-gray-500
              hover:bg-gray-50
              hover:text-gray-700
              transition-colors
              cursor-pointer
            "
            title={
              sidebarCollapsed
                ? 'Expand Sidebar'
                : 'Collapse Sidebar'
            }
          >
            {sidebarCollapsed ? (
              <MdMenu size={19} />
            ) : (
              <MdChevronLeft size={19} />
            )}
          </button>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">

          <h1 className="text-xl font-semibold text-gray-800">
            {pageTitles[location.pathname] || 'Dashboard'}
          </h1>

          <div className="flex items-center gap-4">

            {/* User Info */}
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">
                {user?.name}
              </p>

              <p className="text-xs text-gray-500">
                {user?.email}
              </p>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="
                p-2
                bg-red-50
                text-red-600
                rounded-lg
                hover:bg-red-100
                transition-colors
                cursor-pointer
              "
              title="Logout"
            >
              <MdLogout size={20} />
            </button>

          </div>

        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default MainLayout;