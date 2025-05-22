import { useAuth } from '../context/AuthContext';
const { logout } = useAuth();

const handleLogout = async () => {
  try {
    await fetch('http://localhost:5000/api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    logout(); // clear context and localStorage
    navigate('/login');
  } catch (error) {
    console.error('Logout failed', error);
  }
};
