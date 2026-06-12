import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

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

    try {
      await registerUser(formData);

      alert("Account Created Successfully");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl w-96"
      >
        <h1 className="text-2xl font-bold mb-6">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 mb-3"
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
          className="w-full border p-3 mb-3"
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
          className="w-full border p-3 mb-3"
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />

        <select
          className="w-full border p-3 mb-4"
          onChange={(e) =>
            setFormData({
              ...formData,
              role: e.target.value,
            })
          }
        >
          <option value="seeker">
            Seeker
          </option>

          <option value="owner">
            Owner
          </option>
        </select>

        <button className="bg-blue-600 text-white w-full py-3 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;