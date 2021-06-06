import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { TodoServiceLocalStorage } from '../../services/TodoService/implementations/TodoService';

import { ITodoItem } from '../../shared/models/ITodoItem';
import { useLoader } from '../LoaderContext';

interface ITodoContextProps {}

interface ITodoContextData {
  todos: ITodoItem[];

  addTodo: (todoItem: ITodoItem) => void;
  removeTodos: (todoId: string[]) => void;
  completeTodo: (todoItem: ITodoItem) => void;
  reActivateTodo: (todoItem: ITodoItem) => void;
}

const TodoContext = createContext<ITodoContextData>({} as ITodoContextData);

const TodoContextProvider: React.FC<ITodoContextProps> = ({ children }) => {
  const { startLoader, stopLoader } = useLoader();
  const [todos, setTodos] = useState<ITodoItem[]>([]);

  useEffect(() => {
    startLoader();

    const todoService = TodoServiceLocalStorage.getInstance();

    todoService.listTodos().then((loadedTodos) => {
      setTodos(loadedTodos);
      stopLoader();
    });
  }, [startLoader, stopLoader]);

  const addTodo = useCallback(
    (todoItem: ITodoItem) => {
      const newTodosValue = new Set(todos).add(todoItem);

      setTodos(Array.from(newTodosValue));
    },
    [todos],
  );

  const removeTodos = useCallback(
    (todoIds: string[]) => {
      const filteredTodos = todos.filter((p) => !todoIds.includes(p.id));

      setTodos(filteredTodos);
    },
    [todos],
  );

  const completeTodo = useCallback(
    (todoItem: ITodoItem) => {
      const updatedTodo = {
        ...todoItem,
        completed: true,
      };

      setTodos(todos.map((p) => (p.id === updatedTodo.id ? updatedTodo : p)));
    },
    [todos],
  );

  const reActivateTodo = useCallback(
    (todoItem: ITodoItem) => {
      const updatedTodo = {
        ...todoItem,
        completed: false,
      };

      setTodos(todos.map((p) => (p.id === updatedTodo.id ? updatedTodo : p)));
    },
    [todos],
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
