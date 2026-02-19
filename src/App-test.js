import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', color: 'white', fontSize: '24px' }}>
      <h1>Netflix Clone Test</h1>
      <p>If you can see this, the basic React app is working!</p>
      <p>Environment API URL: {process.env.REACT_APP_API_URL || 'Not set'}</p>
    </div>
  );
}

export default App;
