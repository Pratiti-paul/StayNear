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
    <div className="staynear-page-shell flex items-center justify-center px-4 py-8">
      <div className="staynear-card w-full max-w-md overflow-hidden">

        <div className="border-b border-slate-200 bg-gradient-to-br from-cyan-600 via-teal-700 to-teal-800 px-8 py-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em]">
            StayNear
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-3 text-sm">
            Join StayNear and discover verified student stays.
          </p>
        </div>

        <div className="px-8 py-8">

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                required
                placeholder="Enter your full name"
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
                placeholder="Create password"
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
              className="staynear-button-secondary w-full"
            >
              Register
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="staynear-link"
            >
              Login
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Register;