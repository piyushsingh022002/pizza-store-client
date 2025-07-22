import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/user"
          element={<ProtectedRoute role="User"><UserPage /></ProtectedRoute>}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute role="Admin"><AdminPage /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
