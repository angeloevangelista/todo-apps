import { BrowserRouter, Switch } from 'react-router-dom';

import { RouteWrapper } from './Route';

import { AllTodos } from '../pages/AllTodos';
import { NotFound } from '../pages/NotFound';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <RouteWrapper exact path="/todos" component={AllTodos} />
        <RouteWrapper path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export { Routes };
