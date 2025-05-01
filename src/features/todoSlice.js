import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../supabaseClient'

// Async thunk to fetch todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const { data, error } = await supabase.from('todos').select('*')
  if (error) throw error
  return data
})

// Async thunk to add a todo
export const addTodo = createAsyncThunk('todos/addTodo', async (text) => {
  const { data, error } = await supabase.from('todos').insert([{ text }]).select()
  if (error) throw error
  return data[0]
})

// Async thunk to delete a todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  const { error } = await supabase.from('todos').delete().eq('id', id)
  if (error) throw error
  return id
})

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload)
      })
  },
})

export default todoSlice.reducer