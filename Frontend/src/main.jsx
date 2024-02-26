import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import "./index.css";
import applicationRoutes from "./routes/index.js";

// Create a client
const queryClient = new QueryClient();

// creating application routes
const router = createBrowserRouter(applicationRoutes);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
