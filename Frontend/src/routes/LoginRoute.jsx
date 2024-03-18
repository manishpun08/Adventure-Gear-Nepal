import MainLayout from "../layouts/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import AddProduct from "../pages/AddProduct";
import Contact from "../pages/Contact";
import ProductDetails from "../pages/ProductDetails";
import EditProduct from "../components/EditProduct";
import Cart from "../pages/Cart";

const LoginRoute = [
  {
    path: "/",
    element: <MainLayout />,
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
    ],
  },
];

export default LoginRoute;
