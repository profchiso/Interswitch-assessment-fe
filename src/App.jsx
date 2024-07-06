import { useState, useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/users/components/Login";
import Register from "./features/users/components/Register";
import UserDashboard from "./features/dashboard/UserDashboard";
import PostDashboard from "./features/dashboard/PostDashboard";
import PrivateRoute from "./features/dashboard/common/PrivateRoute";
import NotFound from "./features/notFound";

function InterswitchApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(sessionStorage.getItem("isAuthenticated"))
  );
  useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem("isAuthenticated"));
    setIsAuthenticated(auth);
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/dashboard/users"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              element={UserDashboard}
            />
          }
        />
        <Route
          exact
          path="/dashboard/posts"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              element={PostDashboard}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default InterswitchApp;
