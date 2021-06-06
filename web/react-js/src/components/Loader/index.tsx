import React from 'react';

import * as SC from './styles';

interface ILoaderProps {
  text?: string;
}

const Loader: React.FC<ILoaderProps> = ({ text }) => {
  return (
    <SC.Container>
      <strong>{text}</strong>

      <SC.RunningBar />
    </SC.Container>
  );
};

export { Loader };
