import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // if not already imported
import { FaHome } from 'react-icons/fa';
import { cardStyle } from '../Styles';

function PastRides() {
  const [postedRides, setPostedRides] = useState([]);
  const [joinedRides, setJoinedRides] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const token = localStorage.getItem('token');
  let currentUsername = null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    currentUsername = payload.username || '';  // ✅ extract username
  } catch (e) {
    console.error('Failed to parse token:', e);
  }

  useEffect(() => {
    const fetchPastRides = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/past-rides', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPostedRides(res.data.postedRides || []);
        setJoinedRides(res.data.joinedRides || []);
      } catch (err) {
        setError('❌ Failed to fetch past rides');
      }
    };

    fetchPastRides();
  }, []);

  const renderRideCard = (ride) => (
    <div key={ride._id} style={cardStyle}>
      <h3>{ride.from} ➝ {ride.to}</h3>
      <p><strong>Date:</strong> {ride.date}</p>
      <p><strong>Time:</strong> {ride.time}</p>
      <p><strong>Seats Left:</strong> {ride.seats}</p>
      <p><strong>Notes:</strong> {ride.notes || 'N/A'}</p>
    </div>
  );

  return (
    <div style={styles.container}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', color: '#28a745', fontSize: '18px' }}>
             Logged in as: {currentUsername}
          </div>
          <FaHome onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer', fontSize: '30px', color: '#28a745' }} />
        </div>
      <h2 style={styles.heading}>🕓 My Past Rides</h2>
      {error && <p style={styles.error}>{error}</p>}

      <h3 style={styles.subheading}>📤 Rides Posted by Me. </h3>
      {postedRides.length === 0 ? (
        <p style={styles.empty}>You haven’t posted any rides until now.</p>
      ) : (
        <div style={styles.grid}>{postedRides.map(renderRideCard)}</div>
      )}

      <h3 style={styles.subheading}>📥 Rides Joined by Me.</h3>
      {joinedRides.length === 0 ? (
        <p style={styles.empty}>You haven’t joined any rides until now.</p>
      ) : (
        <div style={styles.grid}>{joinedRides.map(renderRideCard)}</div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#2c3e50',
  },
  subheading: {
    fontSize: '22px',
    marginTop: '30px',
    color: '#007bff',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '10px',
  },
  empty: {
    color: '#666',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default PastRides;
