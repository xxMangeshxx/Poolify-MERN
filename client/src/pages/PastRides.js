import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { cardStyle, headingStyle } from '../Styles';
import { API_URL } from '../config';

function PastRides() {
  const [postedRides, setPostedRides] = useState([]);
  const [joinedRides, setJoinedRides] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const token = localStorage.getItem('token');
  let currentUsername = null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    currentUsername = payload.username || '';
  } catch (e) {
    console.error('Failed to parse token:', e);
  }

  useEffect(() => {
    const fetchPastRides = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/past-rides`, {
          headers: {
            Authorization: `Bearer ${token}`,
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

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontWeight: 'bold', color: '#28a745', fontSize: '18px' }}>
          Logged in as: {currentUsername}
        </div>
        <FaHome onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer', fontSize: '30px', color: '#28a745' }} />
      </div>
      <h2 style={{ ...headingStyle, textAlign: 'center' }}>🕓 My Past Rides</h2>
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.columns}>
        <div style={styles.column}>
          <h3>📤 Rides Posted by Me</h3>
          {postedRides.length === 0 ? (
            <p style={styles.empty}>You haven't posted any rides until now.</p>
          ) : (
            postedRides.map((ride) => (
              <div key={ride._id} style={styles.card}>
                <h4>{ride.from} ➝ {ride.to}</h4>
                <p><strong>Date:</strong> {ride.date}</p>
                <p><strong>Time:</strong> {ride.time}</p>
                <p><strong>Seats Left:</strong> {ride.seats}</p>
                <p><strong>Notes:</strong> {ride.notes || 'N/A'}</p>
              </div>
            ))
          )}
        </div>

        <div style={styles.divider} />

        <div style={styles.column}>
          <h3>📥 Rides Joined by Me</h3>
          {joinedRides.length === 0 ? (
            <p style={styles.empty}>You haven't joined any rides until now.</p>
          ) : (
            joinedRides.map((ride) => (
              <div key={ride._id} style={styles.card}>
                <h4>{ride.from} ➝ {ride.to}</h4>
                <p><strong>Date:</strong> {ride.date}</p>
                <p><strong>Time:</strong> {ride.time}</p>
                <p><strong>Seats Left:</strong> {ride.seats}</p>
                <p><strong>Notes:</strong> {ride.notes || 'N/A'}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1000px', margin: '50px auto', padding: '0 20px', fontFamily: 'Segoe UI, sans-serif' },
  error: { color: 'red', textAlign: 'center', marginBottom: '20px' },
  empty: { color: '#666', marginTop: '10px' },
  columns: { display: 'flex', gap: '30px' },
  column: { flex: 1 },
  divider: { width: '2px', backgroundColor: '#ccc' },
  card: {
    backgroundColor: '#ffe4e1',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
    marginBottom: '20px',
    borderLeft: '6px solid #28a745',
  },
};

export default PastRides;
