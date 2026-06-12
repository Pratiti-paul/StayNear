import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5002/api/auth/register",
      formData
    );

    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
      />

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
        Register
      </button>
    </form>
  );
}

export default Register;