// src/pages/EditSoftware.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/EditSoftware.css'; // Import CSS

const EditSoftware = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevels, setAccessLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/software/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const { name, description, accessLevels } = res.data;
        setName(name);
        setDescription(description);
        setAccessLevels(accessLevels || []);
        setLoading(false);
      } catch (error) {
        alert('Error loading software data');
        console.error(error);
        setLoading(false);
      }
    };
    fetchSoftware();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/software/${id}`, {
        name,
        description,
        accessLevels,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      alert('Software updated successfully!');
      navigate('/admin/software');
    } catch (error) {
      alert('Error updating software');
      console.error(error);
    }
  };

  if (loading) return <p>Loading software data...</p>;

  return (
    <div className="edit-software-container">
      <h2>Edit Software</h2>
      <form className="edit-software-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

      <label>Access Levels</label>
      <small style={{ color: '#666', marginBottom: '8px', display: 'block' }}>
        Hold Ctrl (Windows) or Cmd (Mac) to select multiple
      </small>
      <select
        multiple
        value={accessLevels}
        onChange={(e) =>
          setAccessLevels(Array.from(e.target.selectedOptions, (o) => o.value))
        }
        style={{ width: '100%', height: '100px', padding: '8px' }}
      >
        <option value="Read">Read</option>
        <option value="Write">Write</option>
        <option value="Admin">Admin</option>
      </select>
              <button type="submit">Update Software</button>
      </form>
    </div>
  );
};

export default EditSoftware;
