import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { buttonStyle, emptyStyle, inputStyle, pageheadingStyle, popupStyles} from '../Styles';
import { API_URL } from '../config';

function ViewRides() {
  const [rides, setRides] = useState([]);
  const [seatRequests, setSeatRequests] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
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

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/rides`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRides(response.data);
      } catch (err) {
        console.error('Error fetching rides:', err);
      }
    };
    fetchRides();
  }, []);

  const handleSeatChange = (rideId, value) => {
    setSeatRequests((prev) => ({
      ...prev,
      [rideId]: value,
    }));
  };

  const handleJoin = async (rideId) => {
    try {
      const token = localStorage.getItem('token');
      const seats = parseInt(seatRequests[rideId]) || 1;

      await axios.post(
        `${API_URL}/api/rides/join/${rideId}`,
        { seats },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPopupMessage('✅ You have successfully joined the ride!');
      setShowPopup(true);
      setRides((prev) =>
        prev.map((ride) =>
          ride._id === rideId ? { ...ride, seats: ride.seats - seats } : ride
        )
      );
    } catch (err) {
      alert('Failed to join the Ride. Choose available seats only!');
      console.error('Join error:', err);
    }
  };

  return (
    <>
      {showPopup && (
        <div style={popupStyles.overlay}>
          <div style={popupStyles.modal}>
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)} style={popupStyles.button}>OK</button>
          </div>
        </div>
      )}

      <div style={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontWeight: 'bold', color: '#28a745', fontSize: '18px' }}>
        Logged in as: {currentUsername}
         </div>
          <FaHome onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer', fontSize: '30px', color: '#28a745' }} />
        </div>

        <h2 style={pageheadingStyle}>🚗 Available Car & Bike pool Rides 🚗</h2>
        {rides.length === 0 ? (
          <p style={emptyStyle}>No Rides available right now.</p>
        ) : (
          <div style={styles.grid}>
            {rides
              .filter((ride) => ride.seats > 0)
              .map((ride) => {
                const isOwnRide = ride.postedBy?.userId === currentUserId;
                return (
                  <div key={ride._id} style={styles.card}>
                    <h3>{ride.from} ➝ {ride.to}</h3>
                    <p><strong>Posted by:</strong> {ride.postedBy.username}</p>
                    <p><strong>Date:</strong> {ride.date}</p>
                    <p><strong>Time:</strong> {ride.time}</p>
                    <p><strong>Seats Left:</strong> {ride.seats}</p>
                    <p><strong>Notes:</strong> {ride.notes || 'N/A'}</p>
                    <div style={styles.joinSection}>
                      <input
                        type="number"
                        placeholder="Seats"
                        min="1"
                        max={ride.seats}
                        value={seatRequests[ride._id] || ''}
                        onChange={(e) => handleSeatChange(ride._id, e.target.value)}
                        style={inputStyle}
                        disabled={isOwnRide}
                      />
                      <button
                        onClick={() => handleJoin(ride._id)}
                        disabled={isOwnRide}
                        style={{
                          ...buttonStyle,
                          backgroundColor: isOwnRide ? '#ccc' : '#28a745',
                          cursor: isOwnRide ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {isOwnRide ? 'Your Ride' : 'Join Ride'}
                      </button>
                      <button
                        style={buttonStyle}
                        onClick={() =>
                          window.open(
                            `/chat?rideId=${ride._id}&from=${ride.from}&to=${ride.to}&poster=${ride.postedBy?.username || 'Poster'}`,
                            '_blank'
                          )
                        }
                      >
                        Chat
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffe4e1',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
    borderLeft: '6px solid #28a745',
    transition: 'transform 0.2s ease-in-out',
  },
  joinSection: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
};

export default ViewRides;
