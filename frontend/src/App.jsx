import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Estates from './pages/Estates';
import MyEstates from './pages/MyEstates';
import AddEstate from './pages/AddEstate';
import EstateDetails from './pages/EstateDetails';
import EditEstate from './pages/EditEstate';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/estates" element={<Estates />} />
              <Route path="/my-estates" element={<MyEstates />} />
              <Route path="/add-estate" element={<AddEstate />} />
              <Route path="/estate/:id" element={<EstateDetails />} />
              <Route path="/edit-estate/:id" element={<EditEstate />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;