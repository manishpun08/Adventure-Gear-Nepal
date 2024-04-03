import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const GuestGard = (props) => {
  const isLoggedInUser = Boolean(localStorage.getItem("token"));

  const navigate = useNavigate();
  // this will redirect to /login page using location
  const { pathname } = useLocation();
  useEffect(() => {
    if (isLoggedInUser) {
      navigate("/home", { replace: true });
    }

    if (pathname === "/" && !isLoggedInUser) {
      navigate("/home", { replace: true });
    }
  }, [isLoggedInUser, navigate, pathname]);
  return <>{!isLoggedInUser && props.children}</>;
};
