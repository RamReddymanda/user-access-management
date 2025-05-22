import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllSoftware = () => {
  const [softwareList, setSoftwareList] = useState([]);
  const navigate = useNavigate();

  const fetchSoftware = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/software`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSoftwareList(res.data);
    } catch (err) {
      alert('Failed to fetch software list');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this software?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/software/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Software deleted');
      fetchSoftware(); // Refresh list
    } catch (err) {
      alert('Failed to delete software');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-software/${id}`); // Ensure this route exists
  };

  useEffect(() => {
    fetchSoftware();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Software</h2>
      {softwareList.length === 0 ? (
        <p>No software found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {softwareList.map((s) => (
            <div
              key={s.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '16px',
                backgroundColor: '#fdfdfd',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3>{s.name}</h3>
              <p><strong>Description:</strong> {s.description}</p>
              <p><strong>Access Levels:</strong> {s.accessLevels?.join(', ')}</p>
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => handleEdit(s.id)} style={{ marginRight: '10px' }}>
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(s.id)} style={{ color: 'red' }}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSoftware;
