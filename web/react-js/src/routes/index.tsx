import { BrowserRouter, Switch } from 'react-router-dom';

import { RouteWrapper } from './Route';

import { AllTodos } from '../pages/AllTodos';
import { NotFound } from '../pages/NotFound';
import { ActiveTodos } from '../pages/ActiveTodos';
import { CompletedTodos } from '../pages/CompletedTodos';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <RouteWrapper exact path="/todos" component={AllTodos} />
        <RouteWrapper path="/todos/active" component={ActiveTodos} />
        <RouteWrapper path="/todos/completed" component={CompletedTodos} />
        <RouteWrapper path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export { Routes };
