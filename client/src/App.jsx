import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Owner from "./pages/Owner";
import Admin from "./pages/Admin";
import Explore from "./pages/Explore";
import Wishlist from "./pages/Wishlist";
import Inquiries from "./pages/Inquiries";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Page */}
        <Route path="/" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Seeker Home */}
        <Route
          path="/home"
          element={<Home />}
        />

        {/* Owner */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute role="owner">
              <Owner />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Unknown Routes */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/inquiries" element={<Inquiries />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;