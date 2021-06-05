import React from 'react';

import { useTodo } from '../../hooks/TodoContext';
import { TodoForm } from '../../components/TodoForm';
import { Checklist, EChecklistMode } from '../../components/Checklist';

import * as SC from './styles';

const AllTodos: React.FC = () => {
  const { todos } = useTodo();

  return (
    <SC.Container>
      <TodoForm placeholder="add details" />

      <Checklist mode={EChecklistMode.all} items={todos} />
    </SC.Container>
  );
};

export { AllTodos };
