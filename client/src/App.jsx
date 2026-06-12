import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Owner from "./pages/Owner";
import Admin from "./pages/Admin";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Owner Only */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute role="owner">
              <Owner />
            </ProtectedRoute>
          }
        />

        {/* Admin Only */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;