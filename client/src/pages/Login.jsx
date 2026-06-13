import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "seeker",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5002/api/auth/login",
      formData
    );

    localStorage.setItem("token", res.data.token);

    const role = res.data.user.role;

    if (role === "seeker") {
      localStorage.setItem("role", role);
      navigate("/home");
    }

    if (role === "owner") {
      localStorage.setItem("role", role);
      navigate("/owner");
    }

    if (role === "admin") {
      localStorage.setItem("role", role);
      navigate("/admin");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setFormData({
            ...formData,
            password: e.target.value,
          })
        }
      />

      <select
        onChange={(e) =>
          setFormData({
            ...formData,
            role: e.target.value,
          })
        }
      >
        <option value="seeker">Seeker</option>
        <option value="owner">Owner</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;