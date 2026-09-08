import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {

  const isAdmin = localStorage.getItem("admin");

  if (isAdmin !== "true") {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;

};

export default AdminProtectedRoute;