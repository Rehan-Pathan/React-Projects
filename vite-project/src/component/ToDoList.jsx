import { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';

const TodoList = () => {
    const { todos, deleteTodo, updateTodo, toggleComplete } = useContext(TodoContext);
    const [editingId, setEditingId] = useState(null);
    const [newText, setNewText] = useState('');

    const handleEdit = (id, text) => {
        setEditingId(id);
        setNewText(text);
    };

    const saveEdit = (id) => {
        updateTodo(id, newText);
        setEditingId(null);
    };

    return (
        <ul className="mt-4 space-y-2">
            {todos.map((todo) => (
                <li 
                    key={todo.id}
                    className={`flex items-center justify-between bg-gray-200 p-2 rounded `}
                >
                    {editingId === todo.id ? (
                        <input
                            type="text"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                        />
                    ) : (
                        <span onClick={() => toggleComplete(todo.id)} className={`cursor-pointer ${
                        todo.completed ? 'line-through text-gray-500' : ''
                    }`}>
                            {todo.text}
                        </span>
                    )}
                    <div className="flex space-x-2">
                        {editingId === todo.id ? (
                            <button
                                onClick={() => saveEdit(todo.id)}
                                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() => handleEdit(todo.id, todo.text)}
                                className={`bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 ${
                                    todo.completed ? 'line-through text-gray-500' : ''
                                }`}
                            >
                                Edit
                            </button>
                        )}
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
