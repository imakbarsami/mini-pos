import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { MdDashboard, MdPointOfSale, MdLogout, MdList } from 'react-icons/md';
import api from '../services/api'
import toast from 'react-hot-toast';

const MainLayout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {

    try{
      const res=await api.post('/logout');
      toast.success(res.data.message);
    }
    catch(error){
      console.log(error);
    }
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">

        <div className="p-5 text-2xl font-bold border-b border-gray-800 text-center">
          MINI POS
        </div>

        <nav className="flex-1 p-4 space-y-2">

          <Link 
            to="/" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            <MdDashboard size={20} /> Dashboard
          </Link>

          <Link 
            to="/pos" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/pos' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            <MdPointOfSale size={20} /> Point of Sale
          </Link>

          <Link 
            to="/orders" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/orders' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            <MdList size={20} /> All Orders
          </Link>

        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">

          <h2 className="text-xl font-semibold text-gray-800">
            {location.pathname === '/pos' ? 'Create Order' : 'Dashboard'}
          </h2>

          <div className="flex items-center gap-4">

            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>

            <button 
              onClick={handleLogout}
              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
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