import { createContext, useCallback, useContext, useState } from 'react';

import { IItem } from '../components/Checklist';

interface ITodoContextProps {}

interface ITodoContextData {
  todos: IItem[];

  addTodo: VoidFunction;
  removeTodo: VoidFunction;
  completeTodo: VoidFunction;
  reActivateTodo: VoidFunction;
}

const TodoContext = createContext<ITodoContextData>({} as ITodoContextData);

const TodoContextProvider: React.FC<ITodoContextProps> = ({
  children,
  ...rest
}) => {
  const [todos, setTodos] = useState<IItem[]>([]);

  const addTodo = useCallback(() => {}, []);

  const removeTodo = useCallback(() => {}, []);

  const completeTodo = useCallback(() => {}, []);

  const reActivateTodo = useCallback(() => {}, []);

  return (
    <TodoContext.Provider
      value={{
        todos,

        addTodo,
        removeTodo,
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
