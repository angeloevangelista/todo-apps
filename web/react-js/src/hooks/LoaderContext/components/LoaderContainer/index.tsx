import React from 'react';

import { Loader } from '../../../../components/Loader';

import * as SC from './styles';

interface ILoaderContainerProps {
  loadingText?: string;
}

const LoaderContainer: React.FC<ILoaderContainerProps> = ({ loadingText }) => {
  return (
    <SC.Container>
      <Loader text={loadingText} />
    </SC.Container>
  );
};

export { LoaderContainer };
