// src/TodoApp.js
import React, { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Cargar la lista de to-dos al montar el componente
    const fetchTodos = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL);
        setTodos(response.data);
      } catch (error) {
        console.error('Error al cargar la lista de to-dos:', error);
      }
    };

    fetchTodos();
  }, []); // La dependencia vacía asegura que se ejecute solo una vez al montar el componente

  const handleTodoAdded = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleTodoDeleted = async (deletedTodoId) => {
    try {
      await axios.delete(process.env.REACT_APP_API_URL + deletedTodoId);
      setTodos(todos.filter((todo) => todo._id !== deletedTodoId));
    } catch (error) {
      console.error('Error al eliminar el todo:', error);
    }
  };

  const handleTodoUpdated = (updatedTodoId, updatedTask) => {
    const updatedTodos = todos.map((todo) =>
      todo._id === updatedTodoId ? { ...todo, task: updatedTask } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="container mt-5">
      <h1>Todo List</h1>
      <TodoForm onTodoAdded={handleTodoAdded} />
      <TodoList
        todos={todos}
        onTodoDeleted={handleTodoDeleted}
        onTodoUpdated={handleTodoUpdated}
      />
    </div>
  );
}

export default App;
