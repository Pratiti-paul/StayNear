import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "seeker",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5002/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);

      const role = res.data.user.role;
      toast.success(`Welcome back, ${res.data.user.name || "User"}!`);

      if (role === "seeker") navigate("/home");
      else if (role === "owner") navigate("/owner");
      else if (role === "admin") navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="staynear-page-shell flex items-center justify-center px-4 py-8">
      <div className="staynear-card w-full max-w-md overflow-hidden">

        <div className="border-b border-slate-200 bg-gradient-to-br from-teal-700 via-teal-700 to-cyan-600 px-8 py-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em]">
            StayNear
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm">
            Login to continue exploring verified stays.
          </p>
        </div>

        <div className="px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                required
                placeholder="Enter your email"
                className="staynear-input"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                required
                placeholder="Enter your password"
                className="staynear-input"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Role
              </label>

              <select
                className="staynear-select"
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
            </div>

            <button
              type="submit"
              className="staynear-button-primary w-full"
            >
              Login
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="staynear-link"
            >
              Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;