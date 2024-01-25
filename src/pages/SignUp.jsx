// src/pages/Registro.js
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const SignUp = ({ isAuthenticated, setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      await axios.post(process.env.REACT_APP_AUTH_URL + "registro", {
        email,
        password,
      });

      // Placeholder: Simulación de registro exitoso
      // Puedes ajustar esto según tu lógica de autenticación

      // Mostrar alerta de éxito
      Swal.fire({
        icon: "success",
        title: "Registro Exitoso",
        text: "¡Bienvenido! Tu cuenta ha sido creada.",
      });

      // Redirigir al usuario a la página de inicio de sesión
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar:", error);

      // Mostrar alerta de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al registrar la cuenta.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleRegistro}>
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
          Registrarse
        </button>
      </form>
      <p className="mt-2">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="text-primary">
          Inicia sesión aquí.
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
