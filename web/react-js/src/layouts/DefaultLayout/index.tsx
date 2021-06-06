import React from 'react';

import { Footer } from '../../components/Footer';
import { LoaderContextProvider } from '../../hooks/LoaderContext';
import { TodoContextProvider } from '../../hooks/TodoContext';

import * as SC from './styles';

interface IDefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<IDefaultLayoutProps> = ({ children }) => {
  return (
    <LoaderContextProvider>
      <TodoContextProvider>
        <SC.WrapperContainer>
          <SC.PageContainer>{children}</SC.PageContainer>

          <Footer username="angeloevangelista" />
        </SC.WrapperContainer>
      </TodoContextProvider>
    </LoaderContextProvider>
  );
};

export { DefaultLayout };
