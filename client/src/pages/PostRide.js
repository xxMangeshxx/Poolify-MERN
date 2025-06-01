import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import {
  containerStyle,
  cardStyle,
  headingStyle,
  inputStyle,
  buttonStyle
} from '../Styles';

function PostRide() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    seats: '',
    notes: '',
  });

  const [success, setSuccess] = useState('');
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    const selectedDate = new Date(formData.date);

    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      setError('❌ Date cannot be in the past');
      setSuccess('');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/rides', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSuccess('✅ Ride posted successfully!');
      setError('');
      setFormData({
        from: '',
        to: '',
        date: '',
        time: '',
        seats: '',
        notes: '',
      });
    } catch (err) {
      setError('❌ Failed to post ride');
      setSuccess('');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', color: '#28a745', fontSize: '18px' }}>
              Logged in as: {currentUsername}
          </div>
          <FaHome onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer', fontSize: '30px', color: '#28a745' }} />
        </div>
        <h2 style={{...headingStyle,textAlign:'center'}}>📝 Post a New Car/Bike Pool Ride</h2>
        <div style={{ ...cardStyle, margin: '0 auto' }}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input type="text" name="from" placeholder="From" value={formData.from} onChange={handleChange} style={inputStyle} required />
            <input type="text" name="to" placeholder="To" value={formData.to} onChange={handleChange} style={inputStyle} required />
            <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
            <input type="time" name="time" value={formData.time} onChange={handleChange} style={inputStyle} required />
            <input type="number" name="seats" placeholder="No. of seats" value={formData.seats} onChange={handleChange} style={inputStyle} required min="1" max="6" />
            <textarea name="notes" placeholder="Notes (optional)" value={formData.notes} onChange={handleChange} style={styles.textarea} />
            <button type="submit" style={buttonStyle}>Post Ride</button>
            {success && (
              <button type="button" style={{ ...buttonStyle, backgroundColor: '#6c757d', marginTop: '15px' }} onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </button>
            )}
            {error && <p style={styles.error}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  textarea: {
    padding: '10px 12px',
    height: '80px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    resize: 'vertical',
  },
  error: {
    color: '#dc3545',
    fontWeight: 'bold',
  }
};

export default PostRide;
