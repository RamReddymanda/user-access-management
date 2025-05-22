import { useState } from 'react';
import axios from 'axios';
import "./css/CreateSoftware.css"; 


const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px'
};



const CreateSoftware = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [accessLevels, setAccessLevels] = useState([]);
    console.log("dfghjk");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/software`,
                { name, description, accessLevels },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert('Software added');
        } catch (err) {
            alert('Failed to add software');
        }
    };

    return (
        <>
        <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Create Software</h2>
        <form onSubmit={handleSubmit} className='formStyle' >
            <label className='labelStyle' >Name</label>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={inputStyle}
            />
            <label className='labelStyle' >Description</label>
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
            />
            <label className='lableStyle'>Access Levels</label>
            <small style={{ color: '#666', marginBottom: '8px', display: 'block' }}>
            Hold Ctrl (Windows) or Cmd (Mac) to select multiple
             </small>
            <select
                multiple
                onChange={(e) => setAccessLevels(Array.from(e.target.selectedOptions, o => o.value))}
                className='inputStyle'
                style={{ ...inputStyle, height: '100px' }}
            >
                <option value="Read">Read</option>
                <option value="Write">Write</option>
                <option value="Admin">Admin</option>
            </select>
            <button type="submit" className='buttonStyle' >Create</button>
        </form>
        </>
    );
};

export default CreateSoftware;