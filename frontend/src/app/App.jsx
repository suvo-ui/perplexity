import { RouterProvider } from "react-router";
import { AppRoutes } from "./app.routes.jsx";
import { useEffect } from "react";
import { useAuth } from "../features/auth/hook/useAuth.js";

const App = () => {
  const { fetchCurrentUser } = useAuth();

  // Fetch the current user when the app mounts known as hydration of the user state from the backend to the frontend. This is useful for maintaining user sessions across page reloads or when the user navigates away and comes back to the app.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return <RouterProvider router={AppRoutes} />;
};

export default App;
