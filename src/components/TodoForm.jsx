// src/components/TodoForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const TodoForm = ({ onTodoAdded }) => {
  const [task, setTask] = useState('');

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL, { task });
      onTodoAdded(response.data);
      setTask('');

      // Mostrar alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Tarea Agregada',
        text: 'La tarea se ha agregado exitosamente.',
      });
    } catch (error) {
      console.error('Error al crear un nuevo todo:', error);

      // Mostrar alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al agregar la tarea.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mb-5'>
      <div className="mb-3">
        <label htmlFor="task" className="form-label">Nueva Tarea</label>
        <input
          type="text"
          className="form-control"
          id="task"
          value={task}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Agregar Tarea</button>
    </form>
  );
};

export default TodoForm;
