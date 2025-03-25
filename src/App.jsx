import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from "./components/Register";


function App() {
  return (
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* Fallback for unknown routes */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
  );
}

export default App;
