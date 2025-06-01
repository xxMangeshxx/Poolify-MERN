import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { containerStyle,cardStyle,headingStyle,inputStyle, buttonStyle} from '../Styles';

function Signup({ onSignupSuccess }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
  e.preventDefault();

  if (!email.endsWith('@msrit.edu')) {
    setError('Only @msrit.edu addresses are allowed');
    return;
  }

  try {
    const res = await axios.post('http://localhost:5000/api/auth/signup', {
      username,
      email,
      password
    });

    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  } catch (err) {
    setError(err.response?.data?.message || 'Signup failed');
  }
};

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>✍️ Create an Account</h2>
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Sign Up</button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
        <p style={styles.footer}>
          Already have an account?{' '}
          <span style={styles.link} onClick={() => navigate('/login')}>Log in</span>
        </p>
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
  error: {
    color: 'red',
    marginTop: '10px',
  },
  footer: {
    marginTop: '20px',
    fontSize: '14px',
  },
  link: {
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Signup;
