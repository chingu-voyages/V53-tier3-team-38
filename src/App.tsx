import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Dashboard } from "./pages/Dashboard";
import { useState } from "react";
import { AuthWrapper } from "./components/authWrapper/AuthWrapper";
import { ComponentSamplePage } from "./pages/componentSamplePage/ComponentSamplePage";

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/components" element={<ComponentSamplePage />} />
          <Route
            path="/dashboard/*"
            element={
              <AuthWrapper isAuthenticated={isAuthenticated}>
                <Dashboard />
              </AuthWrapper>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
};
