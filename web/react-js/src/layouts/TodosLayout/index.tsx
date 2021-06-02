import React from 'react';
import { Link } from 'react-router-dom';
import { DefaultLayout } from '../DefaultLayout';

import * as SC from './styles';

interface ITodosLayoutProps {
  children: React.ReactNode;
  selectedMenuItem: EMenuItems;
}

enum EMenuItems {
  All = '/',
  Active = '/active',
  Completed = '/completed',
}

const TodosLayout: React.FC<ITodosLayoutProps> = ({
  children,
  selectedMenuItem,
}) => {
  return (
    <DefaultLayout>
      <SC.Container>
        <header>
          <h1>#todo</h1>
        </header>

        <SC.Navbar>
          <Link data-selected={selectedMenuItem === EMenuItems.All} to="/todos">
            All
          </Link>
          <Link
            data-selected={selectedMenuItem === EMenuItems.Active}
            to="/todos/active"
          >
            Active
          </Link>
          <Link
            data-selected={selectedMenuItem === EMenuItems.Completed}
            to="/todos/completed"
          >
            Completed
          </Link>
        </SC.Navbar>

        {children}
      </SC.Container>
    </DefaultLayout>
  );
};

export { TodosLayout, EMenuItems };
