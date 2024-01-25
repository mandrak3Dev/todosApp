// src/components/LogoutButton.js
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar token del localStorage
    localStorage.removeItem("token");

    // Actualizar el estado de autenticación en App.js
    setIsAuthenticated(false);

    // Redirigir al usuario a la página de inicio de sesión
    navigate("/login");
  };

  return (
    <div className="position-absolute top-0 end-0 p-2">
      <button className="btn btn-danger" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default LogoutButton;
