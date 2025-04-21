// src/layout/AdminLayout.jsx
import React from "react";
import { Sidebar } from "../components/ui/Sidebar";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
};
