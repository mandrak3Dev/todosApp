// src/components/TodoList.js
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TodoList = ({ todos, onTodoDeleted, onTodoUpdated }) => {
  const [editedTodo, setEditedTodo] = useState(null);
  const [updatedTask, setUpdatedTask] = useState("");

  const handleEdit = (todo) => {
    setEditedTodo(todo);
    setUpdatedTask(todo.task);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(process.env.REACT_APP_API_URL + editedTodo._id, {
        task: updatedTask,
      });
      onTodoUpdated(editedTodo._id, updatedTask);

      // Mostrar alerta de éxito
      Swal.fire({
        icon: "success",
        title: "Tarea Actualizada",
        text: "La tarea se ha actualizado exitosamente.",
      });

      // Limpiar el estado de la tarea editada
      setEditedTodo(null);
      setUpdatedTask("");
    } catch (error) {
      console.error("Error al actualizar el todo:", error);

      // Mostrar alerta de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al actualizar la tarea.",
      });
    }
  };

  const handleCancelEdit = () => {
    // Limpiar el estado de la tarea editada
    setEditedTodo(null);
    setUpdatedTask("");
  };

  const handleDelete = async (todoId) => {
    try {
      await axios.delete(process.env.REACT_APP_API_URL + todoId);
      onTodoDeleted(todoId);

      // Mostrar alerta de éxito
      Swal.fire({
        icon: "success",
        title: "Tarea Eliminada",
        text: "La tarea se ha eliminado exitosamente.",
      });
    } catch (error) {
      console.error("Error al eliminar el todo:", error);

      // Mostrar alerta de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al eliminar la tarea.",
      });
    }
  };

  return (
    <div>
      <h2>Listado de Tareas</h2>
      {todos.length === 0 ? (
        <p>No hay tareas. ¡Agrega una!</p>
      ) : (
        <ul className="list-group">
          {todos.map((todo) => (
            <li key={todo._id} className="list-group-item">
              {editedTodo === todo ? (
                <form onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    className="form-control"
                    value={updatedTask}
                    onChange={(e) => setUpdatedTask(e.target.value)}
                  />
                  <button type="submit" className="btn btn-sm btn-primary">Guardar</button>
                  <button type="button" className="btn btn-sm btn-secondary mx-1" onClick={handleCancelEdit}>
                    Cancelar
                  </button>
                </form>
              ) : (
                <div>
                  {todo.task}
                  <button
                    className="btn btn-warning btn-sm mx-2"
                    onClick={() => handleEdit(todo)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
