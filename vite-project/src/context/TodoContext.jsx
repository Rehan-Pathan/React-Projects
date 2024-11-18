import { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const TodoContext = createContext();

// eslint-disable-next-line react/prop-types
export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    // Sync todos with Local Storage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo) => setTodos([...todos, todo]);

    const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

    const updateTodo = (id, updatedText) =>
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: updatedText } : todo
            )
        );

    const toggleComplete = (id) =>
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );

    return (
        <TodoContext.Provider
            value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}
        >
            {children}
        </TodoContext.Provider>
    );
};
