import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminAuthGuard = (props) => {
  const isLoggedInAdmin = Boolean(localStorage.getItem("admin-token"));
  const navigate = useNavigate();
  // this will redirect to /login page using location
  const { pathname } = useLocation();
  useEffect(() => {
    if (!isLoggedInAdmin) {
      navigate("/admin/login");
    }
    if (pathname === "/" && isLoggedInAdmin) {
      navigate("/admin/login", { replace: true });
    }
  }, [isLoggedInAdmin, navigate, pathname]);
  return <>{props.children}</>;
};

export default AdminAuthGuard;
