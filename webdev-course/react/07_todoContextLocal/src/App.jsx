import { useState, useEffect } from 'react'
import './App.css'
import { TodoProvider } from './context'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'


function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (text) => {
    setTodos((prev)=>[{id: Date.now(), text: text, isCompleted: false}, ...prev])
  }

  const updateTodo = (id, text) => {
    setTodos((prev)=>prev.map(todo=>todo.id===id ? {...todo, text} : todo))
  }

  const deleteTodo = (id) => {
    setTodos((prev)=>prev.filter(todo=>todo.id!==id))
  }

  const toggleTodo = (id) => {
    setTodos(prev=>prev.map(todo=>todo.id===id ? {...todo, isCompleted: !todo.isCompleted} : todo))
  }

  useEffect(() => {
    console.log("Loaded todos from localStorage:", todos);
    const storedtodos = JSON.parse(localStorage.getItem('todos'))
    if(storedtodos && storedtodos.length > 0) setTodos(storedtodos)
  },[])

  useEffect(() => {
    console.log("Updating localStorage:", todos);
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  
  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}


export default App