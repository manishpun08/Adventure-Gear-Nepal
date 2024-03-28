import AdminAuthGuard from "../Guards/AdminAuthGuard";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLogin from "../pages/admin/AdminLogin";
import Categories from "../pages/admin/Categories";
import Orders from "../pages/admin/Orders";
import Products from "../pages/admin/Products";

const AdminRoute = [
  {
    path: "/admin",
    element: (
      <AdminAuthGuard>
        <AdminLayout />
      </AdminAuthGuard>
    ),
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
    element: <AdminLogin />,
  },
];

export default AdminRoute;
