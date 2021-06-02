import React from 'react';
import { RouteProps } from 'react-router';
import { Route, RouteComponentProps } from 'react-router-dom';

import { getSelectedMenuItem } from './functions/getSelectedMenuItem';

import { DefaultLayout } from '../layouts/DefaultLayout';
import { EMenuItems, TodosLayout } from '../layouts/TodosLayout';

interface IRouteWrapperProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const RouteWrapper: React.FC<IRouteWrapperProps> = ({
  component: Component,
  ...rest
}) => {
  const pathname = rest.location?.pathname || '';

  const Layout = pathname.includes('todos') ? TodosLayout : DefaultLayout;

  const selectedMenuItem =
    Layout === TodosLayout ? getSelectedMenuItem(pathname) : EMenuItems.All;

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <Layout selectedMenuItem={selectedMenuItem}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export { RouteWrapper };
