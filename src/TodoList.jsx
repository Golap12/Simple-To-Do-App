import React, { useReducer, useState, useCallback, memo } from 'react';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'UPDATE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload.id);
    default:
      throw new Error('Unknown action type');
  }
};

const initialTodos = [
  { id: 1, text: 'My Name Is Nurulla Hasan' },
];

const TodoList = memo(() => {

  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleAddTodo = useCallback(() => {
    dispatch({ type: 'ADD_TODO', payload: { id: Date.now(), text: newTodo } });
    setNewTodo('');
  }, [newTodo]);

  const handleEditTodo = useCallback((id, text) => {
    setEditingTodoId(id);
    setEditingText(text);
  }, []);

  const handleUpdateTodo = useCallback((id) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, text: editingText } });
    setEditingTodoId(null);
    setEditingText('');
  }, [editingText]);

  const handleDeleteTodo = useCallback((id) => {
    dispatch({ type: 'DELETE_TODO', payload: { id } });
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white border rounded-sm shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">To-Do List</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow p-2 border rounded-l-sm focus:outline-none"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white p-2 rounded-r-sm hover:bg-blue-600">
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded-sm">
            {editingTodoId === todo.id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="flex-grow p-2 border rounded-sm focus:outline-none mr-2"
              />
            ) : (
              <span className='overflow-auto mr-2'>{todo.text}</span>
            )}
            <div className="space-x-2 flex">
              {editingTodoId === todo.id ? (
                <button
                  onClick={() => handleUpdateTodo(todo.id)}
                  className="bg-green-500 text-white p-1 rounded-sm hover:bg-green-600">
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditTodo(todo.id, todo.text)}
                  className="bg-yellow-500 text-white p-1 rounded-sm hover:bg-yellow-600">
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="bg-red-500 text-white p-1 rounded-sm hover:bg-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TodoList;
