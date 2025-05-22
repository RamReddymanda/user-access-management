import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { use } from 'react';
import { useAuth } from '../context/AuthContext'; 

const Form = styled.form`
  max-width: 400px;
  margin: 80px auto;
  padding: 40px 30px;
  background: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  input[type='text'],
  input[type='password'] {
    padding: 12px 15px;
    font-size: 16px;
    border: 1.8px solid #ddd;
    border-radius: 6px;
    transition: border-color 0.3s ease;
  }

  input[type='text']:focus,
  input[type='password']:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
  }

  button {
    padding: 14px;
    background-color: #3b82f6;
    color: white;
    font-weight: 600;
    font-size: 17px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #2563eb;
  }

  .success-message {
    text-align: center;
    color: green;
    font-weight: bold;
  }

  .error-message {
    text-align: center;
    color: red;
    font-weight: bold;
  }

  @media (max-width: 480px) {
    margin: 40px 20px;
    padding: 30px 20px;
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {login}=useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        username,
        password,
      });
      console.log(res.data);
      
      const { token, role } = res.data;
      console.log(token, role);
      
      // if (token && role) {
      //   localStorage.setItem('token', token);
      //   localStorage.setItem('user', JSON.stringify({ username, role }));
      //     // Store user info and role
        login({
          username: res.data.username,
          role: res.data.role,
          token: res.data.token, // if available
        });
        setSuccess('✅ Login successful! Redirecting...');
       
          if (res.data.role === 'Admin') {
            console.log("sdfghj");
            navigate('/create-software');
          } else if (res.data.role === 'Manager') {
            navigate('/pending-requests');
          } else {
            navigate('/request-access');
          }
       
  
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  }  

  return (
    <>
    <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Login</h1>
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </Form>
    </>
  );
};

export default Login;
