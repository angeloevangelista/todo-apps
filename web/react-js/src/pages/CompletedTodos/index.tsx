import React from 'react';

import { useTodo } from '../../hooks/TodoContext';
import { Checklist, EChecklistMode } from '../../components/Checklist';

import * as SC from './styles';

const CompletedTodos: React.FC = () => {
  const { todos } = useTodo();

  return (
    <SC.Container>
      <Checklist mode={EChecklistMode.completed} items={todos} />
    </SC.Container>
  );
};

export { CompletedTodos };
