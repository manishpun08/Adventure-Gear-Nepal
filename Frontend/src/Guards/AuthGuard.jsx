import { LocalHospital } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthGuard = (props) => {
  const isLoggedInUser = Boolean(localStorage.getItem("token"));
  const navigate = useNavigate();
  // this will redirect to /login page using location
  const { pathname } = useLocation();
  useEffect(() => {
    if (!isLoggedInUser) {
      navigate("/login");
    }
    if (pathname === "/" && isLoggedInUser) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedInUser, navigate, pathname]);
  return <>{props.children}</>;
};

export default AuthGuard;
