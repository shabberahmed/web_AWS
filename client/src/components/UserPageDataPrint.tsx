import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [vid, setVid] = useState('');
  const [partNo, setPartNo] = useState<number>(0);
  const [house, setHouse] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:1001/voterdata', { vid, partNo, house }
      );
      console.log(response.data.data);
    } catch (err) {
      setError('An error occurred');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Voter Data</h1>
      <div>
        <label>EPIC Number:</label>
        <input type="text" value={vid} onChange={(e) => setVid(e.target.value)} />
      </div>
      <div>
        <label>Part Number:</label>
        <input type="number" value={partNo} onChange={(e) => setPartNo(parseInt(e.target.value))} />
      </div>
      <div>
        <label>House Number:</label>
        <input type="text" value={house} onChange={(e) => setHouse(e.target.value)} />
      </div>
      <button onClick={fetchData}>Search</button>
      {error && <p>{error}</p>}
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {/* Render data properties as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
