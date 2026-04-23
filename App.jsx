import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import SchoolDiscovery from './pages/SchoolDiscovery';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Evaluation from './pages/Evaluation';

const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/schools" />;
  
  switch (user.role) {
    case 'ADMIN': return <AdminDashboard />;
    case 'TEACHER': return <TeacherDashboard />;
    case 'STUDENT': return <StudentDashboard />;
    default: return <Navigate to="/schools" />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardRouter />} />
            <Route path="schools" element={<SchoolDiscovery />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="evaluate" element={<Evaluation />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
