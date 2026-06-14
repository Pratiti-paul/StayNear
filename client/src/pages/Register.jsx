import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

    try {
      await axios.post(
        "http://localhost:5002/api/auth/register",
        formData
      );

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="staynear-page-shell flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="staynear-card w-full max-w-md overflow-hidden">
        <div className="border-b border-slate-200 bg-gradient-to-br from-cyan-600 via-teal-700 to-teal-800 px-8 py-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100/90">
            StayNear
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Create your account
          </h1>
          <p className="mt-3 text-sm leading-6 text-cyan-50/90">
            Join StayNear to save properties, contact owners, and manage your
            student housing journey.
          </p>
        </div>

        <div className="space-y-6 px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                required
                className="staynear-input"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />
            </div>

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
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                required
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
              <label className="mb-2 block text-sm font-medium text-slate-700">
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

            <button type="submit" className="staynear-button-secondary w-full">
              Register
            </button>
          </form>

          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            <span>Or</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/" className="staynear-link">
              Login
            </Link>
          </p>

          <p className="text-center text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="staynear-link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;