import React from 'react';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

// import { Container } from './styles';

const AllTodos: React.FC = () => {
  return (
    <>
      <h1>AllTodos</h1>
      <div style={{ display: 'flex' }}>
        <Input placeholder="add details" />
        <Button>Add</Button>
      </div>
    </>
  );
};

export { AllTodos };
