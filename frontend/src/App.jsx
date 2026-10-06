import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import  ProtectedRoute  from './components/ProtectedRoute';
import Error from './components/Error';

function App() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const user=useSelector(state=>console.log(state))

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />

        <Route path='*' element={<Error/>}/>

        {/* protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="pos" element={<POS />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App
