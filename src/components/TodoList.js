import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo } from '../features/todoSlice'

const TodoList = () => {
  const todos = useSelector((state) => state.todos.items)
  const status = useSelector((state) => state.todos.status)
  const error = useSelector((state) => state.todos.error)
  const dispatch = useDispatch()

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'failed') return <div>Error: {error}</div>

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList