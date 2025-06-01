export const containerStyle= {
    maxWidth: '1000px',
    //margin: '40px auto',
    margin: '20px auto 0',
    padding: '0 20px',
    fontFamily: 'Segoe UI, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f5f5f5',
  };
  export const cardStyle= {
    backgroundColor:'#ffe4e1',
    padding: '30px 40px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
    borderLeft: '6px solid #28a745',
    transition: 'transform 0.2s ease-in-out',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    };
  export const headingStyle= {
    marginBottom: '25px',
    fontSize: '24px',
    color: '#2c3e50',
  };
  export const pageheadingStyle= {
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '25px',
    color: '#2c3e50',
  };
  export const inputStyle= {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '15px',
  };
  export const baseButtonStyle = {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
  };
  export const buttonStyle = {
  ...baseButtonStyle,
  };
  
  export const actionButtonStyle = {
  ...baseButtonStyle,
    display: 'block',
    width: '100%',
    padding: '12px',
    margin: '12px 0',
    fontSize: '16px',
  };  
  export const emptyStyle= {
    textAlign: 'center',
    color: '#888',
  };
  export const popupStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    textAlign: 'center',
    maxWidth: '400px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};