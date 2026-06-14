import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

      const role = res.data.user.role;

      if (role === "seeker") navigate("/home");
      else if (role === "owner") navigate("/owner");
      else if (role === "admin") navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="staynear-page-shell flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="staynear-card w-full max-w-md overflow-hidden">
        <div className="border-b border-slate-200 bg-gradient-to-br from-teal-700 via-teal-700 to-cyan-600 px-8 py-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-100/90">
            StayNear
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Welcome to StayNear
          </h1>
          <p className="mt-3 text-sm leading-6 text-teal-50/90">
            Sign in to continue exploring verified student stays, owner listings,
            and your saved homes.
          </p>
        </div>

        <div className="space-y-6 px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="staynear-input"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                className="staynear-input"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Role
              </label>
              <select
                className="staynear-select"
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="seeker">Seeker</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="staynear-button-primary w-full">
              Login
            </button>
          </form>

          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            <span>Or</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="staynear-link">
              Register
            </Link>
          </p>

          <p className="text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link to="/" className="staynear-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;