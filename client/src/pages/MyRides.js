import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { containerStyle,cardStyle,headingStyle,inputStyle, popupStyles, buttonStyle} from '../Styles';
import { API_URL } from '../config';

function MyRides() {
  const [postedRides, setPostedRides] = useState([]);
  const [joinedRides, setJoinedRides] = useState([]);
  const [editingRideId, setEditingRideId] = useState(null);
  const [editedRide, setEditedRide] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
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
    fetchMyRides();
  }, []);

  const fetchMyRides = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/rides/my-rides`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPostedRides(response.data.posted || []);
      setJoinedRides(response.data.joined || []);
    } catch (err) {
      console.error('Failed to fetch my rides', err);
    }
  };

  const handleEditClick = (ride) => {
    setEditingRideId(ride._id);
    setEditedRide({ ...ride });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedRide((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/api/rides/${editingRideId}`, editedRide, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPopupMessage('✅ All riders have been notified about the changes.');
      setShowPopup(true);
      setEditingRideId(null);
      fetchMyRides();
    } catch (err) {
      console.error('Failed to update ride', err);
    }
  };

  const handleDelete = async (rideId) => {
    if (!window.confirm('Are you sure you want to delete this ride?')) return;
    try {
      await axios.delete(`${API_URL}/api/rides/${rideId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPopupMessage('🗑 Ride deleted. All riders notified.');
      setShowPopup(true);
      fetchMyRides();
    } catch (err) {
      console.error('Failed to delete ride', err);
    }
  };

  const handleLeaveRide = async (rideId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/rides/leave/${rideId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPopupMessage('🚫 You have left the ride.');
      setShowPopup(true);
      fetchMyRides();
    } catch (err) {
      console.error('❌ Leave Ride Failed:', err);
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
        <h2 style={{...headingStyle, textAlign: 'center'}}>🕓 My Current Rides</h2>
        <div style={styles.columns}>
          <div style={styles.column}>
            <h3>✍️ Rides Posted by Me </h3>
            {postedRides.length === 0 ? <p>No posted rides</p> : (
              postedRides.map((ride) => (
                <form key={ride._id} style={styles.card} onSubmit={(e) => e.preventDefault()}>
                  {editingRideId === ride._id ? (
                    <>
                      <input name="from" value={editedRide.from} onChange={handleEditChange} style={styles.input} required />
                      <input name="to" value={editedRide.to} onChange={handleEditChange} style={styles.input} required />
                      <input type="date" name="date" value={editedRide.date} onChange={handleEditChange} style={styles.input} required />
                      <input type="time" name="time" value={editedRide.time} onChange={handleEditChange} style={styles.input} required />
                      <input type="number" name="seats" value={editedRide.seats} onChange={handleEditChange} style={styles.input} required min="1" max="6" />
                      <textarea name="notes" value={editedRide.notes} onChange={handleEditChange} style={styles.textarea} />
                      <div>
                        <button onClick={handleSave} style={buttonStyle}>Save</button>
                        <button onClick={() => setEditingRideId(null)} style={{ ...buttonStyle, backgroundColor: '#6c757d', marginLeft: '10px' }}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4>{ride.from} ➝ {ride.to}</h4>
                      <p><strong>Date:</strong> {ride.date}</p>
                      <p><strong>Time:</strong> {ride.time}</p>
                      <p><strong>Seats:</strong> {ride.seats}</p>
                      <p><strong>Notes:</strong> {ride.notes || 'N/A'}</p>
                      <div>
                        <button onClick={() => handleEditClick(ride)} style={buttonStyle}>Edit</button>
                        <button onClick={() => handleDelete(ride._id)} style={{ ...buttonStyle, backgroundColor: '#dc3545', marginLeft: '10px' }}>Delete</button>
                      </div>
                    </>
                  )}
                </form>
              ))
            )}
          </div>
          <div style={styles.divider} />
          <div style={styles.column}>
            <h3>🙋‍♂️ Rides Joined by Me </h3>
            {joinedRides.length === 0 ? <p>No joined rides</p> : (
              joinedRides.map((ride) => (
                <div key={ride._id} style={styles.card}>
                  <h4>{ride.from} ➝ {ride.to}</h4>
                  <p><strong>Date:</strong> {ride.date}</p>
                  <p><strong>Time:</strong> {ride.time}</p>
                  <p><strong>Seats Left:</strong> {ride.seats}</p>
                  <p><strong>Notes:</strong> {ride.notes || 'N/A'}</p>
                  <p><strong>Posted By:</strong> {ride.postedBy?.username || ride.postedBy?.email}</p>
                   <button
                      onClick={() => handleLeaveRide(ride._id)}
                      style={{ ...buttonStyle, backgroundColor: '#ffc107', marginTop: '10px' }}
                    >
                      Leave Ride
                    </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: { maxWidth: '1000px', margin: '50px auto', padding: '0 20px', fontFamily: 'Segoe UI, sans-serif' },
  topBar: { display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' },
  homeIcon: { cursor: 'pointer', fontSize: '30px', color: '#28a745' },
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
  input: {
    padding: '10px 12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '10px',
    width: '90%',
  },
  textarea: {
    padding: '10px 12px',
    height: '80px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    resize: 'vertical',
    marginBottom: '10px',
    width: '90%',
  },
};


export default MyRides;