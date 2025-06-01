import React from 'react';
import { useNavigate } from 'react-router-dom';
import {containerStyle,cardStyle,headingStyle,actionButtonStyle} from '../Styles';

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let currentUserId = null;
  let currentUsername = null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    currentUserId = payload.userId;
    currentUsername = payload.username || '';  // ✅ extract username
  } catch (e) {
    console.error('Failed to parse token:', e);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
     <>
    <nav style={styles.navbar}>
      <div style={styles.leftNav}>
        <button style={styles.navButton} onClick={() => navigate('/profile')}>My Profile</button>
        <button style={styles.navButton} onClick={() => navigate('/past-rides')}>My Past Rides</button>
      </div>
      <h2 style={styles.logo}>🚗 Poolify! sharing the road, saving the planet 🚗</h2>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
    </nav>
   <div style={containerStyle}>
    <div style={cardStyle}>
      <h1 style={headingStyle}>Welcome '{currentUsername}' to Your Dashboard</h1>
      <p style={styles.subtext}>What would you like to do today?</p>
      <button style={actionButtonStyle} onClick={() => navigate('/view-rides')}>View Rides</button>
      <button style={actionButtonStyle} onClick={() => navigate('/post-ride')}>Post a Ride</button>
      <button style={actionButtonStyle} onClick={() => navigate('/my-rides')}>My Rides</button>
    </div>
  </div>
  </>
);
}
const styles = {
  navbar: {
   display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    padding: '14px 24px',
    backgroundColor: '#007bff',
    color: 'white',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '5px',  // ⬅️ add spacing after navbar
  },
  logo: {
    gridColumn: '2',
    textAlign: 'center',
    margin: 0,
    fontSize: '22px',
  },
  logoutButton: {
  justifySelf: 'end',
  backgroundColor: 'white',
  color: '#007bff',
  border: 'none',
  padding: '10px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  },
  subtext: {
    color: '#666',
    marginBottom: '25px',
    fontSize: '16px',
  },
  leftNav: {
  display: 'flex',
  gap: '10px',
  justifySelf: 'start',
},
 navButton: {
  backgroundColor: 'white',
  color: '#007bff',
  border: 'none',
  padding: '10px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
},
};

export default Dashboard;
