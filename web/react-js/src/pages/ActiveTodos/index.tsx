import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TodoForm } from '../../components/TodoForm';
import { Checklist, EChecklistMode } from '../../components/Checklist';

import * as SC from './styles';

const items = [
  { completed: false, title: 'Not completed task', id: uuidv4() },
  { completed: true, title: 'Completed task', id: uuidv4() },
];

const ActiveTodos: React.FC = () => {
  return (
    <SC.Container>
      <TodoForm placeholder="add details" />

      <Checklist mode={EChecklistMode.active} items={items} />
    </SC.Container>
  );
};

export { ActiveTodos };
