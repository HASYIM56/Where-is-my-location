export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { latitude, longitude } = req.body;

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'where-is-my-location-app'
        }
      });
      const data = await response.json();
      const address = data.display_name || 'Address not found';
      res.status(200).json({ address });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch address.' });
    }
  } else {
    res.status(405).end();
  }
}