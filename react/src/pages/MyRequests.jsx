import { useEffect, useState } from 'react';
import axios from 'axios';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/myrequests`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => setRequests(res.data))
      .catch((err) => {
        console.error('Failed to fetch requests:', err);
        alert('Failed to load your requests');
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Access Requests</h2>
      {requests.length === 0 ? (
        <p>No requests submitted yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {requests.map((r) => (
            <div
              key={r.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '16px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 style={{ margin: '0 0 10px' }}>{r.software.name}</h3>
              <p><strong>Access Type:</strong> {r.accessType}</p>
              <p><strong>Status:</strong> <span style={{
                color:
                  r.status === 'Approved'
                    ? 'green'
                    : r.status === 'Rejected'
                    ? 'red'
                    : '#555'
              }}>{r.status}</span></p>
              <p><strong>Reason:</strong> {r.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
