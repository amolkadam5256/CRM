import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await api.post("/auth/login", formData);

            // ✅ Save token
            localStorage.setItem("token", res.data.token);

            // ✅ Save full user object for ProtectedRoute
            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: res.data.name,
                    email: res.data.email,
                    role: res.data.role,
                })
            );

            // Navigate based on user role
            if (res.data.role === "admin") {
                navigate("/admin");
            } else if (res.data.role === "manager") {
                navigate("/manager");
            } else if (res.data.role === "agent") {
                navigate("/agent");
            } else if (res.data.role === "employee") {
                navigate("/employee");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="yellow" strokeWidth="1" opacity="0.2" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="relative z-10 bg-gray-900 px-8 py-10 shadow-2xl border border-gray-800 w-96 backdrop-blur-sm">
                <div className="flex items-center text-center justify-center space-x-4 mb-12">
                    <h1 className="text-yellow-400 text-2xl font-semibold">CRM Platform</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="text-gray-400" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-300"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="text-gray-400" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                            className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-300"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <FaEyeSlash className="text-gray-400 hover:text-yellow-400 transition-colors" />
                            ) : (
                                <FaEye className="text-gray-400 hover:text-yellow-400 transition-colors" />
                            )}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-700 focus:ring-yellow-500 focus:ring-2"
                            />
                            <span className="text-gray-300 text-sm">Remember me</span>
                        </label>
                        
                    </div>

                    {error && (
                        <div className="bg-red-900/50 border border-red-700 p-3">
                            <p className="text-red-300 text-sm text-center">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 text-black py-3 font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin"></div>
                                <span>Logging in...</span>
                            </div>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                <p className="text-gray-400 text-center mt-6 text-sm">
                    Access your CRM account
                </p>
            </div>
        </div>
    );
}
