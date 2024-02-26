import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

const GuestRoute = [
  {
    path: "/",
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

export default GuestRoute;
