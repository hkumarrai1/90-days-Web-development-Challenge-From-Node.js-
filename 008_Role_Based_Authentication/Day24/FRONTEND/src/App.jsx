import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./components/AdminPage";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Outlet /> {/* Use Outlet for nested routes */}
      </ProtectedRoute>
    ),
    children: [
      {
        path: "", // This matches `/admin`
        element: <AdminPage />, // Render AdminPage as a nested route
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
