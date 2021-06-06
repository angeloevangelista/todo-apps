import React, { useCallback, useMemo, useState } from 'react';

import * as SC from './styles';

import { Input } from '../Input';
import { Button } from '../Button';
import { useTodo } from '../../hooks/TodoContext';
import { useLoader } from '../../hooks/LoaderContext';
import { ITodoService } from '../../services/TodoService/ITodoService';
import { TodoServiceLocalStorage } from '../../services/TodoService/implementations/TodoService';

interface ITodoFormProps {
  placeholder: string;
}

const TodoForm: React.FC<ITodoFormProps> = ({ placeholder }) => {
  const todoService = useMemo<ITodoService>(() => {
    return TodoServiceLocalStorage.getInstance();
  }, []);

  const [title, setTitle] = useState<string>('');

  const { addTodo } = useTodo();
  const { isLoading, startLoader, stopLoader } = useLoader();

  const handleFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();

        startLoader('Adding todo');

        const createdTodo = await todoService.createTodo({
          title,
        });

        addTodo(createdTodo);

        setTitle('');
      } catch (error) {
        alert('Deu ruim, amigão 🔥🔥🔥');
        console.log(error);
      } finally {
        stopLoader();
      }
    },
    [addTodo, startLoader, stopLoader, title, todoService],
  );

  return (
    <SC.Container onSubmit={handleFormSubmit}>
      <Input
        value={title}
        readOnly={isLoading}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={placeholder}
      />

      <Button type="submit" disabled={!title.trim()}>
        Add
      </Button>
    </SC.Container>
  );
};

export { TodoForm };
