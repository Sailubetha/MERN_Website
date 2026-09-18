import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Mail, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("admin@college.edu");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate("/admin/dashboard");
    } else {
      setError(res.message || "Invalid login credentials.");
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ff5733] to-amber-500 p-0.5 mx-auto shadow-md">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Shield className="w-7 h-7 text-[#ff5733]" />
            </div>
          </div>
          <h2 className="text-2xl font-bold font-cinzel text-slate-900">SAC Admin Portal</h2>
          <p className="text-xs text-slate-500">
            Sign in to manage college events, publish registrations, and control website content.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 text-xs text-slate-700 space-y-1">
          <p className="font-bold text-[#ff5733] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Demo Admin Credentials:
          </p>
          <p className="text-[11px] font-mono text-slate-600">
            Email: <strong className="text-slate-900">admin@college.edu</strong> | Password: <strong className="text-slate-900">admin123</strong>
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#ff5733]" /> Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#ff5733]"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#ff5733]" /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#ff5733]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#ff5733] hover:bg-[#e04826] text-white font-bold text-xs transition-all shadow-md shadow-[#ff5733]/25 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? "Authenticating..." : "Sign In to Admin Dashboard"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
