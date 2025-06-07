import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });

          try {
            const response = await axios.post('/api/location', { latitude, longitude });
            setAddress(response.data.address);
          } catch (err) {
            setError('Failed to fetch address.');
          }
        },
        () => {
          setError('Location access denied.');
        }
      );
    } else {
      setError('Geolocation not supported.');
    }
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: 600, margin: 'auto' }}>
      <h1>Where is my location</h1>
      <p>To find out the latest coordinates of where I am</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {coords && (
        <div>
          <p><strong>Latitude:</strong> {coords.latitude}</p>
          <p><strong>Longitude:</strong> {coords.longitude}</p>
          <iframe
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '10px' }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}&z=15&output=embed`}
          ></iframe>
        </div>
      )}
      {address && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Address Detail:</h3>
          <p>{address}</p>
        </div>
      )}
    </div>
  );
}