// src/pages/Login.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ isAuthenticated, setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_AUTH_URL + "login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      // Guardar el token en el localStorage
      localStorage.setItem("token", token);

      // Actualizar el estado de autenticación en App.js
      setIsAuthenticated(true);

      // Mostrar alerta de éxito
      Swal.fire({
        icon: "success",
        title: "Inicio de Sesión Exitoso",
        text: "Bienvenido de nuevo.",
      });

      // Redirigir al usuario a la página principal (puede ser la página de tareas)
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      // Mostrar alerta de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Credenciales incorrectas. Por favor, verifica tus datos.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>
      <p className="mt-2">
        ¿No tienes una cuenta?{" "}
        <Link to="/signup" className="text-primary">
          Regístrate aquí.
        </Link>
      </p>
    </div>
  );
};

export default Login;
