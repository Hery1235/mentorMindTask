import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuth } from "../store/AuthContext";

export const Login = () => {
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email);
      setToken(data.token);
      navigate("/classes");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="bg-white shadow-xl rounded-2xl flex max-w-4xl w-full overflow-hidden">
        {/* Left Image/Illustration */}
        <div className="hidden md:block md:w-1/2 bg-blue-600">
          <img
            src="https://img.freepik.com/premium-vector/mobile-login-concept-illustration_114360-135.jpg"
            alt="Teaching"
            className="h-full w-full object-cover rounded-l-2xl"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Sign in to access your classes
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6 text-sm">
            &copy; 2025 MentorMind. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
