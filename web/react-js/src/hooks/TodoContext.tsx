import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { TodoServiceLocalStorage } from '../services/TodoService/implementations/TodoService';
import { ITodoService } from '../services/TodoService/ITodoService';

import { ITodoItem } from '../shared/models/ITodoItem';

interface ITodoContextProps {}

interface ITodoContextData {
  todos: ITodoItem[];

  addTodo: (todoItem: Partial<ITodoItem>) => Promise<void>;
  removeTodos: (todoId: string[]) => Promise<void>;
  completeTodo: (todoItem: ITodoItem) => Promise<void>;
  reActivateTodo: (todoItem: ITodoItem) => Promise<void>;
}

const TodoContext = createContext<ITodoContextData>({} as ITodoContextData);

const TodoContextProvider: React.FC<ITodoContextProps> = ({ children }) => {
  const todoService = useMemo<ITodoService>(() => {
    return TodoServiceLocalStorage.getInstance();
  }, []);

  const [todos, setTodos] = useState<ITodoItem[]>([]);

  useEffect(() => {
    todoService.listTodos().then(setTodos);
  }, [todoService]);

  const addTodo = useCallback(
    async (partialTodoItem: Partial<ITodoItem>) => {
      const createdTodo = await todoService.createTodo(partialTodoItem);

      const newTodosValue = new Set(todos).add(createdTodo);

      setTodos(Array.from(newTodosValue));
    },
    [todoService, todos],
  );

  const removeTodos = useCallback(
    async (todoIds: string[]) => {
      await todoService.deleteTodos(todoIds);

      const filteredTodos = todos.filter((p) => !todoIds.includes(p.id));

      setTodos(filteredTodos);
    },
    [todoService, todos],
  );

  const completeTodo = useCallback(
    async (todoItem: ITodoItem) => {
      const todoIndex = todos.findIndex((p) => p.id === todoItem.id);

      if (todoIndex === -1) throw new Error('Todo not found.');

      const updatedTodo = await todoService.updateTodo({
        ...todoItem,
        completed: true,
      });

      setTodos(todos.map((p) => (p.id === updatedTodo.id ? updatedTodo : p)));
    },
    [todoService, todos],
  );

  const reActivateTodo = useCallback(
    async (todoItem: ITodoItem) => {
      const todoIndex = todos.findIndex((p) => p.id === todoItem.id);

      if (todoIndex === -1) throw new Error('Todo not found.');

      const updatedTodo = await todoService.updateTodo({
        ...todoItem,
        completed: false,
      });

      setTodos(todos.map((p) => (p.id === updatedTodo.id ? updatedTodo : p)));
    },
    [todoService, todos],
  );

  return (
    <TodoContext.Provider
      value={{
        todos,

        addTodo,
        removeTodos,
        completeTodo,
        reActivateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = () => useContext(TodoContext);

export { TodoContextProvider, useTodo };
