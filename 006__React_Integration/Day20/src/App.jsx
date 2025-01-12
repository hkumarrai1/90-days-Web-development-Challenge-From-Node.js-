import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";

// Define your routes
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
]);

// App component
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
