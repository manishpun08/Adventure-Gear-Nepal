import AdminRoute from "./AdminRoute.jsx";
import GuestRoute from "./GuestRoute.jsx";
import LoginRoute from "./LoginRoute.jsx";

const applicationRoutes = [...GuestRoute, ...LoginRoute, ...AdminRoute];

export default applicationRoutes;
