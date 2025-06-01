import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src="https://26pratyush.github.io/Poolify/assets/logo.jpg"
          alt="Carpooling"
          style={styles.image}
        />
        <h2 style={styles.tagline}>A simple ride-sharing app for MSRIT students 🚗</h2>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => navigate('/login')}>Login</button>
          <button style={styles.button} onClick={() => navigate('/signup')}>Signup</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '60px auto',
    padding: '0 20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
 card: {
  backgroundColor: '#ffe4e1',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
  borderLeft: '6px solid #28a745',
  transition: 'transform 0.2s ease-in-out',
  textAlign: 'center', // ✅ center all text and image inside
},
  image: {
  width: '70%',
  height: 'auto',
  maxHeight: '400px',
  objectFit: 'cover',
  borderRadius: '8px',
  margin: '0 auto 25px', // ✅ center the image
},
  tagline: {
  fontSize: '22px',
  color: '#2c3e50',
  marginBottom: '30px',
  textAlign: 'center', // ✅ explicitly center text (optional since card handles it)
},
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default LandingPage;
