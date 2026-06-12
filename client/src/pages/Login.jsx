import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.user.role
      );

      if (res.data.user.role === "seeker") {
        navigate("/");
      }

      if (res.data.user.role === "owner") {
        navigate("/owner");
      }

      if (res.data.user.role === "admin") {
        navigate("/admin");
      }
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
          Login
        </h1>

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
          className="w-full border p-3 mb-4"
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />

        <button className="bg-blue-600 text-white w-full py-3 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;