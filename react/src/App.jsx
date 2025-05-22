import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateSoftware from './pages/CreateSoftware';
import RequestAccess from './pages/RequestAccess';
import PendingRequests from './pages/PendingRequests';
import MyRequests from './pages/MyRequests';
import Navbar from './pages/navbar.jsx';
import AllSoftware from './pages/AllSoftware';
import EditSoftware from './pages/EditSoftware.jsx';

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit-software/:id" element={user ? <EditSoftware /> : <Navigate to="/login" />} />
        <Route path="/admin-software" element={user ? <AllSoftware /> : <Navigate to="/login" />} />
        <Route path="/create-software" element={user ? <CreateSoftware /> : <Navigate to="/login" />} />
        <Route path="/request-access" element={user ? <RequestAccess /> : <Navigate to="/login" />} />
        <Route path="/pending-requests" element={user ? <PendingRequests /> : <Navigate to="/login" />} />
        <Route path="/my-requests" element={user ? <MyRequests /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
