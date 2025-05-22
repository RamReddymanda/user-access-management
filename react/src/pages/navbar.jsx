import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure AuthContext provides user and logout
import './css/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const renderLinks = () => {
    if (!user) {
      return (
        <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      );
    }

    switch (user.role) {
      case 'Admin':
        return (
          <>
            <Link to="/create-software">Create Software</Link>
            <Link to="/admin-software">ALL Softwares</Link>
            <Link to="/pending-requests">Pending Requests</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        );
      case 'Manager':
        return (
          <>
            <Link to="/pending-requests">Pending Requests</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        );
      case 'Employee':
        return (
          <>
            <Link to="/request-access">Request Access</Link>
            <Link to="/my-requests">My Requests</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        );
      default:
        return <button onClick={handleLogout} className="logout-btn">Logout</button>;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">UserAccessSystem</Link>
      </div>

      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        {renderLinks()}
      </div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
