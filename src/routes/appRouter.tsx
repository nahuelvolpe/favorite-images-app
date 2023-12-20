import { Route, Routes } from "react-router-dom";
import { PublicRoute } from "./publicRoute";
import { PrivateRoute } from "./privateRoute";
import Login from "../views/login";
import Home from "../views/home";
import MyImages from "../views/myImages";
import ImageDetail from "../views/imageDetail";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-images"
          element={
            <PrivateRoute>
              <MyImages />
            </PrivateRoute>
          }
        />
        <Route
          path="/images/:imageId"
          element={
            <PrivateRoute>
              <ImageDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRouter;
