import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute'; // ✅ Add this
import ViewRides from './pages/ViewRides';
import PostRide from './pages/PostRide';
import LandingPage from './pages/LandingPage'
import Chat from './pages/Chat'; // Add this import
import MyRides from './pages/MyRides'; 
import MyProfile from './pages/MyProfile';
import PastRides from './pages/PastRides';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup onSignupSuccess={setUser} />} />
        <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/view-rides" element={<PrivateRoute><ViewRides /></PrivateRoute>} />
        <Route path="/post-ride" element={<PrivateRoute><PostRide /></PrivateRoute>} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/my-rides" element={<MyRides />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/past-rides" element={<PastRides />} />
      </Routes>
    </Router>
  );
}

export default App;

