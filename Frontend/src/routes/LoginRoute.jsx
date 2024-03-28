import AuthGuard from "../Guards/AuthGuard";
import EditProduct from "../components/EditProduct";
import LobbyDetail from "../components/LobbyDetail";
import Recruit from "../components/Recruit";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/About";
import AddProduct from "../pages/AddProduct";
import Cart from "../pages/Cart";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Lobby from "../pages/Lobby";
import Order from "../pages/Order";
import PaymentSuccess from "../pages/PaymentSuccess";
import ProductDetails from "../pages/ProductDetails";
import ProductList from "../pages/ProductList";

const LoginRoute = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "product",
        element: <ProductList />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "productDetails/:id",
        element: <ProductDetails />,
      },
      {
        path: "product/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/payment/khalti/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/lobby",
        element: <Lobby />,
      },
      {
        path: "/recruit",
        element: <Recruit />,
      },
      {
        path: "orders",
        element: <Order />,
      },
    ],
  },
];

export default LoginRoute;
