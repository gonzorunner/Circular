import React from 'react';
import MapContainer from './MapContainer';

function App() {
  const lat = 37.7749; // user-specified latitude
  const lng = -122.4194; // user-specified longitude

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer lat={lat} lng={lng} />
    </div>
  );
}

export default App;