import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import AllScholarships from './pages/AllScholarships';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Helper to conditionally render Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  // Hide Navbar on login and signup pages
  const hideNavbar = ['/login', '/signup'].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/all"
              element={
                <PrivateRoute>
                  <AllScholarships />
                </PrivateRoute>
              }
            />
            {/* 404 Route */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;

