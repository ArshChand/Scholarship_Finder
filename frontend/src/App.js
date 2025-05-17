import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllScholarships from './pages/AllScholarships';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<AllScholarships />} />
        {/* We'll add more routes later */}
      </Routes>
    </Router>
  );
}

export default App;
