import { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

const AddTodo = () => {
    const [text, setText] = useState('');
    const { addTodo } = useContext(TodoContext);

    const handleAdd = () => {
        if (text.trim()) {
            addTodo({
                id: Date.now(),
                text,
                completed: false,
            });
            setText('');
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border rounded px-3 py-2"
                placeholder="Add a task"
            />
            <button
                onClick={handleAdd}
                className="bg-blue-500 text-white rounded px-3 py-2 hover:bg-blue-700"
            >
                Add
            </button>
        </div>
    );
};

export default AddTodo;
