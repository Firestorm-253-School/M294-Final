import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import UsersOverviewPage from "./pages/users/UsersOverviewPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      <Route
          path="/"
          element={
            <ProtectedRoute redirectPath="/login">
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users" element={<UsersOverviewPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
