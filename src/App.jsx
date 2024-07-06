import { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/users/components/Login";
import Register from "./features/users/components/Register";
import Dashboard from "./features/dashboard";
import PrivateRoute from "./features/dashboard/common/PrivateRoute";
import NotFound from "./features/notFound";

function InterswitchApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(sessionStorage.getItem("isAuthenticated"))
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/dashboard/users"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              element={Dashboard}
            />
          }
        />
        <Route
          exact
          path="/dashboard/posts"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              element={Dashboard}
            />
          }
        />
        <Route
          exact
          path="/dashboard/comments"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              element={Dashboard}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default InterswitchApp;
