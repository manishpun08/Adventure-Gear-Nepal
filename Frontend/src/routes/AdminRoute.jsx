import AdminAuthGuard from "../Guards/AdminAuthGuard";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Categories from "../pages/admin/Categories";
import Orders from "../pages/admin/Orders";
import Products from "../pages/admin/Products";

const AdminRoute = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <p>Admin Login</p>,
  },
];

export default AdminRoute;
