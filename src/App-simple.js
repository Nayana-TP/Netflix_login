import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App" style={{ 
      minHeight: '100vh', 
      backgroundColor: '#141414',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <h1 style={{ color: '#e50914', fontSize: '3rem', marginBottom: '20px' }}>
        NETFLIX
      </h1>
      <div style={{
        backgroundColor: 'rgba(229, 9, 20, 0.8)',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '400px'
      }}>
        <h2>🎬 Demo Mode</h2>
        <p>Netflix Clone is running in demo mode</p>
        <p style={{ fontSize: '14px', marginTop: '10px' }}>
          Any login credentials will work
        </p>
      </div>
    </div>
  );
}

export default App;
