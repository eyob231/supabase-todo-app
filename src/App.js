import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import { fetchTodos } from './features/todoSlice'
import { useDispatch } from 'react-redux'
import './App.css'

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <div className="App">
      <h1>Todo App with Redux & Supabase</h1>
      <AddTodo />
      <TodoList />
    </div>
  )
}

export default AppWrapper