import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './features/todo/todoSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput('');
    }
  };
  const handleUpdate=(id)=>{
      
    const todoToEdit = todos.find((todo) => todo.id === id);
  
  if (todoToEdit) {
    // Set the input field value to the todo's text
    setInput(todoToEdit.text);
  }
  toast.success(`Todo moved to input: "${todoToEdit.text}"`, {
    position: 'top-center',
    autoClose: 3000, // 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  

  dispatch(deleteTodo(id));
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-4 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <div className="flex gap-2 mb-4">
        
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded"
            placeholder="Add a new todo"
          />
          <ToastContainer />
          <button
            onClick={handleAddTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
          
        </div>
        <ul className="space-y-2 w-full">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-2 border rounded ${
                todo.completed ? 'bg-green-100 line-through' : 'bg-gray-100'
              }`}
            >
              <span onClick={() => dispatch(toggleTodo(todo.id))} className="cursor-pointer">
                {todo.text}
              </span>
              <div className='flex gap-2 mb-2'>
              <button
                onClick={()=>handleUpdate(todo.id)}
                className="text-gray-500 hover:text-black"
              >
                Update
              </button>
              
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

