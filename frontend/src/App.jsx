import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';

// Auth Pages
import Login from "./components/comman_components/Login";

// Panels
import AdminPanel from "./pages/admin/AdminPanel";
import ManagerPanel from "./pages/manager/ManagerPanel";
import EmployeePanel from "./pages/employee/EmployeePanel";
import AgentPanel from "./pages/agent/AgentPanel";

AOS.init();


// ✅ Secure Protected Route Component
function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // { role: "admin" }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}


// ✅ Authenticated Layout
function AuthenticatedLayout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="min-h-screen pl-20">{children}</main>
      <Footer />
      
    </>
  );
}

// ✅ Login Layout
function AuthLayout({ children }) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* ✅ PUBLIC ROUTE --- LOGIN */}
        <Route
          path="/"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        {/* ✅ ADMIN PANEL (Protected + Role Based) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AuthenticatedLayout>
                <AdminPanel />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* ✅ MANAGER PANEL */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["manager", "admin"]}>
              <AuthenticatedLayout>
                <ManagerPanel />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* ✅ AGENT PANEL */}
        <Route
          path="/agent"
          element={
            <ProtectedRoute allowedRoles={["agent", "admin"]}>
              <AuthenticatedLayout>
                <AgentPanel />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* ✅ EMPLOYEE PANEL */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={["employee", "admin"]}>
              <AuthenticatedLayout>
                <EmployeePanel />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
