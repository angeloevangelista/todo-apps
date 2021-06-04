import React from 'react';

import * as SC from './styles';

import { Input } from '../Input';
import { Button } from '../Button';

interface ITodoFormProps {
  placeholder: string;
}

const TodoForm: React.FC<ITodoFormProps> = ({ placeholder }) => {
  return (
    <SC.Container>
      <Input placeholder={placeholder} />

      <Button>Add</Button>
    </SC.Container>
  );
};

export { TodoForm };
