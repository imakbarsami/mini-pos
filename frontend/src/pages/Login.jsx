import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../features/authSlice';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiMail, FiLock } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      
      const response = await api.post('/login', { email, password });

      if (response.data.status === 200) {
        
        dispatch(loginSuccess({
          token: response.data.token,
          id: response.data.id,
          name: response.data.name,
          email: response.data.email, 
        }));

        toast.success(`Welcome, ${response.data.name}!`);
        navigate('/'); 
      }
    } catch (err) {

      setError('');

      if (err.response?.data) {

        const responseData = err.response.data;

        if (responseData.message) {
          setError(responseData.message);
          toast.error(responseData.message);
        }

        if(responseData.errors.email){
          setError(responseData.errors.email[0]);
          toast.error(responseData.errors.email[0])
        }

      } else {
        const defaultMsg = 'Login failed. Please try again.';
        setError(defaultMsg);
        toast.error(defaultMsg);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">MINI POS</h2>
            <p className="text-gray-500 mt-2 text-sm">Please login to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiMail size={20} />
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none bg-gray-50 focus:bg-white"
                  placeholder=""
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiLock size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none bg-gray-50 focus:bg-white"
                  placeholder=""
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Login...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} MINI-POS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;