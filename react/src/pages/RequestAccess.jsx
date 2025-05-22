import { useState, useEffect } from 'react';
import axios from 'axios';

const RequestAccess = () => {
  const [softwareList, setSoftwareList] = useState([]);
  const [selectedSoftware, setSelectedSoftware] = useState(null);
  const [accessType, setAccessType] = useState('Read');
  const [reason, setReason] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/software`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setSoftwareList(res.data))
      .catch(() => setSoftwareList([]));
  }, []);

  const handleRequestAccess = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/requests`,
        {
          softwareId: selectedSoftware.id,
          accessType,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Request submitted');
      setSelectedSoftware(null);
      setReason('');
      setAccessType('Read');
    } catch (err) {
      console.error(err);
      alert('Failed to submit request');
    }
  };

  return (
    <div>
      <h2>Available Software</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {softwareList.map((s) => (
          <div key={s.id} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            width: '300px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3>{s.name}</h3>
            <p><strong>Description:</strong> {s.description}</p>
            <p><strong>Access Levels:</strong> {s.accessLevels.join(', ')}</p>
            <button onClick={() => setSelectedSoftware(s)}>Request Access</button>
          </div>
        ))}
      </div>

      {selectedSoftware && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#eef',
          maxWidth: '500px'
        }}>
          <h3>Request Access: {selectedSoftware.name}</h3>
          <form onSubmit={handleRequestAccess}>
            <label>Access Type:</label><br />
            <select
              value={accessType}
              onChange={(e) => setAccessType(e.target.value)}
              required
            >
              {selectedSoftware.accessLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select><br /><br />

            <label>Reason:</label><br />
            <textarea
              placeholder="Why do you need access?"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              rows="3"
              style={{ width: '100%' }}
            /><br /><br />

            <button type="submit">Submit Request</button>
            <button type="button" onClick={() => setSelectedSoftware(null)} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RequestAccess;
