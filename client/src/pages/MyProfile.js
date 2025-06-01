import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { containerStyle,cardStyle,headingStyle,inputStyle, buttonStyle} from '../Styles';

function MyProfile() {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    fullName: '',
    phone: '',
    branch: '',
    semester: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ✅ PLACE THIS HERE

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProfile(res.data);
      } catch (err) {
        setMessage('❌ Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/auth/me', profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setMessage('✅ Profile updated successfully!');
        setTimeout(() => {
        navigate('/dashboard');
        }, 2000);
    } catch (err) {
      setMessage('❌ Failed to update profile');
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <FaHome onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer', fontSize: '30px', color: '#28a745' }} />
      </div>

      <h2 style={{...headingStyle,textAlign: 'center'}}>👤 My Profile</h2>
      <div style={{...cardStyle,margin: '0 auto'}}>
      

      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Username (read-only)</label>
        <input type="text" value={profile.username} disabled style={styles.input} />

        <label>Email (read-only)</label>
        <input type="email" value={profile.email} disabled style={styles.input} />

        <label>Full Name</label>
        <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} style={styles.input} />

        <label>Phone</label>
        <input type="text" name="phone" value={profile.phone} onChange={handleChange} style={styles.input} />

        <label>Branch</label>
        <input type="text" name="branch" value={profile.branch} onChange={handleChange} style={styles.input} />

        <label>Semester</label>
        <input type="text" name="semester" value={profile.semester} onChange={handleChange} style={styles.input} />

        <button type="submit" style={buttonStyle}>Save Changes</button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
    background: '#f5f5f5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '15px',
  },
  message: {
    marginTop: '10px',
    fontWeight: 'bold',
  },
};

export default MyProfile;
