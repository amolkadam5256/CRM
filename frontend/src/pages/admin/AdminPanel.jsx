import React from "react";

export default function AdminPanel() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 shadow-md bg-white rounded-xl">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-gray-600 mt-2">123</p>
        </div>

        <div className="p-6 shadow-md bg-white rounded-xl">
          <h2 className="text-xl font-semibold">Active Agents</h2>
          <p className="text-gray-600 mt-2">45</p>
        </div>

        <div className="p-6 shadow-md bg-white rounded-xl">
          <h2 className="text-xl font-semibold">Projects</h2>
          <p className="text-gray-600 mt-2">8</p>
        </div>

      </div>
    </div>
  );
}
