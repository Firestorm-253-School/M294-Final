import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import LiveFeed from "./pages/livefeed.tsx/LiveFeed.tsx";
import UsersOverviewPage from "./pages/users/UsersOverviewPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import FriendsPage from "./pages/Friends/FriendsPage.tsx";


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
        <Route path="/LiveFeed" element={<LiveFeed />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users" element={<UsersOverviewPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/friends" element={<FriendsPage/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
