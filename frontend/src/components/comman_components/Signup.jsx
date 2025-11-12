import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaCheck, FaGoogle, FaGithub, FaLinkedin, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" or "error"
    const [passwordStrength, setPasswordStrength] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Check password strength
        if (name === "password") {
            checkPasswordStrength(value);
        }
    };

    const checkPasswordStrength = (password) => {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

        if (strongRegex.test(password)) {
            setPasswordStrength("strong");
        } else if (mediumRegex.test(password)) {
            setPasswordStrength("medium");
        } else {
            setPasswordStrength("weak");
        }
    };

    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
            case "strong": return "bg-green-500";
            case "medium": return "bg-yellow-500";
            case "weak": return "bg-red-500";
            default: return "bg-gray-600";
        }
    };

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case "strong": return "Strong password";
            case "medium": return "Medium strength";
            case "weak": return "Weak password";
            default: return "Enter a password";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match!");
            setMessageType("error");
            setLoading(false);
            return;
        }

        // Validate password strength
        if (passwordStrength === "weak" && formData.password.length > 0) {
            setMessage("Please use a stronger password");
            setMessageType("error");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post("/api/signup", formData);
            setMessage("Signup successful! Awaiting admin approval. You'll receive an email once approved.");
            setMessageType("success");
            setFormData({ name: "", email: "", password: "", confirmPassword: "" });
            setPasswordStrength("");

            // Redirect to login after 3 seconds
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (error) {
            setMessage(error.response?.data?.message || "Error during signup. Please try again.");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialSignup = (provider) => {
        console.log(`Signing up with ${provider}`);
        // Social signup implementation
    };

    const passwordRequirements = [
        { text: "At least 8 characters", met: formData.password.length >= 8 },
        { text: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
        { text: "One lowercase letter", met: /[a-z]/.test(formData.password) },
        { text: "One number", met: /[0-9]/.test(formData.password) },
        { text: "One special character", met: /[!@#$%^&*]/.test(formData.password) },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center  relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">

                <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
                    <defs>
                        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="yellow" strokeWidth="1" opacity="0.2" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Main Signup Card */}
            <div className="relative z-10 bg-gray-900 p-8  shadow-2xl border border-gray-800 w-96 backdrop-blur-sm">
                <div className="flex items-center text-center justify-center space-x-4 mb-6">
                        <h1 className="text-yellow-400 text-lg font-semibold">CRM Platform</h1>
                </div>
                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700  text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-300"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700  text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-300"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="text-gray-400" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700  text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-300"
                            required
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

                    {/* Password Strength Indicator */}
                    {formData.password && (
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-400">Password strength</span>
                                <span className={`text-xs font-medium ${passwordStrength === "strong" ? "text-green-400" :
                                        passwordStrength === "medium" ? "text-yellow-400" :
                                            "text-red-400"
                                    }`}>
                                    {getPasswordStrengthText()}
                                </span>
                            </div>
                            <div className="w-full bg-gray-700  h-2">
                                <div
                                    className={`h-2 transition-all duration-500 ${passwordStrength === "strong" ? "w-full bg-green-500" :
                                            passwordStrength === "medium" ? "w-2/3 bg-yellow-500" :
                                                "w-1/3 bg-red-500"
                                        }`}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Confirm Password Field */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="text-gray-400" />
                        </div>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700  text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-300"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <FaEyeSlash className="text-gray-400 hover:text-yellow-400 transition-colors" />
                            ) : (
                                <FaEye className="text-gray-400 hover:text-yellow-400 transition-colors" />
                            )}
                        </button>
                    </div>

                    {/* Message Display */}
                    {message && (
                        <div className={`p-3 border ${messageType === "success"
                                ? "bg-green-900/50 border-green-700"
                                : "bg-red-900/50 border-red-700"
                            }`}>
                            <p className={`text-sm text-center ${messageType === "success" ? "text-green-300" : "text-red-300"
                                }`}>
                                {message}
                            </p>
                        </div>
                    )}

                    {/* Signup Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 text-black py-3  font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-black border-t-transparent  animate-spin"></div>
                                <span>Creating Account...</span>
                            </div>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/")}
                            className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;