// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TodoApp from "./pages/TodoApp";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LogoutButton from "./components/LogoutButton";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar el token al cargar la aplicación
    const token = localStorage.getItem("token");

    if (token) {
      // Placeholder: Verificación de token (puedes implementar una verificación real)
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      {isAuthenticated && (
        <div className="mb-3">
          <LogoutButton setIsAuthenticated={setIsAuthenticated} />
        </div>
      )}

      <Routes>
        <Route
          path="/login"
          element={
            <Login
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <TodoApp />
            ) : (
              // Redirigir a la página de inicio de sesión si no está autenticado
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
