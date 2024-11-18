import AddTodo from './component/AddTodo';
import TodoList from './component/TodoList';

function App() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
                <AddTodo />
                <TodoList />
            </div>
        </div>
    );
}

export default App;
