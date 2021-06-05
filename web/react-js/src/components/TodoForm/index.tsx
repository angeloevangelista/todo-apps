import React, { useCallback, useState } from 'react';

import * as SC from './styles';

import { Input } from '../Input';
import { Button } from '../Button';
import { useTodo } from '../../hooks/TodoContext';

interface ITodoFormProps {
  placeholder: string;
}

const TodoForm: React.FC<ITodoFormProps> = ({ placeholder }) => {
  const { addTodo } = useTodo();
  const [title, setTitle] = useState<string>('');

  const handleFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await addTodo({
        title,
      });

      setTitle('');
    },
    [addTodo, title],
  );

  return (
    <SC.Container onSubmit={handleFormSubmit}>
      <Input
        value={title}
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
