import { useEffect, useState } from 'react';
import axios from 'axios';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  console.log("asdfghjkl");
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/requests`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRequests(res.data);
      } catch (err) {
        console.error('Failed to fetch requests:', err);
        alert('Failed to load pending requests.');
      }
    };

    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/requests/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Request ${status}`);
      setRequests(prev =>
        prev.map(r => (r.id === id ? { ...r, status } : r))
      );
    } catch (err) {
      console.error(`Failed to update status to ${status}:`, err);
      alert('Failed to update request.');
    }
  };

  return (
    <div>
      <h2>Pending Access Requests</h2>
      {requests.filter(r => r.status === 'Pending').length === 0 ? (
        <p>No pending requests</p>
      ) : (
        requests.filter(r => r.status === 'Pending').map(r => (
          <div key={r.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p><strong>User:</strong> {r.user.username}</p>
            <p><strong>Software:</strong> {r.software.name}</p>
            <p><strong>Access Type:</strong> {r.accessType}</p>
            <p><strong>Reason:</strong> {r.reason}</p>
            <button onClick={() => updateStatus(r.id, 'Approved')}>Approve</button>
            <button onClick={() => updateStatus(r.id, 'Rejected')}>Reject</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PendingRequests;
