import { GuestGard } from "../Guards/GuestGard";
import BaseLayout from "../layouts/BaseLayout";
import ForgetPassword from "../pages/login/ForgetPassword";
import Login from "../pages/login/Login";
import OtpVerify from "../pages/login/OtpVerify";
import ResetPassword from "../pages/login/ResetPassword";
import Register from "../pages/register/Register";

const GuestRoute = [
  {
    path: "/",
    element: (
      <GuestGard>
        <BaseLayout />
      </GuestGard>
    ),
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "otp-verify",
        element: <OtpVerify />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
];

export default GuestRoute;
